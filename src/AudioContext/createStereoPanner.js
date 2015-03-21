"use strict";

import StereoPannerNode from "stereo-panner-node";

if (!global.AudioContext.prototype.createStereoPanner) {
  //// ### AudioContext.prototype.createStereoPanner
  //// Creates a StereoPannerNode.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `AudioNode as StereoPannerNode`
  global.AudioContext.prototype.createStereoPanner = function() {
    return new StereoPannerNode(this);
  };
}
