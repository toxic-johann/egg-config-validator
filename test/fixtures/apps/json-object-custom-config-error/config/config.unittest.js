'use strict';

exports.keys = '123456';

exports.configValidator = {
  standard: {
    person: {
      firstName: 'hello ',
      lastName: 'world!',
      age: 33,
    },
  },
  type: 'json',
  config: {
    person: {
      age: 32,
    },
  },
};
