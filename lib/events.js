const test = require("./test/test");
const config = require("./config");
const ao = (j) =>
  j
    .toString()
    .match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/)[2]
    .trim();
const ap = (j) => {
  const k = {
    aWNMt: function (s, u) {
      return s + u;
    },
    IuXUy: "null",
    HAiVd: "^[.]",
    ssSzg: "[.]",
    kxstB: "(test| test)",
  };
  const l = config[j].env.PREFIX;
  const m = k.IuXUy == l ? "" : l;
  let o =
    m.startsWith("^") || "" == m
      ? /\p{Emoji_Presentation}/gu.test(m)
        ? k.HAiVd
        : m
      : m.replace("[", "").replace("]", "").replace(/\./g, k.ssSzg);
  try {
    new RegExp(k.aWNMt(o.startsWith("^") ? o : "^" + o, k.kxstB), "is");
  } catch (s) {
    {
      o = "^[" + o + "]";
    }
  }
  let q = "";
  try {
    {
      q = (
        k.IuXUy == o
          ? ""
          : o.startsWith("^")
            ? o.match(/\[(\W*)\]/)[1][0]
            : o.replace(/\[/g, "").replace(/\]/g, "")
      ).trim();
    }
  } catch (w) {
    {
      q = o;
    }
  }
  config[j].PREFIX = q;
  config[j].handler = o.startsWith("^") ? o : "^" + o;
};
function addCommand(j, k) {
  const l = {
    fmUKk: "misc",
    SQdjp: "undefined",
    JiGMa: "unknown error",
    UvOUL: "photo",
    ssFLa: "image",
    ccYLq: "text",
    GQYis: "sticker",
    wfcLL: "message",
    vHVCb: "event",
    UwuVq: function (u, v) {
      return u + v;
    },
    ioJII: function (u, v) {
      return u + v;
    },
    bDAuk: function (u, v) {
      return u in v;
    },
    ezezz: "handler",
  };
  const m = [l.UvOUL, l.ssFLa, l.ccYLq, l.GQYis, l.wfcLL, l.vHVCb];
  const o =
    j.on && !j.pattern
      ? l.UwuVq(l.ioJII(j.on, j.event_action || ""), j.type || "")
      : j.f
        ? l.ioJII(j.pattern.match(/(\W*)([A-Za-z0-9ğüşiö ç]*)/g)[0].trim(), j.type || "")
        : j.pattern.match(/(\W*)([A-Za-z0-9ğüşiö ç]*)/g)[0].trim();
  const q = (u, v) => {
    {
      const x = {
        fromMe: u.fromMe ?? true,
        onlyGroup: u.onlyGroup ?? false,
        desc: u.desc ?? "",
        dontAddCommandList: u.dontAddCommandList ?? false,
        type: u.type ? u.type : u.pattern ? l.fmUKk : l.SQdjp,
        active: true,
        function: k,
        name: u.pattern ? ao(u.pattern) : u.type,
        xpattern: u.pattern,
        pattern: null,
        event_action: u.event_action ?? "",
      };
      if (m.includes(u.on) && !u.pattern) {
        x.on = u.on;
      } else {
        if (!u.pattern) {
          throw new Error(l.JiGMa);
        }
        x.pattern = new RegExp(config[v].handler + "(" + u.pattern + "| " + u.pattern + ")", "is");
      }
      return x;
    }
  };
  if (false === config.pt) {
    for (const u of config.sessions) {
      {
        if (!(l.ezezz in config[u])) {
          ap(u);
        }
        const v = q(j, u);
        if (v.pattern) {
          config[u].pammands[o] = {
            ...v,
            pattern: new RegExp("^[+](" + j.pattern + "| " + j.pattern + ")", "is"),
          };
        }
        if (v.pattern) {
          config[u].commands.push(v);
        }
        config[u].cammands[o] = v;
      }
    }
  } else if (config.plc) {
    {
      if (!l.bDAuk(l.ezezz, config[config.plc])) {
        ap(config.plc);
      }
      const y = q(j, config.plc);
      if (y.pattern) {
        config[config.plc].pammands[o] = {
          ...y,
          pattern: new RegExp("^[+](" + j.pattern + "| " + j.pattern + ")", "is"),
        };
      }
      if (y.pattern) {
        config[config.plc].commands.push(y);
      }
      config[config.plc].cammands[o] = y;
    }
  }
}
config.patchPrefix = (j) => {
  ap(j);
  for (const l in config[j].cammands) {
    config[j].cammands[l].pattern &&= new RegExp(
      config[j].handler +
        "(" +
        config[j].cammands[l].xpattern +
        "| " +
        config[j].cammands[l].xpattern +
        ")",
      "is",
    );
  }
};
exports.addCommand = addCommand;
