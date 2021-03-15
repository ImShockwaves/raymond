import Discord from "discord.js";
import { Embed } from "../models/embed";

export class Sender {
    async send(message: string | Embed) {
        global.message.channel.send(message);
        console.log("Command send to channel !");
        
    }
}