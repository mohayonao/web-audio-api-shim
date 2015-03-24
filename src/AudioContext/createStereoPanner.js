"use strict";

import StereoPannerNode from "stereo-panner-node";

let AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("createStereoPanner")) {
  //// ### AudioContext.prototype.createStereoPanner
  //// Creates a StereoPannerNode.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `AudioNode as StereoPannerNode`
  AudioContext.prototype.createStereoPanner = function() {
    return new StereoPannerNode(this);
  };
}
