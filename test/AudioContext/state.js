(function() {
  "use strict";

  require("../bootstrap");

  describe("AudioContext get state", function() {
    var context;

    // TODO:
    var audioContext = new global.OfflineAudioContext(1, 1, 44100);
    context = !!audioContext.state ? "native" : "shim";

    // if (!/\[native code\]/.test(global.AudioContext.prototype.state)) {
    //   context = "shim";
    // } else {
    //   context = "native";
    // }
    describe.skip(context, function() {
      describe("get: string", function() {
        it("should return a state", function() {
        });
      });
    });
  });

})();
