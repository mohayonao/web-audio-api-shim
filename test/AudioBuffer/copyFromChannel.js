(function() {
  "use strict";

  require("../bootstrap");

  describe("AudioBuffer.prototype.copyFromChannel", function() {
    var context;
    if (!/\[native code\]/.test(global.AudioBuffer.prototype.copyFromChannel)) {
      context = "shim";
    } else {
      context = "native";
    }
    describe(context, function() {
      function writeNoise(destination) {
        for (var i = 0; i < destination.length; i++) {
          destination[i] = Math.random() - 0.5;
        }
      }
      describe("(destination: Float32Array, channelNumber: number, startInChannel: number): void", function() {
        it("works", function() {
          var channelData = [ new Float32Array(100), new Float32Array(100) ];
          var destination = [ new Float32Array( 50), new Float32Array( 50) ];

          writeNoise(channelData[0]);
          writeNoise(channelData[1]);

          var buffer = audioContext.createBuffer(2, 100, audioContext.sampleRate);
          buffer.getChannelData(0).set(channelData[0]);
          buffer.getChannelData(1).set(channelData[1]);

          buffer.copyFromChannel(destination[0], 0);
          buffer.copyFromChannel(destination[1], 1, 50);

          for (var i = 0; i < 50; i++) {
            assert(destination[0][i] === channelData[0][i +  0], "equal [0][" + i + "]");
            assert(destination[1][i] === channelData[1][i + 50], "equal [1][" + i + "]");
          }
        });
      });
    });
  });

})();
