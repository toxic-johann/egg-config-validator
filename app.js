'use strict';

const Ajv = require('ajv');
const { isEmpty, isString, isFunction, isUrl } = require('toxic-predicate-functions');
const GenerateSchema = require('generate-schema');
const chalk = require('chalk');
require('core-js/fn/object/values');
require('core-js/fn/object/entries');
require('core-js/fn/object/assign');

function addLimitIntoSchema(schema, { additionalProperties, requiredProperties }) {
  const { type, properties, required } = schema;
  if (type !== 'object') return schema;
  if (requiredProperties) {
    const keys = Object.keys(properties);
    if (isEmpty(required)) schema.required = keys;
  }
  Object.assign(schema, { additionalProperties });
  Object.values(properties).forEach(property => addLimitIntoSchema(property, { additionalProperties, requiredProperties }));
  return schema;
}

function urlCheck(schema, json) {
  const { properties } = schema;
  if (isEmpty(schema)) return schema;
  Object.entries(properties).forEach(([ key, property ]) => {
    if (property.type === 'object') return urlCheck(properties[key], json[key]);
    if (property.type === 'string' && isUrl(json[key])) {
      properties[key].format = 'url';
    }
  });
}

const transfers = {
  jsonschema(standard) {
    return standard;
  },
  json(json, { additionalProperties, requiredProperties }) {
    const schema = GenerateSchema.json('config', json);
    delete schema.$schema;
    addLimitIntoSchema(schema, { additionalProperties, requiredProperties });
    urlCheck(schema, json);
    return schema;
  },
};

module.exports = app => {
  const { configValidator } = app.config;
  if (isEmpty(configValidator)) {
    throw new Error('You have not provide a config for configValidator');
  }
  const {
    standard: rawStandard = {},
    target,
    type = 'jsonschema',
    showStandard = false,
    additionalProperties = true,
    requiredProperties = true,
  } = configValidator;
  if (!isString(type)) throw new Error(`type of configValidator must be string, but not ${typeof type}`);
  const fn = transfers[type.toLowerCase()];
  if (!isFunction(fn)) throw new Error(`We have not support ${type}`);
  const standard = isString(rawStandard)
    ? require(rawStandard)
    : rawStandard;
  const schema = transfers[type.toLowerCase()](standard, { additionalProperties, requiredProperties });
  const ajv = new Ajv({
    format: 'full',
  });
  if (showStandard) {
    console.log(chalk.cyan(JSON.stringify(schema, null, 2)));
  }
  const config = isEmpty(target)
    ? app.config
    : isString(target)
      ? require(target)
      : target;
  const valid = ajv.validate(schema, config);
  if (!valid) {
    console.error(chalk.red('Your config is illegal!!!'));
    ajv.errors.forEach(({ message }) => {
      console.error(chalk.red(message));
    });
    throw new Error(ajv.errorsText());
  } else {
    console.log(chalk.green('Your config is legal.'));
  }
};
