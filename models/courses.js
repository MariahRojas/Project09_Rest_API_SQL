'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true, //nullable
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true, //nullable
    },
  }, { sequelize });

  Course.associate = (models) => {
    // TODO Add associations.
    Course.belongsTo(models.User);
  };

  return Course;
};
