import { Document } from "mongoose";

interface ServerListInterface extends Document{
    id: string,
    prefix?: string,
    roles_allowed?: string,
    timeout?: number
}

export default ServerListInterface;