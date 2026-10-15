const { DataTypes, Sequelize, Op } = require("sequelize"),
  path = require("path"),
  config = require("../../config"),
  { existsSync, rmSync } = require("fs"),
  as = {},
  at = config.DATABASE.define("pdm", {
    chat: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
      unique: "compositeIndex",
    },
  }),
  au = (x, z) => "pdm-" + x + z;
((exports.getPdm = async function (A, B) {
  const D = au(A, B);
  if (as.hasOwnProperty(D)) return as[D];
  const E = {};
  E.chat = A;
  E.session = B;
  const F = {};
  F.where = E;
  const G = await at.findOne(F),
    H = !!G && G.dataValues?.["enabled"];
  return ((as[D] = H), H);
}),
  (exports.setPdm = async function (A, B, C) {
    const E = {};
    E.chat = A;
    E.session = C;
    const F = {};
    F.where = E;
    const G = await at.findOne(F);
    (G
      ? await G.update({
          chat: A,
          enabled: "on" == B,
          session: C,
        })
      : await at.create({
          chat: A,
          enabled: "on" == B,
          session: C,
        }),
      (as[au(A, C)] = "on" == B));
  }));
const av = path.join(__dirname, "../../messages.db");
existsSync(av) && rmSync(av);
const aw = {};
((aw.dialect = "sqlite"), (aw.storage = av), (aw.logging = false));
const ax = {};
((ax.type = DataTypes.STRING), (ax.allowNull = false));
const ay = {};
((ay.type = DataTypes.TEXT), (ay.allowNull = false));
const az = {};
((az.type = DataTypes.BOOLEAN), (az.defaultValue = false));
const aA = {};
((aA.mid = ax), (aA.m = ay), (aA.delete = az));
const MessageDB = new Sequelize(aw),
  aC = MessageDB.define("message", aA);
((exports.setTMessage = async function (C, D, E) {
  const F = {};
  F.SGicC = function (K, L) {
    return K !== L;
  };
  F.CrTxN = "QwyNv";
  const G = F,
    H = {};
  H.mid = C;
  const I = {};
  I.where = H;
  const J = await aC.findOne(I);
  if (E) J && (await J.destroy());
  else {
    if (!J) {
      const L = {};
      ((L.content = D), (L.history = []), (L.editCount = 0x0));
      const M = L;
      return await aC.create({
        mid: C,
        m: JSON.stringify(M),
      });
    }
  }
}),
  (exports.updateTMessage = async function (A, B) {
    const C = {};
    C.mid = A;
    const D = {};
    D.where = C;
    const E = await aC.findOne(D);
    if (E) {
      const F = JSON.parse(E.m);
      return (
        F.history || (F.history = []),
        F.history.push(F.content),
        (F.content = B),
        (F.editCount = F.history.length),
        await E.update({
          m: JSON.stringify(F),
        }),
        F
      );
    }
    return null;
  }),
  (exports.getTMessage = async function (A) {
    const B = {};
    B.mid = A;
    const C = {};
    C.where = B;
    const D = await aC.findOne(C);
    if (!D || D.delete) return false;
    return JSON.parse(D.m).content;
  }),
  (exports.getDeletedMessage = async function () {
    const B = {};
    B.bVsCv = function (G, H) {
      return G < H;
    };
    const C = B;
    const D = {};
    D.delete = true;
    const E = {};
    E.where = D;
    const F = await aC.findOne(E);
    return C.bVsCv(F.length, 1) ? [] : F.map((G) => JSON.parse(G.m));
  }),
  (exports.MessageDB = MessageDB));
const aD = {};
aD.type = DataTypes.STRING;
aD.allowNull = false;
const aE = {};
((aE.type = DataTypes.BOOLEAN), (aE.allowNull = false));
const aF = {};
aF.type = DataTypes.STRING;
aF.allowNull = false;
const aG = {};
((aG.action = aD), (aG.enabled = aE), (aG.filter = aF));
const aH = config.DATABASE.define("groupmention", aG),
  setGroupMention = async ({ action: z, enabled: A, filter: B }) => {
    const C = {};
    C.GldZB = function (E, F) {
      return E === F;
    };
    ((C.IqVOw = "VEBMB"),
      (C.meDMh = function (E, F) {
        return E !== F;
      }));
    C.BdheK = function (E, F) {
      return E || F;
    };
    ((C.KdDsP = "delete"), (C.ZfXdg = "QQXoC"));
    C.XSZNG = "TrQyT";
    const D = C;
    try {
      let E = await aH.findOne();
      return (
        E
          ? (D.meDMh(void 0, z) && (E.action = z),
            D.meDMh(void 0, A) && (E.enabled = A),
            D.meDMh(void 0, B) && (E.filter = B),
            await E.save())
          : (E = await aH.create({
              action: D.BdheK(z, D.KdDsP),
              enabled: D.GldZB(void 0, A) || A,
              filter: D.BdheK(B, ""),
            })),
        E
      );
    } catch (G) {
      throw G;
    }
  };
exports.setGroupMention = setGroupMention;
const getGroupMention = async () => {
  const z = {
    xqSnL: "delete",
  };
  try {
    {
      const B = {};
      return (
        (B.action = z.xqSnL),
        (B.enabled = false),
        (B.filter = ""),
        (await aH.findOne()) || B
      );
    }
  } catch (C) {
    throw C;
  }
};
exports.getGroupMention = getGroupMention;
const aK = () => "on" === process.env.XMESSAGE;
if (aK()) {
  const aL = {};
  ((aL.type = DataTypes.TEXT), (aL.allowNull = false));
  const aM = {};
  aM.type = DataTypes.DATE;
  const aN = {};
  ((aN.m = aL), (aN.date = aM));
  const aO = {};
  aO.where = {};
  const aP = new Sequelize({
      dialect: "sqlite",
      storage: path.join(__dirname, "../../x2messages.db"),
      logging: false,
    }).define("x2message", aN),
    aQ = async (x) =>
      aP.create({
        m: JSON.stringify(x),
        date: new Date(),
      }),
    aR = async () => (await aP.findAll(aO)).map((x) => JSON.parse(x.m)),
    aS = async () => {
      const C = {};
      C.UAQRu = function (I, J) {
        return I - J;
      };
      const D = C,
        E = new Date(D.UAQRu(Date.now(), 172800000));
      const F = {
        [Op.lt]: E,
      };
      const G = {};
      G.date = F;
      const H = {};
      ((H.where = G), await aP.destroy(H));
    };
  ((exports.setXMessage = aQ),
    (exports.getXMessage = aR),
    (exports.delXMessage = aS),
    aP.sync().then(aS));
}
