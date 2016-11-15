"use strict";

const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class AudioBuffer {
  constructor(context, opts = {}) {
    const numberOfChannels = defaults(opts.numberOfChannels, 1);
    const length = defaults(opts.length, 0);
    const sampleRate = defaults(opts.sampleRate, context.sampleRate);
    const $ = toNative(context).createBuffer(numberOfChannels, length, sampleRate);

    this.$ = $;
    $._ = this;
  }

  get length() {
    return this.$.length;
  }

  get duration() {
    return this.$.duration;
  }

  get sampleRate() {
    return this.$.sampleRate;
  }

  get numberOfChannels() {
    return this.$.numberOfChannels;
  }

  getChannelData(channel) {
    return this.$.getChannelData(channel);
  }

  copyFromChannel(destination, channelNumber, startInChannel = 0) {
    if (this.$.copyFromChannel) {
      this.$.copyFromChannel(destination, channelNumber, startInChannel);
    } else {
      const source = this.$.getChannelData(channelNumber|0).subarray(startInChannel|0);

      destination.set(source.subarray(0, Math.min(source.length, destination.length)));
    }
  }

  copyToChannel(source, channelNumber, startInChannel = 0) {
    if (this.$.copyToChannel) {
      this.$.copyToChannel(source, channelNumber, startInChannel);
    } else {
      source = source.subarray(0, Math.min(source.length, this.length - (startInChannel|0)));

      this.$.getChannelData(channelNumber|0).set(source, startInChannel|0);
    }
  }
}

module.exports = AudioBuffer;
