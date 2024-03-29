// Main requirements
const User = require("./users");
const Role = require("./roles");
const Appointment = require("./appointment");

// Defining model dependencies
User.belongsTo(Role, {});

Role.hasOne(User, {
  foreignKey: "roleId",
  onDelete: "SET NULL",
});

Appointment.belongsTo(User, {
  as: "requester",
  foreignKey: "requesterId",
});
Appointment.belongsTo(User, {
  as: "attending",
  foreignKey: "attendingId",
});
User.hasOne(Appointment, {
  foreignKey: "requesterId",
  onDelete: "CASCADE",
});

User.hasOne(Appointment, {
  foreignKey: "attendingId",
  onDelete: "CASCADE",
});

// Export each defined table
module.exports = { User, Role, Appointment };
