# occ-image-processing-sse

[Server-Side Extension](https://docs.oracle.com/cd/E97801_01/Cloud.18C/ExtendingCC/html/s4303developserversideextensions01.html "Server Side Extensions in OCC")
to handle image processing in [Oracle Commerce Cloud]([Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud")).

Wraps the [lovell/sharp](https://github.com/lovell/sharp) node module.

Documentation [sharp](http://sharp.pixelplumbing.com/en/stable/ "Hisgh Speed Node JS image processor") high speed node JS image Processor

## Installation

Install all dependencies required by module

```
$ npm i
```

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

#### Request
Method: POST
Path: /ccstorex/custom/v1image-processor
Body:
```
{
     "imgData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS ..."
     "sharpOptions": {
                       create: {
                         width: 300,
                         height: 200,
                         channels: 4,
                         background: { r: 255, g: 0, b: 0, alpha: 0.5 }
                       }
                     }

}
```

#### Respose:



