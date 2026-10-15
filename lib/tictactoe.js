const { setDb } = require("./db/store");
const config = require("./config");
const au = (x) => x[Math.floor(Math.random() * x.length)];
const av = (x) => x.split("@")[0];
const { lang } = require(".");
const ax = {
  X: "❌",
  O: "⭕",
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
};
const ay = () => [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const az = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const aA = (x) => {
  if (!shift) {
    return shift;
  }
  for (const A of az) {
    {
      const B = x[A[0]];
      const C = x[A[1]];
      const D = x[A[2]];
      if (B == C && C == D && B && C && D) {
        return true;
      }
    }
  }
  return false;
};
const aC = (x) => ax[x];
const aD = () => [..."".padStart(9, " ")].reverse().map((x, z) => aC(z + 1));
const aF = (x, z) =>
  (x.slice(0, 3).join("") + "\n" + x.slice(3, 6).join("") + "\n" + x.slice(6).join(""))
    .replace(/X/g, ax.X)
    .replace(/O/g, ax.O);
const aG = (z, A) => {
  let D = config[z].db.game.room.tic;
  if (config[z].db.game.room[A].length > 2) {
    let E = config[z].db.game.room[A].shift();
    D[E] = ax[E + 1];
    config[z].db.game.room.tic = D;
    config[z].db.game.room.tac[E] = undefined;
  }
  return (D.slice(0, 3).join("") + "\n" + D.slice(3, 6).join("") + "\n" + D.slice(6).join(""))
    .replace(/X/g, ax.X)
    .replace(/O/g, ax.O);
};
const aH = (x, z, A, B, C, D = "infinite") =>
  "" +
  (A ? lang.plugins.tictactoe.header + "\n\n" : "") +
  lang.plugins.tictactoe.players +
  "\n" +
  aC("X") +
  " : @" +
  x +
  "\n" +
  aC("O") +
  " : @" +
  z +
  "\n\n" +
  (A ? lang.plugins.tictactoe.current_player + " : @" + A + " \n\n" : "") +
  (A && D === "infinite" ? aG(B, C) : aF(config[B].db.game.room.tic));
const aI = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";
const test = require("./test/test");
const aK = test.iChecker() == aI;
if (aK) {
  exports.ticTacToe = async (x, z, A, B, C) => {
    const D = {
      LqgFL: "normal",
      sLKKG: "infinite",
      eTEEm: function (E, F, G, H, I, J, K) {
        return E(F, G, H, I, J, K);
      },
    };
    if (config[B].db.game.state && A) {
      exports.deleteTicTacToe(B);
    }
    if (0 == config[B].db.game.state && A) {
      {
        const E = [z, A];
        const F = {
          fi: !!C,
          X: z,
          O: A,
          tic: aD(),
          currentPlayer: au(E),
          players: E,
          tac: ay(),
          id: x,
          mode: D.LqgFL === C ? D.LqgFL : D.sLKKG,
          [z]: [],
          [A]: [],
        };
        config[B].db.game.room = F;
        config[B].db.game.state = true;
        await setDb(B);
        return {
          text: D.eTEEm(aH, av(F.X), av(F.O), av(F.currentPlayer), B, F.currentPlayer, F.mode),
          code: 200,
        };
      }
    }
    return false;
  };
}
exports.isTicTacToe = async (C, D, E, F) => {
  const G = {
    bpsVB: "normal",
    HSExv: function (K, L) {
      return K - L;
    },
    UldVs: function (K, L) {
      return K == L;
    },
    Dioka: function (K, L, M, N, P, Q, R) {
      return K(L, M, N, P, Q, R);
    },
    vEvYU: function (K, L) {
      return K == L;
    },
    MibTA: function (K, L, M, N, P, Q, R) {
      return K(L, M, N, P, Q, R);
    },
  };
  const H = {
    code: 404,
    text: "",
  };
  if (
    !config[F].db.game.state ||
    (config[F].db.game.room.players && !config[F].db.game.room.players.includes(E)) ||
    config[F].db.game.room.id != D ||
    config[F].db.game.room.currentPlayer != E ||
    isNaN(C) ||
    (G.bpsVB === config[F].db.game.room.mode && C > 9)
  ) {
    return H;
  }
  C = G.HSExv(C.charAt(0), 1);
  const I = config[F].db.game.room.tic[C];
  const J = {
    text: lang.plugins.tictactoe.already_occupied,
    code: 300,
  };
  if ("X" == I || "O" == I) {
    return J;
  }
  config[F].db.game.room.tic[C] = config[F].db.game.room.X == E ? "X" : "O";
  config[F].db.game.room.tac[C] = config[F].db.game.room.X == E ? "X" : "O";
  if (G.UldVs(1, aA(config[F].db.game.room.tac))) {
    const K = [
      config[F].db.game.room.currentPlayer != config[F].db.game.room.O
        ? config[F].db.game.room.X
        : config[F].db.game.room.O,
      config[F].db.game.room.currentPlayer != config[F].db.game.room.O
        ? config[F].db.game.room.O
        : config[F].db.game.room.X,
      G.Dioka(
        aH,
        av(config[F].db.game.room.X),
        av(config[F].db.game.room.O),
        undefined,
        F,
        undefined,
        config[F].db.game.room.mode,
      ),
      config[F].db.game.room.O,
    ];
    const L = {
      text: K,
      code: 201,
    };
    config[F].db.game.state = false;
    config[F].db.game.room = {};
    await setDb(F);
    return L;
  }
  if (G.vEvYU(0, config[F].db.game.room.tac.filter((M) => !M).length)) {
    {
      const M = [
        config[F].db.game.room.O,
        config[F].db.game.room.X,
        G.MibTA(
          aH,
          av(config[F].db.game.room.X),
          av(config[F].db.game.room.O),
          undefined,
          F,
          undefined,
          config[F].db.game.room.mode,
        ),
        config[F].db.game.room.O,
      ];
      const N = {
        code: 403,
        text: M,
      };
      config[F].db.game.state = false;
      config[F].db.game.room = {};
      await setDb(F);
      return N;
    }
  }
  config[F].db.game.room[config[F].db.game.room.currentPlayer].push(C);
  config[F].db.game.room.currentPlayer =
    config[F].db.game.room.X == E ? config[F].db.game.room.O : config[F].db.game.room.X;
  await setDb(F);
  return {
    text: [
      config[F].db.game.room.O,
      config[F].db.game.room.X,
      G.MibTA(
        aH,
        av(config[F].db.game.room.X),
        av(config[F].db.game.room.O),
        av(config[F].db.game.room.currentPlayer),
        F,
        config[F].db.game.room.currentPlayer,
        config[F].db.game.room.mode,
      ),
      config[F].db.game.room.O,
    ],
    code: 301,
  };
};
exports.isGameActive = (z) => {
  const A = {
    HeqOe: function (E, F, G, H, I, J, K) {
      return E(F, G, H, I, J, K);
    },
  };
  const B = config[z].db.game.state
    ? A.HeqOe(
        aH,
        av(config[z].db.game.room.X),
        av(config[z].db.game.room.O),
        av(config[z].db.game.room.currentPlayer),
        z,
        config[z].db.game.room.currentPlayer,
        config[z].db.game.room.mode,
      )
    : "";
  const C = [config[z].db.game.room.X, config[z].db.game.room.O];
  const D = {
    state: config[z].db.game.state,
    text: B,
    mentionedJid: C,
  };
  return D;
};
exports.deleteTicTacToe = async (x) => {
  if (config[x].db.game.state) {
    config[x].db.game.room = {};
    config[x].db.game.state = false;
    await setDb(x);
    return true;
  }
};
