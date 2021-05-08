import {Schema, model, Model} from "mongoose";
import ServerListInterface from "../interfaces/SeverSettingsInterface";

const ServerSettingsSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    prefix: {
        type: String
    },
    roles_allowed:{
        type: Array
    },
    timeout: {
        type: Number
    }
})

const ServerSettings: Model<ServerListInterface> = model("serverSettings",ServerSettingsSchema);

export default ServerSettings;