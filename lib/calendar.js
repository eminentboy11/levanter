let a3;
const a4 = new Proxy(
  {},
  {
    get: (p, q) => {
      a3 ??= require("googleapis").google;
      return a3[q];
    },
  },
);
const momentTimezone = require("moment-timezone");
const { refreshUserToken } = require("./google-auth");
const { nlpComplete, getDate } = require("./index");
const config = require("../config");
const aa = async (q, u = "0") => {
  const v = {
    DPZCf: "Not authorized",
    lWwtm: "primary",
  };
  if (q.length >= 20) {
    return q;
  }
  const w = await refreshUserToken(u);
  if (!w) {
    throw new Error(v.DPZCf);
  }
  const x = {
    version: "v3",
    auth: w,
  };
  const y = a4.calendar(x);
  const z = (
    await y.events.list({
      calendarId: v.lWwtm,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      maxResults: 250,
    })
  ).data.items.filter((A) => A.id.startsWith(q));
  if (1 === z.length) {
    return z[0].id;
  }
  if (z.length > 1) {
    throw new Error(
      'Multiple events match "' +
        q +
        '":\n' +
        z.map((A) => A.summary + " (" + A.id + ")").join("\n") +
        "\nPlease provide more characters.",
    );
  }
  return q;
};
const ab = async (z, A) => {
  const B = {
    LVvdU: 'Not authorized. Use "gauth" to authenticate.',
    ebYeE: "UTC",
    LSTpu: function (O, P, Q) {
      return O(P, Q);
    },
    MjGsx: "Failed to parse AI response. Body: ",
    cpsqe: "Invalid date extracted by AI",
    nAeLv: "hour",
    ERLKS: "primary",
    IBUqO: "YYYY-MM-DD HH:mm:ss",
  };
  const C = await refreshUserToken(A);
  if (!C) {
    throw new Error(B.LVvdU);
  }
  const [D, E] = getDate();
  const F = config.TIMEZONE || process.env.TZ || B.ebYeE;
  const G =
    "You are a helpful assistant that extracts event details from natural language.\nCurrent local time: " +
    E +
    " (" +
    new Date(D).toDateString() +
    ').\n\nIMPORTANT: The user may write in ANY language — English, Hindi/Urdu (Romanized or native script), Arabic, Bengali, Malayalam, Spanish, French, Turkish, Indonesian, Russian, or mixed. Understand all of them.\n\nExtract the event summary and the start date/time. Keep the summary in the user\'s original language.\nRespond ONLY with a JSON object: {"summary": "string", "start": "ISO8601 string"}.\nIf you cannot determine the date, respond ONLY with {"error": "Could not understand the date"}.';
  const H = await B.LSTpu(nlpComplete, G + '\n\nUser input: "' + z + '"', A);
  let I;
  try {
    const O = H.data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    I = JSON.parse(O);
  } catch (P) {
    throw new Error(B.MjGsx + H.data);
  }
  if (I.error) {
    throw new Error(I.error);
  }
  const J = {
    version: "v3",
    auth: C,
  };
  const K = a4.calendar(J);
  const L = momentTimezone.tz(I.start, F);
  if (!L.isValid()) {
    throw new Error(B.cpsqe);
  }
  const M = momentTimezone(L).add(1, B.nAeLv);
  const N = {
    summary: I.summary,
    start: {
      dateTime: L.format(),
      timeZone: F,
    },
    end: {
      dateTime: M.format(),
      timeZone: F,
    },
  };
  try {
    {
      const R = {
        calendarId: B.ERLKS,
        requestBody: N,
      };
      const S = await K.events.insert(R);
      return {
        id: S.data.id,
        link: S.data.htmlLink,
        summary: S.data.summary,
        start: momentTimezone.tz(S.data.start.dateTime, F).format(B.IBUqO),
      };
    }
  } catch (T) {
    {
      throw new Error("Google Calendar API error: " + T.message);
    }
  }
};
const ac = async (q = null, u = "0") => {
  const v = {
    PXXvI: 'Not authorized. Use "gauth" to authenticate.',
    srFuI: "primary",
    TAZNU: "startTime",
    ZqaJI: "UTC",
  };
  const w = await refreshUserToken(u);
  if (!w) {
    throw new Error(v.PXXvI);
  }
  const x = {
    version: "v3",
    auth: w,
  };
  const y = a4.calendar(x);
  const z = {
    calendarId: v.srFuI,
    timeMin: new Date().toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: v.TAZNU,
  };
  if (q) {
    z.timeMax = q;
  }
  try {
    {
      const B = await y.events.list(z);
      const C = config.TIMEZONE || process.env.TZ || v.ZqaJI;
      return B.data.items.map((D) => ({
        id: D.id,
        summary: D.summary,
        start: momentTimezone.tz(D.start.dateTime || D.start.date, C).format("YYYY-MM-DD HH:mm:ss"),
        link: D.htmlLink,
      }));
    }
  } catch (D) {
    throw new Error("Google Calendar API error: " + D.message);
  }
};
const ad = async (u, v = "0") => {
  const w = {
    NOjqt: 'Not authorized. Use "gauth" to authenticate.',
    OhHrH: "primary",
  };
  const x = await aa(u, v);
  const y = await refreshUserToken(v);
  if (!y) {
    throw new Error(w.NOjqt);
  }
  const z = {
    version: "v3",
    auth: y,
  };
  const A = a4.calendar(z);
  try {
    {
      const B = {
        calendarId: w.OhHrH,
        eventId: x,
      };
      await A.events.delete(B);
      return true;
    }
  } catch (D) {
    throw new Error("Google Calendar API error: " + D.message);
  }
};
const ae = {
  addCalendarEvent: ab,
  listCalendarEvents: ac,
  deleteCalendarEvent: ad,
  resolveCalendarId: aa,
};
module.exports = ae;
