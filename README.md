# web-audio-api-shim
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-api-shim)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/web-audio-api-shim.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/web-audio-api-shim)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://david-dm.org/mohayonao/web-audio-api-shim)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> shim for legacy Web Audio API

## Specification
- [Web Audio API - W3C Editor's Draft 22 June 2015](http://webaudio.github.io/web-audio-api/)

## Installation
npm:

```
npm install @mohayonao/web-audio-api-shim
```

You can choose two versions that are named `full` or `light`.
The `light` version installs easy polyfills only.

```js
// install full version
require("@mohayonao/web-audio-api-shim");

// install light version
require("@mohayonao/web-audio-api-shim/light");
```

downloads:

- [web-audio-api-shim.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.js)
- [web-audio-api-shim.min.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.min.js)
- [web-audio-api-shim-light.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim-light.js)
- [web-audio-api-shim-light.min.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim-light.min.js)

## Implemented
- `AnalyserNode#getFloatTimeDomainData`
- `AudioBuffer#copyFromChannel`
- `AudioBuffer#copyToChannel`
- `AudioContext#createStereoPanner`
- `AudioContext#decodeAudioData`
- `OfflineAudioContext#startRendering`

The below API are excluded in the light version.

  - `AudioContext#close`
  - `AudioContext#resume`
  - `AudioContext#suspend`
  - `AudioNode#disconnect`

## Not Implemented
- `AudioContext#createAudioWorker`

## API Supports
|                        | Shim | Shim L | Chrome  | Opera   | Firefox | Safari |
| -----------------------|:----:|:------:|:-------:|:-------:|:-------:|:-------:
| getFloatTimeDomainData | :ok: | :ok:   | :ok: 37 | :ok: 22 | :ok: 30 | :x: 9  |
| copyFromChannel        | :ok: | :ok:   | :ok: 43 | :ok: 30 | :ok: 27 | :x: 9  |
| copyToChannel          | :ok: | :ok:   | :ok: 43 | :ok: 30 | :ok: 27 | :x: 9  |
| createAudioWorker      | :x:  | :x:    | :x:  45 | :x:  31 | :x:  40 | :x: 9  |
| createStereoPanner     | :ok: | :ok:   | :ok: 41 | :ok: 28 | :ok: 37 | :x: 9  |
| decodeAudioData        | :ok: | :ok:   | :x:  45 | :x:  31 | :ok: 36 | :x: 9  |
| close                  | :ok: | :x:    | :ok: 42 | :ok: 29 | :ok: 40 | :ok: 9 |
| suspend                | :ok: | :x:    | :ok: 41 | :ok: 28 | :ok: 40 | :ok: 9 |
| resume                 | :ok: | :x:    | :ok: 41 | :ok: 28 | :ok: 40 | :ok: 9 |
| startRendering         | :ok: | :ok:   | :ok: 42 | :ok: 29 | :ok: 37 | :x: 9  |
| disconnect             | :ok: | :x:    | :ok: 43 | :ok: 30 | :x:  40 | :x: 9  |

## Online test suites
- [test - web-audio-api-shim](http://mohayonao.github.io/web-audio-api-shim/test/)
- [check implementations for this browser](http://mohayonao.github.io/web-audio-api-shim/test/impl.html)

## License
- MIT
