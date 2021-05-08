import {Schema, model, Model} from "mongoose";
import MediaListInterface from "../interfaces/MediaListInterface";

const MediaListSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    list: {
        type: Array,
        required: true,
        default: []
    }
})

const MediaList: Model<MediaListInterface> = model("mediaList",MediaListSchema);

export default MediaList;