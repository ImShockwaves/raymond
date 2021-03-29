import villagers from '../../data/v1a/villagers.json';
import { Sender } from '../sender';
import moment from 'moment';
import { Embed } from '../../models/embed';
import { Utils } from '../utils/utils';
import { Villager_route } from '../routes/villager.route'

const _utils = new Utils;
const _sender = new Sender;
const _villager = new Villager_route;

export class Villager {
    async displayVillager(params: string[]) {

        const findByName: any = villagers.find(vill => {
            
            for (const [key, value] of Object.entries(vill.name)) {
                
                if (params[1].toLocaleLowerCase() === value.toLowerCase()) return vill;       
            }
        });
        if (findByName) {
            
            const NKPDia_vill = await _villager.getVillager(findByName.name['name-USen']);

            console.log("nkpdia vill", NKPDia_vill);

            const date = moment(findByName['birthday-string'], 'MMMM Do');
            let birthday;

            if (global.lang === "EUfr") birthday = date.locale('fr').format("DD MMMM");
            else if (global.lang === "USen") birthday = date.format("MMMM DD");
            else birthday = date.locale(global.lang.substring(2)).format("MMMM DD");

            const embed: Embed = {
                embed: {
                    color: findByName["bubble-color"],
                    title: _utils.translate('villagerxtitle',  {name : findByName.name[`name-${global.lang}`]}),
                    author: {
                        name: 'Raymond'
                    },
                    thumbnail: {
                        url: findByName.icon_uri
                    },
                    description: _utils.translate('villagerxfound', {name : findByName.name[`name-${global.lang}`]}),
                    fields: [
                        {
                            name: _utils.translate('species'),
                            value: _utils.translate(findByName.species),
                            inline: true
                        },
                        {
                            name: _utils.translate('birthday'),
                            value: `${birthday}`,
                            inline: true
                        },
                        {
                            name: _utils.translate('astrosign'),
                            value: _utils.translate(NKPDia_vill.sign),
                            inline: true
                        },
                        {
                            name: _utils.translate('hobby'),
                            value: _utils.translate(findByName.hobby),
                            inline: true
                        },
                        {
                            name: _utils.translate('personality'),
                            value: _utils.translate(findByName.personality),
                            inline: true
                        },
                        {
                            name: _utils.translate('catchphrase'),
                            value: findByName['catch-translations'][`catch-${global.lang}`],
                            inline: true
                        },
                    ],
                    image: {
                        url: findByName.image_uri
                    }
                }
            }
            await _sender.send(embed);
        } else {
            await _sender.send(_utils.translate('villagernotfound', {name: params[1]}));
        }
    }
}