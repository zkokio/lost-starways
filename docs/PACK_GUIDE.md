# Map Pack Guide

A **pack** is one JSON file that describes a land: its rooms, items, puzzles and pictures. Packs are data only and can't run code, so they're safe to share.

There are two kinds:

| type | what it is |
|------|------------|
| `main` | A land in the main story. `"order": 2` makes it the second land. Each main land should hide **3 ship parts** (7 lands × 3 = 21). |
| `side` | An optional side quest. A `hook` adds a rift to an existing room. Side quests give points and items, but not ship parts. |

Start from [`pack-template.json`](pack-template.json) (a main land) or [`../community/whispering-rift.json`](../community/whispering-rift.json) (a side quest).

**Test loop:** in the game press **MODS**, paste your JSON, then **VALIDATE** → **INSTALL** → **PLAY**.

---

## Top level

```json
{
  "format": 1,
  "id": "frost-hollow",          // lowercase, unique
  "type": "main",                // or "side"
  "order": 2,                    // main only
  "title": "Frost Hollow",
  "author": "Your Name",
  "colors": { "border": 1, "bg": 6, "text": 3 },   // C64 palette numbers (see below)
  "intro": "Shown the first time the player arrives.",
  "start": "landing",            // id of the first room
  "hook": { ... },               // side only
  "rooms": { ... },
  "items": { ... },
  "actions": [ ... ]
}
```
(JSON can't contain comments. The `//` notes above are only for explanation.)

## Rooms

```json
"landing": {
  "name": "Ice Landing",
  "desc": "Snow everywhere. A cave mouth yawns FORWARD.",
  "exits": {
    "forward": "cave",
    "left": { "to": "cliff", "if": "has:rope", "no": "Too steep without a rope." },
    "down":  { "to": "pit", "if": "flag:bridge_down", "die": "You fall into the crevasse." },
    "right": { "to": "secret", "if": "flag:found_it", "hidden": true }
  },
  "items": ["icicle", "snowman"],
  "beacon": true,
  "dark": false,
  "tags": ["water"],
  "words": ["ice landing", "landing"],   // extra names for GO TO
  "hint": "EXAMINE the snowman.",
  "scan": "Shown when the player SCANs this room with the electronic screwdriver.",
  "listen": "The wind howls.",
  "smell": "Cold. Just cold.",
  "onEnter": [ { "once": true, "do": [ { "say": "Brrr!" } ] } ],
  "pic": [ ... ]
}
```

- **Directions:** `forward`, `back`, `left`, `right`, `up`, `down`
- **Exits:** `no` is the message when the `if` fails. Use `die` instead of `no` to make it deadly. A `hidden` exit only shows once its `if` is true.
- **beacon:** a checkpoint. It auto-saves when the player arrives, and death returns them here. Put one near every dangerous spot.
- **dark:** you can't see anything without a lit candle.
- **tags:** `"water"` lets the player `FILL FLASK` here.

## Items

```json
"icicle": {
  "name": "sharp icicle",
  "words": ["icicle", "ice", "sharp icicle"],
  "desc": "Long and pointy.",
  "read": "Text shown for READ.",
  "part": true,          // one of the 21 ship parts (+50 points)
  "points": 10,          // bonus the first time it's picked up (not for parts)
  "scenery": true,       // part of the room: can be examined, not listed, can't be taken
  "fixed": "It's frozen to the ground.",   // can't be taken (custom message)
  "hidden": true,        // invisible until an action uses {"show": "icicle"}
  "npc": true,           // a character: TALK TO works and it accepts GIVE
  "alien": true,         // speaks gibberish until the player switches on the audio translator
  "scan": "Text shown when the player SCANs this item with the electronic screwdriver.",
  "talk": "\"Hello!\"",
  "refuse": "\"I don't want that.\"",
  "edible": true, "eat": "Crunchy.",
  "drinkable": true, "wearable": true,
  "pic": [ ... ]         // drawn on top of the room picture while the item is there
}
```

The starting kit belongs to the `core` pack, and you can use it in any land: `candle`, `matches`, `knife`, `flask`, `ration`, `translator` (audio translator), `medpen` (medical pen, 3 doses), plus `edriver` (electronic screwdriver, found in Grimmoor's pod).

Useful core flags: `core:flask_full` (the flask has water), `core:translator_on`, `core:pen_used` (number of medical-pen doses used, so `!flag:core:pen_used>=3` means there's a dose left). The condition `lit` is true when the candle is burning. To use a dose in your own action, add `{"inc": "core:pen_used"}`.

## Actions (puzzles)

Actions are checked from top to bottom. The **first** one that matches and whose conditions pass is the one that runs. Put specific actions before general ones.

```json
{ "verb": ["unlock", "open"], "noun": "door", "noun2": "key", "room": "hall",
  "if": ["has:key", "!flag:door_open"],
  "do": [ { "say": "Click!" }, { "set": "door_open" }, { "score": 10 } ],
  "fail": "It's locked.",
  "once": true }
```

- **verb:** one verb or a list (see the verb list below). `go` with a noun of `up`, `down` and so on catches movement.
- **noun / noun2:** an item id (must be visible or carried) or a plain word (`"7304"`, `"down"`). `"*"` means any noun and `""` means no noun. Leave it out to match anything.
  - `GIVE BONE TO HOUND` → noun `bone`, noun2 `hound`
  - `TYPE 7304` → noun `"7304"`
- **fail:** shown if this action matched but its `if` failed and nothing else ran.
- **once:** the action can only fire one time.

### Conditions (`if`)

A string or a list (all must be true). Put `!` in front to mean NOT. Use `{"any": [...]}` for OR.

| condition | true when |
|-----------|-----------|
| `has:item` | the player carries it |
| `here:item` | it's visible in this room |
| `near:item` | carried or here |
| `gone:item` | it's been removed from the game |
| `flag:name` | the flag is set (`flag:count>=3` compares numbers) |
| `in:room` | the player is in that room |
| `visited:room` | the player has been there |
| `tag:water` | the current room has that tag |
| `parts:3` | the player has at least 3 ship parts |
| `score:100` | the score is at least 100 |
| `lit` | the candle is lit |

Flags belong to your pack. To read another pack's flag, write `core:flask_full`.

### Effects (`do`)

| effect | example |
|--------|---------|
| `say` | `{"say": "Text"}` |
| `set` / `clear` / `inc` | `{"set": "door_open"}` `{"clear": "door_open"}` `{"inc": "knocks"}` |
| `give` | `{"give": "coin"}` put it in the player's inventory (from anywhere) |
| `remove` | `{"remove": ["bone", "hound"]}` remove it from the game |
| `place` | `{"place": ["gem", "chamber"]}` put it in a room |
| `show` / `hide` | `{"show": "wires"}` |
| `goto` | `{"goto": "cellar"}` move the player |
| `exit` | `{"exit": ["hall", "down", "cellar"]}` open an exit (use `null` to close one) |
| `score` | `{"score": 15}` |
| `sound` | `beep` `good` `bad` `part` `die` `beacon` `win` `portal` |
| `die` | `{"die": "The floor gives way..."}` the player returns to the last beacon |
| `command` | `{"command": "go up"}` run another command |
| `next` | `{"next": true}` go to the next main land (end your land with this) |
| `return` | `{"return": true}` leave a side quest and go back to where it was entered |
| `win` | `{"win": "You made it home!"}` the end of the whole game |

## Text

Any text can be conditional. The first entry whose `if` passes is used:

```json
"desc": [
  { "if": "flag:fire_out", "text": "The bridge is charred but passable." },
  { "text": "The bridge is ON FIRE!" }
]
```

`{score}`, `{parts}`, `{total}` and `{moves}` are filled in automatically.

## Pictures

The screen is **160 × 100** pixels. The pixels are twice as wide as they are tall, like C64 multicolour mode. Colours are palette numbers from 0 to 15 (or names like `"red"`).

| # | colour | # | colour |
|---|--------|---|--------|
| 0 | black | 8 | orange |
| 1 | white | 9 | brown |
| 2 | red | 10 | pink / light red |
| 3 | cyan | 11 | dark grey |
| 4 | purple | 12 | grey |
| 5 | green | 13 | light green |
| 6 | blue | 14 | light blue |
| 7 | yellow | 15 | light grey |

| op | format |
|----|--------|
| `bg` | `["bg", c]` fill everything |
| `rect` | `["rect", c, x, y, w, h]` |
| `line` | `["line", c, x1, y1, x2, y2, x3, y3 ...]` |
| `poly` | `["poly", c, x1, y1, x2, y2, ...]` filled shape |
| `circ` | `["circ", c, x, y, r]` looks round on screen |
| `oval` | `["oval", c, x, y, rx, ry]` |
| `ring` | `["ring", c, x, y, rx, ry]` outline |
| `grad` | `["grad", c1, c2, y1, y2]` dithered sky from c1 down to c2 |
| `dither` | `["dither", c, x, y, w, h]` checkerboard (fog, texture, shading) |
| `stars` | `["stars", c, seed, count, x, y, w, h]` |
| `plot` | `["plot", c, x1, y1, x2, y2 ...]` single pixels |
| `sprite` | `["sprite", x, y, 2, "..77..", ".7007.", ...]` pixel art: each character is one pixel (`0`-`9`, `a`-`f` = colour 0-15, `.` = see-through). The optional number is the scale (2 = double size). Great for characters. |

Ops draw in order, so the background goes first. To draw only when a condition is true:
```json
{ "if": "!flag:fire_out", "ops": [ ["poly", 13, 64, 84, 78, 48, 96, 84] ] }
```

## Verb list

`go look examine take drop use open close unlock light extinguish cut throw dig eat drink give type read push pull climb run hide talk listen wear fill tie wait put peer pour jump smell enter fix knock shout attack touch heal scan`

Players can use synonyms, which all map to these verbs. For example `get`/`pick up` → `take`, `look through` → `peer`, `put out` → `extinguish`, `insert` → `put`, `x` → `examine`, and `enter 1234`/`login 1234` → `type`. The full list is in `js/defs.js`.

## Tips

- Every puzzle needs a clue somewhere, even a sneaky one.
- Add a `hint` to every room, and make it conditional so it changes as the player makes progress.
- Put a beacon before anything deadly.
- Don't let the player get permanently stuck. If an item can be used up, make sure it isn't needed again later.
- Run `node tools/validate.js community/your-pack.json` before opening a pull request.
