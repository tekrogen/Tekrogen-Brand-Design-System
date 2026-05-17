/* global React */
// Tekrogen mark explorations — six concepts + v2 baseline.
// Each component renders an SVG mark; consumers pass size and an optional
// `mono` color (string) to flatten the palette for embroidery / single-ink use.
//
// Palette lives in tokens/palette.js — load that script BEFORE this file.
// See adr/0002-palette-single-source.md.

const TK_PALETTE = (() => {
  if (typeof window === "undefined" || !window.TK_TOKENS) {
    // Fail loud — earlier we hardcoded a duplicate; now we refuse to guess.
    throw new Error(
      "marks.jsx: window.TK_TOKENS is missing. Load tokens/palette.js first."
    );
  }
  const t = window.TK_TOKENS;
  return {
    org: t.org, studio: t.studio, com: t.com, net: t.net,
    body: t.body, head: t.head,
    paper: t.paperWarm, ink: t.ink,
    cyanBright: t.cyan, inkDeep: t.ink, inkSoft: t.inkSoft,
    paperWhite: t.paper,
  };
})();

// paletteFor(mono, inverse):
//   mono    — flatten to a single ink color (embroidery / single-color use)
//   inverse — lift body & head to light tones so the mark stays full-color
//             on dark backgrounds without disappearing into the page
const paletteFor = (mono, inverse) => {
  if (mono) return { org: mono, studio: mono, com: mono, net: mono, body: mono, head: mono };
  if (inverse) return { ...TK_PALETTE, body: '#cad6e0', head: '#9eb1c0' };
  return TK_PALETTE;
};

