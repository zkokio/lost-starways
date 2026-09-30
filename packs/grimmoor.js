Starways.addPack(
{
  "format": 1,
  "id": "grimmoor",
  "type": "main",
  "order": 1,
  "title": "Grimmoor",
  "author": "Pete Graham",
  "colors": { "border": 14, "bg": 6, "text": 14 },
  "intro": "CRASH! Your escape pod slams into the purple moorland of GRIMMOOR. Three of your ship's parts are hidden somewhere in this fog-drenched land.",
  "start": "pod",

  "rooms": {
    "pod": {
      "name": "Escape Pod",
      "dark": true,
      "beacon": true,
      "desc": [
        { "if": "flag:hatch_open", "text": "The cramped escape pod, scorched and silent. The hatch hangs open AHEAD, letting in cold alien fog." },
        { "text": "You are strapped into a cramped escape pod. The warning lights are dead. A cracked control PANEL glints beside the jammed hatch AHEAD." }
      ],
      "exits": {
        "forward": { "to": "crater", "if": "flag:hatch_open", "no": "The hatch is jammed shut. Something in the lock mechanism has seized." }
      },
      "items": ["panel", "wires", "redwire", "bluewire", "hatch"],
      "hint": [
        { "if": "!lit", "text": "It's dark. Check your INVENTORY - you have a candle and matches." },
        { "if": "!flag:panel_seen", "text": "EXAMINE the control PANEL." },
        { "if": "!flag:hatch_open", "text": "The label says which wire works the lock. Your pocket knife can CUT it." },
        { "text": "The hatch is open. Go FORWARD." }
      ],
      "pic": [
        ["bg", 11],
        ["poly", 12, 0, 0, 30, 15, 30, 85, 0, 100], ["poly", 12, 159, 0, 130, 15, 130, 85, 159, 100],
        ["poly", 9, 0, 100, 30, 85, 130, 85, 159, 100],
        ["line", 15, 30, 15, 130, 15], ["line", 0, 30, 85, 130, 85],
        ["oval", 15, 80, 50, 18, 30], ["oval", 12, 80, 50, 15, 26],
        { "if": "!flag:hatch_open", "ops": [["rect", 11, 66, 48, 29, 4], ["ring", 15, 80, 50, 5, 10], ["plot", 2, 92, 30]] },
        { "if": "flag:hatch_open", "ops": [["oval", 15, 80, 50, 15, 26], ["dither", 4, 68, 30, 25, 40]] },
        ["poly", 0, 136, 32, 152, 28, 152, 64, 136, 62],
        ["plot", 2, 140, 36, 144, 36, 5, 148, 36], ["line", 1, 139, 40, 150, 52],
        { "if": "flag:panel_seen", "ops": [["line", 2, 140, 46, 146, 54, 141, 60], ["line", 14, 144, 45, 149, 55, 146, 60]] },
        ["line", 12, 4, 20, 26, 30], ["line", 12, 4, 60, 26, 62]
      ]
    },

    "crater": {
      "name": "Crash Crater",
      "desc": "You stand in a smoking crater gouged into purple moorland. Your pod lies half-buried BEHIND you. Fog curls between strange drooping plants. A track leads FORWARD over the rise.",
      "exits": { "back": "pod", "forward": "crossroads" },
      "items": ["stone", "podshell"],
      "hint": "Anything lying around might be useful later. TAKE it.",
      "listen": "A distant, mournful howl drifts across the moor. Something big lives out here.",
      "pic": [
        ["grad", 6, 4, 0, 42], ["stars", 1, 21, 25, 0, 0, 160, 30],
        ["circ", 7, 130, 12, 6], ["circ", 15, 22, 8, 3],
        ["poly", 11, 0, 46, 40, 38, 80, 44, 120, 36, 159, 42, 159, 52, 0, 52],
        ["rect", 4, 0, 50, 160, 50], ["dither", 11, 0, 50, 160, 50],
        ["dither", 12, 0, 50, 160, 3],
        ["oval", 0, 80, 82, 52, 12], ["oval", 11, 80, 80, 48, 9],
        ["poly", 15, 60, 80, 70, 62, 95, 60, 104, 78], ["poly", 12, 64, 80, 72, 66, 94, 64, 100, 78],
        ["oval", 3, 84, 68, 4, 3], ["poly", 12, 98, 64, 110, 55, 104, 72],
        ["dither", 15, 100, 38, 6, 18], ["dither", 12, 98, 26, 8, 12],
        ["line", 13, 12, 72, 14, 62, 18, 60], ["line", 13, 142, 74, 144, 64, 148, 62],
        ["plot", 10, 18, 59, 148, 61, 8, 70, 150, 66]
      ]
    },

    "crossroads": {
      "name": "Crossroads",
      "beacon": true,
      "desc": "A crooked SIGNPOST stands where three tracks meet. At its foot a BEACON stone glows soft green, humming quietly. Paths lead LEFT, RIGHT and FORWARD. The crater lies BACK.",
      "exits": { "back": "crater", "left": "bog", "right": "field", "forward": "stream" },
      "items": ["signpost", "beaconstone"],
      "hint": "READ the signpost. Beacons like this one save your progress - if you die, you come back here.",
      "pic": [
        ["grad", 6, 4, 0, 44], ["stars", 1, 5, 20, 0, 0, 160, 30],
        ["rect", 4, 0, 45, 160, 55], ["dither", 11, 0, 45, 160, 55],
        ["poly", 9, 68, 100, 92, 100, 82, 45, 78, 45],
        ["poly", 9, 0, 68, 0, 78, 76, 72, 76, 66], ["poly", 9, 159, 68, 159, 78, 84, 72, 84, 66],
        ["dither", 12, 0, 45, 160, 4],
        ["rect", 8, 79, 22, 3, 50],
        ["poly", 8, 82, 30, 100, 30, 104, 33, 100, 36, 82, 36],
        ["poly", 8, 79, 40, 61, 40, 57, 43, 61, 46, 79, 46],
        ["poly", 8, 80, 14, 87, 22, 74, 22],
        ["ring", 13, 96, 78, 9, 7], ["oval", 5, 96, 78, 6, 5], ["oval", 13, 96, 77, 4, 3], ["plot", 1, 96, 76]
      ]
    },

    "bog": {
      "name": "Edge of the Bog",
      "desc": [
        { "if": "flag:bog_mapped", "text": "The bog stretches ahead, but now you can see the line of hidden stepping stones leading FORWARD to a hut. The crossroads is BACK." },
        { "text": "A foul BOG blocks the way ahead, its surface an innocent-looking green. A hut squats on the far side. Bubbles rise and pop... you really shouldn't walk in blind. The crossroads is BACK." }
      ],
      "exits": {
        "back": "crossroads",
        "right": "crossroads",
        "forward": { "to": "hut", "if": "flag:bog_mapped", "die": "You stride confidently into the bog. The bog is not confident about you. GLORP. It swallows you whole." }
      },
      "items": ["swamp"],
      "hint": [
        { "if": "flag:bog_mapped", "text": "The safe path is visible. Go FORWARD." },
        { "text": "If only you could find the solid ground... try THROWing something into the bog." }
      ],
      "smell": "Rotten eggs and old socks. Classic bog.",
      "pic": [
        ["grad", 6, 4, 0, 40],
        ["rect", 11, 0, 38, 160, 14],
        ["poly", 9, 118, 40, 131, 29, 144, 40], ["rect", 8, 121, 40, 20, 9], ["rect", 0, 129, 43, 4, 6],
        ["rect", 5, 0, 50, 160, 50], ["dither", 9, 0, 52, 160, 48],
        ["ring", 13, 40, 70, 3, 2], ["ring", 13, 90, 84, 2, 2], ["ring", 13, 124, 64, 2, 1], ["plot", 13, 60, 60, 20, 90],
        ["poly", 11, 0, 100, 0, 84, 40, 90, 50, 100],
        ["line", 13, 10, 90, 8, 76], ["line", 13, 16, 92, 18, 78], ["line", 13, 150, 60, 152, 50],
        { "if": "flag:bog_mapped", "ops": [
          ["oval", 12, 70, 92, 6, 3], ["oval", 12, 82, 80, 5, 2], ["oval", 12, 95, 70, 4, 2],
          ["oval", 12, 106, 61, 3, 1], ["oval", 12, 115, 54, 3, 1]] }
      ]
    },

    "hut": {
      "name": "Hermit's Hut",
      "desc": [
        { "if": "flag:hermit_fed", "text": "The hermit sits happily beside his doorstep, crumbs in his beard. The hut door stands open AHEAD. The bog path leads BACK." },
        { "text": "A ramshackle hut of bones and turf. A gaunt HERMIT with a beard down to his knees blocks the doorway, clutching his rumbling stomach. The bog path leads BACK." }
      ],
      "exits": {
        "back": "bog",
        "forward": { "to": "hutin", "if": "flag:hermit_fed", "no": "The hermit blocks the door. \"Nobody gets in on an empty stomach! MY empty stomach, that is.\"" }
      },
      "items": ["hermit"],
      "hint": [
        { "if": "flag:hermit_fed", "text": "Go inside the hut and take what you need." },
        { "text": "He's starving. TALK to him, then think about what you're carrying." }
      ],
      "pic": [
        ["grad", 6, 4, 0, 60],
        ["rect", 11, 0, 70, 160, 30], ["dither", 4, 0, 70, 160, 30],
        ["rect", 8, 40, 40, 80, 40], ["dither", 9, 40, 40, 80, 40],
        ["poly", 9, 30, 42, 80, 12, 130, 42],
        ["line", 1, 50, 32, 60, 27], ["line", 1, 96, 23, 106, 29], ["line", 1, 70, 20, 76, 16], ["line", 1, 112, 36, 118, 33],
        ["rect", 0, 70, 54, 20, 26],
        { "if": "flag:hermit_fed", "ops": [["rect", 8, 72, 56, 16, 24], ["dither", 7, 72, 56, 16, 24]] }
      ]
    },

    "hutin": {
      "name": "Inside the Hut",
      "desc": "A single smoky room. Dried moss hangs from the rafters and a POT of something grey bubbles on the stove. The door leads BACK outside.",
      "exits": { "back": "hut" },
      "items": ["rope", "bone", "pot"],
      "hint": "The hermit said to help yourself. TAKE ALL.",
      "smell": "Boiled moss. Mmm. No.",
      "pic": [
        ["bg", 8], ["dither", 9, 0, 0, 160, 70],
        ["rect", 9, 0, 70, 160, 30],
        ["rect", 2, 0, 8, 160, 4], ["rect", 2, 0, 30, 160, 3],
        ["line", 5, 20, 12, 20, 24], ["line", 5, 40, 12, 41, 20], ["line", 5, 60, 12, 60, 18], ["line", 5, 100, 12, 99, 22], ["line", 5, 140, 12, 139, 19],
        ["rect", 11, 108, 50, 34, 26], ["rect", 2, 116, 64, 18, 8], ["dither", 7, 116, 64, 18, 8],
        ["oval", 0, 125, 47, 11, 5], ["oval", 12, 125, 45, 9, 2],
        ["dither", 15, 118, 30, 14, 12]
      ]
    },

    "field": {
      "name": "Scarecrow Field",
      "desc": [
        { "if": "here:map", "text": "A field of blue alien wheat whispers in the wind. A lopsided SCARECROW with three arms stands guard, a scrap of paper poking from its pocket. On a hill FORWARD looms a dead oak. The crossroads lies LEFT." },
        { "text": "A field of blue alien wheat whispers in the wind. A lopsided SCARECROW with three arms stands guard. On a hill FORWARD looms a dead oak. The crossroads lies LEFT." }
      ],
      "exits": { "left": "crossroads", "back": "crossroads", "forward": "oak" },
      "items": ["scarecrow", "map"],
      "hint": [
        { "if": "flag:map_read", "text": "The map points to the dead oak. You'll need something to dig with." },
        { "text": "That scrap of paper looks interesting. TAKE it and READ it." }
      ],
      "listen": "The wheat whispers. It almost sounds like words: 'dig... dig...'",
      "pic": [
        ["grad", 6, 4, 0, 55], ["stars", 1, 13, 15, 0, 0, 160, 25],
        ["oval", 11, 128, 60, 42, 14],
        ["line", 0, 128, 47, 128, 34], ["line", 0, 128, 38, 122, 32], ["line", 0, 128, 40, 134, 33],
        ["rect", 14, 0, 58, 160, 42], ["dither", 6, 0, 58, 160, 42],
        ["plot", 1, 10, 62, 30, 70, 100, 66, 140, 80, 120, 90, 20, 88, 80, 94],
        ["rect", 9, 58, 34, 3, 46], ["rect", 9, 44, 42, 31, 2], ["line", 9, 61, 50, 74, 58],
        ["poly", 2, 50, 44, 69, 44, 66, 64, 53, 64],
        ["oval", 7, 59, 31, 4, 5], ["plot", 0, 57, 30, 61, 30], ["line", 0, 57, 33, 61, 33],
        ["poly", 0, 52, 27, 66, 27, 59, 16]
      ]
    },

    "oak": {
      "name": "The Dead Oak",
      "desc": [
        { "if": "flag:dug", "text": "A dead oak twists against the night sky. A freshly dug hole gapes beside its roots. The field is BACK." },
        { "text": "A huge dead OAK twists against the night sky like a clawed hand. Its gnarled ROOTS grip the hilltop. The field lies BACK." }
      ],
      "exits": { "back": "field" },
      "items": ["oaktree"],
      "hint": [
        { "if": "flag:dug", "text": "Nothing more here. Head BACK." },
        { "if": "!flag:map_read", "text": "This spot must matter. Is there a map around somewhere?" },
        { "text": "You know where. Now DIG (you'll need a spade)." }
      ],
      "pic": [
        ["grad", 0, 6, 0, 70], ["stars", 1, 33, 40, 0, 0, 160, 60],
        ["circ", 15, 132, 16, 8], ["circ", 12, 135, 14, 6],
        ["oval", 11, 80, 102, 95, 32],
        ["poly", 0, 74, 76, 86, 76, 83, 40, 77, 40],
        ["line", 0, 80, 42, 60, 25, 50, 28], ["line", 0, 80, 45, 100, 22, 112, 18], ["line", 0, 78, 50, 64, 40, 58, 42],
        ["line", 0, 82, 48, 98, 38, 106, 40], ["line", 0, 80, 42, 82, 14], ["line", 0, 60, 25, 58, 16], ["line", 0, 100, 22, 98, 12],
        ["line", 0, 74, 76, 64, 82], ["line", 0, 86, 76, 96, 82],
        { "if": "flag:dug", "ops": [["oval", 0, 104, 84, 7, 3], ["oval", 9, 116, 82, 5, 3]] }
      ]
    },

    "stream": {
      "name": "Burning Bridge",
      "tags": ["water"],
      "desc": [
        { "if": "flag:fire_out", "text": "A babbling STREAM of silvery water. The charred footbridge, still steaming, leads FORWARD across it. The crossroads is BACK." },
        { "text": "A babbling STREAM of silvery water blocks the path. The only footbridge is ABLAZE with eerie green FLAMES! Beyond it you glimpse an old stone well. The crossroads is BACK." }
      ],
      "exits": {
        "back": "crossroads",
        "forward": { "to": "well", "if": "flag:fire_out", "no": "The flames roar higher as you approach. You'd be toast. Literally." }
      },
      "items": ["bridge", "fire", "water"],
      "hint": [
        { "if": "flag:fire_out", "text": "The way FORWARD is clear." },
        { "if": "flag:core:flask_full", "text": "Your flask is full. EXTINGUISH the FIRE." },
        { "text": "Water puts out fire. FILL your FLASK from the stream." }
      ],
      "listen": [{ "if": "!flag:fire_out", "text": "The fire crackles and hisses over the babble of the stream." }, { "text": "Just the stream, babbling away happily." }],
      "pic": [
        ["grad", 6, 4, 0, 35],
        ["rect", 11, 0, 34, 160, 22], ["dither", 4, 0, 34, 160, 22],
        ["rect", 12, 120, 38, 10, 8], ["line", 9, 119, 38, 119, 30, 131, 30, 131, 38],
        ["rect", 6, 0, 55, 160, 22], ["dither", 14, 0, 55, 160, 2],
        ["line", 14, 10, 60, 20, 60], ["line", 14, 40, 70, 52, 70], ["line", 1, 110, 62, 118, 62], ["line", 14, 130, 72, 142, 72], ["line", 1, 20, 74, 26, 74],
        ["rect", 4, 0, 76, 160, 24], ["dither", 11, 0, 76, 160, 24],
        ["poly", 8, 64, 99, 96, 99, 86, 50, 74, 50], ["line", 9, 64, 99, 74, 50], ["line", 9, 96, 99, 86, 50],
        ["line", 9, 68, 80, 92, 80], ["line", 9, 70, 70, 90, 70], ["line", 9, 72, 60, 88, 60],
        { "if": "flag:fire_out", "ops": [["dither", 0, 66, 52, 28, 46], ["dither", 12, 78, 30, 6, 18]] },
        { "if": "!flag:fire_out", "ops": [
          ["poly", 13, 64, 84, 68, 58, 73, 70, 78, 48, 83, 66, 88, 52, 93, 70, 96, 84],
          ["poly", 5, 68, 84, 72, 68, 78, 60, 84, 70, 90, 64, 92, 84],
          ["plot", 7, 70, 54, 86, 46, 80, 42, 92, 50]] }
      ]
    },

    "well": {
      "name": "The Old Well",
      "desc": [
        { "if": "flag:rope_tied", "text": "An old stone WELL stands on the far bank, your rope tied to its rusty winch and dangling DOWN into darkness. A path leads FORWARD to a domed building. The bridge is BACK." },
        { "text": "An old stone WELL with a rusty winch stands on the far bank. Its shaft drops DOWN into total darkness - far too deep and slimy to climb unaided. A path leads FORWARD to a domed building. The bridge is BACK." }
      ],
      "exits": {
        "back": "stream",
        "forward": "door",
        "down": { "to": "wellbottom", "if": "flag:rope_tied", "no": "The shaft is sheer and slimy. You'd need a rope." }
      },
      "items": ["wellshaft", "tiedrope"],
      "hint": [
        { "if": "flag:rope_tied", "text": "Climb DOWN. Keep your candle lit!" },
        { "text": "You'll need a ROPE. TIE it to the well." }
      ],
      "pic": [
        ["grad", 6, 4, 0, 50],
        ["oval", 15, 138, 50, 16, 14], ["rect", 11, 136, 36, 4, 14],
        ["rect", 4, 0, 50, 160, 50], ["dither", 11, 0, 50, 160, 50],
        ["rect", 12, 60, 55, 40, 30],
        ["line", 11, 60, 65, 99, 65], ["line", 11, 60, 75, 99, 75], ["line", 11, 70, 55, 70, 65], ["line", 11, 86, 65, 86, 75], ["line", 11, 76, 75, 76, 84],
        ["oval", 11, 80, 55, 20, 4], ["oval", 0, 80, 55, 17, 3],
        ["rect", 9, 62, 30, 3, 25], ["rect", 9, 95, 30, 3, 25], ["rect", 9, 60, 29, 40, 3], ["line", 8, 98, 33, 104, 38]
      ]
    },

    "wellbottom": {
      "name": "Bottom of the Well",
      "dark": true,
      "desc": "You dangle at the bottom of the well, ankle-deep in cold slime. Something glints in a crack in the wall. The rope leads back UP.",
      "exits": { "up": "well" },
      "items": ["note", "navchip"],
      "hint": "Take everything and READ the NOTE.",
      "pic": [
        ["bg", 11],
        ["line", 12, 0, 10, 159, 10], ["line", 12, 0, 22, 159, 22], ["line", 12, 0, 34, 159, 34], ["line", 12, 0, 46, 159, 46], ["line", 12, 0, 58, 159, 58], ["line", 12, 0, 70, 159, 70],
        ["line", 12, 30, 10, 30, 22], ["line", 12, 110, 10, 110, 22], ["line", 12, 60, 22, 60, 34], ["line", 12, 140, 22, 140, 34],
        ["line", 12, 20, 34, 20, 46], ["line", 12, 130, 46, 130, 58], ["line", 12, 40, 58, 40, 70], ["line", 12, 100, 58, 100, 70],
        ["poly", 15, 68, 0, 92, 0, 98, 80, 62, 80], ["dither", 11, 60, 0, 40, 80],
        ["rect", 5, 0, 80, 160, 20], ["dither", 13, 0, 80, 160, 3], ["dither", 9, 0, 86, 160, 14],
        ["line", 7, 80, 0, 80, 84],
        ["line", 0, 120, 38, 124, 48, 121, 60]
      ]
    },

    "door": {
      "name": "Observatory Door",
      "desc": [
        { "if": "flag:obs_open", "text": "A domed observatory of white stone. Its round door stands open AHEAD. The well is BACK." },
        { "text": "A domed observatory of white stone. The round steel DOOR is sealed. Beside it a KEYPAD glows with four empty digits: _ _ _ _. The well is BACK." }
      ],
      "exits": {
        "back": "well",
        "forward": { "to": "observatory", "if": "flag:obs_open", "no": "The steel door is sealed. The keypad blinks expectantly." }
      },
      "items": ["keypad", "obsdoor"],
      "hint": [
        { "if": "flag:obs_open", "text": "The door is open. Go FORWARD." },
        { "if": "has:note", "text": "Remember the note from the well? TYPE the code." },
        { "text": "You need a 4-digit code. Someone may have written it down... somewhere deep." }
      ],
      "pic": [
        ["grad", 6, 4, 0, 60], ["stars", 1, 17, 20, 0, 0, 160, 30],
        ["oval", 15, 80, 44, 48, 28], ["rect", 15, 32, 44, 97, 30],
        ["poly", 11, 77, 16, 84, 16, 84, 44, 77, 44],
        ["line", 12, 32, 50, 128, 50],
        ["oval", 12, 80, 62, 10, 12], ["oval", 11, 80, 62, 8, 10],
        { "if": "flag:obs_open", "ops": [["oval", 0, 80, 62, 8, 10]] },
        ["rect", 0, 97, 54, 8, 10], ["plot", 13, 99, 56, 101, 56, 103, 56, 99, 59, 101, 59, 103, 59, 101, 62],
        ["rect", 4, 0, 72, 160, 28], ["dither", 11, 0, 72, 160, 28]
      ]
    },

    "observatory": {
      "name": "Observatory",
      "beacon": true,
      "desc": [
        { "if": "flag:scoped", "text": "A circular chamber under a cracked glass dome. A great brass TELESCOPE points out through the roof. A workbench is cluttered with tools, and a small BEACON glows by the door. The exit is BACK, and the hidden path to the standing stones leads RIGHT." },
        { "text": "A circular chamber under a cracked glass dome. A great brass TELESCOPE points out through a slot in the roof. A workbench is cluttered with tools, and a small BEACON glows by the door. The exit is BACK." }
      ],
      "exits": {
        "back": "door",
        "right": { "to": "stones", "if": "flag:scoped", "hidden": true, "no": "There's just fog out there. You'd get hopelessly lost." }
      },
      "items": ["telescope", "bench", "screwdriver"],
      "hint": [
        { "if": "flag:scoped", "text": "The standing stones are to the RIGHT. Don't forget the screwdriver." },
        { "text": "LOOK THROUGH the TELESCOPE." }
      ],
      "pic": [
        ["bg", 12],
        ["oval", 0, 80, 0, 80, 46], ["stars", 1, 5, 40, 10, 0, 140, 40], ["stars", 7, 9, 6, 30, 0, 100, 30],
        ["line", 15, 60, 4, 70, 20, 66, 32], ["line", 15, 110, 8, 102, 24],
        ["line", 11, 0, 46, 159, 46],
        ["rect", 9, 0, 76, 160, 24], ["dither", 8, 0, 76, 160, 24],
        ["poly", 7, 58, 70, 66, 75, 112, 20, 104, 15], ["line", 8, 62, 72, 108, 17],
        ["line", 9, 64, 73, 54, 92], ["line", 9, 64, 73, 74, 92], ["line", 9, 64, 73, 64, 94],
        ["rect", 8, 54, 68, 6, 5],
        ["rect", 8, 114, 62, 42, 4], ["rect", 9, 117, 66, 3, 20], ["rect", 9, 151, 66, 3, 20],
        ["plot", 2, 140, 60, 146, 60, 1, 150, 61],
        ["ring", 13, 20, 80, 8, 6], ["oval", 5, 20, 80, 5, 4], ["oval", 13, 20, 79, 3, 2]
      ]
    },

    "stones": {
      "name": "Standing Stones",
      "desc": [
        { "if": "flag:hound_gone", "text": "A ring of ancient standing stones hums in the fog. In their centre, a dark arch of machinery - the PORTAL MACHINE - lies FORWARD. A flat ALTAR stone sits nearby. The observatory is LEFT." },
        { "text": "A ring of ancient standing stones hums in the fog. In the centre stands a dark arch of machinery - but prowling in front of it is a GLIMMERHOUND: a wolf-sized beast with glowing fur and far too many teeth. It growls at you. A flat ALTAR stone sits nearby. The observatory is LEFT." }
      ],
      "exits": {
        "left": "observatory",
        "back": "observatory",
        "forward": { "to": "portal", "if": "flag:hound_gone", "die": "You try to stroll past the Glimmerhound. It considers this very rude... and eats you." }
      },
      "items": ["hound", "altar", "tin"],
      "hint": [
        { "if": "flag:hound_gone", "text": "OPEN the TIN, then go FORWARD to the portal machine." },
        { "text": "Remember what the back of the map said? Every dog loves a... THROW it." }
      ],
      "listen": [{ "if": "!flag:hound_gone", "text": "A low, rumbling growl. It's coming from the Glimmerhound. Obviously." }, { "text": "The stones hum a deep note you feel in your teeth." }],
      "pic": [
        ["grad", 0, 4, 0, 64], ["stars", 1, 41, 12, 0, 0, 160, 30],
        ["rect", 11, 0, 64, 160, 36], ["dither", 4, 0, 64, 160, 36],
        ["poly", 0, 64, 66, 64, 30, 96, 30, 96, 66, 89, 66, 89, 37, 71, 37, 71, 66],
        ["plot", 10, 67, 40, 67, 50, 67, 60, 93, 40, 93, 50, 93, 60],
        ["rect", 12, 8, 34, 14, 36], ["rect", 12, 138, 34, 14, 36], ["rect", 12, 6, 30, 18, 4], ["rect", 12, 136, 30, 18, 4],
        ["rect", 15, 30, 40, 8, 28], ["rect", 15, 122, 40, 8, 28],
        ["rect", 12, 48, 46, 6, 20], ["rect", 12, 106, 46, 6, 20],
        ["rect", 15, 102, 72, 26, 5], ["rect", 12, 106, 77, 18, 8],
        ["dither", 15, 0, 62, 160, 5]
      ]
    },

    "portal": {
      "name": "Portal Machine",
      "desc": [
        { "if": "flag:machine_on", "text": "The portal machine thrums with power! Inside the arch a swirling vortex of stars spirals UP into the sky. The stones are BACK." },
        { "if": "flag:panel_open", "text": "A towering arch of alien machinery, cold and dead. Its access PANEL hangs open, revealing an empty FUSE socket. The stones are BACK." },
        { "text": "A towering arch of alien machinery, cold and dead. A small access PANEL on its side is held shut by four tiny screws. The stones are BACK." }
      ],
      "exits": { "back": "stones" },
      "items": ["machine", "mpanel"],
      "hint": [
        { "if": "flag:machine_on", "text": "Go UP into the vortex!" },
        { "if": "flag:panel_open", "text": "PUT the FUSE in the socket." },
        { "text": "OPEN the PANEL - you'll need a screwdriver." }
      ],
      "pic": [
        ["grad", 0, 4, 0, 70], ["stars", 1, 51, 40, 0, 0, 160, 60],
        ["rect", 11, 0, 82, 160, 18], ["dither", 4, 0, 82, 160, 18],
        ["rect", 12, 40, 22, 16, 62], ["rect", 12, 104, 22, 16, 62],
        ["poly", 12, 40, 24, 56, 24, 80, 12, 104, 24, 120, 24, 80, 2],
        ["line", 15, 40, 24, 80, 2, 120, 24],
        ["rect", 11, 43, 56, 10, 10], ["plot", 15, 44, 57, 51, 57, 44, 64, 51, 64],
        { "if": "flag:panel_open", "ops": [["rect", 0, 43, 56, 10, 10], ["rect", 12, 46, 59, 4, 4]] },
        { "if": "!flag:machine_on", "ops": [["oval", 0, 80, 54, 22, 29], ["plot", 11, 48, 32, 48, 42, 112, 32, 112, 42]] },
        { "if": "flag:machine_on", "ops": [
          ["oval", 6, 80, 54, 22, 29], ["ring", 14, 80, 54, 18, 24], ["ring", 1, 80, 54, 12, 16], ["ring", 3, 80, 54, 6, 8],
          ["stars", 1, 9, 24, 62, 28, 36, 50],
          ["plot", 7, 48, 32, 48, 42, 48, 52, 112, 32, 112, 42, 112, 52]] }
      ]
    }
  },

  "items": {
    "panel": { "name": "control panel", "words": ["panel", "control panel", "controls", "label"], "scenery": true,
      "desc": "Behind the cracked cover: a RED wire and a BLUE wire. A scorched label reads: 'HATCH LOCK = RED'." },
    "wires": { "name": "wires", "words": ["wire", "wires", "cables", "cable"], "scenery": true, "hidden": true,
      "desc": "A RED wire and a BLUE wire." },
    "redwire": { "name": "red wire", "words": ["red wire", "red"], "scenery": true, "hidden": true, "desc": "A red wire, running to the hatch lock." },
    "bluewire": { "name": "blue wire", "words": ["blue wire", "blue"], "scenery": true, "hidden": true, "desc": "A thick blue wire, humming faintly. It carries serious power." },
    "hatch": { "name": "hatch", "words": ["hatch", "door"], "scenery": true,
      "desc": [{ "if": "flag:hatch_open", "text": "The hatch hangs open." }, { "text": "A heavy round hatch, locked tight." }] },

    "stone": { "name": "smooth stone", "words": ["stone", "rock", "pebble", "smooth stone"],
      "desc": "A smooth, fist-sized stone. Nice and heavy. Good for throwing.",
      "pic": [["oval", 15, 40, 90, 3, 2], ["plot", 1, 39, 89]] },
    "podshell": { "name": "escape pod", "words": ["pod", "escape pod", "capsule"], "scenery": true,
      "desc": "Your escape pod, half-buried and smoking. It will never fly again." },

    "signpost": { "name": "signpost", "words": ["signpost", "sign", "post", "arrows"], "scenery": true,
      "desc": "A crooked wooden signpost with three arrows.",
      "read": "LEFT: BOG & HERMIT   RIGHT: SCARECROW FIELD   FORWARD: RIVER & OBSERVATORY" },
    "beaconstone": { "name": "beacon", "words": ["beacon", "beacon stone", "green stone", "glow"], "scenery": true,
      "desc": "Ancient tech, humming softly. It seems to remember you. (Beacons save your progress. If you die, you return to the last one.)" },

    "swamp": { "name": "bog", "words": ["bog", "swamp", "marsh", "mud", "surface"], "scenery": true,
      "desc": "Green, bubbling and deeply untrustworthy. There must be solid ground in there somewhere." },

    "hermit": { "name": "hermit", "words": ["hermit", "man", "old man", "beard"], "npc": true, "scenery": true,
      "desc": "Skin and bones and beard. Mostly beard. His stomach rumbles like distant thunder.",
      "talk": [
        { "if": "flag:hermit_fed", "text": "\"The scarecrow knows where the treasure sleeps. And the beast by the stones? Soft as butter if you've got a bone for it.\"" },
        { "text": "\"Fooood... forty moons I've eaten nothing but moss. Got any grub, stranger?\"" }
      ],
      "refuse": "The hermit sniffs it. \"Can't eat THAT!\"",
      "pic": [
        { "if": "!flag:hermit_fed", "ops": [["poly", 9, 73, 60, 87, 60, 90, 80, 70, 80], ["oval", 10, 80, 54, 3, 4], ["poly", 15, 77, 57, 83, 57, 82, 74, 78, 74], ["plot", 0, 79, 53, 81, 53]] },
        { "if": "flag:hermit_fed", "ops": [["poly", 9, 103, 68, 117, 68, 120, 82, 100, 82], ["oval", 10, 110, 62, 3, 4], ["poly", 15, 107, 65, 113, 65, 112, 78, 108, 78], ["plot", 0, 109, 61, 111, 61], ["plot", 7, 106, 70, 114, 72]] }
      ] },

    "rope": { "name": "coil of rope", "words": ["rope", "coil", "coil of rope"],
      "desc": "Strong, hairy rope. About twenty metres of it.",
      "pic": [["ring", 7, 40, 88, 8, 4], ["ring", 7, 40, 88, 5, 2], ["plot", 7, 48, 86, 50, 84]] },
    "bone": { "name": "big bone", "words": ["bone", "big bone"],
      "desc": "A huge knobbly bone. Some creature would absolutely love this.",
      "pic": [["rect", 1, 72, 88, 14, 2], ["oval", 1, 71, 88, 2, 2], ["oval", 1, 86, 89, 2, 2]] },
    "spade": { "name": "spade", "words": ["spade", "shovel"],
      "desc": "The hermit's old spade. The blade is still sharp." },
    "pot": { "name": "pot", "words": ["pot", "stew", "stove", "soup"], "scenery": true,
      "desc": "A pot of grey bubbling moss stew. It's looking back at you." },

    "scarecrow": { "name": "scarecrow", "words": ["scarecrow", "pocket", "coat"], "scenery": true,
      "desc": "A three-armed scarecrow in a tattered red coat. Its pumpkin-ish head grins at nothing." },
    "map": { "name": "torn map", "words": ["map", "torn map", "paper", "scrap"],
      "desc": "A torn scrap of map. Try READing it.",
      "pic": [["rect", 1, 63, 52, 4, 5]] },

    "oaktree": { "name": "dead oak", "words": ["oak", "tree", "roots", "root", "dead oak"], "scenery": true,
      "desc": "Long dead, but still standing. Its roots grip the hill like fingers." },
    "coil": { "name": "flux coil", "words": ["coil", "flux coil", "flux"], "part": true,
      "desc": "A glowing coil of alien metal. One of the STARLING's missing parts!" },

    "bridge": { "name": "footbridge", "words": ["bridge", "footbridge", "planks"], "scenery": true,
      "desc": [{ "if": "flag:fire_out", "text": "Charred, but it'll hold." }, { "text": "It's on fire. Very much on fire." }] },
    "fire": { "name": "fire", "words": ["fire", "flames", "flame", "blaze"], "scenery": true,
      "desc": [{ "if": "flag:fire_out", "text": "Just wisps of steam now." }, { "text": "Eerie green flames. They hiss when spray from the stream hits them." }] },
    "water": { "name": "stream", "words": ["stream", "water", "river"], "scenery": true,
      "desc": "Cold, clear, silvery water." },

    "wellshaft": { "name": "well", "words": ["well", "shaft", "winch"], "scenery": true,
      "desc": "An old stone well with a rusty winch. You drop a pebble in... and never hear it land." },
    "tiedrope": { "name": "rope", "words": ["rope"], "scenery": true, "hidden": true,
      "desc": "Your rope, tied firmly to the winch." },
    "note": { "name": "damp note", "words": ["note", "damp note", "paper"],
      "desc": "A soggy scrap of paper with writing on it.",
      "read": "The ink has run, but you can make out: 'OBSERVATORY DOOR CODE: 7 3 0 4. Don't tell the hermit.'",
      "pic": [["rect", 1, 40, 88, 7, 4], ["line", 12, 41, 89, 45, 89]] },
    "navchip": { "name": "nav chip", "words": ["chip", "nav chip", "nav", "navchip", "glint"], "part": true,
      "desc": "A navigation chip, still blinking. One of the STARLING's missing parts!",
      "pic": [["rect", 3, 120, 46, 4, 3], ["plot", 1, 121, 47]] },

    "keypad": { "name": "keypad", "words": ["keypad", "pad", "keys", "buttons", "digits"], "scenery": true,
      "desc": "Ten worn buttons and a tiny screen: _ _ _ _. TYPE a 4-digit code, e.g. TYPE 1234." },
    "obsdoor": { "name": "door", "words": ["door", "steel door"], "scenery": true,
      "desc": [{ "if": "flag:obs_open", "text": "It's open." }, { "text": "Thick steel. Your knife won't help here." }] },

    "telescope": { "name": "telescope", "words": ["telescope", "scope", "eyepiece", "lens"], "scenery": true,
      "desc": "A great brass telescope on a tripod. You could LOOK THROUGH it." },
    "bench": { "name": "workbench", "words": ["bench", "workbench", "tools"], "scenery": true,
      "desc": "Rusty spanners, bent nails, a mouldy sandwich..." },
    "screwdriver": { "name": "screwdriver", "words": ["screwdriver", "driver", "screw driver"],
      "desc": "A tiny precision screwdriver.",
      "pic": [["line", 7, 124, 60, 130, 60], ["line", 2, 131, 60, 137, 60]] },

    "hound": { "name": "Glimmerhound", "words": ["hound", "glimmerhound", "beast", "dog", "wolf", "creature"], "npc": true, "scenery": true,
      "desc": "Glowing blue fur, glowing red eyes, and teeth like a drawer full of knives. It's watching your pockets.",
      "talk": "\"Grrrrrrr.\" It is not a conversationalist.",
      "refuse": "The Glimmerhound sniffs it, then goes back to growling at you.",
      "pic": [
        ["dither", 3, 62, 66, 42, 26],
        ["oval", 14, 80, 80, 14, 6], ["oval", 14, 95, 74, 6, 4], ["poly", 14, 92, 71, 94, 64, 97, 71],
        ["rect", 14, 70, 84, 2, 9], ["rect", 14, 76, 85, 2, 8], ["rect", 14, 86, 84, 2, 9],
        ["line", 14, 66, 78, 60, 70], ["plot", 2, 97, 73], ["plot", 1, 98, 76, 100, 76]
      ] },
    "altar": { "name": "altar", "words": ["altar", "altar stone", "slab"], "scenery": true,
      "desc": "A flat slab carved with spirals." },
    "tin": { "name": "rusty tin", "words": ["tin", "rusty tin", "box", "can"],
      "desc": "A rusty tin, rusted shut. You could try to OPEN it.",
      "pic": [["rect", 8, 110, 69, 7, 3], ["plot", 2, 112, 69]] },
    "rivets": { "name": "hull rivets", "words": ["rivets", "hull rivets", "bag", "rivet"], "part": true,
      "desc": "A bag of shiny hull rivets. One of the STARLING's missing parts!" },
    "fuse": { "name": "glass fuse", "words": ["fuse", "glass fuse"],
      "desc": "A glass fuse. The filament inside glows faintly." },

    "machine": { "name": "portal machine", "words": ["machine", "arch", "portal", "vortex", "portal machine"], "scenery": true,
      "desc": [{ "if": "flag:machine_on", "text": "A vortex of stars swirls inside the arch, spiralling UP." }, { "text": "A towering arch of alien metal. Cold and dead." }] },
    "mpanel": { "name": "access panel", "words": ["panel", "access panel", "screws", "screw", "socket"], "scenery": true,
      "desc": [{ "if": "flag:panel_open", "text": "An empty FUSE socket. A sticker says: 'INSERT FUSE. STAND CLEAR.'" }, { "text": "A small panel held shut by four tiny screws." }] }
  },

  "actions": [
    { "verb": "examine", "noun": "panel", "room": "pod", "once": true,
      "do": [{ "say": "You prise off the cracked cover. Behind it, a RED wire and a BLUE wire run to the hatch. A scorched label reads: 'HATCH LOCK = RED'." },
             { "set": "panel_seen" }, { "show": ["wires", "redwire", "bluewire"] }, { "score": 5 }] },
    { "verb": "cut", "noun": "redwire", "if": "flag:hatch_open", "do": [{ "say": "You already cut it." }] },
    { "verb": "cut", "noun": "redwire", "if": "has:knife",
      "do": [{ "say": "You slice through the red wire. CLUNK! The lock releases and the hatch swings open. Cold fog rolls in." },
             { "set": "hatch_open" }, { "score": 15 }, { "sound": "good" }],
      "fail": "You need something sharp." },
    { "verb": "cut", "noun": "bluewire", "if": "has:knife",
      "do": [{ "die": "You slice through the blue wire. FZZZAP! Ten thousand volts of ship power say hello. Your hair will never be the same." }],
      "fail": "You need something sharp." },
    { "verb": "cut", "noun": "wires", "do": [{ "say": "Which one? The RED wire or the BLUE wire?" }] },
    { "verb": ["open", "push", "pull"], "noun": "hatch", "if": "!flag:hatch_open", "do": [{ "say": "It won't budge. The lock mechanism is jammed." }] },
    { "verb": "enter", "noun": "podshell", "do": [{ "goto": "pod" }] },

    { "verb": "throw", "noun": "stone", "room": "bog", "if": "!flag:bog_mapped",
      "do": [{ "remove": "stone" }, { "say": "The stone skips across the bog - TOCK, TOCK, TOCK - bouncing off hidden stepping stones before it sinks. Now you can see the safe path!" },
             { "set": "bog_mapped" }, { "score": 10 }, { "sound": "good" }] },
    { "verb": ["go", "run", "jump", "enter"], "noun": ["swamp"], "room": "bog", "do": [{ "command": "go forward" }] },

    { "verb": "give", "noun": "ration", "room": "hut", "if": ["has:ration", "!flag:hermit_fed"],
      "do": [{ "remove": "ration" }, { "give": "spade" }, { "set": "hermit_fed" },
             { "say": "The hermit wolfs down your ration in three bites. \"Bless you! Here - take my old spade, I won't be needing it. And a tip: the scarecrow knows where the treasure sleeps. Help yourself to anything in my hut.\"" },
             { "say": "The hermit hands you a SPADE." }, { "score": 15 }, { "sound": "good" }] },
    { "verb": "give", "noun": "hermit", "room": "hut", "if": ["has:ration", "!flag:hermit_fed"], "do": [{ "command": "give ration to hermit" }] },

    { "verb": ["read", "examine"], "noun": "map",
      "do": [{ "say": "A crude map of the moor. An X is drawn at the foot of the DEAD OAK, with the words: 'DIG HERE - 3 PACES FROM THE ROOTS'. On the back, in a different hand: 'The hound loves a bone.'" },
             { "set": "map_read" }] },
    { "verb": "examine", "noun": "scarecrow", "if": "here:map", "do": [{ "say": "A three-armed scarecrow in a tattered red coat. A scrap of paper - a MAP? - pokes out of its pocket." }] },

    { "verb": "dig", "room": "oak", "if": "flag:dug", "do": [{ "say": "You've already dug here. There's just a hole." }] },
    { "verb": "dig", "room": "oak", "if": ["has:spade", "flag:map_read"],
      "do": [{ "say": "You pace three steps from the roots and dig... and dig... CLANG! Something metal glows in the dirt. You pull out a strange glowing coil!" },
             { "set": "dug" }, { "give": "coil" }, { "score": 15 }] },
    { "verb": "dig", "room": "oak", "if": "has:spade", "do": [{ "say": "You dig a few random holes around the tree. Nothing. You need to know exactly WHERE to dig." }] },
    { "verb": "dig", "room": "oak", "do": [{ "say": "The ground is rock-hard. You'd need a spade." }] },
    { "verb": "climb", "noun": "oaktree", "do": [{ "say": "The branches creak ominously. You think better of it." }] },

    { "verb": ["extinguish", "pour", "throw", "use"], "noun": ["fire", "flask", "water"], "room": "stream", "if": "flag:fire_out",
      "do": [{ "say": "The fire is already out." }] },
    { "verb": ["extinguish", "pour", "throw", "use"], "noun": ["fire", "flask", "water"], "room": "stream", "if": "flag:core:flask_full",
      "do": [{ "clear": "core:flask_full" }, { "set": "fire_out" }, { "sound": "good" },
             { "say": "You hurl the water onto the flames. HISSSSSSS! The green fire dies in a cloud of stinking steam. The bridge is charred but passable." },
             { "score": 15 }],
      "fail": "You've got nothing to put it out with. Your flask is empty... and there's a whole stream right here." },
    { "verb": "run", "room": "stream", "if": "!flag:fire_out",
      "do": [{ "die": "You sprint onto the burning bridge. Halfway across, it collapses in a shower of green sparks. That's the end of that." }] },
    { "verb": "jump", "room": "stream", "do": [{ "say": "The stream is far too wide to jump." }] },

    { "verb": ["tie", "use", "put", "throw"], "noun": "rope", "room": "well", "if": "has:rope",
      "do": [{ "remove": "rope" }, { "show": "tiedrope" }, { "set": "rope_tied" },
             { "say": "You tie the rope firmly to the winch and drop the end into the well. It uncoils into the darkness." }, { "score": 5 }] },
    { "verb": ["climb", "enter"], "noun": ["tiedrope", "wellshaft"], "room": "well", "do": [{ "command": "go down" }] },
    { "verb": "jump", "room": "well", "noun": ["wellshaft", "down", ""],
      "do": [{ "die": "You leap into the well. It's a long way down. Unfortunately, the bottom is a very short way up." }] },

    { "verb": "type", "noun": "7304", "room": "door", "if": "!flag:obs_open",
      "do": [{ "say": "BEEP-BEEP-BOOP. ACCESS GRANTED. The steel door rolls aside with a grinding hiss." },
             { "set": "obs_open" }, { "score": 20 }, { "sound": "good" }] },
    { "verb": "type", "room": "door", "if": "flag:obs_open", "do": [{ "say": "The door is already open." }] },
    { "verb": "type", "noun": "*", "room": "door", "do": [{ "say": "BZZZT! ACCESS DENIED." }, { "sound": "bad" }] },
    { "verb": "type", "noun": "", "room": "door", "do": [{ "say": "TYPE WHAT? Try TYPE followed by a 4-digit code." }] },
    { "verb": ["push", "use"], "noun": "keypad", "do": [{ "say": "TYPE the code, e.g. TYPE 1234." }] },
    { "verb": ["open", "push", "knock"], "noun": "obsdoor", "if": "!flag:obs_open", "do": [{ "say": "It's sealed tight. The keypad blinks at you." }] },

    { "verb": ["peer", "use"], "noun": "telescope", "if": "flag:scoped",
      "do": [{ "say": "The standing stones lie RIGHT of here, beyond the fog. The glowing beast is still pacing." }] },
    { "verb": ["peer", "use"], "noun": "telescope",
      "do": [{ "say": "You squint through the eyepiece and sweep across the moor... THERE! Beyond the fog, RIGHT of the observatory: a ring of standing stones, and in their centre a dark arch crackling with power. A PORTAL! Something glints under the altar stone... and something large, furry and glowing paces around it." },
             { "set": "scoped" }, { "score": 15 }, { "sound": "good" }] },

    { "verb": ["throw", "give"], "noun": "bone", "room": "stones", "if": ["has:bone", "here:hound"],
      "do": [{ "remove": ["bone", "hound"] }, { "set": "hound_gone" },
             { "say": "You hurl the bone into the fog. The Glimmerhound's ears prick up... and it bounds away after it, yipping like a puppy. The way to the portal is clear!" },
             { "score": 15 }, { "sound": "good" }] },
    { "verb": ["take", "attack", "touch", "push"], "noun": "hound", "do": [{ "die": "You reach for the Glimmerhound. It reaches for you. It has more teeth." }] },

    { "verb": "open", "noun": "tin", "if": ["near:tin", { "any": ["has:knife", "has:screwdriver"] }],
      "do": [{ "remove": "tin" }, { "say": "You prise the lid off with a grinding squeal. Inside, wrapped in oily cloth: a bag of HULL RIVETS and a glass FUSE!" },
             { "give": ["rivets", "fuse"] }, { "score": 10 }],
      "fail": "It's rusted shut. You need something to prise it open with." },

    { "verb": "open", "noun": "mpanel", "if": "flag:panel_open", "do": [{ "say": "It's already open." }] },
    { "verb": "open", "noun": "mpanel", "if": "has:screwdriver",
      "do": [{ "set": "panel_open" }, { "say": "You undo the four tiny screws and the panel drops open. Inside: an empty FUSE socket and a sticker: 'INSERT FUSE. STAND CLEAR.'" }, { "score": 10 }],
      "fail": "The screws are tiny and tight. Your fingernails aren't up to it. You need a screwdriver." },
    { "verb": "use", "noun": "screwdriver", "room": "portal", "do": [{ "command": "open panel" }] },
    { "verb": ["put", "use", "fix"], "noun": "fuse", "room": "portal", "if": "!flag:panel_open", "do": [{ "say": "The access panel is closed. Where would it go?" }] },
    { "verb": ["put", "use", "fix"], "noun": "fuse", "room": "portal", "if": "has:fuse",
      "do": [{ "remove": "fuse" }, { "set": "machine_on" }, { "sound": "portal" },
             { "say": "You push the glass fuse into its socket. Click. For a moment... nothing. Then the arch shudders and ROARS into life! Lights race around it and a vortex of stars opens inside, spiralling UP into the sky." },
             { "score": 25 }] },
    { "verb": ["put", "use", "fix"], "noun": ["mpanel", "machine"], "room": "portal", "if": "has:fuse", "do": [{ "command": "put fuse in panel" }] },

    { "verb": "go", "noun": "up", "room": "portal", "if": "!flag:machine_on", "do": [{ "say": "The machine is dead. There's nothing up there but fog." }] },
    { "verb": "go", "noun": "up", "room": "portal", "if": "!parts:3",
      "do": [{ "say": "The vortex flickers. A robotic voice crackles: 'WARNING. SHIP PARTS STILL DETECTED ON THIS WORLD.' It won't let you through." }, { "sound": "bad" }] },
    { "verb": "go", "noun": "up", "room": "portal",
      "do": [{ "say": "You take a deep breath and step into the vortex. GRIMMOOR COMPLETE!" }, { "score": 50 }, { "next": true }] },
    { "verb": ["enter", "climb", "jump"], "noun": "machine", "room": "portal", "do": [{ "command": "go up" }] }
  ]
}
);
