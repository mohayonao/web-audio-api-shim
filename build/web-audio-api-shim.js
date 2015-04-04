(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
"use strict";

var AnalyserNode = global.AnalyserNode;

function installGetFloatTimeDomainData() {
  if (AnalyserNode.prototype.hasOwnProperty("getFloatTimeDomainData")) {
    return;
  }

  var uint8 = new Uint8Array(2048);

  //// ### AnalyserNode.prototype.getFloatTimeDomainData
  //// Copies the current time-domain (waveform) data into the passed floating-point array.
  ////
  //// #### Parameters
  //// - `array: Float32Array`
  ////   - This parameter is where the time-domain sample data will be copied.
  ////
  //// #### Return
  //// - `void`
  AnalyserNode.prototype.getFloatTimeDomainData = function (array) {
    this.getByteTimeDomainData(uint8);
    for (var i = 0, imax = array.length; i < imax; i++) {
      array[i] = (uint8[i] - 128) * 0.0078125;
    }
  };
}

function install() {
  installGetFloatTimeDomainData();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
"use strict";

var AudioBuffer = global.AudioBuffer;

function installCopyFromChannel() {
  if (AudioBuffer.prototype.hasOwnProperty("copyFromChannel")) {
    return;
  }

  //// ### AudioBuffer.prototype.copyFromChannel
  //// The `copyFromChannel` method copies the samples from the specified channel of the **`AudioBuffer`** to the `destination` array.
  ////
  //// #### Parameters
  //// - `destination: Float32Array`
  ////   - The array the channel data will be copied to.
  //// - `channelNumber: number`
  ////   - The index of the channel to copy the data from.
  //// - `startInChannel: number = 0`
  ////   - An optional offset to copy the data from.
  ////
  //// #### Return
  //// - `void`
  AudioBuffer.prototype.copyFromChannel = function (destination, channelNumber, startInChannel) {
    var source = this.getChannelData(channelNumber | 0).subarray(startInChannel | 0);
    destination.set(source.subarray(0, Math.min(source.length, destination.length)));
  };
}

function installCopyToChannel() {
  if (AudioBuffer.prototype.hasOwnProperty("copyToChannel")) {
    return;
  }

  //// ### AudioBuffer.prototype.copyToChannel
  //// The `copyToChannel` method copies the samples to the specified channel of the **`AudioBuffer`**, from the `source` array.
  ////
  //// #### Parameters
  //// - `source: Float32Array`
  ////   - The array the channel data will be copied from.
  //// - `channelNumber: number`
  ////   - The index of the channel to copy the data to.
  //// - `startInChannel: number = 0`
  ////   - An optional offset to copy the data to.
  ////
  //// #### Return
  //// - `void`
  AudioBuffer.prototype.copyToChannel = function (source, channelNumber, startInChannel) {
    this.getChannelData(channelNumber | 0).set(source, startInChannel | 0);
  };
}

function install() {
  installCopyFromChannel();
  installCopyToChannel();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
"use strict";

var OriginalAudioContext = global.AudioContext;
var OriginalOfflineAudioContext = global.OfflineAudioContext;
var AudioNode = global.AudioNode;
var EventTarget = global.EventTarget || global.Object.constructor;

function inherits(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
  });
}

function replaceAudioContext() {
  if (global.AudioContext !== OriginalAudioContext) {
    return;
  }

  function BaseAudioContext(audioContext) {
    this._ = {};
    this._.audioContext = audioContext;
    this._.destination = audioContext.destination;
    this._.state = "";
    this._.currentTime = 0;
    this._.sampleRate = audioContext.sampleRate;
    this._.onstatechange = null;
  }
  inherits(BaseAudioContext, EventTarget);

  Object.defineProperties(BaseAudioContext.prototype, {
    destination: {
      get: function get() {
        return this._.destination;
      }
    },
    sampleRate: {
      get: function get() {
        return this._.sampleRate;
      }
    },
    currentTime: {
      get: function get() {
        return this._.currentTime || this._.audioContext.currentTime;
      }
    },
    listener: {
      get: function get() {
        return this._.audioContext.listener;
      }
    },
    state: {
      get: function get() {
        return this._.state;
      }
    },
    onstatechange: {
      set: function set(fn) {
        if (typeof fn === "function") {
          this._.onstatechange = fn;
        }
      },
      get: function get() {
        return this._.onstatechange;
      }
    }
  });

  var AudioContext = (function (_BaseAudioContext) {
    function AudioContext() {
      _classCallCheck(this, AudioContext);

      _get(Object.getPrototypeOf(AudioContext.prototype), "constructor", this).call(this, new OriginalAudioContext());
      this._.state = "running";

      if (!OriginalAudioContext.prototype.hasOwnProperty("suspend")) {
        this._.destination = this._.audioContext.createGain();
        this._.destination.connect(this._.audioContext.destination);
        this._.destination.connect = function () {
          this._.audioContext.destination.connect.apply(this._.audioContext.destination, arguments);
        };
        this._.destination.disconnect = function () {
          this._.audioContext.destination.connect.apply(this._.audioContext.destination, arguments);
        };
        this._.destination.channelCountMode = "explicit";
      }
    }

    _inherits(AudioContext, _BaseAudioContext);

    return AudioContext;
  })(BaseAudioContext);

  AudioContext.prototype.suspend = function () {
    var _this = this;

    if (this._.state === "closed") {
      return Promise.reject(new Error("cannot suspend a closed AudioContext"));
    }

    var changeState = function changeState() {
      _this._.state = "suspended";
      _this._.currentTime = _this._.audioContext.currentTime;
    };
    var promise = undefined;

    if (typeof this._.audioContext === "function") {
      promise = this._.audioContext.suspend();
      promise.then(changeState);
    } else {
      AudioNode.prototype.disconnect.call(this._.destination);

      promise = Promise.resolve();
      promise.then(function () {
        changeState();

        var e = new global.Event("statechange");

        if (typeof _this._.onstatechange === "function") {
          _this._.onstatechange(e);
        }

        _this.dispatchEvent(e);
      });
    }

    return promise;
  };

  AudioContext.prototype.resume = function () {
    var _this2 = this;

    if (this._.state === "closed") {
      return Promise.reject(new Error("cannot resume a closed AudioContext"));
    }

    var changeState = function changeState() {
      _this2._.state = "running";
      _this2._.currentTime = 0;
    };
    var promise = undefined;

    if (typeof this._.audioContext.resume === "function") {
      promise = this._.audioContext.resume();
      promise.then(changeState);
    } else {
      AudioNode.prototype.connect.call(this._.destination, this._.audioContext.destination);

      promise = Promise.resolve();
      promise.then(function () {
        changeState();

        var e = new global.Event("statechange");

        if (typeof _this2._.onstatechange === "function") {
          _this2._.onstatechange(e);
        }

        _this2.dispatchEvent(e);
      });
    }

    return promise;
  };

  AudioContext.prototype.close = function () {
    var _this3 = this;

    if (this._.state === "closed") {
      return Promise.reject(new Error("Cannot close a context that is being closed or has already been closed."));
    }

    var changeState = function changeState() {
      _this3._.state = "closed";
      _this3._.currentTime = Infinity;
      _this3._.sampleRate = 0;
    };
    var promise = undefined;

    if (typeof this._.audioContext.close === "function") {
      promise = this._.audioContext.close();
      promise.then(changeState);
    } else {
      if (typeof this._.audioContext.suspend === "function") {
        this._.audioContext.suspend();
      } else {
        AudioNode.prototype.disconnect.call(this._.destination);
      }
      promise = Promise.resolve();

      promise.then(function () {
        changeState();

        var e = new global.Event("statechange");

        if (typeof _this3._.onstatechange === "function") {
          _this3._.onstatechange(e);
        }

        _this3.dispatchEvent(e);
      });
    }

    return promise;
  };

  ["addEventListener", "removeEventListener", "dispatchEvent", "createBuffer"].forEach(function (methodName) {
    AudioContext.prototype[methodName] = function () {
      return this._.audioContext[methodName].apply(this._.audioContext, arguments);
    };
  });

  ["decodeAudioData", "createBufferSource", "createMediaElementSource", "createMediaStreamSource", "createMediaStreamDestination", "createAudioWorker", "createScriptProcessor", "createAnalyser", "createGain", "createDelay", "createBiquadFilter", "createWaveShaper", "createPanner", "createStereoPanner", "createConvolver", "createChannelSplitter", "createChannelMerger", "createDynamicsCompressor", "createOscillator", "createPeriodicWave"].forEach(function (methodName) {
    AudioContext.prototype[methodName] = function () {
      if (this._.state === "closed") {
        throw new Error("Failed to execute '" + methodName + "' on 'AudioContext': AudioContext has been closed");
      }
      return this._.audioContext[methodName].apply(this._.audioContext, arguments);
    };
  });

  var OfflineAudioContext = (function (_BaseAudioContext2) {
    function OfflineAudioContext(numberOfChannels, length, sampleRate) {
      _classCallCheck(this, OfflineAudioContext);

      _get(Object.getPrototypeOf(OfflineAudioContext.prototype), "constructor", this).call(this, new OriginalOfflineAudioContext(numberOfChannels, length, sampleRate));
      this._.state = "suspended";
    }

    _inherits(OfflineAudioContext, _BaseAudioContext2);

    _createClass(OfflineAudioContext, [{
      key: "oncomplete",
      set: function (fn) {
        this._.audioContext.oncomplete = fn;
      },
      get: function () {
        return this._.audioContext.oncomplete;
      }
    }]);

    return OfflineAudioContext;
  })(BaseAudioContext);

  ["addEventListener", "removeEventListener", "dispatchEvent", "createBuffer", "decodeAudioData", "createBufferSource", "createMediaElementSource", "createMediaStreamSource", "createMediaStreamDestination", "createAudioWorker", "createScriptProcessor", "createAnalyser", "createGain", "createDelay", "createBiquadFilter", "createWaveShaper", "createPanner", "createStereoPanner", "createConvolver", "createChannelSplitter", "createChannelMerger", "createDynamicsCompressor", "createOscillator", "createPeriodicWave"].forEach(function (methodName) {
    OfflineAudioContext.prototype[methodName] = function () {
      return this._.audioContext[methodName].apply(this._.audioContext, arguments);
    };
  });

  OfflineAudioContext.prototype.startRendering = function () {
    var _this4 = this;

    if (this._.state !== "suspended") {
      return Promise.reject(new Error("cannot call startRendering more than once"));
    }

    this._.state = "running";

    var promise = this._.audioContext.startRendering();

    promise.then(function () {
      _this4._.state = "closed";

      var e = new global.Event("statechange");

      if (typeof _this4._.onstatechange === "function") {
        _this4._.onstatechange(e);
      }

      _this4.dispatchEvent(e);
    });

    return promise;
  };

  OfflineAudioContext.prototype.suspend = function () {
    if (typeof this._.audioContext.suspend === "function") {
      return this._.audioContext.suspend();
    }
    return Promise.reject(new Error("cannot suspend an OfflineAudioContext"));
  };

  OfflineAudioContext.prototype.resume = function () {
    if (typeof this._.audioContext.resume === "function") {
      return this._.audioContext.resume();
    }
    return Promise.reject(new Error("cannot resume an OfflineAudioContext"));
  };

  OfflineAudioContext.prototype.close = function () {
    if (typeof this._.audioContext.close === "function") {
      return this._.audioContext.close();
    }
    return Promise.reject(new Error("cannot close an OfflineAudioContext"));
  };

  global.AudioContext = AudioContext;
  global.OfflineAudioContext = OfflineAudioContext;
}

function installCreateAudioWorker() {
  if (OriginalAudioContext.prototype.hasOwnProperty("createAudioWorker")) {
    return;
  }

  var AudioWorkerNode = require("audio-worker-node");

  //// ### AudioContext.prototype.createAudioWorker
  //// Creates an **`AudioWorkerNode`** and its associated **`AudioWorkerGlobalScope`** for direct audio processing using JavaScript.
  ////
  //// #### Parameters
  //// - `scriptURL: string`
  ////   - This parameter represents the URL of the script to be loaded as an AudioWorker.
  //// - `numberOfInputChannels: number = 2`
  ////   - This parameter determines the number of channels for this node's input.
  //// - `numberOfOutputChannels: number = 2`
  ////   - This parameter determines the number of channels for this node's output.
  ////
  //// #### Return
  //// - `AudioNode as AudioWorkerNode`
  OriginalAudioContext.prototype.createAudioWorker = function (scriptURL, numberOfInputChannels, numberOfOutputChannels) {
    return new AudioWorkerNode(this, scriptURL, numberOfInputChannels, numberOfOutputChannels);
  };
}

function installCreateStereoPanner() {
  if (OriginalAudioContext.prototype.hasOwnProperty("createStereoPanner")) {
    return;
  }

  var StereoPannerNode = require("stereo-panner-node");

  //// ### AudioContext.prototype.createStereoPanner
  //// Creates a StereoPannerNode.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `AudioNode as StereoPannerNode`
  OriginalAudioContext.prototype.createStereoPanner = function () {
    return new StereoPannerNode(this);
  };
}

function installDecodeAudioData() {
  var audioContext = new OriginalOfflineAudioContext(1, 1, 44100);
  var isPromiseBased = false;

  try {
    var audioData = new Uint8Array(0).buffer;
    var nop = function nop() {};
    isPromiseBased = !!audioContext.decodeAudioData(audioData, nop);
  } catch (e) {}

  if (isPromiseBased) {
    return;
  }

  var decodeAudioData = OriginalAudioContext.prototype.decodeAudioData;

  //// ### AudioContext.prototype.decodeAudioData
  //// Asynchronously decodes the audio file data contained in the ArrayBuffer.
  ////
  //// #### Parameters
  //// - `audioData: ArrayBuffer`
  ////   - An ArrayBuffer containing compressed audio data
  //// - `successCallback: function = null`
  ////   - A callback function which will be invoked when the decoding is finished.
  //// - `errorCallback: function = null`
  ////   - A callback function which will be invoked if there is an error decoding the audio file.
  ////
  //// #### Return
  //// - `Promise<AudioBuffer>`
  OriginalAudioContext.prototype.decodeAudioData = function (audioData, successCallback, errorCallback) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      return decodeAudioData.call(_this5, audioData, resolve, reject);
    }).then(successCallback, errorCallback);
  };
  OriginalAudioContext.prototype.decodeAudioData.original = decodeAudioData;
}

