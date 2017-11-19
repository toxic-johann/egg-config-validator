'use strict';

const path = require('path');

exports.keys = '123456';

exports.configValidator = {
  standard: path.resolve(__dirname, './standard.json'),
  type: 'jsonschema',
};
