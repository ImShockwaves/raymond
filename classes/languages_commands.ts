import { Villager } from './villager/villager';
interface translations { [key: string]: string; }

const USen = [
    "villager",
    "fish"
];
const EUfr = [
    "villageois",
    "poisson"
];
const us: translations = {
    "birthday": "Birthday",
    "species": 'Species',
    "hobby": 'Hobby',
    "villagerxfound": "Here is the villager {{ name }}!",
    "villagerxtitle": "Villager {{ name }} informations",
    "catchphrase": 'Initial phrase',
    "astrosign":"Signe astrologique",
    'Aries': 'Aries',
    'Taurus': 'Taurus',
    'Gemini': 'Gemini',
    'Cancer': 'Cancer',
    'Leo': 'Leo',
    'Virgo': 'Virgo',
    'Libra': 'Libra',
    'Scorpio': 'Scorpio',
    'Sagittarius': 'Sagittarius',
    'Capricorn': 'Capricorn',
    'Aquarius': 'Aquarius',
    'Pisces': 'Pisces'
}
const fr: translations = {
    "birthday": "Anniversaire",
    "species": 'Espèce',
    "hobby": "Loisir",
    "villagerxfound": "Voici le villageois {{ name }}!",
    "villagerxtitle": "Informations du villageois {{ name }}",
    "catchphrase": "Phrase de signature",
    "astrosign":"Astrological sign",
    'Aries': 'Bélier',
    'Taurus': 'Taureau',
    'Gemini': 'Gémeaux',
    'Cancer': 'Cancer',
    'Leo': 'Lion',
    'Virgo': 'Vierge',
    'Libra': 'Balance',
    'Scorpio': 'Scorpion',
    'Sagittarius': 'Sagittaire',
    'Capricorn': 'Capricorne',
    'Aquarius': 'Verseau',
    'Pisces': 'Poissons'
}

export { USen, EUfr, fr, us };