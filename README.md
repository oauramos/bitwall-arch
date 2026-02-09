# BitWall

Animated wallpaper app for Linux (KDE Plasma). Pick from 21 animated backgrounds, customize colors and parameters, and apply them as your live desktop wallpaper.

## Features

- 21 animated backgrounds (Three.js, OGL, Canvas, GSAP-based)
- Color and parameter customization per background
- Live preview in settings window
- System tray with pause/resume
- Auto-pause on screen lock
- Config persistence across restarts
- Autostart support

## Requirements

- Manjaro / Arch Linux with KDE Plasma (Wayland or X11)
- Node.js 18+
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm package
```

Produces AppImage and pacman packages in `dist/`.

## Install

```bash
./scripts/install.sh   # Setup KWin rules + autostart
./scripts/uninstall.sh # Remove everything
```

## How It Works

- **Settings window**: Browse backgrounds, customize props, live preview, click Apply
- **Wallpaper window**: Fullscreen frameless window pinned below all windows via `type: 'desktop'` + KWin rules
- **System tray**: Open settings, pause/resume, quit
- Runs under XWayland (`--ozone-platform=x11`) for reliable window-type-desktop behavior

## Backgrounds

Aurora, Ballpit, Beams, Dither, Faulty Terminal, Galaxy, Grid Distortion, Grid Motion, Hyperspeed, Iridescence, Letter Glitch, Light Rays, Lightning, Liquid Chrome, Liquid Ether, Orb, Particles, Silk, Squares, Threads, Waves

Background components vendored from [react-bits](https://github.com/DavidHDev/react-bits).

## License

MIT
