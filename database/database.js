const { Sequelize } = require("sequelize");
const { postgres } = require("../config.json");

class Database extends Sequelize {
  constructor(options = {}) {
    super(postgres.url, {
      pool: { max: 5, idle: 2000, evict: 20 },
      retry: { max: 5, match: [Sequelize.ConnectionError] },
    });
    this.boot();
  }

  async boot() {
    await this.authenticate()
      .then(() => console.log("[DATABASE]: Successfully connected!"))
      .catch((error) => console.error("[DATABASE]: Failed to connect."));
  }
}

const database = new Database();

module.exports = { database };
