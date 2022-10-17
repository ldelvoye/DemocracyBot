// const { db } = require("./database_operations");

// class BotOperations {
//   constructor() {
//     this.db = db;
//   }

//   testMethod() {
//     console.log("I work!");
//   }

//   async checkIfVoterExists(voterid) {
//     this.db.selectVoter(voterid).then((data) => {
//       console.log(data);
//       if (data.length === 0) {
//         return data;
//       } else {
//         return data;
//       }
//     });
//   }
// }

// //   async updateVoterCandidate() {}

// botops = new BotOperations();

// module.exports = { botops };

const { db } = require("./database_operations");

const updateVotes = function (voterID, voteeID) {
  db.selectVoter(voterID).then((data) => {
    if (data.length === 0) {
      console.log("User doesn't exist!");
      db.insertIntoVoters(voterID, voteeID);
      db.selectVoter(voteeID).then((data) => {
        if (data.length === 0) {
          console.log("Candidate doesn't exist!");
          db.insertIntoVoters(voteeID, 000000, 1);
        } else {
          db.incrementVotes(voteeID);
        }
      });
    } else {
      console.log("User exists!");
      oldCandidate = db.selectCandidate(voterID).then((data) => {
        data.forEach((element) => {
          Object.keys(element.dataValues).forEach((key) => {
            if (element.dataValues[key] != 000000) {
              db.selectVoter(element.dataValues[key]).then((data) => {
                if (data.length === 0) {
                  console.log("Candidate doesn't exist!");
                  db.insertIntoVoters(element.dataValues[key], 000000, 0);
                } else {
                  db.decrementVotes(element.dataValues[key]);
                }
              });
            }
          });
        });
      });
      console.log("End");
      db.updateCandidate(voterID, voteeID);
      db.selectVoter(voteeID).then((data) => {
        if (data.length === 0) {
          console.log("Candidate doesn't exist!");
          db.insertIntoVoters(voteeID, 000000, 1);
        } else {
          db.incrementVotes(voteeID);
        }
      });
    }
  });
};

const updateLeaderboard = function () {
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
    if (data.length === 0) {
      console.log("Leader doesn't exist!");
    } else {
      data.forEach((element) => {
        const keys = Object.keys(element.dataValues);
        db.deleteOldLeader(element.dataValues["voterID"]);
      });
    }
  });
};

const getUserInformation = function () {};

const getCurrentVote = function () {};

module.exports = {
  updateVotes,
  updateLeaderboard,
  getCurrentLeader,
  getCurrentVote,
};
