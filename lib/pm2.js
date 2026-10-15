const pm2 = require("pm2");
const { loadBaileys } = require("./baileys");
let Z;
const config = require("../config");
const { exec } = require("child_process");
const a2 = async (j, k, l) => {
  const m = {
    klotp: "restart",
    CPNQW: "levanter",
    MCAIz: function (u, v, w) {
      return u(v, w);
    },
  };
  Z ||= (await loadBaileys()).delay;
  await Z(3000);
  const p = m.klotp === j ? process.env.RESTART_CMD : process.env.STOP_CMD;
  if (p) {
    config.logger.info("Executing custom " + j + " command: " + p);
    m.MCAIz(exec, p, (u, v, w) => {
      {
        if (u) {
          config.logger.error(u);
        }
        if (v) {
          config.logger.info(v);
        }
        if (w) {
          config.logger.error(w);
        }
        process.exit(m.klotp === j ? 1 : 0);
      }
    });
    return;
  }
  if (!process.env.pm_id) {
    config.logger.info("Not running under PM2. Executing standard process exit to " + j + ".");
    process.exit(m.klotp === j ? 1 : 0);
    return;
  }
  const q = "pm2 " + j + "ing instance " + (l || "");
  config.logger.info(q);
  pm2.connect((u) => {
    if (u) {
      config.logger.error(u);
      process.exit(2);
    }
    pm2[j](k || process.env.pm_id || m.CPNQW, (v) => {
      if (v) {
        config.logger.error(v);
      }
      pm2.disconnect();
    });
  });
};
exports.stopInstance = (i, j) => {
  const k = {
    ZDoFh: "stop",
  };
  a2(k.ZDoFh, i, j);
};
exports.restartInstance = (i, j) => {
  const k = {
    bkrpp: "restart",
  };
  a2(k.bkrpp, i, j);
};
