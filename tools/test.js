#!/usr/bin/env node
// Plays through Grimmoor automatically and checks it can be completed. (SPOILERS!)
// Usage: node tools/test.js [-v]
const path = require("path");
const { Starways: S, readPack, root } = require("./load");
const verbose = process.argv.includes("-v");
S.addPack(readPack(path.join(root, "packs/core.js")));
S.addPack(readPack(path.join(root, "packs/grimmoor.js")));

let log = [];
const game = new S.Engine({ out: (t, c) => { log.push(t); if (verbose) console.log((c === "die" ? "!! " : "   ") + t); } });
game.newGame();

let failures = 0;
function cmd(c, expect) {
  log = [];
  if (verbose) console.log("> " + c.toUpperCase());
  game.command(c);
  const out = log.join("\n");
  if (expect && !new RegExp(expect, "i").test(out)) { failures++; console.log("✖ '" + c + "' expected /" + expect + "/ got:\n" + out); }
}

const solution = [
  ["forward", "jammed"], ["light candle", "light the candle"], ["examine panel", "HATCH LOCK = RED"],
  ["cut blue wire", "YOU HAVE DIED"],            // death -> back to pod beacon
  ["light candle", "candle"], ["examine panel", "RED"],
  ["open locker", "ELECTRONIC SCREWDRIVER"], ["take screwdriver", "TAKEN"], ["scan", "RED wire"],
  ["cut red wire with knife", "swings open"], ["f", "Crash Crater"],
  ["talk to alien", "translator is switched off"], ["heal alien", "wound glows"], ["use translator", "ONLINE"],
  ["talk to zib", "BEACONS"], ["i", "2 doses"], ["take stone", "TAKEN"],
  ["f", "Crossroads"], ["read sign", "HERMIT"], ["l", "Edge of the Bog"],
  ["throw stone at bog", "safe path"], ["f", "Hermit"], ["forward", "blocks the door"],
  ["talk to hermit", "grub"], ["give food to hermit", "SPADE"], ["f", "Inside the Hut"], ["take all", "TAKEN"],
  ["b", "Hermit"], ["b", "Bog"], ["back", "Crossroads"], ["r", "Scarecrow"], ["talk to crow", "roots"], ["get map", "TAKEN"], ["read map", "DEAD OAK"],
  ["f", "Dead Oak"], ["scan", "three paces"], ["dig", "FLUX COIL"], ["b", "Scarecrow"], ["l", "Crossroads"],
  ["f", "Burning Bridge"], ["ask frog", "flask"], ["f", "toast"], ["fill flask", "fill the flask"], ["extinguish fire", "HISS"],
  ["f", "Old Well"], ["d", "rope"], ["tie rope to well", "tie the rope"], ["climb down rope", "Bottom of the Well"],
  ["take all", "NAV CHIP"], ["read note", "7 3 0 4"], ["u", "Old Well"], ["f", "Observatory Door"],
  ["type 1234", "DENIED"], ["enter code 7304", "GRANTED"], ["f", "Observatory"], ["talk to robot", "REPAIR"], ["fix robot with screwdriver", "green"], ["talk to k7", "FUSE"],
  ["right", "fog"], ["look through telescope", "PORTAL"], ["r", "Standing Stones"], ["take tin", "TAKEN"],
  ["open tin", "HULL RIVETS"], ["throw bone at hound", "clear"], ["f", "Portal Machine"],
  ["put fuse in machine", "closed"], ["open panel", "FUSE socket"], ["insert fuse", "ROARS"],
  ["i", "SHIP PARTS: 3/21"], ["up", "TO BE CONTINUED"]
];
solution.forEach(s => cmd(s[0], s[1]));

// Extra parser checks
game.newGame();
const P = S.parse;
[["pick up the stone", "take", "stone"], ["give hermit food", "give", "hermit food"], ["look through telescope", "peer", "telescope"],
 ["climb down", "climb", "down"], ["jump into portal", "jump", "portal"], ["7304", "type", "7304"], ["put out fire", "extinguish", "fire"]]
  .forEach(([t, v, n]) => { const p = P(t); if (p.verb !== v || p.n1 !== n) { failures++; console.log("✖ parse '" + t + "' -> " + JSON.stringify(p)); } });

const st = game.state;
console.log(failures ? "\n✖ " + failures + " problem(s)" : "✔ Grimmoor walkthrough OK");
process.exitCode = failures ? 1 : 0;

// Side quest: the example community pack hooks into the Scarecrow Field
const fs = require("fs");
S.addPack(readPack(path.join(root, "community/whispering-rift.json")), "community");
game.newGame();
game.state.room = "grimmoor:field"; game.state.pack = "grimmoor";
[["look", "violet RIFT"], ["d", "Crystal Cave"], ["f", "Echo Chamber"], ["shout", "SHATTERS"], ["take gem", "25 POINTS"],
 ["b", "Crystal Cave"], ["up", "Scarecrow Field"]].forEach(s => cmd(s[0], s[1]));
console.log(failures ? "✖ side quest problems" : "✔ Side quest OK");
process.exitCode = failures ? 1 : 0;

