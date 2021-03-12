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
    "villagerxfound": "Here is the villager {{ name }}!"
}
const fr: translations = {
    "birthday": "Anniversaire",
    "species": 'Espèce',
    "hobby": "Loisir",
    "villagerxfound": "Voici le villageois {{ name }}!"
}

export { USen, EUfr, fr, us };