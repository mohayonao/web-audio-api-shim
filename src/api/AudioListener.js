"use strict";

const AudioParam = require("./AudioParam");

class AudioListener {
  constructor($) {
    this.$ = $;
    $._ = this;

    this._positionX = new AudioParam(this.$.positionX);
    this._positionY = new AudioParam(this.$.positionY);
    this._positionZ = new AudioParam(this.$.positionZ);
    this._forwardX = new AudioParam(this.$.forwardX);
    this._forwardY = new AudioParam(this.$.forwardY);
    this._forwardZ = new AudioParam(this.$.forwardZ);
    this._upX = new AudioParam(this.$.upX);
    this._upY = new AudioParam(this.$.upY);
    this._upZ = new AudioParam(this.$.upZ);
  }

  get positionX() {
    return this._positionX;
  }

  get positionY() {
    return this._positionY;
  }

  get positionZ() {
    return this._positionZ;
  }

  get forwardX() {
    return this._forwardX;
  }

  get forwardY() {
    return this._forwardY;
  }

  get forwardZ() {
    return this._forwardZ;
  }

  get upX() {
    return this._upX;
  }

  get upY() {
    return this._upY;
  }

  get upZ() {
    return this._upZ;
  }

  setPosition(x, y, z) {
    this.$.setPosition(x, y, z);
  }

  setOrientation(x, y, z, xUp, yUp, zUp) {
    this.$.setOrientation(x, y, z, xUp, yUp, zUp);
  }
}

module.exports = AudioListener;
