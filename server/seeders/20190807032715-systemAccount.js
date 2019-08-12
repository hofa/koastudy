'use strict';
const crypto = require('crypto')
const config = require('./../../config')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SystemAccounts', [{
      username: 'hofa',
      password: crypto.createHash('sha1').update(config.safeSalt + "a123456").digest('base64'),
      createdAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SystemAccounts', null, {});
  }
};