// ────────────────────────────────────────────────────────────────
// 00 · v2 BASELINE — the existing dragonfly with faceted wings.
// ────────────────────────────────────────────────────────────────
function MarkV2({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  const facet = mono ? mono : p.body;
  const showFacets = !mono;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" aria-label="Tekrogen v2 dragonfly">
      <polygon points="100,4 108,9 108,19 100,24 92,19 92,9" fill={p.head}/>
      <polygon points="95,22 105,22 108,34 92,34" fill={p.body}/>
      <polygon points="94,32 18,6 22,68 52,72 94,68" fill={p.org}/>
      {showFacets && <polygon points="94,32 18,6 40,14 82,42 94,42" fill={facet} opacity="0.45"/>}
      <polygon points="106,32 182,6 178,68 148,72 106,68" fill={p.studio}/>
      {showFacets && <polygon points="106,32 182,6 160,14 118,42 106,42" fill={p.org} opacity="0.45"/>}
      <polygon points="94,68 32,84 38,126 94,110" fill={p.com}/>
      {showFacets && <polygon points="94,68 32,84 52,96 94,84" fill="#0893a4" opacity="0.55"/>}
      <polygon points="106,68 168,84 162,126 106,110" fill={p.net}/>
      {showFacets && <polygon points="106,68 168,84 148,96 106,84" fill="#3dcfa3" opacity="0.55"/>}
      <polygon points="94,32 106,32 110,70 108,130 103,216 100,220 97,216 92,130 90,70" fill={p.body}/>
      {showFacets && <polygon points="98,34 102,34 104,80 101,210 100,220 99,210 96,80" fill={p.head} opacity="0.4"/>}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// 01 · QUADRANT — dragonfly distilled. Four razor blades + one spine.
//   Same metaphor, all decoration removed. Reads as a precision instrument.
// ────────────────────────────────────────────────────────────────
function MarkQuadrant({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" aria-label="Tekrogen Quadrant">
      {/* head */}
      <circle cx="100" cy="14" r="6" fill={p.head}/>
      {/* thorax */}
      <rect x="96" y="22" width="8" height="14" rx="1" fill={p.body}/>
      {/* upper-left wing */}
      <polygon points="96,38 18,18 100,72" fill={p.org}/>
      {/* upper-right wing */}
      <polygon points="104,38 182,18 100,72" fill={p.studio}/>
      {/* lower-left wing */}
      <polygon points="96,76 28,108 100,118" fill={p.com}/>
      {/* lower-right wing */}
      <polygon points="104,76 172,108 100,118" fill={p.net}/>
      {/* spine — long, tapered */}
      <polygon points="98,38 102,38 101,210 100,214 99,210" fill={p.body}/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// 02 · COMPOUND EYE — hex facet cluster.
//   The brief explicitly invokes "compound eyes — multi-directional awareness".
//   Drop the body silhouette; the eye IS the mark.
// ────────────────────────────────────────────────────────────────
function MarkCompoundEye({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  // Hex grid — 19 cells (1 + 6 + 12). Pointy-top hex, radius ~14.
  const r = 13;
  const w = r * Math.sqrt(3);
  const h = r * 1.5;
  // axial coords for a 2-ring hex cluster
  const cells = [
    [0,0],
    [1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,1],
    [2,0],[-2,0],[0,2],[0,-2],[2,-1],[2,-2],[-2,1],[-2,2],[1,-2],[-1,-1],[-1,2],[1,1],
  ];
  // Map ring-2 compass positions to pillar colors
  const compass = {
    '0,-2': p.org,    // N  → .org
    '2,-2': p.studio, // NE → .studio
    '2,0':  p.studio,
    '-2,2': p.com,    // SW → .com
    '-2,0': p.com,
    '0,2':  p.net,    // S/SE → .net
    '2,-1': p.studio,
    '-2,1': p.com,
    '1,-2': p.org,
    '-1,2': p.net,
  };
  const ringOf = (q, rc) => Math.max(Math.abs(q), Math.abs(rc), Math.abs(q + rc));
  return (
    <svg width={size} height={size} viewBox="-60 -60 120 120" aria-label="Tekrogen Compound Eye">
      <g>
        {cells.map(([q, rc]) => {
          const x = w * (q + rc / 2);
          const y = h * rc;
          const ring = ringOf(q, rc);
          const key = `${q},${rc}`;
          let fill;
          const neutralMid = mono ? mono : (inverse ? '#3a4654' : '#cfd9e1');
          const neutralLow = mono ? mono : (inverse ? '#2a3340' : '#e6ebef');
          if (ring === 0) fill = p.body;
          else if (ring === 1) fill = neutralMid;
          else fill = compass[key] || neutralLow;
          const pts = [0,1,2,3,4,5].map(i => {
            const a = (Math.PI / 3) * i - Math.PI / 2;
            return `${(x + r * Math.cos(a)).toFixed(2)},${(y + r * Math.sin(a)).toFixed(2)}`;
          }).join(' ');
          return <polygon key={key} points={pts} fill={fill}/>;
        })}
      </g>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// 03 · TETRA — isometric tetrahedron, four faces = four pillars.
//   Three visible faces are pillar-colored; the fourth (.net) is the implied
//   back face, hinted by a dashed silhouette edge.
// ────────────────────────────────────────────────────────────────
function MarkTetra({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  // Apex top-front, three base vertices around a triangle.
  // Project: front-left, front-right, back, apex.
  const A = [100, 12];    // apex
  const FL = [22, 178];   // front-left base
  const FR = [178, 178];  // front-right base
  const BK = [100, 120];  // back base (visible through silhouette)
  return (
    <svg width={size} height={size * 1.05} viewBox="0 0 200 210" aria-label="Tekrogen Tetra">
      {/* back face (.net) — drawn first, mostly hidden but visible at top edges */}
      <polygon points={`${A} ${FL} ${BK}`} fill={p.org}/>
      <polygon points={`${A} ${FR} ${BK}`} fill={p.studio}/>
      <polygon points={`${FL} ${FR} ${BK}`} fill={p.com}/>
      {/* implied back face edge */}
      <polyline points={`${FL} ${BK} ${FR}`} fill="none" stroke={p.net} strokeWidth="2.5" strokeDasharray="3 4" strokeLinecap="round"/>
      {/* vertex dots — quietly precise */}
      {[A, FL, FR].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={p.body}/>
      ))}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// 04 · DIATOM — flywheel hub with four pillar arms + a fifth at the center.
//   Four cardinal arms (.org / .studio / .com / .net) reach outward;
//   the hub is the fifth pillar — the search for knowledge that drives
//   every cycle. Eight rotational tick-marks frame the hub to read as
//   motion / a turning flywheel, not a static specimen.
// ────────────────────────────────────────────────────────────────
function MarkDiatom({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  const ringStroke = mono ? mono : p.body;
  const hub = mono ? mono : p.body;
  const hubInner = mono ? mono : (inverse ? '#e4eaf0' : '#ffffff');
  // dark, bold core — stays in-theme on every background
  const hubAccent = mono ? mono : (inverse ? '#e4eaf0' : TK_PALETTE.body);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-label="Tekrogen Diatom">
      {/* outer ring */}
      <circle cx="100" cy="100" r="92" fill="none" stroke={ringStroke} strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="86" fill="none" stroke={ringStroke} strokeWidth="0.8" opacity="0.35"/>
      {/* four cardinal lens arms */}
      {/* N — .org */}
      <path d="M 100 14 Q 124 50 100 96 Q 76 50 100 14 Z" fill={p.org}/>
      {/* E — .studio */}
      <path d="M 186 100 Q 150 124 104 100 Q 150 76 186 100 Z" fill={p.studio}/>
      {/* S — .com */}
      <path d="M 100 186 Q 124 150 100 104 Q 76 150 100 186 Z" fill={p.com}/>
      {/* W — .net */}
      <path d="M 14 100 Q 50 124 96 100 Q 50 76 14 100 Z" fill={p.net}/>
      {/* hub — the fifth pillar (knowledge). Solid dark disc, no inner ring. */}
      <circle cx="100" cy="100" r="20" fill={hub}/>
      <circle cx="100" cy="100" r="7" fill={hubAccent}/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// 05 · SCHEMATIC T — engineering-blueprint monogram.
//   The letter T as a technical drawing. Construction lines, vertex dots,
//   four pillar-colored anchor caps at the cardinal arm ends.
// ────────────────────────────────────────────────────────────────
function MarkSchematicT({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  const ink = mono ? mono : p.body;
  const guide = mono ? mono : (inverse ? '#4a5868' : '#9aa9b3');
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-label="Tekrogen Schematic T">
      {/* construction guides — quarter frame */}
      <g stroke={guide} strokeWidth="0.6" fill="none" opacity="0.45">
        <line x1="20" y1="20" x2="40" y2="20"/>
        <line x1="20" y1="20" x2="20" y2="40"/>
        <line x1="180" y1="20" x2="160" y2="20"/>
        <line x1="180" y1="20" x2="180" y2="40"/>
        <line x1="20" y1="180" x2="40" y2="180"/>
        <line x1="20" y1="180" x2="20" y2="160"/>
        <line x1="180" y1="180" x2="160" y2="180"/>
        <line x1="180" y1="180" x2="180" y2="160"/>
      </g>
      {/* T crossbar */}
      <rect x="30" y="44" width="140" height="22" fill={ink}/>
      {/* T stem */}
      <rect x="88" y="66" width="24" height="116" fill={ink}/>
      {/* four pillar-anchor caps */}
      <rect x="22" y="40" width="14" height="30" fill={p.org}/>      {/* upper-left */}
      <rect x="164" y="40" width="14" height="30" fill={p.studio}/> {/* upper-right */}
      <rect x="84" y="178" width="14" height="14" fill={p.com}/>    {/* lower-left of stem */}
      <rect x="102" y="178" width="14" height="14" fill={p.net}/>   {/* lower-right of stem */}
      {/* registration crosshair on the joint */}
      <line x1="100" y1="55" x2="100" y2="75" stroke={guide} strokeWidth="0.6" opacity="0.7"/>
      <line x1="90" y1="65" x2="110" y2="65" stroke={guide} strokeWidth="0.6" opacity="0.7"/>
      <circle cx="100" cy="65" r="3" fill="none" stroke={guide} strokeWidth="0.6" opacity="0.7"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// 06 · CODEX — vertical spine with four slabs.
//   Reads simultaneously as a book spine (academic press) and a git tree
//   (commits branching off main). Most editorial of the bunch.
// ────────────────────────────────────────────────────────────────
function MarkCodex({ size = 160, mono = null, inverse = false }) {
  const p = paletteFor(mono, inverse);
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" aria-label="Tekrogen Codex">
      {/* spine */}
      <rect x="94" y="14" width="12" height="192" fill={p.body}/>
      {/* spine caps */}
      <rect x="88" y="10" width="24" height="6" fill={p.head}/>
      <rect x="88" y="204" width="24" height="6" fill={p.head}/>
      {/* four pillar slabs — alternating sides, top→bottom */}
      <rect x="22" y="34" width="72" height="26" fill={p.org}/>     {/* upper-left  · .org */}
      <rect x="106" y="74" width="72" height="26" fill={p.studio}/> {/* upper-right · .studio */}
      <rect x="22" y="114" width="72" height="26" fill={p.com}/>    {/* lower-left  · .com */}
      <rect x="106" y="154" width="72" height="26" fill={p.net}/>   {/* lower-right · .net */}
      {/* small connector notches where each slab meets the spine */}
      {[47, 87, 127, 167].map(y => (
        <rect key={y} x="92" y={y} width="16" height="2" fill={p.head}/>
      ))}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// Registry
// ────────────────────────────────────────────────────────────────
const TK_CONCEPTS = [
  { id: 'v2',        name: 'v2 Baseline',  tag: 'reference',    Mark: MarkV2,   tilt: 18,
    blurb: 'The existing dragonfly with faceted wings — included here for comparison. Tilted 18° so it reads as a flier in motion instead of a pinned specimen.' },
  { id: 'quadrant',  name: 'Quadrant',     tag: 'dragonfly',    Mark: MarkQuadrant, tilt: 0,
    blurb: 'Dragonfly distilled. Four razor blades, one spine — every facet removed. The metaphor survives; the clip-art vibe doesn’t.' },
  { id: 'eye',       name: 'Compound Eye', tag: 'entomology',   Mark: MarkCompoundEye, tilt: 0,
    blurb: 'The brief invokes compound eyes — multi-directional awareness. So make the eye the mark. Keeps the insect lineage without the silhouette every consultancy is using.' },
  { id: 'tetra',     name: 'Tetra',        tag: 'geometric',    Mark: MarkTetra, tilt: 0,
    blurb: 'A tetrahedron. Four pillars literally are four faces of one solid. Reads as math, engineering, and platonic rigor — and there are zero other dragonflies on this page.' },
  { id: 'diatom',    name: 'Diatom',       tag: 'flywheel',     Mark: MarkDiatom, tilt: 22,
    blurb: 'Five pillars, one flywheel. Four arms reach out to .org, .studio, .com and .net; the hub at the center holds the fifth — the search for knowledge that compounds every cycle. Tilted 22° because a flywheel at rest isn’t a flywheel.' },
  { id: 'schematic', name: 'Schematic T',  tag: 'engineering',  Mark: MarkSchematicT, tilt: 0,
    blurb: 'A wordmark-led letter T drawn as a technical schematic — construction guides, registration crosshair, four pillar-anchor caps. Backend-developer DNA, made literal.' },
  { id: 'codex',     name: 'Codex',        tag: 'editorial',    Mark: MarkCodex, tilt: 0,
    blurb: 'Reads as a book spine (academic press) and a git tree (commits off main) at the same time. Editorial, quiet, lettered — the academic side leading.' },
];

window.TK_PALETTE = TK_PALETTE;
window.TK_CONCEPTS = TK_CONCEPTS;
window.MarkV2 = MarkV2;
window.MarkQuadrant = MarkQuadrant;
window.MarkCompoundEye = MarkCompoundEye;
window.MarkTetra = MarkTetra;
window.MarkDiatom = MarkDiatom;
window.MarkSchematicT = MarkSchematicT;
window.MarkCodex = MarkCodex;
