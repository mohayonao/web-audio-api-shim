"use strict";

const AudioNode = require("./AudioNode");

class AudioScheduledSourceNode extends AudioNode {
  get onended() {
    return this.$.onended;
  }

  set onended(value) {
    this.$.onended = value;
  }

  start(when = 0) {
    this.$.start(when);
  }

  stop(when = 0) {
    this.$.stop(when);
  }
}

module.exports = AudioScheduledSourceNode;
