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

  async incrementVotes(voterid) {
    await Voters.increment({ votes: 1 }), { where: { voterID: voterid } };
  }

  async decrementVotes(voterid) {
    await Voters.decrement({ votes: 1 }), { where: { voterID: voterid } };
  }

  async insertIntoVoters(voterid, candidateid) {
    const voter = await Voters.create({
      voterID: voterid,
      candidate: candidateid,
      leader: false,
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

  async selectCandidateVotedFor(voterid) {
    const candidate = await Voters.findAll({
      attributes: ["candidate"],
      where: {
        voterID: voterid,
      },
    });

    return candidate;
  }

  async updateCandidate(voterid, candidateid) {
    const x = await Voters.update(
      { candidate: candidateid },
      {
        where: {
          voterID: voterid,
        },
      }
    );

    console.log(`Candidate ${candidateid} has been voted for by ${voterid}!`);
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
