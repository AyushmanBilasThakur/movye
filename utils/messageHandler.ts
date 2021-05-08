import ProcessesdMessage from "../interfaces/ProcessedMesage";

function messageHandler(prefix: string, messageString: string) : ProcessesdMessage{
    
    messageString = messageString.toLowerCase().trim();

    if(messageString.startsWith(prefix)){
        let [command, ...args] = messageString.split(" ");
        command = command.split(prefix)[1];
        return {
            command,
            args
        }

    }
    else throw new Error("This is not a message to be parsed");
}



export default messageHandler;