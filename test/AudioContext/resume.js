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

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should reject", function() {
        });
      });
    });
  });

})();
