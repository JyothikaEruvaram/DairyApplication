'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dairies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dairies.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  dairies.init({
    user_id: DataTypes.INTEGER,
    note: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dairies',
  });
  return dairies;
};