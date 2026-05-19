#!/usr/bin/env python3
"""Compone payment-strip.png: recorte óptico + alineación inferior común."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public" / "payments"
BASE_H = 52
GAP = 40
PAD_X = 32
PAD_TOP = 6
PAD_BOTTOM = 10

LOGOS = [
    ("visa.png", 1.0),
    ("mastercard.png", 1.55),  # grande; recorte elimina espacio vacío inferior
    ("redcompra.png", 1.0),
    ("bancoestado.png", 1.0),
    ("google-pay.png", 1.0),
    ("apple-pay.png", 1.35),
    ("samsung-pay.png", 1.0),
    ("contactless.png", 1.0),
    ("amex.png", 1.0),
]


def trim_content(im: Image.Image) -> Image.Image:
    """Quita márgenes transparentes para alinear el piso visual del logo."""
    rgba = im.convert("RGBA")
    bb = rgba.getbbox()
    if not bb:
        return rgba
    return rgba.crop(bb)


def load_scaled(filename: str, scale: float) -> tuple[Image.Image, int, int]:
    path = OUT / filename
    if not path.exists():
        raise FileNotFoundError(path)
    im = trim_content(Image.open(path))
    h = max(1, round(BASE_H * scale))
    w = max(1, round(im.width * h / im.height))
    return im.resize((w, h), Image.Resampling.LANCZOS), w, h


def main() -> None:
    items = [load_scaled(f, s) for f, s in LOGOS]
    max_h = max(h for _, _, h in items)
    strip_h = PAD_TOP + max_h + PAD_BOTTOM
    total_w = PAD_X * 2 + sum(w for _, w, _ in items) + GAP * (len(items) - 1)
    strip = Image.new("RGBA", (total_w, strip_h), (255, 255, 255, 255))

    baseline_y = strip_h - PAD_BOTTOM
    x = PAD_X
    for im, w, h in items:
        strip.paste(im, (x, baseline_y - h), im)
        x += w + GAP

    strip.save(OUT / "payment-strip.png", "PNG")
    strip.convert("RGB").save(OUT / "payment-strip.jpg", "JPEG", quality=95)
    print(f"payment-strip.png {strip.size}")


if __name__ == "__main__":
    main()
