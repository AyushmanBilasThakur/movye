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
    var typeAnnNameExtractor = function (args) {
        var type = args[0];
        var name = args.filter(function (val, index) { return index != 0; }).join(" ");
        return { type: type, name: name };
    };
    exports.default = typeAnnNameExtractor;
});
