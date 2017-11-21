'use strict';

exports.keys = '123456';

exports.configValidator = {
  standard: {
    person: {
      firstName: 'hello ',
      lastName: 'world!',
      age: 33,
    },
    url: 'https://www.baidu.com',
  },
  type: 'json',
  showStandard: true,
};

exports.person = {
  firstName: 'hello ',
  lastName: 'world!',
  age: 33,
};

exports.url = 'I am not a url';
