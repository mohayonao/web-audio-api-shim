(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AudioNode/disconnect");

  describe("AudioNode.prototype.disconnect", function() {
    var context = global.getShimType(global.AudioNode.prototype.disconnect);

    describe.skip(context, function() {
      describe("(): void", function() {
        it("should disconnect", function() {
        });
      });
    });
  });

})();
