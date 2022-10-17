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

db.selectMaxVotes().then((data) => {
  db.selectLeaderWithVotes(data).then((data) => {
    data.forEach((element) => {
      Object.keys(element.dataValues).forEach((key) => {
        db.updateLeaderboard(element.dataValues[key]);
      });
    });
  });
});

db.selectLeader().then((data) => {
  //   console.log(data);
  if (data.length === 0) {
    console.log("Leader doesn't exist!");
  } else {
    data.forEach((element) => {
      const keys = Object.keys(element.dataValues);
      db.deleteOldLeader(element.dataValues["voterID"]);
    });
  }
});
// db.selectLeaderWithVotes();

// db.selectVoter(1212).then((data) => {
//   if (data.length === 0) {
//     console.log("User doesn't exist!");
//     db.insertIntoVoters(1212, 322332);
//     db.selectVoter(1223).then((data) => {
//       if (data.length === 0) {
//         console.log("Candidate doesn't exist!");
//         db.insertIntoVoters(322332, 000000, 1);
//       } else {
//         db.incrementVotes(322332);
//       }
//     });
//   } else {
//     console.log("User exists!");
//     oldCandidate = db.selectCandidate(1212).then((data) => {
//       data.forEach((element) => {
//         Object.keys(element.dataValues).forEach((key) => {
//           if (element.dataValues[key] != 000000) {
//             db.selectVoter(element.dataValues[key]).then((data) => {
//               if (data.length === 0) {
//                 console.log("Candidate doesn't exist!");
//                 db.insertIntoVoters(element.dataValues[key], 000000, 0);
//               } else {
//                 db.decrementVotes(element.dataValues[key]);
//               }
//             });
//           }
//         });
//       });
//     });
//     console.log("End");
//     db.updateCandidate(1212, 322332);
//     db.selectVoter(322332).then((data) => {
//       if (data.length === 0) {
//         console.log("Candidate doesn't exist!");
//         db.insertIntoVoters(322332, 000000, 1);
//       } else {
//         db.incrementVotes(322332);
//       }
//     });
//   }
// });

// -----------------------------------

// const { Voters } = require("./models/voters");

// // // console.log(db.testMethod());
// const testRow = db.selectCandidateVotedFor("1223").then((data) => {
//   if (data.length === 0) {
//     console.log("User doesn't exist!");
//   } else {
//     console.log(data);
//   }
// });

// const { botops } = require("./bot_db_operations");

// botops.checkIfVoterExists(1223).then((data) => {
//   data.forEach((element) => console.log(JSON.stringify(element, null, 2)));
// });
// console.log(JSON.stringify(testRow, null, 2));
// console.log(testRow);
// x = db
//   .updateCandidate(1223, 1212)
//   .then((data) => {
//     data.forEach((element) => {
//       console.log(JSON.stringify(element, null, 2));
//     });
//   })
//   .then((data) => console.log(data));

// db.updateCandidate(6565, 1232).then((data) => console.log(data));
// .finally(() => db.db.close());
// db.db.close();

// db.updateLeaderboard("12132323");

// db.sync_all_tables();
