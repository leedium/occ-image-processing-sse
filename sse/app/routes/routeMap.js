/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/* eslint no-new: 0 */

/**
 * @project occ-image-processing-sse
 * @file routeMap.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description Returns and array of route objects with mappings to their
 *              controllers.
 **/

const cors = require('cors');

const Route = require('./route');
const constants = require('../../constants');
const serviceBasic = require('../api/serviceBasic');

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: constants.HTTP_RESPONSE_SUCCESS,
  preflightContinue: true,
  allowedHeaders: [
    'Accept',
    'Accept-Encoding',
    'Authorization',
    'Cache-Control',
    'Connection',
    'Content-Length',
    'Content-Type',
    'Cookie',
    'env',
    'Host',
    'Origin',
    'Pragma',
    'Referer',
    'User-Agent',
    'X-Requested-With'
  ]
};

let routeMap = function (router) {
  router.options('/*', cors(corsOptions));
  router.get('/version', cors(corsOptions), (req, res) => {
    res.status(constants.HTTP_RESPONSE_SUCCESS).json({
      'version': `${constants.SSE_NAME} version: ${constants.SSE_VERSION}`,
      'node_version': process.version
    });
  });
  router.post('/test', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(constants.HTTP_RESPONSE_SUCCESS).json({});
  });
  router.post('/test500', (req, res) => {
    res.status(constants.HTTP_RESPONSE_SERVER_ERROR).send();
  });
  new Route({
    router,
    method: constants.HTTP_POST,
    route: constants.OCC_IMAGE_PROCESS_ENDPOINT,
    api: serviceBasic.processImage,
    testReq: 'processImage-resize-req.json',
    testRes: 'processImage-res.json'
  });
  return router;
};
module.exports = routeMap;
