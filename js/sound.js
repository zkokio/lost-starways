/* LOST STARWAYS - SID-ish beeps with WebAudio (no sound files) */
(function (G) {
  var S = G.Starways;
  var Snd = S.Sound = { on: true, ctx: null };

  Snd.unlock = function () {
    if (Snd.ctx || typeof AudioContext === "undefined" && typeof webkitAudioContext === "undefined") return;
    try { Snd.ctx = new (G.AudioContext || G.webkitAudioContext)(); } catch (e) { Snd.ctx = null; }
  };

  function tone(freq, start, dur, type, vol) {
    var c = Snd.ctx; if (!c) return;
    var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + start;
    o.type = type || "square";
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol || 0.06, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function seq(notes, step, type, vol) {
    notes.forEach(function (f, i) { if (f) tone(f, i * step, step * 0.95, type, vol); });
  }

  Snd.play = function (name) {
    if (!Snd.on || !Snd.ctx) return;
    switch (name) {
      case "key": tone(1800, 0, 0.015, "square", 0.015); break;
      case "beep": tone(880, 0, 0.08); break;
      case "good": seq([523, 659, 784], 0.07); break;
      case "bad": seq([196, 147], 0.12, "sawtooth"); break;
      case "part": seq([523, 659, 784, 1047, 784, 1047, 1319], 0.07, "square", 0.07); break;
      case "die": seq([392, 370, 349, 330, 311, 294, 277, 262, 131], 0.09, "sawtooth", 0.06); break;
      case "beacon": seq([660, 0, 990], 0.08, "triangle", 0.1); break;
      case "portal": for (var i = 0; i < 24; i++) tone(200 + i * 60, i * 0.03, 0.05, "square", 0.04); break;
      case "win": seq([523, 523, 784, 784, 880, 880, 784, 0, 698, 698, 659, 659, 587, 587, 523], 0.11, "square", 0.06); break;
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
