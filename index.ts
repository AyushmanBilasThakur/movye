require("dotenv").config();

import { Client as DiscordClient, DMChannel, Message } from "discord.js";

import messageProcessor from "./utils/messageHandler";

import commands from "./utils/commandReader";

import {connect} from "mongoose";
import ServerSettings from "./models/ServerSettings";

const client: DiscordClient = new DiscordClient();

let prefix: string = "??";

connect(process.env.MONGO_CONNECTION_STRING, 
    {
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useNewUrlParser: true,
    }).then(() => {
        console.log("db connected");
    }).catch(err => {
        console.log(err);
    })

client.login(process.env.TOKEN)
      .then(val => {
                console.log("Bot running!");
        })
      .catch(error => console.error(error));

client.on("ready", () => {
    client.user.setActivity(prefix,{
        type: "PLAYING",
    })
})


client.on("message", async(message: Message) => {

    let pf = (await ServerSettings.findOne({id: message.guild.id}));

    if(pf != null && pf.prefix != undefined) prefix = pf.prefix;


    
    //check if bot is mentioned
    if(message.mentions.has(client.user)){
        return message.channel.send(`Hi I'm your Watchlist Watcher bot and my prefix is \`${prefix}\``)
    }



    

    //check if the sender is not a bot
    //check if the message starts with our preset prefix
    //check if the message is not in the dms
    try{
        if(
        !message.author.bot && 
        message.content.startsWith(prefix)
    ){
        let result = messageProcessor(prefix, message.content);

        if(!result) return;

        if(result.command == ""){
            return message.channel.send("Please send a valid command, you can always use \`${prefix}help\` to get started");
        }

        if(commands.has(result.command)){
            if(!commands.get(result.command).isDMExecutable && (message.channel instanceof DMChannel)){
                message.channel.send("To execute this command you need to be in a server");
            }
            else{
                commands.get(result.command).execute(message, result);
            }
        }
        else{
            message.channel.send(`This command is unkonwn to me, see my docs with the help of the \`${prefix}help\` command`)
        }

    }}catch(error){
        console.error(error);
    }
});


