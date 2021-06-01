const sequelize = require("../config/connection");
const { User, Role } = require("../models");

const roleData = require("./roleData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("------ Seeding Roles --------");
  await Role.bulkCreate(roleData);
  console.log("------ Seeding Users --------");
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log("------ Database Seeded ------");
  process.exit(0);
};
seedDatabase();
