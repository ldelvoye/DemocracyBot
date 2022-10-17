const { db } = require("./database_operations");

class BotOperations {
  constructor() {
    this.db = db;
  }

  testMethod() {
    console.log("I work!");
  }

  async checkIfVoterExists(voterid) {
    try {
      this.db.selectVoter(voterid).then((data) => {
        if (data.length === 0) {
          return "User doesn't exist!";
        } else {
          return "User exists";
        }
      });
    } catch (err) {
      console.error(err.message);
      return err.message;
    }
  }

  //   async updateVoterCandidate() {}
}

botops = new BotOperations();

module.exports = { botops };
