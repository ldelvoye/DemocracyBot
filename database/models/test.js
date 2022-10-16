const { Sequelize, DataTypes, Model } = require("sequelize");
const { database } = require("../database");

class Test extends Model {}

sequelize = database;

Test.init(
  {
    voterID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    candidate: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    leader: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
// sequelize.drop();
// console.log("All models were synchronized successfully.");
module.exports = { Test };

// console.log(database.models);
