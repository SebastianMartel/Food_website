const json = require('./json.json');

const uniqueDiets = [...new Set(json.results.flatMap(item => item.diets))];

console.log(uniqueDiets);
