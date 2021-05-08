import { Message, ReactionManager, User } from "discord.js";
import { CommandConfig } from "../interfaces/CommandConfig";
import ProcessedCommand from "../interfaces/ProcessedMesage";
import ServerSettings from "../models/ServerSettings";




const config: CommandConfig = {
    isDMExecutable: false,
    command: "change_prefix",
    description: "Changes the server specific prefix [Server only command]",
    repr: "change_prefix <new prefix>",
    execute: async(message: Message, processedCommand: ProcessedCommand) => {

        let guild = message.guild;
        let member = guild.members.cache.get(message.author.id);
                
        if(!member.hasPermission("ADMINISTRATOR")){
            return message.channel.send("Only pepole with admin permission can add new movies, but you can search for new movies with the `search` command... For more details use the `help` command. Or you can add to your personal list with `add_to_personal_list` command in either dm or here!");
        }

        try{

            let new_prefix = processedCommand.args[0];

            if(new_prefix == undefined) return message.channel.send("You did not pass a valid prefix")

            let serverConfig = await ServerSettings.findOne({id: guild.id});

            if(serverConfig == undefined) {
                let newConfig = new ServerSettings({id: guild.id});
                await newConfig.save();
            }

            await ServerSettings.findOneAndUpdate({id: guild.id}, {prefix: new_prefix});

            message.channel.send("Prefix updated successfully to " + new_prefix);

        }
        catch(err){
            console.log(err);
            message.channel.send("Something went wrong with the bot... Report to the creator?")
        }
    }   
}


export default config;