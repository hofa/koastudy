'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      mobile: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      states: {
        type: Sequelize.ENUM('Normal', 'Close'),
        defaultValue: 'Normal',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }).then(() => {queryInterface.addIndex('Users', ['mobile'], {'unique': true})})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
};