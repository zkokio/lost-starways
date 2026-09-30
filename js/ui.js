/* LOST STARWAYS - browser UI: screen, input, boot, overlays, mods */
(function () {
  var S = window.Starways;
  var PACKS_KEY = "starways.packs.v1";
  function $(id) { return document.getElementById(id); }
  function store() { try { return window.localStorage; } catch (e) { return null; } }

  var out = $("out"), cmd = $("cmd"), typed = $("typed");
  var gfx = new S.Gfx($("pic"));
  var mode = "boot", history = [], hpos = 0, queue = [], typing = null;

  /* ---------- typewriter output ---------- */
  function print(text, cls) { queue.push({ t: text, c: cls }); if (!typing) next(); }
  function line(q) {
    var d = document.createElement("div");
    d.className = "ln " + (q.c || "");
    out.appendChild(d);
    while (out.childNodes.length > 400) out.removeChild(out.firstChild);
    return d;
  }
  function next() {
    if (!queue.length) { typing = null; return; }
    var q = queue.shift(), d = line(q);
    if (!q.t) { d.textContent = " "; return next(); }
    typing = { d: d, t: q.t, i: 0 };
    var me = typing;
    (function tick() {
      if (typing !== me) return;
      me.i += 3;
      d.textContent = me.t.slice(0, me.i);
      out.scrollTop = out.scrollHeight;
      if (me.i >= me.t.length) next(); else requestAnimationFrame(tick);
    })();
  }
  function flush() {
    if (typing) { typing.d.textContent = typing.t; typing = null; }
    while (queue.length) { var q = queue.shift(); line(q).textContent = q.t || " "; }
    out.scrollTop = out.scrollHeight;
  }
  function clear() { queue = []; typing = null; out.textContent = ""; }

  /* ---------- theme & effects ---------- */
  function theme(c) {
    c = c || { border: 14, bg: 6, text: 14 };
    var r = document.documentElement.style;
    r.setProperty("--border", S.PALETTE[c.border === undefined ? 14 : c.border]);
    r.setProperty("--bg", S.PALETTE[c.bg === undefined ? 6 : c.bg]);
    r.setProperty("--fg", S.PALETTE[c.text === undefined ? 14 : c.text]);
  }
  function flash(kind) {
    var b = document.body;
    b.classList.add("flash-" + kind);
    setTimeout(function () { b.classList.remove("flash-" + kind); }, 700);
  }
  function status(s) {
    function pad(n, l) { return ("0000" + n).slice(-l); }
    $("st-land").textContent = s.land;
    $("st-score").textContent = "SC " + pad(s.score, 4);
    $("st-parts").textContent = "PARTS " + pad(s.parts, 2) + "/" + s.total;
    $("st-moves").textContent = "MV " + pad(s.moves, 3);
  }

  /* ---------- overlays ---------- */
  function showInventory(d) {
    function fill(ul, list, empty) {
      ul.textContent = "";
      (list.length ? list : [empty]).forEach(function (t) { var li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    }
    fill($("inv-items"), d.items, "NOTHING");
    fill($("inv-parts"), d.parts, "NONE YET");
    $("inv-count").textContent = d.parts.length + "/" + d.total;
    var slots = $("inv-slots"); slots.textContent = "";
    for (var i = 0; i < d.total; i++) { var s = document.createElement("span"); if (i < d.parts.length) s.className = "on"; slots.appendChild(s); }
    $("invpanel").classList.remove("hidden");
  }
  function closeOverlays() {
    $("invpanel").classList.add("hidden");
    $("mods").classList.add("hidden");
    cmd.focus();
  }
  function overlayOpen() { return !$("invpanel").classList.contains("hidden") || !$("mods").classList.contains("hidden"); }

  /* ---------- engine ---------- */
  var engine = new S.Engine({
    out: print, clear: clear, status: status, theme: theme, flash: flash,
    sound: function (n) { S.Sound.play(n); },
    pic: function (ops, check, anim) { gfx.draw(ops, check, anim); },
    inventory: showInventory,
    crt: function () { $("screen").classList.toggle("crt"); },
    mods: openMods
  });

  function submit(v) {
    S.Sound.unlock();
    flush();
    if (mode === "boot") return title();
    if (mode === "title") {
      mode = "play";
      if (/^(restore|load|continue)$/i.test(v.trim())) { engine.newGame(); engine.restore(); }
      else engine.newGame();
      return;
    }
    if (!v.trim()) return;
    history.push(v); hpos = history.length;
    print("> " + v.toUpperCase(), "echo");
    engine.command(v);
  }

  /* ---------- input ---------- */
  function sync() { typed.textContent = cmd.value.toUpperCase(); }
  cmd.addEventListener("input", function () { sync(); S.Sound.play("key"); });
  document.addEventListener("keydown", function (e) {
    if (e.target && e.target.id === "modtext") { if (e.key === "Escape") closeOverlays(); return; }
    if (overlayOpen()) { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); closeOverlays(); } return; }
    if (mode === "boot") { e.preventDefault(); return title(); }
    if (e.key === "Tab") { e.preventDefault(); return submit("i"); }
    if (document.activeElement !== cmd) cmd.focus();
    if (e.key === "Enter") { e.preventDefault(); var v = cmd.value; cmd.value = ""; sync(); submit(v); }
    else if (e.key === "ArrowUp" && history.length) { e.preventDefault(); hpos = Math.max(0, hpos - 1); cmd.value = history[hpos]; sync(); }
    else if (e.key === "ArrowDown" && history.length) { e.preventDefault(); hpos = Math.min(history.length, hpos + 1); cmd.value = history[hpos] || ""; sync(); }
  });
  $("screen").addEventListener("click", function (e) {
    if (mode === "boot") return title();
    if (e.target.closest("#mods .box")) return;
    if (overlayOpen()) return closeOverlays();
    if (!e.target.closest("button")) cmd.focus();
  });
  Array.prototype.forEach.call(document.querySelectorAll("#keys button"), function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      if (mode !== "play") return submit("");
      submit(b.getAttribute("data-cmd"));
    });
  });

  /* ---------- boot + title ---------- */
  function boot() {
    var el = $("boot"), lines = [
      "", "    **** STARWAYS 64 BASIC V2 ****", "", " 64K RAM SYSTEM  38911 BASIC BYTES FREE", "", "READY.",
      "LOAD\"STARWAYS\",8,1", "", "SEARCHING FOR STARWAYS", "LOADING"
    ], i = 0;
    document.body.classList.remove("loading");
    (function step() {
      if (mode !== "boot") return;
      if (i < lines.length) { el.textContent += lines[i++] + "\n"; return setTimeout(step, i > 6 ? 350 : 120); }
      document.body.classList.add("loading");
      setTimeout(title, 1600);
    })();
  }
  function title() {
    if (mode !== "boot") return;
    mode = "title";
    document.body.classList.remove("loading");
    $("boot").classList.add("hidden");
    theme(null);
    clear();
    gfx.draw(S.packs.core.titlePic, null, true);
    print("LOST STARWAYS", "head");
    print("A text adventure across seven strange worlds.", "room");
    print("");
    print("PRESS RETURN TO START A NEW GAME", "good");
    if (engine.hasSave()) print("OR TYPE RESTORE TO CONTINUE", "good");
    print("");
    print("Type HELP at any time. TAB or I shows your inventory. MODS loads community lands.", "sys");
    print("V" + S.VERSION + "  -  (C) 2026 PETE GRAHAM", "sys");
    cmd.focus();
  }

  /* ---------- community packs ---------- */
  function savedPacks() {
    var ls = store();
    try { return JSON.parse(ls && ls.getItem(PACKS_KEY)) || {}; } catch (e) { return {}; }
  }
  function writePacks(obj) { var ls = store(); try { if (ls) ls.setItem(PACKS_KEY, JSON.stringify(obj)); } catch (e) { } }
  function loadSavedPacks() {
    var all = savedPacks();
    // main packs first so side-quest hooks resolve
    Object.keys(all).sort(function (a, b) { return (all[a].type === "side") - (all[b].type === "side"); }).forEach(function (id) {
      var p = all[id];
      if (S.packs[id] && S.packs[id]._source === "builtin") return;
      if (S.validatePack(p).ok) S.addPack(p, "community");
    });
  }
  function parsePasted() {
    var txt = $("modtext").value.trim(), msg = $("modmsg");
    if (!txt) { msg.textContent = "Paste a pack first."; return null; }
    if (txt.length > 300000) { msg.textContent = "That pack is too big (max 300KB)."; return null; }
    try { return JSON.parse(txt); }
    catch (e) { msg.textContent = "NOT VALID JSON:\n" + e.message + "\n\nTip: check for missing commas, trailing commas, or 'single' quotes."; return null; }
  }
  function report(r) {
    var t = r.ok ? "OK! This pack is valid." : "PROBLEMS FOUND:";
    r.errors.forEach(function (e) { t += "\n  ERROR  " + e; });
    r.warnings.forEach(function (w) { t += "\n  warn   " + w; });
    $("modmsg").textContent = t;
  }
  function renderModList() {
    var ul = $("modlist"), all = savedPacks(), ids = Object.keys(all);
    ul.textContent = "";
    if (!ids.length) { var li0 = document.createElement("li"); li0.textContent = "NONE YET"; ul.appendChild(li0); return; }
    ids.forEach(function (id) {
      var p = all[id], li = document.createElement("li"), span = document.createElement("span");
      span.textContent = p.title + " (" + (p.type === "side" ? "SIDE QUEST" : "LAND " + p.order) + ")";
      var play = document.createElement("button"); play.textContent = "PLAY";
      play.onclick = function () {
        closeOverlays();
        if (!S.packs[id]) return;
        if (mode !== "play") { mode = "play"; engine.newGame(); }
        engine.play(id);
      };
      var rm = document.createElement("button"); rm.textContent = "REMOVE";
      rm.onclick = function () { var a = savedPacks(); delete a[id]; writePacks(a); if (S.packs[id] && S.packs[id]._source === "community") delete S.packs[id]; renderModList(); };
      li.appendChild(span); li.appendChild(play); li.appendChild(rm); ul.appendChild(li);
    });
  }
  function openMods() { $("modmsg").textContent = ""; renderModList(); $("mods").classList.remove("hidden"); $("modtext").focus(); }
  $("mod-validate").onclick = function () { var p = parsePasted(); if (p) report(S.validatePack(p)); };
  $("mod-install").onclick = function () {
    var p = parsePasted(); if (!p) return;
    var r = S.validatePack(p); report(r);
    if (!r.ok) return;
    if (S.packs[p.id] && S.packs[p.id]._source === "builtin") { $("modmsg").textContent = "The id \"" + p.id + "\" is used by a built-in land. Pick another id."; return; }
    S.addPack(p, "community");
    var all = savedPacks(); all[p.id] = p; writePacks(all);
    $("modmsg").textContent += "\n\nINSTALLED! " + (p.type === "side" ? "Look for the rift in " + p.hook.pack + " (" + p.hook.room + "), or press PLAY to test it now." : "It joins the Starways as land " + p.order + ". Press PLAY to test it now.");
    $("modtext").value = "";
    renderModList();
  };
  $("mod-close").onclick = closeOverlays;

  loadSavedPacks();
  boot();
})();
