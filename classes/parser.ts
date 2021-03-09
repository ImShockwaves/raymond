import * as cmds_lang from './languages_commands';
import { Villager } from './villager/villager';

export class Parser {

    findCommandInEachLanguage(command: string): number {

        let index = -1;

        if ((index = cmds_lang.FR.findIndex(cmd => cmd === command)) >= 0) return index;
        if ((index = cmds_lang.US.findIndex(cmd => cmd === command)) >= 0) return index;

        return index;
    }

    async executeCommand(message: any, i: number, params: string[]) {
        // console.log(`Executing command ${params}`);
        
        await cmds_lang.index[i].displayVillager(message.channel, params);
    }


    async commandParser(message: any) {
        var param = message.content.substring(1).split(/\s+/g);
        console.log("Command parsing ...", param);
        const index = this.findCommandInEachLanguage(param[0]);
        if (index > -1) {
            console.log("Command asked ...");
            
            await this.executeCommand(message, index, param);
        }  
    }
}
