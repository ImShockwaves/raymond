import villagers from '../../data/v1a/villagers.json';
import { Villagers_name } from '../../models/villagers';
import _ from 'lodash';
import { Sender } from '../sender';
import moment from 'moment';
import { Embed } from '../../models/embed';
import { Utils } from '../utils/utils';
import astro_lib from 'astro-lib';

const _utils = new Utils;
const _sender = new Sender;

const signsList = {
    ARIES: 'Aries',
    TAURUS: 'Taurus',
    GEMINI: 'Gemini',
    CANCER: 'Cancer',
    LEO: 'Leo',
    VIRGO: 'Virgo',
    LIBRA: 'Libra',
    SCORPIO: 'Scorpio',
    SAGITTARIUS: 'Sagittarius',
    CAPRICORN: 'Capricorn',
    AQUARIUS: 'Aquarius',
    PISCES: 'Pisces'
};

const signsRanges = [
    {
        startMonth: 2,
        startDay: 21,
        endMonth: 3,
        endDay: 20,
        sign: signsList.ARIES
    },
    {
        startMonth: 3,
        startDay: 21,
        endMonth: 4,
        endDay: 20,
        sign: signsList.TAURUS,
    },
    {
        startMonth: 4,
        startDay: 21,
        endMonth: 5,
        endDay: 20,
        sign: signsList.GEMINI,
    },
    {
        startMonth: 5,
        startDay: 21,
        endMonth: 6,
        endDay: 21,
        sign: signsList.CANCER,
    },
    {
        startMonth: 6,
        startDay: 22,
        endMonth: 7,
        endDay: 21,
        sign: signsList.LEO,
    },
    {
        startMonth: 7,
        startDay: 22,
        endMonth: 8,
        endDay: 21,
        sign: signsList.VIRGO,
    },
    {
        startMonth: 8,
        startDay: 22,
        endMonth: 9,
        endDay: 21,
        sign: signsList.LIBRA,
    },
    {
        startMonth: 9,
        startDay: 22,
        endMonth: 10,
        endDay: 21,
        sign: signsList.SCORPIO,
    },
    {
        startMonth: 10,
        startDay: 22,
        endMonth: 11,
        endDay: 21,
        sign: signsList.SAGITTARIUS,
    },
    {
        startMonth: 11,
        startDay: 22,
        endMonth: 0,
        endDay: 20,
        sign: signsList.CAPRICORN,
    },
    {
        startMonth: 0,
        startDay: 21,
        endMonth: 1,
        endDay: 19,
        sign: signsList.AQUARIUS,
    },
    {
        startMonth: 1,
        startDay: 20,
        endMonth: 2,
        endDay: 20,
        sign: signsList.PISCES,
    }
];

/**
 * This function returns a string which is the astrological sign of a person born on that date.
 * @param {string} date a string representing the date.
 * @param {string} [format=YYYY-MM-DD] a optional string representing the format of the date, must be moment.js compatible.
 * @returns {{string|null}} the name of the sign or null if it can't be found.
 */
const getSign = (date: string, format = "YYYY-MM-DD"):string => {
    try {
        format =  format || 'YYYY-MM-DD';
        let birthDate = moment(date, format);
        let birthDay = birthDate.date();
        let birthMonth =  birthDate.month();
        let result = '';
        signsRanges.forEach((range) => {
            if (range.startMonth === birthMonth) {
                if (birthDay >= range.startDay) {
                    result = range.sign;
                }
            }

            if (range.endMonth === birthMonth) {
                if (birthDay <= range.endDay) {
                    result = range.sign;
                }
            }
        })
        return result;
    } catch (e) {
        console.error(e);
        return '';
    }
}

export class Villager {
    async displayVillager(params: string[]) {
        
        const findByName: any = villagers.find(vill => {
            
            for (const [key, value] of Object.entries(vill.name)) {
                
                if (params[1].toLocaleLowerCase() === value.toLowerCase()) return vill;       
            }
        });
        if (findByName) {
            
            const date = moment(findByName.birthday.split('/').map((el: string): number => parseInt(el)))
            const sign = getSign(date.format("YYYY-MM-DD"));
            const birthday =  date.format("DD MMMM");
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
                            value: findByName.species,
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
                            value: findByName.hobby,
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
            _sender.send(embed);
        } else {
            _sender.send('NOT FOUND :(');
        }
    }
}