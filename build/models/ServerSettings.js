(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongoose"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongoose_1 = require("mongoose");
    var ServerSettingsSchema = new mongoose_1.Schema({
        id: {
            type: String,
            required: true
        },
        prefix: {
            type: String
        },
        roles_allowed: {
            type: Array
        },
        timeout: {
            type: Number
        }
    });
    var ServerSettings = mongoose_1.model("serverSettings", ServerSettingsSchema);
    exports.default = ServerSettings;
});
