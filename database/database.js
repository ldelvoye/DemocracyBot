const { Sequelize } = require("sequelize");
const { postgres } = require("../config.json");

class Database extends Sequelize {
  constructor(options = {}) {
    super(postgres.url, { pool: { max: 5, idle: 100, evict: 10 } });
  }

  async boot() {
    await this.authenticate()
      .then(() => console.log("[DATABASE]: Successfully connected!"))
      .catch(() => console.error("[DATABASE]: Failed to connect", error));
  }
}

const database = new Database();

module.exports = { database };
