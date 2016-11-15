"use strict";

const NativeAudioContext = global.AudioContext || global.webkitAudioContext;
const BaseAudioContext = require("./BaseAudioContext");
const MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");
const MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");
const MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");
const defaults = require("../utils/defaults");

class AudioContext extends BaseAudioContext {
  constructor(opts = {}) {
    const latencyHint = defaults(opts.latencyHint, "interactive");

    super(new NativeAudioContext(latencyHint));
  }

  get outputLatency() {
    return 0;
  }

  get outputTimeStamp() {
    return { contextTime: 0, performanceTime: 0 };
  }

  close() {
    return this.$.close();
  }

  createMediaElementSource(mediaElement) {
    return new MediaElementAudioSourceNode(this, { mediaElement });
  }

  createMediaStreamSource(mediaStream) {
    return new MediaStreamAudioSourceNode(this, { mediaStream });
  }

  createMediaStreamDestination() {
    return new MediaStreamAudioDestinationNode(this);
  }
}

module.exports = AudioContext;
