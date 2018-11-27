/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-sse-starter
 * @file transformer.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 31/07/2018
 * @description Class providing transformation of responses back to OCC
 **/
const sharp = require('sharp');

class ServiceExternalRequestTransformer {
  /**
   * Transform intellisense
   * @returns {Promise<any>}
   */
  static resize (buffer, {options}) {
    //  do whatever tansformations you need to do here, 'don't do anything
    return (
      sharp(buffer)
        .resize(options)
        // .toFile('test.jpg') // use for testing
        .jpeg()
        .toBuffer() );

  }
}

module.exports = ServiceExternalRequestTransformer;
