"use strict";

function toShim(value) {
  return (value && value._) || value;
}

module.exports = toShim;
