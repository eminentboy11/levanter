const BASE = 36;
function parseBase36(str) {
  let count = 0;
  for (let i = 1, place = BASE; i < str.length; count += place, i++, place *= BASE) {}
  for (let j = str.length - 1, digitPlace = 1; j >= 0; j--, digitPlace *= BASE) {
    let digit = str.charCodeAt(j) - 48;
    if (digit > 10) {
      digit -= 7;
    }
    count += digit * digitPlace;
  }
  return count;
}
function toBase36(value) {
  let text = "";
  let digits = 1;
  for (let place = BASE; value >= place; value -= place, digits++, place *= BASE) {}
  while (digits--) {
    let digit = value % BASE;
    text = String.fromCharCode((digit < 10 ? 48 : 55) + digit) + text;
    value = (value - digit) / BASE;
  }
  return text;
}
const NODE_SEPARATOR = ";";
const SYMBOL_SEPARATOR = ",";
const PREFIX_MARKER = "!";
const LOWER_A = "a";
const LOWER_Z = "z";
const Z_RUN = new Array(10).join(LOWER_Z);
const SYMBOL_RE = new RegExp(
  "([" + LOWER_A + "-" + LOWER_Z + "]+)(" + SYMBOL_SEPARATOR + "|[0-9A-Z]+|$)",
  "g",
);
const SYMBOL_PAIR_RE = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");
class Wcg {
  nodes;
  syms = [];
  symCount;
  constructor(serialized) {
    const helpers = {
      AakgX: "2|0|1|3|4",
      BSEvz: function (left, right) {
        return left !== right;
      },
      tIFBF: function (value, right) {
        return value + right;
      },
      dtDGx: " when expecting ",
    };
    const split = helpers.AakgX.split("|");
    let stepIndex = 0;
    while (true) {
      switch (split[stepIndex++]) {
        case "0":
          this.syms = [];
          continue;
        case "1":
          this.symCount = 0;
          continue;
        case "2":
          this.nodes = serialized.split(NODE_SEPARATOR);
          continue;
        case "3":
          while (true) {
            let exec = SYMBOL_PAIR_RE.exec(this.nodes[this.symCount]);
            if (!exec) {
              break;
            }
            if (helpers.BSEvz(parseBase36(exec[1]), this.symCount)) {
              throw new Error(
                helpers.tIFBF(
                  "Invalid Symbol name - found " + exec[1] + helpers.dtDGx,
                  toBase36(this.symCount),
                ),
              );
            }
            this.syms[this.symCount] = parseBase36(exec[2]);
            this.symCount++;
          }
          continue;
        case "4":
          this.nodes.splice(0, this.symCount);
          continue;
      }
      break;
    }
  }
  isWord(value) {
    const comparisonHelpers = {
      Bkhcf: function (left, right) {
        return left === right;
      },
    };
    const helpers = comparisonHelpers;
    if (value === "") {
      return false;
    }
    return helpers.Bkhcf(this.match(value), value);
  }
  match(value) {
    let matches = this.matches(value);
    if (matches.length === 0) {
      return "";
    }
    return matches[matches.length - 1];
  }
  matches(value) {
    return this.words(value, value + LOWER_A);
  }
  completions(prefix, limit) {
    return this.words(prefix, nextString(prefix), limit);
  }
  words(value, beyond, limit) {
    let items = [];
    function collect(value, state) {
      if (limit !== undefined && items.length >= limit) {
        state.abort = true;
        return;
      }
      items.push(value);
    }
    this.enumerate(0, "", {
      from: value,
      beyond,
      fn: collect,
      prefixes: value + LOWER_A === beyond,
    });
    return items;
  }
  enumerate(index, value, state) {
    const comparisonHelpers = {
      JvoTv: function (left, right) {
        return left === right;
      },
      loYBq: function (left, right) {
        return left < right;
      },
    };
    let symbols = this.nodes[index];
    function emitCandidate(word) {
      if (state.prefixes) {
        if (comparisonHelpers.JvoTv(word, state.from.slice(0, word.length))) {
          state.fn(word, state);
        }
        return;
      }
      if (state.from <= word && word < state.beyond) {
        state.fn(word, state);
      }
    }
    if (symbols[0] === PREFIX_MARKER) {
      emitCandidate(value);
      if (state.abort) {
        return;
      }
      symbols = symbols.slice(1);
    }
    symbols.replace(SYMBOL_RE, (wholeMatch, letters, suffix) => {
      let candidate = value + letters;
      if (
        state.abort ||
        candidate >= state.beyond ||
        comparisonHelpers.loYBq(candidate, state.from.slice(0, candidate.length))
      ) {
        return "";
      }
      let isTerminal = suffix === SYMBOL_SEPARATOR || suffix === "";
      if (isTerminal) {
        emitCandidate(candidate);
        return "";
      }
      this.enumerate(this.inodeFromRef(suffix, index), candidate, state);
      return "";
    });
  }
  inodeFromRef(ref, value) {
    const comparisonHelpers = {
      dAYti: function (left, right) {
        return left < right;
      },
    };
    const helpers = comparisonHelpers;
    let inode = parseBase36(ref);
    if (helpers.dAYti(inode, this.symCount)) {
      return this.syms[inode];
    }
    inode -= this.symCount;
    return value + inode + 1;
  }
}
function nextString(str) {
  const arithmeticHelpers = {
    woDUc: function (left, right) {
      return left - right;
    },
    ucPvh: function (value, right) {
      return value + right;
    },
  };
  const helpers = arithmeticHelpers;
  if (str.length === 0) {
    return Z_RUN;
  }
  let lastCharCode = str.charCodeAt(str.length - 1);
  return helpers.ucPvh(str.slice(0, -1), String.fromCharCode(lastCharCode + 1));
}
module.exports = Wcg;
