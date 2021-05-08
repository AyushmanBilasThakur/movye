(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "discord.js", "./randomColorCodeGen"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var discord_js_1 = require("discord.js");
    var randomColorCodeGen_1 = require("./randomColorCodeGen");
    var createMovieEmbed = function (data, color) {
        var embed = new discord_js_1.MessageEmbed();
        if (!color) {
            embed.setColor(randomColorCodeGen_1.default());
        }
        else {
            embed.setColor(color);
        }
        embed.addField(data.Title, Object.keys(data).reduce(function (str, key) {
            if (typeof (data[key]) == "object") {
                return str;
            }
            if (key == "Response" || key == "Name" || key == "imdbID" || data[key] == "N/A" || key == "Poster") {
                return str;
            }
            return str + (key + ": " + data[key] + "\n");
        }, ""));
        if (data.Poster != "N/A")
            embed.setThumbnail(data.Poster);
        return embed;
    };
    exports.default = createMovieEmbed;
});
