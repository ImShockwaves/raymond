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
            console.log(moment([2, 25]));
            
            let birthday =  moment(findByName.birthday.split('/').map((el: string): number => 
                parseInt(el))).format("DD MMMM");
            const embed: Embed = {
                embed: {
                    color: 'RED',
                    title: 'A simple embed',
                    author: {
                        name: 'Raymond'
                    },
                    thumbnail: {
                        url: findByName.icon_uri
                    },
                    description: `Here is the villager ${params[1]}!`,
                    fields: [
                        {
                            name: 'Species',
                            value: findByName.species,
                            inline: true
                        },
                        {
                            name: _utils.translate('birthday'),
                            value: `${birthday}`,
                            inline: true
                        },
                        {
                            name: 'Hobby',
                            value: findByName.hobby,
                            inline: true
                        },
                        {
                            name: 'Catch-phrase',
                            value: findByName['catch-translations'][`catch-${global.lang}`],
                            inline: true
                        },
                    ],
                    image: {
                        url: findByName.image_uri
                    }
                }
            }
            _sender.send(embed);
        } else {
            _sender.send('NOT FOUND :(');
        }
    }
}