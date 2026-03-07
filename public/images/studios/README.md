# Studio Photos — Upload Guide

Each studio has its own folder. Drop photos in using the exact filenames below.
The site will automatically use them once the files exist.

---

## Naming Convention

Every studio folder accepts these files:

| Filename       | Used in            | Aspect Ratio | Recommended Size |
|----------------|--------------------|--------------|------------------|
| `hero.jpg`     | Studio hero banner | 16 : 6       | 1600 × 600 px    |
| `1.jpg`        | Gallery — Wide Shot (spans 2 cols) | 16 : 7 | 1200 × 525 px |
| `2.jpg`        | Gallery — Detail   | 4 : 3        | 800 × 600 px     |
| `3.jpg`        | Gallery — Lighting Setup | 4 : 3  | 800 × 600 px     |
| `4.jpg`        | Gallery — Full Floor | 4 : 3      | 800 × 600 px     |
| `5.jpg`        | Gallery — Dressed Set | 4 : 3     | 800 × 600 px     |
| `6.jpg`        | Gallery — Production Ready | 4 : 3 | 800 × 600 px  |

- JPG or WebP both work (`hero.jpg` / `hero.webp`)
- You don't need all 7 — any missing photo falls back to the gradient placeholder
- Keep file sizes under ~300 KB per image for fast loading

---

## Folders

```
public/images/studios/
├── empty-floor/          hero.jpg  1.jpg  2.jpg … 6.jpg
├── market-1/             hero.jpg  1.jpg  2.jpg … 6.jpg
├── market-2/             hero.jpg  1.jpg  2.jpg … 6.jpg
├── market-7/             hero.jpg  1.jpg  2.jpg … 6.jpg
├── chawl-new/            hero.jpg  1.jpg  2.jpg … 6.jpg
├── court-set/            hero.jpg  1.jpg  2.jpg … 6.jpg
├── hospital-set/         hero.jpg  1.jpg  2.jpg … 6.jpg
├── police-station-set/   hero.jpg  1.jpg  2.jpg … 6.jpg
└── open-ground/          hero.jpg  1.jpg  2.jpg … 6.jpg
```
