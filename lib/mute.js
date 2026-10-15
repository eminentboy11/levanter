const cron = require("cron");
const config = require("../config");
const utils = require("./utils");
const {
  getAllMute,
  getScheduleMessage,
  setScheduleMessage,
  setScheduleStatus,
  delScheduleStatus,
  getScheduleStatus,
  delScheduleMessage,
} = require("./db/mute");
const bO = {
  mute: {},
  unmute: {},
  schedule: {},
};
exports.validateTime = (y, z) => {
  const A = {
    lvgpr: function (E, F) {
      return E % F;
    },
    lClEk: function (E, F) {
      return E * F;
    },
    lqBOW: function (E, F) {
      return E ?? F;
    },
  };
  const B = A;
  if (!y) {
    return y;
  }
  if (!y.length) {
    return y;
  }
  let C = [];
  C = y.includes(" ") ? y.split(/\s+/).slice(0, 5) : y.split("-");
  const D = [
    B.lvgpr(B.lClEk(5, z ?? 1), 60),
    ...["*", "*", "*", "*", "*"].map((E, F) =>
      C[F] ? ((E = C[F].trim()), /^[\d\*\/\-,]+$/.test(E) ? E : "*") : "*",
    ),
  ].join(" ");
  try {
    new cron.CronTime(D);
    return D;
  } catch (E) {
    return false;
  }
};
const addTask = (z, A, B, C, D, E) => {
  const F = {
    Vebec: "ing",
    SkzFy: function (J, K) {
      return J != K;
    },
    rrkhZ: "null",
    yJLWC: function (J, K) {
      return J == K;
    },
    tyBkc: "mute",
    qOrav: "announcement",
    GrjWD: "not_announcement",
    GCUas: function (J, K) {
      return J === K;
    },
    CLGgT: "OGyUb",
    YOOIS: "lKIfw",
    MjEjF: function (J, K) {
      return J != K;
    },
    WYGho: function (J, K) {
      return J == K;
    },
    bEGQq: function (J, K) {
      return J == K;
    },
    ilOlq: "off",
    tGQwW: "unmute",
    bBGNw: "Asia/Kolkata",
  };
  const G = F;
  bO[A][E] ||= {};
  if (G.ilOlq == B) {
    return !!bO[A][E][z] && (bO[A][E][z].task.stop(), delete bO[A][E][z]);
  }
  if (!new cron.CronTime("3 " + C + " " + B + " * * *") || (G.tyBkc != A && G.tGQwW != A)) {
    return;
  }
  const H = new cron.CronJob(
    "3 " + C + " " + B + " * * *",
    () => {
      {
        config.logger.info("[" + E + "] " + A.replace("e", G.Vebec) + " " + z);
        const L = D && G.rrkhZ != D ? D : undefined;
        const M = G.tyBkc == A ? G.qOrav : G.GrjWD;
        const N = {
          chat: z,
          msg: L,
          action: M,
          session: E,
        };
        utils.levanter.emit(G.tyBkc, N);
      }
    },
    null,
    true,
    config.TIMEZONE || process.env.TZ || G.bBGNw,
  );
  const I = {
    task: H,
  };
  if (bO[A][E][z]) {
    bO[A][E][z].task.stop();
    delete bO[A][E][z];
  }
  bO[A][E][z] = I;
  return true;
};
exports.addTask = addTask;
exports.groupMuteTask = async (x) => {
  const y = {
    raImT: "mute",
    DmPUF: "unmute",
  };
  const z = await getAllMute(x);
  for (const A of z) {
    const { mute: B, unmute: C } = JSON.parse(A.context);
    if (1 == B.enabled) {
      addTask(A.chat, y.raImT, B.hour, B.minute, B.msg, x);
    }
    if (1 == C.enabled) {
      addTask(A.chat, y.DmPUF, C.hour, C.minute, C.msg, x);
    }
  }
};
const bQ = (x) => utils.levanter.emit("schedule", x);
const bR = (x) => utils.levanter.emit("status.schedule", x);
const createSchedule = async (x, y, z, A, B, C) => {
  const D = {
    dDReL: "once",
    xgzPQ: "Asia/Kolkata",
    KKnQN: function (F, G) {
      return F + G;
    },
    qKbGq: "yyyy LLL dd, hh:mm:ss a",
  };
  if (A) {
    z = await setScheduleMessage(x, y, z, B, C);
  }
  bO.schedule[C] ||= {};
  const E = new cron.CronJob(
    y,
    () => {
      {
        const F = {
          chat: x,
          msg: z,
          time: y,
          session: C,
        };
        bQ(F);
        if (D.dDReL === B) {
          E.stop();
          delete bO.schedule[C]["" + x + y];
          delScheduleMessage(x, y, C);
        }
      }
    },
    null,
    true,
    config.TIMEZONE || process.env.TZ || D.xgzPQ,
  );
  bO.schedule[C]["" + x + y] = {
    chat: x,
    time: y,
    task: E,
  };
  return D.KKnQN(E.nextDate().toFormat(D.qKbGq), " " + E.cronTime.timeZone);
};
const createStatusSchedule = async (x, y, z, A, B = false) => {
  const C = {
    WRnbj: "Asia/Kolkata",
    jidun: function (E, F) {
      return E + F;
    },
    IBwvr: "yyyy LLL dd, hh:mm:ss a",
  };
  bO.schedule[A] ||= {};
  if (!B) {
    z = z.join(", ");
    y = await setScheduleStatus(x, y, z, A);
  }
  const D = new cron.CronJob(
    x,
    () => {
      {
        const F = {
          time: x,
          msg: y,
          session: A,
          jids: z,
        };
        bR(F);
        delScheduleStatus(x, A);
        D.stop();
        delete bO.schedule[A][x];
      }
    },
    null,
    true,
    config.TIMEZONE || process.env.TZ || C.WRnbj,
  );
  bO.schedule[A][x] = {
    time: x,
    task: D,
  };
  return C.jidun(D.nextDate().toFormat(C.IBwvr), " " + D.cronTime.timeZone);
};
exports.createStatusSchedule = createStatusSchedule;
exports.scheduleMessageStatusTask = async (x) => {
  const y = {
    FEeto: function (A, B, C, D, E, F) {
      return A(B, C, D, E, F);
    },
  };
  const z = await getScheduleStatus(x, 1);
  for (const A of z) {
    await y.FEeto(createStatusSchedule, A.time, JSON.parse(A.msg), A.jids, x, true);
  }
};
exports.scheduleMessageTask = async (x) => {
  const z = await getScheduleMessage(0, x, 1);
  for (const A of z) {
    const B = JSON.parse(A.msg);
    await createSchedule(A.chat, A.time, B, false, B.once, x);
  }
};
exports.deleteScheduleTask = async (y, z, A) => {
  const B = {
    gMMaC: function (F, G) {
      return F === G;
    },
    MTkSn: "all",
    RZutw: function (F, G) {
      return F !== G;
    },
    mgfMz: "Vqean",
    EXzKr: "Iezis",
  };
  const C = B;
  if (!bO.schedule[A]) {
    return;
  }
  if (C.MTkSn === y) {
    for (const F in bO.schedule[A]) {
      {
        const G = bO.schedule[A][F];
        if (G.chat) {
          G.task.stop();
          delete bO.schedule[A][F];
        }
      }
    }
    return;
  }
  const D = "" + y + z;
  const E = bO.schedule[A][D];
  if (E) {
    E.task.stop();
    delete bO.schedule[A][D];
  }
};
exports.createSchedule = createSchedule;
exports.deleteScheduleStatusTask = async (x, y) => {
  const z = {
    LhaEj: "all",
  };
  if (!bO.schedule[y]) {
    return;
  }
  if (z.LhaEj === x) {
    for (const B in bO.schedule[y]) {
      {
        const C = bO.schedule[y][B];
        if (!C.chat) {
          C.task.stop();
          delete bO.schedule[y][B];
        }
      }
    }
    return;
  }
  const A = bO.schedule[y][x];
  if (A) {
    A.task.stop();
    delete bO.schedule[y][x];
  }
};
