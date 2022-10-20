const { sequelize } = require("./database");
const { Voters } = require("./models/voters.js");

class DatabaseOperations {
  constructor() {
    this.db = sequelize;
    this.x = "x";
  }

  testMethod() {
    return "Works!";
  }

  async sync_all_tables() {
    await this.db.sync({ force: true });
  }

  async incrementVotes(candidateid, transaction) {
    await Voters.increment(
      { votes: 1 },
      { where: { voterID: candidateid }, transaction: transaction }
    );
  }

  async decrementVotes(candidateid, transaction) {
    await Voters.increment(
      { votes: -1 },
      { where: { voterID: candidateid }, transaction: transaction }
    );
  }

  async insertIntoVoters(voterid, candidateid, transaction, vote = 0) {
    const voter = await Voters.create(
      {
        voterID: voterid,
        candidate: candidateid,
        leader: false,
        votes: vote,
      },
      { transaction: transaction }
    );

    console.log(`Voter ${voter.voterID} has been created!`);
    return voter;
  }

  async selectLeader(transaction) {
    const leader = await Voters.findOne(
      {
        where: {
          leader: true,
        },
      },
      { transaction: transaction }
    );
    if (leader !== null) {
      const result = {
        voterID: leader["dataValues"]["voterID"],
        // candidateID: leader["dataValues"]["candidate"],
        // leader: leader["dataValues"]["leader"],
        // votes: leader["dataValues"]["votes"],
      };
      return result;
    } else {
      return 0;
    }
  }

  async selectLeaderWithVotes(vote, transaction) {
    const leader = await Voters.findAll({
      attributes: ["voterID"],
      where: {
        votes: vote,
      },
      transaction: transaction,
    });

    const result = {};
    if (Object.keys(leader).length !== 0) {
      for (let i = 0; i < leader.length; i++) {
        result[`leader_${i}`] = leader[i]["dataValues"]["voterID"];
      }
    } else {
      return 0;
    }

    return result;
  }

  async selectVoter(voterid, transaction) {
    const voter = await Voters.findOne(
      {
        where: {
          voterID: voterid,
        },
      },
      {
        raw: true,
        transaction: transaction,
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
  }

  async selectCandidate(voterid, transaction) {
    const candidate = await Voters.findAll(
      {
        attributes: ["candidate"],
        where: {
          voterID: voterid,
        },
        transaction: transaction,
      },
      {
        raw: true,
      }
    );

    return candidate;
  }

  async updateVotes(voterid, transaction) {
    const candidate = await Voters.update(
      {
        votes: 0,
      },
      {
        where: {
          voterID: voterid,
        },
        transaction: transaction,
      }
    );

    return candidate;
  }

  async updateCandidate(voterid, candidateid, transaction) {
    const x = await Voters.update(
      { candidate: candidateid },
      {
        where: {
          voterID: voterid,
        },
        transaction: transaction,
      },
      {
        raw: true,
      }
    );

    return x;
  }

  async updateLeaderboard(voterid, transaction) {
    await Voters.update(
      { leader: true },
      {
        where: {
          voterID: voterid,
        },
        transaction: transaction,
      }
    );

    console.log(`Leaderboard has been updated!`);
  }

  async deleteOldLeader(voterid, transaction) {
    await Voters.update(
      { leader: false },
      {
        where: {
          voterID: voterid,
        },
        transaction: transaction,
      }
    );
    console.log(`Old Leader has been deleted!`);
  }

  async selectMaxVotes(transaction) {
    const maxVotes = await Voters.max("votes", { transaction: transaction });

    // const maxvotes = maxVotes;

    return maxVotes;
  }

  async deleteFromVoters(voterid, transaction) {
    await Voters.destroy({
      where: {
        voterID: voterid,
      },
      transaction: transaction,
    });

    console.log(`Voter ${voterid} has been deleted!`);
  }

  async destroyLeaderboard(transaction) {
    await Voters.destroy({ truncate: true, transaction: transaction });
    await this.insertIntoVoters(0, 0, transaction);
    await this.updateLeaderboard(0, transaction);
  }
}

db = new DatabaseOperations();

module.exports = { db };
