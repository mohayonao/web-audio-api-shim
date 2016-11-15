"use strict";

const AudioNode = require("./AudioNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class PannerNode extends AudioNode {
  constructor(context, opts = {}) {
    const positionX = defaults(opts.positionX, 0);
    const positionY = defaults(opts.positionY, 0);
    const positionZ = defaults(opts.positionZ, 0);
    const orientationX = defaults(opts.orientationX, 1);
    const orientationY = defaults(opts.orientationY, 0);
    const orientationZ = defaults(opts.orientationZ, 0);
    const panningModel = defaults(opts.panningModel, "equalpower");
    const distanceModel = defaults(opts.distanceModel, "inverse");
    const refDistance = defaults(opts.refDistance, 1);
    const maxDistance = defaults(opts.maxDistance, 10000);
    const rolloffFactor = defaults(opts.rolloffFactor, 1);
    const coneInnerAngle = defaults(opts.coneInnerAngle, 360);
    const coneOuterAngle = defaults(opts.coneOuterAngle, 360);
    const coneOuterGain = defaults(opts.coneOuterGain, 0);
    const $ = toNative(context).createPanner();

    super($, opts);

    this._positionX = new AudioParam(this.$.positionX);
    this._positionY = new AudioParam(this.$.positionY);
    this._positionZ = new AudioParam(this.$.positionZ);
    this._orientationX = new AudioParam(this.$.orientationX);
    this._orientationY = new AudioParam(this.$.orientationY);
    this._orientationZ = new AudioParam(this.$.orientationZ);
    this._positionX.value = positionX;
    this._positionY.value = positionY;
    this._positionZ.value = positionZ;
    this._orientationX.value = orientationX;
    this._orientationY.value = orientationY;
    this._orientationZ.value = orientationZ;
    this.$.panningModel = panningModel;
    this.$.distanceModel = distanceModel;
    this.$.refDistance = refDistance;
    this.$.maxDistance = maxDistance;
    this.$.rolloffFactor = rolloffFactor;
    this.$.coneInnerAngle = coneInnerAngle;
    this.$.coneOuterAngle = coneOuterAngle;
    this.$.coneOuterGain = coneOuterGain;
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

  get orientationX() {
    return this._orientationX;
  }

  get orientationY() {
    return this._orientationY;
  }

  get orientationZ() {
    return this._orientationZ;
  }

  get panningModel() {
    return this.$.panningModel;
  }

  set panningModel(value) {
    this.$.panningModel = value;
  }

  get distanceModel() {
    return this.$.distanceModel;
  }

  set distanceModel(value) {
    this.$.distanceModel = value;
  }

  get refDistance() {
    return this.$.refDistance;
  }

  set refDistance(value) {
    this.$.refDistance = value;
  }

  get maxDistance() {
    return this.$.maxDistance;
  }

  set maxDistance(value) {
    this.$.maxDistance = value;
  }

  get rolloffFactor() {
    return this.$.rolloffFactor;
  }

  set rolloffFactor(value) {
    this.$.rolloffFactor = value;
  }

  get coneInnerAngle() {
    return this.$.coneInnerAngle;
  }

  set coneInnerAngle(value) {
    this.$.coneInnerAngle = value;
  }

  get coneOuterAngle() {
    return this.$.coneOuterAngle;
  }

  set coneOuterAngle(value) {
    this.$.coneOuterAngle = value;
  }

  get coneOuterGain() {
    return this.$.coneOuterGain;
  }

  set coneOuterGain(value) {
    this.$.coneOuterGain = value;
  }

  setPosition(...args) {
    this.$.setPosition(...args);
  }

  setOrientation(...args) {
    this.$.setOrientation(...args);
  }
}

module.exports = PannerNode;
