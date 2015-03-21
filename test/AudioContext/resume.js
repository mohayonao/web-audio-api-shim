(function() {
  "use strict";

  require("../bootstrap");

  describe("AudioContext.prototype.resume", function() {
    var context;
    if (!/\[native code\]/.test(global.AudioContext.prototype.resume)) {
      context = "shim";
    } else {
      context = "native";
    }
    describe.skip(context, function() {
      describe("(): Promise<void>", function() {
        it("should return a Promise", function() {
        });
      });
    });
  });

})();
