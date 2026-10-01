#!/usr/bin/env python3
"""Draw the Lost Starways app icon as 64x64 pixel art, in dark and light versions, scaled up crisp."""
from PIL import Image, ImageDraw
import random, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
N = 64

SHIP = [  # 34 x 15, facing right
 "..........cc......................",
 ".........cbbc.....................",
 "........cbbbbc....................",
 ".......cbbbbbbcc..................",
 "..oo..cbbbbbbbbbccccc.............",
 ".oyyo.cbbbbbbbwwwwbbbccccc........",
 "oyyyyocbbbbbbwwssswwbbbbbbccccc...",
 "yyyyyywwwwwwwwwssswwwwwwwwwwwwwwc.",
 "oyyyyocbbbbbbwwssswwbbbbbbccccc...",
 ".oyyo.cbbbbbbbwwwwbbbccccc........",
 "..oo..cbbbbbbbbbccccc.............",
 ".......cbbbbbbcc..................",
 "........cbbbbc....................",
 ".........cbbc.....................",
 "..........cc......................",
]
THEMES = {
  "dark": dict(bg=(53,40,121), bg2=(40,30,95), frame=(108,94,181), star=[(255,255,255),(149,149,149),(112,164,178)],
               planet=(108,94,181), planet_hi=(112,164,178), planet_sh=(53,40,121), ring=(184,199,111), ring2=(111,79,37),
               moon=(154,103,89), b=(149,149,149), w=(255,255,255), c=(68,68,68), o=(111,79,37), y=(184,199,111), text=(154,210,132)),
  "light": dict(bg=(236,231,214), bg2=(222,215,194), frame=(53,40,121), star=[(53,40,121),(108,94,181),(111,61,134)],
               planet=(108,94,181), planet_hi=(112,164,178), planet_sh=(53,40,121), ring=(111,79,37), ring2=(184,160,90),
               moon=(154,103,89), b=(108,108,108), w=(255,255,255), c=(30,30,40), o=(104,55,43), y=(200,150,60), text=(53,40,121)),
}

def draw(t):
    im = Image.new("RGBA", (N, N), (0,0,0,0)); px = im.load(); d = ImageDraw.Draw(im)
    # rounded square with chunky pixel corners
    d.rectangle([0,0,N-1,N-1], fill=t["frame"])
    for (x,y) in [(0,0),(1,0),(0,1),(N-1,0),(N-2,0),(N-1,1),(0,N-1),(1,N-1),(0,N-2),(N-1,N-1),(N-2,N-1),(N-1,N-2)]: px[x,y]=(0,0,0,0)
    d.rectangle([3,3,N-4,N-4], fill=t["bg"])
    # dithered horizon band
    for y in range(36, N-3):
        for x in range(3, N-3):
            if (x+y)%2==0 and y>44: px[x,y]=t["bg2"]
    rnd = random.Random(7)
    for i in range(46):
        x,y = rnd.randint(4,N-5), rnd.randint(4,N-5)
        px[x,y] = t["star"][i%3]
    for (x,y) in [(14,7),(36,6),(57,26),(10,48)]:   # twinkles
        c=t["star"][0]
        for dx,dy in [(0,0),(1,0),(-1,0),(0,1),(0,-1)]: px[x+dx,y+dy]=c
    import math
    cx, cy, r = 45, 48, 12
    def ring(front):
        for k in range(720):
            a = k * math.pi / 360
            if (math.sin(a) > 0) != front: continue
            for th,col in ((0,t["ring"]),(1,t["ring2"])):
                x = int(round(cx + 22*math.cos(a))); y = int(round(cy + 5*math.sin(a) - 7*math.cos(a)*0.5 + th))
                if 3<=x<N-3 and 3<=y<N-3: px[x,y]=col
    ring(False)                                   # back half of the ring
    for y in range(cy-r, cy+r+1):
        for x in range(cx-r, cx+r+1):
            dd=(x-cx)**2+(y-cy)**2
            if dd<=r*r and 3<=x<N-3 and 3<=y<N-3:
                col=t["planet"]
                if (x-cx)+(y-cy) < -r*0.75 and dd > (r-4)**2: col=t["planet_hi"]
                if (x-cx)+(y-cy) > r*0.55 and (x+y)%2==0: col=t["planet_sh"]
                if (x-cx)+(y-cy) > r*1.0: col=t["planet_sh"]
                px[x,y]=col
    for (x,y) in [(41,44),(42,44),(41,45),(48,51),(49,51)]: px[x,y]=t["planet_sh"]   # craters/bands
    ring(True)                                    # front half over the planet
    for y in range(9,16):
        for x in range(47,56):
            if (x-51)**2+(y-12)**2<=9: px[x,y]=t["moon"]
            if (x-50)**2+(y-11)**2<=1: px[x,y]=t["star"][0] if (x,y)==(50,11) else px[x,y]
    ox, oy = 5, 15
    pal = {"b":t["b"],"w":t["w"],"c":t["c"],"o":t["o"],"y":t["y"],"s":t["planet_hi"]}
    for j,row in enumerate(SHIP):
        for i,ch in enumerate(row):
            if ch in pal and 3<=ox+i<N-3: px[ox+i,oy+j]=pal[ch]
    # speed lines
    for (x,y,l) in [(3,18,2),(3,26,2),(4,30,1)]:
        for k in range(l): px[x+k,y]=t["star"][1]
    return im

for name,t in THEMES.items():
    base = draw(t)
    for size in (1024, 512, 192, 180, 32):
        base.resize((size,size), Image.NEAREST).save(os.path.join(root, f"icons/icon-{name}-{size}.png"))
print("ok")
