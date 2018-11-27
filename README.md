# occ-image-processing

[Server-Side Extension](https://docs.oracle.com/cd/E97801_01/Cloud.18C/ExtendingCC/html/s4303developserversideextensions01.html "Server Side Extensions in OCC")
to handle image processing in [Oracle Commerce Cloud]([Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud")).

# ATTENTION
This module was created for POC purposes.  You will be unable to install this in your OCC Instnce as
spawnSync processes are prohibited on the server:
```$xslt
Error: Function call spawnSync() is prohibited in this environment.
at /tzbba0c0/fmw/extensionserver/server1/occsapp/custom-server/node_modules/restrict/lib/index.js:96:19
at Object.<anonymous> (/tzbba0c0/fmw/extensionserver/server1/occsapp/custom-server/extensions/extracted/image-processor-sse/node_modules/detect-libc/lib/detect-libc.js:44:15)
at Module._compile (module.js:652:30)
at Object.Module._extensions..js (module.js:663:10)
at Module.load (module.js:565:32)
at tryModuleLoad (module.js:505:12)
Function.Module._load (module.js:497:3)
Module.require (module.js:596:17)
require (internal/module.js:11:18) Object.<anonymous> (/tzbba0c0/fmw/extensionserver/server1/occsapp/custom-server/extensions/extracted/image-processor-sse/node_modules/sharp/lib/platform.js:3:20)
at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)
at Module.load (module.js:565:32)
at tryModuleLoad (module.js:505:12)
Function.Module._load (module.js:497:3)
Module.require (module.js:596:17)\n2018-11-27T22:56:38.557Z - error: Worker 49
```

Wraps the [lovell/sharp](https://github.com/lovell/sharp) node module. 

## Supported transform
(add more if you like)
- resize
- rotate
- flip
- flop
...

Documentation [sharp](http://sharp.pixelplumbing.com/en/stable/ "Hisgh Speed Node JS image processor") high speed node JS image Processor


## Installation
Install all dependencies required by module

```
$ npm i
```

~*It's important to not tha you must use the OCC version of Node when installing
the dependencies. Current version is:~
`node_version": "v8.11.1`



## Tests
Running tests allows you to test the static and live json schema
without having to use postman.  The test state will only ever run when the sse is executed locally.
Files located in /tests

```
$ npm run test
```


## Usage
For the request body use the [sharp options](http://sharp.pixelplumbing.com/en/stable/api-constructor/ "Sharp Parameters") object schema.

You can chain transforms by adding items to the transform array.  I'm super happy that I used a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function* "function*") for this as I was strugging to find a use for one.

#### Request
Method: POST
Path: /ccstorex/custom/v1/imageprocessor
Body:

```
{
  "imgData": "data:image/jpeg;base64,/9j/4AAQSkZJRgA..."
  "transforms": [
    {
      "method": "resize",
      "options": {
        "height": 200
      }
    },
    {
      "method": "rotate",
      "options": {
        "angle": 90
      }
    }
  ]
}

```

#### Request Body properties
- imgaData (String): Base64 encoded image string
- transforms (Array): Array of supported transforms see Sharp
[documentation](http://sharp.pixelplumbing.com/en/stable/ "Sharp") for details (add more transforms as you see fit)



#### Response

```
{
  "imgData": "/9j/4AAQSkZJRgABAQAAAQABAAD/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAA...",
  "sharpOptions": [
    {
      "method": "resize",
      "options": {
        "height": 200
      }
    },
    {
      "method": "rotate",
      "options": {
        "angle": 90
      }
    }
  ]
}
```

#### Respose Body properties:
- imgaData (String): Base64 encoded string of transformed image
- transforms (Array): Original array of transforms used.
