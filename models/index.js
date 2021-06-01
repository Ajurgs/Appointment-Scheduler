const User = require("./users");
const Role = require("./roles");
const Appointment = require("./appointment");

Role.belongsTo(User, {});

User.hasOne(Role, {
  foreignKey: "userRole",
});
