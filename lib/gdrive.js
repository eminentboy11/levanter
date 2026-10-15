const {
  existsSync,
  createReadStream,
  createWriteStream,
  copyFileSync,
  rmSync,
  unlinkSync,
} = require("fs");
let aq;
const ar = new Proxy(
  {},
  {
    get: (C, D) => {
      aq ??= require("googleapis").google;
      return aq[D];
    },
  },
);
const axios = require("axios");
const { PassThrough } = require("stream");
const { tmpdir } = require("os");
const { pipeline } = require("stream/promises");
const { join, basename } = require("path");
const { refreshUserToken } = require("./google-auth");
const { TEMP_DIR } = require("./constant");
const aA = async (D, E = "0") => {
  const F = {
    clooG: "Not authorized",
    bQmMR: "files(id, name)",
  };
  if (D.length >= 33) {
    return D;
  }
  const G = await refreshUserToken(E);
  if (!G) {
    throw new Error(F.clooG);
  }
  const H = {
    version: "v3",
    auth: G,
  };
  const I = ar.drive(H);
  const J = await aB(E);
  const K = (
    await I.files.list({
      q: "'" + J + "' in parents and trashed = false",
      fields: F.bQmMR,
    })
  ).data.files.filter((L) => L.id.startsWith(D));
  if (1 === K.length) {
    return K[0].id;
  }
  if (K.length > 1) {
    throw new Error(
      'Multiple files match "' +
        D +
        '":\n' +
        K.map((L) => L.name + " (" + L.id + ")").join("\n") +
        "\nPlease provide more characters.",
    );
  }
  return D;
};
const aB = async (F = "0") => {
  const G = {
    vvSzI: "Not authorized",
    wcMai: "Levanter",
    qTcnQ: "files(id)",
    EvTjz: "application/vnd.google-apps.folder",
  };
  const H = await refreshUserToken(F);
  if (!H) {
    throw new Error(G.vvSzI);
  }
  const I = {
    version: "v3",
    auth: H,
  };
  const J = ar.drive(I);
  const K = process.env.BACKUP_FOLDER || G.wcMai;
  const L = await J.files.list({
    q: "name = '" + K + "' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
    fields: G.qTcnQ,
  });
  if (L.data.files.length > 0) {
    return L.data.files[0].id;
  }
  {
    {
      const M = {
        name: K,
        mimeType: G.EvTjz,
      };
      const N = M;
      const O = {
        requestBody: N,
        fields: "id",
      };
      return (await J.files.create(O)).data.id;
    }
  }
};
const aC = async (H, I = "0") => {
  const J = {
    jvNga: "Not authorized",
    bvwQI: function (U, V, W) {
      return U(V, W);
    },
    WPlht: "files(id)",
    dKkyT: "application/octet-stream",
  };
  const K = await refreshUserToken(I);
  if (!K) {
    throw new Error(J.jvNga);
  }
  const L = {
    version: "v3",
    auth: K,
  };
  const M = ar.drive(L);
  const N = await aB(I);
  const O = basename(H);
  const P = J.bvwQI(join, TEMP_DIR, O + "." + Date.now());
  copyFileSync(H, P);
  const Q = {
    q: "name = '" + O + "' and '" + N + "' in parents and trashed = false",
    fields: J.WPlht,
  };
  const R = await M.files.list(Q);
  const S = {
    mimeType: J.dKkyT,
    body: createReadStream(P),
  };
  if (R.data.files.length > 0) {
    {
      const V = R.data.files[0].id;
      const W = {
        fileId: V,
        media: S,
        fields: "id",
      };
      await M.files.update(W);
    }
  } else {
    const X = {
      name: O,
      parents: [N],
    };
    const Y = X;
    const Z = {
      requestBody: Y,
      media: S,
      fields: "id",
    };
    await M.files.create(Z);
  }
  rmSync(P);
};
const aD = async (E = "0") => {
  const F = {
    NIFbi: "Not authorized",
    csFCv: "files(id, name, mimeType, size, createdTime)",
    BKEch: "createdTime desc",
  };
  const G = await refreshUserToken(E);
  if (!G) {
    throw new Error(F.NIFbi);
  }
  const H = {
    version: "v3",
    auth: G,
  };
  const I = ar.drive(H);
  const J = await aB(E);
  const K = {
    q: "'" + J + "' in parents and trashed = false",
    fields: F.csFCv,
    orderBy: F.BKEch,
  };
  return (await I.files.list(K)).data.files;
};
const aE = async (E, F = "0") => {
  const G = {
    llSrc: "Not authorized",
  };
  const H = await aA(E, F);
  const I = await refreshUserToken(F);
  if (!I) {
    throw new Error(G.llSrc);
  }
  const J = {
    version: "v3",
    auth: I,
  };
  const K = ar.drive(J);
  const L = {
    fileId: H,
  };
  await K.files.delete(L);
  return true;
};
const aF = async (I, J, K = "0") => {
  const L = {
    Zxslj: function (a7, a8) {
      return a7(a8);
    },
    NMFxy: function (a7, a8) {
      return a7 * a8;
    },
    zUpuN: function (a7, a8) {
      return a7 >= a8;
    },
    PlXFV: function (a7, a8) {
      return a7 >= a8;
    },
    nqsrb: function (a7, a8) {
      return a7(a8);
    },
    vWLpx: "Not authorized",
    cTWXa: function (a7, a8) {
      return a7(a8);
    },
    pLbCm: function (a7, a8, a9) {
      return a7(a8, a9);
    },
    QtiUD: "stream",
    eunoH: "content-length",
    rcygm: "data",
    GtPub: function (a7, a8) {
      return a7(a8);
    },
    gqTdk: "content-type",
    PNHww: "application/octet-stream",
  };
  const M = await refreshUserToken(K);
  if (!M) {
    throw new Error(L.vWLpx);
  }
  const O = {
    version: "v3",
    auth: M,
  };
  const Q = ar.drive(O);
  const R = await aB(K);
  const U = L.cTWXa(basename, new URL(I).pathname) || "file-" + Date.now();
  const V = L.pLbCm(join, tmpdir(), Date.now() + "-" + U);
  const W = async (a7) => {
    try {
      await J.send(a7);
    } catch (a8) {}
  };
  let X;
  try {
    {
      const a7 = {
        responseType: L.QtiUD,
        timeout: 60000,
      };
      X = await axios.get(I, a7);
    }
  } catch (a9) {
    {
      throw new Error('Failed to download "' + I + '": ' + a9.message);
    }
  }
  const Y = L.nqsrb(Number, X.headers[L.eunoH]) || 0;
  let Z = 0;
  let a0 = 0;
  let a1 = Date.now();
  const a2 = new PassThrough();
  a2.on(L.rcygm, (ab) => {
    {
      Z += ab.length;
      if (Y) {
        {
          const ad = Math.floor(L.NMFxy(Z / Y, 100));
          const ae = Date.now();
          if ((L.zUpuN(ad, a0 + 10) || 100 === ad) && L.PlXFV(ae - a1, 5000)) {
            a0 = ad;
            a1 = ae;
            L.Zxslj(W, "Downloading " + U + ": " + ad + "%");
          }
        }
      }
    }
  });
  const a3 = createWriteStream(V);
  await pipeline(X.data, a2, a3);
  await L.GtPub(W, "Uploading " + U + " to Drive...");
  const a4 = {
    name: U,
    parents: [R],
  };
  const a5 = {
    mimeType: X.headers[L.gqTdk] || L.PNHww,
    body: createReadStream(V),
  };
  const a6 = await Q.files.create({
    requestBody: a4,
    media: a5,
    fields: "id",
  });
  if (existsSync(V)) {
    unlinkSync(V);
  }
  return a6.data.id;
};
const aG = async (H, I = "0") => {
  const J = {
    aBLPB: "Not authorized",
    ptwxp: "name, mimeType, size",
    mwioD: "media",
    OUOla: "stream",
    VeqvC: "document",
    OfdLX: function (X, Y) {
      return X === Y;
    },
    OPvYe: "webp",
    IYfGj: "sticker",
    iVHrx: function (X, Y) {
      return X === Y;
    },
    fcxSr: "gif",
    CdbQW: "image",
    konis: "video",
    zAQQd: "audio",
    PNCff: "video/mp4",
  };
  const K = await aA(H, I);
  const L = await refreshUserToken(I);
  if (!L) {
    throw new Error(J.aBLPB);
  }
  const M = {
    version: "v3",
    auth: L,
  };
  const N = {
    fileId: K,
    fields: J.ptwxp,
  };
  const O = {
    fileId: K,
    alt: J.mwioD,
  };
  const P = {
    responseType: J.OUOla,
  };
  const Q = ar.drive(M);
  const R = await Q.files.get(N);
  const S = {
    stream: (await Q.files.get(O, P)).data,
    name: R.data.name,
    mimetype: R.data.mimeType,
    size: R.data.size ? (R.data.size / 1000000).toFixed(2) : 0,
  };
  let U = S.mimetype.split("/")[0];
  if (S.size > 80) {
    U = J.VeqvC;
  }
  if (J.OfdLX(J.OPvYe, S.mimetype.split("/")[1])) {
    U = J.IYfGj;
  }
  if (J.iVHrx(J.fcxSr, S.mimetype.split("/")[1])) {
    U = J.fcxSr;
  }
  if (![J.CdbQW, J.konis, J.zAQQd, J.IYfGj, J.fcxSr].includes(U)) {
    U = J.VeqvC;
  }
  const V = {
    fileName: S.name,
    mimetype: S.mimetype,
  };
  const W = V;
  if (J.fcxSr === U) {
    U = J.konis;
    W.mimetype = J.PNCff;
    W.gifPlayback = true;
  }
  return {
    file: S,
    options: W,
    type: U,
  };
};
const aH = {
  getOrCreateLevanterFolder: aB,
  uploadFile: aC,
  listDriveFiles: aD,
  deleteDriveFile: aE,
  uploadUrlToDrive: aF,
  downloadDriveFile: aG,
};
module.exports = aH;
