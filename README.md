# web-audio-api-shim
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-api-shim)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://david-dm.org/mohayonao/web-audio-api-shim)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> shim for legacy Web Audio API

## Spec
- [Web Audio API - W3C Editor's Draft 18 March 2015](http://webaudio.github.io/web-audio-api/)

## Installation
This project is an experimental. So, haven't be published to `npm` or `bower`.

downloads:

- [web-audio-api-shim.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.js)
- [web-audio-api-shim.min.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.min.js)

## Implemented
- `AudioContext.prototype.createStereoPanner()`
- `AudioContext.prototype.decodeAudioData()`
- `OffelinAudioContext.startRendering()`

## TODO
- `AudioContext.prototype.createAudioWorker()`
- `AudioContext.prototype.close()`
- `AudioContext.prototype.resume()`
- `AudioContext.prototype.suspend()`
- `AudioContext.prototype.state`
- `AudioNode.prototype.disconnect()`

## Native API Supports
|                    | Shim | Chrome | Firefox | Safari |
| -------------------|:----:|:------:|:-------:|:------:|
| createAudioWorker  | :x:  | :x: 41 | :x: 36  | :x: 8  |
| createStereoPanner | :o:  | :o: 41 | :x: 36  | :x: 8  |
| decodeAudioData    | :o:  | :x: 41 | :o: 36  | :x: 8  |
| close              | :x:  | :o: 41 | :x: 36  | :x: 8  |
| suspend            | :x:  | :o: 41 | :x: 36  | :x: 8  |
| resume             | :x:  | :o: 41 | :x: 36  | :x: 8  |
| state              | :x:  | :o: 41 | :x: 36  | :x: 8  |
| startRendering     | :o:  | :x: 41 | :x: 36  | :x: 8  |
| disconnect         | :x:  | :x: 41 | :x: 36  | :x: 8  |

## Online test suites
- [test - web-audio-api-shim](http://mohayonao.github.io/web-audio-api-shim/test/)

## License
MIT
