const { Sequelize } = require("sequelize");
const { postgres } = require("../config.json");

class Database extends Sequelize {
  constructor(options = {}) {
    super(postgres.url);
    this.boot();
  }

  async boot() {
    await this.authenticate()
      .then(() => console.log("[DATABASE]: Successfully connected!"))
      .catch(() => console.error("[DATABASE]: Failed to connect", error));
  }
}

module.exports = { Database };
