'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SystemAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      states: {
        type: Sequelize.ENUM('Normal', 'Close'),
        defaultValue: 'Normal',
      },
      googleCaptcha: {
        type:Sequelize.STRING(500),
        defaultValue: '', 
      },
      loginFailNum: {
        type:Sequelize.INTEGER(2).ZEROFILL.UNSIGNED,
        defaultValue: 0,
        comment: "登录失败次数"
      },
      loginLastIP: {
        type:Sequelize.STRING,
        defaultValue: '',
        comment: "最后登录IP"
      },
      loginLastTime: {
        type: Sequelize.DATE,
        comment: "最后登录时间"
      },
      passwordLastUpdateTime: {
        type: Sequelize.DATE,
        comment: "最后密码修改时间"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {queryInterface.addIndex('SystemAccounts', ['username'], {'unique': true})})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SystemAccounts')
  }
};