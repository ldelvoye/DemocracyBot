const { Sequelize, DataTypes, Model } = require("sequelize");
const { database } = require("../database");

class Voters extends Model {}

sequelize = database;

Voters.init(
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
    votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

// sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");

module.exports = { Voters };

// console.log(database.models);
