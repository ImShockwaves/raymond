import villager from '../../data/v1a/villagers.json';
import { Villagers_name } from '../../models/villagers';
import * as langs from '../languages_commands';
import color from 'colors';
import _ from 'lodash';

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

    translate(key: string, options: any = {}): string {
        let translate = "";
        if (global.lang === "EUfr") translate = langs.fr[key];
        if (global.lang === "USen") translate = langs.us[key];
        if (translate) {
            if (!_.isEmpty(options)) {
                for (const [key, value] of Object.entries(options)) {
                    
                    translate = translate.replace(`{{ ${key} }}`, `${value}`);
                }
            }
            return translate;
        }
        console.error(color.red(`Translation were not found for ${key}`));
        return key;
    }

}