var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../models/MediaList", "../utils/constants", "../utils/createMovieEmbed", "../utils/omdbRequest", "../utils/searchTypes", "../utils/typeAndNameExtractor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MediaList_1 = require("../models/MediaList");
    var constants_1 = require("../utils/constants");
    var createMovieEmbed_1 = require("../utils/createMovieEmbed");
    var omdbRequest_1 = require("../utils/omdbRequest");
    var searchTypes_1 = require("../utils/searchTypes");
    var typeAndNameExtractor_1 = require("../utils/typeAndNameExtractor");
    var config = {
        isDMExecutable: true,
        command: "add_to_list",
        description: "Adds a movie to your watch list ",
        repr: "add_to_list <type(movie, series)> <name of the show>",
        execute: function (message, processedCommand) { return __awaiter(void 0, void 0, void 0, function () {
            var mediaList, movieList_1, _a, type, name_1, data_1, flag_1, embed, mediaMessage, checkReactionFilter, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, MediaList_1.default.findOne({ id: message.author.id })];
                    case 1:
                        mediaList = _b.sent();
                        if (!(mediaList == undefined)) return [3 /*break*/, 3];
                        mediaList = new MediaList_1.default({
                            id: message.author.id,
                            list: []
                        });
                        return [4 /*yield*/, mediaList.save()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        movieList_1 = mediaList.list;
                        _a = typeAndNameExtractor_1.default(processedCommand.args), type = _a.type, name_1 = _a.name;
                        if (!(searchTypes_1.default.includes(type))) {
                            return [2 /*return*/, message.author.send("You searched for an invalid type - " + type)];
                        }
                        return [4 /*yield*/, omdbRequest_1.default(name_1, type)];
                    case 4:
                        data_1 = _b.sent();
                        if (data_1.Response == "False") {
                            return [2 /*return*/, message.author.send("Sorry your " + type + " " + name_1 + " could not be found!")];
                        }
                        flag_1 = 0;
                        movieList_1.forEach(function (e) {
                            if (e.imdbID == data_1.imdbID) {
                                flag_1 = 1;
                                return message.author.send("You have this movie already in your server watchlist. Though if you want to see the details use the `search` command");
                            }
                        });
                        if (flag_1 == 1)
                            return [2 /*return*/];
                        embed = createMovieEmbed_1.default(data_1);
                        return [4 /*yield*/, message.author.send(embed)];
                    case 5:
                        mediaMessage = _b.sent();
                        return [4 /*yield*/, mediaMessage.react("✅")];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, mediaMessage.react("❌")];
                    case 7:
                        _b.sent();
                        message.author.send("To add the movie/show to the list of the server please react with the ✅ emoji otherwise react with ❌");
                        checkReactionFilter = function (reaction, user) {
                            return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
                        mediaMessage.awaitReactions(checkReactionFilter, { max: 1, time: constants_1.TIMEOUT, errors: ["time"] }).then(function (col) { return __awaiter(void 0, void 0, void 0, function () {
                            var reaction, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        reaction = col.first();
                                        _a = reaction.emoji.name;
                                        switch (_a) {
                                            case "✅": return [3 /*break*/, 1];
                                            case "❌": return [3 /*break*/, 3];
                                        }
                                        return [3 /*break*/, 4];
                                    case 1:
                                        movieList_1.push(data_1);
                                        return [4 /*yield*/, MediaList_1.default.findOneAndUpdate({ id: message.author.id }, { list: movieList_1 })];
                                    case 2:
                                        _b.sent();
                                        message.author.send("Movie added successfully to the list");
                                        return [3 /*break*/, 5];
                                    case 3:
                                        message.author.send("Okay won't add this movie to the watch list");
                                        return [3 /*break*/, 5];
                                    case 4:
                                        console.log("Default");
                                        _b.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (err) {
                            return message.author.send("Ummmm.... Got no reaction from you, so not adding!");
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        console.log(err_1);
                        message.author.send("Something went wrong with the bot... Report to the creator?");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); }
    };
    exports.default = config;
});
