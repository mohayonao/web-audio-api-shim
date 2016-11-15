"use strict";

const AudioScheduledSourceNode = require("./AudioScheduledSourceNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");
const toShim = require("../utils/toShim");

class AudioBufferSourceNode extends AudioScheduledSourceNode {
  constructor(context, opts = {}) {
    const buffer = defaults(opts.buffer, null);
    const playbackRate = defaults(opts.playbackRate, 1);
    const detune = defaults(opts.detune, 0);
    const loop = defaults(opts.loop, false);
    const loopStart = defaults(opts.loopStart, 0);
    const loopEnd = defaults(opts.loopEnd, 0);
    const $ = toNative(context).createBufferSource();

    super($, opts);

    this._playbackRate = new AudioParam(this.$.playbackRate, 0, context.sampleRate / 2);
    this._detune = new AudioParam(this.$.detune);

    if (buffer !== null) {
      this.buffer = buffer;
    }
    this.playbackRate.value = playbackRate;
    this.detune.value = detune;
    this.loop = loop;
    this.loopStart = loopStart;
    this.loopEnd = loopEnd;
  }

  get buffer() {
    return toShim(this.$.buffer);
  }

  set buffer(value) {
    this.$.buffer = toNative(value);
  }

  get playbackRate() {
    return this._playbackRate;
  }

  get detune() {
    return this._detune;
  }

  get loop() {
    return this.$.loop;
  }

  set loop(value) {
    this.$.loop = value;
  }

  get loopStart() {
    return this.$.loopStart;
  }

  set loopStart(value) {
    this.$.loopStart = value;
  }

  get loopEnd() {
    return this.$.loopEnd;
  }

  set loopEnd(value) {
    this.$.loopEnd = value;
  }

  start(...args) {
    this.$.start(...args);
  }
}

module.exports = AudioBufferSourceNode;
