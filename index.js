'use strict';

// const Sequelizer = require('../index');
const Sequelizer = require('sequelizer');
const Sequelize = require('sequelize');
const jsonSchemas = [
  require('./schemas/address.schema.json'),
  require('./schemas/user.schema.json'),
];

const definition = Sequelizer.fromJsonSchema(jsonSchemas, 'http://api.example.com/v1/schemas/user', {
  uniqueFields: ['username'],
  mixinFields: ['homeAddress', 'billingAddress'],
  customFieldDefinitions: {
    passwordHash: {
      type: Sequelize.TEXT
    },
    password: {
      type: Sequelize.VIRTUAL,
      set(val) {
        this.setDataValue('password_hash', val + '_salt');
      }
    },
  },
});

console.log(`definition = ${JSON.stringify(definition, null, 2)}`);
