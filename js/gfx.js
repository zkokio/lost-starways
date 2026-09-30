/* THE LOST STARWAYS - tiny palette-true pixel renderer (160x100 fat pixels) */
(function (G) {
  var S = G.Starways;
  var W = S.PIC_W, H = S.PIC_H;
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  function col(v) {
    if (typeof v === "string") v = S.COLOR_NAMES[v.toLowerCase()];
    v = v | 0;
    return v < 0 || v > 15 ? 0 : v;
  }

  // Draw a list of ops into buf (Uint8Array W*H of palette indexes).
  // check(cond) evaluates {"if": ..., "ops": [...]} blocks.
  S.raster = function (ops, buf, check) {
    function px(x, y, c) {
      x = Math.round(x); y = Math.round(y);
      if (x >= 0 && y >= 0 && x < W && y < H) buf[y * W + x] = c;
    }
    function hline(x1, x2, y, c) {
      y = Math.round(y); if (y < 0 || y >= H) return;
      var a = Math.max(0, Math.round(Math.min(x1, x2))), b = Math.min(W - 1, Math.round(Math.max(x1, x2)));
      for (var x = a; x <= b; x++) buf[y * W + x] = c;
    }
    function line(x0, y0, x1, y1, c) {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1, err = dx + dy;
      for (var n = 0; n < 2000; n++) {
        px(x0, y0, c);
        if (x0 === x1 && y0 === y1) break;
        var e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
      }
    }
    function poly(pts, c) {
      var n = pts.length / 2, minY = H, maxY = 0, i;
      for (i = 0; i < n; i++) { minY = Math.min(minY, pts[i * 2 + 1]); maxY = Math.max(maxY, pts[i * 2 + 1]); }
      minY = Math.max(0, Math.floor(minY)); maxY = Math.min(H - 1, Math.ceil(maxY));
      for (var y = minY; y <= maxY; y++) {
        var yy = y + 0.5, xs = [];
        for (i = 0; i < n; i++) {
          var ax = pts[i * 2], ay = pts[i * 2 + 1], bx = pts[((i + 1) % n) * 2], by = pts[((i + 1) % n) * 2 + 1];
          if ((ay <= yy && by > yy) || (by <= yy && ay > yy)) xs.push(ax + (yy - ay) / (by - ay) * (bx - ax));
        }
        xs.sort(function (a, b) { return a - b; });
        for (var k = 0; k + 1 < xs.length; k += 2) hline(Math.ceil(xs[k] - 0.5), Math.floor(xs[k + 1] - 0.5), y, c);
      }
      for (i = 0; i < n; i++) line(pts[i * 2], pts[i * 2 + 1], pts[((i + 1) % n) * 2], pts[((i + 1) % n) * 2 + 1], c);
    }
    function oval(cx, cy, rx, ry, c) {
      for (var dy = -ry; dy <= ry; dy++) {
        var w = rx * Math.sqrt(Math.max(0, 1 - (dy * dy) / (ry * ry || 1)));
        hline(cx - w, cx + w, cy + dy, c);
      }
    }
    function ring(cx, cy, rx, ry, c) {
      for (var a = 0; a < 360; a += 3) {
        var r = a * Math.PI / 180;
        px(cx + Math.cos(r) * rx, cy + Math.sin(r) * ry, c);
      }
    }

    (ops || []).forEach(function run(op) {
      if (!op) return;
      if (!Array.isArray(op)) {
        if (op.ops && (!op.if || !check || check(op.if))) op.ops.forEach(run);
        return;
      }
      var a = op, c = col(a[1]), i, x, y;
      switch (a[0]) {
        case "bg": buf.fill(c); break;
        case "rect":
          for (y = a[3]; y < a[3] + a[5]; y++) hline(a[2], a[2] + a[4] - 1, y, c);
          break;
        case "line":
          for (i = 2; i + 3 < a.length; i += 2) line(a[i], a[i + 1], a[i + 2], a[i + 3], c);
          break;
        case "poly": poly(a.slice(2), c); break;
        case "circ": oval(a[2], a[3], Math.max(1, Math.round(a[4] / 2)), a[4], c); break; // aspect-corrected
        case "oval": oval(a[2], a[3], a[4], a[5], c); break;
        case "ring": ring(a[2], a[3], a[4], a[5] === undefined ? a[4] * 2 : a[5], c); break;
        case "dither":
          for (y = a[3]; y < a[3] + a[5]; y++) for (x = a[2]; x < a[2] + a[4]; x++) if ((x + y) % 2 === 0) px(x, y, c);
          break;
        case "grad": // ["grad", c1, c2, y1, y2] ordered-dither blend top->bottom
          var c2 = col(a[2]), y1 = a[3], y2 = a[4];
          for (y = y1; y <= y2; y++) {
            var t = (y - y1) / Math.max(1, y2 - y1) * 16;
            for (x = 0; x < W; x++) px(x, y, BAYER[(y % 4) * 4 + (x % 4)] < t ? c2 : c);
          }
          break;
        case "stars": // ["stars", c, seed, count, x, y, w, h]
          var s = (a[2] | 0) || 1;
          var bx = a[4] || 0, by = a[5] || 0, bw = a[6] || W, bh = a[7] || H;
          var rnd = function () { // mulberry32 - same stars every time for the same seed
            s = (s + 0x6D2B79F5) | 0; var t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
          };
          for (i = 0; i < a[3]; i++) { var sx = bx + Math.floor(rnd() * bw); px(sx, by + Math.floor(rnd() * bh), c); }
          break;
        case "plot":
          for (i = 2; i + 1 < a.length; i += 2) px(a[i], a[i + 1], c);
          break;
      }
    });
    return buf;
  };

  // Canvas wrapper with the classic "picture draws itself" reveal.
  S.Gfx = function (canvas) {
    this.canvas = canvas;
    canvas.width = W; canvas.height = H;
    this.ctx = canvas.getContext("2d");
    this.img = this.ctx.createImageData(W, H);
    this.buf = new Uint8Array(W * H);
    this.rgb = S.PALETTE.map(function (h) {
      return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
    });
    this.anim = 0;
  };
  S.Gfx.prototype.draw = function (ops, check, animate) {
    this.buf.fill(0);
    S.raster(ops, this.buf, check);
    var self = this, row = animate ? 0 : H, token = ++this.anim;
    function blit(upto) {
      var d = self.img.data;
      for (var i = 0; i < W * upto; i++) {
        var c = self.rgb[self.buf[i]];
        d[i * 4] = c[0]; d[i * 4 + 1] = c[1]; d[i * 4 + 2] = c[2]; d[i * 4 + 3] = 255;
      }
      self.ctx.putImageData(self.img, 0, 0);
    }
    if (!animate) return blit(H);
    // wipe to black first, then reveal in bands
    this.ctx.fillStyle = "#000"; this.ctx.fillRect(0, 0, W, H);
    (function step() {
      if (token !== self.anim) return;
      row = Math.min(H, row + 6);
      blit(row);
      if (row < H) requestAnimationFrame(step);
    })();
  };
})(typeof window !== "undefined" ? window : globalThis);
