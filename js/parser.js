/* THE LOST STARWAYS - two-word (VERB NOUN [PREP NOUN]) parser */
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

    var t = tokenize(text);
    if (!t.length) return null;

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
  };
})(typeof window !== "undefined" ? window : globalThis);
