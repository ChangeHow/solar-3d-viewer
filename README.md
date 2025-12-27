# 🌟 Solar System 3D Viewer

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Three.js](https://img.shields.io/badge/three.js-0.160.0-orange.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.3.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.0.0-purple.svg)

**Interactive 3D Solar System Visualization with Three.js**

<a href="https://github.com/sst/opencode"><img src="https://github.com/sst/opencode/raw/dev/packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo" height="36" style="vertical-align: middle"></a>&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://z.ai"><img src="https://raw.githubusercontent.com/zai-org/GLM-4.5/refs/heads/main/resources/logo.svg" alt="智谱 AI" height="36" width="36" style="vertical-align: middle"></a>

Made with ❤️ by opencode & Z.ai team

## ✨ Features

### 🪐 Complete Solar System
- **Sun** - Central star with realistic lighting effects
- **8 Planets** - Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- **Major Moons** - Moon (Earth), Europa (Jupiter), Titan (Saturn)

### 🎨 Realistic Rendering
- **High-Quality Textures** - Real planetary textures from Solar System Scope
- **Saturn's Rings** - Elegant multi-layered ring system
- **Starry Background** - Immersive particle-based starfield
- **Atmospheric Lighting** - Ambient and directional light sources

### ⏱️ Accurate Time Scale
- **Orbital Speed**: 1 minute = 1 year
- **Rotation Speed**: 1 minute = 1 day
- All bodies follow real physical laws of motion

### 🎮 Interactive Controls
- **Click Planet** - Pause motion, show detailed info & Wikipedia links
- **Double Space** - Focus camera on Sun
- **Click Planet** - Auto-focus and zoom to selected planet
- **Space + Drag** - Free camera panning
- **Mouse Drag** - Rotate camera view
- **Mouse Scroll** - Zoom in/out

### 🌐 Bilingual Support
- **Chinese & English** - Seamless language switching
- **Bilingual UI** - Info panel and labels support both languages
- **Planet Names** - Displayed in both languages

### 💡 Planetarium-Style UI
- **Semi-transparent black background** with elegant white borders
- **Smooth animations** - Fade in/out transitions
- **Clean typography** - Professional fonts and spacing
- **Information panel** - Displays comprehensive planetary data

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-------------|---------|---------|
| **Three.js** | ^0.160.0 | 3D rendering engine |
| **TypeScript** | ^5.3.0 | Type safety & development experience |
| **Vite** | ^5.0.0 | Development server & build tool |
| **pnpm** | Latest | Fast, disk-space efficient package manager |
| **Bun** | Latest | Production build tool & runtime |

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- pnpm 8 or higher
- Bun 1 or higher (for production builds)

### Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/solar-3d-viewer.git
cd solar-3d-viewer

# Install dependencies with pnpm
pnpm install
```

## 🚀 Quick Start

### Development Mode
```bash
pnpm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Build with Bun
pnpm run build
```

### Preview Production Build
```bash
pnpm run preview
```

## 📖 Documentation

### Camera Controls

| Operation | Function |
|-----------|----------|
| Left Mouse Drag | Rotate camera view |
| Mouse Scroll | Zoom in/out |
| Double Space | Focus camera on Sun |
| Space + Drag | Pan camera freely |

### Interaction Guide

| Operation | Function |
|-----------|----------|
| Click Planet | Pause motion, show info panel |
| Click Wikipedia | Open Wikipedia in new tab |
| Click Language Toggle | Switch Chinese/English |
| Click Blank Space | Resume motion, close panel |

### Project Structure

```
solar-3d-viewer/
├── public/
│   └── textures/           # Planetary texture images
├── src/
│   ├── solar/
│   │   ├── scene.ts        # Scene, camera, renderer initialization
│   │   ├── planets.ts      # Planet and moon creation
│   │   ├── orbits.ts       # Orbit line rendering
│   │   ├── animation.ts    # Animation loop system
│   │   └── interactions.ts # Interaction event management
│   ├── data/
│   │   └── planet-data.ts # Planet and moon data
│   ├── ui/
│   │   └── info-panel.ts  # Info panel component
│   └── main.ts             # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Visualization Scales

For better visual presentation, the project uses friendly visualization ratios:

#### Planet Sizes (Relative)
- **Sun**: 4.0
- **Mercury**: 0.6
- **Venus**: 2.0
- **Earth**: 2.1
- **Mars**: 1.3
- **Jupiter**: 5.0
- **Saturn**: 4.5
- **Uranus**: 2.8
- **Neptune**: 2.7

#### Orbital Distances (Scaled)
- **Mercury**: 9.75 AU
- **Venus**: 18.0 AU
- **Earth**: 25.0 AU
- **Mars**: 38.0 AU
- **Jupiter**: 130.0 AU
- **Saturn**: 239.5 AU
- **Uranus**: 480.5 AU
- **Neptune**: 751.25 AU

## ⚙️ Configuration

### Adjusting Time Scale

Edit `src/solar/animation.ts`:

```typescript
// Orbital time scale (1 minute = 1 year)
const timeScaleOrbital = 29220;

// Rotation time scale (1 minute = 1 day)
const timeScaleRotation = 1440;
```

### Adjusting Orbit Distances

Edit `src/solar/orbits.ts`:

```typescript
const scaledDistance = distance * 25; // Adjust multiplier
```

### Adjusting Planet Sizes

Edit `src/data/planet-data.ts`:

```typescript
{
  nameZh: "地球",
  size: 2.1,  // Adjust this value
  // ... other properties
}
```

## 🎨 Design Philosophy

### Planetarium Style
- **Minimalist** - Remove unnecessary visual distractions
- **Elegant** - Use smooth transitions and animations
- **Professional** - Present data with scientific accuracy
- **Immersive** - Dark starry background with bright celestial bodies

### Interaction Design
- **Intuitive** - Controls match user expectations
- **Smooth** - 60fps animation for fluid motion
- **Responsive** - Clear visual and tactile feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D rendering engine
- [Solar System Scope](https://www.solarsystemscope.com/) - Planetary texture resources
- [Wikipedia](https://www.wikipedia.org/) - Planetary data source
- [Vite](https://vitejs.dev/) - Build tool and dev server

