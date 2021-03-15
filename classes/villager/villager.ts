import villagers from '../../data/v1a/villagers.json';
import { Villagers_name } from '../../models/villagers';
import _ from 'lodash';
import { Sender } from '../sender';
import moment from 'moment';
import { Embed } from '../../models/embed';
import { Utils } from '../utils/utils';

const _utils = new Utils;
const _sender = new Sender;

export class Villager {
    async displayVillager(params: string[]) {
        
        const findByName: any = villagers.find(vill => {
            
            for (const [key, value] of Object.entries(vill.name)) {
                
                if (params[1].toLocaleLowerCase() === value.toLowerCase()) return vill;       
            }
        });
        if (findByName) {
            let todate = findByName.birthday.split('/');
            const date = moment().set({date: parseInt(todate[0]), month: parseInt(todate[1]) - 1});
            const sign = _utils.getSign(date.format("YYYY-MM-DD"));
            let birthday;

            if (global.lang === "EUfr") birthday = date.locale('fr').format("DD MMM");
            else if (global.lang === "USen") birthday = date.format("MMM DD");
            else birthday = date.locale(global.lang.substring(2)).format("MMM DD");

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
                            value: _utils.translate(sign),
                            inline: true
                        },
                        {
                            name: _utils.translate('hobby'),
                            value: _utils.translate(findByName.hobby),
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
            await _sender.send('NOT FOUND :(');
        }
    }
}