/**
 * PureNest Asset Generator (generate-assets.js)
 * High-definition visual asset generator for PureNest Housekeeping platform.
 * Replaces Python PIL asset script with modern Node.js / HTML5 Canvas / SVG generator.
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../images');

const folders = [
  "hero",
  "services",
  "cleaning",
  "about",
  "team",
  "before-after",
  "locations",
  "blog",
  "dashboard",
  "general"
];

// Ensure directories exist
folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

/**
 * Color palettes configuration
 */
const palettes = {
  teal_warm: {
    start: "#183830",
    end: "#2E8B72",
    accent: "#F2B866",
    sub: "#E8F5F0"
  },
  deep_emerald: {
    start: "#102520",
    end: "#1E6B56",
    accent: "#F2B866",
    sub: "#FFFFFF"
  },
  sand_gold: {
    start: "#382E1E",
    end: "#7A5E35",
    accent: "#F2B866",
    sub: "#E8F5F0"
  },
  modern_slate: {
    start: "#1A2528",
    end: "#2F4A50",
    accent: "#34D399",
    sub: "#F7F8F5"
  },
  warm_beige: {
    start: "#2B2723",
    end: "#5C5248",
    accent: "#F2B866",
    sub: "#FFFFFF"
  },
  fresh_mint: {
    start: "#13362E",
    end: "#2E8B72",
    accent: "#E8F5F0",
    sub: "#F2B866"
  }
};

/**
 * Creates SVG editorial vector representation matching the Python PIL image architecture
 */
