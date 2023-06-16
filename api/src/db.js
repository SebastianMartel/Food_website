const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// doesn't work: require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
//__________________________________________________



const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // let's Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Read all the files from Models, require them and add them to modelDefiners:
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


// Pass the sequelize instance to each model:
modelDefiners.forEach(model => model(sequelize));
// Capitalize the names of the models:
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// Sequelize.models contains all the models imported as properties
  const { Recipe, Diet } = sequelize.models;

// Relations:
// Product.hasMany(Reviews);

Recipe.belongsToMany(Diet, {through: 'recipes_diets', timestamps: false});
Diet.belongsToMany(Recipe, {through: 'recipes_diets', timestamps: false});


//__________________________________________________
module.exports = {
  ...sequelize.models, // const { Product, User } = require('./db.js');
  conn: sequelize,     // const { conn } = require('./db.js');
};