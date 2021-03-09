import { api_route } from '../../config.json';
import request from 'request-promise-native';

const villager_route = api_route + 'villagers/';

export class Villager_routes {
    async get(villager: string) {

        const opts = {
            uri:  villager_route + villager
        }
        const res = await request.get(opts);
        console.log('VILLAGER', res);
    }

}

