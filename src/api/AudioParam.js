"use strict";

const MIN_VALUE = -3.4028234663852886e+38;
const MAX_VALUE = +3.4028234663852886e+38;

class AudioParam {
  constructor($, minValue = MIN_VALUE, maxValue = MAX_VALUE) {
    this.$ = $;
    $._ = this;

    this._minValue = minValue;
    this._maxValue = maxValue;
  }

  get value() {
    return this.$.value;
  }

  set value(value) {
    this.$.value = value;
  }

  get defaultValue() {
    this.$.defaultValue;
  }

  get minValue() {
    return this._minValue;
  }

  get maxValue() {
    return this._maxValue;
  }

  setValueAtTime(value, startTime) {
    this.$.setValueAtTime(value, startTime);
    return this;
  }

  linearRampToValueAtTime(value, endTime) {
    this.$.linearRampToValueAtTime(value, endTime);
    return this;
  }

  exponentialRampToValueAtTime(value, endTime) {
    this.$.exponentialRampToValueAtTime(value, endTime);
    return this;
  }

  setTargetAtTime(target, startTime, timeConstant) {
    this.$.setTargetAtTime(target, startTime, timeConstant);
    return this;
  }

  setValueCurveAtTime(curve, statrtTime, duration) {
    this.$.setValueCurveAtTime(curve, statrtTime, duration);
    return this;
  }

  cancelScheduledValues(startTime) {
    this.$.cancelScheduledValues(startTime);
    return this;
  }

  cancelAndHoldAtTime(startTime) {
    this.$.cancelAndHoldAtTime(startTime);
    return this;
  }
}

module.exports = AudioParam;
