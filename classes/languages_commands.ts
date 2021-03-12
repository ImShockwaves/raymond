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
    "birthday": "Birthday"
}
const fr: translations = {
    "birthday": "Anniversaire"
}

export { USen, EUfr, fr, us };