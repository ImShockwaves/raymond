import * as cmds_lang from './languages_commands';
import { Villager } from './villager/villager';

export class Parser {

    findCommandInEachLanguage(command: string): number {

        let index = -1;

        if ((index = cmds_lang.EUfr.findIndex(cmd => cmd === command)) >= 0) {
            global.lang = 'EUfr';
            return index;
        }
        if ((index = cmds_lang.USen.findIndex(cmd => cmd === command)) >= 0) {
            global.lang = 'USen';
            return index;
        }

        return index;
    }

    async executeCommand(i: number, params: string[]) {
        switch (i) {
            case 0:
                const villager = new Villager();
                await villager.displayVillager(params);
                break;
        
            default:
                break;
        }
    }


    async commandParser() {
        var param = global.message.content.substring(1).split(/\s+/g);
        console.log("Command parsing ...", param);
        const index = this.findCommandInEachLanguage(param[0]);
        if (index > -1) {
            console.log("Command asked ...");
            
            await this.executeCommand(index, param);
        }  
    }
}