function generateEditorialSVG(width, height, title, subtitle, bgStyle = "teal_warm", decorType = "living_room") {
  const style = palettes[bgStyle] || palettes.teal_warm;
  const barHeight = Math.round(height * 0.28);
  const barY = height - barHeight;

  let decorSvg = "";

  if (["living_room", "home", "hero"].includes(decorType)) {
    const floorY = Math.round(height * 0.72);
    decorSvg = `
      <rect x="0" y="${floorY}" width="${width}" height="${height - floorY}" fill="rgba(20, 30, 26, 0.45)" />
      <line x1="0" y1="${floorY}" x2="${width}" y2="${floorY}" stroke="#F2B866" stroke-opacity="0.4" stroke-width="2" />
      <rect x="${Math.round(width * 0.45)}" y="${Math.round(height * 0.55)}" width="${Math.round(width * 0.43)}" height="${Math.round(height * 0.23)}" rx="20" fill="rgba(30, 60, 52, 0.6)" stroke="rgba(242, 184, 102, 0.25)" stroke-width="2" />
      <line x1="${Math.round(width * 0.92)}" y1="${Math.round(height * 0.3)}" x2="${Math.round(width * 0.92)}" y2="${floorY}" stroke="rgba(242, 184, 102, 0.5)" stroke-width="3" />
      <polygon points="${Math.round(width * 0.88)},${Math.round(height * 0.32)} ${Math.round(width * 0.96)},${Math.round(height * 0.32)} ${Math.round(width * 0.92)},${Math.round(height * 0.24)}" fill="rgba(255, 255, 255, 0.8)" />
      <rect x="${Math.round(width * 0.55)}" y="${Math.round(height * 0.18)}" width="${Math.round(width * 0.23)}" height="${Math.round(height * 0.24)}" rx="6" fill="rgba(40, 80, 70, 0.4)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2" />
    `;
  } else if (["kitchen", "equipment"].includes(decorType)) {
    const floorY = Math.round(height * 0.70);
    decorSvg = `
      <rect x="0" y="${floorY}" width="${width}" height="${height - floorY}" fill="rgba(15, 25, 22, 0.55)" />
      <rect x="${Math.round(width * 0.3)}" y="${Math.round(height * 0.52)}" width="${Math.round(width * 0.6)}" height="${floorY - Math.round(height * 0.52)}" rx="8" fill="rgba(35, 75, 65, 0.7)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2" />
      <line x1="${Math.round(width * 0.28)}" y1="${Math.round(height * 0.52)}" x2="${Math.round(width * 0.92)}" y2="${Math.round(height * 0.52)}" stroke="rgba(255, 255, 255, 0.7)" stroke-width="4" />
      <line x1="${Math.round(width * 0.45)}" y1="0" x2="${Math.round(width * 0.45)}" y2="${Math.round(height * 0.28)}" stroke="rgba(242, 184, 102, 0.6)" stroke-width="2" />
      <circle cx="${Math.round(width * 0.45)}" cy="${Math.round(height * 0.31)}" r="14" fill="#F2B866" fill-opacity="0.85" />
      <line x1="${Math.round(width * 0.65)}" y1="0" x2="${Math.round(width * 0.65)}" y2="${Math.round(height * 0.28)}" stroke="rgba(242, 184, 102, 0.6)" stroke-width="2" />
      <circle cx="${Math.round(width * 0.65)}" cy="${Math.round(height * 0.31)}" r="14" fill="#F2B866" fill-opacity="0.85" />
    `;
  } else if (["bathroom", "sanitization"].includes(decorType)) {
    decorSvg = `
      <rect x="${Math.round(width * 0.5)}" y="${Math.round(height * 0.15)}" width="${Math.round(width * 0.38)}" height="${Math.round(height * 0.7)}" fill="rgba(46, 139, 114, 0.3)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="3" />
      <circle cx="${Math.round(width * 0.685)}" cy="${Math.round(height * 0.335)}" r="16" fill="rgba(255, 255, 255, 0.85)" />
      <line x1="${Math.round(width * 0.685)}" y1="${Math.round(height * 0.25)}" x2="${Math.round(width * 0.685)}" y2="${Math.round(height * 0.42)}" stroke="#FFFFFF" stroke-width="2" />
      <line x1="${Math.round(width * 0.62)}" y1="${Math.round(height * 0.335)}" x2="${Math.round(width * 0.75)}" y2="${Math.round(height * 0.335)}" stroke="#FFFFFF" stroke-width="2" />
    `;
  } else if (["person", "cleaner", "team"].includes(decorType)) {
    const headRadius = Math.round(Math.min(width, height) * 0.16);
    const cx = Math.round(width * 0.5);
    const cy = Math.round(height * 0.38);
    decorSvg = `
      <circle cx="${cx}" cy="${Math.round(height * 0.5)}" r="${Math.round(Math.min(width, height) * 0.35)}" fill="rgba(46, 139, 114, 0.35)" stroke="rgba(242, 184, 102, 0.5)" stroke-width="3" />
      <circle cx="${cx}" cy="${cy}" r="${headRadius}" fill="rgba(230, 240, 235, 0.85)" />
      <polygon points="${Math.round(width * 0.22)},${Math.round(height * 0.95)} ${cx - Math.round(headRadius * 0.9)},${cy + headRadius} ${cx + Math.round(headRadius * 0.9)},${cy + headRadius} ${Math.round(width * 0.78)},${Math.round(height * 0.95)}" fill="rgba(46, 139, 114, 0.9)" />
      <polygon points="${cx - 16},${cy + headRadius} ${cx + 16},${cy + headRadius} ${cx},${cy + headRadius + 30}" fill="#F2B866" />
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${style.start}" />
        <stop offset="100%" stop-color="${style.end}" />
      </linearGradient>
      <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    <!-- Background Gradient -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <!-- Ambient Lighting Beam -->
    <polygon points="${Math.round(width * 0.1)},0 ${Math.round(width * 0.75)},0 ${Math.round(width * 0.95)},${height} ${Math.round(width * 0.3)},${height}" fill="url(#lightBeam)" />
    <!-- Light Pool Glow -->
    <ellipse cx="${Math.round(width * 0.8)}" cy="${Math.round(height * 0.45)}" rx="${Math.round(width * 0.3)}" ry="${Math.round(height * 0.35)}" fill="#F2B866" fill-opacity="0.12" />
    
    <!-- Architectural Silhouettes -->
    ${decorSvg}

    <!-- Bottom Vignette / Overlay Bar -->
    <rect x="0" y="${barY}" width="${width}" height="${barHeight}" fill="#101817" fill-opacity="0.82" />
    <line x1="0" y1="${barY}" x2="${width}" y2="${barY}" stroke="#2E8B72" stroke-width="3" />
    <line x1="0" y1="${barY}" x2="${Math.round(width * 0.35)}" y2="${barY}" stroke="#F2B866" stroke-width="4" />

    <!-- Typography -->
    <text x="${Math.round(width * 0.06)}" y="${barY + 22}" fill="#F2B866" font-family="'Manrope', sans-serif" font-weight="700" font-size="${Math.max(10, Math.round(height * 0.025))}px" letter-spacing="1.5">PURENEST PREMIUM HOUSEKEEPING</text>
    <text x="${Math.round(width * 0.06)}" y="${barY + 48}" fill="#FFFFFF" font-family="'Manrope', sans-serif" font-weight="800" font-size="${Math.max(18, Math.round(height * 0.052))}px">${title}</text>
    <text x="${Math.round(width * 0.06)}" y="${barY + 74}" fill="#A2B4AF" font-family="'Inter', sans-serif" font-weight="500" font-size="${Math.max(12, Math.round(height * 0.03))}px">${subtitle}</text>
  </svg>`;
}

// Export for module or standalone use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateEditorialSVG, palettes };
}

console.log("PureNest JavaScript asset engine loaded successfully.");
