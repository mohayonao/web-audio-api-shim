(function() {
  "use strict";

  require("../bootstrap");

  describe("AudioContext.prototype.close", function() {
    var context;
    if (!/\[native code\]/.test(global.AudioContext.prototype.close)) {
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
