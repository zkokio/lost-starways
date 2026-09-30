#!/usr/bin/env node
// Usage: node tools/validate.js [files...]   (defaults to packs/*.js and community/*.json)
const fs = require("fs"), path = require("path");
const { Starways: S, readPack, root } = require("./load");

let files = process.argv.slice(2);
if (!files.length) {
  files = fs.readdirSync(path.join(root, "packs")).filter(f => f.endsWith(".js")).map(f => path.join(root, "packs", f))
    .concat(fs.readdirSync(path.join(root, "community")).filter(f => f.endsWith(".json")).map(f => path.join(root, "community", f)));
}
// Load core + main packs first so side-quest hooks can be checked
const packs = [];
for (const f of files) {
  try { const p = readPack(f); packs.push([f, p]); if (p.type !== "side") S.addPack(p); }
  catch (e) { console.log("✖ " + path.relative(root, f) + "\n   Not valid JSON: " + e.message); process.exitCode = 1; }
}
for (const [f, p] of packs) {
  if (p.type === "core") { console.log("✔ " + path.relative(root, f) + " (core kit)"); continue; }
  const r = S.validatePack(p);
  console.log((r.ok ? "✔ " : "✖ ") + path.relative(root, f) + "  [" + p.title + "]");
  r.errors.forEach(e => console.log("   ERROR  " + e));
  r.warnings.forEach(w => console.log("   warn   " + w));
  if (!r.ok) process.exitCode = 1;
}
