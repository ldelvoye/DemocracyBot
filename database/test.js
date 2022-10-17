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

db.selectVoter("1223").then((data) => {
  if (data.length === 0) {
    console.log("User doesn't exist!");
  } else {
    console.log("User exists");
  }
});

// // // console.log(db.testMethod());
// const testRow = db.selectCandidateVotedFor("1223").then((data) => {
//   if (data.length === 0) {
//     console.log("User doesn't exist!");
//   } else {
//     console.log(data);
//   }
// });

// const { botops } = require("./bot_db_operations");

// botops
//   .checkIfVoterExists(1223)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
// console.log(JSON.stringify(testRow, null, 2));
// console.log(testRow);
// x = db
//   .updateCandidate(1223, 1212)
//   .then((data) => {
//     data.forEach((element) => {
//       console.log(JSON.stringify(element, null, 2));
//     });
//   })
//   .then(() => console.log(x));

// db.updateCandidate(6565, 1232).then((data) => console.log(data));
// .finally(() => db.db.close());
// db.db.close();

// db.updateLeaderboard("12132323");

// db.sync_all_tables();
