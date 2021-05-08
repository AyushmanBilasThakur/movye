import { Message } from "discord.js";
import { CommandConfig } from "../interfaces/CommandConfig";
import ProcessedCommand from "../interfaces/ProcessedMesage";

import searchTypes from "../utils/searchTypes";
import omdbRequest from "../utils/omdbRequest";
import typeAnnNameExtractor from "../utils/typeAndNameExtractor";
import createMovieEmbed from "../utils/createMovieEmbed";

const config: CommandConfig = {
    isDMExecutable: true,
    command: "search",
    description: "Searches a movie and gives some details about it!",
    repr: "search <type(movie, series)> <name of the show>",
    execute: async(message: Message, processedCommand: ProcessedCommand) => {
        
        try{
            
            let {type, name} = typeAnnNameExtractor(processedCommand.args);
    
            if(!(searchTypes.includes(type))){
                return message.channel.send(`You searched for an invalid type - ${type}`); 
            }
    
            let data = await omdbRequest(name, type);
            

            if(data.Response == "False"){
                return message.channel.send(`Sorry your ${type} ${name} could not be found!`);
            }
    
            let embed = createMovieEmbed(data);
    
            
            message.channel.send(embed); 
        }
        catch(err){
            console.log(err);
            message.channel.send("Something went wrong with the bot... Report to the creator?")
        }
    }
}


export default config;