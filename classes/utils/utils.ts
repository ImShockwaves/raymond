import villager from '../../data/v1a/villagers.json';
import { Villagers_name } from '../../models/villagers';
import * as langs from '../languages_commands';

export class Utils {
    defineVillagerNames() {

        global.villagers = villager.map((vill: Villagers_name) => {
            return {
                id: vill.id,
                "file-name": vill['file-name'],
                name: vill.name
            }
        });
    }

    translate(key: string): string {
        if (global.lang === "EUfr") return langs.fr[key];
        if (global.lang === "USen") return langs.us[key];
        console.error(`Translation were not found for ${key}`);
        
        return key;
    }
}