import { Document } from "mongoose";

interface MediaListInterface extends Document{
    id: string,
    list: any[]
}

export default MediaListInterface