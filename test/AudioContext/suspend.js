(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AudioContext/suspend");

  describe("AudioContext.prototype.suspend", function() {
    var context = global.getShimType(global.AudioContext.prototype.suspend);

    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should return a Promise", function() {
        });
      });
    });
  });

})();
