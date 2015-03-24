(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AnalyserNode/getFloatTimeDomainData");

  describe("AnalyserNode.prototype.getFloatTimeDomainData", function() {
    var context = global.getShimType(global.AnalyserNode.prototype.getFloatTimeDomainData);

    describe(context, function() {
      describe("(array: Float32Array): void", function() {
        it.unless_on_iOS("works", function(done) {
          var buffer = audioContext.createBuffer(1, 4, audioContext.sampleRate);
          var bufSrc = audioContext.createBufferSource();
          var analyser = audioContext.createAnalyser();
          var gain = audioContext.createGain();

          buffer.getChannelData(0).set([ -1, -1/3, +1/3, +1 ]);

          bufSrc.buffer = buffer;
          bufSrc.loop = true;
          bufSrc.start(audioContext.currentTime);

          analyser.fftSize = 32;
          gain.gain.value = 0;

          bufSrc.connect(analyser);
          analyser.connect(gain);
          gain.connect(audioContext.destination);

          setTimeout(function() {
            var array = new Float32Array(32);

            analyser.getFloatTimeDomainData(array);

            assert(array[0] !== array[1]);
            assert(array[1] !== array[2]);
            assert(array[2] !== array[3]);
            assert(array[0] === array[4]);

            setTimeout(function() {
              bufSrc.stop(audioContext.currentTime);
              bufSrc.disconnect();
              analyser.disconnect();
              gain.disconnect();
              done();
            }, 0);
          }, 50);
        });
      });
    });
  });

})();