function installClose() {
  if (OriginalAudioContext.prototype.hasOwnProperty("close")) {
    return;
  }

  //// ### AudioContext.prototype.close
  //// Closes the audio context, releasing any system audio resources used by the **`AudioContext`**.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  replaceAudioContext();
}

function installResume() {
  if (OriginalAudioContext.prototype.hasOwnProperty("resume")) {
    return;
  }

  //// ### AudioContext.prototype.suspend
  //// Resumes the progression of time in an audio context that has been suspended, which may involve re-priming the frame buffer contents.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  replaceAudioContext();
}

function installSuspend() {
  if (OriginalAudioContext.prototype.hasOwnProperty("suspend")) {
    return;
  }

  //// ### AudioContext.prototype.suspend
  //// Suspends the progression of time in the audio context, allows any current context processing blocks that are already processed to be played to the destination, and then allows the system to release its claim on audio hardware.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  replaceAudioContext();
}

function installStartRendering() {
  var audioContext = new OriginalOfflineAudioContext(1, 1, 44100);
  var isPromiseBased = false;

  try {
    isPromiseBased = !!audioContext.startRendering();
  } catch (e) {}

  if (isPromiseBased) {
    return;
  }

  var startRendering = OriginalOfflineAudioContext.prototype.startRendering;

  //// ### OfflineAudioContext.prototype.startRendering
  //// Given the current connections and scheduled changes, starts rendering audio.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<AudioBuffer>`
  OriginalOfflineAudioContext.prototype.startRendering = function () {
    var _this6 = this;

    return new Promise(function (resolve) {
      var oncomplete = _this6.oncomplete;
      _this6.oncomplete = function (e) {
        resolve(e.renderedBuffer);
        if (typeof oncomplete === "function") {
          oncomplete.call(_this6, e);
        }
      };
      startRendering.call(_this6);
    });
  };
  OriginalOfflineAudioContext.prototype.startRendering.original = startRendering;
}

