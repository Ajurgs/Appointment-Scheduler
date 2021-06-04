const sequelize = require("../config/connection");
const { User, Role, Appointment } = require("../models");

const roleData = require("./roleData.json");
const userData = require("./userData.json");
const appointmentData = require("./appointmentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("------ Seeding Roles --------");
  await Role.bulkCreate(roleData);
  console.log("------ Seeding Users --------");
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("------- Seeding Appointments -------");
  await Appointment.bulkCreate(appointmentData,{
    individualHooks:true,
    returning:true,
  });
  console.log("------ Database Seeded ------");
  process.exit(0);
};
seedDatabase();
