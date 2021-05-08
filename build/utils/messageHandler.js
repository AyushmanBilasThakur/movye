(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function messageHandler(prefix, messageString) {
        messageString = messageString.toLowerCase().trim();
        if (messageString.startsWith(prefix)) {
            var _a = messageString.split(" "), command = _a[0], args = _a.slice(1);
            command = command.split(prefix)[1];
            return {
                command: command,
                args: args
            };
        }
        else
            throw new Error("This is not a message to be parsed");
    }
    exports.default = messageHandler;
});
