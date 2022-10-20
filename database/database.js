const { Sequelize } = require("sequelize");
const { postgres } = require("../config.json");

// const sequelize = new Sequelize(postgres.url, {
//   pool: { max: 5, idle: 2000, evict: 20 },
// });

// var count = 0;
// var maxTries = 3;

// const authorization = async () => {
//   try {
//     console.log("nah");
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (e) {
//     if (e.message === 'too many connections for role "jqxorqoq"') {
//       console.log("lmaos");
//       // throw new Error(`${e.name}: ${e.message}`);
//       return false;
//     }
//   }
// };
// authorization().then((data) => {
//   if (data == false) {
//     console.log("nfdsdsfo");
//   }
// });

class Database extends Sequelize {
  constructor(options = {}) {
    super(postgres.url, {
      pool: { max: 5, idle: 2000, evict: 20 },
    });
  }

  async boot() {
    await this.authenticate()
      .then(() => console.log("[DATABASE]: Successfully connected!"))
      .catch((error) => console.error("[DATABASE]: Failed to connect."));
  }
}

const sequelize = new Database();

module.exports = { sequelize };
