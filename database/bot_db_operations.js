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
  try {
    const voter = await db.selectVoter(voterid);
    const votee = await db.selectVoter(voteeid);
    const prevCandidate = voter.candidateID;

    if (
      voter === `Voter with id ${voterid} does not exist!` &&
      voterid !== voteeid
    ) {
      await db.insertIntoVoters(voterid, voteeid);
    } else if (voterid === voteeid) {
      if (voter === `Voter with id ${voterid} does not exist!`) {
        await db.insertIntoVoters(voterid, voteeid);
      } else {
        await db.updateCandidate(voterid, voteeid);
      }
      if (prevCandidate !== undefined) {
        await db.decrementVotes(prevCandidate);
      }
      await db.incrementVotes(voteeid);
      return;
    } else {
      if (prevCandidate !== "0") {
        const prevVotee = await db.selectVoter(prevCandidate);
        if (prevVotee == `Voter with id ${prevCandidate} does not exist!`) {
          console.log("");
        } else {
          await db.decrementVotes(prevCandidate);
        }
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
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const updateLeaderboard = async () => {
  try {
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
    } else if (
      Object.values(leaderID).includes(currentLeader.voterID) == false
    ) {
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
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const getUserInformation = async (voterID) => {
  try {
    if (voterID === 0) {
      return 0;
    }
    const user = await db.selectVoter(voterID);
    return user;
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const getCurrentLeader = async () => {
  try {
    const leader = await db.selectLeader();
    return leader.voterID;
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const resetLeaderboard = async () => {
  try {
    await db.destroyLeaderboard();
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const removeVoter = async (voterID) => {
  try {
    const user = await db.selectVoter(voterID);
    if (user == `Voter with id ${voterID} does not exist!`) {
      return;
    }
    db.updateVotes(user.voterID);
    db.updateLeaderboard(0);
    if (user.candidateID !== "0" && user.candidateID !== user.voterID) {
      await db.decrementVotes(user.candidateID);
    }
    await db.deleteFromVoters(voterID);
    console.log(user, "removed user");
    const newLeader = await updateLeaderboard();
    console.log(newLeader);
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

module.exports = {
  updateVotes,
  updateLeaderboard,
  getUserInformation,
  getCurrentLeader,
  resetLeaderboard,
  removeVoter,
};
