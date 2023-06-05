const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipe', {
        id: {
            type: DataTypes.INTEGER, // or UUID
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        healthScore: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stepByStep: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        }
      }, {timestamps: false});
};