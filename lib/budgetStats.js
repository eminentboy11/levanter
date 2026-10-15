function am(q) {
  const v = {
    WgiuO: "income",
    gZmlZ: "other",
    nBKLH: function (K, L) {
      return K * L;
    },
  };
  let w = 0,
    x = 0;
  const z = {},
    A = {},
    B = [];
  for (const K of q) {
    {
      const M = v.WgiuO === K.type ? "+" : "-";
      v.WgiuO === K.type ? (w += K.amount) : (x += K.amount);
      const N = K.category || v.gZmlZ,
        O = {};
      ((O.income = 0x0), (O.expense = 0x0), z[N] || (z[N] = O), (z[N][K.type] += K.amount));
      const P = K.day + " " + K.month + " " + K.year,
        Q = {};
      ((Q.income = 0x0),
        (Q.expense = 0x0),
        A[P] || (A[P] = Q),
        (A[P][K.type] += K.amount),
        B.push([
          "" + K.id,
          K.day + " " + K.month + " " + K.year,
          K.category + " " + (K.remark ? "(" + K.remark + ")" : ""),
          "" + M + K.amount,
        ]));
    }
  }
  const C = w - x,
    D = Object.keys(A).length || 1,
    E = Math.round(x / D),
    F = Math.round(w / D),
    G = w > 0 ? Math.round(v.nBKLH(C / w, 100)) : 0,
    H = Object.entries(z)
      .filter(([, R]) => R.expense > 0)
      .sort((R, S) => S[1].expense - R[1].expense)
      .slice(0, 5)
      .map(([R, S]) => ({
        category: R,
        amount: S.expense,
        percentage: x > 0 ? Math.round((S.expense / x) * 100) : 0,
      })),
    I = Object.entries(z)
      .filter(([, R]) => R.income > 0)
      .sort((R, S) => S[1].income - R[1].income)
      .slice(0, 5)
      .map(([R, S]) => ({
        category: R,
        amount: S.income,
        percentage: w > 0 ? Math.round((S.income / w) * 100) : 0,
      })),
    J = {};
  ((J.totalIncome = w), (J.totalExpense = x));
  ((J.netEarn = C), (J.savingsRate = G), (J.dailyAvgExpense = E));
  ((J.dailyAvgIncome = F), (J.dayCount = D), (J.topExpenseCategories = H));
  ((J.topIncomeCategories = I), (J.rows = B));
  return J;
}
const an = {};
((an.computeBudgetStats = am), (module.exports = an));
