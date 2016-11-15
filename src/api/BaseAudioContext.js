"use strict";

const AnalyserNode = require("./AnalyserNode");
const AudioBuffer = require("./AudioBuffer");
const AudioBufferSourceNode = require("./AudioBufferSourceNode");
const AudioDestinationNode = require("./AudioDestinationNode");
const AudioListener = require("./AudioListener");
const BiquadFilterNode = require("./BiquadFilterNode");
const ChannelMergerNode = require("./ChannelMergerNode");
const ChannelSplitterNode = require("./ChannelSplitterNode");
const ConstantSourceNode = require("./ConstantSourceNode");
const ConvolverNode = require("./ConvolverNode");
const DelayNode = require("./DelayNode");
const DynamicsCompressorNode = require("./DynamicsCompressorNode");
const GainNode = require("./GainNode");
const IIRFilterNode = require("./IIRFilterNode");
const OscillatorNode = require("./OscillatorNode");
const PannerNode = require("./PannerNode");
const PeriodicWave = require("./PeriodicWave");
const ScriptProcessorNode = require("./ScriptProcessorNode");
const StereoPannerNode = require("./StereoPannerNode");
const WaveShaperNode = require("./WaveShaperNode");

class BaseAudioContext {
  constructor($) {
    this.$ = $;
    $._ = this;

    this._destination = new AudioDestinationNode(this.$.destination);
    this._listener = new AudioListener(this.$.listener);
  }

  get destination() {
    return this._destination;
  }

  get sampleRate() {
    return this.$.sampleRate;
  }

  get currentTime() {
    return this.$.currentTime;
  }

  get listener() {
    return this._listener;
  }

  get state() {
    return this.$.state;
  }

  suspend() {
    return this.$.suspend();
  }

  resume() {
    return this.$.resume();
  }

  close() {
    return this.$.close();
  }

  get onstatechange() {
    return this.$.onstatechange;
  }

  set onstatechange(value) {
    this.$.onstatechange = value;
  }

  createBuffer(numberOfChannels, length, sampleRate) {
    return new AudioBuffer(this, { numberOfChannels, length, sampleRate });
  }

  decodeAudioData(audioData, successCallback, errorCallback) {
    const promise = new Promise((resolve, reject) => {
      this.$.decodeAudioData(audioData, resolve, reject);
    });
    promise.then(successCallback, errorCallback);
    return promise;
  }

  createBufferSource() {
    return new AudioBufferSourceNode(this);
  }

  createConstantSource() {
    return new ConstantSourceNode(this);
  }

  createScriptProcessor(bufferSize = 0, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
    return new ScriptProcessorNode(this, { bufferSize, numberOfInputChannels, numberOfOutputChannels });
  }

  createAnalyser() {
    return new AnalyserNode(this);
  }

  createGain() {
    return new GainNode(this);
  }

  createDelay(maxDelayTime = 1) {
    return new DelayNode(this, { maxDelayTime });
  }

  createBiquadFilter() {
    return new BiquadFilterNode(this);
  }

  createIIRFilter(feedforward, feedback) {
    return new IIRFilterNode(this, { feedforward, feedback });
  }

  createWaveShaper() {
    return new WaveShaperNode(this);
  }

  createPanner() {
    return new PannerNode(this);
  }

  createStereoPanner() {
    return new StereoPannerNode(this);
  }

  createConvolver() {
    return new ConvolverNode(this);
  }

  createChannelSplitter(numberOfOutputs = 6) {
    return new ChannelSplitterNode(this, { numberOfOutputs });
  }

  createChannelMerger(numberOfInputs = 6) {
    return new ChannelMergerNode(this, { numberOfInputs });
  }

  createDynamicsCompressor() {
    return new DynamicsCompressorNode(this);
  }

  createOscillator() {
    return new OscillatorNode(this);
  }

  createPeriodicWave(real, imag, constants) {
    return new PeriodicWave(this, { real, imag, disableNormalization: !constants });
  }

  addEventListener(type, callback) {
    this.$.addEventListener(type, callback);
  }

  removeEventListener(type, callback) {
    this.$.removeEventListener(type, callback);
  }
}

module.exports = BaseAudioContext;
