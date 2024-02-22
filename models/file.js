const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 


const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = File;
