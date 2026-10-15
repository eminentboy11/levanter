const { loadBaileys } = require("./baileys");
const path = require("path");
const { existsSync, writeFileSync, readFileSync } = require("fs-extra");
const Wcg = require("./class/Wcg");
const { getBuffer } = require("./fetch");
let ag;
const ah = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
const ai = (z = "") => z.replace("@s.whatsapp.net", "").replace("@lid", "");
const utils = require("./utils");
const config = require("./config");
const { lang } = require(".");
const am =
  "https://gist.githubusercontent.com/lyfe00011/dc86b4db7c6eafe5a57c3390adb26dfb/raw/word.txt";
function an(A) {
  const B = {
    id: A,
    longest_word: "",
    word_count: 0,
    letter_count: 0,
  };
  return B;
}
function ao(A) {
  const B = {
    mIQRo: function (D, E) {
      return D - E;
    },
    wrmTi: function (D, E) {
      return D > E;
    },
    FyeXt: function (D, E) {
      return D === E;
    },
    dxQTk: "CyaDt",
    bnaKu: "rEMxz",
    kHLmn: function (D, E) {
      return D * E;
    },
    eYlHI: function (D, E) {
      return D + E;
    },
  };
  const C = B;
  for (let D = A.length - 1; D > 0; D--) {
    {
      const F = Math.floor(C.kHLmn(Math.random(), D + 1));
      const G = A[D];
      A[D] = A[F];
      A[F] = G;
    }
  }
  return A;
}
const ap = (z) => (z ? "hard" : "easy");
function aq(z) {
  const A = new Date(null);
  A.setSeconds(z);
  return A.toISOString().slice(11, 19);
}
exports.wcg = {
  ie: "",
  room: {},
  _ensureDict: async function () {
    const z = {
      QtaSa: "../word.txt",
      bHAUP: "failed to download word.txt",
      VqWEg: "utf8",
    };
    if (this.ie) {
      return this.ie;
    }
    const A = path.join(__dirname, z.QtaSa);
    if (!existsSync(A)) {
      {
        const B = await getBuffer(am);
        if (!B || !B.buffer) {
          throw new Error(z.bHAUP);
        }
        writeFileSync(A, B.buffer, z.VqWEg);
      }
    }
    this.ie = new Wcg(readFileSync(A, z.VqWEg));
    return this.ie;
  },
  end: async function (A, B, C) {
    const D = {
      oKZEF: "missing session",
      bbBbE: function (F, G) {
        return F === G;
      },
    };
    if (!config[C]) {
      throw new Error(D.oKZEF);
    }
    const E = {
      text: lang.plugins.wcg.game_ends,
    };
    if (!config[C].sock) {
      ag ||= await loadBaileys();
      await ag.delay(10000);
    }
    if (this.room[A] && D.bbBbE(this.room[A].c, B)) {
      this.room[A].state = -1;
      delete this.room[A];
      await config[C].sock.sendMessage(A, E, {
        ephemeralExpiration: utils.expiration.get(A),
      });
    }
  },
  quit: async function (A, B, C) {
    const D = {
      RtUBl: function (F, G) {
        return F === G;
      },
    };
    const E = D;
    if (E.RtUBl(0, this.room[A].state) && this.room[A].players[B]) {
      delete this.room[A].players[B];
      this.room[A].participants = this.room[A].participants.filter((F) => F != B);
    }
  },
  get_char: function (A, B) {
    const C = {
      auHZK: function (F, G) {
        return F === G;
      },
      rmGCU: "random",
      MjIrp: function (F, G) {
        return F * G;
      },
      CFRTZ: function (F, G) {
        return F - G;
      },
    };
    const D = C;
    const E = D.auHZK(D.rmGCU, this.room[A].mode)
      ? ah[Math.round(D.MjIrp(Math.random(), ah.length))] || "L"
      : B.charAt(B.length - 1).toUpperCase();
    this.room[A].current.letter = E;
  },
  start_game: async function (C, D, E, F, G = "easy") {
    const H = {
      zagtz: function (J, K) {
        return J in K;
      },
      DdVEN: function (J, K) {
        return J == K;
      },
      FXOTS: function (J, K) {
        return J === K;
      },
      AgpYb: "hard",
      czstk: "Hard",
      VHYrb: "Easy",
      YSKXl: "TaGIn",
      VTjER: "BWNpK",
      xPSMt: "word list unavailable — try again later",
    };
    const I = H;
    if (I.zagtz(C, this.room)) {
      if (I.DdVEN(0, this.room[C].state)) {
        this.room[C].m = I.FXOTS(I.AgpYb, G.toLowerCase());
        const J = this.room[C].m ? I.czstk : I.VHYrb;
        return await config[F].sock.sendMessage(C, {
          text: lang.plugins.wcg.mode_update.format(J),
        });
      }
    } else {
      try {
        await this._ensureDict();
      } catch (M) {
        const N = {
          text: I.xPSMt,
        };
        if (config[F]?.sock) {
          await config[F].sock.sendMessage(C, N);
        }
        return;
      }
      this.room[C] = {
        m: I.FXOTS(I.AgpYb, G.toLowerCase()),
        mode: E,
        c: D,
        start: 0,
        state: 0,
        paused: false,
        used: [],
        players: {},
        joined: 0,
        time: 59,
        words: 0,
        round: 0,
        i: 0,
        cool: 40,
        participants: [],
        current: {
          player: "",
          size: 3,
          time: 40,
          next: "",
          letter: "",
        },
      };
      await this.main(C, D, F);
    }
  },
  exist: function (z) {
    return this.ie.isWord(z.toLowerCase());
  },
  start: async function (A, B) {
    const C = {
      XqJlS: function (E, F) {
        return E in F;
      },
      MqcGB: function (E, F) {
        return E == F;
      },
      MaKZB: function (E, F) {
        return E === F;
      },
    };
    const D = C;
    if (D.XqJlS(A, this.room) && D.MqcGB(0, this.room[A].state) && D.MaKZB(this.room[A].c, B)) {
      this.room[A].time = 0;
    }
  },
  isWord: async function (D, E, F, G, H) {
    const I = {
      QrkRR: function (O, P) {
        return O in P;
      },
      CPJjT: function (O, P) {
        return O != P;
      },
      FHQOO: function (O, P) {
        return O != P;
      },
      ZygGJ: function (O, P) {
        return O != P;
      },
      POROV: function (O, P) {
        return O < P;
      },
      poSWK: function (O, P) {
        return O > P;
      },
    };
    if (
      !I.QrkRR(D, this.room) ||
      I.CPJjT(1, this.room[D].state) ||
      I.FHQOO(this.room[D].current.player, E) ||
      !this.room[D].participants.includes(E)
    ) {
      return false;
    }
    if (this.room[D].paused) {
      return;
    }
    const J = {
      text: lang.plugins.wcg.already_used,
    };
    F = F.toLowerCase();
    if (this.room[D].used.includes(F)) {
      return await config[H].sock.sendMessage(D, J, {
        ephemeralExpiration: utils.expiration.get(D),
        quoted: G,
      });
    }
    if (I.ZygGJ(F.charAt(0).toUpperCase(), this.room[D].current.letter)) {
      return await config[H].sock.sendMessage(
        D,
        {
          text: lang.plugins.wcg.not_starting_with.format(this.room[D].current.letter),
        },
        {
          ephemeralExpiration: utils.expiration.get(D),
          quoted: G,
        },
      );
    }
    if (I.POROV(F.length, this.room[D].current.size)) {
      return await config[H].sock.sendMessage(
        D,
        {
          text: lang.plugins.wcg.length_limit.format(this.room[D].current.size),
        },
        {
          ephemeralExpiration: utils.expiration.get(D),
          quoted: G,
        },
      );
    }
    const K = {
      text: lang.plugins.wcg.not_in_list,
    };
    if (!this.ie.isWord(F)) {
      return await config[H].sock.sendMessage(D, K, {
        ephemeralExpiration: utils.expiration.get(D),
        quoted: G,
      });
    }
    this.room[D].paused = true;
    this.room[D].current.time = this.room[D].cool;
    this.room[D].used.push(F);
    this.room[D].words++;
    const L = {
      text: "✅",
      key: G.key,
    };
    const M = {
      react: L,
    };
    const N = M;
    this.get_char(D, F);
    this.room[D].players[E].word_count++;
    if (I.poSWK(F.length, this.room[D].players[E].letter_count)) {
      this.room[D].players[E].longest_word = F;
      this.room[D].players[E].letter_count = F.length;
    }
    await this.trun(D, H);
    ag ||= await loadBaileys();
    await ag.delay(200);
    await config[H].sock.sendMessage(D, N, {
      ephemeralExpiration: utils.expiration.get(D),
    });
    return true;
  },
  trun: async function (z, A) {
    const B = {
      EgnvL: function (C, D) {
        return C <= D;
      },
      rMAtO: function (C, D) {
        return C < D;
      },
      CmIvE: function (C, D) {
        return C == D;
      },
      ckiPW: function (C, D) {
        return C % D;
      },
      XGONy: function (C, D) {
        return C > D;
      },
      sURTm: function (C, D) {
        return C(D);
      },
    };
    if (this.room[z]) {
      if (B.EgnvL(this.room[z].i, 0)) {
        this.room[z].i = this.room[z].participants.length;
        if (
          (this.room[z].m && B.rMAtO(this.room[z].current.size, 13)) ||
          (B.CmIvE(B.ckiPW(this.room[z].round, 3), 0) && B.rMAtO(this.room[z].current.size, 13))
        ) {
          this.room[z].current.size++;
        }
        if (
          (this.room[z].m && B.XGONy(this.room[z].cool, 20)) ||
          (B.XGONy(this.room[z].cool, 20) && B.CmIvE(B.ckiPW(this.room[z].round, 4), 0))
        ) {
          this.room[z].cool -= 5;
        }
        this.room[z].round++;
      }
      this.room[z].i--;
      this.room[z].current.time = this.room[z].cool;
      this.room[z].current.player = this.room[z].participants[0];
      this.room[z].current.next = this.room[z].participants[1];
      this.room[z].participants.push(this.room[z].participants.shift());
      await config[A].sock.sendMessage(
        z,
        {
          text: lang.plugins.wcg.turn_info.format(
            B.sURTm(ai, this.room[z].current.player),
            B.sURTm(ai, this.room[z].current.next),
            this.room[z].current.letter,
            this.room[z].current.size,
            this.room[z].participants.length,
            this.room[z].joined,
            this.room[z].current.time,
            this.room[z].words,
          ),
          mentions: [this.room[z].current.player, this.room[z].current.next],
        },
        {
          ephemeralExpiration: utils.expiration.get(z),
        },
      );
      this.room[z].paused = false;
    }
  },
  sub_main: async function (z, A) {
    const B = {
      rCoga: function (C, D) {
        return C(D);
      },
      HPaRA: function (C, D) {
        return C * D;
      },
      ZaALk: function (C, D) {
        return C == D;
      },
      Ayvgi: function (C, D) {
        return C < D;
      },
      vivfk: function (C, D) {
        return C - D;
      },
      qTjqJ: function (C, D) {
        return C / D;
      },
      FJkij: function (C, D) {
        return C / D;
      },
    };
    if (this.room[z]) {
      this.room[z].start = new Date().getTime();
      this.room[z].participants = B.rCoga(ao, this.room[z].participants);
      this.room[z].current.letter = ah[Math.round(B.HPaRA(Math.random(), ah.length))] || "L";
      this.room[z].i = this.room[z].participants.length;
      await this.trun(z, A);
      while (B.ZaALk(1, this.room[z].state)) {
        ag ||= await loadBaileys();
        await ag.delay(1000);
        if (!config[A].sock) {
          continue;
        }
        this.room[z].current.time--;
        const C = this.room[z].participants.length;
        const D = this.room[z].current.player;
        const E = this.room[z].current.next;
        if (B.Ayvgi(this.room[z].current.time, 0)) {
          {
            this.room[z].participants = this.room[z].participants.filter((F) => F != D);
            await config[A].sock.sendMessage(
              z,
              {
                text: lang.plugins.wcg.timeout.format(ai(D)),
                mentions: [D],
              },
              {
                ephemeralExpiration: utils.expiration.get(z),
              },
            );
            if (2 == C) {
              const F = B.vivfk(
                B.qTjqJ(new Date().getTime(), 1000),
                B.FJkij(this.room[z].start, 1000),
              );
              const G = Object.values(this.room[z].players).reduce((H, I) =>
                I.letter_count > H.letter_count ? I : H,
              );
              this.room[z].state = -1;
              await config[A].sock.sendMessage(
                z,
                {
                  text: lang.plugins.wcg.winner.format(
                    ai(E),
                    this.room[z].words,
                    G.longest_word,
                    G.letter_count,
                    ai(G.id),
                    aq(F),
                  ),
                  mentions: [E, G.id],
                },
                {
                  ephemeralExpiration: utils.expiration.get(z),
                },
              );
              return delete this.room[z];
            }
            await this.trun(z, A);
          }
        }
      }
    }
  },
  join: async function (z, A, B) {
    const C = {
      YXtIs: function (D, E) {
        return D in E;
      },
      sVmVM: function (D, E) {
        return D in E;
      },
      RdRLw: function (D, E) {
        return D == E;
      },
    };
    return (
      C.YXtIs(z, this.room) &&
      !C.sVmVM(A, this.room[z].players) &&
      C.RdRLw(0, this.room[z].state) &&
      !this.room[z].paused &&
      ((this.room[z].players[A] = an(A)),
      this.room[z].participants.push(A),
      this.room[z].joined++,
      await config[B].sock.sendMessage(
        z,
        {
          text: lang.plugins.wcg.joined.format(ai(A)),
          mentions: [A],
        },
        {
          ephemeralExpiration: utils.expiration.get(z),
        },
      ),
      true)
    );
  },
  main: async function (A, B, C) {
    const D = {
      uPUYd: function (E, F) {
        return E > F;
      },
      GQqgi: function (E, F) {
        return E(F);
      },
      LtlIZ: function (E, F) {
        return E == F;
      },
      HWyQb: function (E, F) {
        return E < F;
      },
      KlcjW: function (E, F) {
        return E(F);
      },
    };
    await config[C].sock.sendMessage(
      A,
      {
        text: lang.plugins.wcg.starting.format(D.GQqgi(ap, this.room[A].m)),
      },
      {
        ephemeralExpiration: utils.expiration.get(A),
      },
    );
    ag ||= await loadBaileys();
    await ag.delay(200);
    await this.join(A, B, C);
    while (this.room[A] && D.LtlIZ(0, this.room[A].state)) {
      {
        if (!this.room[A]) {
          return;
        }
        ag ||= await loadBaileys();
        await ag.delay(1000);
        if (config[C].sock) {
          {
            const G = {
              text: lang.plugins.wcg.terminated,
            };
            if (!D.uPUYd(this.room[A].time, 0)) {
              if (D.HWyQb(this.room[A].participants.length, 2)) {
                this.room[A].paused = true;
                await config[C].sock.sendMessage(A, G, {
                  ephemeralExpiration: utils.expiration.get(A),
                });
                delete this.room[A];
                return;
              } else {
                this.room[A].state = 1;
                this.sub_main(A, C);
                return;
              }
            }
            this.room[A].time--;
            if ([15, 30, 44].includes(this.room[A].time)) {
              await config[C].sock.sendMessage(
                A,
                {
                  text: lang.plugins.wcg.starts_in.format(
                    this.room[A].time,
                    D.KlcjW(ap, this.room[A].m),
                    D.uPUYd(this.room[A].participants.length, 1)
                      ? lang.plugins.wcg.players_count.format(this.room[A].participants.length)
                      : "",
                  ),
                },
                {
                  ephemeralExpiration: utils.expiration.get(A),
                },
              );
            }
          }
        }
      }
    }
  },
};
