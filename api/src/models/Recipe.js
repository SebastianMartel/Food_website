const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipe', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
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
        health_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        step_by_step: {
            type: DataTypes.STRING,
            allowNull: false
        }
      }, {timestamps: false});
};