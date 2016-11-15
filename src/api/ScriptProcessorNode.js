"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class ScriptProcessorNode extends AudioNode {
  constructor(context, opts = {}) {
    const bufferSize = defaults(opts.bufferSize, 0);
    const numberOfInputChannels = defaults(opts.numberOfInputChannels , 2);
    const numberOfOutputChannels = defaults(opts.numberOfOutputChannels, 2);
    const $ = toNative(context).createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);

    super($, opts);
  }

  get bufferSize() {
    return this.$.bufferSize;
  }

  get onaudioprocess() {
    return this.$.onaudioprocess;
  }

  set onaudioprocess(value) {
    this.$.onaudioprocess = value;
  }
}

module.exports = ScriptProcessorNode;
