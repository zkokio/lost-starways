// Loads the game scripts into Node (no browser needed). Used by the tools.
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
function run(file) { vm.runInThisContext(fs.readFileSync(path.join(root, file), "utf8"), { filename: file }); }
["js/defs.js", "js/parser.js", "js/gfx.js", "js/validate.js", "js/engine.js"].forEach(run);
// Pack files (.js wrappers) must contain strict JSON between Starways.addPack( and );
function readPack(file) {
  const src = fs.readFileSync(file, "utf8");
  const json = file.endsWith(".js") ? src.slice(src.indexOf("{"), src.lastIndexOf("}") + 1) : src;
  return JSON.parse(json);
}
module.exports = { Starways: globalThis.Starways, readPack, root };