function install() {
  installCreateAudioWorker();
  installCreateStereoPanner();
  installDecodeAudioData();
  installStartRendering();
  installClose();
  installResume();
  installSuspend();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"audio-worker-node":13,"stereo-panner-node":19}],4:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
"use strict";

var OfflineAudioContext = global.OfflineAudioContext;
var AudioNode = global.AudioNode;
var connect = AudioNode.prototype.connect;
var disconnect = AudioNode.prototype.disconnect;

function match(args, connection) {
  for (var i = 0, imax = args.length; i < imax; i++) {
    if (args[i] !== connection[i]) {
      return false;
    }
  }
  return true;
}

function disconnectAll(node) {
  for (var ch = 0, chmax = node.numberOfOutputs; ch < chmax; ch++) {
    disconnect.call(node, ch);
  }
  node._shim$connections = [];
}

function disconnectChannel(node, channel) {
  disconnect.call(node, channel);
  node._shim$connections = node._shim$connections.filter(function (connection) {
    return connection[1] !== channel;
  });
}

function disconnectSelect(node, args) {
  var remain = [];
  var hasDestination = false;

  node._shim$connections.forEach(function (connection) {
    hasDestination = hasDestination || args[0] === connection[0];
    if (!match(args, connection)) {
      remain.push(connection);
    }
  });

  if (!hasDestination) {
    throw new Error("Failed to execute 'disconnect' on 'AudioNode': the given destination is not connected.");
  }

  disconnectAll(node);

  remain.forEach(function (connection) {
    connect.call(node, connection[0], connection[1], connection[2]);
  });

  node._shim$connections = remain;
}

