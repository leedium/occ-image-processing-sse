/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-image-processing-sse
 * @file service1Api.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 31/07/2018
 * @description interface for all the homchoice utility sse enpoints
 **/
const fs = require('fs');

const transformer = require('./transformer');
const constants = require('../../constants');

// Removes image mime types from base64 string if any
const removeMimeTypes = val => val.replace(/^data:image\/(png|gif|jpeg);base64,/, '');

// Add serialized Promise.each to the
const chainTransforms = (arr, func, extra) => Promise.all(arr.map(async item => await func(item)));

class ServiceBasic {
  static processImage(req) {
    return new Promise(async (resolve) => {
      const {imgData, sharpOptions} = req.body;
      let imageBuffer = Buffer.from(removeMimeTypes(imgData), 'base64');

      const data = await chainTransforms(sharpOptions, (option) => {
        let prom = Promise.resolve();
        switch (option.method) {
          case 'resize':
            prom = transformer.resize(imageBuffer, option);
            break;
        }
        return prom;
      });
      let b64 = Buffer.from(data[0], 'binary').toString('base64');
      resolve(({
        statusCode: constants.HTTP_RESPONSE_SUCCESS,
        body: {
          imgData: b64,
          sharpOptions: sharpOptions
        }
      }));
    });
  }
}

module.exports = ServiceBasic;
