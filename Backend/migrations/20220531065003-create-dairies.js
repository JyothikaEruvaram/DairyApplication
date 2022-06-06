'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dairies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'users'
          },
          key:'id'
        },
        allowNull:false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull:false
      },
      date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dairies');
  }
};