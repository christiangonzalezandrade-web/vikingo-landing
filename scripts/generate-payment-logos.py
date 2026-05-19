#!/usr/bin/env python3
"""Genera la tira de medios de pago y PNG individuales para Trust.tsx."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "payments"

CANVAS_WIDTH = 2600
CANVAS_HEIGHT = 400
BLOCK_HEIGHT = 140
BG_COLOR = (255, 255, 255)

LOGOS = [
    {"id": "visa", "name": "Visa", "w": 200, "color": "#1A1F71", "text_color": "#FFFFFF", "type": "card", "label": "VISA"},
    {"id": "mastercard", "name": "Mastercard", "w": 220, "color": "#000000", "text_color": "#FFFFFF", "type": "mc", "label": "mastercard"},
    {"id": "redcompra", "name": "Redcompra", "w": 240, "color": "#0F3D8A", "text_color": "#FFFFFF", "type": "redcompra", "label": "Red compra"},
    {"id": "bancoestado", "name": "BancoEstado", "w": 260, "color": "#2E3192", "text_color": "#FFFFFF", "type": "be", "label": "BancoEstado"},
    {"id": "google-pay", "name": "Google Pay", "w": 220, "color": "#4285F4", "text_color": "#FFFFFF", "type": "gpay", "label": "G Pay"},
    {"id": "apple-pay", "name": "Apple Pay", "w": 280, "color": "#000000", "text_color": "#FFFFFF", "type": "applepay", "label": "Apple Pay"},
    {"id": "contactless", "name": "Pago sin contacto", "w": 220, "color": "#FFFFFF", "text_color": "#000000", "type": "contactless", "label": ""},
    {"id": "amex", "name": "American Express", "w": 220, "color": "#0076A3", "text_color": "#FFFFFF", "type": "amex", "label": "AMEX"},
    {"id": "samsung-pay", "name": "Samsung Pay", "w": 300, "color": "#1428A0", "text_color": "#FFFFFF", "type": "samsung", "label": "SAMSUNG pay"},
]


def load_fonts() -> tuple[ImageFont.FreeTypeFont | ImageFont.ImageFont, ImageFont.FreeTypeFont | ImageFont.ImageFont]:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "Arial.ttf",
    ]
    for path in candidates:
        if os.path.isfile(path):
            return ImageFont.truetype(path, 42), ImageFont.truetype(path, 24)
    default = ImageFont.load_default()
    return default, default


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_w: int, max_h: int, base_font) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    size = 42
    while size >= 18:
        try:
            font = ImageFont.truetype(base_font.path, size) if hasattr(base_font, "path") else base_font
        except Exception:
            font = base_font
        bbox = draw.textbbox((0, 0), text, font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        if tw <= max_w and th <= max_h:
            return font
        size -= 2
    return base_font


def draw_centered_text(draw, xy_box, text, font, fill):
    x0, y0, x1, y1 = xy_box
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = x0 + (x1 - x0 - tw) // 2
    y = y0 + (y1 - y0 - th) // 2
    draw.text((x, y), text, fill=fill, font=font)


def draw_logo(draw: ImageDraw.ImageDraw, logo: dict, start_x: int, start_y: int, font, font_sub) -> int:
    bw = logo["w"]
    end_x = start_x + bw
    inner_top = start_y + 20
    inner_bottom = start_y + 120
    inner_box = (start_x, inner_top, end_x, inner_bottom)

    if logo["type"] == "mc":
        draw.ellipse([start_x + 30, inner_top, start_x + 130, inner_bottom], fill="#EB001B")
        draw.ellipse([start_x + 90, inner_top, start_x + 190, inner_bottom], fill="#F79E1B")
        sub = fit_font(draw, "mastercard", bw - 20, 28, font_sub)
        draw_centered_text(draw, (start_x, inner_bottom + 2, end_x, start_y + BLOCK_HEIGHT), "mastercard", sub, "#000000")
    elif logo["type"] == "redcompra":
        draw.rectangle(inner_box, fill="#0F3D8A")
        draw.rectangle([start_x, inner_top, start_x + 90, inner_bottom], fill="#D32F2F")
        draw.text((start_x + 18, start_y + 48), "Red", fill="#FFFFFF", font=font)
        draw.text((start_x + 108, start_y + 52), "compra", fill="#FFFFFF", font=font_sub)
    elif logo["type"] == "be":
        draw.rectangle(inner_box, fill="#2E3192")
        draw.rectangle([start_x, inner_top, start_x + 55, inner_bottom], fill="#FF9900")
        sub = fit_font(draw, "BancoEstado", bw - 70, 50, font_sub)
        draw.text((start_x + 65, start_y + 48), "BancoEstado", fill="#FFFFFF", font=sub)
    elif logo["type"] == "contactless":
        draw.rectangle(inner_box, fill="#FFFFFF", outline="#000000", width=3)
        for w in range(4):
            draw.arc(
                [start_x + 40 + w * 15, inner_top + 10, start_x + 140 + w * 15, inner_bottom - 10],
                start=-45,
                end=45,
                fill="#000000",
                width=8,
            )
    elif logo["type"] == "gpay":
        draw.rectangle(inner_box, fill="#FFFFFF", outline="#E2E8F0", width=2)
        draw.ellipse([start_x + 25, inner_top + 25, start_x + 75, inner_bottom - 25], fill="#4285F4")
        sub = fit_font(draw, "G Pay", bw - 100, 50, font)
        draw.text((start_x + 90, start_y + 48), "G Pay", fill="#5F6368", font=sub)
    else:
        draw.rectangle(inner_box, fill=logo["color"])
        label = logo.get("label") or logo["name"]
        fitted = fit_font(draw, label, bw - 30, 60, font)
        draw_centered_text(draw, inner_box, label, fitted, logo["text_color"])

    return bw


def layout_positions() -> list[int]:
    total_w = sum(l["w"] for l in LOGOS)
    gap = (CANVAS_WIDTH - total_w) // (len(LOGOS) + 1)
    xs = []
    x = gap
    for logo in LOGOS:
        xs.append(x)
        x += logo["w"] + gap
    return xs


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    font, font_sub = load_fonts()

    image = Image.new("RGB", (CANVAS_WIDTH, CANVAS_HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(image)
    xs = layout_positions()
    start_y = (CANVAS_HEIGHT - BLOCK_HEIGHT) // 2

    for i, logo in enumerate(LOGOS):
        draw_logo(draw, logo, xs[i], start_y, font, font_sub)

    strip_path = OUT_DIR / "payment-strip.jpg"
    image.save(strip_path, "JPEG", quality=95)
    print(f"Tira: {strip_path}")

    target_h = 48
    for i, logo in enumerate(LOGOS):
        x0 = xs[i]
        x1 = x0 + logo["w"]
        crop = image.crop((x0, start_y, x1, start_y + BLOCK_HEIGHT))
        w, h = crop.size
        nw = max(1, round(w * target_h / h))
        resized = crop.resize((nw, target_h), Image.Resampling.LANCZOS)
        out = OUT_DIR / f"{logo['id']}.png"
        resized.save(out, "PNG")
        print(f"  {out.name} ({nw}x{target_h})")


if __name__ == "__main__":
    main()
