import { CollectorFilter, Message, User } from "discord.js";
import { CommandConfig } from "../interfaces/CommandConfig";
import ProcessedCommand from "../interfaces/ProcessedMesage";
import MediaList from "../models/MediaList";
import { TIMEOUT } from "../utils/constants";
import createMovieEmbed from "../utils/createMovieEmbed";
import omdbRequest from "../utils/omdbRequest";
import searchTypes from "../utils/searchTypes";
import typeAnnNameExtractor from "../utils/typeAndNameExtractor";



const config: CommandConfig = {
    isDMExecutable: true,
    command: "add_to_list",
    description: "Adds a movie to your watch list ",
    repr: "add_to_list <type(movie, series)> <name of the show>",
    execute: async(message: Message, processedCommand: ProcessedCommand) => {


        try{

            let mediaList = await MediaList.findOne({id: message.author.id});

            if(mediaList == undefined){
                mediaList = new MediaList({
                    id: message.author.id,
                    list: []
                })
                await mediaList.save();
            }

            let movieList = mediaList.list;

            let {type, name} = typeAnnNameExtractor(processedCommand.args);
    
            if(!(searchTypes.includes(type))){
                return message.author.send(`You searched for an invalid type - ${type}`); 
            }
    
            let data = await omdbRequest(name, type);
            

            if(data.Response == "False"){
                return message.author.send(`Sorry your ${type} ${name} could not be found!`);
            }
            
            let flag = 0
            
            movieList.forEach(e => {
                if(e.imdbID == data.imdbID){
                    flag = 1
                    return message.author.send("You have this movie already in your server watchlist. Though if you want to see the details use the `search` command");
                }
            })

            if(flag == 1) return;

            let embed = createMovieEmbed(data);
            
            let mediaMessage = await message.author.send(embed); 

            await mediaMessage.react("✅");
            await mediaMessage.react("❌");

            message.author.send("To add the movie/show to the list of the server please react with the ✅ emoji otherwise react with ❌")

            const checkReactionFilter : CollectorFilter = (reaction: any, user: User) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            mediaMessage.awaitReactions(checkReactionFilter, {max: 1, time: TIMEOUT, errors: ["time"]}).then(async(col) => {
                let reaction = col.first();
                switch(reaction.emoji.name){
                    case "✅": 
                    
                    
                    movieList.push(data);

                    await MediaList.findOneAndUpdate({id: message.author.id}, {list: movieList});

                    message.author.send("Movie added successfully to the list");

                    break;
                    case "❌": message.author.send("Okay won't add this movie to the watch list");
                    break;
                    default: console.log("Default");
                }
                
            }).catch(err => {
                return message.author.send("Ummmm.... Got no reaction from you, so not adding!");
            })

        }
        catch(err){
            console.log(err);
            message.author.send("Something went wrong with the bot... Report to the creator?")
        }
    }   
}


export default config;