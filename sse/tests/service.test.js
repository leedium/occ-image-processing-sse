/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/* global describe, after it, before */

const http = require('http');
const expect = require('expect.js');
const supertest = require('supertest');

const constants = require('../constants');
const config = require('../config.json');
const readJSONFile = require('../core/helpers').readJSONFile;
const resizeRequest = readJSONFile(`../${config.testFolder}/json/processImage-resize-req.json`)

describe('====== Routes ======', function () {
  let app;
  before(function () {
    app = require('../index');
    app.server = http.createServer(app);
    app.server.listen(constants.NODE_EXTENSION_TEST_PORT, function (err) {
      if (err) {
        console.log('SSE_ERROR ');
      }
    });
  });
  after(function () {
    app.server.close();
  });

  /**
   * Test SSE Version is installed and valid.
   */
  it('- Returns a SSE version\n', function (done) {
    supertest(app)
      .get(`${constants.ROUTE_BASE}/version`)
      .set({'env': 'true'})
      .expect(constants.HTTP_RESPONSE_SUCCESS)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property('version');
        done();
      });
  }).timeout(config.testTimeout);

  /**
   * Tests 2 Chained resize transformations height 200, height 50, height 10
   */
  it(`- Resizes a base64 image \n\t${constants.OCC_IMAGE_PROCESS_ENDPOINT} \n`, function (done) {
    global.testMode = false;
    let payload = resizeRequest;
    supertest(app)
      .post(`${constants.ROUTE_BASE}${constants.OCC_IMAGE_PROCESS_ENDPOINT}`)
      .set({'env': 'preview'})
      .send(payload)
      .expect(constants.HTTP_RESPONSE_SUCCESS)
      .end(function (err, res) {
        if (err) {
          done(err);
          return;
        }
        const {body} = res;
        expect(body).to.have.keys('imgData','sharpOptions')
        done();
      });
  }).timeout(config.testTimeout);
});
