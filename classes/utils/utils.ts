import villager from '../../data/v1a/villagers.json';
import { Villagers_name } from '../../models/villagers';
import * as langs from '../languages_commands';
import color from 'colors';
import _ from 'lodash';
import moment from 'moment';

    
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

    getSign(date: string, format = "YYYY-MM-DD"):string {
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
}