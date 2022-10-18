const { database } = require("./database");
const { Voters } = require("./models/voters.js");

class DatabaseOperations {
  constructor() {
    this.db = database;
    this.x = "x";
  }

  testMethod() {
    return "Works!";
  }

  async sync_all_tables() {
    await this.db.sync({ force: true });
  }

  async incrementVotes(candidateid) {
    await Voters.increment({ votes: 1 }, { where: { voterID: candidateid } });
  }

  async decrementVotes(candidateid) {
    await Voters.increment({ votes: -1 }, { where: { voterID: candidateid } });
  }

  async insertIntoVoters(voterid, candidateid, vote = 0) {
    const voter = await Voters.create({
      voterID: voterid,
      candidate: candidateid,
      leader: false,
      votes: vote,
    });

    console.log(`Voter ${voter.voterID} has been created!`);
    return voter;
  }

  async selectLeader() {
    const leader = await Voters.findOne({
      where: {
        leader: true,
      },
    });
    if (leader !== null) {
      const result = {
        voterID: leader["dataValues"]["voterID"],
        // candidateID: leader["dataValues"]["candidate"],
        // leader: leader["dataValues"]["leader"],
        // votes: leader["dataValues"]["votes"],
      };
      return result;
    } else {
      return "No leader exists!";
    }
  }

  async selectLeaderWithVotes(votes) {
    const leader = await Voters.findAll({
      attributes: ["voterID"],
      where: {
        votes: votes,
      },
    });

    const result = {};

    for (let i = 0; i < leader.length; i++) {
      result[`leader_${i}`] = leader[i]["dataValues"]["voterID"];
    }

    return result;
  }

  async selectVoter(voterid) {
    const voter = await Voters.findOne(
      {
        where: {
          voterID: voterid,
        },
      },
      {
        raw: true,
      }
    );

    if (voter !== null) {
      const result = {
        voterID: voter["dataValues"]["voterID"],
        candidateID: voter["dataValues"]["candidate"],
        leader: voter["dataValues"]["leader"],
        votes: voter["dataValues"]["votes"],
      };
      return result;
    } else {
      return `Voter with id ${voterid} does not exist!`;
    }

    return voter;
  }

  async selectCandidate(voterid) {
    const candidate = await Voters.findAll(
      {
        attributes: ["candidate"],
        where: {
          voterID: voterid,
        },
      },
      {
        raw: true,
      }
    );

    return candidate;
  }

  async updateCandidate(voterid, candidateid) {
    const x = await Voters.update(
      { candidate: candidateid },
      {
        where: {
          voterID: voterid,
        },
      },
      {
        raw: true,
      }
    );

    return x;
  }

  async updateLeaderboard(voterid) {
    await Voters.update(
      { leader: true },
      {
        where: {
          voterID: voterid,
        },
      }
    );

    console.log(`Leaderboard has been updated!`);
  }

  async deleteOldLeader(voterid) {
    await Voters.update(
      { leader: false },
      {
        where: {
          voterID: voterid,
        },
      }
    );
    console.log(`Old Leader has been deleted!`);
  }

  async selectMaxVotes() {
    const maxVotes = await Voters.max("votes");

    // const maxvotes = maxVotes;

    return maxVotes;
  }

  async deleteFromVoters(voterid) {
    await Voters.destroy({
      where: {
        voterID: voterid,
      },
    });

    console.log(`Voter ${voterid} has been deleted!`);
  }
}

db = new DatabaseOperations();

module.exports = { db };
