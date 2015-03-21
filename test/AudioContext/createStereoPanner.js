(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AudioContext/createStereoPanner");

  describe("AudioContext.prototype.createStereoPanner", function() {
    var context;
    if (!/\[native code\]/.test(global.AudioContext.prototype.createStereoPanner)) {
      context = "shim";
    } else {
      context = "native";
    }
    describe(context, function() {
      describe("(): AudioNode", function() {
        it("should return an AudioNode as StereoPannerNode", function() {
          var node = audioContext.createStereoPanner();

          assert(node instanceof global.AudioNode);
          assert(node.pan instanceof global.AudioParam);
        });
      });
    });
  });

})();
