"use strict";

const WebAudioAPIVersionDetector = require("./WebAudioAPIVersionDetector");
const WebAudioAPIV2Installer = require("./WebAudioAPIV2Installer");
const version = WebAudioAPIVersionDetector.detect();

if (version === "v1") {
  WebAudioAPIV2Installer.install(global);
}
