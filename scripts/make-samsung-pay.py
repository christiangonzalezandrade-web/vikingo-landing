#!/usr/bin/env python3
"""Samsung Pay — wordmark estilo oficial (transparente, azul Samsung)."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "public" / "payments" / "samsung-pay.png"
H = 96
COLOR = "#1428A0"


def main() -> None:
    bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    reg = "/System/Library/Fonts/Supplemental/Arial.ttf"
    f_samsung = ImageFont.truetype(bold, 34)
    f_pay = ImageFont.truetype(reg, 32)

    tmp = Image.new("RGBA", (400, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(tmp)
    t1, t2 = "SAMSUNG", "pay"
    b1 = draw.textbbox((0, 0), t1, font=f_samsung)
    b2 = draw.textbbox((0, 0), t2, font=f_pay)
    w1, w2 = b1[2] - b1[0], b2[2] - b2[0]
    h1 = max(b1[3] - b1[1], b2[3] - b2[1])
    gap = 8
    total_w = w1 + gap + w2
    W = total_w + 16
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    x0 = 8
    y0 = (H - h1) // 2 - 2
    draw.text((x0, y0), t1, fill=COLOR, font=f_samsung)
    draw.text((x0 + w1 + gap, y0 + 2), t2, fill=COLOR, font=f_pay)
    bb = img.getbbox()
    if bb:
        img = img.crop(bb)
        pad = 4
        out = Image.new("RGBA", (img.width + pad * 2, H), (0, 0, 0, 0))
        out.paste(img, (pad, (H - img.height) // 2), img)
        img = out
    img.save(OUT, "PNG")
    print(f"Guardado {OUT} {img.size}")


if __name__ == "__main__":
    main()
