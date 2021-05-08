import {CommandConfig} from "../interfaces/CommandConfig";

import {Message, MessageEmbed} from "discord.js"
import ProcessedCommand from "../interfaces/ProcessedMesage";

// import {movieList} from "./add";
import randomColorCodeGen from "../utils/randomColorCodeGen";

import MediaList from "../models/MediaList";

const config: CommandConfig = {
    isDMExecutable: true,
    command: "get_list",
    description: "Get your own watch list",
    repr: "get_list",
    execute: async(message: Message, processedCommand: ProcessedCommand) => {
        
        let id = message.author.id;

        let mediaListStored = await MediaList.findOne({id})

        if(mediaListStored == undefined) {
            return message.author.send("Sorry! no data found in the server")
        }

        let movieList = mediaListStored.list;

        if(movieList.length == 0){
            return message.author.send("Nothing found in the list. Consider adding new movies with the `add_to_server_list command`")
        }
        
        let embed = new MessageEmbed()
        embed.setColor(randomColorCodeGen());

        let str = "";

        movieList.forEach((item:any, index) => {
            str += (index + 1) + ". " + item.Title + "\n";
        })

        embed.addField("Movie List", str);
        message.author.send(embed);
    }   
}


export default config;