# LOST STARWAYS

An old-school text adventure in the style of Commodore 64 games. Travel through strange lands and alien worlds, find the **21 lost parts** of your spaceship, and get home.

```
> LIGHT CANDLE
You strike a match and light the candle. A warm glow pushes back the dark.
(+10 POINTS)
> EXAMINE PANEL
```

- Picture at the top and text at the bottom, using a 160×100 "fat pixel" picture and the C64 palette
- Two-word parser (`TAKE STONE`, `GIVE FOOD TO HERMIT`, `TYPE 7304`) with 40+ verbs and synonyms, typo correction, and `GO TO <place or character>` to walk back to anywhere you've been
- Inventory (`I` or `TAB`), a points score, ranks and hints (each hint costs 5 points)
- Science kit: an **audio translator** (understand alien characters), a **medical pen** (heals people, 3 doses) and an **electronic screwdriver** (fixes robots, opens panels, SCANs for secrets)
- Characters to talk to: Zib the injured alien scout, Mags the three-eyed crow, Burble the frog-creature, K-7 the observatory robot, the hungry hermit, and a gnome with a secret
- 24 locations in Grimmoor, including dead ends you'll regret (the Gloomwood!), hidden **secrets** (+15 each) and collectables you'll need on later worlds
- **Beacons** are checkpoints. They save your progress automatically, and if you die you go back to the last one (−20 points).
- **Continue anytime:** press RETURN on the title screen to carry on from your last beacon. Type `CODE` to get a save code, then `LOAD <code>` on another device to pick up the same game.
- Sound effects made with the browser's built-in audio, a loading screen with border stripes, and optional CRT scanlines
- **Community lands.** New maps and side quests are plain JSON files that anyone can write, paste into the game and share.

No build step, no libraries, no dependencies. It's plain HTML, CSS and JavaScript.

## Play

- **Online:** turn on GitHub Pages (see below) and open `https://<you>.github.io/lost-starways/`
- **Locally:** double-click `index.html`

## One-file version

`dist/lost-starways.html` is the whole game in a single file (CSS, JavaScript, maps and fonts built in). You can email it, put it on any web host, or paste it into an AI app builder. `dist/lost-starways-import-prompt.txt` is a ready-made prompt with the code included. Rebuild both after changes with `python3 tools/bundle.py`.

## Project layout

```
index.html              the page (loads everything below)
css/style.css           C64 look
js/defs.js              palette, verbs, directions (shared)
js/parser.js            turns "give food to hermit" into verb + nouns
js/engine.js            game rules: rooms, items, actions, beacons, score
js/gfx.js               tiny pixel renderer for room pictures
js/sound.js             beeps
js/validate.js          checks map packs for mistakes
js/ui.js                screen, keyboard, boot screen, inventory, mods panel
packs/core.js           starting kit (candle, matches, knife, flask, ration)
packs/grimmoor.js       Land 1: Grimmoor
community/              community map packs (JSON)
docs/PACK_GUIDE.md      how to build a land or side quest
docs/pack-template.json a starter pack to copy
tools/validate.js       check packs from the command line
tools/test.js           automatic playthrough of Grimmoor (spoilers!)
```

## Adding a land

1. Copy `docs/pack-template.json` and read [docs/PACK_GUIDE.md](docs/PACK_GUIDE.md).
2. Test it in the game: **MODS** → paste → **VALIDATE** → **INSTALL** → **PLAY**.
3. To share it, open a pull request that adds your file to `community/`.

To make a land part of the main game, save it as `packs/<id>.js` wrapped in `Starways.addPack( ... );` and add a `<script>` line for it in `index.html`.

## Developer commands (optional, needs Node)

```
node tools/validate.js     # check every pack
node tools/test.js         # play through Grimmoor automatically
```

Both also run automatically on GitHub for every push and pull request (`.github/workflows/validate.yml`).

## Publish with GitHub Pages

1. Push this folder to a GitHub repo.
2. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
3. After a minute the game is live at `https://<you>.github.io/<repo>/`.

## Roadmap

- [x] Engine, parser, beacons, score, inventory, mods panel
- [x] Land 1: Grimmoor (3 parts, 24 locations, 8 secrets)
- [ ] Lands 2–7 (18 more parts) and the final land, where the ship is
- [ ] Picture editor for pack authors (draw, then export `pic` JSON)
- [ ] Share codes for saves and packs
- [ ] Optional hunger meter and a candle that burns down

## Licence

MIT © 2026 FlushtheFashion. Community packs keep their authors' credit.
