const { db } = require("./database_operations");

class BotOperations {
  constructor() {
    this.db = db;
  }

  testMethod() {
    console.log("I work!");
  }

  async checkIfVoterExists(voterid) {
    var result = [];
    this.db.selectVoter(voterid).then((data) => {
      if (data.length === 0) {
        return "User doesn't exist!";
      } else {
        (data) => data.forEach((element) => result.push(element));
      }
    });

    return result;
  }

  //   async updateVoterCandidate() {}
}

botops = new BotOperations();

module.exports = { botops };
