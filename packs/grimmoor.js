Starways.addPack(
{
  "format": 1,
  "id": "grimmoor",
  "type": "main",
  "order": 1,
  "title": "Grimmoor",
  "author": "FlushtheFashion",
  "colors": {"border": 14, "bg": 6, "text": 14},
  "intro": "CRASH! Your escape pod slams into the purple moorland of GRIMMOOR. Three of your ship's parts are hidden somewhere in this fog-drenched land.",
  "start": "pod",
  "rooms": {
    "pod": {
      "name": "Escape Pod",
      "dark": true,
      "beacon": true,
      "desc": [
        {
          "if": "flag:hatch_open",
          "text": "The cramped escape pod, scorched and silent. The hatch hangs open AHEAD, letting in cold alien fog."
        },
        {
          "text": "You are strapped into a cramped escape pod. The warning lights are dead. A cracked control PANEL glints beside the jammed hatch AHEAD."
        }
      ],
      "exits": {
        "forward": {
          "to": "crater",
          "if": "flag:hatch_open",
          "no": "The hatch is jammed shut. Something in the lock mechanism has seized."
        }
      },
      "items": ["panel", "wires", "redwire", "bluewire", "hatch", "locker", "edriver"],
      "hint": [
        {"if": "!lit", "text": "It's dark. Check your INVENTORY - you have a candle and matches."},
        {"if": "!flag:locker_open", "text": "There's a LOCKER on the wall. OPEN it."},
        {"if": "!flag:panel_seen", "text": "EXAMINE the control PANEL."},
        {"if": "!flag:hatch_open", "text": "The label says which wire works the lock. Your pocket knife can CUT it."},
        {"text": "The hatch is open. Go FORWARD."}
      ],
      "pic": [
        ["bg", 11],
        ["poly", 15, 0, 0, 159, 0, 130, 15, 30, 15],
        ["dither", 12, 30, 2, 100, 12],
        ["poly", 12, 0, 0, 30, 15, 30, 85, 0, 100],
        ["poly", 12, 159, 0, 130, 15, 130, 85, 159, 100],
        ["line", 15, 1, 2, 29, 16],
        ["line", 15, 158, 2, 131, 16],
        ["line", 11, 10, 6, 10, 95],
        ["line", 11, 150, 6, 150, 95],
        ["poly", 9, 0, 100, 30, 85, 130, 85, 159, 100],
        ["line", 8, 20, 90, 140, 90],
        ["line", 8, 10, 95, 150, 95],
        ["line", 0, 45, 86, 35, 99],
        ["line", 0, 80, 86, 80, 99],
        ["line", 0, 115, 86, 125, 99],
        ["rect", 11, 30, 15, 100, 70],
        ["line", 0, 30, 85, 130, 85],
        ["plot", 12, 34, 19, 126, 19, 34, 81, 126, 81, 80, 19, 58, 19, 102, 19],
        ["oval", 15, 80, 50, 19, 31],
        ["oval", 12, 80, 50, 16, 27],
        ["ring", 11, 80, 50, 16, 27],
        {
          "if": "!flag:hatch_open",
          "ops": [
            ["rect", 11, 65, 48, 31, 4],
            ["ring", 15, 80, 50, 5, 9],
            ["oval", 11, 80, 50, 3, 5],
            ["plot", 1, 76, 44],
            ["plot", 2, 92, 30]
          ]
        },
        {
          "if": "flag:hatch_open",
          "ops": [
            ["oval", 4, 80, 50, 16, 27],
            ["dither", 15, 66, 26, 29, 48],
            ["oval", 5, 80, 72, 14, 4],
            ["stars", 1, 4, 6, 70, 28, 20, 14]
          ]
        },
        ["poly", 0, 136, 32, 152, 28, 152, 64, 136, 62],
        ["line", 12, 136, 32, 152, 28],
        ["plot", 2, 140, 36, 144, 36],
        ["plot", 5, 148, 36],
        ["line", 1, 139, 40, 150, 52],
        {
          "if": "flag:panel_seen",
          "ops": [["line", 2, 140, 46, 146, 54, 141, 60], ["line", 14, 144, 45, 149, 55, 146, 60]]
        },
        ["poly", 6, 6, 28, 24, 34, 24, 78, 6, 84],
        ["line", 14, 6, 28, 24, 34],
        ["line", 0, 9, 40, 21, 44],
        ["line", 0, 9, 44, 21, 48],
        ["line", 0, 9, 48, 21, 52],
        ["line", 15, 21, 56, 21, 64],
        {
          "if": "flag:locker_open",
          "ops": [
            ["poly", 0, 8, 31, 22, 36, 22, 76, 8, 81],
            ["poly", 14, 0, 26, 6, 28, 6, 84, 0, 88],
            ["line", 3, 10, 50, 18, 53]
          ]
        },
        ["line", 2, 40, 99, 52, 86],
        ["line", 2, 120, 99, 108, 86]
      ],
      "scan": "Power: none. Hatch lock circuit on the RED wire. BLUE wire carries 10,000 volts."
    },
    "crater": {
      "name": "Crash Crater",
      "desc": [
        {
          "if": "flag:zib_healed",
          "text": "You stand in a smoking crater gouged into purple moorland. Your pod lies half-buried BEHIND you. ZIB, the little alien scout, sits on a rock, humming. A track leads FORWARD over the rise."
        },
        {
          "text": "You stand in a smoking crater gouged into purple moorland. Your pod lies half-buried BEHIND you. Slumped against a rock is a small green ALIEN, groaning in pain. A track leads FORWARD over the rise."
        }
      ],
      "exits": {"back": "pod", "forward": "crossroads"},
      "items": ["stone", "podshell", "zib"],
      "hint": [
        {
          "if": "!flag:zib_healed",
          "text": "The alien is hurt. HEAL it with your medical pen. Then switch on your TRANSLATOR (USE TRANSLATOR) and TALK to it."
        },
        {"if": "!flag:core:translator_on", "text": "USE your TRANSLATOR, then TALK TO ZIB."},
        {"text": "TAKE the stone - it'll come in handy."}
      ],
      "listen": "A distant, mournful howl drifts across the moor. Something big lives out here.",
      "pic": [
        ["grad", 6, 4, 0, 44],
        ["stars", 1, 21, 30, 0, 0, 160, 34],
        ["stars", 15, 8, 12, 0, 0, 160, 30],
        ["circ", 7, 130, 12, 7],
        ["plot", 8, 129, 9, 131, 14, 128, 13, 132, 11],
        ["circ", 15, 22, 8, 3],
        ["poly", 11, 0, 46, 20, 40, 40, 38, 60, 43, 80, 44, 100, 39, 120, 36, 140, 40, 159, 42, 159, 54, 0, 54],
        ["dither", 4, 0, 38, 160, 16],
        ["rect", 4, 0, 50, 160, 50],
        ["dither", 11, 0, 54, 160, 46],
        ["dither", 12, 0, 50, 160, 3],
        ["dither", 15, 0, 51, 160, 1],
        ["oval", 0, 80, 82, 54, 13],
        ["oval", 11, 80, 80, 50, 10],
        ["dither", 12, 34, 73, 92, 4],
        ["line", 15, 30, 80, 40, 74],
        ["dither", 0, 52, 78, 60, 4],
        ["poly", 15, 58, 80, 68, 62, 96, 60, 106, 78],
        ["poly", 12, 63, 80, 72, 66, 94, 64, 101, 78],
        ["line", 1, 68, 62, 96, 60],
        ["oval", 0, 84, 68, 5, 4],
        ["oval", 3, 84, 68, 4, 3],
        ["plot", 1, 82, 66],
        ["plot", 11, 70, 70, 74, 70, 90, 70, 96, 72],
        ["poly", 12, 98, 64, 112, 54, 106, 72],
        ["line", 15, 98, 64, 112, 54],
        ["oval", 12, 104, 47, 4, 4],
        ["oval", 15, 108, 39, 5, 4],
        ["oval", 12, 104, 31, 6, 5],
        ["dither", 11, 100, 26, 14, 24],
        ["line", 13, 12, 72, 14, 62, 18, 60],
        ["line", 5, 8, 74, 9, 66],
        ["line", 13, 142, 74, 144, 64, 148, 62],
        ["line", 5, 150, 76, 152, 68],
        ["plot", 10, 18, 59, 148, 61, 9, 65, 152, 67],
        ["oval", 11, 140, 94, 12, 5],
        ["oval", 12, 138, 92, 7, 2],
        ["oval", 12, 20, 90, 16, 7],
        ["oval", 15, 17, 87, 10, 3],
        ["dither", 11, 6, 92, 30, 5]
      ]
    },
    "crossroads": {
      "name": "Crossroads",
      "beacon": true,
      "desc": "A crooked SIGNPOST stands where three tracks meet. At its foot a BEACON stone glows soft green, humming quietly. Paths lead LEFT, RIGHT and FORWARD. The crater lies BACK.",
      "exits": {"back": "crater", "left": "bog", "right": "field", "forward": "stream"},
      "items": ["signpost", "beaconstone"],
      "hint": "READ the signpost. Beacons like this one save your progress - if you die, you come back here.",
      "pic": [
        ["grad", 6, 4, 0, 44],
        ["stars", 1, 5, 24, 0, 0, 160, 34],
        ["circ", 15, 140, 10, 4],
        ["poly", 11, 0, 44, 30, 38, 70, 42, 110, 36, 159, 40, 159, 48, 0, 48],
        ["rect", 4, 0, 45, 160, 55],
        ["dither", 11, 0, 48, 160, 52],
        ["poly", 9, 66, 99, 94, 99, 82, 45, 78, 45],
        ["poly", 9, 0, 68, 0, 78, 76, 72, 76, 66],
        ["poly", 9, 159, 68, 159, 78, 84, 72, 84, 66],
        ["dither", 8, 66, 82, 28, 18],
        ["dither", 8, 0, 71, 60, 5],
        ["dither", 8, 100, 71, 60, 5],
        ["dither", 12, 0, 45, 160, 4],
        ["dither", 15, 0, 47, 160, 1],
        ["line", 13, 20, 90, 21, 86, 22, 90],
        ["line", 13, 30, 95, 31, 90, 32, 95],
        ["line", 13, 130, 88, 131, 84, 132, 88],
        ["line", 13, 145, 96, 146, 91, 147, 96],
        ["line", 5, 110, 92, 111, 88, 112, 92],
        ["line", 5, 40, 82, 41, 78, 42, 82],
        ["line", 0, 82, 72, 96, 74],
        ["rect", 8, 79, 20, 3, 52],
        ["line", 9, 81, 20, 81, 72],
        ["poly", 8, 82, 29, 101, 29, 105, 32, 101, 35, 82, 35],
        ["line", 9, 83, 32, 100, 32],
        ["poly", 8, 79, 39, 60, 39, 56, 42, 60, 45, 79, 45],
        ["line", 9, 62, 42, 78, 42],
        ["poly", 8, 80, 12, 88, 20, 73, 20],
        ["ring", 5, 96, 78, 14, 9],
        ["ring", 13, 96, 78, 10, 7],
        ["oval", 5, 96, 78, 6, 5],
        ["oval", 13, 96, 77, 4, 3],
        ["plot", 1, 96, 76, 95, 76],
        ["dither", 13, 86, 69, 20, 3]
      ]
    },
    "bog": {
      "name": "Edge of the Bog",
      "desc": [
        {
          "if": "flag:bog_mapped",
          "text": "The bog stretches ahead, but now you can see the line of hidden stepping stones leading FORWARD to a hut. The crossroads is BACK."
        },
        {
          "text": "A foul BOG blocks the way ahead, its surface an innocent-looking green. A hut squats on the far side. Bubbles rise and pop... you really shouldn't walk in blind. The crossroads is BACK."
        }
      ],
      "exits": {
        "back": "crossroads",
        "right": "crossroads",
        "forward": {
          "to": "hut",
          "if": "flag:bog_mapped",
          "die": "You stride confidently into the bog. The bog is not confident about you. GLORP. It swallows you whole."
        }
      },
      "items": ["swamp"],
      "hint": [
        {"if": "flag:bog_mapped", "text": "The safe path is visible. Go FORWARD."},
        {"text": "If only you could find the solid ground... try THROWing something into the bog."}
      ],
      "smell": "Rotten eggs and old socks. Classic bog.",
      "pic": [
        ["grad", 6, 4, 0, 40],
        ["stars", 1, 77, 15, 0, 0, 160, 26],
        ["circ", 7, 30, 10, 4],
        ["rect", 11, 0, 36, 160, 16],
        ["dither", 4, 0, 36, 160, 16],
        ["poly", 9, 117, 40, 131, 28, 145, 40],
        ["dither", 8, 119, 32, 24, 8],
        ["rect", 8, 121, 40, 20, 9],
        ["rect", 0, 129, 43, 4, 6],
        ["plot", 7, 124, 43],
        ["line", 12, 138, 31, 138, 24],
        ["dither", 15, 136, 16, 5, 8],
        ["rect", 5, 0, 50, 160, 50],
        ["dither", 9, 0, 52, 160, 48],
        ["dither", 13, 0, 50, 160, 2],
        ["dither", 15, 0, 56, 160, 1],
        ["dither", 12, 0, 64, 160, 1],
        ["oval", 13, 60, 74, 5, 2],
        ["oval", 13, 110, 86, 6, 2],
        ["plot", 10, 61, 73],
        ["ring", 13, 40, 70, 3, 2],
        ["ring", 13, 90, 84, 2, 2],
        ["ring", 13, 124, 64, 2, 1],
        ["plot", 13, 60, 60, 20, 90, 140, 78],
        ["poly", 11, 0, 100, 0, 84, 40, 90, 52, 100],
        ["dither", 4, 0, 86, 50, 14],
        ["line", 5, 6, 92, 4, 72],
        ["line", 5, 12, 94, 13, 74],
        ["line", 5, 18, 96, 20, 78],
        ["rect", 9, 3, 70, 2, 5],
        ["rect", 9, 12, 72, 2, 5],
        ["rect", 9, 19, 76, 2, 5],
        ["line", 5, 150, 62, 152, 48],
        ["line", 5, 155, 64, 156, 50],
        ["rect", 9, 151, 46, 2, 4],
        ["rect", 9, 155, 48, 2, 4],
        {
          "if": "flag:bog_mapped",
          "ops": [
            ["oval", 12, 70, 92, 6, 3],
            ["oval", 12, 82, 80, 5, 2],
            ["oval", 12, 95, 70, 4, 2],
            ["oval", 12, 106, 61, 3, 1],
            ["oval", 12, 115, 54, 3, 1]
          ]
        }
      ],
      "scan": "Solid rock formations just below the surface! There IS a safe path... but you can't see where."
    },
    "hut": {
      "name": "Hermit's Hut",
      "desc": [
        {
          "if": "flag:hermit_fed",
          "text": "The hermit sits happily beside his doorstep, crumbs in his beard. The hut door stands open AHEAD. The bog path leads BACK."
        },
        {
          "text": "A ramshackle hut of bones and turf. A gaunt HERMIT with a beard down to his knees blocks the doorway, clutching his rumbling stomach. The bog path leads BACK."
        }
      ],
      "exits": {
        "back": "bog",
        "forward": {
          "to": "hutin",
          "if": "flag:hermit_fed",
          "no": "The hermit blocks the door. \"Nobody gets in on an empty stomach! MY empty stomach, that is.\""
        }
      },
      "items": ["hermit"],
      "hint": [
        {"if": "flag:hermit_fed", "text": "Go inside the hut and take what you need."},
        {"text": "He's starving. TALK to him, then think about what you're carrying."}
      ],
      "pic": [
        ["grad", 6, 4, 0, 62],
        ["stars", 1, 19, 20, 0, 0, 160, 40],
        ["circ", 7, 20, 12, 5],
        ["rect", 11, 0, 70, 160, 30],
        ["dither", 4, 0, 70, 160, 30],
        ["line", 5, 0, 70, 159, 70],
        ["rect", 8, 40, 40, 80, 40],
        ["dither", 9, 40, 40, 80, 40],
        ["line", 9, 40, 52, 120, 52],
        ["line", 9, 40, 64, 120, 64],
        ["line", 9, 40, 76, 120, 76],
        ["rect", 0, 100, 46, 12, 10],
        ["rect", 7, 101, 47, 10, 8],
        ["dither", 8, 101, 47, 10, 8],
        ["line", 9, 106, 46, 106, 56],
        ["poly", 9, 30, 42, 80, 12, 130, 42],
        ["poly", 5, 52, 34, 80, 18, 108, 34],
        ["dither", 9, 52, 18, 56, 16],
        ["line", 8, 30, 42, 80, 12, 130, 42],
        ["line", 1, 50, 32, 60, 27],
        ["line", 1, 96, 23, 106, 29],
        ["line", 1, 70, 20, 76, 16],
        ["line", 1, 112, 36, 118, 33],
        ["plot", 1, 49, 32, 61, 27, 95, 23, 107, 29],
        ["rect", 12, 100, 14, 6, 12],
        ["dither", 15, 98, 4, 8, 10],
        ["dither", 12, 102, 0, 6, 6],
        ["rect", 0, 70, 54, 20, 26],
        ["line", 8, 70, 54, 70, 80],
        ["line", 8, 89, 54, 89, 80],
        {"if": "flag:hermit_fed", "ops": [["rect", 8, 72, 56, 16, 24], ["dither", 7, 72, 56, 16, 24]]},
        ["line", 13, 20, 92, 21, 88, 22, 92],
        ["line", 13, 140, 90, 141, 86, 142, 90]
      ]
    },
    "hutin": {
      "name": "Inside the Hut",
      "desc": "A single smoky room. Dried moss hangs from the rafters and a POT of something grey bubbles on the stove. The door leads BACK outside.",
      "exits": {"back": "hut"},
      "items": ["rope", "bone", "pot"],
      "hint": "The hermit said to help yourself. TAKE ALL.",
      "smell": "Boiled moss. Mmm. No.",
      "pic": [
        ["bg", 8],
        ["dither", 9, 0, 0, 160, 70],
        ["rect", 2, 0, 8, 160, 4],
        ["rect", 2, 0, 30, 160, 3],
        ["line", 10, 0, 8, 159, 8],
        ["line", 5, 20, 12, 20, 24],
        ["line", 13, 21, 12, 21, 20],
        ["line", 5, 40, 12, 41, 20],
        ["line", 5, 60, 12, 60, 18],
        ["line", 5, 100, 12, 99, 22],
        ["line", 13, 101, 12, 101, 17],
        ["line", 5, 140, 12, 139, 19],
        ["rect", 9, 10, 44, 40, 3],
        ["rect", 7, 14, 38, 5, 6],
        ["rect", 3, 22, 37, 4, 7],
        ["rect", 13, 30, 39, 6, 5],
        ["rect", 10, 40, 38, 4, 6],
        ["rect", 6, 62, 36, 18, 14],
        ["stars", 1, 3, 6, 62, 36, 18, 14],
        ["line", 9, 71, 36, 71, 50],
        ["line", 9, 62, 43, 80, 43],
        ["rect", 9, 0, 70, 160, 30],
        ["line", 8, 0, 78, 159, 78],
        ["line", 8, 0, 88, 159, 88],
        ["rect", 11, 108, 50, 34, 26],
        ["rect", 0, 110, 52, 30, 4],
        ["rect", 2, 116, 64, 18, 8],
        ["dither", 7, 116, 64, 18, 8],
        ["dither", 8, 116, 66, 18, 4],
        ["rect", 11, 138, 10, 4, 40],
        ["oval", 0, 125, 47, 11, 5],
        ["oval", 12, 125, 45, 9, 2],
        ["plot", 1, 121, 44, 128, 45],
        ["dither", 15, 118, 30, 14, 12],
        ["dither", 12, 120, 22, 10, 8],
        ["oval", 2, 60, 91, 30, 5],
        ["dither", 10, 32, 88, 56, 6]
      ]
    },
    "field": {
      "name": "Scarecrow Field",
      "desc": [
        {
          "if": "here:map",
          "text": "A field of blue alien wheat whispers in the wind. A lopsided SCARECROW with three arms stands guard with a three-eyed CROW on its arm, a scrap of paper poking from its pocket. On a hill FORWARD looms a dead oak. The crossroads lies LEFT."
        },
        {
          "text": "A field of blue alien wheat whispers in the wind. A lopsided SCARECROW with three arms stands guard with a three-eyed CROW on its arm. On a hill FORWARD looms a dead oak. The crossroads lies LEFT."
        }
      ],
      "exits": {"left": "crossroads", "back": "crossroads", "forward": "oak"},
      "items": ["scarecrow", "map", "mags"],
      "hint": [
        {"if": "flag:map_read", "text": "The map points to the dead oak. You'll need something to dig with."},
        {"text": "That scrap of paper looks interesting. TAKE it and READ it."}
      ],
      "listen": "The wheat whispers. It almost sounds like words: 'dig... dig...'",
      "pic": [
        ["grad", 6, 4, 0, 56],
        ["stars", 1, 13, 24, 0, 0, 160, 34],
        ["circ", 15, 140, 12, 6],
        ["circ", 12, 142, 11, 4],
        ["oval", 11, 128, 60, 44, 15],
        ["dither", 4, 84, 46, 88, 12],
        ["line", 0, 128, 47, 128, 32],
        ["line", 0, 128, 36, 121, 29, 118, 30],
        ["line", 0, 128, 39, 135, 31, 138, 28],
        ["rect", 14, 0, 58, 160, 42],
        ["dither", 6, 0, 58, 160, 42],
        ["dither", 3, 0, 58, 160, 3],
        ["dither", 3, 0, 62, 160, 1],
        ["dither", 15, 0, 72, 160, 1],
        ["plot", 1, 7, 63, 19, 73, 31, 60, 91, 65, 105, 79, 121, 62, 139, 83, 151, 68, 77, 87, 11, 87],
        ["rect", 9, 58, 34, 3, 50],
        ["rect", 9, 44, 42, 31, 2],
        ["line", 9, 61, 50, 74, 58],
        ["poly", 2, 50, 44, 69, 44, 67, 66, 52, 66],
        ["line", 10, 50, 44, 52, 66],
        ["line", 0, 59, 46, 59, 64],
        ["plot", 7, 57, 50, 57, 56, 57, 62],
        ["rect", 8, 62, 58, 3, 3],
        ["plot", 7, 43, 43, 44, 41, 75, 43, 76, 41, 75, 58, 76, 59],
        ["oval", 7, 59, 31, 4, 5],
        ["dither", 8, 55, 28, 9, 8],
        ["plot", 0, 57, 30, 61, 30],
        ["line", 0, 57, 34, 61, 34],
        ["poly", 0, 51, 27, 67, 27, 59, 15],
        ["line", 2, 53, 26, 65, 26]
      ]
    },
    "oak": {
      "name": "The Dead Oak",
      "desc": [
        {
          "if": "flag:dug",
          "text": "A dead oak twists against the night sky. A freshly dug hole gapes beside its roots. The field is BACK."
        },
        {
          "text": "A huge dead OAK twists against the night sky like a clawed hand. Its gnarled ROOTS grip the hilltop. The field lies BACK."
        }
      ],
      "exits": {"back": "field"},
      "items": ["oaktree"],
      "hint": [
        {"if": "flag:dug", "text": "Nothing more here. Head BACK."},
        {"if": "!flag:map_read", "text": "This spot must matter. Is there a map around somewhere?"},
        {"text": "You know where. Now DIG (you'll need a spade)."}
      ],
      "pic": [
        ["grad", 0, 6, 0, 72],
        ["stars", 1, 33, 50, 0, 0, 160, 62],
        ["stars", 15, 34, 20, 0, 0, 160, 62],
        ["circ", 15, 132, 16, 9],
        ["circ", 6, 137, 14, 8],
        ["dither", 11, 96, 26, 54, 3],
        ["oval", 11, 80, 104, 96, 33],
        ["dither", 0, 0, 82, 160, 18],
        ["dither", 12, 40, 72, 80, 2],
        ["line", 0, 10, 84, 11, 79, 12, 84],
        ["line", 0, 150, 86, 151, 80, 152, 86],
        ["line", 0, 30, 77, 31, 73, 32, 77],
        ["poly", 0, 73, 78, 87, 78, 84, 40, 76, 40],
        ["line", 11, 77, 44, 76, 76],
        ["line", 0, 80, 42, 60, 25, 50, 28],
        ["line", 0, 80, 45, 100, 22, 112, 18],
        ["line", 0, 78, 50, 64, 40, 58, 42],
        ["line", 0, 82, 48, 98, 38, 106, 40],
        ["line", 0, 80, 42, 82, 14],
        ["line", 0, 60, 25, 58, 16],
        ["line", 0, 100, 22, 98, 12],
        ["line", 0, 50, 28, 44, 24],
        ["line", 0, 112, 18, 118, 20],
        ["line", 0, 106, 40, 112, 36],
        ["line", 0, 73, 78, 63, 83],
        ["line", 0, 87, 78, 97, 83],
        ["line", 0, 76, 78, 72, 85],
        ["plot", 7, 79, 52, 82, 52],
        {"if": "flag:dug", "ops": [["oval", 0, 104, 84, 7, 3], ["oval", 9, 116, 82, 5, 3]]}
      ],
      "scan": "Metal object buried about three paces from the roots!"
    },
    "stream": {
      "name": "Burning Bridge",
      "tags": ["water"],
      "desc": [
        {
          "if": "flag:fire_out",
          "text": "A babbling STREAM of silvery water. The charred footbridge, still steaming, leads FORWARD across it. A frog-like creature called BURBLE sits on a rock nearby. The crossroads is BACK."
        },
        {
          "text": "A babbling STREAM of silvery water blocks the path. The only footbridge is ABLAZE with eerie green FLAMES! Beyond it you glimpse an old stone well. A frog-like creature called BURBLE sits on a rock nearby. The crossroads is BACK."
        }
      ],
      "exits": {
        "back": "crossroads",
        "forward": {
          "to": "well",
          "if": "flag:fire_out",
          "no": "The flames roar higher as you approach. You'd be toast. Literally."
        }
      },
      "items": ["bridge", "fire", "water", "burble"],
      "hint": [
        {"if": "flag:fire_out", "text": "The way FORWARD is clear."},
        {"if": "flag:core:flask_full", "text": "Your flask is full. EXTINGUISH the FIRE."},
        {"text": "Water puts out fire. FILL your FLASK from the stream."}
      ],
      "listen": [
        {"if": "!flag:fire_out", "text": "The fire crackles and hisses over the babble of the stream."},
        {"text": "Just the stream, babbling away happily."}
      ],
      "pic": [
        ["grad", 6, 4, 0, 36],
        ["stars", 1, 61, 14, 0, 0, 160, 26],
        ["oval", 15, 150, 34, 8, 5],
        ["rect", 11, 0, 34, 160, 22],
        ["dither", 4, 0, 34, 160, 22],
        ["line", 5, 0, 34, 159, 34],
        ["rect", 12, 120, 38, 10, 8],
        ["line", 11, 120, 41, 129, 41],
        ["line", 9, 119, 38, 119, 30, 131, 30, 131, 38],
        ["rect", 6, 0, 55, 160, 22],
        ["dither", 14, 0, 55, 160, 2],
        {"if": "!flag:fire_out", "ops": [["dither", 13, 62, 57, 36, 19]]},
        ["line", 14, 10, 60, 20, 60],
        ["line", 14, 40, 70, 52, 70],
        ["line", 1, 110, 62, 118, 62],
        ["line", 14, 130, 72, 142, 72],
        ["line", 1, 20, 74, 26, 74],
        ["line", 3, 100, 68, 110, 68],
        ["rect", 4, 0, 76, 160, 24],
        ["dither", 11, 0, 76, 160, 24],
        ["line", 13, 0, 76, 159, 76],
        ["line", 13, 120, 92, 121, 88, 122, 92],
        ["line", 13, 140, 86, 141, 82, 142, 86],
        ["line", 5, 40, 96, 41, 91, 42, 96],
        ["poly", 8, 64, 99, 96, 99, 86, 50, 74, 50],
        ["line", 9, 64, 99, 74, 50],
        ["line", 9, 96, 99, 86, 50],
        ["line", 9, 68, 80, 92, 80],
        ["line", 9, 70, 70, 90, 70],
        ["line", 9, 72, 60, 88, 60],
        ["line", 9, 66, 90, 94, 90],
        {
          "if": "flag:fire_out",
          "ops": [["dither", 0, 66, 52, 28, 46], ["dither", 12, 78, 30, 6, 18]]
        },
        {
          "if": "!flag:fire_out",
          "ops": [
            ["poly", 13, 64, 84, 68, 58, 73, 70, 78, 48, 83, 66, 88, 52, 93, 70, 96, 84],
            ["poly", 5, 68, 84, 72, 68, 78, 60, 84, 70, 90, 64, 92, 84],
            ["plot", 7, 70, 54, 86, 46, 80, 42, 92, 50]
          ]
        }
      ]
    },
    "well": {
      "name": "The Old Well",
      "desc": [
        {
          "if": "flag:rope_tied",
          "text": "An old stone WELL stands on the far bank, your rope tied to its rusty winch and dangling DOWN into darkness. A path leads FORWARD to a domed building. The bridge is BACK."
        },
        {
          "text": "An old stone WELL with a rusty winch stands on the far bank. Its shaft drops DOWN into total darkness - far too deep and slimy to climb unaided. A path leads FORWARD to a domed building. The bridge is BACK."
        }
      ],
      "exits": {
        "back": "stream",
        "forward": "door",
        "down": {"to": "wellbottom", "if": "flag:rope_tied", "no": "The shaft is sheer and slimy. You'd need a rope."}
      },
      "items": ["wellshaft", "tiedrope"],
      "hint": [
        {"if": "flag:rope_tied", "text": "Climb DOWN. Keep your candle lit!"},
        {"text": "You'll need a ROPE. TIE it to the well."}
      ],
      "pic": [
        ["grad", 6, 4, 0, 52],
        ["stars", 1, 71, 20, 0, 0, 160, 36],
        ["circ", 7, 24, 12, 5],
        ["oval", 15, 138, 50, 16, 14],
        ["oval", 12, 132, 50, 10, 12],
        ["rect", 11, 136, 36, 4, 14],
        ["rect", 4, 0, 50, 160, 50],
        ["dither", 11, 0, 50, 160, 50],
        ["line", 5, 0, 50, 159, 50],
        ["poly", 9, 112, 50, 122, 50, 159, 66, 159, 76],
        ["dither", 8, 118, 52, 40, 20],
        ["rect", 12, 60, 55, 40, 30],
        ["dither", 15, 60, 56, 40, 4],
        ["line", 11, 60, 65, 99, 65],
        ["line", 11, 60, 75, 99, 75],
        ["line", 11, 70, 55, 70, 65],
        ["line", 11, 86, 65, 86, 75],
        ["line", 11, 76, 75, 76, 84],
        ["dither", 5, 60, 78, 40, 7],
        ["plot", 13, 64, 80, 90, 82, 70, 84],
        ["oval", 11, 80, 55, 20, 4],
        ["oval", 0, 80, 55, 17, 3],
        ["rect", 9, 62, 30, 3, 25],
        ["rect", 9, 95, 30, 3, 25],
        ["rect", 9, 60, 29, 40, 3],
        ["line", 8, 60, 29, 99, 29],
        ["line", 8, 98, 33, 104, 38],
        ["rect", 8, 106, 77, 8, 8],
        ["line", 11, 106, 79, 113, 79],
        ["line", 12, 106, 77, 110, 73, 114, 77],
        {"if": "flag:rope_tied", "ops": [["line", 7, 80, 32, 80, 55], ["plot", 7, 79, 32, 81, 32]]}
      ],
      "scan": "Shaft depth: 30 metres. Metal signature at the bottom. Rope recommended."
    },
    "wellbottom": {
      "name": "Bottom of the Well",
      "dark": true,
      "desc": "You dangle at the bottom of the well, ankle-deep in cold slime. Something glints in a crack in the wall. The rope leads back UP.",
      "exits": {"up": "well"},
      "items": ["note", "navchip"],
      "hint": "Take everything and READ the NOTE.",
      "pic": [
        ["bg", 11],
        ["line", 12, 0, 10, 159, 10],
        ["line", 12, 0, 22, 159, 22],
        ["line", 12, 0, 34, 159, 34],
        ["line", 12, 0, 46, 159, 46],
        ["line", 12, 0, 58, 159, 58],
        ["line", 12, 0, 70, 159, 70],
        ["line", 12, 30, 10, 30, 22],
        ["line", 12, 110, 10, 110, 22],
        ["line", 12, 60, 22, 60, 34],
        ["line", 12, 140, 22, 140, 34],
        ["line", 12, 20, 34, 20, 46],
        ["line", 12, 130, 46, 130, 58],
        ["line", 12, 40, 58, 40, 70],
        ["line", 12, 100, 58, 100, 70],
        ["poly", 15, 68, 0, 92, 0, 98, 80, 62, 80],
        ["dither", 11, 60, 0, 40, 80],
        ["rect", 5, 0, 80, 160, 20],
        ["dither", 13, 0, 80, 160, 3],
        ["dither", 9, 0, 86, 160, 14],
        ["line", 7, 80, 0, 80, 84],
        ["line", 0, 120, 38, 124, 48, 121, 60],
        ["plot", 14, 70, 84, 90, 86, 110, 88, 50, 90],
        ["plot", 3, 40, 20, 130, 14, 66, 30],
        ["dither", 0, 0, 0, 16, 100],
        ["dither", 0, 144, 0, 16, 100]
      ]
    },
    "door": {
      "name": "Observatory Door",
      "desc": [
        {
          "if": "flag:obs_open",
          "text": "A domed observatory of white stone. Its round door stands open AHEAD. The well is BACK."
        },
        {
          "text": "A domed observatory of white stone. The round steel DOOR is sealed. Beside it a KEYPAD glows with four empty digits: _ _ _ _. The well is BACK."
        }
      ],
      "exits": {
        "back": "well",
        "forward": {
          "to": "observatory",
          "if": "flag:obs_open",
          "no": "The steel door is sealed. The keypad blinks expectantly."
        }
      },
      "items": ["keypad", "obsdoor"],
      "hint": [
        {"if": "flag:obs_open", "text": "The door is open. Go FORWARD."},
        {"if": "has:note", "text": "Remember the note from the well? TYPE the code."},
        {"text": "You need a 4-digit code. Someone may have written it down... somewhere deep."}
      ],
      "pic": [
        ["grad", 6, 4, 0, 62],
        ["stars", 1, 17, 26, 0, 0, 160, 34],
        ["oval", 12, 76, 44, 46, 28],
        ["oval", 15, 86, 42, 38, 25],
        ["rect", 15, 32, 44, 97, 30],
        ["dither", 12, 32, 44, 30, 30],
        ["poly", 11, 77, 16, 84, 16, 84, 44, 77, 44],
        ["line", 0, 80, 16, 80, 44],
        ["line", 12, 32, 50, 128, 50],
        ["line", 12, 32, 70, 128, 70],
        ["oval", 12, 80, 62, 10, 12],
        ["oval", 11, 80, 62, 8, 10],
        ["ring", 15, 80, 62, 10, 12],
        {"if": "flag:obs_open", "ops": [["oval", 0, 80, 62, 8, 10], ["dither", 7, 74, 58, 12, 14]]},
        ["rect", 0, 97, 54, 8, 10],
        ["rect", 13, 98, 55, 6, 2],
        ["plot", 15, 98, 58, 100, 58, 102, 58, 98, 60, 100, 60, 102, 60, 100, 62],
        ["rect", 4, 0, 72, 160, 28],
        ["dither", 11, 0, 72, 160, 28],
        ["rect", 12, 66, 72, 28, 3],
        ["rect", 11, 62, 75, 36, 3],
        ["line", 13, 20, 90, 21, 86, 22, 90],
        ["line", 13, 140, 94, 141, 90, 142, 94]
      ],
      "scan": "Keypad expects a 4-digit code. Last digits pressed... data corrupted."
    },
    "observatory": {
      "name": "Observatory",
      "beacon": true,
      "desc": [
        {
          "if": "flag:scoped",
          "text": "A circular chamber under a cracked glass dome. A great brass TELESCOPE points out through the roof. A workbench is cluttered with tools, a broken ROBOT slumps beside it, and a small BEACON glows by the door. The exit is BACK, and the hidden path to the standing stones leads RIGHT."
        },
        {
          "text": "A circular chamber under a cracked glass dome. A great brass TELESCOPE points out through a slot in the roof. A workbench is cluttered with tools, a broken ROBOT slumps beside it, and a small BEACON glows by the door. The exit is BACK."
        }
      ],
      "exits": {
        "back": "door",
        "right": {
          "to": "stones",
          "if": "flag:scoped",
          "hidden": true,
          "no": "There's just fog out there. You'd get hopelessly lost."
        }
      },
      "items": ["telescope", "bench", "k7"],
      "hint": [
        {"if": "!flag:k7_fixed", "text": "FIX the ROBOT with your electronic screwdriver, then TALK to it."},
        {"if": "!flag:scoped", "text": "LOOK THROUGH the TELESCOPE."},
        {"text": "The standing stones are to the RIGHT."}
      ],
      "pic": [
        ["bg", 12],
        ["dither", 15, 0, 46, 160, 30],
        ["oval", 0, 80, 0, 80, 46],
        ["stars", 1, 5, 40, 10, 0, 140, 40],
        ["stars", 7, 9, 6, 30, 0, 100, 30],
        ["circ", 4, 40, 14, 4],
        ["line", 15, 60, 4, 70, 20, 66, 32],
        ["line", 15, 110, 8, 102, 24],
        ["line", 11, 0, 46, 159, 46],
        ["rect", 6, 100, 50, 20, 12],
        ["stars", 1, 9, 8, 100, 50, 20, 12],
        ["line", 1, 102, 52, 110, 58, 116, 54],
        ["rect", 9, 0, 76, 160, 24],
        ["dither", 8, 0, 76, 160, 24],
        ["line", 8, 0, 86, 159, 86],
        ["poly", 7, 58, 70, 66, 75, 112, 20, 104, 15],
        ["line", 8, 62, 72, 108, 17],
        ["line", 1, 60, 70, 106, 16],
        ["line", 9, 64, 73, 54, 92],
        ["line", 9, 64, 73, 74, 92],
        ["line", 9, 64, 73, 64, 94],
        ["rect", 8, 54, 68, 6, 5],
        ["rect", 8, 114, 62, 42, 4],
        ["line", 7, 114, 62, 155, 62],
        ["rect", 9, 117, 66, 3, 20],
        ["rect", 9, 151, 66, 3, 20],
        ["plot", 2, 140, 60, 146, 60],
        ["plot", 1, 150, 61],
        ["rect", 3, 130, 58, 4, 4],
        ["line", 11, 122, 61, 126, 57],
        ["ring", 13, 10, 88, 8, 5],
        ["oval", 5, 10, 88, 5, 3],
        ["oval", 13, 10, 87, 3, 2]
      ]
    },
    "stones": {
      "name": "Standing Stones",
      "desc": [
        {
          "if": "flag:hound_gone",
          "text": "A ring of ancient standing stones hums in the fog. In their centre, a dark arch of machinery - the PORTAL MACHINE - lies FORWARD. A flat ALTAR stone sits nearby. The observatory is LEFT."
        },
        {
          "text": "A ring of ancient standing stones hums in the fog. In the centre stands a dark arch of machinery - but prowling in front of it is a GLIMMERHOUND: a wolf-sized beast with glowing fur and far too many teeth. It growls at you. A flat ALTAR stone sits nearby. The observatory is LEFT."
        }
      ],
      "exits": {
        "left": "observatory",
        "back": "observatory",
        "forward": {
          "to": "portal",
          "if": "flag:hound_gone",
          "die": "You try to stroll past the Glimmerhound. It considers this very rude... and eats you."
        }
      },
      "items": ["hound", "altar", "tin"],
      "hint": [
        {"if": "flag:hound_gone", "text": "OPEN the TIN, then go FORWARD to the portal machine."},
        {"text": "Remember what the back of the map said? Every dog loves a... THROW it."}
      ],
      "listen": [
        {"if": "!flag:hound_gone", "text": "A low, rumbling growl. It's coming from the Glimmerhound. Obviously."},
        {"text": "The stones hum a deep note you feel in your teeth."}
      ],
      "pic": [
        ["grad", 0, 4, 0, 66],
        ["stars", 1, 41, 20, 0, 0, 160, 34],
        ["circ", 15, 20, 10, 4],
        ["poly", 11, 0, 60, 40, 52, 80, 58, 120, 50, 159, 56, 159, 66, 0, 66],
        ["rect", 11, 0, 64, 160, 36],
        ["dither", 4, 0, 64, 160, 36],
        ["poly", 0, 64, 66, 64, 30, 96, 30, 96, 66, 89, 66, 89, 37, 71, 37, 71, 66],
        ["dither", 6, 71, 37, 18, 29],
        ["plot", 10, 67, 40, 67, 50, 67, 60, 93, 40, 93, 50, 93, 60, 80, 33],
        ["rect", 12, 8, 34, 14, 36],
        ["line", 15, 8, 34, 8, 69],
        ["plot", 13, 12, 50, 18, 60, 14, 40],
        ["rect", 12, 138, 34, 14, 36],
        ["line", 15, 138, 34, 138, 69],
        ["plot", 13, 142, 44, 148, 58],
        ["rect", 12, 6, 30, 18, 4],
        ["rect", 12, 136, 30, 18, 4],
        ["line", 15, 6, 30, 23, 30],
        ["line", 15, 136, 30, 153, 30],
        ["rect", 15, 30, 40, 8, 28],
        ["line", 12, 37, 40, 37, 67],
        ["plot", 11, 33, 50, 34, 56],
        ["rect", 15, 122, 40, 8, 28],
        ["line", 12, 129, 40, 129, 67],
        ["plot", 11, 125, 48],
        ["rect", 12, 48, 46, 6, 20],
        ["line", 15, 48, 46, 48, 65],
        ["rect", 12, 106, 46, 6, 20],
        ["line", 15, 106, 46, 106, 65],
        ["rect", 15, 102, 72, 26, 5],
        ["line", 1, 102, 72, 127, 72],
        ["rect", 12, 106, 77, 18, 8],
        ["dither", 11, 106, 80, 18, 5],
        ["plot", 4, 108, 74, 114, 74, 120, 74],
        ["dither", 15, 0, 62, 160, 4],
        ["dither", 12, 0, 90, 160, 1]
      ],
      "scan": "Energy readings off the scale from the arch. One large lifeform nearby."
    },
    "portal": {
      "name": "Portal Machine",
      "desc": [
        {
          "if": "flag:machine_on",
          "text": "The portal machine thrums with power! Inside the arch a swirling vortex of stars spirals UP into the sky. The stones are BACK."
        },
        {
          "if": "flag:panel_open",
          "text": "A towering arch of alien machinery, cold and dead. Its access PANEL hangs open, revealing an empty FUSE socket. The stones are BACK."
        },
        {
          "text": "A towering arch of alien machinery, cold and dead. A small access PANEL on its side is held shut by four tiny screws. The stones are BACK."
        }
      ],
      "exits": {"back": "stones"},
      "items": ["machine", "mpanel"],
      "hint": [
        {"if": "flag:machine_on", "text": "Go UP into the vortex!"},
        {"if": "flag:panel_open", "text": "PUT the FUSE in the socket."},
        {"text": "OPEN the PANEL - your electronic screwdriver will do it."}
      ],
      "pic": [
        ["grad", 0, 4, 0, 70],
        ["stars", 1, 51, 40, 0, 0, 160, 60],
        ["rect", 11, 0, 82, 160, 18],
        ["dither", 4, 0, 82, 160, 18],
        ["line", 11, 40, 84, 20, 99],
        ["line", 11, 120, 84, 140, 99],
        ["line", 0, 56, 84, 64, 99],
        ["line", 0, 104, 84, 96, 99],
        ["rect", 12, 40, 22, 16, 62],
        ["rect", 12, 104, 22, 16, 62],
        ["poly", 12, 40, 24, 56, 24, 80, 12, 104, 24, 120, 24, 80, 2],
        ["line", 15, 40, 24, 80, 2, 120, 24],
        ["rect", 11, 43, 56, 10, 10],
        ["plot", 15, 44, 57, 51, 57, 44, 64, 51, 64],
        {"if": "flag:panel_open", "ops": [["rect", 0, 43, 56, 10, 10], ["rect", 12, 46, 59, 4, 4]]},
        {
          "if": "!flag:machine_on",
          "ops": [["oval", 0, 80, 54, 22, 29], ["plot", 11, 48, 32, 48, 42, 112, 32, 112, 42]]
        },
        {
          "if": "flag:machine_on",
          "ops": [
            ["oval", 6, 80, 54, 22, 29],
            ["ring", 14, 80, 54, 18, 24],
            ["ring", 1, 80, 54, 12, 16],
            ["ring", 3, 80, 54, 6, 8],
            ["stars", 1, 9, 24, 62, 28, 36, 50],
            ["plot", 7, 48, 32, 48, 42, 48, 52, 112, 32, 112, 42, 112, 52]
          ]
        },
        ["plot", 4, 44, 30, 44, 40, 44, 50, 116, 30, 116, 40, 116, 50],
        ["line", 15, 41, 24, 41, 83]
      ],
      "scan": "Power cell intact. Fuse socket EMPTY. Access panel held by 4 micro-screws."
    }
  },
  "items": {
    "panel": {
      "name": "control panel",
      "words": ["panel", "control panel", "controls", "label"],
      "scenery": true,
      "desc": "Behind the cracked cover: a RED wire and a BLUE wire. A scorched label reads: 'HATCH LOCK = RED'."
    },
    "wires": {
      "name": "wires",
      "words": ["wire", "wires", "cables", "cable"],
      "scenery": true,
      "hidden": true,
      "desc": "A RED wire and a BLUE wire."
    },
    "redwire": {
      "name": "red wire",
      "words": ["red wire", "red"],
      "scenery": true,
      "hidden": true,
      "desc": "A red wire, running to the hatch lock."
    },
    "bluewire": {
      "name": "blue wire",
      "words": ["blue wire", "blue"],
      "scenery": true,
      "hidden": true,
      "desc": "A thick blue wire, humming faintly. It carries serious power."
    },
    "hatch": {
      "name": "hatch",
      "words": ["hatch", "door"],
      "scenery": true,
      "desc": [
        {"if": "flag:hatch_open", "text": "The hatch hangs open."},
        {"text": "A heavy round hatch, locked tight."}
      ]
    },
    "stone": {
      "name": "smooth stone",
      "words": ["stone", "rock", "pebble", "smooth stone"],
      "desc": "A smooth, fist-sized stone. Nice and heavy. Good for throwing.",
      "pic": [["oval", 15, 58, 92, 3, 2], ["plot", 1, 57, 91]]
    },
    "podshell": {
      "name": "escape pod",
      "words": ["pod", "escape pod", "capsule"],
      "scenery": true,
      "desc": "Your escape pod, half-buried and smoking. It will never fly again."
    },
    "signpost": {
      "name": "signpost",
      "words": ["signpost", "sign", "post", "arrows"],
      "scenery": true,
      "desc": "A crooked wooden signpost with three arrows.",
      "read": "LEFT: BOG & HERMIT   RIGHT: SCARECROW FIELD   FORWARD: RIVER & OBSERVATORY"
    },
    "beaconstone": {
      "name": "beacon",
      "words": ["beacon", "beacon stone", "green stone", "glow"],
      "scenery": true,
      "desc": "Ancient tech, humming softly. It seems to remember you. (Beacons save your progress. If you die, you return to the last one.)"
    },
    "swamp": {
      "name": "bog",
      "words": ["bog", "swamp", "marsh", "mud", "surface"],
      "scenery": true,
      "desc": "Green, bubbling and deeply untrustworthy. There must be solid ground in there somewhere."
    },
    "hermit": {
      "name": "hermit",
      "words": ["hermit", "man", "old man", "beard"],
      "npc": true,
      "scenery": true,
      "desc": "Skin and bones and beard. Mostly beard. His stomach rumbles like distant thunder.",
      "talk": [
        {
          "if": "flag:hermit_fed",
          "text": "\"The scarecrow knows where the treasure sleeps. And the beast by the stones? Soft as butter if you've got a bone for it.\""
        },
        {"text": "\"Fooood... forty moons I've eaten nothing but moss. Got any grub, stranger?\""}
      ],
      "refuse": "The hermit sniffs it. \"Can't eat THAT!\"",
      "pic": [
        {
          "if": "!flag:hermit_fed",
          "ops": [
            [
              "sprite",
              70,
              44,
              2,
              "...9999...",
              "..999999..",
              "..9aaaa9..",
              "..a0aa0a..",
              "..aaaaaa..",
              "..f1111f..",
              ".9f1111f9.",
              "99f1111f99",
              "9a9f11f9a9",
              "999f11f999",
              "9999ff9999",
              "9999ff9999",
              "99999f9999",
              "9999999999",
              "9999999999",
              ".99999999.",
              ".99999999.",
              ".88....88."
            ]
          ]
        },
        {
          "if": "flag:hermit_fed",
          "ops": [
            [
              "sprite",
              100,
              46,
              2,
              "...9999...",
              "..999999..",
              "..9aaaa9..",
              "..a0aa0a..",
              "..aaaaaa..",
              "..f1111f..",
              ".9f1111f9.",
              "99f1111f99",
              "9a9f11f9a9",
              "999f11f999",
              "9999ff9999",
              "9999ff9999",
              "99999f9999",
              "9999999999",
              "9999999999",
              ".99999999.",
              ".99999999.",
              ".88....88."
            ]
          ]
        }
      ],
      "alien": true
    },
    "rope": {
      "name": "coil of rope",
      "words": ["rope", "coil", "coil of rope"],
      "desc": "Strong, hairy rope. About twenty metres of it.",
      "pic": [["ring", 7, 40, 88, 8, 4], ["ring", 7, 40, 88, 5, 2], ["plot", 7, 48, 86, 50, 84]]
    },
    "bone": {
      "name": "big bone",
      "words": ["bone", "big bone"],
      "desc": "A huge knobbly bone. Some creature would absolutely love this.",
      "pic": [["rect", 1, 72, 88, 14, 2], ["oval", 1, 71, 88, 2, 2], ["oval", 1, 86, 89, 2, 2]]
    },
    "spade": {"name": "spade", "words": ["spade", "shovel"], "desc": "The hermit's old spade. The blade is still sharp."},
    "pot": {
      "name": "pot",
      "words": ["pot", "stew", "stove", "soup"],
      "scenery": true,
      "desc": "A pot of grey bubbling moss stew. It's looking back at you."
    },
    "scarecrow": {
      "name": "scarecrow",
      "words": ["scarecrow", "pocket", "coat"],
      "scenery": true,
      "desc": "A three-armed scarecrow in a tattered red coat. Its pumpkin-ish head grins at nothing."
    },
    "map": {
      "name": "torn map",
      "words": ["map", "torn map", "paper", "scrap"],
      "desc": "A torn scrap of map. Try READing it.",
      "pic": [["rect", 1, 63, 52, 4, 5]]
    },
    "oaktree": {
      "name": "dead oak",
      "words": ["oak", "tree", "roots", "root", "dead oak"],
      "scenery": true,
      "desc": "Long dead, but still standing. Its roots grip the hill like fingers."
    },
    "coil": {
      "name": "flux coil",
      "words": ["coil", "flux coil", "flux"],
      "part": true,
      "desc": "A glowing coil of alien metal. One of the STARLING's missing parts!"
    },
    "bridge": {
      "name": "footbridge",
      "words": ["bridge", "footbridge", "planks"],
      "scenery": true,
      "desc": [
        {"if": "flag:fire_out", "text": "Charred, but it'll hold."},
        {"text": "It's on fire. Very much on fire."}
      ]
    },
    "fire": {
      "name": "fire",
      "words": ["fire", "flames", "flame", "blaze"],
      "scenery": true,
      "desc": [
        {"if": "flag:fire_out", "text": "Just wisps of steam now."},
        {"text": "Eerie green flames. They hiss when spray from the stream hits them."}
      ]
    },
    "water": {
      "name": "stream",
      "words": ["stream", "water", "river"],
      "scenery": true,
      "desc": "Cold, clear, silvery water."
    },
    "wellshaft": {
      "name": "well",
      "words": ["well", "shaft", "winch"],
      "scenery": true,
      "desc": "An old stone well with a rusty winch. You drop a pebble in... and never hear it land."
    },
    "tiedrope": {
      "name": "rope",
      "words": ["rope"],
      "scenery": true,
      "hidden": true,
      "desc": "Your rope, tied firmly to the winch."
    },
    "note": {
      "name": "damp note",
      "words": ["note", "damp note", "paper"],
      "desc": "A soggy scrap of paper with writing on it.",
      "read": "The ink has run, but you can make out: 'OBSERVATORY DOOR CODE: 7 3 0 4. Don't tell the hermit.'",
      "pic": [["rect", 1, 40, 88, 7, 4], ["line", 12, 41, 89, 45, 89]]
    },
    "navchip": {
      "name": "nav chip",
      "words": ["chip", "nav chip", "nav", "navchip", "glint"],
      "part": true,
      "desc": "A navigation chip, still blinking. One of the STARLING's missing parts!",
      "pic": [["rect", 3, 120, 46, 4, 3], ["plot", 1, 121, 47]]
    },
    "keypad": {
      "name": "keypad",
      "words": ["keypad", "pad", "keys", "buttons", "digits"],
      "scenery": true,
      "desc": "Ten worn buttons and a tiny screen: _ _ _ _. TYPE a 4-digit code, e.g. TYPE 1234."
    },
    "obsdoor": {
      "name": "door",
      "words": ["door", "steel door"],
      "scenery": true,
      "desc": [
        {"if": "flag:obs_open", "text": "It's open."},
        {"text": "Thick steel. Your knife won't help here."}
      ]
    },
    "telescope": {
      "name": "telescope",
      "words": ["telescope", "scope", "eyepiece", "lens"],
      "scenery": true,
      "desc": "A great brass telescope on a tripod. You could LOOK THROUGH it."
    },
    "bench": {
      "name": "workbench",
      "words": ["bench", "workbench", "tools"],
      "scenery": true,
      "desc": "Rusty spanners, bent nails, a mouldy sandwich..."
    },
    "hound": {
      "name": "Glimmerhound",
      "words": ["hound", "glimmerhound", "beast", "dog", "wolf", "creature"],
      "npc": true,
      "scenery": true,
      "desc": "Glowing blue fur, glowing red eyes, and teeth like a drawer full of knives. It's watching your pockets.",
      "talk": "\"Grrrrrrr.\" It is not a conversationalist.",
      "refuse": "The Glimmerhound sniffs it, then goes back to growling at you.",
      "pic": [
        ["dither", 3, 52, 60, 56, 30],
        [
          "sprite",
          56,
          64,
          2,
          "................e...e.",
          "...............eee.ee.",
          "e..............eeeeee.",
          ".e.............ee2eee3",
          "..e...........eeeeeeee",
          "..eeeeeeeeeeeeee1e1e1.",
          ".eeeeeeeeeeeeeeeeeee..",
          ".e3e3e3e3e3e3eeeee....",
          "..eeeeeeeeeeeeeee.....",
          "..ee.ee......ee.ee....",
          "..ee.ee......ee.ee....",
          ".33..33.....33..33...."
        ]
      ],
      "scan": "Lifeform: GLIMMERHOUND. Temperament: hungry. Favourite food: bones."
    },
    "altar": {
      "name": "altar",
      "words": ["altar", "altar stone", "slab"],
      "scenery": true,
      "desc": "A flat slab carved with spirals."
    },
    "tin": {
      "name": "rusty tin",
      "words": ["tin", "rusty tin", "box", "can"],
      "desc": "A rusty tin, rusted shut. You could try to OPEN it.",
      "pic": [["rect", 8, 110, 69, 7, 3], ["plot", 2, 112, 69]],
      "scan": "Two objects inside: a metal bag and a glass cylinder."
    },
    "rivets": {
      "name": "hull rivets",
      "words": ["rivets", "hull rivets", "bag", "rivet"],
      "part": true,
      "desc": "A bag of shiny hull rivets. One of the STARLING's missing parts!"
    },
    "fuse": {
      "name": "glass fuse",
      "words": ["fuse", "glass fuse"],
      "desc": "A glass fuse. The filament inside glows faintly."
    },
    "machine": {
      "name": "portal machine",
      "words": ["machine", "arch", "portal", "vortex", "portal machine"],
      "scenery": true,
      "desc": [
        {"if": "flag:machine_on", "text": "A vortex of stars swirls inside the arch, spiralling UP."},
        {"text": "A towering arch of alien metal. Cold and dead."}
      ]
    },
    "mpanel": {
      "name": "access panel",
      "words": ["panel", "access panel", "screws", "screw", "socket"],
      "scenery": true,
      "desc": [
        {"if": "flag:panel_open", "text": "An empty FUSE socket. A sticker says: 'INSERT FUSE. STAND CLEAR.'"},
        {"text": "A small panel held shut by four tiny screws."}
      ]
    },
    "locker": {
      "name": "locker",
      "words": ["locker", "cabinet", "cupboard", "toolkit"],
      "scenery": true,
      "desc": [
        {"if": "flag:locker_open", "text": "An emergency locker, now open."},
        {"text": "A dented emergency locker on the wall. It's shut. You could OPEN it."}
      ]
    },
    "zib": {
      "name": "Zib",
      "words": ["zib", "alien", "scout", "creature", "figure"],
      "npc": true,
      "scenery": true,
      "alien": true,
      "desc": [
        {"if": "flag:zib_healed", "text": "A small green alien scout with two wobbly antennae. Much perkier now."},
        {"text": "A small green alien slumped against a rock, clutching a nasty wound. It needs medical help, fast."}
      ],
      "talk": [
        {
          "if": "flag:zib_healed",
          "text": "\"I'm Zib, scout of the Glimmer Reaches. I saw your ship break up - its parts rained across every world on the Starways! Three fell here on Grimmoor. Tip: the green BEACONS are ancient tech. If you die, they pull you back. And never walk into the bog blind - throw something first!\""
        },
        {"text": "\"Ugh... hurt... so hurt... if only... someone had... medicine...\""}
      ],
      "refuse": "\"Thanks, but I don't need that.\"",
      "pic": [
        {
          "if": "!flag:zib_healed",
          "ops": [
            [
              "sprite",
              8,
              58,
              2,
              "..7......7..",
              "...7....7...",
              "...dddddd...",
              "..dddddddd..",
              "..d01dd01d..",
              "..d00dd00d..",
              "..dddddddd..",
              "...d5555d...",
              "..55555555..",
              ".5d555555d5.",
              ".5d552255d5.",
              "..55522555..",
              "..55...55...",
              ".555...555.."
            ]
          ]
        },
        {
          "if": "flag:zib_healed",
          "ops": [
            [
              "sprite",
              8,
              56,
              2,
              "..7......7..",
              "...7....7...",
              "...dddddd...",
              "..dddddddd..",
              "..d01dd01d..",
              "..d00dd00d..",
              "..dddd0ddd..",
              "...d5555d...",
              "d.55555555.d",
              "d5d555555d5d",
              "..d555555d..",
              "..55555555..",
              "..55...55...",
              ".555...555.."
            ]
          ]
        }
      ]
    },
    "mags": {
      "name": "Mags",
      "words": ["mags", "crow", "bird", "raven"],
      "npc": true,
      "scenery": true,
      "alien": true,
      "desc": "A scruffy three-eyed crow perched on the scarecrow's arm. All three eyes are watching you.",
      "talk": "\"CAW! Name's Mags. Three paces from the roots, three paces! The old oak keeps a secret, caw! And the hermit's got a spade he never uses. Feed him and he'll part with it!\"",
      "refuse": "Mags pecks it, then loses interest.",
      "pic": [
        ["sprite", 41, 35, "...000...", "..02220..", "..0000077", "..000000.", ".00000000", "000000...", "...7..7.."]
      ]
    },
    "burble": {
      "name": "Burble",
      "words": ["burble", "frog", "toad", "creature"],
      "npc": true,
      "scenery": true,
      "alien": true,
      "desc": "A plump frog-like creature the size of a cat, sitting on a rock in the stream. It blinks at you slowly.",
      "talk": [
        {
          "if": "flag:fire_out",
          "text": "\"Blub! Well done, fire-drowner! Across the bridge there's a deep old well. Bring a rope - and keep your candle lit down there, it's black as a boot.\""
        },
        {
          "text": "\"Blub! That fire's been burning for days. Fire hates water, and water loves a flask, blub! The stream's right here, isn't it?\""
        }
      ],
      "refuse": "\"Blub. Can't eat that.\"",
      "pic": [
        ["oval", 12, 26, 76, 14, 3],
        ["oval", 15, 24, 75, 9, 1],
        [
          "sprite",
          14,
          58,
          2,
          ".77......77.",
          "7707....7707",
          ".77dddddd77.",
          ".dddddddddd.",
          "dd00000000dd",
          "dddddddddddd",
          ".d555555555.",
          "d55.5555.55d",
          "dd..dddd..dd"
        ]
      ]
    },
    "k7": {
      "name": "K-7",
      "words": ["k7", "k 7", "robot", "droid", "android", "machine"],
      "npc": true,
      "scenery": true,
      "alien": true,
      "desc": [
        {"if": "flag:k7_fixed", "text": "K-7, the observatory's helper robot. Its visor glows a friendly green."},
        {
          "text": "A small helper robot slumped by the bench, sparking from a loose panel in its neck. Its visor flickers red. It needs FIXING."
        }
      ],
      "talk": [
        {
          "if": "flag:k7_fixed",
          "text": "\"SYSTEMS RESTORED. THANK YOU. I am K-7. The portal machine in the stone ring needs a replacement FUSE - my master hid one in a tin under the altar. The guardian beast there is dangerous... but statistically it cannot resist a BONE. Use the telescope to find the way.\""
        },
        {"text": "\"BZZT... ERR-OR... REPAIR... REQUIRED... BZZT.\""}
      ],
      "refuse": "\"THAT ITEM IS NOT REQUIRED. BZZT.\"",
      "pic": [
        [
          "sprite",
          20,
          48,
          2,
          ".....7....",
          ".....b....",
          "..ffffff..",
          "..fbbbbf..",
          "..fb22bf..",
          "..fbbbbf..",
          "..ffffff..",
          "....bb....",
          ".cccccccc.",
          "cfcc77cccb",
          "cfcc22cccb",
          "cfcccccccb",
          ".cccccccc.",
          "..bb..bb..",
          "..cc..cc..",
          "..cc..cc..",
          ".fff..fff."
        ],
        {"if": "!flag:k7_fixed", "ops": [["plot", 7, 19, 58, 42, 54, 1, 40, 50, 18, 62]]},
        {"if": "flag:k7_fixed", "ops": [["rect", 13, 28, 56, 4, 2]]}
      ]
    }
  },
  "actions": [
    {
      "verb": "use",
      "noun": "machine",
      "room": "portal",
      "if": "flag:machine_on",
      "do": [
        {"say": "It's already humming with power. The vortex spirals UP."}
      ]
    },
    {
      "verb": "use",
      "noun": "machine",
      "room": "portal",
      "if": "!has:fuse",
      "do": [
        {
          "say": "You hunt for a switch. Nothing. The machine is dead - something's missing from inside the access panel."
        }
      ]
    },
    {
      "verb": "deactivate",
      "noun": "machine",
      "room": "portal",
      "do": [
        {"say": "And strand yourself here forever? Better not."}
      ]
    },
    {
      "verb": ["use", "deactivate"],
      "noun": "beaconstone",
      "do": [
        {"say": "The beacon has no switch. It hums along on its own, remembering you."}
      ]
    },
    {
      "verb": ["open", "examine"],
      "noun": "locker",
      "if": "!flag:locker_open",
      "do": [
        {"set": "locker_open"},
        {"show": "edriver"},
        {
          "say": "The locker door squeals open. Inside, clipped to the wall: an ELECTRONIC SCREWDRIVER - the STARLING's best tool. It fixes things, opens things, and can SCAN for secrets."
        },
        {"score": 5}
      ]
    },
    {
      "verb": ["heal", "use", "give"],
      "noun": ["zib", "medpen"],
      "room": "crater",
      "if": ["!flag:zib_healed", "has:medpen", "!flag:core:pen_used>=3"],
      "do": [
        {"inc": "core:pen_used"},
        {"set": "zib_healed"},
        {"sound": "good"},
        {
          "say": "You press the medical pen to the alien's arm. HISS! The wound glows, seals, and vanishes. The little alien blinks, sits up and chirps something at you."
        },
        {"score": 20}
      ]
    },
    {
      "verb": ["heal", "use"],
      "noun": ["zib", "medpen"],
      "room": "crater",
      "if": "flag:zib_healed",
      "do": [
        {"say": "Zib is fine now. Save the doses."}
      ]
    },
    {
      "verb": ["fix", "use", "open"],
      "noun": ["k7", "edriver"],
      "room": "observatory",
      "if": ["!flag:k7_fixed", "has:edriver"],
      "do": [
        {"set": "k7_fixed"},
        {"sound": "good"},
        {
          "say": "You open K-7's neck panel with the electronic screwdriver and re-seat a scorched chip. BZZT... whirrr... CLICK. Its visor flickers from red to green and it stands up straight!"
        },
        {"score": 15}
      ],
      "fail": "Its circuits are delicate. You need a precision tool."
    },
    {"verb": ["heal"], "noun": "k7", "do": [{"say": "It's a robot. It needs FIXING, not medicine."}]},
    {
      "verb": "examine",
      "noun": "panel",
      "room": "pod",
      "once": true,
      "do": [
        {
          "say": "You prise off the cracked cover. Behind it, a RED wire and a BLUE wire run to the hatch. A scorched label reads: 'HATCH LOCK = RED'."
        },
        {"set": "panel_seen"},
        {"show": ["wires", "redwire", "bluewire"]},
        {"score": 5}
      ]
    },
    {"verb": "cut", "noun": "redwire", "if": "flag:hatch_open", "do": [{"say": "You already cut it."}]},
    {
      "verb": "cut",
      "noun": "redwire",
      "if": "has:knife",
      "do": [
        {
          "say": "You slice through the red wire. CLUNK! The lock releases and the hatch swings open. Cold fog rolls in."
        },
        {"set": "hatch_open"},
        {"score": 15},
        {"sound": "good"}
      ],
      "fail": "You need something sharp."
    },
    {
      "verb": "cut",
      "noun": "bluewire",
      "if": "has:knife",
      "do": [
        {
          "die": "You slice through the blue wire. FZZZAP! Ten thousand volts of ship power say hello. Your hair will never be the same."
        }
      ],
      "fail": "You need something sharp."
    },
    {"verb": "cut", "noun": "wires", "do": [{"say": "Which one? The RED wire or the BLUE wire?"}]},
    {
      "verb": ["open", "push", "pull"],
      "noun": "hatch",
      "if": "!flag:hatch_open",
      "do": [
        {"say": "It won't budge. The lock mechanism is jammed."}
      ]
    },
    {"verb": "enter", "noun": "podshell", "do": [{"goto": "pod"}]},
    {
      "verb": "throw",
      "noun": "stone",
      "room": "bog",
      "if": "!flag:bog_mapped",
      "do": [
        {"remove": "stone"},
        {
          "say": "The stone skips across the bog - TOCK, TOCK, TOCK - bouncing off hidden stepping stones before it sinks. Now you can see the safe path!"
        },
        {"set": "bog_mapped"},
        {"score": 10},
        {"sound": "good"}
      ]
    },
    {"verb": ["run", "jump", "enter"], "noun": ["swamp"], "room": "bog", "do": [{"command": "go forward"}]},
    {
      "verb": "give",
      "noun": "ration",
      "room": "hut",
      "if": ["has:ration", "!flag:hermit_fed"],
      "do": [
        {"remove": "ration"},
        {"give": "spade"},
        {"set": "hermit_fed"},
        {
          "say": "The hermit wolfs down your ration in three bites. \"Bless you! Here - take my old spade, I won't be needing it. And a tip: the scarecrow knows where the treasure sleeps. Help yourself to anything in my hut.\""
        },
        {"say": "The hermit hands you a SPADE."},
        {"score": 15},
        {"sound": "good"}
      ]
    },
    {
      "verb": "give",
      "noun": "hermit",
      "room": "hut",
      "if": ["has:ration", "!flag:hermit_fed"],
      "do": [
        {"command": "give ration to hermit"}
      ]
    },
    {
      "verb": ["read", "examine"],
      "noun": "map",
      "do": [
        {
          "say": "A crude map of the moor. An X is drawn at the foot of the DEAD OAK, with the words: 'DIG HERE - 3 PACES FROM THE ROOTS'. On the back, in a different hand: 'The hound loves a bone.'"
        },
        {"set": "map_read"}
      ]
    },
    {
      "verb": "examine",
      "noun": "scarecrow",
      "if": "here:map",
      "do": [
        {
          "say": "A three-armed scarecrow in a tattered red coat. A scrap of paper - a MAP? - pokes out of its pocket."
        }
      ]
    },
    {
      "verb": "dig",
      "room": "oak",
      "if": "flag:dug",
      "do": [
        {"say": "You've already dug here. There's just a hole."}
      ]
    },
    {
      "verb": "dig",
      "room": "oak",
      "if": ["has:spade", "flag:map_read"],
      "do": [
        {
          "say": "You pace three steps from the roots and dig... and dig... CLANG! Something metal glows in the dirt. You pull out a strange glowing coil!"
        },
        {"set": "dug"},
        {"give": "coil"},
        {"score": 15}
      ]
    },
    {
      "verb": "dig",
      "room": "oak",
      "if": "has:spade",
      "do": [
        {"say": "You dig a few random holes around the tree. Nothing. You need to know exactly WHERE to dig."}
      ]
    },
    {"verb": "dig", "room": "oak", "do": [{"say": "The ground is rock-hard. You'd need a spade."}]},
    {
      "verb": "climb",
      "noun": "oaktree",
      "do": [
        {"say": "The branches creak ominously. You think better of it."}
      ]
    },
    {
      "verb": ["extinguish", "pour", "throw", "use"],
      "noun": ["fire", "flask", "water"],
      "room": "stream",
      "if": "flag:fire_out",
      "do": [
        {"say": "The fire is already out."}
      ]
    },
    {
      "verb": ["extinguish", "pour", "throw", "use"],
      "noun": ["fire", "flask", "water"],
      "room": "stream",
      "if": "flag:core:flask_full",
      "do": [
        {"clear": "core:flask_full"},
        {"set": "fire_out"},
        {"sound": "good"},
        {
          "say": "You hurl the water onto the flames. HISSSSSSS! The green fire dies in a cloud of stinking steam. The bridge is charred but passable."
        },
        {"score": 15}
      ],
      "fail": "You've got nothing to put it out with. Your flask is empty... and there's a whole stream right here."
    },
    {
      "verb": "run",
      "room": "stream",
      "if": "!flag:fire_out",
      "do": [
        {
          "die": "You sprint onto the burning bridge. Halfway across, it collapses in a shower of green sparks. That's the end of that."
        }
      ]
    },
    {"verb": "jump", "room": "stream", "do": [{"say": "The stream is far too wide to jump."}]},
    {
      "verb": ["tie", "use", "put", "throw"],
      "noun": "rope",
      "room": "well",
      "if": "has:rope",
      "do": [
        {"remove": "rope"},
        {"show": "tiedrope"},
        {"set": "rope_tied"},
        {"say": "You tie the rope firmly to the winch and drop the end into the well. It uncoils into the darkness."},
        {"score": 5}
      ]
    },
    {
      "verb": ["climb", "enter"],
      "noun": ["tiedrope", "wellshaft"],
      "room": "well",
      "do": [
        {"command": "go down"}
      ]
    },
    {
      "verb": "jump",
      "room": "well",
      "noun": ["wellshaft", "down", ""],
      "do": [
        {"die": "You leap into the well. It's a long way down. Unfortunately, the bottom is a very short way up."}
      ]
    },
    {
      "verb": "type",
      "noun": "7304",
      "room": "door",
      "if": "!flag:obs_open",
      "do": [
        {"say": "BEEP-BEEP-BOOP. ACCESS GRANTED. The steel door rolls aside with a grinding hiss."},
        {"set": "obs_open"},
        {"score": 20},
        {"sound": "good"}
      ]
    },
    {"verb": "type", "room": "door", "if": "flag:obs_open", "do": [{"say": "The door is already open."}]},
    {"verb": "type", "noun": "*", "room": "door", "do": [{"say": "BZZZT! ACCESS DENIED."}, {"sound": "bad"}]},
    {
      "verb": "type",
      "noun": "",
      "room": "door",
      "do": [
        {"say": "TYPE WHAT? Try TYPE followed by a 4-digit code."}
      ]
    },
    {"verb": ["push", "use"], "noun": "keypad", "do": [{"say": "TYPE the code, e.g. TYPE 1234."}]},
    {
      "verb": ["open", "push", "knock"],
      "noun": "obsdoor",
      "if": "!flag:obs_open",
      "do": [
        {"say": "It's sealed tight. The keypad blinks at you."}
      ]
    },
    {
      "verb": ["peer", "use"],
      "noun": "telescope",
      "if": "flag:scoped",
      "do": [
        {"say": "The standing stones lie RIGHT of here, beyond the fog. The glowing beast is still pacing."}
      ]
    },
    {
      "verb": ["peer", "use"],
      "noun": "telescope",
      "do": [
        {
          "say": "You squint through the eyepiece and sweep across the moor... THERE! Beyond the fog, RIGHT of the observatory: a ring of standing stones, and in their centre a dark arch crackling with power. A PORTAL! Something glints under the altar stone... and something large, furry and glowing paces around it."
        },
        {"set": "scoped"},
        {"score": 15},
        {"sound": "good"}
      ]
    },
    {
      "verb": ["throw", "give"],
      "noun": "bone",
      "room": "stones",
      "if": ["has:bone", "here:hound"],
      "do": [
        {"remove": ["bone", "hound"]},
        {"set": "hound_gone"},
        {
          "say": "You hurl the bone into the fog. The Glimmerhound's ears prick up... and it bounds away after it, yipping like a puppy. The way to the portal is clear!"
        },
        {"score": 15},
        {"sound": "good"}
      ]
    },
    {
      "verb": ["take", "attack", "touch", "push"],
      "noun": "hound",
      "do": [
        {"die": "You reach for the Glimmerhound. It reaches for you. It has more teeth."}
      ]
    },
    {
      "verb": "open",
      "noun": "tin",
      "if": [
        "near:tin",
        {"any": ["has:knife", "has:edriver"]}
      ],
      "do": [
        {"remove": "tin"},
        {
          "say": "You prise the lid off with a grinding squeal. Inside, wrapped in oily cloth: a bag of HULL RIVETS and a glass FUSE!"
        },
        {"give": ["rivets", "fuse"]},
        {"score": 10}
      ],
      "fail": "It's rusted shut. You need something to prise it open with."
    },
    {"verb": "open", "noun": "mpanel", "if": "flag:panel_open", "do": [{"say": "It's already open."}]},
    {
      "verb": "open",
      "noun": "mpanel",
      "if": "has:edriver",
      "do": [
        {"set": "panel_open"},
        {
          "say": "You undo the four tiny screws and the panel drops open. Inside: an empty FUSE socket and a sticker: 'INSERT FUSE. STAND CLEAR.'"
        },
        {"score": 10}
      ],
      "fail": "The screws are microscopic. You need a precision tool - like an electronic screwdriver."
    },
    {"verb": "use", "noun": "edriver", "room": "portal", "do": [{"command": "open panel"}]},
    {
      "verb": ["put", "use", "fix"],
      "noun": "fuse",
      "room": "portal",
      "if": "!flag:panel_open",
      "do": [
        {"say": "The access panel is closed. Where would it go?"}
      ]
    },
    {
      "verb": ["put", "use", "fix"],
      "noun": "fuse",
      "room": "portal",
      "if": "has:fuse",
      "do": [
        {"remove": "fuse"},
        {"set": "machine_on"},
        {"sound": "portal"},
        {
          "say": "You push the glass fuse into its socket. Click. For a moment... nothing. Then the arch shudders and ROARS into life! Lights race around it and a vortex of stars opens inside, spiralling UP into the sky."
        },
        {"score": 25}
      ]
    },
    {
      "verb": ["put", "use", "fix"],
      "noun": ["mpanel", "machine"],
      "room": "portal",
      "if": "has:fuse",
      "do": [
        {"command": "put fuse in panel"}
      ]
    },
    {
      "verb": "go",
      "noun": "up",
      "room": "portal",
      "if": "!flag:machine_on",
      "do": [
        {"say": "The machine is dead. There's nothing up there but fog."}
      ]
    },
    {
      "verb": "go",
      "noun": "up",
      "room": "portal",
      "if": "!parts:3",
      "do": [
        {
          "say": "The vortex flickers. A robotic voice crackles: 'WARNING. SHIP PARTS STILL DETECTED ON THIS WORLD.' It won't let you through."
        },
        {"sound": "bad"}
      ]
    },
    {
      "verb": "go",
      "noun": "up",
      "room": "portal",
      "do": [
        {"say": "You take a deep breath and step into the vortex. GRIMMOOR COMPLETE!"},
        {"score": 50},
        {"next": true}
      ]
    },
    {"verb": ["enter", "climb", "jump"], "noun": "machine", "room": "portal", "do": [{"command": "go up"}]}
  ]
}
);
