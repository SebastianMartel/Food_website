const json = require('./json.json');
//__________________________________________________


const uniqueDiets = [...new Set(json.results.flatMap(item => item.diets))];

console.log(uniqueDiets);


// const dietsSet = new Set();

// json.results.forEach((recipe) => {
//   recipe.diets.forEach((diet) => {
//     dietsSet.add(diet);
//   });
// });

// const uniqueDiets = Array.from(dietsSet);
// console.log(uniqueDiets);


// const dietsSet = new Set();

// json.results.forEach((recipe) => {
//   if (recipe.diets) {
//     recipe.diets.forEach((diet) => {
//       dietsSet.add(diet);
//     });
//   }
// });

// const uniqueDiets = Array.from(dietsSet);
// console.log(uniqueDiets);