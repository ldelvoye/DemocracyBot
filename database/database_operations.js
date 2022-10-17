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
    const leader = await Voters.findAll({
      where: {
        leader: true,
      },
    });

    return leader;
  }

  async selectLeaderWithVotes(votes) {
    const leader = await Voters.findAll(
      {
        attributes: ["voterID"],
        where: {
          votes: votes,
        },
      },
      {
        raw: true,
      }
    );

    return leader;
  }

  async selectVoter(voterid) {
    const voter = await Voters.findAll(
      {
        attributes: ["voterID"],
        where: {
          voterID: voterid,
        },
      },
      {
        raw: true,
      }
    );

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
