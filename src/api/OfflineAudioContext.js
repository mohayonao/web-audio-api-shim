"use strict";

const NativeOfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;
const BaseAudioContext = require("./BaseAudioContext");

class OfflineAudioContext extends BaseAudioContext {
  constructor(numberOfChannels, length, sampleRate) {
    super(new NativeOfflineAudioContext(numberOfChannels, length, sampleRate));
  }

  get length() {
    return this.$.length;
  }

  get oncomplete() {
    return this.$.oncomplete;
  }

  set oncomplete(value) {
    this.$.oncomplete = value;
  }

  resume() {
    return this.$.resume();
  }

  suspend(suspendTime) {
    return this.$.suspend(suspendTime);
  }

  startRendering() {
    return new Promise((resolve) => {
      const oncomplete = this.$.oncomplete;

      this.$.oncomplete = (e) => {
        if (typeof oncomplete === "function") {
          oncomplete(e);
          this.$.oncomplete = oncomplete;
        }
        resolve(e);
      };

      this.$.startRendering();
    });
  }
}

module.exports = OfflineAudioContext;
