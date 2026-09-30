/* LOST STARWAYS - map pack validator (used in-game and by tools/validate.js) */
(function (G) {
  var S = G.Starways;
  var LIMITS = { rooms: 80, items: 200, actions: 500, text: 2000 };

  S.validatePack = function (p) {
    var errors = [], warnings = [];
    function err(m) { errors.push(m); }
    function warn(m) { warnings.push(m); }
    function isObj(o) { return o && typeof o === "object" && !Array.isArray(o); }
    function arr(v) { return v === undefined ? [] : Array.isArray(v) ? v : [v]; }

    if (!isObj(p)) return { ok: false, errors: ["Pack must be a JSON object { ... }"], warnings: [] };
    if (p.format !== 1) err("\"format\" must be 1");
    if (typeof p.id !== "string" || !/^[a-z0-9_-]{2,32}$/.test(p.id)) err("\"id\" must be 2-32 chars: lowercase letters, numbers, - or _");
    if (p.id === "core") err("\"core\" is a reserved id");
    if (typeof p.title !== "string" || !p.title) err("\"title\" is required");
    if (["main", "side"].indexOf(p.type) < 0) err("\"type\" must be \"main\" or \"side\"");
    if (p.type === "main" && typeof p.order !== "number") err("main packs need a numeric \"order\" (1 = first land)");
    if (!isObj(p.rooms) || !Object.keys(p.rooms).length) { err("\"rooms\" must be an object with at least one room"); return done(); }
    if (p.items !== undefined && !isObj(p.items)) err("\"items\" must be an object");
    if (p.actions !== undefined && !Array.isArray(p.actions)) err("\"actions\" must be an array");

    var rooms = p.rooms, items = p.items || {}, core = (S.packs.core && S.packs.core.items) || {};
    if (Object.keys(rooms).length > LIMITS.rooms) err("Too many rooms (max " + LIMITS.rooms + ")");
    if (Object.keys(items).length > LIMITS.items) err("Too many items (max " + LIMITS.items + ")");
    if ((p.actions || []).length > LIMITS.actions) err("Too many actions (max " + LIMITS.actions + ")");
    if (!rooms[p.start]) err("\"start\" must be the id of a room in this pack");

    if (p.type === "side") {
      var h = p.hook;
      if (!isObj(h)) err("side packs need a \"hook\": {\"pack\", \"room\", \"dir\", \"text\"}");
      else {
        if (S.DIR_ORDER.indexOf(h.dir) < 0) err("hook.dir must be one of " + S.DIR_ORDER.join(", "));
        if (typeof h.text !== "string") err("hook.text is required (shown in the room where the rift appears)");
        var hp = S.packs[h.pack];
        if (!hp) warn("hook.pack \"" + h.pack + "\" is not installed, so the hook can't be checked");
        else if (!hp.rooms[h.room]) err("hook.room \"" + h.room + "\" does not exist in pack \"" + h.pack + "\"");
        else if (hp.rooms[h.room].exits && hp.rooms[h.room].exits[h.dir]) warn("hook.dir \"" + h.dir + "\" replaces an existing exit in " + h.pack + ":" + h.room);
      }
    }

    function itemOk(id) {
      if (typeof id !== "string") return false;
      if (id.indexOf(":") >= 0) {
        var bits = id.split(":"), pk = S.packs[bits[0]];
        if (!pk) { warn("item \"" + id + "\" refers to a pack that is not installed"); return true; }
        return !!(pk.items && pk.items[bits[1]]);
      }
      return !!(items[id] || core[id]);
    }
    function roomOk(id) { return typeof id === "string" && !!rooms[id]; }

    function text(v, where) {
      if (v === undefined) return;
      if (typeof v === "string") { if (v.length > LIMITS.text) err(where + ": text too long"); return; }
      if (Array.isArray(v)) {
        v.forEach(function (x, i) {
          if (typeof x === "string") return;
          if (isObj(x)) { cond(x.if, where + "[" + i + "].if"); text(x.text, where + "[" + i + "].text"); }
          else err(where + ": text arrays must hold strings or {\"if\",\"text\"} objects");
        });
        return;
      }
      err(where + ": text must be a string or an array");
    }

    function cond(c, where) {
      if (c === undefined || c === null || c === "") return;
      if (Array.isArray(c)) return c.forEach(function (x) { cond(x, where); });
      if (isObj(c)) {
        if (c.any) return cond(c.any, where);
        if (c.all) return cond(c.all, where);
        return err(where + ": condition objects need \"any\" or \"all\"");
      }
      if (typeof c !== "string") return err(where + ": conditions must be strings");
      var s = c.replace(/^!/, "");
      if (s === "lit" || s.indexOf(":") < 0) return;
      var type = s.slice(0, s.indexOf(":")), arg = s.slice(s.indexOf(":") + 1);
      if (S.CONDITIONS.indexOf(type) < 0) return err(where + ": unknown condition \"" + type + ":\" (use " + S.CONDITIONS.join(", ") + ")");
      if (["has", "here", "near", "gone"].indexOf(type) >= 0 && !itemOk(arg)) err(where + ": unknown item \"" + arg + "\"");
      if (["in", "visited"].indexOf(type) >= 0 && arg.indexOf(":") < 0 && !roomOk(arg)) err(where + ": unknown room \"" + arg + "\"");
      if (["parts", "score"].indexOf(type) >= 0 && isNaN(+arg)) err(where + ": " + type + ": needs a number");
    }

    function pic(ops, where) {
      if (ops === undefined) return;
      if (!Array.isArray(ops)) return err(where + ": pic must be an array of drawing ops");
      if (ops.length > 400) err(where + ": too many drawing ops (max 400)");
      ops.forEach(function (op, i) {
        if (isObj(op)) { cond(op.if, where + "[" + i + "]"); return pic(op.ops, where + "[" + i + "].ops"); }
        if (!Array.isArray(op) || S.PIC_OPS.indexOf(op[0]) < 0) return err(where + "[" + i + "]: unknown drawing op " + JSON.stringify(op && op[0]));
        if (op[0] === "sprite") {
          if (typeof op[1] !== "number" || typeof op[2] !== "number") return err(where + "[" + i + "]: sprite needs [\"sprite\", x, y, \"row\", ...]");
          for (var r = typeof op[3] === "number" ? 4 : 3; r < op.length; r++) if (typeof op[r] !== "string") return err(where + "[" + i + "]: sprite rows must be strings");
          return;
        }
        for (var k = 2; k < op.length; k++) if (typeof op[k] !== "number") return err(where + "[" + i + "]: coordinates must be numbers");
      });
    }

    function effects(list, where) {
      arr(list).forEach(function (fx, i) {
        var w = where + "[" + i + "]";
        if (!isObj(fx)) return err(w + ": each effect must be an object like {\"say\": \"...\"}");
        Object.keys(fx).forEach(function (k) {
          var v = fx[k];
          if (S.EFFECTS.indexOf(k) < 0) return err(w + ": unknown effect \"" + k + "\"");
          if (k === "say") text(v, w + ".say");
          if (["give", "remove", "show", "hide"].indexOf(k) >= 0) arr(v).forEach(function (id) { if (!itemOk(id)) err(w + "." + k + ": unknown item \"" + id + "\""); });
          if (k === "place") { if (!Array.isArray(v) || !itemOk(v[0])) err(w + ".place: use [\"item\", \"room\"]"); else if (v[1] && !roomOk(v[1])) err(w + ".place: unknown room \"" + v[1] + "\""); }
          if (k === "goto" && !roomOk(v)) err(w + ".goto: unknown room \"" + v + "\"");
          if (k === "exit" && (!Array.isArray(v) || !roomOk(v[0]) || S.DIR_ORDER.indexOf(v[1]) < 0 || (v[2] && !roomOk(v[2])))) err(w + ".exit: use [\"room\", \"direction\", \"target room or null\"]");
          if (k === "score" && typeof v !== "number") err(w + ".score must be a number");
          if (k === "sound" && S.SOUNDS.indexOf(v) < 0) err(w + ".sound must be one of " + S.SOUNDS.join(", "));
          if (k === "die") text(v, w + ".die");
          if (k === "return" && p.type !== "side") warn(w + ": \"return\" only works in side packs");
        });
      });
    }

    function actions(list, where) {
      arr(list).forEach(function (a, i) {
        var w = where + "[" + i + "]";
        if (!isObj(a)) return err(w + ": actions must be objects");
        arr(a.verb).forEach(function (v) { if (!S.VERBS[v]) err(w + ": unknown verb \"" + v + "\" (see docs/PACK_GUIDE.md for the verb list)"); });
        arr(a.room).forEach(function (r) { if (!roomOk(r)) err(w + ": unknown room \"" + r + "\""); });
        cond(a.if, w + ".if");
        if (a.fail !== undefined) text(a.fail, w + ".fail");
        if (a.do === undefined) err(w + ": missing \"do\"");
        effects(a.do, w + ".do");
      });
    }

    Object.keys(rooms).forEach(function (rid) {
      var r = rooms[rid], w = "rooms." + rid;
      if (!isObj(r)) return err(w + " must be an object");
      if (!/^[a-z0-9_-]+$/i.test(rid)) err(w + ": room ids may only use letters, numbers, - and _");
      text(r.name, w + ".name"); if (!r.name) err(w + ": missing \"name\"");
      text(r.desc, w + ".desc"); if (!r.desc) err(w + ": missing \"desc\"");
      ["hint", "listen", "smell", "scan"].forEach(function (f) { text(r[f], w + "." + f); });
      if (r.exits !== undefined && !isObj(r.exits)) err(w + ".exits must be an object");
      Object.keys(r.exits || {}).forEach(function (d) {
        var e = r.exits[d];
        if (S.DIR_ORDER.indexOf(d) < 0) return err(w + ".exits: \"" + d + "\" is not a direction (" + S.DIR_ORDER.join(", ") + ")");
        var to = typeof e === "string" ? e : isObj(e) ? e.to : null;
        if (!roomOk(to)) err(w + ".exits." + d + ": unknown room \"" + to + "\"");
        if (isObj(e)) { cond(e.if, w + ".exits." + d + ".if"); text(e.no, w + ".exits." + d + ".no"); text(e.die, w + ".exits." + d + ".die"); }
      });
      arr(r.items).forEach(function (id) { if (!items[id] && !core[id]) err(w + ".items: \"" + id + "\" is not defined in this pack's items"); });
      if (r.extra) arr(r.extra).forEach(function (x, i) { cond(x.if, w + ".extra[" + i + "]"); text(x.text, w + ".extra[" + i + "]"); });
      if (r.onEnter) actions(r.onEnter, w + ".onEnter");
      pic(r.pic, w + ".pic");
      if (!r.pic) warn(w + ": no picture");
    });

    Object.keys(items).forEach(function (id) {
      var it = items[id], w = "items." + id;
      if (!isObj(it)) return err(w + " must be an object");
      if (!/^[a-z0-9_-]+$/i.test(id)) err(w + ": item ids may only use letters, numbers, - and _");
      text(it.name, w + ".name"); text(it.desc, w + ".desc"); text(it.read, w + ".read"); text(it.talk, w + ".talk"); text(it.scan, w + ".scan");
      if (it.words !== undefined && (!Array.isArray(it.words) || it.words.some(function (x) { return typeof x !== "string"; }))) err(w + ".words must be an array of strings");
      if (!it.words) warn(w + ": no \"words\" - the player can only call it \"" + id + "\"");
      if (it.part && p.type === "side") warn(w + ": side quests shouldn't hold one of the 21 ship parts");
      pic(it.pic, w + ".pic");
    });

    actions(p.actions, "actions");

    // Unreachable rooms (simple exit walk)
    var seen = {}, stack = [p.start];
    while (stack.length) {
      var id = stack.pop(); if (!rooms[id] || seen[id]) continue; seen[id] = 1;
      Object.keys(rooms[id].exits || {}).forEach(function (d) { var e = rooms[id].exits[d]; stack.push(typeof e === "string" ? e : e && e.to); });
    }
    (p.actions || []).forEach(function (a) { arr(a.do).forEach(function (fx) { if (fx.goto) seen[fx.goto] = 1; if (fx.exit && fx.exit[2]) seen[fx.exit[2]] = 1; }); });
    Object.keys(rooms).forEach(function (rid) { if (!seen[rid]) warn("rooms." + rid + ": can't be reached by any exit"); });

    return done();
    function done() { return { ok: !errors.length, errors: errors, warnings: warnings }; }
  };
})(typeof window !== "undefined" ? window : globalThis);
