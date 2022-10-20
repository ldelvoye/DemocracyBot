const { Sequelize } = require("sequelize");
const { postgres } = require("../config.json");

const sequelize = new Sequelize(postgres.url, {
  pool: { max: 5, idle: 2000, evict: 20 },
});

var x = true;
(async () => {
  while (x) {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      x = false;
    } catch (e) {
      if (e.message === 'too many connections for role "jqxorqoq"') {
        if (++count == maxTries) {
          throw new Error(`${e.name}: ${e.message}`);
        } else {
          console.log(count);
          continue;
        }
      }
    }
  }
})();

// class Database extends Sequelize {
//   constructor(options = {}) {
//     super(postgres.url, {
//       pool: { max: 5, idle: 2000, evict: 20 },
//     });
//   }

//   async boot() {
//     await this.authenticate()
//       .then(() => console.log("[DATABASE]: Successfully connected!"))
//       .catch((error) => console.error("[DATABASE]: Failed to connect."));
//   }
// }

// const database = new Database();

module.exports = { sequelize };
