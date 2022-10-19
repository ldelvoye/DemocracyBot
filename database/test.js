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

const updateLeaderboard = async () => {
  const maxVotes = await db.selectMaxVotes();
  const leaderID = await db.selectLeaderWithVotes(maxVotes);
  const currentLeader = await db.selectLeader();
  if (currentLeader === 0 && maxVotes !== 0) {
    await db.updateLeaderboard(leaderID.leader_0);
    const newLeader = await db.selectLeader();
    return {
      currentLeader: 0,
      newLeader: newLeader.voterID,
    };
  } else if (
    Object.values(leaderID).includes(currentLeader.voterID) &&
    maxVotes !== 0
  ) {
    return {
      currentLeader: currentLeader.voterID,
      newLeader: 0,
    };
  } else if (Object.values(leaderID).includes(currentLeader.voterID) == false) {
    await db.updateLeaderboard(leaderID.leader_0);
    await db.deleteOldLeader(currentLeader.voterID);
    const newLeader = leaderID.leader_0;
    return {
      currentLeader: currentLeader.voterID,
      newLeader: newLeader,
    };
  } else {
    await db.updateLeaderboard(0);
    return 0;
  }
};

const removeVoter = async (voterID) => {
  const user = await db.selectVoter(voterID);
  if (user == `Voter with id ${voterID} does not exist!`) {
    return;
  }
  db.updateVotes(user.voterID);
  if (user.leader == true) {
    const newLeader = await updateLeaderboard();
    console.log(newLeader);
  }
  console.log(user, "removed user");
  if (user.candidateID !== 0) {
    await db.decrementVotes(user.candidateID);
  }
  await db.deleteFromVoters(voterID);
};

removeVoter(6);

// const updatevoter = async (voterid, voteeid) => {
//   const voter = await db.selectVoter(voterid);
//   const votee = await db.selectVoter(voteeid);
//   const prevCandidate = voter.candidateID;

//   if (voter === `Voter with id ${voterid} does not exist!`) {
//     await db.insertIntoVoters(voterid, voteeid);
//   } else {
//     await db.decrementVotes(prevCandidate);
//     await db.updateCandidate(voterid, voteeid);
//   }

//   if (votee == `Voter with id ${voterid} does not exist!`) {
//     await db.insertIntoVoters(voteeid, 0, 1);
//   } else {
//     await db.incrementVotes(voteeid);
//   }

//   newVoterStats = await db.selectVoter(voterid);
//   newCandidate = newVoterStats.candidateID;

//   return {
//     oldCandidate: prevCandidate,
//     newCandidate: newCandidate,
//   };
// };

// updatevoter(1212, 322332).then((data) => console.log(data));

// const b = async () => {
//   const leader = await db.selectLeader();
//   return leader.voterID;
// };

// (async () => {
//   console.log(await db.selectVoter(5423));
// })();

// const getCurrentLeader = async function () {
//   db.selectLeader().then((data) => {
//     // console.log(data);
//     data.forEach((element) => {
//       console.log(element.dataValues["voterID"]);
//       return element.dataValues["voterID"];
//       Object.keys(element.dataValues).forEach((key) => {
//         db.updateLeaderboard(element.dataValues[key]);
//       });
//     });
//   });
// };

// const x = getCurrentLeader().then((data) => console.log(data));
// console.log(x);

/*

  get maxVotes userIDs and currentLeader
  if currentLeader exists in the userIDs with maxVotes don't do anything

  else if currentLeader does not exist in the userIDs with the maxVotes
  change leader and 

*/

// const a = async () => {
//   const maxVotes = await db.selectMaxVotes();
//   const leaderID = await db.selectLeaderWithVotes(maxVotes);
//   const currentLeader = await db.selectLeader();
//   if (currentLeader == "No leader exists!" && maxVotes !== 0) {
//     await db.updateLeaderboard(leaderID.leader_0);
//     const newLeader = await db.selectLeader();
//     return {
//       oldLeader: "No Previous Leader",
//       newLeader: newLeader.voterID,
//     };
//   } else if (
//     Object.values(leaderID).includes(currentLeader.voterID) &&
//     maxVotes !== 0
//   ) {
//     return {
//       currentleader: currentLeader.voterID,
//       newleader: "Same Leader",
//     };
//   } else if (Object.values(leaderID).includes(currentLeader.voterID) == false) {
//     await db.updateLeaderboard(leaderID.leader_0);
//     await db.deleteOldLeader(currentLeader.voterID);
//     const newLeader = leaderID.leader_0;
//     return {
//       oldLeader: currentLeader.voterID,
//       newLeader: newLeader,
//     };
//   } else {
//     return "Leader doesn't exist! Vote for someone now to bring forth the LEADER!";
//   }

// console.log(await db.selectLeader());
// console.log(await db.selectLeaderWithVotes(await db.selectMaxVotes()));
// };

// console.log(data);

// db.selectMaxVotes().then((data) => {
//   db.selectLeaderWithVotes(data).then((data) => {
//     data.forEach((element) => {
//       Object.keys(element.dataValues).forEach((key) => {
//         db.updateLeaderboard(element.dataValues[key]);
//       });
//     });
//   });
// });

// db.selectLeader().then((data) => {
//   //   console.log(data);
//   if (data.length === 0) {
//     console.log("Leader doesn't exist!");
//   } else {
//     data.forEach((element) => {
//       const keys = Object.keys(element.dataValues);
//       db.deleteOldLeader(element.dataValues["voterID"]);
//     });
//   }
// });
// // db.selectLeaderWithVotes();

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
