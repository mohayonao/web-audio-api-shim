(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AudioContext/resume");

  describe("AudioContext.prototype.resume", function() {
    var context = global.getShimType(global.AudioContext.prototype.resume);

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should return a Promise", function() {
        });
      });
    });
  });

})();
