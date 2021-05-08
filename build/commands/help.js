(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "discord.js", "../utils/commandReader"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var discord_js_1 = require("discord.js");
    var commandReader_1 = require("../utils/commandReader");
    var config = {
        isDMExecutable: true,
        command: "help",
        description: "Gives a list of all the commands available",
        repr: "help <optional: command name>",
        execute: function (message, processedCommand) {
            var reply = new discord_js_1.MessageEmbed({
                color: "#fcba03",
                type: "rich"
            });
            if (!processedCommand.args[0]) {
                commandReader_1.default.forEach(function (commandDetails) {
                    reply.addField(commandDetails.command, commandDetails.description + "\n\n" + commandDetails.repr + "\n\n---------------------\n\n");
                });
            }
            else {
                var query = processedCommand.args[0];
                if (commandReader_1.default.has(query)) {
                    var commandDetails = commandReader_1.default.get(query);
                    reply.addField(commandDetails.command, commandDetails.description + "\n\n" + commandDetails.repr);
                }
                else {
                    reply.addField("Error", "Searched for an invalid command");
                }
            }
            message.channel.send(reply);
        }
    };
    exports.default = config;
});
