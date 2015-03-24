(function() {
  "use strict";

  require("../bootstrap");
  require("../../src/AudioContext/createStereoPanner");

  describe("AudioContext.prototype.createStereoPanner", function() {
    var context = global.getShimType(global.AudioContext.prototype.createStereoPanner);

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
