# BitWall

An animated live wallpaper application for Linux desktops running KDE Plasma 6 (Wayland). Built with Electron, React, and TypeScript, BitWall renders GPU-accelerated animated backgrounds behind your desktop — replacing the static wallpaper with dynamic, customizable visuals while keeping your panels, icons, and windows fully accessible.

## Features

- 21 animated backgrounds powered by Three.js, OGL, Canvas, and GSAP
- Per-background color and parameter customization
- Live preview in the settings window before applying
- System tray integration with pause/resume controls
- Auto-pause on screen lock to save resources
- Config persistence across restarts
- Autostart support via XDG autostart

## Screenshots

See the [printscreens](./printscreens/) folder for screenshots.

## Requirements

- Arch Linux / Manjaro with KDE Plasma 6 (Wayland)
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

## AUR Install

```bash
cd aur/
makepkg -si
```

## How It Works

BitWall runs as an Electron app with two windows:

- **Wallpaper window**: A fullscreen frameless window placed in KDE's BelowLayer (layer 1) via a KWin script, sitting beneath all regular windows and panels but above the native desktop
- **Settings window**: Browse and preview backgrounds, customize colors and parameters, then apply to the wallpaper
- **System tray**: Open settings, pause/resume animation, or quit

The app runs under XWayland (`--ozone-platform=x11`) and uses a KWin script loaded via D-Bus to set `keepBelow=true` on the wallpaper window, ensuring it stays behind everything else.

## Backgrounds

Aurora, Ballpit, Beams, Dither, Faulty Terminal, Galaxy, Grid Distortion, Grid Motion, Hyperspeed, Iridescence, Letter Glitch, Light Rays, Lightning, Liquid Chrome, Liquid Ether, Orb, Particles, Silk, Squares, Threads, Waves

Background components vendored from [react-bits](https://github.com/DavidHDev/react-bits).

## License

MIT
