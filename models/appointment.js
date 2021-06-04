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
    title:{
      type: DataTypes.STRING,
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
    hooks:{
      beforeCreate: async (newApptData) =>{
        if(!newApptData.title){
          newApptData.title = `Appointment at ${newApptData.location}`;
        }
        return newApptData;
      }
    },
    sequelize,
    underscored: true,
    freezeTableName: false,
    timestamps: true,
    modelName: "appointments",
  }
);

// Export table Appointment
module.exports = Appointment;
