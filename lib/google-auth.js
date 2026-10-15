let a3;
const a4 = {
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/tasks",
    "https://www.googleapis.com/auth/youtube",
  ],
  prompt: "consent",
};
const a5 = new Proxy(
  {},
  {
    get: (m, p) => {
      a3 ??= require("googleapis").google;
      return a3[p];
    },
  },
);
const { getGAuth, setGAuth, deleteGAuth } = require("./db");
const a9 = async (m = "0") => {
  const p = {
    aMOqp: "google_creds",
    IwqjP: "missing google credentials. use .gauth import to add them.",
    ntrzi: "installed",
    RXTwj: "web",
    WQWxb: 'Invalid Google credentials: Missing "installed" or "web" key.',
  };
  let q = await getGAuth(p.aMOqp, m);
  if (!q) {
    throw new Error(p.IwqjP);
  }
  const u = q.installed ? p.ntrzi : q.web ? p.RXTwj : null;
  if (!u) {
    throw new Error(p.WQWxb);
  }
  const v = q[u];
  return new a5.auth.OAuth2(
    v.client_id,
    v.client_secret,
    Array.isArray(v.redirect_uris) ? v.redirect_uris[0] : v.redirect_uris,
  );
};
const aa = async (m = "0") => {
  const p = {
    ddOiJ: "google_token",
  };
  try {
    {
      const u = await a9(m);
      let v = await getGAuth(p.ddOiJ, m);
      if (v) {
        u.setCredentials(v);
        const x = await u.getAccessToken();
        if (x && x.token) {
          v.access_token = x.token;
          u.setCredentials(v);
          await setGAuth(p.ddOiJ, u.credentials, m);
        }
        return u;
      }
    }
  } catch (y) {
    return null;
  }
  return null;
};
const ab = async (m = "0") => (await a9(m)).generateAuthUrl(a4);
const ac = async (m, p = "0") => {
  const q = {
    figpl: "code=",
    XoAqG: "code",
    GnKmT: "code ",
    QYvAo: "google_token",
  };
  let u = m;
  if (m.includes(q.figpl)) {
    try {
      {
        u = new URL(m).searchParams.get(q.XoAqG) || u;
      }
    } catch (x) {
      {
        const y = m.match(/[?&]code=([^&]+)/);
        if (y) {
          u = y[1];
        }
      }
    }
  } else if (m.startsWith(q.GnKmT)) {
    u = m.replace(q.GnKmT, "").trim();
  }
  try {
    {
      const B = await a9(p);
      const { tokens: C } = await B.getToken(u);
      B.setCredentials(C);
      await setGAuth(q.QYvAo, C, p);
      return true;
    }
  } catch (D) {
    throw new Error(D.response?.data?.error_description || D.message);
  }
};
const ad = async (m, p = "0") => {
  const q = {
    UOPQs: "installed",
    lkkAz: "web",
    qBjrd: "Invalid credentials format",
    pXQZB: "google_creds",
  };
  if (!(m.installed ? q.UOPQs : m.web ? q.lkkAz : null)) {
    throw new Error(q.qBjrd);
  }
  await setGAuth(q.pXQZB, m, p);
};
const ae = async (m = "0") => {
  const p = {
    pMeex: "google_creds",
    RAwSD: "google_token",
    METwY: "task_pref",
  };
  await deleteGAuth(p.pMeex, m);
  await deleteGAuth(p.RAwSD, m);
  await deleteGAuth(p.METwY, m);
};
module.exports = {
  getOAuth2Client: a9,
  refreshUserToken: aa,
  initiateUserToken: ab,
  validateUserCode: ac,
  getTaskPref: async (m) => (await getGAuth("task_pref", m)) || "@default",
  setTaskPref: async (m, p) => await setGAuth("task_pref", m, p),
  setGAuthCredentials: ad,
  clearGAuth: ae,
  isGAuthTokenActive: async (m = "0") => !!(await getGAuth("google_token", m)),
};
