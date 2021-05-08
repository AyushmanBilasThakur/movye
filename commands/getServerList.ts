import {CommandConfig} from "../interfaces/CommandConfig";

import {Message, MessageEmbed} from "discord.js"
import ProcessedCommand from "../interfaces/ProcessedMesage";

// import {movieList} from "./add";
import randomColorCodeGen from "../utils/randomColorCodeGen";

import MediaList from "../models/MediaList";

const config: CommandConfig = {
    isDMExecutable: false,
    command: "get_server_list",
    description: "Adds a movie to the watch list of the server [Server only command]",
    repr: "get_server_list",
    execute: async(message: Message, processedCommand: ProcessedCommand) => {
        
        let id = message.guild.id;

        let mediaListStored = await MediaList.findOne({id})

        if(mediaListStored == undefined) {
            return message.channel.send("Sorry! no data found in the server")
        }

        let movieList = mediaListStored.list;

        if(movieList.length == 0){
            return message.channel.send("Nothing found in the list. Consider adding new movies with the `add_to_server_list command`")
        }
        
        let embed = new MessageEmbed()
        embed.setColor(randomColorCodeGen());

        let str = "";

        movieList.forEach((item: any, index) => {
            str += (index + 1) + ". " + item.Title + "\n";
        })

        embed.addField("Movie List", str);
        message.channel.send(embed);
    }   
}


export default config;