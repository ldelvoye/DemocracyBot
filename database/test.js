// const { Sequelize, DataTypes, Model } = require("sequelize");

// class Test extends Model {}

// sequelize = database;

// Test.init(
//   {
//     voterID: {
//       type: DataTypes.BIGINT,
//       allowNull: false,
//       primaryKey: true,
//     },
//     candidate: {
//       type: DataTypes.BIGINT,
//       allowNull: false,
//     },
//     leader: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//   }
// );
// // sequelize.drop();
// // console.log("All models were synchronized successfully.");
// module.exports = { Test };

// // console.log(database.models);

const { db } = require("./database_operations");
const { Voters } = require("./models/voters");

// console.log(db.testMethod());
// const testRow = db.selectCandidateVotedFor("12132323");
// console.log(JSON.stringify(testRow, null, 2));
// console.log(testRow);
db.updateCandidate(1223, 1212).then((data) => {
  data.forEach((element) => {
    console.log(JSON.stringify(element, null, 2));
  });
});
// .finally(() => db.db.close());
// db.db.close();

// db.updateLeaderboard("12132323");

// db.sync_all_tables();
