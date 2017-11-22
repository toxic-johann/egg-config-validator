'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;

describe('test egg-config-validator', () => {
  afterEach(mm.restore);

  it('normal run', () => {
    const app = mm.app({
      baseDir: 'apps/config-validator-test',
    });
    return app.ready().then(() => {
      return request(app.callback())
        .get('/')
        .expect('hi, configValidator')
        .expect(200);
    }).then(() => {
      app.close();
    });
  });

  it('use shechma object to find error', () => {
    const app = mm.app({
      baseDir: 'apps/schema-object-error',
    });
    expect(app.ready()).to.rejectedWith("data should have required property 'person'");
  });

  it('use schema object and run well', () => {
    const app = mm.app({
      baseDir: 'apps/schema-object-ok',
    });
    return app.ready().then(() => {
      return request(app.callback())
        .get('/')
        .expect('hi, configValidator')
        .expect(200);
    }).then(() => {
      app.close();
    });
  });

  it('use json object to find error', () => {
    const app = mm.app({
      baseDir: 'apps/json-object-error',
    });
    expect(app.ready()).to.rejectedWith("data should have required property 'person'");
  });

  it('use json object to find url error', () => {
    const app = mm.app({
      baseDir: 'apps/json-object-url-error',
    });
    expect(app.ready()).to.rejectedWith('data.url should match format "url"');
  });

  it('use json object to find error on custom config', () => {
    const app = mm.app({
      baseDir: 'apps/json-object-custom-config-error',
    });
    expect(app.ready()).to.rejectedWith("should have required property 'firstName'");
  });

  it('use json object to find error on custom config file', () => {
    const app = mm.app({
      baseDir: 'apps/json-object-custom-config-file-error',
    });
    expect(app.ready()).to.rejectedWith('data.person.name should NOT have additional properties');
  });


  it('use json object and run well', () => {
    const app = mm.app({
      baseDir: 'apps/json-object-ok',
    });
    return app.ready().then(() => {
      return request(app.callback())
        .get('/')
        .expect('hi, configValidator')
        .expect(200);
    }).then(() => {
      app.close();
    });
  });

  it('use shechma file to find error', () => {
    const app = mm.app({
      baseDir: 'apps/schema-file-error',
    });
    expect(app.ready()).to.rejectedWith("data should have required property 'person'");
  });

  it('use shechma json file to find error', () => {
    const app = mm.app({
      baseDir: 'apps/schema-json-file-error',
    });
    expect(app.ready()).to.rejectedWith("data should have required property 'person'");
  });
});
