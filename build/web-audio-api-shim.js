(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var AnalyserNode = global.AnalyserNode;

if (AnalyserNode && !AnalyserNode.prototype.hasOwnProperty("getFloatTimeDomainData")) {
  (function () {
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
  })();
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
"use strict";

require("./getFloatTimeDomainData");
},{"./getFloatTimeDomainData":1}],3:[function(require,module,exports){
(function (global){
"use strict";

var AudioBuffer = global.AudioBuffer;

if (AudioBuffer && !AudioBuffer.prototype.hasOwnProperty("copyFromChannel")) {
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
"use strict";

var AudioBuffer = global.AudioBuffer;

if (AudioBuffer && !AudioBuffer.prototype.hasOwnProperty("copyToChannel")) {
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
"use strict";

require("./copyFromChannel");

require("./copyToChannel");
},{"./copyFromChannel":3,"./copyToChannel":4}],6:[function(require,module,exports){
(function (global){
"use strict";

var AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("close")) {
  //// ### AudioContext.prototype.close
  //// Closes the audio context, releasing any system audio resources used by the **`AudioContext`**.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  AudioContext.prototype.close = null;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AudioWorkerNode = _interopRequire(require("audio-worker-node"));

var AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("createAudioWorker")) {
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
  AudioContext.prototype.createAudioWorker = function (scriptURL, numberOfInputChannels, numberOfOutputChannels) {
    return new AudioWorkerNode(this, scriptURL, numberOfInputChannels, numberOfOutputChannels);
  };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"audio-worker-node":24}],8:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var StereoPannerNode = _interopRequire(require("stereo-panner-node"));

var AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("createStereoPanner")) {
  //// ### AudioContext.prototype.createStereoPanner
  //// Creates a StereoPannerNode.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `AudioNode as StereoPannerNode`
  AudioContext.prototype.createStereoPanner = function () {
    return new StereoPannerNode(this);
  };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"stereo-panner-node":30}],9:[function(require,module,exports){
(function (global){
"use strict";

var AudioContext = global.AudioContext;
var OfflineAudioContext = global.OfflineAudioContext;

if (OfflineAudioContext) {
  var audioContext = new OfflineAudioContext(1, 1, 44100);
  var isPromiseBased = false;

  try {
    var audioData = new Uint8Array(0).buffer;
    var nop = function () {};
    isPromiseBased = !!audioContext.decodeAudioData(audioData, nop);
  } catch (e) {}

  if (!isPromiseBased) {
    (function () {
      var decodeAudioData = AudioContext.prototype.decodeAudioData;

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
      AudioContext.prototype.decodeAudioData = function (audioData, successCallback, errorCallback) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          return decodeAudioData.call(_this, audioData, resolve, reject);
        }).then(successCallback, errorCallback);
      };
      AudioContext.prototype.decodeAudioData.original = decodeAudioData;
    })();
  }
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
"use strict";

if (!global.hasOwnProperty("AudioContext") && global.hasOwnProperty("webkitAudioContext")) {
  global.AudioContext = global.webkitAudioContext;
}
if (!global.hasOwnProperty("OfflineAudioContext") && global.hasOwnProperty("webkitOfflineAudioContext")) {
  global.OfflineAudioContext = global.webkitOfflineAudioContext;
}

require("./close");

require("./createAudioWorker");

require("./createStereoPanner");

require("./decodeAudioData");

require("./resume");

require("./suspend");
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./close":6,"./createAudioWorker":7,"./createStereoPanner":8,"./decodeAudioData":9,"./resume":11,"./suspend":12}],11:[function(require,module,exports){
(function (global){
"use strict";

var AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("resume")) {
  //// ### AudioContext.prototype.suspend
  //// Resumes the progression of time in an audio context that has been suspended, which may involve re-priming the frame buffer contents.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  AudioContext.prototype.resume = null;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
"use strict";

var AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("suspend")) {
  //// ### AudioContext.prototype.suspend
  //// Suspends the progression of time in the audio context, allows any current context processing blocks that are already processed to be played to the destination, and then allows the system to release its claim on audio hardware.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  AudioContext.prototype.suspend = null;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
"use strict";

var OfflineAudioContext = global.OfflineAudioContext;
var AudioNode = global.AudioNode;

if (OfflineAudioContext) {
  var audioContext = new OfflineAudioContext(1, 1, 44100);
  var isSelectiveDisconnection = false;

  try {
    audioContext.createGain().disconnect(audioContext.destination);
  } catch (e) {
    isSelectiveDisconnection = true;
  }

  if (!isSelectiveDisconnection) {
    (function () {
      var connect = AudioNode.prototype.connect;
      var disconnect = AudioNode.prototype.disconnect;

      var match = function (args, connection) {
        for (var i = 0, imax = args.length; i < imax; i++) {
          if (args[i] !== connection[i]) {
            return false;
          }
        }
        return true;
      };

      var disconnectAll = function (node) {
        for (var ch = 0, chmax = node.numberOfOutputs; ch < chmax; ch++) {
          disconnect.call(node, ch);
        }
        node._shim$connections = [];
      };

      var disconnectChannel = function (node, channel) {
        disconnect.call(node, channel);
        node._shim$connections = node._shim$connections.filter(function (connection) {
          return connection[1] !== channel;
        });
      };

      var disconnectSelect = function (node, args) {
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
      };

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
    })();
  }
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
"use strict";

require("./disconnect");
},{"./disconnect":13}],15:[function(require,module,exports){
"use strict";

require("./startRendering");
},{"./startRendering":16}],16:[function(require,module,exports){
(function (global){
"use strict";

var OfflineAudioContext = global.OfflineAudioContext;

if (OfflineAudioContext) {
  var audioContext = new OfflineAudioContext(1, 1, 44100);
  var isPromiseBased = false;

  try {
    isPromiseBased = !!audioContext.startRendering();
  } catch (e) {}

  if (!isPromiseBased) {
    (function () {
      var startRendering = OfflineAudioContext.prototype.startRendering;

      //// ### OfflineAudioContext.prototype.startRendering
      //// Given the current connections and scheduled changes, starts rendering audio.
      ////
      //// #### Parameters
      //// - _none_
      ////
      //// #### Return
      //// - `Promise<AudioBuffer>`
      OfflineAudioContext.prototype.startRendering = function () {
        var _this = this;

        return new Promise(function (resolve) {
          var oncomplete = _this.oncomplete;
          _this.oncomplete = function (e) {
            resolve(e.renderedBuffer);
            if (typeof oncomplete === "function") {
              oncomplete.call(_this, e);
            }
          };
          startRendering.call(_this);
        });
      };
      OfflineAudioContext.prototype.startRendering.original = startRendering;
    })();
  }
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
"use strict";

require("./AnalyserNode");

require("./AudioBuffer");

require("./AudioContext");

require("./AudioNode");

require("./OfflineAudioContext");
},{"./AnalyserNode":2,"./AudioBuffer":5,"./AudioContext":10,"./AudioNode":14,"./OfflineAudioContext":15}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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

},{"./audio-param-impl":18}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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
},{"./audio-param-node":19,"./audio-process-builder":20,"./audio-worker-code":21,"./audio-worker-global-scope":22,"./message-channel":25,"./script-loader":26}],24:[function(require,module,exports){
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

},{"./audio-worker-impl":23,"./utils":27}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
"use strict";

function defaults(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

module.exports = {
  defaults: defaults
};

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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
},{"./curve":28}],30:[function(require,module,exports){
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

},{"./stereo-panner-impl":29}]},{},[17]);
