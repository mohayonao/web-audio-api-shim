(function() {
  "use strict";

  describe("AudioContext.prototype.createAudioWorker", function() {
    var context = global.getShimType(global.AudioContext.prototype.createAudioWorker);

    describe(context, function() {
      describe("(scriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function() {
        it("should return an AudioNode as AudioWorkerNode", function(done) {
          var node = audioContext.createAudioWorker("../examples/bitcrusher_worker.js", 1, 1);

          assert(node instanceof global.AudioNode);

          setTimeout(done, 0);
        });
      });
    });
  });

})();
