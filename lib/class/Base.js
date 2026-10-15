"use strict";
class O {
  constructor(j) {
    var l = {
      EpIRV: "client",
    };
    var m = {
      get: () => j,
    };
    Object.defineProperty(this, l.EpIRV, m);
  }
  _clone() {
    return Object.assign(Object.create(this), this);
  }
  _patch(h) {
    return h;
  }
}
module.exports = O;
