"use strict";

if (!global.AudioBuffer.prototype.copyFromChannel) {
  //// ### AudioBuffer.prototype.copyFromChannel
  //// The `copyFromChannel` method copies the samples from the specified channel of the **`AudioBuffer`** to the `destination` array.
  ////
  //// #### Parameters
  //// - `destination: Float32Array`
  ////   - The array the channel data will be copied to.
  //// - `channelNumber: number`
  ////   - The index of the channel to copy the data from.
  //// - `startInChannel: number = 0`
  ////   - An optional offset to copy the data from.
  ////
  //// #### Return
  //// - `void`
  global.AudioBuffer.prototype.copyFromChannel = function(destination, channelNumber, startInChannel) {
    let source = this.getChannelData(channelNumber|0).subarray(startInChannel|0);
    destination.set(source.subarray(0, Math.min(source.length, destination.length)));
  };
}
