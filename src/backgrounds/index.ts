import { lazy } from 'react'
import type { BackgroundDefinition } from '../types/backgrounds'

// Lazy-loaded components
const AuroraComponent = lazy(() => import('./Aurora/Aurora'))
const BallpitComponent = lazy(() => import('./Ballpit/Ballpit'))
const BeamsComponent = lazy(() => import('./Beams/Beams'))
const DitherComponent = lazy(() => import('./Dither/Dither'))
const FaultyTerminalComponent = lazy(() => import('./FaultyTerminal/FaultyTerminal'))
const GalaxyComponent = lazy(() => import('./Galaxy/Galaxy'))
const GridDistortionComponent = lazy(() => import('./GridDistortion/GridDistortion'))
const GridMotionComponent = lazy(() => import('./GridMotion/GridMotion'))
const HyperspeedComponent = lazy(() => import('./Hyperspeed/Hyperspeed'))
const IridescenceComponent = lazy(() => import('./Iridescence/Iridescence'))
const LetterGlitchComponent = lazy(() => import('./LetterGlitch/LetterGlitch'))
const LightRaysComponent = lazy(() => import('./LightRays/LightRays'))
const LightningComponent = lazy(() => import('./Lightning/Lightning'))
const LiquidChromeComponent = lazy(() => import('./LiquidChrome/LiquidChrome'))
const LiquidEtherComponent = lazy(() => import('./LiquidEther/LiquidEther'))
const OrbComponent = lazy(() => import('./Orb/Orb'))
const ParticlesComponent = lazy(() => import('./Particles/Particles'))
const SilkComponent = lazy(() => import('./Silk/Silk'))
const SquaresComponent = lazy(() => import('./Squares/Squares'))
const ThreadsComponent = lazy(() => import('./Threads/Threads'))
const WavesComponent = lazy(() => import('./Waves/Waves'))

