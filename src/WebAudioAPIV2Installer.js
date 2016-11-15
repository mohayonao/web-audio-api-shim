"use strict";

const AudioContext = require("./api/AudioContext");
const OfflineAudioContext = require("./api/OfflineAudioContext");
const AnalyserNode = require("./api/AnalyserNode");
const AudioBuffer = require("./api/AudioBuffer");
const AudioBufferSourceNode = require("./api/AudioBufferSourceNode");
const AudioDestinationNode = require("./api/AudioDestinationNode");
const AudioListener = require("./api/AudioListener");
const BiquadFilterNode = require("./api/BiquadFilterNode");
const ChannelMergerNode = require("./api/ChannelMergerNode");
const ChannelSplitterNode = require("./api/ChannelSplitterNode");
const ConstantSourceNode = require("./api/ConstantSourceNode");
const ConvolverNode = require("./api/ConvolverNode");
const DelayNode = require("./api/DelayNode");
const DynamicsCompressorNode = require("./api/DynamicsCompressorNode");
const GainNode = require("./api/GainNode");
const IIRFilterNode = require("./api/IIRFilterNode");
const MediaElementAudioSourceNode = require("./api/MediaElementAudioSourceNode");
const MediaStreamAudioSourceNode = require("./api/MediaStreamAudioSourceNode");
const MediaStreamAudioDestinationNode = require("./api/MediaStreamAudioDestinationNode");
const OscillatorNode = require("./api/OscillatorNode");
const PannerNode = require("./api/PannerNode");
const PeriodicWave = require("./api/PeriodicWave");
const ScriptProcessorNode = require("./api/ScriptProcessorNode");
const StereoPannerNode = require("./api/StereoPannerNode");
const WaveShaperNode = require("./api/WaveShaperNode");

function install(target) {
  target.AudioContext = AudioContext;
  target.OfflineAudioContext = OfflineAudioContext;
  target.AnalyserNode = AnalyserNode;
  target.AudioBuffer = AudioBuffer;
  target.AudioBufferSourceNode = AudioBufferSourceNode;
  target.AudioDestinationNode = AudioDestinationNode;
  target.AudioListener = AudioListener;
  target.BiquadFilterNode = BiquadFilterNode;
  target.ChannelMergerNode = ChannelMergerNode;
  target.ChannelSplitterNode = ChannelSplitterNode;
  target.ConstantSourceNode = ConstantSourceNode;
  target.ConvolverNode = ConvolverNode;
  target.DelayNode = DelayNode;
  target.DynamicsCompressorNode = DynamicsCompressorNode;
  target.GainNode = GainNode;
  target.IIRFilterNode = IIRFilterNode;
  target.MediaElementAudioSourceNode = MediaElementAudioSourceNode;
  target.MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;
  target.MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNode;
  target.OscillatorNode = OscillatorNode;
  target.PannerNode = PannerNode;
  target.PeriodicWave = PeriodicWave;
  target.ScriptProcessorNode = ScriptProcessorNode;
  target.StereoPannerNode = StereoPannerNode;
  target.WaveShaperNode = WaveShaperNode;
}

module.exports = { install };
