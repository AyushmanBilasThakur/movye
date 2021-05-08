export interface CommandConfig {
    command: String,
    description: String,
    repr: String,
    execute: Function,
    isDMExecutable: Boolean
}