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
   * Performs a resize
   * @returns {Promise<any>}
   */
  static transform(buffer, {method,options}) {
    //  do whatever tansformations you need to do here, 'don't do anything
    const pipeline = sharp(buffer)
    pipeline.withMetadata();
    switch (method) {
      case 'resize':
        pipeline.resize(options);
        break;
      case 'rotate':
        pipeline.rotate(options.angle);
        break;
      case 'flip':
        pipeline.flip();
        break;
      case 'flop':
        pipeline.flop();
        break;
    }
    pipeline.jpeg();
    return pipeline.toBuffer();

  }
}

module.exports = ServiceExternalRequestTransformer;
