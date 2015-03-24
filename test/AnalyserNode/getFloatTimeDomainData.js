(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AnalyserNode/getFloatTimeDomainData");

  describe("AnalyserNode.prototype.getFloatTimeDomainData", function() {
    var context = global.getShimType(global.AnalyserNode.prototype.getFloatTimeDomainData);

    describe(context, function() {
      describe("(array: Float32Array): void", function() {
        var buffer, bufSrc, analyser, mute;

        before(function() {
          buffer = audioContext.createBuffer(1, 4, audioContext.sampleRate);
          bufSrc = audioContext.createBufferSource();
          analyser = audioContext.createAnalyser();
          mute = audioContext.createGain();

          buffer.getChannelData(0).set([ -1, -1/3, +1/3, +1 ]);

          bufSrc.buffer = buffer;
          bufSrc.loop = true;
          bufSrc.start(audioContext.currentTime);

          analyser.fftSize = 32;
          mute.gain.value = 0;

          bufSrc.connect(analyser);
          analyser.connect(mute);
          mute.connect(audioContext.destination);
        });
        after(function() {
          bufSrc.stop(audioContext.currentTime);
          bufSrc.disconnect();
          analyser.disconnect();
          mute.disconnect();
        });
        it("should copy the current time-domain (waveform) data into the passed floating-point array", function(done) {
          var array = new Float32Array(32);

          function test() {
            analyser.getFloatTimeDomainData(array);

            if (array[0] === 0) {
              return setTimeout(test, 20);
            }

            assert(array[0] !== array[1]);
            assert(array[1] !== array[2]);
            assert(array[2] !== array[3]);
            assert(array[0] === array[4]);

            setTimeout(done, 0);
          }

          test();
        });
      });
    });
  });

})();
