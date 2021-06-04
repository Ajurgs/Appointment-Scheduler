// List dependencies for appointment-scheduler methods

// Require dotenv environment variables
// Require Sequelize
require("dotenv").config();

const Sequelize = require("sequelize");

// Establish development session
let sequelize
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = process.env.appointment_scheduler
  ? new Sequelize(process.env.appointment_scheduler)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );
}
    // Export sequelize session
module.exports = sequelize;
