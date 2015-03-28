(function() {
  "use strict";

  describe("AudioContext.prototype.close", function() {
    var context = global.getShimType(global.AudioContext.prototype.close);

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should resolve", function() {
        });
      });
    });
  });

  describe("OfflineAudioContext.prototype.close", function() {
    var context = global.getShimType(global.OfflineAudioContext.prototype.close);

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should reject", function() {
        });
      });
    });
  });

})();
