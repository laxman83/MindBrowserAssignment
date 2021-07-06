const dbConfig = require("../config/db");

const Sequelize = require("sequelize");

// connect to db
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
// init models and add them to the exported db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.ManagerInfos = require("./Manager.js")(sequelize, Sequelize);
db.EmployeeInfos = require("./Employee")(sequelize, Sequelize);
module.exports = db;
