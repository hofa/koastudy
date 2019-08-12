'use strict';
module.exports = (sequelize, DataTypes) => {
  const SystemAccounts = sequelize.define('SystemAccounts', {
    username: DataTypes.STRING(32),
    password: DataTypes.STRING(500),
    states: DataTypes.ENUM('Normal', 'Close'),
    googleCaptcha: DataTypes.STRING(500),
    loginFailNum: DataTypes.INTEGER(2).ZEROFILL.UNSIGNED,
    loginLastIP: DataTypes.STRING,
    loginLastTime: DataTypes.DATE,
    passwordLastUpdateTime: DataTypes.DATE,
  }, {});
  SystemAccounts.associate = function(models) {
    // associations can be defined here
  };
  return SystemAccounts;
};