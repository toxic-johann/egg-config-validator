'use strict';

const Ajv = require('ajv');
const { isEmpty, isString, isFunction } = require('toxic-predicate-functions');
const GenerateSchema = require('generate-schema');
const chalk = require('chalk');

function addRequireIntoSchema(schema) {
  const { type, properties, required } = schema;
  if (type !== 'object') return schema;
  const keys = Object.keys(properties);
  if (isEmpty(required)) schema.required = keys;
  keys.forEach(key => addRequireIntoSchema(properties[key]));
  return schema;
}

const transfers = {
  jsonschema(standard) {
    return standard;
  },
  json(json) {
    const schema = GenerateSchema.json('config', json);
    delete schema.$schema;
    addRequireIntoSchema(schema);
    return schema;
  },
};

module.exports = app => {
  const { configValidator } = app.config;
  if (isEmpty(configValidator)) {
    throw new Error('You have not provide a config for configValidator');
  }
  const { standard: rawStandard, type } = configValidator;
  if (!isString(type)) throw new Error(`type of configValidator must be string, but not ${typeof type}`);
  const fn = transfers[type.toLowerCase()];
  if (!isFunction(fn)) throw new Error(`We have not support ${type}`);
  const standard = isString(rawStandard)
    ? require(rawStandard)
    : rawStandard;
  const schema = transfers[type.toLowerCase()](standard);
  const ajv = new Ajv({
    format: 'full',
  });
  const valid = ajv.validate(schema, app.config);
  if (!valid) {
    console.error(chalk.red('Your config is unlegal!!!'));
    ajv.errors.forEach(({ message }) => {
      console.error(chalk.red(message));
    });
    throw new Error(ajv.errorsText());
  } else {
    console.log(chalk.green('Your config is legal.'));
  }
};
