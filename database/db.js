// const pg = require('pg')\
// const { elephantSQLURL } = require('./config.json')
// const ClientClass = pg.ClientClass
// const pgURL = elephantSQLURL
// const client = new ClientClass(pgURL)

// async function connect(client) {
//     try {
//         await client.connect()
//         console.log(`Client connected.`)

//         const {rows} = await client.query( 'SELECT * FROM employees')
//         console.table(rows)
//         await client.end()
//     }
//     catch(ex) {
//         console.log("Some error" + ex)
//     }
//     finally {
//         await client.end()
//     }
// }

// connect(client)

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
      .catch(() => console.error("[DATABASE]: Faild to connect"));
  }
}

module.exports({ Database });
