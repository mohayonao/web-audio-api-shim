(function() {
  "use strict";

  describe("AudioContext.prototype.decodeAudioData", function() {
    var context = global.getShimType(global.AudioContext.prototype.decodeAudioData);

    describe(context, function() {
      function validAudioData() {
        return new Uint32Array([
          1179011410,52,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,16,0,0,0,0
        ]).buffer;
      }
      function invalidAudioData() {
        return new Uint32Array(64).buffer;
      }
      describe("(validAudioData: ArrayBuffer): Promise<AudioBuffer>", function() {
        it("should resolve with an AudioBuffer", function() {
          var promise = audioContext.decodeAudioData(validAudioData());

          assert(promise instanceof Promise, "should return a Promise");

          return promise.then(function(audioBuffer) {
            assert(audioBuffer instanceof global.AudioBuffer, "should reject with an AudioBuffer");
          });
        });
      });
      describe("(invalidAudioData: ArrayBuffer): Promise<AudioBuffer", function() {
        it("should reject", function() {
          var promise = audioContext.decodeAudioData(invalidAudioData());

          assert(promise instanceof Promise, "should return a Promise");

          return promise.then(function() {
            assert(false, "NOT REACHED");
          }, function() {
            assert(true, "should reject");
          });
        });
      });
      describe("(validAudioData: ArrayBuffer, successCallback: function): Promise<AudioBuffer>", function() {
        it("should call the successCallback with an AudioBuffer", function(done) {
          var promise = audioContext.decodeAudioData(validAudioData(), function(audioBuffer) {
            assert(audioBuffer instanceof global.AudioBuffer, "should reject with an AudioBuffer");
            done();
          });

          assert(promise instanceof Promise, "should return a Promise");
        });
      });
      describe("(invalidAudioData: ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
        it("should call the errorCallback", function(done) {
          var promise = audioContext.decodeAudioData(invalidAudioData(), function() {
            assert(false, "NOT REACHED");
          }, function() {
            assert(true, "should call the errorCallback");
            done();
          });

          assert(promise instanceof Promise, "should return a Promise");
        });
      });
    });
  });

})();
