(function() {
  "use strict";

  describe("OfflineAudioContext.prototype.startRendering", function() {
    var context = global.getShimType(global.OfflineAudioContext.prototype.startRendering);

    describe(context, function() {
      describe("(): Promise<AudioBuffer>", function() {
        it("should resolve with an AudioBuffer", function() {
          var context = new global.OfflineAudioContext(1, 1, 44100);
          var promise = context.startRendering();

          assert(promise instanceof Promise, "should return a Promise");

          return promise.then(function(audioBuffer) {
            assert(audioBuffer instanceof global.AudioBuffer, "should reject with an AudioBuffer");
          });
        });
      });
    });
  });

})();
