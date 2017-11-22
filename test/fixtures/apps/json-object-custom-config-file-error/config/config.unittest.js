'use strict';

const path = require('path');

exports.keys = '123456';

exports.configValidator = {
  standard: {
    person: {
      name: {
        firstName: 'hello ',
        lastName: 'world!',
      },
      age: 33,
    },
  },
  type: 'json',
  config: path.resolve(__dirname, './target.json'),
  additionalProperties: false,
};
