#!/usr/bin/env python3
"""
Extrae logos oficiales desde la captura de referencia (cuadrícula 2×4).
Escala 4× antes del recorte para mayor nitidez; exporta a 96px de alto (retina).
"""
from __future__ import annotations

import glob
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "payments"
SCALE = 4
TARGET_H = 96  # 2× para pantallas retina (se muestra a ~40–48px)

# Cajas en píxeles de la imagen original 629×247
BOXES = {
    "visa": (18, 34, 150, 116),
    "mastercard": (148, 14, 310, 124),  # círculos + texto completo
    "redcompra": (304, 36, 448, 116),
    "bancoestado": (454, 36, 618, 116),
    "google-pay": (18, 126, 154, 210),
    "apple-pay": (166, 118, 340, 216),  # Apple Pay completo
    "contactless": (328, 118, 478, 216),
    "amex": (474, 120, 622, 214),
}


def find_source() -> Path:
    matches = glob.glob(str(ROOT.parent / "*2.08.57*"))
    if not matches:
        matches = glob.glob("/Users/christianantoniogonzalezandrade/Documents/*2.08.57*")
    if not matches:
        raise FileNotFoundError("No se encontró la captura 2026-05-18 2.08.57 p.m.")
    return Path(matches[0])


def scale_box(box: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    return tuple(v * SCALE for v in box)  # type: ignore[return-value]


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 20:
        return True
    lum = (r + g + b) / 3
    return lum > 232


def ink_bbox(img: Image.Image, pad: int = 8) -> tuple[int, int, int, int] | None:
    w, h = img.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = img.getpixel((x, y))
            if not is_background(r, g, b, a):
                found = True
                minx = min(minx, x)
                maxx = max(maxx, x)
                miny = min(miny, y)
                maxy = max(maxy, y)
    if not found:
        return None
    return (
        max(0, minx - pad),
        max(0, miny - pad),
        min(w, maxx + pad + 1),
        min(h, maxy + pad + 1),
    )


def to_transparent(cell: Image.Image) -> Image.Image:
    rgba = cell.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_background(r, g, b, a):
                px[x, y] = (255, 255, 255, 0)
    return rgba


def crop_content(cell: Image.Image, mode: str) -> Image.Image:
    w, h = cell.size
    if mode == "loose":
        mx, my = int(w * 0.02), int(h * 0.02)
        return cell.crop((mx, my, w - mx, h - my))
    bb = ink_bbox(cell)
    if not bb:
        raise ValueError("Sin contenido")
    return cell.crop(bb)


def export_logo(
    cell: Image.Image,
    out_path: Path,
    trim: str = "ink",
    target_h: int = TARGET_H,
) -> tuple[int, int]:
    content = to_transparent(crop_content(cell, trim))
    cw, ch = content.size
    pad = 12
    inner_h = target_h - pad * 2
    scale = inner_h / ch
    nh = max(1, round(ch * scale))
    nw = max(1, round(cw * scale))
    resized = content.resize((nw, nh), Image.Resampling.LANCZOS)
    final = Image.new("RGBA", (nw + pad * 2, target_h), (0, 0, 0, 0))
    final.paste(resized, (pad, (target_h - nh) // 2), resized)
    bb = final.getbbox()
    if bb:
        tight = final.crop(bb)
        out = Image.new("RGBA", (tight.width + 4, tight.height + 4), (0, 0, 0, 0))
        out.paste(tight, (2, 2), tight)
        final = out
    final.save(out_path, "PNG", optimize=True)
    return final.size


def export_samsung_pay() -> None:
    src = OUT / "samsung-pay-source.png"
    if not src.exists():
        return
    im = Image.open(src).convert("RGBA")
    bb = ink_bbox(im, pad=4)
    if not bb:
        return
    content = im.crop(bb)
    cw, ch = content.size
    inner_h = TARGET_H - 16
    nw = max(1, round(cw * inner_h / ch))
    resized = content.resize((nw, inner_h), Image.Resampling.LANCZOS)
    final = Image.new("RGBA", (nw + 16, TARGET_H), (0, 0, 0, 0))
    final.paste(resized, (8, 8), resized)
    final.save(OUT / "samsung-pay.png", "PNG", optimize=True)
    src.unlink(missing_ok=True)
    print(f"  samsung-pay.png {final.size} (oficial Wikimedia)")


def main() -> None:
    src_path = find_source()
    OUT.mkdir(parents=True, exist_ok=True)
    base = Image.open(src_path).convert("RGBA")
    hi = base.resize((base.width * SCALE, base.height * SCALE), Image.Resampling.LANCZOS)
    print(f"Fuente: {src_path} → {hi.size[0]}×{hi.size[1]}px")

    for junk in ("payment-strip.jpg",):
        p = OUT / junk
        if p.exists():
            p.unlink()

    trim_modes = {
        "mastercard": "loose",
        "apple-pay": "loose",
        "contactless": "loose",
    }
    heights = {"mastercard": 124}

    for name, box in BOXES.items():
        cell = hi.crop(scale_box(box))
        h = heights.get(name, TARGET_H)
        size = export_logo(cell, OUT / f"{name}.png", trim=trim_modes.get(name, "ink"), target_h=h)
        print(f"  {name}.png {size}")

    export_samsung_pay()
    print("Listo — logos HD extraídos.")


if __name__ == "__main__":
    main()
