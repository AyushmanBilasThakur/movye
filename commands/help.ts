import { Message, MessageEmbed } from "discord.js";
import { CommandConfig } from "../interfaces/CommandConfig";
import ProcessedCommand from "../interfaces/ProcessedMesage";

import commands from '../utils/commandReader';


const config: CommandConfig = {
    isDMExecutable: true,
    command: "help",
    description: "Gives a list of all the commands available",
    repr: "help <optional: command name>",
    execute: (message: Message, processedCommand: ProcessedCommand) => {
        
        let reply = new MessageEmbed({
            color: "#fcba03",
            type: "rich"
        });

        if(!processedCommand.args[0]){
            commands.forEach((commandDetails) => {
                reply.addField(commandDetails.command, commandDetails.description + "\n\n" + commandDetails.repr + "\n\n---------------------\n\n");
            })
        }

        else{
            let query = processedCommand.args[0];
            if(commands.has(query)){
                let commandDetails = commands.get(query)
                reply.addField(commandDetails.command, commandDetails.description + "\n\n" + commandDetails.repr);
            }
            else {
                reply.addField("Error", "Searched for an invalid command")
            }
        }


        message.channel.send(reply);
    }
}


export default config;