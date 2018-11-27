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
class ServiceBasic {
  static processImage(req) {
    return new Promise(async (resolve) => {
      const {imgData, transforms} = req.body;
      let imageBuffer = Buffer.from(removeMimeTypes(imgData), 'base64');

      /**
       * Generator to perform chaining operation
       * @param img
       * @param arr
       * @returns {IterableIterator<Promise<any | never>>}
       */
      function* chainTransforms(img, arr) {
        let counter = 0;
        let buf = img;
        /**
         * Callback to be performed when promise completes.
         * Upon completion continue the generator.
         * if the counter reachs the array length then complete the generator
         * and resolve;
         * @param updatedBuffer
         */
        const transformCallback = updatedBuffer => {
          genTransforms.next(updatedBuffer);
          counter += 1;
          if (counter === arr.length) {
            genTransforms.return();
            resolve(({
              statusCode: constants.HTTP_RESPONSE_SUCCESS,
              body: {
                imgData: new Buffer.from(updatedBuffer).toString('base64'),
                sharpOptions: transforms
              }
            }));
          }
        };

        // Start the loop here and yield for the transformation promise
        for (const option of arr) {
          buf = yield transformer.transform(buf, option).then(transformCallback);
          fs.writeFile(`test${counter}.jpg`, buf, 'binary', () => {});
        }
      }

      const genTransforms = chainTransforms(imageBuffer, transforms);
      genTransforms.next(imageBuffer).value;
    });
  }
}

module.exports = ServiceBasic;
