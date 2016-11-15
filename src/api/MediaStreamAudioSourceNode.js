"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class MediaStreamAudioSourceNode extends AudioNode {
  constructor(context, opts = {}) {
    const mediaStream = defaults(opts.mediaStream, null);
    const $ = toNative(context).createMediaStreamSource(mediaStream);

    super($, opts);
  }
}

module.exports = MediaStreamAudioSourceNode;
