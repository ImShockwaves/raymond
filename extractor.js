const data = require(`./data/v1a/${process.argv[2]}.json`);

let extracted = [];
if (process.argv[3]) {

    for (const dat of data) {
        if (!extracted.some(el => el === dat[process.argv[3]])) {
            extracted.push(dat[process.argv[3]]);
        }
    }
    let resultat = {};
    for (const res of extracted) {
        resultat[res] = res;
    }
    console.log("DATA EXTRACTED:", JSON.stringify(resultat));
}