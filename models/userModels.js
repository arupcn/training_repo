const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          firstName: {
            type: Sequelize.STRING(35),
            allowNull: false,
            unique: false
          },
          lastName: {
            type: Sequelize.STRING(35),
            allowNull: false,
            unique: false
          },
          email: {
            type: Sequelize.STRING(35),
            allowNull: false,
            unique: true
          },
          password: {
            type: Sequelize.STRING(20),
            allowNull: false
          }
    });
  
    return User;
  };