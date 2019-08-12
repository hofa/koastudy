'use strict';
const crypto = require('crypto')
const config = require('./../../config')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      mobile: '13928469801',
      nickname: 'test1',
      password: crypto.createHash('sha1').update(config.safeSalt.split("").reverse().join("") + "a123456").digest('base64'),
      createdAt: new Date()
    },{
      mobile: '13928469802',
      nickname: 'test2',
      password: crypto.createHash('sha1').update(config.safeSalt.split("").reverse().join("") + "a123456").digest('base64'),
      createdAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