function installDisconnect() {
  var audioContext = new OfflineAudioContext(1, 1, 44100);
  var isSelectiveDisconnection = false;

  try {
    audioContext.createGain().disconnect(audioContext.destination);
  } catch (e) {
    isSelectiveDisconnection = true;
  }

  if (isSelectiveDisconnection) {
    return;
  }

  //// ### AudioNode.prototype.disconnect
  //// Disconnects all outgoing connections from **`AudioNode`**.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `void`
  ////
  //// ### AudioNode.prototype.disconnect
  //// #### Parameters
  //// - `output: number`
  ////   - This parameter is an index describing which output of the AudioNode to disconnect.
  ////
  //// #### Return
  //// - `void`
  ////
  //// ### AudioNode.prototype.disconnect
  //// #### Parameters
  //// - `destination: AudioNode|AudioParam`
  ////   - The destination parameter is the AudioNode/AudioParam to disconnect.
  ////
  //// #### Return
  //// - `void`
  ////
  //// ### AudioNode.prototype.disconnect
  //// #### Parameters
  //// - `destination: AudioNode|AudioParam`
  ////   - The destination parameter is the AudioNode/AudioParam to disconnect.
  //// - `output: number`
  ////   - The output parameter is an index describing which output of the AudioNode from which to disconnect.
  ////
  //// #### Return
  //// - `void`
  ////
  //// ### AudioNode.prototype.disconnect
  //// #### Parameters
  //// - `destination: AudioNode`
  ////   - The destination parameter is the AudioNode to disconnect.
  //// - `output: number`
  ////   - The output parameter is an index describing which output of the AudioNode from which to disconnect.
  //// - `input: number`
  ////    - The input parameter is an index describing which input of the destination AudioNode to disconnect.
  ////
  //// #### Return
  //// - `void`
  ////
  AudioNode.prototype.disconnect = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._shim$connections = this._shim$connections || [];

    if (args.length === 0) {
      disconnectAll(this);
    } else if (args.length === 1 && typeof args[0] === "number") {
      disconnectChannel(this, args[0]);
    } else {
      disconnectSelect(this, args);
    }
  };
  AudioNode.prototype.disconnect.original = disconnect;

  AudioNode.prototype.connect = function (destination) {
    var output = arguments[1] === undefined ? 0 : arguments[1];
    var input = arguments[2] === undefined ? 0 : arguments[2];

    this._shim$connections = this._shim$connections || [];

    if (destination instanceof AudioNode) {
      connect.call(this, destination, output, input);
    } else {
      connect.call(this, destination, output);
      input = 0;
    }

    this._shim$connections.push([destination, output, input]);
  };
  AudioNode.prototype.connect.original = connect;
}

function install() {
  installDisconnect();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
"use strict";

var _install = require("./install");

_install.install();
},{"./install":6}],6:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
"use strict";

