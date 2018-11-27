# occ-image-processing-sse

[Server-Side Extension](https://docs.oracle.com/cd/E97801_01/Cloud.18C/ExtendingCC/html/s4303developserversideextensions01.html "Server Side Extensions in OCC")
to handle image processing in [Oracle Commerce Cloud]([Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud")).

Wraps the [lovell/sharp](https://github.com/lovell/sharp) node module.

## Supported transform
(add more if you like)
- resize
- rotate
- flip
- flop

Documentation [sharp](http://sharp.pixelplumbing.com/en/stable/ "Hisgh Speed Node JS image processor") high speed node JS image Processor


## Installation

Install all dependencies required by module

```
$ npm i
```

*It's important to not tha you must use the OCC version of Node when installing
the dependencies. Current version is:
`node_version": "v8.11.1`



## Tests

To run tests:
Running tests allows you to test the static and live json schema
without having to use postman.  The test state will only ever run when the sse is executed locally.
Files located in /tests

```
$ npm run test
```


## Usage
For the request body use the [sharp options](http://sharp.pixelplumbing.com/en/stable/api-constructor/ "Sharp Parameters") object schema.

You can chain transforms by adding items to the transform array.  I'm super happy that I ues
a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function* "function*") for this as I was strugging to find a use for one.

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



#### Respose

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
