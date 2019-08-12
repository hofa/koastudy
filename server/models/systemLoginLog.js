'use strict';
module.exports = (sequelize, DataTypes) => {
  const SystemLoginLogs = sequelize.define('SystemLoginLogs', {
    uid: DataTypes.INTEGER.UNSIGNED,
    ip: DataTypes.STRING,
  }, {});
  SystemLoginLogs.associate = function(models) {
    // associations can be defined here
  };
  return SystemLoginLogs;
};