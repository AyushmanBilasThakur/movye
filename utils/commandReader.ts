
import {readdirSync} from 'fs';

import {CommandConfig} from "../interfaces/CommandConfig"

import {join as pathJoin} from 'path';

const commands = new Map<String, CommandConfig>();

let fileList: string[] = readdirSync(pathJoin(__dirname, "../commands"))

fileList.forEach((file: string )=> {
    
    let config = require(pathJoin(__dirname, "../commands", file)).default;

    commands.set(config.command, config);
})


export default commands;