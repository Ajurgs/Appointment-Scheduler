const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: false,
    underscored: true,
    timestamps: false,
    modelName: "roles",
  }
);

module.exports = Role;
