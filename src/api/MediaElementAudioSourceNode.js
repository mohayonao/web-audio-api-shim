"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class MediaElementAudioSourceNode extends AudioNode {
  constructor(context, opts = {}) {
    const mediaElement = defaults(opts.mediaStream, null);
    const $ = toNative(context).createMediaElementSource(mediaElement);

    super($, opts);
  }
}

module.exports = MediaElementAudioSourceNode;
