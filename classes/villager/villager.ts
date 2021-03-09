import { Villager_routes } from '../../routes/villager/villager';
const _routes = new Villager_routes();

export class Villager {
    async displayVillager(channel: any, params: string[]) {
        await _routes.get(params[1]);
        channel.send('HEY !');
    }
}