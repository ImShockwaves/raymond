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
    "villagerxfound": "Here is the villager **{{ name }}**!",
    "villagerxtitle": "Villager **{{ name }}** informations",
    "catchphrase": 'Initial phrase',
    "astrosign":"Astrological sign",
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
    'Pisces': 'Pisces',
    'Anteater': 'Anteater',
    'Bear': 'Bear',
    'Bird': 'Bird',
    'Bull': 'Bull',
    'Cat': 'Cat',
    'Cub': 'Cub',
    'Chicken': 'Chicken',
    'Cow': 'Cow',
    'Alligator': 'Alligator',
    'Deer': 'Deer',
    'Dog': 'Dog',
    'Duck': 'Duck',
    'Elephant': 'Elephant',
    'Frog': 'Frog',
    'Goat': 'Goat',
    'Gorilla': 'Gorilla',
    'Hamster': 'Hamster',
    'Hippo': 'Hippo',
    'Horse': 'Horse',
    'Koala': 'Koala',
    'Kangaroo': 'Kangaroo',
    'Lion': 'Lion',
    'Monkey': 'Monkey',
    'Mouse': 'Mouse',
    'Octopus': 'Octopus',
    'Ostrich': 'Ostrich',
    'Eagle': 'Eagle',
    'Penguin': 'Penguin',
    'Pig': 'Pig',
    'Rabbit': 'Rabbit',
    'Rhino': 'Rhino',
    'Sheep': 'Sheep',
    'Squirrel': 'Squirrel',
    'Tiger': 'Tiger',
    'Wolf': 'Wolf',
    "Education":"Education",
    "Fitness":"Fitness",
    "Fashion":"Fashion",
    "Nature":"Nature",
    "Play":"Play",
    "Music":"Music",
    "personality": "Personality",
    "Cranky":"Cranky",
    "Jock":"Jock",
    "Peppy":"Peppy",
    "Snooty":"Snooty",
    "Normal":"Normal",
    "Smug":"Smug",
    "Lazy":"Lazy",
    "Uchi":"Uchi",
    "villagernotfound": "Villager not found for {{ name }}"
}
const fr: translations = {
    "birthday": "Anniversaire",
    "species": 'Espèce',
    "hobby": "Loisir",
    "villagerxfound": "Voici le villageois **{{ name }}**!",
    "villagerxtitle": "Informations du villageois **{{ name }}**",
    "catchphrase": "Phrase de signature",
    "astrosign":"Signe astrologique",
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
    'Pisces': 'Poissons',
    "Anteater": "Fourmilier",
    "Bear": "Ours",
    "Bird": "Oiseau",
    "Bull": "Taureau",
    "Cat": "Chat",
    "Cub": "Louveteau",
    "Chicken": "Poulet",
    "Cow": "Vache",
    "Alligator": "Alligator",
    "Deer": "Cerf",
    "Dog": "Chien",
    "Duck": "Canard",
    "Elephant": "Éléphant",
    "Frog": "Grenouille",
    "Goat": "Chèvre",
    "Gorilla": "Gorille",
    "Hamster": "Hamster",
    "Hippo": "Hippopotame",
    "Horse": "Cheval",
    "Koala": "Koala",
    "Kangaroo": "Kangourou",
    "Lion": "Lion",
    "Monkey": "Singe",
    "Mouse": "Souris",
    "Octopus": "Poulpe",
    "Ostrich": "Autruche",
    "Eagle": "Aigle",
    "Penguin": "Pingouin",
    "Pig": "Cochon",
    "Rabbit": "Lapin",
    "Rhino": "Rhino",
    "Sheep": "Mouton",
    "Squirrel": "Écureuil",
    "Tiger": "Tigre",
    "Wolf": "Loup",
    "Education": "Éducation",
    "Fitness": "Fitness",
    "Fashion": "Mode",
    "Nature": "Nature",
    "Play": "Jeux",
    "Music": "Musique",
    "personality": "Personnalité",
    "Cranky":"Versatile",
    "Jock":"Sportif",
    "Peppy":"Vive",
    "Snooty":"Arrogante",
    "Normal":"Normale",
    "Smug":"Chic",
    "Lazy":"Paresseux",
    "Uchi":"Grande soeur",
    "villagernotfound": "Villageois introuvable pour {{ name }}"
}

export { USen, EUfr, fr, us };