const db = require("../models/index");
const { DataTypes } = require("sequelize");
const User = db.sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mobile_no: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
