const config = require("../config");
const { default: axios } = require("axios");
const fs = require("fs-extra");
const path = require("path");
const dotenv = require("dotenv");
const herokuClient = require("heroku-client");
const libConfig = require("./config");
const lang = require("./lang");
const herokuApi = new herokuClient({
  token: config.HEROKU_API_KEY,
});
const SECRET_VARS = [
  "VPS",
  "DATABASE",
  "DATABASE_URL",
  "LOG_MSG",
  "BAILEYS_LOG_LVL",
  "VPS",
  "KOYEB",
  "KOYEB_NAME",
  "KOYEB_API",
  "RENDER_NAME",
  "RENDER_API_KEY",
  "TIMEZONE",
  "AUTO_UPDATE",
  "PORT",
  "TZ",
  "GROQ_API_KEY",
  "GROQ_MODEL",
  "GROQ_SYSTEM_MSG",
  "OPENROUTER_API_KEY",
  "OPENROUTER_MODEL",
  "OPENROUTER_SYSTEM_MSG",
  "API_MODE",
  "API_KEY",
  "API_WEBHOOK_URL",
  "API_PUBLIC_URL",
];
const PROTECTED_VARS = [
  "VV",
  "STATUS_VIEW_MSG",
  "STATUS_VIEW_EMOJI",
  "STATUS_FORWARD_JID",
  "AREACT",
  "ANTI_BROADCAST_MSG",
  "IGNORE_WEB",
];
const VAR_SEPARATOR = ";_;";
const hasConfigFile = fs.existsSync(path.join(__dirname, "..", "config.json"));
const setVarPart = (F, text, H, index) => {
  if (SECRET_VARS.includes(F)) {
    return H;
  }
  const split = text.split(VAR_SEPARATOR);
  split[index] = H;
  return split.join(VAR_SEPARATOR);
};
const value = (text, index, H) => {
  if (SECRET_VARS.includes(H)) {
    return text;
  }
  return text.split(VAR_SEPARATOR)[index] || "";
};
const clearVarPart = (text, index) => {
  const split = text.split(VAR_SEPARATOR);
  split[index] = "";
  return split.join(VAR_SEPARATOR);
};
const normalizeBoolValue = (F) =>
  F === undefined || F === "off" ? "false" : F === "on" ? "true" : F;
