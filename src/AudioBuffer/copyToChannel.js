"use strict";

let AudioBuffer = global.AudioBuffer;

if (AudioBuffer && !AudioBuffer.prototype.hasOwnProperty("copyToChannel")) {
  //// ### AudioBuffer.prototype.copyToChannel
  //// The `copyToChannel` method copies the samples to the specified channel of the **`AudioBuffer`**, from the `source` array.
  ////
  //// #### Parameters
  //// - `source: Float32Array`
  ////   - The array the channel data will be copied from.
  //// - `channelNumber: number`
  ////   - The index of the channel to copy the data to.
  //// - `startInChannel: number = 0`
  ////   - An optional offset to copy the data to.
  ////
  //// #### Return
  //// - `void`
  AudioBuffer.prototype.copyToChannel = function(source, channelNumber, startInChannel) {
    this.getChannelData(channelNumber|0).set(source, startInChannel|0);
  };
}