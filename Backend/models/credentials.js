'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      credentials.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  credentials.init({
    user_id: DataTypes.INTEGER,
    platform: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'credentials',
  });
  return credentials;
};