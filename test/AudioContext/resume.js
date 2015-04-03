(function() {
  "use strict";

  describe("AudioContext.prototype.resume", function() {
    var context = global.getShimType(global.AudioContext.prototype.resume);

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should resolve", function() {
        });
      });
    });
  });

  describe("OfflineAudioContext.prototype.resume", function() {
    var context = global.getShimType(global.OfflineAudioContext.prototype.resume);

    describe(context, function() {
      describe("(): Promise<void>", function() {
        it("should reject", function() {
          var audioContext = new global.OfflineAudioContext(1, 100, 44100);

          return audioContext.resume().catch(function(e) {
            assert(e instanceof Error);
          });
        });
      });
    });
  });

})();
