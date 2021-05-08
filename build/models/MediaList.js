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
    var MediaListSchema = new mongoose_1.Schema({
        id: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            required: true,
            default: []
        }
    });
    var MediaList = mongoose_1.model("mediaList", MediaListSchema);
    exports.default = MediaList;
});
