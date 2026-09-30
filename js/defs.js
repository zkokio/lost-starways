/* LOST STARWAYS - shared definitions (palette, verbs, directions) */
(function (G) {
  var S = G.Starways = G.Starways || {};

  S.VERSION = "0.2.3";
  S.PARTS_TOTAL = 21;
  S.PIC_W = 160;   // picture is 160x100 "fat pixels", like C64 multicolour mode
  S.PIC_H = 100;

  // C64 palette (Pepto). Index 0-15.
  S.PALETTE = [
    "#000000", "#ffffff", "#68372b", "#70a4b2", "#6f3d86", "#588d43", "#352879", "#b8c76f",
    "#6f4f25", "#433900", "#9a6759", "#444444", "#6c6c6c", "#9ad284", "#6c5eb5", "#959595"
  ];
  S.COLOR_NAMES = {
    black: 0, white: 1, red: 2, cyan: 3, purple: 4, green: 5, blue: 6, yellow: 7,
    orange: 8, brown: 9, pink: 10, lightred: 10, darkgrey: 11, grey: 12,
    lightgreen: 13, lightblue: 14, lightgrey: 15
  };

  S.DIR_ORDER = ["forward", "back", "left", "right", "up", "down"];
  S.DIRS = {
    forward: ["forward", "forwards", "f", "fwd", "ahead", "n", "north"],
    back: ["back", "backward", "backwards", "b", "s", "south"],
    left: ["left", "l", "w", "west"],
    right: ["right", "r", "e", "east"],
    up: ["up", "u", "upward", "upwards"],
    down: ["down", "d", "downward", "downwards"]
  };

  // Canonical verb -> words/phrases the player can type.
  S.VERBS = {
    go: ["go", "goto", "walk", "move", "head", "travel", "step", "visit", "approach", "return", "find", "follow"],
    look: ["look", "look around", "lk", "redescribe"],
    examine: ["examine", "x", "ex", "inspect", "search", "check", "look at", "study", "investigate"],
    take: ["take", "get", "pick up", "pick", "grab", "collect", "lift"],
    drop: ["drop", "put down", "discard", "leave"],
    use: ["use", "operate", "activate", "turn on", "switch on", "power on", "power up", "switch", "turn", "start", "boot", "engage"],
    deactivate: ["deactivate", "turn off", "switch off", "power off", "power down", "shut off", "shut down", "disengage"],
    open: ["open", "unscrew", "pry", "prise", "force"],
    close: ["close", "shut"],
    unlock: ["unlock"],
    light: ["light", "ignite", "strike", "burn", "kindle"],
    extinguish: ["extinguish", "put out", "douse", "blow out", "snuff", "quench"],
    cut: ["cut", "slice", "chop", "snip", "sever", "saw"],
    throw: ["throw", "toss", "hurl", "chuck", "lob", "fling"],
    dig: ["dig", "excavate", "shovel"],
    eat: ["eat", "consume", "munch", "bite", "chew"],
    drink: ["drink", "sip", "swig", "quaff"],
    give: ["give", "offer", "hand", "feed", "donate"],
    type: ["type", "key in", "input", "dial", "login", "log in", "punch in"],
    read: ["read", "decipher"],
    push: ["push", "press", "shove", "poke"],
    pull: ["pull", "tug", "yank", "drag"],
    climb: ["climb", "scale", "clamber", "descend", "ascend"],
    run: ["run", "sprint", "dash", "flee", "race"],
    hide: ["hide", "duck", "crouch"],
    talk: ["talk", "talk to", "speak", "speak to", "chat", "ask", "greet", "say", "hello", "hi"],
    listen: ["listen", "listen to", "hear"],
    wear: ["wear", "put on", "don"],
    fill: ["fill", "refill"],
    tie: ["tie", "attach", "fasten", "knot", "secure", "tether"],
    wait: ["wait", "z", "rest", "pause"],
    put: ["put", "insert", "place", "fit", "install", "plug", "slot"],
    peer: ["peer", "look through", "look into", "look in", "gaze", "view", "peek"],
    pour: ["pour", "splash", "sprinkle", "empty"],
    jump: ["jump", "leap", "hop", "dive"],
    smell: ["smell", "sniff"],
    enter: ["enter", "go in", "go into", "go through", "board", "step into"],
    fix: ["fix", "repair", "mend"],
    knock: ["knock", "bang", "tap"],
    shout: ["shout", "yell", "scream", "call", "sing"],
    attack: ["attack", "hit", "kill", "fight", "punch", "kick", "stab"],
    touch: ["touch", "stroke", "pet", "feel", "pat"],
    heal: ["heal", "cure", "treat", "revive", "inject", "jab", "medicate"],
    scan: ["scan", "analyse", "analyze", "probe", "detect"]
  };

  // System commands (whole-line match, never cost a move)
  S.SYSTEM = {
    inventory: ["i", "inv", "inventory", "invent"],
    score: ["score", "points", "rank"],
    hint: ["hint", "hints", "clue", "help me"],
    help: ["help", "commands", "?", "h"],
    save: ["save", "save game"],
    restore: ["restore", "load", "continue", "restore game"],
    restart: ["restart", "new game", "restart yes"],
    sound: ["sound", "sound on", "sound off", "sfx"],
    crt: ["crt", "scanlines"],
    packs: ["packs", "mods", "lands"]
  };

  S.STOPWORDS = ["the", "a", "an", "some", "my", "your", "this", "that", "here", "around", "please", "then", "carefully", "quickly"];
  S.PREPS = ["to", "with", "on", "onto", "in", "into", "at", "through", "from", "using", "under", "inside",
    "over", "across", "towards", "toward", "against", "upon", "beneath", "underneath", "off", "for", "by", "down", "up"];

  S.EFFECTS = ["say", "set", "clear", "inc", "give", "remove", "place", "show", "hide", "goto", "exit",
    "score", "die", "sound", "next", "return", "win", "command"];
  S.CONDITIONS = ["has", "here", "near", "in", "tag", "flag", "parts", "score", "visited", "gone"];
  S.PIC_OPS = ["bg", "rect", "line", "poly", "circ", "oval", "ring", "dither", "stars", "plot", "grad", "sprite"];
  S.SOUNDS = ["beep", "good", "bad", "part", "die", "beacon", "win", "portal"];

  S.RANKS = [
    [0, "SPACE CADET"], [100, "STAR SCOUT"], [300, "ASTRO NAVIGATOR"],
    [700, "COMET CAPTAIN"], [1200, "GALAXY RANGER"], [1800, "STARLORD"]
  ];

  // Pack registry. Built-in pack files call Starways.addPack({...}).
  S.packs = S.packs || {};
  S.addPack = function (pack, source) {
    pack._source = source || "builtin";
    S.packs[pack.id] = pack;
    return pack;
  };
})(typeof window !== "undefined" ? window : globalThis);
