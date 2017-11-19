'use strict';

exports.keys = '123456';

exports.configValidator = {
  standard: {
    title: 'config',
    type: 'object',
    properties: {
      person: {
        title: 'person',
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          age: {
            description: 'Age in years',
            type: 'integer',
            minimum: 0,
          },
        },
        required: [ 'firstName', 'lastName' ],
      },
    },
  },
  type: 'jsonschema',
};