const applyVar = (text, G, index) => {
  const I = {
    HZPnm: "SECRET_",
    PziJF: "LANGUAG",
    eWiiG: "PREFIX",
  };
  if (index in libConfig) {
    if (text.startsWith(I.HZPnm) || SECRET_VARS.includes(text)) {
      process.env[text] = G;
    } else {
      libConfig[index].env[text] = normalizeBoolValue(G);
      if (I.PziJF === text) {
        libConfig[index].env.LANG = G;
      }
      if (I.eWiiG === text) {
        libConfig.patchPrefix(index);
      } else {
        libConfig.preparevars(index);
      }
    }
  }
};
const mergeEnvVars = (F, env, H) => {
  Object.entries(F).forEach(([I, J]) => {
    let flag = false;
    env.env = env.env.map((value) => {
      if (value.key === I) {
        flag = true;
        const updatedValue = setVarPart(I, value.value, J, H);
        if (updatedValue !== value.value) {
          value.value = updatedValue;
          applyVar(I, J, H);
        }
      }
      return value;
    });
    if (!flag) {
      applyVar(I, J, H);
      env.env.push({
        key: I,
        value: setVarPart(I, "", J, H),
      });
    }
  });
  return env;
};
const platformApi = {
  render: {
    serviceId: "",
    headers: {
      headers: {
        Authorization: "Bearer " + config.RENDER_API_KEY,
      },
    },
    getRenderServices: async () => {
      const helpers = {
        aZbmC: function (K, L) {
          return K in L;
        },
        NIxxo: "LEVANTER_",
        bcULY: function (K, L) {
          return K !== L;
        },
        gvQwS: "rPSJy",
        ErWoz: "PolVu",
        RUqYP: "https://api.render.com/v1/services",
        XCaJd: function (K, L) {
          return K === L;
        },
        QvyIg:
          "render : invalid api_key, https://dashboard.render.com/u/settings#api-keys update RENDER_API_KEY",
      };
      const helper = helpers;
      if (platformApi.render.serviceId) {
        return platformApi.render.serviceId;
      }
      try {
        {
          const K = {
            Authorization: "Bearer " + config.RENDER_API_KEY,
          };
          const payload = {
            headers: K,
          };
          const get = await axios.get(helper.RUqYP, payload);
          const P =
            1 === get.data.length
              ? get.data[0]
              : get.data.find(
                  (service) =>
                    service.service.name === config.RENDER_NAME ||
                    service.service.name === process.env.name,
                );
          if (P && P.service.id) {
            platformApi.render.serviceId = P.service.id;
            return P.service.id;
          }
        }
      } catch (error) {
        if (error.response && 401 === error.response.status) {
          throw new Error(helper.QvyIg);
        }
        throw new Error("render : " + (error.response && error.response.statusText));
      }
    },
    getVars: async (F, G) => {
      const payload = {
        zqxgq: "missing id",
      };
      if (!F && !G) {
        throw new Error(payload.zqxgq);
      }
      const renderServices = await platformApi.render.getRenderServices();
      if (!renderServices) {
        throw new Error(
          "render: " + config.RENDER_NAME + " app not found, please update RENDER_NAME",
        );
      }
      try {
        const get = await axios.get(
          "https://api.render.com/v1/services/" + renderServices + "/env-vars",
          platformApi.render.headers,
        );
        const K = {};
        for (const item of get.data) {
          K[item.envVar.key] = G ? item.envVar.value : value(item.envVar.value, F, item.envVar.key);
        }
        return K;
      } catch (error) {
        {
          throw new Error(error.message);
        }
      }
    },
    setVar: async (G, H) => {
      const I = {
        XOFlc: "missing id",
        tKaoz: "do_not_clear",
      };
      if (!H) {
        throw new Error(I.XOFlc);
      }
      const renderServices = await platformApi.render.getRenderServices();
      if (!renderServices) {
        throw new Error(
          "render: " + config.RENDER_NAME + " app not found, please update RENDER_NAME",
        );
      }
      try {
        {
          const entries = Object.entries(G);
          const vars = await platformApi.render.getVars(H);
          const entries2 = Object.entries(vars);
          const items = [];
          for (const [Q, T] of entries) {
            if (!vars[Q]) {
              const updatedValue = setVarPart(Q, "", T, H);
              const payload = {
                key: Q,
                value: updatedValue,
              };
              items.push(payload);
              applyVar(Q, T, H);
            }
          }
          for (const [X, Y] of entries2) {
            const find = entries.find(([a0]) => a0 === X);
            if (find) {
              const [, a0] = find;
              const updatedValue = setVarPart(X, "", a0, H);
              if (updatedValue !== Y) {
                applyVar(X, a0, H);
              }
              items.push({
                key: X,
                value: updatedValue,
              });
            } else {
              items.push({
                key: X,
                value: Y,
              });
            }
          }
          await axios.put(
            "https://api.render.com/v1/services/" + renderServices + "/env-vars/",
            items,
            platformApi.render.headers,
          );
          await exports.updateRender(I.tKaoz);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    delVar: async (text, H) => {
      const I = {
        oJfMA: "missing id",
        bYKbs: "do_not_clear",
      };
      if (!H) {
        throw new Error(I.oJfMA);
      }
      const items = [];
      const vars = await platformApi.render.getVars(H);
      const entries = Object.entries(vars);
      for (const item of entries) {
        const Q = item[0];
        if (Q === text) {
          applyVar(text, "", H);
          item[1] = clearVarPart(item[1], H);
          items.push({
            key: Q,
            value: item[1],
          });
        }
      }
      const renderServices = await platformApi.render.getRenderServices();
      if (!renderServices) {
        throw new Error(
          "render: " + config.RENDER_NAME + " app not found, please update RENDER_NAME",
        );
      }
      try {
        {
          const payload = {
            value: items[0].value,
          };
          await axios.put(
            "https://api.render.com/v1/services/" +
              renderServices +
              "/env-vars/" +
              text.toUpperCase(),
            payload,
            platformApi.render.headers,
          );
          await exports.updateRender(I.bYKbs);
        }
      } catch (error) {
        {
          throw new Error(error.message);
        }
      }
    },
  },
  koyeb: {
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + config.KOYEB_API,
    },
    getVars: async (F, G, H) => {
      const I = {
        XdRiL: "missing id",
      };
      if (!F && !G) {
        throw new Error(I.XdRiL);
      }
      const koyebDeployments = await getKoyebDeployments();
      const koyebServices = await did(koyebDeployments.did);
      const L = {};
      if (H) {
        {
          L.def = koyebServices;
          L.id = koyebDeployments.id;
          L.env = {};
          for (const item of koyebServices.env) {
            if (H) {
              L.env.scopes = item.scopes;
            }
            L.env[item.key] = item.value;
          }
          return L;
        }
      }
      for (const item of koyebServices.env) {
        if (H) {
          L.scopes = item.scopes;
        }
        L[item.key] = G ? item.value : value(item.value, F, item.key);
      }
      return L;
    },
    setVar: async (G, H) => {
      const payload = {
        kunxg: "missing id",
      };
      if (!H) {
        throw new Error(payload.kunxg);
      }
      const payload2 = {
        headers: platformApi.koyeb.headers,
      };
      const koyebDeployments = await getKoyebDeployments();
      const get = await axios.get(
        "https://app.koyeb.com/v1/deployments/" + koyebDeployments.did,
        payload2,
      );
      const mergedEnvVars = mergeEnvVars(G, get.data.deployment.definition, H);
      await def(mergedEnvVars, koyebDeployments.id, true);
    },
    delVar: async (index, G) => {
      const H = {
        VgExV: "missing id",
        ctenc: "scopes",
      };
      if (!G) {
        throw new Error(H.VgExV);
      }
      const vars = await platformApi.koyeb.getVars(G, false, true);
      const items = [];
      for (const key in vars.env) {
        if (H.ctenc != key) {
          {
            if (index === key) {
              vars.env[index] = clearVarPart(vars.env[index], G);
            }
            const payload = {
              scopes: vars.env.scopes,
              key,
              value: vars.env[key],
            };
            items.push(payload);
          }
        }
      }
      vars.def.env = items;
      await def(vars.def, vars.id, true);
      return items;
    },
  },
  heroku: {
    base: "/apps/" + config.HEROKU_APP_NAME + "/config-vars",
    setVar: async (G, H) => {
      const I = {
        JvfCg: "missing id",
      };
      if (!H) {
        throw new Error(I.JvfCg);
      }
      try {
        const payload = {
          body: G,
        };
        await herokuApi.patch(platformApi.heroku.base, payload);
      } catch (error) {
        {
          throw new Error(lang.plugins.heroku.error_prefix.format(error.message));
        }
      }
    },
    getVars: async (F) => {
      const G = {
        fYMoD: "missing id",
      };
      if (!F) {
        throw new Error(G.fYMoD);
      }
      try {
        return await herokuApi.get(platformApi.heroku.base);
      } catch (error) {
        {
          throw new Error(lang.plugins.heroku.error_prefix.format(error.message));
        }
      }
    },
    delVar: async (text, G) => {
      const H = {
        oMLpw: "missing id",
      };
      if (!G) {
        throw new Error(H.oMLpw);
      }
      try {
        {
          const get = await herokuApi.get(platformApi.heroku.base);
          const toUpperCase = text.trim().toUpperCase();
          if (get[toUpperCase]) {
            await herokuApi.patch(platformApi.heroku.base, {
              body: {
                [toUpperCase]: null,
              },
            });
          }
        }
      } catch (error) {
        throw new Error(lang.plugins.heroku.error_prefix.format(error.message));
      }
    },
  },
  vps: {
    getVars: async function (index, G) {
      const helpers = {
        pdyOe: "missing id",
        lCzEF: "../config.env",
        MnERt: "../config.json",
        bBOcQ: "utf8",
        aeLYw: "SECRET_",
      };
      if (!index && !G) {
        throw new Error(helpers.pdyOe);
      }
      if (!fs.existsSync(path.join(__dirname, helpers.lCzEF))) {
        fs.writeFileSync(path.join(__dirname, helpers.lCzEF), "{}");
        return {};
      }
      if (hasConfigFile) {
        {
          const join = path.join(__dirname, helpers.MnERt);
          const parse = JSON.parse(fs.readFileSync(join, helpers.bBOcQ));
          if (G) {
            return parse;
          }
          const fromEntries = Object.fromEntries(
            Object.entries(parse).filter(([M]) => !M.startsWith("SECRET_")),
          );
          return fromEntries[Object.keys(fromEntries)[index]];
        }
      }
      {
        {
          const parse = dotenv.parse(fs.readFileSync(path.join(__dirname, helpers.lCzEF)));
          if (G) {
            return parse;
          }
          const P = {};
          for (const key in parse) {
            {
              if (key.startsWith(helpers.aeLYw)) {
                continue;
              }
              const varPart = value(parse[key], index, key);
              if (varPart) {
                P[key] = varPart;
              }
            }
          }
          return P;
        }
      }
    },
    setVar: async function (F, index) {
      const H = {
        ojZxg: function (K, L) {
          return K !== L;
        },
        bkqWB: function (callback, L, M, P) {
          return callback(L, M, P);
        },
        zsdsC: function (K, L) {
          return K !== L;
        },
        SyzST: "NDWNh",
        uTxbC: function (callback, L, M, P) {
          return callback(L, M, P);
        },
        rrnmU: function (K, L) {
          return K !== L;
        },
        OwxTE: function (K, L) {
          return K === L;
        },
        LVlkK: "RqMnq",
        oVbKv: "MPnpR",
        msswU: function (callback, L, M, P, Q) {
          return callback(L, M, P, Q);
        },
        lKLcW: "missing id",
        AgKAd: "KzyvQ",
        uecAm: function (K, L) {
          return K === L;
        },
        ejxjL: function (value, L) {
          return value + L;
        },
        VEeAX: function (callback, L) {
          return callback(L);
        },
        ZyTJl: "../config.json",
        IWCyu: function (K, L) {
          return K !== L;
        },
        nkgrv: "SIdtw",
        KPdgn: "../config.env",
      };
      if (!index) {
        throw new Error(H.lKLcW);
      }
      const entries = Object.entries(F);
      const vars = await platformApi.vps.getVars(index, true);
      if (hasConfigFile) {
        {
          const keys = Object.keys(vars);
          if (undefined === keys[index]) {
            keys.push("session" + H.ejxjL(parseInt(index), 1));
          }
          vars[keys[index]] ||= {};
          entries.forEach(([M, P]) => {
            {
              if (vars[M] !== P) {
                applyVar(M, P, index);
              }
              const T = F[M] ?? vars[keys[index]][M];
              if (H.ojZxg(T, vars[keys[index]][M])) {
                vars[keys[index]][M] = T;
              }
            }
          });
          fs.writeFileSync(path.join(__dirname, H.ZyTJl), JSON.stringify(vars, null, 2));
        }
      } else {
        entries.forEach(([Q, T]) => {
          if (vars[Q] !== T) {
            {
              applyVar(Q, T, index);
              const msswU = H.msswU(setVarPart, Q, vars[Q] || "", T, index);
              vars[Q] = msswU ?? vars[Q];
            }
          }
        });
        let P = "";
        for (const [Q, T] of Object.entries(vars)) {
          P += Q + ' = "' + T + '"\n';
        }
        fs.writeFileSync(path.join(__dirname, H.KPdgn), P.trim());
      }
    },
    delVar: async function (index, index2) {
      const helpers = {
        lAVHF: "missing id",
        fOYlz: function (callback, J, K) {
          return callback(J, K);
        },
        YiBmz: "../config.json",
        GYUtM: "../config.env",
      };
      if (!index2) {
        throw new Error(helpers.lAVHF);
      }
      if (hasConfigFile) {
        {
          const vars = await platformApi.vps.getVars(index2);
          const keys = Object.keys(vars);
          vars[index] = helpers.fOYlz(clearVarPart, vars[keys[index2]][index], index2);
          applyVar(index, "", index2);
          fs.writeFileSync(path.join(__dirname, helpers.YiBmz), JSON.stringify(vars, null, 2));
        }
      } else {
        const vars = await platformApi.vps.getVars(index2);
        if (vars[index]) {
          {
            applyVar(index, "", index2);
            vars[index] = clearVarPart(vars[index], index2);
            let M = "";
            for (const key in vars) {
              M += key + ' = "' + vars[key] + '"\n';
            }
            fs.writeFileSync(path.join(__dirname, helpers.GYUtM), M.trim());
          }
        }
      }
    },
  },
  fake_vps: {
    setVar: async function (F, G) {
      const entries = Object.entries(F);
      const vars = await platformApi.fake_vps.getVars(G, true);
      entries.forEach(([K, L]) => {
        {
          if (vars[K] !== L) {
            applyVar(K, L, G);
          }
        }
      });
    },
    getVars: async function (F, G) {
      const H = {
        SLVxV: "LEVANTER_",
        hGTwK:
          "You're on a fake VPS environment; data gets erased on reboot. So update envs on your platform settings.",
      };
      config.logger.warn(H.hGTwK);
      const reduce = Object.keys(process.env).reduce((J, index) => {
        {
          const M = process.env[index];
          if (index in config || PROTECTED_VARS.includes(index)) {
            J[index] = M;
          } else if (index.startsWith(H.SLVxV)) {
            J[index.replace(H.SLVxV, "")] = M;
          }
          return J;
        }
      }, {});
      if (G) {
        return reduce;
      } else {
        return Object.keys(reduce).reduce((J, index) => {
          const varPart = value(reduce[index], F, index);
          if (varPart) {
            J[index] = varPart;
          }
          return J;
        }, {});
      }
    },
    delVar: async function (F, G) {
      applyVar(F, "", G);
    },
  },
  false: {
    message:
      "Failed detect the Platform, Please enter Heroku or Koyeb or VPS config respectively\nhttps://github.com/lyfe00011/levanter/wiki/platform",
    setVar: () => {
      throw new Error(platformApi.false.message);
    },
    delVar: () => {
      throw new Error(platformApi.false.message);
    },
    getVars: () => {
      throw new Error(platformApi.false.message);
    },
  },
};
async function getKoyebDeployments() {
  const helpers = {
    CZQwH: "https://app.koyeb.com/v1/services",
    bPmWx: function (K, L) {
      return K === L;
    },
    pkRmC: function (K, L) {
      return K === L;
    },
    OlqBt: "koyeb: invalid api_key, please update KOYEB_API",
  };
  const helper = helpers;
  try {
    const payload = {
      headers: platformApi.koyeb.headers,
    };
    const filter = (await axios.get(helper.CZQwH, payload)).data.services.filter(
      (type) => type.type !== "DATABASE",
    );
    const M =
      1 === filter.length
        ? filter[0]
        : filter.find(
            (name) =>
              name.name === config.KOYEB_NAME || name.name === process.env.KOYEB_SERVICE_NAME,
          );
    if (!M) {
      throw new Error("koyeb: app *" + config.KOYEB_NAME + "* not found, please update KOYEB_NAME");
    }
    const P = M.id;
    const Q = {
      id: P,
      did: M.active_deployment_id,
    };
    return Q;
  } catch (error) {
    if (error.response && 401 === error.response.status) {
      throw new Error(helper.OlqBt);
    }
    throw new Error(error.message);
  }
}
async function did(I) {
  const helpers = {
    KJKCC: function (L, M) {
      return L === M;
    },
    ynSYz: "sTlSO",
    YLjGa: "ZSBPO",
    TJprs: function (value, M) {
      return value + M;
    },
    fxgaJ: "koyeb: ",
  };
  const helper = helpers;
  try {
    const payload = {
      headers: platformApi.koyeb.headers,
    };
    const get = await axios.get("https://app.koyeb.com/v1/deployments/" + I, payload);
    return get.data.deployment.definition;
  } catch (error) {
    {
      config.logger.error(helper.fxgaJ + error.message);
      return {
        env: [],
      };
    }
  }
}
async function def(I, J, K) {
  const M = {
    mYCeC: "koyeb",
  };
  try {
    const payload = {
      definition: I,
      skip_build: K,
    };
    const payload2 = {
      headers: platformApi.koyeb.headers,
    };
    await axios.patch("https://app.koyeb.com/v1/services/" + J, payload, payload2);
  } catch (error) {
    throw new Error(error?.response?.data?.code || M.mYCeC);
  }
}
const DEPLOY_PLATFORM =
  config.HEROKU_API_KEY && config.HEROKU_APP_NAME
    ? "heroku"
    : config.KOYEB_API && config.KOYEB_NAME
      ? "koyeb"
      : config.RENDER_NAME && config.RENDER_API_KEY
        ? "render"
        : config.VPS
          ? fs.existsSync(path.join(__dirname, "../config.env"))
            ? "vps"
            : "fake_vps"
          : "false";
exports.upKoyeb = async function (F) {
  const vars = await platformApi.koyeb.getVars(F, false, true);
  await def(vars.def, vars.id, false);
};
exports.updateRender = async (G) => {
  const helpers = {
    qedeb: function (K, L) {
      return K === L;
    },
    ccchK: "MUUQG",
    ZOUBt: function (K, L) {
      return K || L;
    },
    zOjmc: "clear",
  };
  const helper = helpers;
  const renderServices = await platformApi.render.getRenderServices();
  if (!renderServices) {
    throw new Error("render: " + config.RENDER_NAME + " app not found, please update RENDER_NAME");
  }
  try {
    {
      await axios.post(
        "https://api.render.com/v1/services/" + renderServices + "/deploys",
        {
          clearCache: G || helper.zOjmc,
        },
        platformApi.render.headers,
      );
    }
  } catch (error) {}
};
const RESTART_REQUIRED_VARS = ["ANTI_DELETE", "ANTI_EDIT"];
const GLOBAL_TOGGLE_VARS = ["AUTO_STATUS_VIEW", "ANTI_BOT"];
const GLOBAL_MESSAGE_VARS = ["ANTI_BOT_MESSAGE", "ANTISPAM_MSG"];
const normalizeFeatureVars = (G) => {
  const helpers = {
    HWyIM: function (K, L) {
      return K != L;
    },
    LNljg: "object",
    mFkYF: function (callback, L) {
      return callback(L);
    },
    tYqbI: "off",
    FfIrN: "false",
    cwBRx: "null",
    dqXyG: "true",
    LbQUr: function (callback, L) {
      return callback(L);
    },
  };
  if (!G || helpers.HWyIM(helpers.LNljg, typeof G)) {
    return G;
  }
  const I = {
    ...G,
  };
  const J = I;
  for (const RESTART_REQUIRED_VARSItem of RESTART_REQUIRED_VARS) {
    if (RESTART_REQUIRED_VARSItem in J) {
      const toLowerCase = helpers
        .mFkYF(String, J[RESTART_REQUIRED_VARSItem] ?? "")
        .trim()
        .toLowerCase();
      if (
        !(helpers.tYqbI !== toLowerCase) ||
        !(helpers.FfIrN !== toLowerCase) ||
        !("" !== toLowerCase)
      ) {
        J[RESTART_REQUIRED_VARSItem] = helpers.cwBRx;
      }
    }
  }
  for (const GLOBAL_TOGGLE_VARSItem of GLOBAL_TOGGLE_VARS) {
    if (GLOBAL_TOGGLE_VARSItem in J) {
      const toLowerCase = helpers
        .mFkYF(String, J[GLOBAL_TOGGLE_VARSItem] ?? "")
        .trim()
        .toLowerCase();
      if ("on" === toLowerCase || helpers.dqXyG === toLowerCase) {
        J[GLOBAL_TOGGLE_VARSItem] = helpers.dqXyG;
      } else if (
        !(helpers.tYqbI !== toLowerCase) ||
        !(helpers.cwBRx !== toLowerCase) ||
        !("" !== toLowerCase) ||
        !(helpers.FfIrN !== toLowerCase)
      ) {
        J[GLOBAL_TOGGLE_VARSItem] = helpers.FfIrN;
      }
    }
  }
  for (const GLOBAL_MESSAGE_VARSItem of GLOBAL_MESSAGE_VARS) {
    if (GLOBAL_MESSAGE_VARSItem in J) {
      {
        const toLowerCase = helpers
          .LbQUr(String, J[GLOBAL_MESSAGE_VARSItem] ?? "")
          .trim()
          .toLowerCase();
        if (
          !(helpers.tYqbI !== toLowerCase) ||
          !(helpers.cwBRx !== toLowerCase) ||
          !("" !== toLowerCase) ||
          !(helpers.FfIrN !== toLowerCase)
        ) {
          J[GLOBAL_MESSAGE_VARSItem] = helpers.FfIrN;
        }
      }
    }
  }
  return J;
};
exports.normalizeFeatureVars = normalizeFeatureVars;
const platformSetVar = platformApi[DEPLOY_PLATFORM].setVar;
exports.setVar = async (F, G) => platformSetVar(normalizeFeatureVars(F), G);
exports.getVars = platformApi[DEPLOY_PLATFORM].getVars;
exports.delVar = platformApi[DEPLOY_PLATFORM].delVar;
