// Table requirements include sequelize from connection.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Appointment extends Model {}

// Appointment table properties
Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start:{
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isDate: true,
      }
    },
    end:{
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isDate: true,
      }
    }
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: false,
    timestamps: true,
    modelName: "appointments",
  }
);

// Export table Appointment
module.exports = Appointment;
