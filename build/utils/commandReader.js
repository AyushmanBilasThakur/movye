(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = require("fs");
    var path_1 = require("path");
    var commands = new Map();
    var fileList = fs_1.readdirSync(path_1.join(__dirname, "../commands"));
    fileList.forEach(function (file) {
        var config = require(path_1.join(__dirname, "../commands", file)).default;
        commands.set(config.command, config);
    });
    exports.default = commands;
});
