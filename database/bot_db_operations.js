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

// const updateVotes = async (voterid, voteeid) => {
//   const t = await sequelize.transaction();
//   try {
//     const voter = await db.selectVoter(voterid, t);
//     const votee = await db.selectVoter(voteeid, t);
//     const prevCandidate = voter.candidateID;

//     if (
//       voter === `Voter with id ${voterid} does not exist!` &&
//       voterid !== voteeid
//     ) {
//       await db.insertIntoVoters(voterid, voteeid, t);
//     } else if (voterid === voteeid) {
//       if (voter === `Voter with id ${voterid} does not exist!`) {
//         await db.insertIntoVoters(voterid, voteeid, t);
//       } else {
//         await db.updateCandidate(voterid, voteeid, t);
//       }
//       if (prevCandidate !== undefined) {
//         await db.decrementVotes(prevCandidate, t);
//       }
//       await db.incrementVotes(voteeid, t);
//     } else {
//       if (prevCandidate !== "0") {
//         const prevVotee = await db.selectVoter(prevCandidate, t);
//         if (prevVotee == `Voter with id ${prevCandidate} does not exist!`) {
//           console.log("");
//         } else {
//           await db.decrementVotes(prevCandidate, t);
//         }
//         // const x = await db.selectVoter(prevCandidate, t);
//         // console.log(x);
//       }
//       await db.updateCandidate(voterid, voteeid, t);
//     }

//     if (
//       votee == `Voter with id ${voteeid} does not exist!` &&
//       voterid !== voteeid
//     ) {
//       await db.insertIntoVoters(voteeid, 0, t, 1);
//     } else {
//       await db.incrementVotes(voteeid, t);
//     }

//     await t.commit();
//   } catch (e) {
//     await t.rollback();
//     console.log(`${e.name}: ${e.message}`);
//     return { result: "Error!", error: `${e.name}: ${e.message}` };
//   }
// };

// const updateLeaderboard = async () => {
//   const t = await sequelize.transaction();

//   try {
//     const maxVotes = await db.selectMaxVotes(t);
//     const leaderID = await db.selectLeaderWithVotes(maxVotes, t);
//     const currentLeader = await db.selectLeader(t);
//     if (leaderID === 0) {
//       await db.updateLeaderboard(0, t);
//       await t.commit();
//       return 0;
//     } else if (currentLeader === 0 && maxVotes !== 0) {
//       await db.updateLeaderboard(leaderID.leader_0, t);
//       const newLeader = await db.selectLeader(t);
//       await t.commit();
//       return {
//         currentLeader: 0,
//         newLeader: newLeader.voterID,
//       };
//     } else if (
//       Object.values(leaderID).includes(currentLeader.voterID) &&
//       maxVotes !== 0
//     ) {
//       await t.commit();
//       return {
//         currentLeader: currentLeader.voterID,
//         newLeader: 0,
//       };
//     } else if (
//       Object.values(leaderID).includes(currentLeader.voterID) == false
//     ) {
//       await db.updateLeaderboard(leaderID.leader_0, t);
//       await db.deleteOldLeader(currentLeader.voterID, t);
//       const newLeader = leaderID.leader_0;
//       await t.commit();
//       return {
//         currentLeader: currentLeader.voterID,
//         newLeader: newLeader,
//       };
//     } else {
//       await db.updateLeaderboard(0, t);
//       await t.commit();
//       return 0;
//     }
//   } catch (e) {
//     await t.rollback();
//     console.log(`${e.name}: ${e.message}`);
//     return { result: "Error!", error: `${e.name}: ${e.message}` };
//   }
// };