// Typo tolerance
game.newGame();
[["lit candle", "light the candle"], ["exmaine panle", "HATCH LOCK"], ["opne lokcer", "ELECTRONIC SCREWDRIVER"],
 ["tkae scredriver", "TAKEN"], ["cut red wrie", "swings open"], ["fowrard", "Crash Crater"], ["use transaltor", "ONLINE"],
 ["inventroy", "TRANSLATOR"]].forEach(s => cmd(s[0], s[1]));
console.log(failures ? "✖ typo problems" : "✔ Typo tolerance OK");
process.exitCode = failures ? 1 : 0;

// GO TO
game.newGame();
["light candle","examine panel","cut red wire","f","take stone","f","l","throw stone at bog"].forEach(c=>game.command(c));
[["goto hermit", "HERMIT'S HUT"], ["go to crater", "make your way"], ["walk to the signpost", "Crossroads"], ["go to pod", "Escape Pod"],
 ["go to observatory", "don't know"], ["go to hermit", "HERMIT'S HUT"], ["go to the bog", "Edge of the Bog"], ["go to bog", "right here"],
 ["go to zib", "Crash Crater"]]
 .forEach(s => cmd(s[0], s[1]));
console.log(failures ? "✖ goto problems" : "✔ GO TO OK");
process.exitCode = failures ? 1 : 0;

// SWITCH / TURN
game.newGame();
[["switch on candle", "light the candle"], ["switch translator on", "ONLINE"], ["turn off the translator", "goes quiet"],
 ["turn translator on", "ONLINE"], ["switch the translator off", "goes quiet"], ["switch translator", "ONLINE"],
 ["turn candle off", "pinch out"], ["turn on candle", "relight"]].forEach(s => cmd(s[0], s[1]));
console.log(failures ? "✖ switch problems" : "✔ SWITCH / TURN OK");
process.exitCode = failures ? 1 : 0;

// New places, collectables and secrets
game.newGame();
const st2 = () => game.state;
["light candle","examine panel","cut red wire","f"].forEach(c => game.command(c));
[["l", "Gloomwood"], ["read sign", "TURN BACK"], ["f", "The Gloomwood"], ["read carving", "SECRET FOUND"], ["f", "Heart of the Wood"],
 ["take lantern", "5 POINTS"], ["f", "YOU HAVE DIED"]].forEach(s => cmd(s[0], s[1]));
// after death we're back at the pod beacon (lantern lost) - check XYZZY and the rest quickly by teleporting
[["xyzzy", "WRONG GAME"]].forEach(s => cmd(s[0], s[1]));
function at(room){ game.state.room = "grimmoor:" + room; game.state.pack = "grimmoor"; }
at("hut"); game.state.flags["grimmoor:hermit_fed"] = true;
[["r", "Herb Garden"], ["talk to gnome", "Hello, sailor"], ["take mushroom", "TAKEN"], ["eat mushroom", "extra heads"]].forEach(s => cmd(s[0], s[1]));
at("field"); [["r", "Crop Circle"], ["take magnet", "TAKEN"], ["dance", "cow"]].forEach(s => cmd(s[0], s[1]));
at("stream"); [["r", "Silver Falls"], ["f", "Cave Behind"], ["take coin", "TAKEN"], ["shout", "WORMS"], ["b", "Silver Falls"]].forEach(s => cmd(s[0], s[1]));
at("well"); [["l", "Graveyard"], ["read gravestone", "GET LAMP"], ["take key", "TAKEN"], ["f", "rusted solid"]].forEach(s => cmd(s[0], s[1]));
at("observatory"); [["u", "Balcony"], ["take chart", "TAKEN"], ["look at sky", "glint"], ["climb down", "Observatory"], ["look through telescope", "STARLING"],
 ["score", "SECRETS: 7"]].forEach(s => cmd(s[0], s[1]));
console.log(failures ? "✖ new places problems" : "✔ New places & secrets OK");
process.exitCode = failures ? 1 : 0;

// Pod extras
game.newGame();
[["light candle", "LIFE JACKET"], ["take tanks", "budge"], ["use radio", "STARLING"], ["take jacket", "5 POINTS"], ["wear jacket", "ridiculous"],
 ["i", "WEARING"], ["take log", "TAKEN"], ["read log", "DAY 211"]].forEach(s => cmd(s[0], s[1]));
console.log(failures ? "✖ pod problems" : "✔ Pod extras OK");
process.exitCode = failures ? 1 : 0;

// Save codes
game.newGame();
["light candle","examine panel","cut red wire","f","f"].forEach(c => game.command(c));   // reaches crossroads beacon
log = []; game.command("code"); const code = log.find(l => /^LS1-/.test(l));
if (!code) { failures++; console.log("✖ no save code"); }
const game2 = new S.Engine({ out: t => log.push(t) }); game2.newGame();
log = []; game2.command("load " + code);
if (game2.state.room !== "grimmoor:crossroads" || !game2.state.flags["grimmoor:hatch_open"]) { failures++; console.log("✖ load code failed", game2.state.room, log.join("\n")); }
log = []; game2.command("load LS1-notavalidcodeatall1234"); if (!/DOESN'T WORK/.test(log.join())) { failures++; console.log("✖ bad code not rejected"); }
console.log(failures ? "✖ save code problems" : "✔ Save codes OK");
process.exitCode = failures ? 1 : 0;
