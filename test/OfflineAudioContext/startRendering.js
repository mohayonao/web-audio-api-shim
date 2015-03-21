(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/OfflineAudioContext/startRendering");

  describe("OfflineAudioContext.prototype.startRendering", function() {
    var context;
    if (!!global.OfflineAudioContext.prototype.startRendering.original) {
      context = "shim";
    } else {
      context = "native";
    }
    describe(context, function() {
      describe("(): Promise<AudioBuffer>", function() {
        it("should resolve with an AudioBuffer", function() {
          var context = new global.OfflineAudioContext(1, 100, 44100);
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
