/* LOST STARWAYS - two-word (VERB NOUN [PREP NOUN]) parser */
(function (G) {
  var S = G.Starways;

  // Build lookup tables: phrase -> canonical
  var verbPhrases = [];   // [{words:[...], verb}]
  Object.keys(S.VERBS).forEach(function (v) {
    S.VERBS[v].forEach(function (p) { verbPhrases.push({ words: p.split(" "), verb: v }); });
  });
  verbPhrases.sort(function (a, b) { return b.words.length - a.words.length; });

  var dirWord = {};
  Object.keys(S.DIRS).forEach(function (d) { S.DIRS[d].forEach(function (w) { dirWord[w] = d; }); });

  var sysWord = {};
  Object.keys(S.SYSTEM).forEach(function (c) { S.SYSTEM[c].forEach(function (w) { sysWord[w] = c; }); });

  // ---- typo tolerance ----
  // Damerau-Levenshtein distance (a swapped pair of letters counts as one mistake)
  function dist(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
      var c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }
  function allowed(w) { return w.length <= 3 ? 0 : w.length <= 5 ? 1 : 2; }
  // Best candidate within the allowed number of mistakes, or null
  S.fuzzy = function (word, candidates) {
    var max = allowed(word), best = null, bd = 99;
    if (!max || /^\d+$/.test(word)) return null;
    candidates.forEach(function (c) {
      if (c.indexOf(" ") >= 0 || c.length < 3 || Math.abs(c.length - word.length) > max) return;
      var n = dist(word, c);
      if (n <= max && n < bd) { bd = n; best = c; }
    });
    return best;
  };
  var verbWords = verbPhrases.map(function (v) { return v.words[0]; });
  var fixWords = verbWords.concat(Object.keys(dirWord), Object.keys(sysWord));
  // Common slips that the distance rule misses (too short, or too far off)
  S.MISSPELLINGS = { lok: "look", loook: "look", exmine: "examine", examin: "examine", tke: "take", tak: "take",
    invetory: "inventory", inventry: "inventory", lit: "light", foward: "forward", fowards: "forward", got: "goto", gto: "goto",
    bak: "back", lft: "left", rite: "right", rigt: "right", dwn: "down", opn: "open", clim: "climb", thow: "throw",
    scredriver: "screwdriver", screwdiver: "screwdriver", screwdrvier: "screwdriver", transalator: "translator",
    translater: "translator", tranlator: "translator", keypd: "keypad", telescop: "telescope" };

  S.dirOf = function (word) {
    if (!word) return null;
    var w = String(word).trim().split(" ");
    return dirWord[w[0]] && w.length === 1 ? dirWord[w[0]] : null;
  };

  function tokenize(text) {
    return String(text || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean);
  }

  S.parse = function (text) {
    var raw = String(text || "").toLowerCase().replace(/[^a-z0-9 ?]+/g, " ").replace(/\s+/g, " ").trim();
    if (!raw) return null;
    if (sysWord[raw]) return { system: sysWord[raw], raw: raw };

    var t = tokenize(text), fixed = [];
    if (!t.length) return null;
    // Known slips anywhere in the line
    t = t.map(function (w) { var m = S.MISSPELLINGS[w]; if (m && m !== w) { fixed.push(m); return m; } return w; });
    // First word: if it isn't a verb, direction or system word, try to correct it
    if (!dirWord[t[0]] && !sysWord[t[0]] && verbWords.indexOf(t[0]) < 0 && !/^\d+$/.test(t[0])) {
      var f = S.fuzzy(t[0], fixWords);
      if (f) { fixed.push(f); t[0] = f; }
    }
    var p = parse2(t, raw);
    if (p && fixed.length) p.fixed = fixed;
    return p;
  };

  function parse2(t, raw) {
    if (t.length === 1 && sysWord[t[0]]) return { system: sysWord[t[0]], raw: t[0] };

    // A bare number is a code: "7304" == "type 7304"
    if (t.length <= 4 && t.every(function (x) { return /^\d+$/.test(x); })) {
      return { verb: "type", n1: t.join(""), n2: "", raw: raw };
    }
    // A bare direction: "f", "forward", "go north"...
    if (t.length === 1 && dirWord[t[0]]) return { verb: "go", n1: dirWord[t[0]], n2: "", raw: raw };

    // Longest verb phrase at the start
    var verb = null, used = 0;
    for (var i = 0; i < verbPhrases.length; i++) {
      var vp = verbPhrases[i], ok = vp.words.length <= t.length;
      for (var j = 0; ok && j < vp.words.length; j++) if (t[j] !== vp.words[j]) ok = false;
      if (ok) { verb = vp.verb; used = vp.words.length; break; }
    }
    if (!verb) return { unknown: t[0], raw: raw };

    var rest = t.slice(used).filter(function (w) { return S.STOPWORDS.indexOf(w) < 0; });

    // "enter 7304" / "enter code 7304" -> type
    if ((verb === "enter" || verb === "type") && rest.some(function (w) { return /\d/.test(w); })) {
      return { verb: "type", n1: rest.filter(function (w) { return /^\d+$/.test(w); }).join(""), n2: "", raw: raw };
    }

    // "climb down", "run forward"
    if (rest.length === 1 && dirWord[rest[0]]) return { verb: verb, n1: dirWord[rest[0]], n2: "", raw: raw };

    // Split at the first preposition: "give food to hermit"
    var n1 = rest, n2 = [];
    for (var k = 0; k < rest.length; k++) {
      if (S.PREPS.indexOf(rest[k]) >= 0) {
        n1 = rest.slice(0, k);
        n2 = rest.slice(k + 1).filter(function (w) { return S.PREPS.indexOf(w) < 0; });
        break;
      }
    }
    if (!n1.length && n2.length) { n1 = n2; n2 = []; }   // "jump into portal" -> jump portal

    var p = { verb: verb, n1: n1.join(" "), n2: n2.join(" "), raw: raw };
    // "go north", "climb down", "run forward"
    if (p.n1 && dirWord[p.n1]) p.n1 = dirWord[p.n1];
    return p;
  }
})(typeof window !== "undefined" ? window : globalThis);
