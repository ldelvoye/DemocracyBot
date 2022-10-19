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

const updateVotes = async (voterid, voteeid) => {
  const voter = await db.selectVoter(voterid);
  const votee = await db.selectVoter(voteeid);
  const prevCandidate = voter.candidateID;

  if (voter === `Voter with id ${voterid} does not exist!`) {
    await db.insertIntoVoters(voterid, voteeid);
  } else if (voterid === voteeid) {
    await db.updateCandidate(voterid, voteeid);
    await db.decrementVotes(prevCandidate);
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
  if (user.candidateID !== "0" && user.candidateID !== user.voterID) {
    await db.decrementVotes(user.candidateID);
  }
  await db.deleteFromVoters(voterID);
};

// 0: resets leaderboard
// resetLeaderboard();

// 1: user not existing votes for someone new
// (async () => {
//   await updateVotes(1, 2);
//   await updateLeaderboard();
// })();

// 2:  user existing votes for someone not existing
// (async () => {
//   await updateVotes(2, 3);
//   await updateLeaderboard();
// })();

// 3: user changes vote to themselves
// (async () => {
//   await updateVotes(2, 2);
//   await updateLeaderboard();
// })();

// 4: user existing votes for someone existing
// (async () => {
//   await updateVotes(1, 3);
//   await updateLeaderboard();
// })();

// 5: users votes for themselves and changes leader
// (async () => {
//   await updateVotes(1, 1);
//   await updateVotes(2, 1);
//   await updateLeaderboard();
// })();

// 6: normal voter leaves
removeVoter(1);

// 7: leader leaves
// removeVoter(3);
