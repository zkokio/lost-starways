#!/usr/bin/env python3
"""Build dist/lost-starways.html: the whole game in ONE file (CSS, JS, packs, fonts inlined)."""
import re, base64, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rd = lambda p: open(os.path.join(root, p), encoding="utf-8").read()
html = rd("index.html")
css = rd("css/style.css")
for name in ("vt323", "press-start-2p"):
    b64 = base64.b64encode(open(os.path.join(root, f"fonts/{name}.woff2"), "rb").read()).decode()
    css = css.replace(f'url("../fonts/{name}.woff2")', f'url("data:font/woff2;base64,{b64}")')
html = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + css + "\n</style>")
import json
def inline(m):
    src = rd(m.group(1))
    if m.group(1).startswith("packs/"):          # map packs: compact the JSON
        data = json.loads(src[src.index("{"):src.rindex("}") + 1])
        src = "Starways.addPack(" + json.dumps(data, separators=(",", ":"), ensure_ascii=False) + ");"
    src = src.replace("</script", "<\\/script")
    return "<script>\n/* ---- " + m.group(1) + " ---- */\n" + src + "\n</script>"
html = re.sub(r'<script src="([^"]+)"></script>', inline, html)
html = html.replace('href="docs/PACK_GUIDE.md"', 'href="https://github.com/zkokio/lost-starways/blob/main/docs/PACK_GUIDE.md"')
os.makedirs(os.path.join(root, "dist"), exist_ok=True)
open(os.path.join(root, "dist/lost-starways.html"), "w", encoding="utf-8").write(html)
print("dist/lost-starways.html", len(html.encode()), "bytes")
head = open(os.path.join(root, "dist/lost-starways-import-prompt.txt"), encoding="utf-8").read().split("```html")[0] if os.path.exists(os.path.join(root, "dist/lost-starways-import-prompt.txt")) else ""
if head:
    open(os.path.join(root, "dist/lost-starways-import-prompt.txt"), "w", encoding="utf-8").write(head + "```html\n" + html + "\n```\n")
    print("dist/lost-starways-import-prompt.txt updated")
