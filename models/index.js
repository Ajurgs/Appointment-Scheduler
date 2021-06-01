const User = require("./users");
const Role = require("./roles");
const Appointment = require("./appointment");

Role.belongsTo(User, {});

User.hasOne(Role, {
  foreignKey: "roleId",
});

User.belongsToMany(Appointment, {});
Appointment.hasOne(User, {
  foreignKey: "requesterId",
});

Appointment.hasOne(User, {
  foreignKey: "attendingId",
});
