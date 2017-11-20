# egg-config-validator

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-config-validator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-config-validator
[travis-image]: https://img.shields.io/travis/toxic-johann/egg-config-validator.svg?style=flat-square
[travis-url]: https://travis-ci.org/toxic-johann/egg-config-validator
[codecov-image]: https://img.shields.io/codecov/c/github/toxic-johann/egg-config-validator.svg?style=flat-square
[codecov-url]: https://codecov.io/github/toxic-johann/egg-config-validator?branch=master
[david-image]: https://img.shields.io/david/toxic-johann/egg-config-validator.svg?style=flat-square
[david-url]: https://david-dm.org/toxic-johann/egg-config-validator
[snyk-image]: https://snyk.io/test/npm/egg-config-validator/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-config-validator
[download-image]: https://img.shields.io/npm/dm/egg-config-validator.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-config-validator

A plugin to check the config when the app started. If it found the config could not fit the requirement. It will throw error.

It check the config based on a json schema. You can provide a schema or a json which we will transfer into a schema.

## Install

```bash
$ npm i egg-config-validator --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.configValidator = {
  enable: true,
  package: 'egg-config-validator',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.configValidator = {
  standard: Object | string,
  type: 'json' | 'jsonschema',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

| property | type             | meaning                                  |
| -------- | ---------------- | ---------------------------------------- |
| standard | Object \| string | The standard of the config, it can be an Object or a path string pointing to the standard. |
| type     | String           | We only support jsonschema and json currently. As they are totally the same, you should declare it. |

## Example

standard can be a json.

```javascript
exports.configValidator = {
  standard: {
    person: {
      firstName: 'hello ',
      lastName: 'world!',
      age: 33,
    },
  },
  type: 'json',
};
```

standard can be a json schema.

```javascript
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
    required: [ 'person' ],
  },
  type: 'jsonschema',
};
```

standard can be stored in file.

```javascript
exports.configValidator = {
  standard: path.resolve(__dirname, './config.standard.js'),
  type: 'jsonschema',
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/toxic-johann/egg-config-validator/issues).

## License

[MIT](LICENSE)
