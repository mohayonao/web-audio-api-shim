# web-audio-api-shim
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-api-shim)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://david-dm.org/mohayonao/web-audio-api-shim)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> shim for legacy Web Audio API

## Specification
- [Web Audio API - W3C Editor's Draft 18 March 2015](http://webaudio.github.io/web-audio-api/)

## Installation
This project is an experimental. So, haven't be published to `npm` or `bower`.

downloads:

- [web-audio-api-shim.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.js)
- [web-audio-api-shim.min.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.min.js)

## Implemented
- `AnalyserNode#getFloatTimeDomainData`
- `AudioBuffer#copyFromChannel`
- `AudioBuffer#copyToChannel`
- `AudioContext#createAudioWorker`
- `AudioContext#createStereoPanner`
- `AudioContext#decodeAudioData`
- `AudioContext#close`
- `AudioContext#resume`
- `AudioContext#suspend`
- `OffelinAudioContext#startRendering`
- `AudioNode#disconnect`

## Native API Supports
|                        | Shim | Chrome | Firefox | Opera  | Safari |
| -----------------------|:----:|:------:|:-------:|:------:|:------:|
| getFloatTimeDomainData | :o:  | :o: 35 | :o: 35  | :o: 27 | :x: 8  |
| copyFromChannel        | :o:  | :x: 41 | :o: 36  | :x: 28 | :x: 8  |
| copyToChannel          | :o:  | :x: 41 | :o: 36  | :x: 28 | :x: 8  |
| createAudioWorker      | :o:  | :x: 41 | :x: 37  | :x: 28 | :x: 8  |
| createStereoPanner     | :o:  | :o: 41 | :o: 37  | :o: 28 | :x: 8  |
| decodeAudioData        | :o:  | :x: 41 | :o: 36  | :x: 28 | :x: 8  |
| close                  | :o:  | :x: 41 | :x: 37  | :x: 28 | :x: 8  |
| suspend                | :o:  | :o: 41 | :x: 37  | :o: 28 | :x: 8  |
| resume                 | :o:  | :o: 41 | :x: 37  | :o: 28 | :x: 8  |
| startRendering         | :o:  | :x: 41 | :o: 37  | :x: 28 | :x: 8  |
| disconnect             | :o:  | :x: 41 | :x: 37  | :x: 28 | :x: 8  |

## Online test suites
- [test - web-audio-api-shim](http://mohayonao.github.io/web-audio-api-shim/test/)
- [check implementations for this browser](http://mohayonao.github.io/web-audio-api-shim/test/impl.html)

## License
- MIT
