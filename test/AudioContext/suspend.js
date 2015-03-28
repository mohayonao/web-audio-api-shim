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

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should reject", function() {
        });
      });
    });
  });

})();