const voteCommandDB = async (voterid, voteeid) => {
  const t = await db.db.transaction();
  try {
    const voter = await db.selectVoter(voterid, t);
    const votee = await db.selectVoter(voteeid, t);
    const prevCandidate = voter.candidateID;

    if (
      voter === `Voter with id ${voterid} does not exist!` &&
      voterid !== voteeid
    ) {
      await db.insertIntoVoters(voterid, voteeid, t);
    } else if (voterid === voteeid) {
      if (voter === `Voter with id ${voterid} does not exist!`) {
        await db.insertIntoVoters(voterid, voteeid, t);
      } else {
        await db.updateCandidate(voterid, voteeid, t);
      }
      if (prevCandidate !== undefined) {
        await db.decrementVotes(prevCandidate, t);
      }
      await db.incrementVotes(voteeid, t);
    } else {
      if (prevCandidate !== "0") {
        const prevVotee = await db.selectVoter(prevCandidate, t);
        if (prevVotee == `Voter with id ${prevCandidate} does not exist!`) {
          console.log("");
        } else {
          await db.decrementVotes(prevCandidate, t);
        }
        // const x = await db.selectVoter(prevCandidate, t);
        // console.log(x);
      }
      await db.updateCandidate(voterid, voteeid, t);
    }

    if (
      votee == `Voter with id ${voteeid} does not exist!` &&
      voterid !== voteeid
    ) {
      await db.insertIntoVoters(voteeid, 0, t, 1);
    } else if (voterid !== voteeid) {
      await db.incrementVotes(voteeid, t);
    }

    const maxVotes = await db.selectMaxVotes(t);
    const leaderID = await db.selectLeaderWithVotes(maxVotes, t);
    const currentLeader = await db.selectLeader(t);
    if (leaderID === 0) {
      await db.updateLeaderboard(0, t);
      await t.commit();
      return 0;
    } else if (currentLeader === 0 && maxVotes !== 0) {
      await db.updateLeaderboard(leaderID.leader_0, t);
      const newLeader = await db.selectLeader(t);
      await t.commit();
      return {
        currentLeader: 0,
        newLeader: newLeader.voterID,
      };
    } else if (
      Object.values(leaderID).includes(currentLeader.voterID) &&
      maxVotes !== 0
    ) {
      await t.commit();
      return {
        currentLeader: currentLeader.voterID,
        newLeader: 0,
      };
    } else if (
      Object.values(leaderID).includes(currentLeader.voterID) == false
    ) {
      await db.updateLeaderboard(leaderID.leader_0, t);
      await db.deleteOldLeader(currentLeader.voterID, t);
      const newLeader = leaderID.leader_0;
      await t.commit();
      return {
        currentLeader: currentLeader.voterID,
        newLeader: newLeader,
      };
    } else {
      await db.updateLeaderboard(0, t);
      await t.commit();
      return 0;
    }
  } catch (e) {
    await t.rollback();
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const getUserInformation = async (voterID) => {
  const t = await db.db.transaction();

  try {
    if (voterID === 0) {
      return 0;
    }
    const user = await db.selectVoter(voterID, t);
    await t.commit();
    return user;
  } catch (e) {
    await t.rollback();
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const getCurrentLeader = async () => {
  const t = await db.db.transaction();

  try {
    const leader = await db.selectLeader(t);
    await t.commit();
    return leader.voterID;
  } catch (e) {
    await t.rollback();
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const resetLeaderboard = async () => {
  const t = await db.db.transaction();

  try {
    await db.destroyLeaderboard(t);
    await t.commit();
  } catch (e) {
    await t.rollback();
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

const removeVoter = async (voterID) => {
  const t = await db.db.transaction();

  try {
    const user = await db.selectVoter(voterID, t);
    if (user == `Voter with id ${voterID} does not exist!`) {
      return;
    }
    db.updateVotes(user.voterID, t);
    db.updateLeaderboard(0, t);
    if (user.candidateID !== "0" && user.candidateID !== user.voterID) {
      await db.decrementVotes(user.candidateID, t);
    }
    await db.deleteFromVoters(voterID, t);
    console.log(user, "removed user");

    const maxVotes = await db.selectMaxVotes(t);
    const leaderID = await db.selectLeaderWithVotes(maxVotes, t);
    const currentLeader = await db.selectLeader(t);
    if (leaderID === 0) {
      await db.updateLeaderboard(0, t);
      await t.commit();
      return 0;
    } else if (currentLeader === 0 && maxVotes !== 0) {
      await db.updateLeaderboard(leaderID.leader_0, t);
      const newLeader = await db.selectLeader(t);
      await t.commit();
      return {
        currentLeader: 0,
        newLeader: newLeader.voterID,
      };
    } else if (
      Object.values(leaderID).includes(currentLeader.voterID) &&
      maxVotes !== 0
    ) {
      await t.commit();
      return {
        currentLeader: currentLeader.voterID,
        newLeader: 0,
      };
    } else if (
      Object.values(leaderID).includes(currentLeader.voterID) == false
    ) {
      await db.updateLeaderboard(leaderID.leader_0, t);
      await db.deleteOldLeader(currentLeader.voterID, t);
      const newLeader = leaderID.leader_0;
      await t.commit();
      return {
        currentLeader: currentLeader.voterID,
        newLeader: newLeader,
      };
    } else {
      await db.updateLeaderboard(0, t);
      await t.commit();
      return 0;
    }
  } catch (e) {
    await t.rollback();
    console.log(`${e.name}: ${e.message}`);
    return { result: "Error!", error: `${e.name}: ${e.message}` };
  }
};

module.exports = {
  // updateVotes,
  // updateLeaderboard,
  voteCommandDB,
  getUserInformation,
  getCurrentLeader,
  resetLeaderboard,
  removeVoter,
};
