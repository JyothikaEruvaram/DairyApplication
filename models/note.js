const db = require("../models/index");
const { DataTypes } = require("sequelize");
const User=require("./users")
const Note= db.sequelize.define(
  "notes",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    note:{
        type:DataTypes.TEXT,
        allowNull:true,
    }  ,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Note.belongsTo(User,{foreignKey:"user_id"});
module.exports = Note;
