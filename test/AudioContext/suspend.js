(function() {
  "use strict";

  describe("AudioContext.prototype.suspend", function() {
    var context = global.getShimType(global.AudioContext.prototype.suspend);

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should resolve", function() {
        });
      });
    });
  });

  describe("OfflineAudioContext.prototype.suspend", function() {
    var context = global.getShimType(global.OfflineAudioContext.prototype.suspend);

    describe(context, function() {
      describe("(): Promise<void>", function() {
        it("should reject", function() {
          var audioContext = new global.OfflineAudioContext(1, 100, 44100);

          return audioContext.suspend().catch(function(e) {
            assert(e instanceof Error);
          });
        });
      });
    });
  });

})();
