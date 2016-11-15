"use strict";

require("run-with-mocha");

const assert = require("assert");
const index = require("../src");

describe("index", () => {
  it("exports", () => {
    assert(!!index);
  });
});
