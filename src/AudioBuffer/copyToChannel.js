"use strict";

if (!global.AudioBuffer.prototype.copyToChannel) {
  //// ### AudioBuffer.prototype.copyToChannel
  //// The `copyToChannel` method copies the samples to the specified channel of the **`AudioBuffer`**, from the `source` array.
  ////
  //// #### Parameters
  //// - `source: Float32Array` - The array the channel data will be copied from.
  //// - `channelNumber: number` - The index of the channel to copy the data to.
  //// - `startInChannel: number = 0` _(optional)_ - An optional offset to copy the data to.
  ////
  //// #### Return
  //// - `void`
  global.AudioBuffer.prototype.copyToChannel = function(source, channelNumber, startInChannel) {
    this.getChannelData(channelNumber).set(source, startInChannel|0);
  };
}
