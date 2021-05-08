(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "discord.js", "./utils/messageHandler", "./utils/commandReader", "mongoose"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("dotenv").config();
    var discord_js_1 = require("discord.js");
    var messageHandler_1 = require("./utils/messageHandler");
    var commandReader_1 = require("./utils/commandReader");
    var mongoose_1 = require("mongoose");
    var client = new discord_js_1.Client();
    var prefix = "??";
    mongoose_1.connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
    }).then(function () {
        console.log("db connected");
    }).catch(function (err) {
        console.log(err);
    });
    client.login(process.env.TOKEN)
        .then(function (val) {
        console.log("Bot running!");
    })
        .catch(function (error) { return console.error(error); });
    client.on("ready", function () {
        client.user.setActivity("wlw?", {
            type: "PLAYING",
        });
    });
    client.on("message", function (message) {
        //check if bot is mentioned
        if (message.mentions.has(client.user)) {
            return message.channel.send("Hi I'm your Watchlist Watcher bot and my prefix is `" + prefix + "`");
        }
        //check if the sender is not a bot
        //check if the message starts with our preset prefix
        //check if the message is not in the dms
        try {
            if (!message.author.bot &&
                message.content.startsWith(prefix)) {
                var result = messageHandler_1.default(prefix, message.content);
                if (!result)
                    return;
                if (result.command == "") {
                    return message.channel.send("Please send a valid command, you can always use \`${prefix}help\` to get started");
                }
                if (commandReader_1.default.has(result.command)) {
                    if (!commandReader_1.default.get(result.command).isDMExecutable && (message.channel instanceof discord_js_1.DMChannel)) {
                        message.channel.send("To execute this command you need to be in a server");
                    }
                    else {
                        commandReader_1.default.get(result.command).execute(message, result);
                    }
                }
                else {
                    message.channel.send("This command is unkonwn to me, see my docs with the help of the `" + prefix + "help` command");
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
});
