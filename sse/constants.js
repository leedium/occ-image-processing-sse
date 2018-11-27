/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-image-processing-sse
 * @file constants.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 13/07/2018
 * @description constants
 **/

module.exports = {
  SSE_NAME: 'image-processor',
  SSE_VERSION: '1',
  TEST_FOLDER: 'tests',
  NODE_EXTENSION_SERVER_PORT: 11372,
  NODE_EXTENSION_TEST_PORT: 3099,
  ROUTE_BASE: '/v1/imageprocessor',
  //
  HTTP_GET: 'GET',
  HTTP_POST: 'POST',
  HTTP_PUT: 'PUT',
  HTTP_DELETE: 'DELETE',
  HTTP_RESPONSE_SUCCESS: 200,
  HTTP_RESPONSE_SERVER_ERROR: 500,
  HTTP_RESPONSE_UNAUTHORIZED: 401,
  HTTP_RESPONSE_CONFLICT: 409,
  //
  CONTENT_TYPE_APPLICATION_JSON: 'application/json',
  CONTENT_TYPE_APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  //
  NODE_ENV_DEVELOPMENT: 'development',
  NODE_ENV_TEST: 'test',
  //
  OCC_IMAGE_PROCESS_ENDPOINT: '/imageprocessor',
  OCC_DEPLOY_HOST: 'https://ccadmin-test-zbba.oracleoutsourcing.com/'
};