export const backgroundRegistry: BackgroundDefinition[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Colorful aurora borealis effect with smooth gradient waves',
    renderTech: 'ogl',
    component: AuroraComponent as BackgroundDefinition['component'],
    props: [
      { key: 'colorStops', label: 'Color Stops', type: 'hex-color-array', default: ['#5227FF', '#7cff67', '#5227FF'] },
      { key: 'amplitude', label: 'Amplitude', type: 'number', default: 1.0, min: 0.1, max: 3, step: 0.1 },
      { key: 'blend', label: 'Blend', type: 'number', default: 0.5, min: 0, max: 1, step: 0.05 },
      { key: 'speed', label: 'Speed', type: 'number', default: 1.0, min: 0.1, max: 5, step: 0.1 }
    ]
  },
  {
    id: 'ballpit',
    name: 'Ballpit',
    description: '3D ball pit simulation with physics and lighting',
    renderTech: 'three',
    component: BallpitComponent as BackgroundDefinition['component'],
    props: [
      { key: 'followCursor', label: 'Follow Cursor', type: 'boolean', default: false }
    ]
  },
  {
    id: 'beams',
    name: 'Beams',
    description: 'Glowing light beams with noise displacement',
    renderTech: 'three',
    component: BeamsComponent as BackgroundDefinition['component'],
    props: [
      { key: 'lightColor', label: 'Light Color', type: 'hex-color', default: '#ffffff' },
      { key: 'beamNumber', label: 'Beam Count', type: 'number', default: 12, min: 1, max: 30, step: 1 },
      { key: 'speed', label: 'Speed', type: 'number', default: 2, min: 0.1, max: 10, step: 0.1 },
      { key: 'noiseIntensity', label: 'Noise Intensity', type: 'number', default: 1.75, min: 0, max: 5, step: 0.25 },
      { key: 'scale', label: 'Scale', type: 'number', default: 0.2, min: 0.01, max: 1, step: 0.01 },
      { key: 'beamWidth', label: 'Beam Width', type: 'number', default: 2, min: 0.5, max: 5, step: 0.5 },
      { key: 'beamHeight', label: 'Beam Height', type: 'number', default: 15, min: 5, max: 30, step: 1 }
    ]
  },
  {
    id: 'dither',
    name: 'Dither',
    description: 'Dithered waves with retro pixel aesthetic',
    renderTech: 'three',
    component: DitherComponent as BackgroundDefinition['component'],
    props: [
      { key: 'waveColor', label: 'Wave Color', type: 'rgb-array', default: [0.5, 0.5, 0.5] },
      { key: 'colorNum', label: 'Color Count', type: 'number', default: 4, min: 2, max: 16, step: 1 },
      { key: 'pixelSize', label: 'Pixel Size', type: 'number', default: 2, min: 1, max: 10, step: 1 },
      { key: 'waveSpeed', label: 'Wave Speed', type: 'number', default: 0.05, min: 0.01, max: 0.5, step: 0.01 },
      { key: 'waveFrequency', label: 'Wave Frequency', type: 'number', default: 3, min: 0.5, max: 10, step: 0.5 },
      { key: 'waveAmplitude', label: 'Wave Amplitude', type: 'number', default: 0.3, min: 0.05, max: 1, step: 0.05 }
    ]
  },
  {
    id: 'faulty-terminal',
    name: 'Faulty Terminal',
    description: 'Retro CRT terminal with glitch effects and scan lines',
    renderTech: 'ogl',
    component: FaultyTerminalComponent as BackgroundDefinition['component'],
    props: [
      { key: 'tint', label: 'Tint Color', type: 'hex-color', default: '#14ff00' },
      { key: 'glitchAmount', label: 'Glitch Amount', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1 },
      { key: 'scanlineIntensity', label: 'Scanline Intensity', type: 'number', default: 0.3, min: 0, max: 1, step: 0.05 },
      { key: 'brightness', label: 'Brightness', type: 'number', default: 1.0, min: 0.1, max: 2, step: 0.1 },
      { key: 'flickerAmount', label: 'Flicker Amount', type: 'number', default: 0.2, min: 0, max: 1, step: 0.05 },
      { key: 'curvature', label: 'Curvature', type: 'number', default: 3.0, min: 0, max: 10, step: 0.5 }
    ]
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    description: 'Starfield galaxy with twinkling stars and color shift',
    renderTech: 'ogl',
    component: GalaxyComponent as BackgroundDefinition['component'],
    props: [
      { key: 'hueShift', label: 'Hue Shift', type: 'hue', default: 140 },
      { key: 'starSpeed', label: 'Star Speed', type: 'number', default: 0.5, min: 0.05, max: 3, step: 0.05 },
      { key: 'density', label: 'Density', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1 },
      { key: 'speed', label: 'Speed', type: 'number', default: 1.0, min: 0.1, max: 5, step: 0.1 },
      { key: 'twinkleIntensity', label: 'Twinkle', type: 'number', default: 0.3, min: 0, max: 1, step: 0.05 },
      { key: 'glowIntensity', label: 'Glow Intensity', type: 'number', default: 0.3, min: 0, max: 1, step: 0.05 },
      { key: 'rotationSpeed', label: 'Rotation Speed', type: 'number', default: 0.1, min: 0, max: 1, step: 0.01 }
    ]
  },
  {
    id: 'grid-distortion',
    name: 'Grid Distortion',
    description: 'Image-based grid distortion effect',
    renderTech: 'three',
    component: GridDistortionComponent as BackgroundDefinition['component'],
    props: [
      { key: 'grid', label: 'Grid Size', type: 'number', default: 15, min: 5, max: 50, step: 1 },
      { key: 'strength', label: 'Strength', type: 'number', default: 0.15, min: 0, max: 1, step: 0.01 },
      { key: 'relaxation', label: 'Relaxation', type: 'number', default: 0.9, min: 0.1, max: 1, step: 0.05 }
    ]
  },
  {
    id: 'grid-motion',
    name: 'Grid Motion',
    description: 'Animated grid with parallax motion effect',
    renderTech: 'gsap',
    component: GridMotionComponent as BackgroundDefinition['component'],
    props: [
      { key: 'gradientColor', label: 'Gradient Color', type: 'hex-color', default: '#000000' }
    ]
  },
  {
    id: 'hyperspeed',
    name: 'Hyperspeed',
    description: 'Futuristic highway with car lights and bloom effects',
    renderTech: 'three',
    component: HyperspeedComponent as BackgroundDefinition['component'],
    props: []
  },
  {
    id: 'iridescence',
    name: 'Iridescence',
    description: 'Iridescent color-shifting surface',
    renderTech: 'ogl',
    component: IridescenceComponent as BackgroundDefinition['component'],
    props: [
      { key: 'color', label: 'Base Color', type: 'rgb-array', default: [1, 1, 1] },
      { key: 'speed', label: 'Speed', type: 'number', default: 1.0, min: 0.1, max: 5, step: 0.1 },
      { key: 'amplitude', label: 'Amplitude', type: 'number', default: 0.1, min: 0.01, max: 1, step: 0.01 }
    ]
  },
  {
    id: 'letter-glitch',
    name: 'Letter Glitch',
    description: 'Matrix-style glitching letter grid with vignette',
    renderTech: 'canvas',
    component: LetterGlitchComponent as BackgroundDefinition['component'],
    props: [
      { key: 'glitchColors', label: 'Glitch Colors', type: 'hex-color-array', default: ['#2b4539', '#61dca3', '#61b3dc'] },
      { key: 'glitchSpeed', label: 'Glitch Speed', type: 'number', default: 50, min: 10, max: 200, step: 5 },
      { key: 'centerVignette', label: 'Center Vignette', type: 'boolean', default: false },
      { key: 'outerVignette', label: 'Outer Vignette', type: 'boolean', default: true },
      { key: 'smooth', label: 'Smooth', type: 'boolean', default: true }
    ]
  },
  {
    id: 'light-rays',
    name: 'Light Rays',
    description: 'Volumetric light rays emanating from a point',
    renderTech: 'ogl',
    component: LightRaysComponent as BackgroundDefinition['component'],
    props: [
      { key: 'raysColor', label: 'Rays Color', type: 'hex-color', default: '#ffffff' },
      { key: 'raysOrigin', label: 'Origin', type: 'select', default: 'top-center', options: [
        { label: 'Top Center', value: 'top-center' },
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Right', value: 'bottom-right' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
      ]},
      { key: 'raysSpeed', label: 'Speed', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'lightSpread', label: 'Spread', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1 },
      { key: 'rayLength', label: 'Length', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1 }
    ]
  },
  {
    id: 'lightning',
    name: 'Lightning',
    description: 'Electric lightning bolt effect with customizable hue',
    renderTech: 'canvas',
    component: LightningComponent as BackgroundDefinition['component'],
    props: [
      { key: 'hue', label: 'Hue', type: 'hue', default: 230 },
      { key: 'speed', label: 'Speed', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'intensity', label: 'Intensity', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1 },
      { key: 'size', label: 'Size', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1 }
    ]
  },
  {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    description: 'Metallic liquid chrome surface with reflections',
    renderTech: 'ogl',
    component: LiquidChromeComponent as BackgroundDefinition['component'],
    props: [
      { key: 'baseColor', label: 'Base Color', type: 'rgb-array', default: [0.1, 0.1, 0.1] },
      { key: 'speed', label: 'Speed', type: 'number', default: 0.2, min: 0.01, max: 2, step: 0.01 },
      { key: 'amplitude', label: 'Amplitude', type: 'number', default: 0.5, min: 0.01, max: 2, step: 0.01 },
      { key: 'frequencyX', label: 'Frequency X', type: 'number', default: 3, min: 0.5, max: 10, step: 0.5 },
      { key: 'frequencyY', label: 'Frequency Y', type: 'number', default: 2, min: 0.5, max: 10, step: 0.5 }
    ]
  },
  {
    id: 'liquid-ether',
    name: 'Liquid Ether',
    description: 'Fluid simulation with colorful ethereal effects',
    renderTech: 'three',
    component: LiquidEtherComponent as BackgroundDefinition['component'],
    props: [
      { key: 'colors', label: 'Colors', type: 'hex-color-array', default: ['#ff0000', '#00ff00', '#0000ff'] },
      { key: 'mouseForce', label: 'Mouse Force', type: 'number', default: 20, min: 1, max: 100, step: 1 },
      { key: 'autoSpeed', label: 'Auto Speed', type: 'number', default: 1.0, min: 0.1, max: 5, step: 0.1 },
      { key: 'autoIntensity', label: 'Auto Intensity', type: 'number', default: 0.5, min: 0.1, max: 2, step: 0.1 }
    ]
  },
  {
    id: 'orb',
    name: 'Orb',
    description: 'Glowing energy orb with color rotation',
    renderTech: 'ogl',
    component: OrbComponent as BackgroundDefinition['component'],
    props: [
      { key: 'hue', label: 'Hue', type: 'hue', default: 0 },
      { key: 'backgroundColor', label: 'Background', type: 'hex-color', default: '#000000' },
      { key: 'hoverIntensity', label: 'Intensity', type: 'number', default: 0.2, min: 0, max: 1, step: 0.05 }
    ]
  },
  {
    id: 'particles',
    name: 'Particles',
    description: 'Floating particle field with configurable colors',
    renderTech: 'ogl',
    component: ParticlesComponent as BackgroundDefinition['component'],
    props: [
      { key: 'particleColors', label: 'Particle Colors', type: 'hex-color-array', default: ['#ffffff', '#ffffff', '#ffffff'] },
      { key: 'particleCount', label: 'Count', type: 'number', default: 200, min: 50, max: 2000, step: 50 },
      { key: 'speed', label: 'Speed', type: 'number', default: 0.1, min: 0.01, max: 1, step: 0.01 },
      { key: 'particleSpread', label: 'Spread', type: 'number', default: 10, min: 1, max: 30, step: 1 },
      { key: 'particleBaseSize', label: 'Size', type: 'number', default: 100, min: 10, max: 500, step: 10 }
    ]
  },
  {
    id: 'silk',
    name: 'Silk',
    description: 'Flowing silk fabric with noise-driven movement',
    renderTech: 'three',
    component: SilkComponent as BackgroundDefinition['component'],
    props: [
      { key: 'color', label: 'Color', type: 'hex-color', default: '#7B7481' },
      { key: 'speed', label: 'Speed', type: 'number', default: 5, min: 0.5, max: 20, step: 0.5 },
      { key: 'scale', label: 'Scale', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'noiseIntensity', label: 'Noise Intensity', type: 'number', default: 1.5, min: 0, max: 5, step: 0.1 }
    ]
  },
  {
    id: 'squares',
    name: 'Squares',
    description: 'Moving grid of squares with hover effects',
    renderTech: 'canvas',
    component: SquaresComponent as BackgroundDefinition['component'],
    props: [
      { key: 'borderColor', label: 'Border Color', type: 'hex-color', default: '#999999' },
      { key: 'hoverFillColor', label: 'Hover Fill', type: 'hex-color', default: '#222222' },
      { key: 'direction', label: 'Direction', type: 'select', default: 'right', options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
        { label: 'Up', value: 'up' },
        { label: 'Down', value: 'down' },
        { label: 'Diagonal', value: 'diagonal' }
      ]},
      { key: 'speed', label: 'Speed', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'squareSize', label: 'Square Size', type: 'number', default: 40, min: 10, max: 100, step: 5 }
    ]
  },
  {
    id: 'threads',
    name: 'Threads',
    description: 'Animated flowing threads with perlin noise',
    renderTech: 'ogl',
    component: ThreadsComponent as BackgroundDefinition['component'],
    props: [
      { key: 'color', label: 'Color', type: 'rgb-array', default: [1, 1, 1] },
      { key: 'amplitude', label: 'Amplitude', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'distance', label: 'Distance', type: 'number', default: 0, min: 0, max: 5, step: 0.1 }
    ]
  },
  {
    id: 'waves',
    name: 'Waves',
    description: 'Spring-physics wave lines with customizable colors',
    renderTech: 'canvas',
    component: WavesComponent as BackgroundDefinition['component'],
    props: [
      { key: 'lineColor', label: 'Line Color', type: 'hex-color', default: '#ffffff' },
      { key: 'backgroundColor', label: 'Background', type: 'hex-color', default: '#000000' },
      { key: 'waveSpeedX', label: 'Wave Speed X', type: 'number', default: 0.0125, min: 0.001, max: 0.1, step: 0.001 },
      { key: 'waveSpeedY', label: 'Wave Speed Y', type: 'number', default: 0.005, min: 0.001, max: 0.1, step: 0.001 },
      { key: 'waveAmpX', label: 'Wave Amp X', type: 'number', default: 32, min: 1, max: 100, step: 1 },
      { key: 'waveAmpY', label: 'Wave Amp Y', type: 'number', default: 16, min: 1, max: 100, step: 1 },
      { key: 'xGap', label: 'X Gap', type: 'number', default: 10, min: 1, max: 50, step: 1 },
      { key: 'yGap', label: 'Y Gap', type: 'number', default: 32, min: 5, max: 100, step: 1 }
    ]
  }
]