function install() {
  if (!global.hasOwnProperty("AudioContext") && global.hasOwnProperty("webkitAudioContext")) {
    global.AudioContext = global.webkitAudioContext;
  }
  if (!global.hasOwnProperty("OfflineAudioContext") && global.hasOwnProperty("webkitOfflineAudioContext")) {
    global.OfflineAudioContext = global.webkitOfflineAudioContext;
  }

  if (!global.AudioContext) {
    return;
  }

  require("./AnalyserNode").install();
  require("./AudioBuffer").install();
  require("./AudioNode").install();
  require("./AudioContext").install();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AnalyserNode":1,"./AudioBuffer":2,"./AudioContext":3,"./AudioNode":4}],7:[function(require,module,exports){
(function (global){
"use strict";

/**
 *  AudioParamImpl
 *  +-----------------+
 *  | GainNode(inlet) |
 *  | gain: value     |
 *  +-----------------+
 *    |
 *  +-----------------------------+
 *  | ScriptProcessorNode(outlet) |
 *  +-----------------------------+
 */
function AudioParamImpl(audioContext, defaultValue, bufferSize) {
  this.inlet = audioContext.createGain();
  this.outlet = audioContext.createScriptProcessor(bufferSize, 1, 1);

  this.param = this.inlet.gain;
  this.param.value = defaultValue;
  this.array = new Float32Array(bufferSize);

  this.inlet.connect(this.outlet);

  var array = this.array;
  this.outlet.onaudioprocess = function(e) {
    array.set(e.inputBuffer.getChannelData(0));
  };
}

AudioParamImpl.prototype.connect = function(destination) {
  global.AudioNode.prototype.connect.call(this.outlet, destination);
};

AudioParamImpl.prototype.disconnect = function() {
  global.AudioNode.prototype.disconnect.call(this.outlet);
};

module.exports = AudioParamImpl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
"use strict";

var AudioParamImpl = require("./audio-param-impl");

function AudioParamNode(audioContext, defaultValue, bufferSize) {
  var impl = new AudioParamImpl(audioContext, defaultValue, bufferSize);

  Object.defineProperties(impl.inlet, {
    param: {
      value: impl.param,
      enumerable: true
    },
    array: {
      value: impl.array,
      enumerable: true
    },
    connect: {
      value: function(destination) {
        impl.connect(destination);
      }
    },
    disconnect: {
      value: function() {
        impl.disconnect();
      }
    }
  });

  return impl.inlet;
}

module.exports = AudioParamNode;

},{"./audio-param-impl":7}],9:[function(require,module,exports){
"use strict";

var AudioProcessBuilder = {};

AudioProcessBuilder.build = function(opts) {
  var numOfInput = opts.numOfInput;
  var numOfOutput = opts.numOfOutput;

  if (numOfInput === 1 && numOfOutput === 1) {
    return build_onaudioprocess_1(opts);
  }
  if (numOfInput === 2 && numOfOutput === 2) {
    return build_onaudioprocess_2(opts);
  }
  return build_onaudioprocess_n(opts);
};

function build_onaudioprocess_1(opts) {
  var func = opts.func;
  var scope = opts.scope;
  var parameters = opts.parameters;

  return function(e) {
    e.inputBuffers = [
      e.inputBuffer.getChannelData(0)
    ];
    e.outputBuffers = [
      e.outputBuffer.getChannelData(0)
    ];
    e.parameters = parameters;

    func.call(scope, e);
  };
}

function build_onaudioprocess_2(opts) {
  var func = opts.func;
  var scope = opts.scope;
  var parameters = opts.parameters;

  return function(e) {
    var inp = e.inputBuffer;
    var out = e.outputBuffer;
    e.inputBuffers = [
      inp.getChannelData(0),
      inp.getChannelData(1)
    ];
    e.outputBuffers = [
      out.getChannelData(0),
      out.getChannelData(1)
    ];
    e.parameters = parameters;

    func.call(scope, e);
  };
}

function build_onaudioprocess_n(opts) {
  var func = opts.func;
  var scope = opts.scope;
  var numOfInput = opts.numOfInput;
  var numOfOutput = opts.numOfOutput;
  var parameters = opts.parameters;

  return function(e) {
    var inputBuffers = new Array(numOfInput);
    var outputBuffers = new Array(numOfOutput);
    var i;

    for (i = 0; i < numOfInput; i++) {
      inputBuffers[i] = e.inputBuffer.getChannelData(i);
    }
    for (i = 0; i < numOfOutput; i++) {
      outputBuffers[i] = e.outputBuffer.getChannelData(i);
    }

    e.inputBuffers = inputBuffers;
    e.outputBuffers = outputBuffers;
    e.parameters = parameters;

    func.call(scope, e);
  };
}

module.exports = AudioProcessBuilder;

},{}],10:[function(require,module,exports){
"use strict";

var WORKER_ATTRS = [
  "onaudioprocess",
  "sampleRate",
  "self",
  "onmessage",
  "postMessage",
  "close",
  "importScripts",
];

var AudioWorkerCode = {};

AudioWorkerCode.tokens = function(src) {
  var pos = 0;
  var tokens = [];

  function eat(re) {
    while (pos < src.length) {
      var ch = src.charAt(pos);
      if (!re.test(ch)) {
        break;
      }
      pos += 1;
    }
  }

  function eatString(quote) {
    while (pos < src.length) {
      var ch = src.charAt(pos++);
      if (ch === quote) {
        return;
      }
      if (ch === "\\") {
        pos += 1;
      }
    }
    // istanbul ignore next
    throw new SyntaxError("Unexpected token ILLEGAL");
  }

  function eatMultiLineComment() {
    pos += 1;
    while (pos < src.length) {
      var ch = src.charAt(pos++);
      if (ch === "*" && src.charAt(pos) === "/") {
        pos += 1;
        return;
      }
    }
    // istanbul ignore next
    throw new SyntaxError("Unexpected token ILLEGAL");
  }

  while (pos < src.length) {
    var begin = pos;
    var ch = src.charAt(pos++);

    if (/\s/.test(ch)) {
      eat(/\s/);
    } else if (/[a-zA-Z_$]/.test(ch)) {
      eat(/[\w$]/);
    } else if (/\d/.test(ch)) {
      eat(/[.\d]/);
    } else if (/['"]/.test(ch)) {
      eatString(ch);
    } else if (ch === "/") {
      ch = src.charAt(pos);
      if (ch === "/") {
        eat(/[^\n]/);
      } else if (ch === "*") {
        eatMultiLineComment();
      }
    }

    tokens.push(src.slice(begin, pos));
  }

  return tokens;
};

AudioWorkerCode.filter = function(src) {
  var tokens = AudioWorkerCode.tokens(src);

  function prevToken(index) {
    while (index--) {
      if (/[\S/]/.test(tokens[index].charAt(0))) {
        return tokens[index];
      }
    }
    return "";
  }

  WORKER_ATTRS.forEach(function(attr) {
    var pos = 0;
    var index;

    while ((index = tokens.indexOf(attr, pos)) !== -1) {
      if (prevToken(index) !== ".") {
        tokens[index] = "__self." + tokens[index];
      }
      pos = index + 1;
    }
  });

  return tokens.join("");
};

AudioWorkerCode.compile = function(src) {
  var code = [
    "(function(__self) { 'use strict';",
    AudioWorkerCode.filter(src),
    "})"
  ].join("\n");
  return eval.call(null, code);
};

module.exports = AudioWorkerCode;

},{}],11:[function(require,module,exports){
"use strict";

function AudioWorkerGlobalScope(node) {
  var onaudioprocess = null;

  Object.defineProperties(this, {
    self: {
      value: this,
      enumerable: true
    },
    sampleRate: {
      value: node.sampleRate,
      enumerable: true
    },
    onaudioprocess: {
      set: function(value) {
        if (typeof value !== "function") {
          value = null;
        }
        node.onaudioprocess(value);
        onaudioprocess = value;
      },
      get: function() {
        return onaudioprocess;
      },
      enumerable: true
    },
    onmessage: {
      set: function(value) {
        if (typeof value === "function") {
          value = value.bind(this);
        } else {
          value = null;
        }
        node.port2.onmessage = value;
      },
      get: function() {
        return node.port2.onmessage;
      },
      enumerable: true
    },
    postMessage: {
      value: function() {
        node.port2.postMessage.apply(node.port2, arguments);
      }
    },
    close: {
      value: function() {
        node.close.apply(node, arguments);
      }
    },
    importScripts: {
      value: function() {
        node.importScripts.apply(node, arguments);
      }
    }
  });
}

module.exports = AudioWorkerGlobalScope;

},{}],12:[function(require,module,exports){
(function (global){
"use strict";

var AudioParamNode = require("./audio-param-node");
var AudioWorkerGlobalScope = require("./audio-worker-global-scope");
var AudioProcessBuilder = require("./audio-process-builder");
var ScriptLoader = require("./script-loader");
var AudioWorkerCode = require("./audio-worker-code");
var MessageChannel = require("./message-channel");

var BUFFER_SIZE = 1024;

function AudioWorkerNodeImpl(audioContext, scriptURL, numOfInput, numOfOutput) {
  var ch = new MessageChannel();

  this.audioContext = audioContext;
  this.sampleRate = audioContext.sampleRate;
  this.inlet = audioContext.createScriptProcessor(BUFFER_SIZE, numOfInput, numOfOutput);
  this.outlet = this.inlet;
  this.port1 = ch.port1;
  this.port2 = ch.port2;
  this.scope = new AudioWorkerGlobalScope(this);

  this._numOfInput = numOfInput;
  this._numOfOutput = numOfOutput;
  this._isConnected = false;
  this._isTerminated = false;
  this._silencer = null;
  this._dc1buffer = null;
  this._dc1 = null;
  this._params = {};
  this._parameters = {};

  var scope = this.scope;
  ScriptLoader.load(scriptURL, function(script) {
    try {
      AudioWorkerCode.compile(script).call(scope, scope);
    } catch (e) {}
  });
}

AudioWorkerNodeImpl.prototype.connect = function(destination) {
  var audioContext = this.audioContext;

  if (!this._isConnected) {
    this._dc1buffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);
    this._dc1buffer.getChannelData(0).set([ 1, 1 ]);

    this._dc1 = audioContext.createBufferSource();
    this._dc1.buffer = this._dc1buffer;
    this._dc1.loop = true;
    this._dc1.start(audioContext.currentTime);

    Object.keys(this._params).forEach(function(name) {
      this._dc1.connect(this._params[name]);
    }, this);

    this._isConnected = true;
  }

  global.AudioNode.prototype.connect.call(this.inlet, destination);
};

AudioWorkerNodeImpl.prototype.disconnect = function() {
  var audioContext = this.audioContext;

  if (this._isConnected) {
    this._dc1.stop(audioContext.currentTime);
    this._dc1.disconnect();

    this._dc1buffer = null;
    this._dc1 = null;
    this._isConnected = false;
  }

  global.AudioNode.prototype.disconnect.call(this.outlet);
};

AudioWorkerNodeImpl.prototype.terminate = function() {
  if (!this._isTerminated) {
    this.inlet.onaudioprocess = null;
    this.port1.close();
    this.port2.close();
    this._isTerminated = true;
  }
};

AudioWorkerNodeImpl.prototype.addParameter = function(name, defaultValue) {
  var audioContext = this.audioContext;

  if (this._params.hasOwnProperty(name)) {
    return this._params[name].param;
  }

  if (this._silencer === null) {
    this._silencer = audioContext.createGain();
    this._silencer.gain.value = 0;
    this._silencer.connect(this.outlet);
  }

  var paramNode = new AudioParamNode(audioContext, defaultValue, BUFFER_SIZE);

  paramNode.connect(this._silencer);

  if (this._isConnected) {
    this._dc1.connect(paramNode);
  }

  this._params[name] = paramNode;
  this._parameters[name] = paramNode.array;

  return paramNode.param;
};

AudioWorkerNodeImpl.prototype.getParameter = function(name) {
  return this._params[name] && this._params[name].param;
};

AudioWorkerNodeImpl.prototype.removeParameter = function(name) {
  if (!this._params.hasOwnProperty(name)) {
    return;
  }

  this._params[name].disconnect();

  delete this._params[name];
  delete this._parameters[name];

  if (Object.keys(this._params).length === 0) {
    this._silencer.disconnect();
    this._silencer = null;
  }
};

AudioWorkerNodeImpl.prototype.onaudioprocess = function(func) {
  if (this._isTerminated || typeof func !== "function") {
    this.inlet.onaudioprocess = null;
  } else {
    this.inlet.onaudioprocess = AudioProcessBuilder.build({
      func: func,
      scope: this.scope,
      numOfInput: this._numOfInput,
      numOfOutput: this._numOfOutput,
      parameters: this._parameters,
    });
  }
};

AudioWorkerNodeImpl.prototype.close = function() {
  this.terminate();
};

AudioWorkerNodeImpl.prototype.importScripts = function() {
  throw new Error("Not Supported: importScripts");
};

module.exports = AudioWorkerNodeImpl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-param-node":8,"./audio-process-builder":9,"./audio-worker-code":10,"./audio-worker-global-scope":11,"./message-channel":14,"./script-loader":15}],13:[function(require,module,exports){
"use strict";

var utils = require("./utils");
var AudioWorkerImpl = require("./audio-worker-impl");

function AudioWorkerNode(audioContext, scriptURL, numberOfInputChannels, numberOfOutputChannels) {
  numberOfInputChannels = utils.defaults(numberOfInputChannels, 2);
  numberOfOutputChannels = utils.defaults(numberOfOutputChannels, 2);

  var impl = new AudioWorkerImpl(audioContext, scriptURL, numberOfInputChannels, numberOfOutputChannels);

  Object.defineProperties(impl.inlet, {
    onmessage: {
      set: function(value) {
        if (typeof value !== "function") {
          value = null;
        }
        impl.port1.onmessage = value;
      },
      get: function() {
        return impl.port1.onmessage;
      },
      enumerable: true
    },
    connect: {
      value: function(destination) {
        return impl.connect(destination);
      }
    },
    disconnect: {
      value: function() {
        return impl.disconnect();
      }
    },
    postMessage: {
      value: function() {
        return impl.port1.postMessage.apply(impl.port1, arguments);
      }
    },
    addParameter: {
      value: function(name, defaultValue) {
        defaultValue = utils.defaults(defaultValue, 0);
        if (!Object.getOwnPropertyDescriptor(impl.inlet, name)) {
          Object.defineProperty(impl.inlet, name, {
            get: function() {
              return impl.getParameter(name);
            },
            configurable: true,
            enumerable: true
          });
        }
        return impl.addParameter(name, defaultValue);
      }
    },
    removeParameter: {
      value: function(name) {
        if (Object.getOwnPropertyDescriptor(impl.inlet, name)) {
          delete impl.inlet[name];
        }
        return impl.removeParameter(name);
      }
    },
    terminate: {
      value: function() {
        return impl.terminate();
      }
    }
  });

  return impl.inlet;
}
module.exports = AudioWorkerNode;

},{"./audio-worker-impl":12,"./utils":16}],14:[function(require,module,exports){
(function (global){
"use strict";

function MessageChannelShim() {
  this.port1 = new MessagePort();
  this.port2 = new MessagePort();
  this.port1._target = this.port2;
  this.port2._target = this.port1;
}

function MessagePort() {
  this._onmessage = null;
  this._target = null;
  this._isClosed = false;
  this._pendings = [];

  Object.defineProperties(this, {
    onmessage: {
      set: function(value) {
        var _this = this;
        this._onmessage = value;
        if (this._pendings.length) {
          setTimeout(function() {
            _this._pendings.splice(0).forEach(function(e) {
              _this._onmessage(e);
            });
          }, 0);
        }
      },
      get: function() {
        return this._onmessage;
      },
      enumerable: true
    }
  });
}

MessagePort.prototype.postMessage = function(message) {
  var target = this._target;
  if (!this._isClosed) {
    var e = {
      type: "message",
      data: message
    };
    if (typeof target._onmessage === "function") {
      setTimeout(function() {
        target._onmessage(e);
      }, 0);
    } else {
      target._pendings.push(e);
    }
  }
};

MessagePort.prototype.close = function() {
  this._isClosed = true;
  this._pendings.splice(0);
};

module.exports = global.MessageChannel || MessageChannelShim;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
(function (global){
"use strict";

var ScriptLoader = {};

ScriptLoader.load = function(scriptURL, callback) {
  var xhr = new global.XMLHttpRequest();
  xhr.open("GET", scriptURL);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(xhr.response);
    }
  };
  xhr.send();
};

module.exports = ScriptLoader;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
"use strict";

function defaults(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

module.exports = {
  defaults: defaults
};

},{}],17:[function(require,module,exports){
"use strict";

var WS_CURVE_SIZE = 4096;
var curveL = new Float32Array(WS_CURVE_SIZE);
var curveR = new Float32Array(WS_CURVE_SIZE);

(function() {
  for (var i = 0; i < WS_CURVE_SIZE; i++) {
    curveL[i] = Math.cos((i / WS_CURVE_SIZE) * Math.PI * 0.5);
    curveR[i] = Math.sin((i / WS_CURVE_SIZE) * Math.PI * 0.5);
  }
})();

module.exports = {
  L: curveL,
  R: curveR,
};

},{}],18:[function(require,module,exports){
(function (global){
"use strict";

var curve = require("./curve");

/**
 *  StereoPannerImpl
 *  +--------------------------------+  +------------------------+
 *  | ChannelSplitter(inlet)         |  | BufferSourceNode(_dc1) |
 *  +--------------------------------+  | buffer: [ 1, 1 ]       |
 *    |                            |    | loop: true             |
 *    |                            |    +------------------------+
 *    |                            |       |
 *    |                            |  +----------------+
 *    |                            |  | GainNode(_pan) |
 *    |                            |  | gain: 0(pan)   |
 *    |                            |  +----------------+
 *    |                            |    |
 *    |    +-----------------------|----+
 *    |    |                       |    |
 *    |  +----------------------+  |  +----------------------+
 *    |  | WaveShaperNode(_wsL) |  |  | WaveShaperNode(_wsR) |
 *    |  | curve: curveL        |  |  | curve: curveR        |
 *    |  +----------------------+  |  +----------------------+
 *    |               |            |               |
 *    |               |            |               |
 *    |               |            |               |
 *  +--------------+  |          +--------------+  |
 *  | GainNode(_L) |  |          | GainNode(_R) |  |
 *  | gain: 0    <----+          | gain: 0    <----+
 *  +--------------+             +--------------+
 *    |                            |
 *  +--------------------------------+
 *  | ChannelMergerNode(outlet)      |
 *  +--------------------------------+
 */
function StereoPannerImpl(audioContext) {
  this.audioContext = audioContext;
  this.inlet = audioContext.createChannelSplitter(2);
  this._pan = audioContext.createGain();
  this.pan = this._pan.gain;
  this._wsL = audioContext.createWaveShaper();
  this._wsR = audioContext.createWaveShaper();
  this._L = audioContext.createGain();
  this._R = audioContext.createGain();
  this.outlet = audioContext.createChannelMerger(2);

  this.inlet.channelCount = 2;
  this.inlet.channelCountMode = "explicit";
  this._pan.gain.value = 0;
  this._wsL.curve = curve.L;
  this._wsR.curve = curve.R;
  this._L.gain.value = 0;
  this._R.gain.value = 0;

  this.inlet.connect(this._L, 0);
  this.inlet.connect(this._R, 1);
  this._L.connect(this.outlet, 0, 0);
  this._R.connect(this.outlet, 0, 1);
  this._pan.connect(this._wsL);
  this._pan.connect(this._wsR);
  this._wsL.connect(this._L.gain);
  this._wsR.connect(this._R.gain);

  this._isConnected = false;
  this._dc1buffer = null;
  this._dc1 = null;
}

StereoPannerImpl.prototype.connect = function(destination) {
  var audioContext = this.audioContext;
  if (!this._isConnected) {
    this._isConnected = true;
    this._dc1buffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);
    this._dc1buffer.getChannelData(0).set([ 1, 1 ]);

    this._dc1 = audioContext.createBufferSource();
    this._dc1.buffer = this._dc1buffer;
    this._dc1.loop = true;
    this._dc1.start(audioContext.currentTime);
    this._dc1.connect(this._pan);
  }
  global.AudioNode.prototype.connect.call(this.outlet, destination);
};

StereoPannerImpl.prototype.disconnect = function() {
  var audioContext = this.audioContext;
  if (this._isConnected) {
    this._isConnected = false;
    this._dc1.stop(audioContext.currentTime);
    this._dc1.disconnect();
    this._dc1 = null;
    this._dc1buffer = null;
  }
  global.AudioNode.prototype.disconnect.call(this.outlet);
};

module.exports = StereoPannerImpl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./curve":17}],19:[function(require,module,exports){
"use strict";

var StereoPannerImpl = require("./stereo-panner-impl");

function StereoPanner(audioContext) {
  var impl = new StereoPannerImpl(audioContext);

  Object.defineProperties(impl.inlet, {
    pan: {
      value: impl.pan,
      enumerable: true
    },
    connect: {
      value: function(node) {
        return impl.connect(node);
      }
    },
    disconnect: {
      value: function() {
        return impl.disconnect();
      }
    }
  });

  return impl.inlet;
}

module.exports = StereoPanner;

},{"./stereo-panner-impl":18}]},{},[5]);
