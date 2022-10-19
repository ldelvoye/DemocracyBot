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
    if (voterid === voteeid) {
      await db.insertIntoVoters(voterid, voteeid, 1);
      return;
    } else {
      await db.insertIntoVoters(voterid, voteeid);
    }
  } else {
    if (prevCandidate !== "0") {
      const prevVotee = await db.selectVoter(prevCandidate);
      if (prevVotee == `Voter with id ${prevCandidate} does not exist!`) {
        console.log("");
      }
      await db.decrementVotes(prevCandidate);
      // const x = await db.selectVoter(prevCandidate);
      // console.log(x);
    }
    await db.updateCandidate(voterid, voteeid);
  }

  if (votee == `Voter with id ${voteeid} does not exist!`) {
    await db.insertIntoVoters(voteeid, 0, 1);
  } else {
    await db.incrementVotes(voteeid);
  }
};

const updateLeaderboard = async () => {
  const maxVotes = await db.selectMaxVotes();
  const leaderID = await db.selectLeaderWithVotes(maxVotes);
  const currentLeader = await db.selectLeader();
  if (leaderID === 0) {
    await db.updateLeaderboard(0);
    return 0;
  } else if (currentLeader === 0 && maxVotes !== 0) {
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
  if (user.candidateID !== "0") {
    await db.decrementVotes(user.candidateID);
  }
  await db.deleteFromVoters(voterID);
};

module.exports = {
  updateVotes,
  updateLeaderboard,
  getUserInformation,
  getCurrentLeader,
  resetLeaderboard,
  removeVoter,
};
