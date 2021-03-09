import villager from '../../data/v1a/villagers.json';
import { Global } from '../../models/global';

export class Utils {
    async defineGlobal(): Promise<Global> {

        let global: Global = {
            villagers: []
        };

        global.villagers = villager.map(villager => {
            return {
                id: villager.id,
                "file-name": villager['file-name'],
                name: villager.name
            }
        });

        return global;
    }
}