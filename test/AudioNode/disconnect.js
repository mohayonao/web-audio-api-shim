(function() {
  "use strict";

  require("../bootstrap");

  describe("AudioNode.prototype.disconnect", function() {
    var context;

    // TODO:
    try {
      var audioContext = new global.OfflineAudioContext(1, 1, 44100);
      audioContext.createGain().disconnect(audioContext.destination);
      context = "shim";
    } catch (e) {
      context = "native";
    }
    // if (!/\[native code\]/.test(global.AudioNode.prototype.disconnect)) {
    //   context = "shim";
    // } else {
    //   context = "native";
    // }
    describe.skip(context, function() {
      describe("(): void", function() {
        it("should disconnect", function() {
        });
      });
    });
  });

})();
