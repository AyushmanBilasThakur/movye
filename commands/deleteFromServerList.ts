import { Message, User } from "discord.js";
import { CommandConfig } from "../interfaces/CommandConfig";
import ProcessedCommand from "../interfaces/ProcessedMesage";
import MediaList from "../models/MediaList";
import createMovieEmbed from "../utils/createMovieEmbed";
import omdbRequest from "../utils/omdbRequest";
import searchTypes from "../utils/searchTypes";
import typeAnnNameExtractor from "../utils/typeAndNameExtractor";

import {TIMEOUT} from "../utils/constants";

const config: CommandConfig = {
    isDMExecutable: false,
    command: "delete_from_server_list",
    description: "Deletes a movie to the watch list of the server [Server only command]",
    repr: "delete <type(movie, series)> <name of the show>",
    execute: async(message: Message, processedCommand: ProcessedCommand) => {

        let guild = message.guild;
        let member = guild.members.cache.get(message.author.id);
                
        if(!member.hasPermission("ADMINISTRATOR")){
            return message.channel.send("Only pepole with admin permission can add new movies, but you can search for new movies with the `search` command... For more details use the `help` command. Or you can add to your personal list with `add_to_personal_list` command in either dm or here!");
        }

        try{

            let mediaList = await MediaList.findOne({id: guild.id});

            if(mediaList == undefined){
                return message.channel.send("You don't have this movie saved in the database")
            }

            let movieList = mediaList.list;

            let {type, name} = typeAnnNameExtractor(processedCommand.args);
    
            if(!(searchTypes.includes(type))){
                return message.channel.send(`You searched for an invalid type - ${type}`); 
            }
    
            let data = await omdbRequest(name, type);
            
            if(data.Response == "False"){
                return message.channel.send(`Sorry your ${type} ${name} could not be found!`);
            }
            
            let flag = 0
            
            movieList.forEach(e => {
                if(e.imdbID == data.imdbID){
                    flag = 1
                }
            })

            if(flag == 0) return message.channel.send("You don't have this movie in your watch list");

            let embed = createMovieEmbed(data);
            
            let mediaMessage = await message.channel.send(embed); 

            await mediaMessage.react("✅");
            await mediaMessage.react("❌");

            message.channel.send("To remove the movie/show to the list of the server please react with the ✅ emoji otherwise react with ❌")

            const checkReactionFilter = (reaction: any, user: User) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            mediaMessage.awaitReactions(checkReactionFilter, {max: 1, time: TIMEOUT, errors: ["time"]}).then(async(col) => {
                let reaction = col.first();
                switch(reaction.emoji.name){
                    case "✅": 
                    
                    
                    movieList = movieList.filter(e => {
                        if(e.imdbID == data.imdbID) return false;
                        return true;
                    })

                    await MediaList.findOneAndUpdate({id: guild.id}, {list: movieList});

                    message.channel.send("Movie removed successfully from the list");

                    break;
                    case "❌": message.channel.send("Okay won't delete this movie from the watch list");
                    break;
                    default: console.log("Default");
                }
                
            }).catch(err => {
                return message.channel.send("Ummmm.... Got no reaction from you, so not deleting!");
            })

        }
        catch(err){
            console.log(err);
            message.channel.send("Something went wrong with the bot... Report to the creator?")
        }
    }   
}


export default config;