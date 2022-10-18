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

const updateVotes = async (voterid, voteeid) => {
  const voter = await db.selectVoter(voterid);
  const votee = await db.selectVoter(voteeid);
  const prevCandidate = voter.candidateID;

  if (voter === `Voter with id ${voterid} does not exist!`) {
    await db.insertIntoVoters(voterid, voteeid);
  } else {
    await db.decrementVotes(prevCandidate);
    await db.updateCandidate(voterid, voteeid);
  }

  if (votee == `Voter with id ${voterid} does not exist!`) {
    await db.insertIntoVoters(voteeid, 0, 1);
  } else {
    await db.incrementVotes(voteeid);
  }

  newVoterStats = await db.selectVoter(voterid);
  newCandidate = newVoterStats.candidateID;
};

const updateLeaderboard = async () => {
  const maxVotes = await db.selectMaxVotes();
  const leaderID = await db.selectLeaderWithVotes(maxVotes);
  const currentLeader = await db.selectLeader();
  if (currentLeader === 0 && maxVotes !== 0) {
    await db.updateLeaderboard(leaderID.leader_0);
    const newLeader = await db.selectLeader();
    return {
      oldLeader: "No Previous Leader",
      newLeader: newLeader.voterID,
    };
  } else if (
    Object.values(leaderID).includes(currentLeader.voterID) &&
    maxVotes !== 0
  ) {
    return {
      currentleader: currentLeader.voterID,
      newleader: "Same Leader",
    };
  } else if (Object.values(leaderID).includes(currentLeader.voterID) == false) {
    await db.updateLeaderboard(leaderID.leader_0);
    await db.deleteOldLeader(currentLeader.voterID);
    const newLeader = leaderID.leader_0;
    return {
      oldLeader: currentLeader.voterID,
      newLeader: newLeader,
    };
  } else {
    await db.resetLeader();
    return "Leader doesn't exist! Vote for someone now to bring forth the LEADER!";
  }
};

const getUserInformation = async (voterID) => {
  if (voterID === 0) {
    return 0;
  }
  const user = await db.selectVoter(voterID);
  return user;
};

const getCurrentLeader = async () => {
  const leader = await db.selectLeader();
  return leader.voterID;
};

const resetLeaderboard = async () => {
  await db.destroyLeaderboard();
};

module.exports = {
  updateVotes,
  updateLeaderboard,
  getUserInformation,
  getCurrentLeader,
  resetLeaderboard,
};
