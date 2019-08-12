'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SystemLoginLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      uid: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING
      },
      states: {
        type: Sequelize.ENUM('Succ', 'Fail'),
        defaultValue: 'Succ',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SystemLoginLogs')
  }
};