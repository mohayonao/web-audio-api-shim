"use strict";

const AudioNode = require("./AudioNode");

class AudioDestinationNode extends AudioNode {
  constructor($) {
    super($);
  }

  get maxChannelCount() {
    return this.$.maxChannelCount;
  }
}

module.exports = AudioDestinationNode;
