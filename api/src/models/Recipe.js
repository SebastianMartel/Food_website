const { DataTypes } = require('sequelize');
//__________________________________________________


module.exports = (sequelize) => {
    sequelize.define('Recipe', {
        id: {
            type: DataTypes.UUID, // or UUID // or ID
            defaultValue: DataTypes.UUIDV4,
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
            type: DataTypes.TEXT,
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