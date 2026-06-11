/* global React */
// Tekrogen v2 dragonfly mark — self-contained, ready to drop in.
// The 18° tilt is baked into the inner <g transform>, so consumers
// don't need to wrap it in a CSS rotate. Pass `tilt={0}` to override.
//
// Palette is read from window.TK_TOKENS (tokens/palette.js). Load that
// script before this one. See adr/0002-palette-single-source.md.

const TK_PAL = (() => {
  if (typeof window === "undefined" || !window.TK_TOKENS) {
    throw new Error(
      "Dragonfly.jsx: window.TK_TOKENS is missing. Load tokens/palette.js first."
    );
  }
  const t = window.TK_TOKENS;
  return {
    org: t.org, studio: t.studio, com: t.com, net: t.net,
    body: t.body, head: t.head,
    bodyInv: t.bodyInv, headInv: t.headInv,
  };
})();

function Dragonfly({ size = 60, inverse = false, tilt = 18 }) {
  // Default fills follow --tk-mark-* (theme-aware — flip live with data-tk-theme).
  // inverse=true forces the dark-surface (lifted) treatment regardless of page theme.
  const head  = inverse ? TK_PAL.headInv : 'var(--tk-mark-head)';
  const body  = inverse ? TK_PAL.bodyInv : 'var(--tk-mark-body)';
  const facet = inverse ? '#1b2530'      : 'var(--tk-mark-facet)';
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" aria-label="Tekrogen">
      <g transform={`rotate(${tilt} 100 110)`}>
        <polygon points="100,4 108,9 108,19 100,24 92,19 92,9" style={{ fill: head }}/>
        <polygon points="95,22 105,22 108,34 92,34" style={{ fill: body }}/>
        <polygon points="94,32 18,6 22,68 52,72 94,68" fill={TK_PAL.org}/>
        <polygon points="94,32 18,6 40,14 82,42 94,42" style={{ fill: facet }} opacity="0.45"/>
        <polygon points="106,32 182,6 178,68 148,72 106,68" fill={TK_PAL.studio}/>
        <polygon points="106,32 182,6 160,14 118,42 106,42" fill={TK_PAL.org} opacity="0.45"/>
        <polygon points="94,68 32,84 38,126 94,110" fill={TK_PAL.com}/>
        <polygon points="94,68 32,84 52,96 94,84" fill="#0893a4" opacity="0.55"/>
        <polygon points="106,68 168,84 162,126 106,110" fill={TK_PAL.net}/>
        <polygon points="106,68 168,84 148,96 106,84" fill="#3dcfa3" opacity="0.55"/>
        <polygon points="94,32 106,32 110,70 108,130 103,216 100,220 97,216 92,130 90,70" style={{ fill: body }}/>
        <polygon points="98,34 102,34 104,80 101,210 100,220 99,210 96,80" style={{ fill: head }} opacity="0.4"/>
      </g>
    </svg>
  );
}

Object.assign(window, { Dragonfly, TK_PAL });
