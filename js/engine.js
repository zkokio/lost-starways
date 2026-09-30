/* LOST STARWAYS - game engine (no DOM; talks to the UI through `io`) */
(function (G) {
  var S = G.Starways;
  var SAVE_KEY = "starways.save.v1";

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function arr(v) { return v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]; }
  function up(s) { return String(s).toUpperCase(); }
  function article(name) { return (/^[aeiou]/i.test(name) ? "an " : "a ") + name; }
  function store() { try { return G.localStorage || null; } catch (e) { return null; } }

  var Engine = S.Engine = function (io) {
    this.io = io || {};
    this.state = null;
    this.snapshot = null;
    this.depth = 0;
    this.confirmRestart = false;
  };
  var E = Engine.prototype;

  /* ---------- output helpers ---------- */
  E.say = function (text, cls) {
    if (text === undefined || text === null || text === "") return;
    var self = this;
    String(text).split("\n").forEach(function (line) {
      if (self.io.out) self.io.out(self.fill(line), cls || "");
    });
  };
  E.fill = function (s) {
    var st = this.state || {};
    return String(s)
      .replace(/\{score\}/g, st.score || 0)
      .replace(/\{parts\}/g, (st.parts || []).length)
      .replace(/\{total\}/g, S.PARTS_TOTAL)
      .replace(/\{moves\}/g, st.moves || 0);
  };
  E.sound = function (n) { if (this.io.sound) this.io.sound(n); };
  E.status = function () {
    if (!this.io.status || !this.state) return;
    var p = this.pack();
    this.io.status({
      land: p ? p.title : "", score: this.state.score, parts: this.state.parts.length,
      total: S.PARTS_TOTAL, moves: this.state.moves
    });
  };

  /* ---------- lookups ---------- */
  E.pack = function (pid) { return S.packs[pid || (this.state && this.state.pack)]; };
  E.mainPacks = function () {
    return Object.keys(S.packs).map(function (k) { return S.packs[k]; })
      .filter(function (p) { return p.type === "main"; })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  };
  E.sidePacks = function () {
    return Object.keys(S.packs).map(function (k) { return S.packs[k]; })
      .filter(function (p) { return p.type === "side"; });
  };
  E.ikey = function (id, pid) {
    if (id.indexOf(":") >= 0) return id;
    pid = pid || this.state.pack;
    var p = S.packs[pid];
    if (p && p.items && p.items[id]) return pid + ":" + id;
    if (S.packs.core && S.packs.core.items[id]) return "core:" + id;
    return pid + ":" + id;
  };
  E.rkey = function (id, pid) { return id.indexOf(":") >= 0 ? id : (pid || this.state.pack) + ":" + id; };
  E.fkey = function (name, pid) { return name.indexOf(":") >= 0 ? name : (pid || this.state.pack) + ":" + name; };
  E.idef = function (key) {
    var i = key.indexOf(":"), p = S.packs[key.slice(0, i)];
    return p && p.items ? p.items[key.slice(i + 1)] : null;
  };
  E.rdef = function (key) {
    key = key || this.state.room;
    var i = key.indexOf(":"), p = S.packs[key.slice(0, i)];
    return p && p.rooms ? p.rooms[key.slice(i + 1)] : null;
  };
  E.iname = function (key) {
    var d = this.idef(key);
    return d ? this.text(d.name || key.split(":")[1], key.split(":")[0]) : key;
  };
  E.inv = function () {
    var w = this.state.where;
    return Object.keys(w).filter(function (k) { return w[k] === "inv"; });
  };
  E.itemsHere = function () {
    var w = this.state.where, h = this.state.hidden, r = this.state.room;
    return Object.keys(w).filter(function (k) { return w[k] === r && !h[k]; });
  };
  E.isLit = function () {
    var w = this.state.where[ "core:candle" ];
    return !!this.state.flags["core:lit"] && (w === "inv" || w === this.state.room);
  };
  E.canSee = function () { var r = this.rdef(); return !(r && r.dark) || this.isLit(); };

  /* ---------- text & conditions ---------- */
  // text: "string" | ["line", "line"] | [{"if": cond, "text": ...}, {"text": ...}]
  E.text = function (v, pid) {
    if (v === undefined || v === null) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v)) {
      if (v.length && typeof v[0] === "object") {
        for (var i = 0; i < v.length; i++) if (!v[i].if || this.check(v[i].if, pid)) return this.text(v[i].text, pid);
        return "";
      }
      return v.join("\n");
    }
    return String(v);
  };

  E.check = function (cond, pid) {
    if (cond === undefined || cond === null || cond === "") return true;
    var self = this;
    if (Array.isArray(cond)) return cond.every(function (c) { return self.check(c, pid); });
    if (typeof cond === "object") {
      if (cond.any) return cond.any.some(function (c) { return self.check(c, pid); });
      if (cond.all) return self.check(cond.all, pid);
      return true;
    }
    var s = String(cond).trim(), neg = false;
    if (s.charAt(0) === "!") { neg = true; s = s.slice(1); }
    var res = this.check1(s, pid || this.state.pack);
    return neg ? !res : res;
  };
  E.check1 = function (s, pid) {
    var st = this.state;
    if (s === "lit") return this.isLit();
    var i = s.indexOf(":");
    if (i < 0) return !!st.flags[this.fkey(s, pid)];
    var type = s.slice(0, i), arg = s.slice(i + 1), k;
    switch (type) {
      case "has": return st.where[this.ikey(arg, pid)] === "inv";
      case "here": k = this.ikey(arg, pid); return st.where[k] === st.room && !st.hidden[k];
      case "near": k = this.ikey(arg, pid); return st.where[k] === "inv" || (st.where[k] === st.room && !st.hidden[k]);
      case "gone": k = this.ikey(arg, pid); return !st.where[k];
      case "in": return st.room === this.rkey(arg, pid);
      case "tag": var r = this.rdef(); return !!(r && r.tags && r.tags.indexOf(arg) >= 0);
      case "parts": return st.parts.length >= +arg;
      case "score": return st.score >= +arg;
      case "visited": return !!st.visited[this.rkey(arg, pid)];
      case "flag":
        var m = arg.match(/^(.+?)\s*(>=|<=|==|=|>|<)\s*(-?\d+)$/);
        if (!m) return !!st.flags[this.fkey(arg, pid)];
        var v = +st.flags[this.fkey(m[1], pid)] || 0, n = +m[3];
        return m[2] === ">=" ? v >= n : m[2] === "<=" ? v <= n : m[2] === ">" ? v > n : m[2] === "<" ? v < n : v === n;
    }
    return false;
  };

  /* ---------- game lifecycle ---------- */
  E.newGame = function () {
    var core = S.packs.core, first = this.mainPacks()[0];
    this.state = {
      v: 1, pack: null, room: null, where: {}, hidden: {}, flags: {}, exits: {},
      score: 0, parts: [], deaths: 0, moves: 0, hints: {}, done: {}, visited: {}, init: {},
      gained: {}, returnTo: null, last: null, ended: false
    };
    this.snapshot = null;
    var st = this.state;
    arr(core.start && core.start.inv).forEach(function (id) { st.where["core:" + id] = "inv"; st.gained["core:" + id] = 1; });
    if (this.io.clear) this.io.clear();
    this.say(this.text(core.intro, "core"), "sys");
    if (!first) return this.say("NO LANDS INSTALLED!", "die");
    this.enterPack(first.id);
  };

  E.initPack = function (pid) {
    var st = this.state, p = S.packs[pid], self = this;
    if (st.init[pid] || !p) return;
    Object.keys(p.rooms || {}).forEach(function (rid) {
      arr(p.rooms[rid].items).forEach(function (id) {
        var k = self.ikey(id, pid);
        if (st.where[k] === undefined) st.where[k] = pid + ":" + rid;
        var d = self.idef(k);
        if (d && d.hidden) st.hidden[k] = 1;
      });
    });
    st.init[pid] = 1;
  };

  E.enterPack = function (pid, roomId) {
    var p = S.packs[pid];
    if (!p) return this.say("THAT LAND IS NOT INSTALLED.", "die");
    this.initPack(pid);
    this.state.pack = pid;
    if (this.io.theme) this.io.theme(p.colors || null);
    if (!this.state.visited["@" + pid]) {
      this.state.visited["@" + pid] = 1;
      this.say("");
      this.say("=== " + up(p.title) + " ===", "head");
      if (p.author) this.say("A LAND BY " + up(p.author), "sys");
      this.say(this.text(p.intro, pid), "sys");
    }
    this.goRoom(this.rkey(roomId || p.start, pid));
  };

  E.goRoom = function (rk) {
    var st = this.state;
    st.room = rk;
    st.pack = rk.split(":")[0];
    this.describe(true);
    var r = this.rdef();
    st.visited[rk] = 1;
    if (r && r.beacon) this.beaconSave(true);
    if (r && r.onEnter) this.runActions(r.onEnter, st.pack, rk + "#enter");
  };

  E.picOps = function () {
    var r = this.rdef(), self = this;
    if (!r) return [["bg", 0]];
    if (!this.canSee()) return [["bg", 0], ["plot", 7, 70, 50, 74, 50]]; // a pair of eyes in the dark...
    var ops = (r.pic || []).slice();
    this.itemsHere().forEach(function (k) { var d = self.idef(k); if (d && d.pic) ops = ops.concat(d.pic); });
    return ops;
  };

  E.drawPic = function (animate) {
    var self = this, pid = this.state.pack;
    if (this.io.pic) this.io.pic(this.picOps(), function (c) { return self.check(c, pid); }, animate);
  };

  E.describe = function (animate) {
    var r = this.rdef(), pid = this.state.pack, self = this;
    this.drawPic(animate);
    if (!r) return this.say("YOU ARE NOWHERE. (MISSING ROOM " + this.state.room + ")", "die");
    this.say("");
    if (!this.canSee()) {
      this.say("DARKNESS", "head");
      this.say("It is pitch dark. You can't see a thing.");
      return;
    }
    this.say(up(this.text(r.name, pid)) + (r.beacon ? "  *BEACON*" : ""), "head");
    this.say(this.text(r.desc, pid), "room");
    if (r.extra) arr(r.extra).forEach(function (x) { if (!x.if || self.check(x.if, pid)) self.say(self.text(x.text, pid), "room"); });
    this.hooksHere().forEach(function (h) { self.say(h.hook.text, "good"); });
    var items = this.itemsHere().filter(function (k) { var d = self.idef(k); return d && !d.scenery; });
    if (items.length) this.say("You can see " + items.map(function (k) { return article(self.iname(k)); }).join(", ") + ".", "items");
    var ex = this.exitList();
    this.say(ex.length ? "EXITS: " + ex.map(up).join(" ") : "NO OBVIOUS EXITS.", "exits");
  };

  E.hooksHere = function () {
    var rk = this.state.room;
    return this.sidePacks().filter(function (p) {
      return p.hook && (p.hook.pack + ":" + p.hook.room) === rk;
    });
  };

  E.exitOf = function (dir) {
    var rk = this.state.room, r = this.rdef(), ov = this.state.exits[rk + ">" + dir];
    if (ov !== undefined) return ov ? { to: ov } : null;
    var hook = this.hooksHere().filter(function (p) { return p.hook.dir === dir; })[0];
    if (hook) return { to: "@" + hook.id };
    var e = r && r.exits && r.exits[dir];
    if (!e) return null;
    return typeof e === "string" ? { to: e } : e;
  };
  E.exitList = function () {
    var self = this;
    return S.DIR_ORDER.filter(function (d) {
      var e = self.exitOf(d);
      return e && !(e.hidden && !self.check(e.if));
    });
  };

  E.move = function (dir) {
    var e = this.exitOf(dir);
    if (!e) return this.say(this.canSee() ? "You can't go that way." : "You stumble about in the dark and bump into something.");
    if (e.if && !this.check(e.if)) {
      if (e.die) return this.die(this.text(e.die));
      return this.say(this.text(e.no) || "You can't go that way.");
    }
    if (e.say) this.say(this.text(e.say));
    var to = e.to;
    if (to && to.charAt(0) === "@") return this.enterSide(to.slice(1));
    if (to) this.goRoom(this.rkey(to));
  };

  E.enterSide = function (pid) {
    this.state.returnTo = this.state.room;
    this.sound("portal");
    this.say("You step through... the world folds around you!", "good");
    this.enterPack(pid);
  };
  E.returnFromSide = function () {
    var rk = this.state.returnTo;
    if (!rk) return this.say("Nothing happens.");
    this.state.returnTo = null;
    this.sound("portal");
    this.say("The world folds again... you are back!", "good");
    var p = this.pack(rk.split(":")[0]);
    if (this.io.theme) this.io.theme(p && p.colors || null);
    this.goRoom(rk);
  };
  E.nextPack = function () {
    var mains = this.mainPacks(), cur = this.state.pack, idx = -1;
    mains.forEach(function (p, i) { if (p.id === cur) idx = i; });
    if (idx < 0) return this.returnFromSide();
    var next = mains[idx + 1];
    this.sound("portal");
    if (next) { this.say("Stars streak past as the portal flings you across the Starways...", "good"); return this.enterPack(next.id); }
    this.state.ended = true;
    this.sound("win");
    this.say("");
    this.say("*** TO BE CONTINUED ***", "head");
    this.say("You have reached the edge of the known Starways. More lands are coming soon!", "good");
    this.say("FINAL SCORE: " + this.state.score + "   RANK: " + this.rank() + "   PARTS: " + this.state.parts.length + "/" + S.PARTS_TOTAL, "good");
    this.say("Type RESTART to play again.", "sys");
    this.status();
  };

  /* ---------- items ---------- */
  E.gain = function (k) {
    var st = this.state, d = this.idef(k);
    st.where[k] = "inv";
    delete st.hidden[k];
    if (!d || st.gained[k]) return;
    st.gained[k] = 1;
    if (d.part) {
      if (st.parts.indexOf(k) < 0) st.parts.push(k);
      var pts = d.points === undefined ? 50 : d.points;
      st.score += pts;
      this.sound("part");
      if (this.io.flash) this.io.flash("part");
      this.say("*** SHIP PART FOUND: " + up(this.iname(k)) + " (" + st.parts.length + "/" + S.PARTS_TOTAL + ") +" + pts + " ***", "part");
    } else if (d.points) {
      st.score += d.points;
      this.say("(+" + d.points + " POINTS)", "good");
    }
  };

  // Resolve a noun phrase to a visible item key.
  E.resolve = function (phrase) {
    if (!phrase) return null;
    if (phrase === "it" || phrase === "them") return this.state.last;
    var scope = this.inv(), self = this;
    if (this.canSee()) scope = scope.concat(this.itemsHere());
    var words = phrase.split(" "), last = words[words.length - 1], best = null, bestScore = 0;
    scope.forEach(function (k) {
      var d = self.idef(k); if (!d) return;
      var ws = arr(d.words).length ? arr(d.words) : [k.split(":")[1]];
      var sc = 0;
      ws.forEach(function (w) {
        w = String(w).toLowerCase();
        if (w === phrase) sc = Math.max(sc, 3);
        else if (w === last) sc = Math.max(sc, 2);
        else if (words.indexOf(w) >= 0) sc = Math.max(sc, 1);
      });
      if (sc > bestScore) { best = k; bestScore = sc; }
    });
    return best;
  };

  /* ---------- actions & effects ---------- */
  E.nounMatch = function (spec, raw, obj, pid) {
    if (spec === undefined) return true;
    if (spec === "") return !raw;
    if (spec === "*") return !!raw;
    var self = this;
    return arr(spec).some(function (s) {
      var k = self.ikey(s, pid);
      if (self.idef(k)) return obj === k;
      return !!raw && (raw === s || raw.split(" ").indexOf(s) >= 0);
    });
  };

  // Try a list of actions. Returns true if one fired (or printed a "fail").
  E.runActions = function (list, pid, tag, p) {
    var self = this, st = this.state, fail = null;
    p = p || {};
    list = arr(list);
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (a.verb !== undefined && arr(a.verb).indexOf(p.verb) < 0) continue;
      if (a.room && arr(a.room).map(function (r) { return self.rkey(r, pid); }).indexOf(st.room) < 0) continue;
      if (!this.nounMatch(a.noun, p.n1, p.o1, pid) || !this.nounMatch(a.noun2, p.n2, p.o2, pid)) continue;
      var id = a.id ? pid + ":" + a.id : tag + ":" + i;
      if (a.once && st.done[id]) continue;
      if (!this.check(a.if, pid)) { if (a.fail && fail === null) fail = { t: a.fail, pid: pid }; continue; }
      if (a.once) st.done[id] = 1;
      this.effects(a.do, pid);
      return true;
    }
    if (fail) { this.say(this.text(fail.t, fail.pid)); return true; }
    return false;
  };

  E.effects = function (list, pid) {
    var st = this.state, self = this;
    list = arr(list);
    for (var i = 0; i < list.length; i++) {
      var fx = list[i], k;
      for (var key in fx) {
        var v = fx[key];
        switch (key) {
          case "say": this.say(this.text(v, pid)); break;
          case "set":
            if (typeof v === "object") Object.keys(v).forEach(function (f) { st.flags[self.fkey(f, pid)] = v[f]; });
            else st.flags[this.fkey(v, pid)] = true;
            break;
          case "clear": arr(v).forEach(function (f) { delete st.flags[self.fkey(f, pid)]; }); break;
          case "inc":
            if (typeof v === "object") Object.keys(v).forEach(function (f) { k = self.fkey(f, pid); st.flags[k] = (+st.flags[k] || 0) + v[f]; });
            else { k = this.fkey(v, pid); st.flags[k] = (+st.flags[k] || 0) + 1; }
            break;
          case "give": arr(v).forEach(function (id) { self.gain(self.ikey(id, pid)); }); break;
          case "remove": arr(v).forEach(function (id) { delete st.where[self.ikey(id, pid)]; }); break;
          case "place":
            k = this.ikey(v[0], pid);
            st.where[k] = v[1] ? this.rkey(v[1], pid) : st.room;
            break;
          case "show": arr(v).forEach(function (id) { delete st.hidden[self.ikey(id, pid)]; }); break;
          case "hide": arr(v).forEach(function (id) { st.hidden[self.ikey(id, pid)] = 1; }); break;
          case "exit": st.exits[this.rkey(v[0], pid) + ">" + v[1]] = v[2] ? this.rkey(v[2], pid) : ""; break;
          case "score":
            st.score = Math.max(0, st.score + (+v || 0));
            if (v > 0) this.say("(+" + v + " POINTS)", "good");
            break;
          case "sound": this.sound(v); break;
          case "goto": this.goRoom(this.rkey(v, pid)); return;
          case "die": this.die(this.text(v, pid)); return;
          case "next": this.nextPack(); return;
          case "return": this.returnFromSide(); return;
          case "win":
            this.say(this.text(v, pid), "good");
            this.state.ended = true; this.sound("win");
            this.say("FINAL SCORE: " + st.score + "   RANK: " + this.rank(), "head");
            return;
          case "command":
            if (this.depth < 3) { this.depth++; this.act(S.parse(v)); this.depth--; }
            break;
        }
      }
    }
    if (this.io.pic) this.drawPic(false); // scene may have changed (fire out, hound gone...)
  };

  /* ---------- death, beacons, saving ---------- */
  E.die = function (text) {
    var st = this.state;
    this.say(text, "die");
    this.say("*** YOU HAVE DIED ***", "die");
    this.sound("die");
    if (this.io.flash) this.io.flash("die");
    var deaths = st.deaths + 1, moves = st.moves, hints = st.hints;
    if (this.snapshot) {
      var score = Math.max(0, this.snapshot.score - 20);
      this.state = clone(this.snapshot);
      this.state.deaths = deaths; this.state.moves = moves; this.state.hints = hints; this.state.score = score;
      this.say("A beacon's light pulls you back through time... (-20 POINTS)", "good");
      var p = this.pack();
      if (this.io.theme) this.io.theme(p && p.colors || null);
      this.describe(true);
    } else {
      this.newGame();
    }
  };

  E.beaconSave = function (auto) {
    this.snapshot = clone(this.state);
    var ls = store();
    try { if (ls) ls.setItem(SAVE_KEY, JSON.stringify({ v: 1, packs: Object.keys(this.state.init), state: this.snapshot })); } catch (e) { }
    this.sound("beacon");
    this.say(auto ? "The beacon pulses. PROGRESS SAVED." : "PROGRESS SAVED AT THIS BEACON.", "good");
  };

  E.hasSave = function () {
    var ls = store();
    try { return !!(ls && ls.getItem(SAVE_KEY)); } catch (e) { return false; }
  };

  E.restore = function () {
    var ls = store(), data = null;
    try { data = ls && JSON.parse(ls.getItem(SAVE_KEY)); } catch (e) { data = null; }
    var snap = data && data.state ? data.state : this.snapshot;
    if (!snap) return this.say("NO SAVED GAME FOUND.", "warn");
    var missing = Object.keys(snap.init || {}).filter(function (pid) { return !S.packs[pid]; });
    if (missing.length) return this.say("THAT SAVE NEEDS THESE LANDS INSTALLED: " + missing.join(", ").toUpperCase(), "warn");
    this.state = clone(snap);
    this.snapshot = clone(snap);
    if (this.io.clear) this.io.clear();
    this.say("SAVED GAME RESTORED.", "good");
    var p = this.pack();
    if (this.io.theme) this.io.theme(p && p.colors || null);
    this.describe(true);
    this.status();
  };

  E.rank = function () {
    var s = this.state.score, r = S.RANKS[0][1];
    S.RANKS.forEach(function (x) { if (s >= x[0]) r = x[1]; });
    return r;
  };

  /* ---------- command handling ---------- */
  E.command = function (text) {
    if (!this.state) return;
    var p = S.parse(text);
    if (!p) return this.say("EH?");
    if (p.system !== "restart") this.confirmRestart = false;
    if (p.system) { this.system(p.system, p); return this.status(); }
    if (this.state.ended) { this.say("Your adventure is over for now. Type RESTART to play again.", "sys"); return; }
    if (p.unknown) { this.say("I DON'T KNOW HOW TO \"" + up(p.unknown) + "\"."); return; }
    this.state.moves++;
    this.act(p);
    this.status();
  };

  E.act = function (p) {
    if (!p || !p.verb) return;
    var st = this.state, pid = st.pack;
    p.o1 = this.resolve(p.n1);
    p.o2 = this.resolve(p.n2);
    // "give hermit ration" -> give ration to hermit
    if (p.verb === "give" && !p.n2 && p.n1 && p.n1.indexOf(" ") > 0) {
      var w = p.n1.split(" "), a = this.resolve(w[0]), b = this.resolve(w.slice(1).join(" "));
      var da = a && this.idef(a);
      if (a && b && a !== b && da && da.npc) { p.o1 = b; p.o2 = a; p.n2 = w[0]; p.n1 = w.slice(1).join(" "); }
    }
    if (p.o1) st.last = p.o1;

    // Aliens are gibberish until the audio translator is switched on
    var target = p.verb === "talk" ? p.o1 : null;
    if (target && this.idef(target) && this.idef(target).alien && !st.flags["core:translator_on"]) {
      var syl = ["zor", "blee", "ka", "nix", "vrr", "ool", "thak", "mi", "gluu", "ek", "qua", "zz"], g = [];
      for (var gi = 0; gi < 6; gi++) g.push(syl[(st.moves * 7 + gi * 5) % syl.length]);
      this.say("\"" + g.slice(0, 3).join("-") + "! " + g.slice(3).join(" ") + "?\"");
      return this.say(st.where["core:translator"] === "inv" ? "(You can't understand a word. Your audio translator is switched off.)" : "(You can't understand a word. If only you had a translator...)", "sys");
    }

    if (this.runActions(this.pack().actions, pid, pid, p)) return;
    if (S.packs.core && this.runActions(S.packs.core.actions, "core", "core", p)) return;

    var dir = S.dirOf(p.n1);
    if (p.verb === "go") return dir ? this.move(dir) : this.say(p.n1 ? "You can't go there." : "GO WHERE? (FORWARD, BACK, LEFT, RIGHT, UP, DOWN)");
    if (dir && ["climb", "run", "jump", "enter"].indexOf(p.verb) >= 0) return this.act({ verb: "go", n1: dir, n2: "", raw: p.raw });
    this.builtin(p);
  };

  E.builtin = function (p) {
    var st = this.state, self = this, o = p.o1, d = o && this.idef(o), r = this.rdef(), see = this.canSee();
    var needsObj = ["examine", "take", "drop", "open", "close", "unlock", "cut", "throw", "eat", "drink", "give",
      "read", "push", "pull", "wear", "fill", "tie", "put", "peer", "pour", "fix", "light", "extinguish", "use"];
    if (p.n1 && !o && p.n1 !== "all" && needsObj.indexOf(p.verb) >= 0) {
      return this.say(see ? "You can't see any " + up(p.n1) + " here." : "It's too dark to see.");
    }
    if (!p.n1 && needsObj.indexOf(p.verb) >= 0 && p.verb !== "examine") return this.say(up(p.verb) + " WHAT?");
    var has = o && st.where[o] === "inv";
    var name = o ? this.iname(o) : "";

    switch (p.verb) {
      case "look": return this.describe(false);
      case "examine":
        if (!o) return this.describe(false);
        return this.say(this.text(d.desc, o.split(":")[0]) || "You see nothing special about the " + name + ".");
      case "take":
        if (p.n1 === "all") {
          var got = this.itemsHere().filter(function (k) { var x = self.idef(k); return x && !x.fixed && !x.npc && !x.scenery; });
          if (!got.length) return this.say("There's nothing here to take.");
          got.forEach(function (k) { self.say(up(self.iname(k)) + ": TAKEN."); self.gain(k); });
          return;
        }
        if (has) return this.say("You already have it.");
        if (d.npc) return this.say("The " + name + " wouldn't like that.");
        if (d.fixed || d.scenery) return this.say(typeof d.fixed === "string" ? this.text(d.fixed) : "You can't take that.");
        this.say("TAKEN.");
        this.gain(o);
        return this.drawPic(false);
      case "drop":
        if (!has) return this.say("You don't have it.");
        if (d.part) return this.say("Drop a ship part? Not a chance - you need every one of them!");
        st.where[o] = st.room;
        this.say("DROPPED.");
        return this.drawPic(false);
      case "throw":
        if (!has) return this.say("You don't have it.");
        if (d.part) return this.say("Throw a ship part? Are you mad?");
        st.where[o] = st.room;
        this.say("You throw the " + name + ". It lands nearby.");
        return this.drawPic(false);
      case "read": return this.say(d.read ? this.text(d.read, o.split(":")[0]) : "There's nothing written on it.");
      case "eat":
        if (!d.edible) return this.say("You can't eat that!");
        delete st.where[o];
        return this.say(this.text(d.eat) || "Delicious!");
      case "drink":
        if (!d.drinkable) return this.say("You can't drink that!");
        delete st.where[o];
        return this.say(this.text(d.drink) || "Refreshing!");
      case "wear":
        if (!d.wearable) return this.say("You can't wear that.");
        return this.say("You put on the " + name + ". Very fetching.");
      case "give":
        if (!has) return this.say("You don't have it.");
        if (!p.o2) return this.say("Give it to whom?");
        var to = this.idef(p.o2);
        if (!to || !to.npc) return this.say("That can't accept gifts.");
        return this.say(this.text(to.refuse) || "The " + this.iname(p.o2) + " doesn't want it.");
      case "talk":
        if (o && d.npc) return this.say(this.text(d.talk, o.split(":")[0]) || "The " + name + " ignores you.");
        return this.say(o ? "It doesn't answer. Unsurprisingly." : "Talking to yourself again?");
      case "listen": return this.say(this.text(r && r.listen) || "You hear the wind moaning.");
      case "smell": return this.say(this.text(r && r.smell) || "Nothing unusual. Well, nothing TOO unusual.");
      case "wait": return this.say("Time passes...");
      case "jump": return this.say("WHEEE!");
      case "shout": return this.say("Your voice echoes... nobody answers.");
      case "hide": return this.say("There's nowhere to hide here.");
      case "dig": return this.say(this.inv().some(function (k) { return /spade|shovel/.test(k); }) ? "You dig a hole. Nothing there. You fill it in again." : "You have nothing to dig with.");
      case "type": return this.say("There's nothing here to type on.");
      case "scan":
        var scanner = this.inv().filter(function (k) { var x = self.idef(k); return x && x.scanner; })[0];
        if (!scanner) return this.say("You have nothing to scan with.");
        this.sound("beep");
        if (o && o !== scanner) return this.say("SCAN: " + (this.text(d.scan, o.split(":")[0]) || "Nothing unusual about the " + name + "."), "exits");
        return this.say("SCAN: " + (this.text(r && r.scan) || "Nothing unusual detected."), "exits");
      case "heal":
        if (st.where["core:medpen"] !== "inv") return this.say("You have nothing to heal with.");
        return this.say(o && d.npc ? "The " + name + " doesn't need healing." : "You're not hurt. Save the medical pen for someone who is.");
      case "run": return this.say("You run around in circles. Feel better?");
      case "climb": return this.say("There's nothing here to climb.");
      case "enter": return this.say("You can't enter that.");
      case "knock": return this.say("Knock knock. Nobody's there.");
      case "fix": return this.say("You'll need the whole ship first!");
      case "open": case "close": case "unlock": return this.say("It doesn't seem to open.");
      case "light": return this.say("You can't light that.");
      case "extinguish": return this.say("It isn't burning.");
    }
    var msgs = ["Nothing happens.", "You can't do that.", "That doesn't seem to work."];
    this.say(msgs[st.moves % 3]);
  };

  E.system = function (cmd, p) {
    var st = this.state, self = this;
    switch (cmd) {
      case "inventory":
        var items = this.inv();
        if (this.io.inventory) this.io.inventory({
          items: items.filter(function (k) { var d = self.idef(k); return d && !d.part; }).map(function (k) { return self.iname(k); }),
          parts: st.parts.map(function (k) { return self.iname(k); }), total: S.PARTS_TOTAL
        });
        this.say(items.length ? "YOU ARE CARRYING: " + items.map(function (k) { return up(self.iname(k)); }).join(", ") : "YOU ARE CARRYING NOTHING.", "items");
        this.say("SHIP PARTS: " + st.parts.length + "/" + S.PARTS_TOTAL, "part");
        return;
      case "score":
        return this.say("SCORE: " + st.score + "  RANK: " + this.rank() + "  PARTS: " + st.parts.length + "/" + S.PARTS_TOTAL +
          "  MOVES: " + st.moves + "  DEATHS: " + st.deaths, "good");
      case "hint":
        var r = this.rdef(), h = r && this.text(r.hint);
        if (!h) return this.say("No hints here. Try EXAMINE-ing everything!", "sys");
        var hk = st.room + "|" + h;
        if (!st.hints[hk]) { st.hints[hk] = 1; st.score = Math.max(0, st.score - 5); this.say("HINT (-5 POINTS):", "warn"); }
        return this.say(h, "sys");
      case "help":
        if (this.io.help) this.io.help();
        return this.say([
          "MOVE: FORWARD BACK LEFT RIGHT UP DOWN (F B L R U D)",
          "TRY: LOOK, EXAMINE X, TAKE X, DROP X, USE X, OPEN, LIGHT, EXTINGUISH, CUT, THROW, DIG, EAT, DRINK, GIVE X TO Y, TYPE 1234, READ, PUSH, PULL, CLIMB, RUN, TALK TO, TIE, FILL, PUT X IN Y, LOOK THROUGH X...",
          "I = INVENTORY   HINT = CLUE (-5)   SCORE   SAVE (AT BEACONS)   RESTORE   SOUND   CRT   MODS"
        ].join("\n"), "sys");
      case "save":
        if (this.rdef() && this.rdef().beacon) return this.beaconSave(false);
        return this.say("You can only save at a BEACON. Beacons also save automatically when you arrive.", "warn");
      case "restore": return this.restore();
      case "restart":
        if (!this.confirmRestart && !st.ended && p.raw !== "restart yes") {
          this.confirmRestart = true;
          return this.say("ARE YOU SURE? TYPE RESTART AGAIN TO START OVER.", "warn");
        }
        this.confirmRestart = false;
        return this.newGame();
      case "sound":
        if (S.Sound) { S.Sound.on = p.raw === "sound on" ? true : p.raw === "sound off" ? false : !S.Sound.on; }
        return this.say("SOUND " + (S.Sound && S.Sound.on ? "ON" : "OFF"), "sys");
      case "crt":
        if (this.io.crt) this.io.crt();
        return this.say("CRT SCANLINES TOGGLED.", "sys");
      case "packs":
        this.say("INSTALLED LANDS:", "sys");
        this.mainPacks().forEach(function (pk) { self.say(" " + (pk.order || "?") + ". " + up(pk.title) + (pk._source !== "builtin" ? " (COMMUNITY)" : ""), "sys"); });
        this.sidePacks().forEach(function (pk) { self.say(" SIDE: " + up(pk.title) + " (IN " + up(pk.hook ? pk.hook.pack : "?") + ")", "sys"); });
        if (this.io.mods) this.io.mods();
        return;
    }
  };

  // For testing a pasted pack straight away
  E.play = function (pid) {
    var p = S.packs[pid];
    if (!p) return;
    if (!this.state) this.newGame();
    if (p.type === "side") return this.enterSide(pid);
    this.enterPack(pid);
    this.status();
  };
})(typeof window !== "undefined" ? window : globalThis);
