"use strict";

function toNative(value) {
  return (value && value.$) || value;
}

module.exports = toNative;
