import { MessageEmbed } from "discord.js"
import randomColorCodeGen from "./randomColorCodeGen";

const createMovieEmbed = (data, color?: string) => {
    let embed = new MessageEmbed();
    
    if(!color){
        embed.setColor(randomColorCodeGen());
    }
    else {
        embed.setColor(color);
    }

    embed.addField(data.Title, Object.keys(data).reduce((str, key) => {
        if(typeof(data[key]) == "object"){
            return str;
        }
        if(key == "Response" || key == "Name" || key=="imdbID" || data[key] == "N/A" || key == "Poster"){
            return str;
        }
        return str + `${key}: ${data[key]}\n`
    },""))
    
    if(data.Poster != "N/A")
        embed.setThumbnail(data.Poster);

    return embed;
}

export default createMovieEmbed;