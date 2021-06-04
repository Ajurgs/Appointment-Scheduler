
// Table requirements include sequelize from connection.js
// bycrypt and module for auth
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { Module } = require("module");

// Use bycrypt to check password
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Table properties
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  },

  // Hooks for new user information inputs
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        if(!newUserData.roleId){
          newUserData.roleId = 1;
        }
        return newUserData;
      },
      beforeUpdate: async (updateUserData) => {
        updateUserData.password = await bcrypt.hash(newUserData.password, 10);
        return updateUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: false,
    underscored: true,
    modelName: "users",
  }
);

// Export User information
module.exports = User;
