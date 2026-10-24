import os
from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

def draw_pl_icon(size: int, is_maskable: bool = False):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    bg_color = (220, 38, 38, 255) # Red-600 #dc2626
    
    if is_maskable:
        # Full canvas background for maskable (safe zone is center 80%)
        draw.rectangle([0, 0, size, size], fill=bg_color)
        
        # Center white badge / speech bubble within safe zone
        safe_pad = int(size * 0.15)
        badge_box = [safe_pad, safe_pad, size - safe_pad, size - safe_pad]
        corner_r = int(size * 0.16)
        draw.rounded_rectangle(badge_box, radius=corner_r, fill=(255, 255, 255, 255))
        
        # Red PL text inside
        font_size = int(size * 0.38)
        font = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', font_size)
        text = "PL"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        tx = (size - tw) // 2 - bbox[0]
        ty = (size - th) // 2 - bbox[1] - int(size * 0.02)
        draw.text((tx, ty), text, fill=bg_color, font=font)
        
        # Small accent bar (Polish flag symbol: white over red)
        bar_w = int(size * 0.32)
        bar_h = max(3, int(size * 0.035))
        bx = (size - bar_w) // 2
        by = ty + th + int(size * 0.03)
        draw.rounded_rectangle([bx, by, bx + bar_w, by + bar_h], radius=bar_h // 2, fill=bg_color)

    else:
        # App icon with rounded corners
        corner_r = int(size * 0.22)
        draw.rounded_rectangle([0, 0, size, size], radius=corner_r, fill=bg_color)

        # Center white badge
        pad = int(size * 0.14)
        badge_box = [pad, pad, size - pad, size - pad]
        badge_r = int(size * 0.14)
        draw.rounded_rectangle(badge_box, radius=badge_r, fill=(255, 255, 255, 255))

        # Red PL text inside
        font_size = int(size * 0.40)
        font = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', font_size)
        text = "PL"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        tx = (size - tw) // 2 - bbox[0]
        ty = (size - th) // 2 - bbox[1] - int(size * 0.02)
        draw.text((tx, ty), text, fill=bg_color, font=font)

        # Accent bar
        bar_w = int(size * 0.34)
        bar_h = max(3, int(size * 0.035))
        bx = (size - bar_w) // 2
        by = ty + th + int(size * 0.03)
        draw.rounded_rectangle([bx, by, bx + bar_w, by + bar_h], radius=bar_h // 2, fill=bg_color)

    return img

def main():
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    
    # 1. 192x192 regular
    icon_192 = draw_pl_icon(192, is_maskable=False)
    icon_192.save(os.path.join(PUBLIC_DIR, 'icon-192.png'))
    print("Saved icon-192.png")

    # 2. 512x512 regular
    icon_512 = draw_pl_icon(512, is_maskable=False)
    icon_512.save(os.path.join(PUBLIC_DIR, 'icon-512.png'))
    print("Saved icon-512.png")

    # 3. 192x192 maskable
    mask_192 = draw_pl_icon(192, is_maskable=True)
    mask_192.save(os.path.join(PUBLIC_DIR, 'icon-maskable-192.png'))
    print("Saved icon-maskable-192.png")

    # 4. 512x512 maskable
    mask_512 = draw_pl_icon(512, is_maskable=True)
    mask_512.save(os.path.join(PUBLIC_DIR, 'icon-maskable-512.png'))
    print("Saved icon-maskable-512.png")

    # 5. apple-touch-icon (180x180)
    apple_icon = draw_pl_icon(180, is_maskable=True)
    apple_icon.save(os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
    print("Saved apple-touch-icon.png")

    # 6. favicon.ico
    fav_16 = draw_pl_icon(16, is_maskable=False)
    fav_32 = draw_pl_icon(32, is_maskable=False)
    fav_48 = draw_pl_icon(48, is_maskable=False)
    fav_48.save(
        os.path.join(PUBLIC_DIR, 'favicon.ico'),
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Saved favicon.ico")

if __name__ == '__main__':
    main()
