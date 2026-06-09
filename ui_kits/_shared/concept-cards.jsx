/* global React, TK_PALETTE, TK_CONCEPTS */
// Concept artboard — shows one mark in multiple contexts.

const TK_CARD_W = 880;
const TK_CARD_H = 600;

// ── Themes ─────────────────────────────────────────────────────
// `paper`         — warm cream cards, white hero (current default)
// `landing-light` — clean white inspired by the light landing mockup
// `landing-dark`  — deep near-black + bright cyan accent from dark mockup
const THEMES = {
  'paper': {
    card: TK_PALETTE.paper, cardBorder: '#e3dccb',
    hero: '#ffffff', heroBorder: '#e6e8ea',
    inkPrimary: TK_PALETTE.body, inkMuted: '#5b6770', inkFaint: '#9aa1a8',
    heroDark: TK_PALETTE.body, faviconBg: '#ffffff', faviconBorder: '#e6e8ea',
    accent: TK_PALETTE.com,
  },
  'landing-light': {
    card: TK_PALETTE.paperWhite, cardBorder: '#e4eaee',
    hero: '#ffffff', heroBorder: '#e6ebef',
    inkPrimary: TK_PALETTE.body, inkMuted: '#475561', inkFaint: '#8a96a1',
    heroDark: TK_PALETTE.inkDeep, faviconBg: '#ffffff', faviconBorder: '#e6ebef',
    accent: TK_PALETTE.com,
  },
  'landing-dark': {
    card: TK_PALETTE.inkDeep, cardBorder: '#1f2731',
    hero: TK_PALETTE.inkSoft, heroBorder: '#222a35',
    inkPrimary: '#ecf1f6', inkMuted: '#9aa6b2', inkFaint: '#5d6975',
    heroDark: '#06090d', faviconBg: TK_PALETTE.inkSoft, faviconBorder: '#222a35',
    accent: TK_PALETTE.cyanBright,
  },
};

const themeFor = (name) => THEMES[name] || THEMES['paper'];

function TiltedMark({ Mark, size, mono, inverse = false, tilt = 0 }) {
  return (
    <div style={{
      display: 'inline-flex', transform: `rotate(${tilt}deg)`,
      transformOrigin: 'center', transition: 'transform 280ms cubic-bezier(.2,.7,.2,1)',
    }}>
      <Mark size={size} mono={mono} inverse={inverse} />
    </div>
  );
}

function HeroPanel({ Mark, tilt, theme, variant, size = 220 }) {
  // variant: 'light' | 'dark' | 'mono'
  const isDark = variant === 'dark';
  const isMono = variant === 'mono';
  const bgColor = isDark ? theme.heroDark : theme.hero;
  const border = isDark ? 'none' : `1px solid ${theme.heroBorder}`;
  const tagColor = isDark ? 'rgba(255,255,255,0.32)' : theme.inkFaint;
  // dark variant keeps full pillar colors; only the body/head lift for contrast
  const mono = isMono ? theme.inkPrimary : null;
  const inverse = isDark;
  return (
    <div style={{
      background: bgColor, borderRadius: 12, border,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', height: 280, overflow: 'hidden',
    }}>
      <span style={{
        position: 'absolute', top: 12, left: 14,
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: tagColor,
      }}>{variant}{tilt ? ` · tilt ${tilt}°` : ''}</span>
      <TiltedMark Mark={Mark} size={size} mono={mono} inverse={inverse} tilt={tilt} />
    </div>
  );
}

function FaviconRow({ Mark, theme, tilt = 0, inverse = false }) {
  const sizes = [16, 24, 32, 48, 64];
  return (
    <div style={{
      background: theme.faviconBg, borderRadius: 10,
      border: `1px solid ${theme.faviconBorder}`, padding: '20px 24px',
    }}>
      <div style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: theme.inkFaint, fontWeight: 500,
      }}>favicon · scale{tilt ? ` · ${tilt}°` : ''}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: 14 }}>
        {sizes.map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ transform: `rotate(${tilt}deg)`, transformOrigin: 'center', display: 'inline-flex' }}>
              <Mark size={s} inverse={inverse} />
            </div>
            <span style={{
              fontFamily: 'ui-monospace, monospace', fontSize: 9, color: theme.inkFaint,
            }}>{s}px</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Lockup({ Mark, dark, wordmarkStyle, theme, tilt }) {
  const styles = {
    poppins: { fontFamily: "'Poppins', 'Manrope', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' },
    lowercase: { fontFamily: "'Poppins', 'Manrope', sans-serif", fontWeight: 600, letterSpacing: '-0.01em', textTransform: 'lowercase' },
    mono: { fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 500, letterSpacing: '-0.01em', textTransform: 'lowercase' },
  };
  const ws = styles[wordmarkStyle] || styles.poppins;
  const bg = dark ? theme.heroDark : theme.hero;
  const ink = dark ? '#ffffff' : theme.inkPrimary;
  const tagColor = dark ? 'rgba(255,255,255,0.32)' : theme.inkFaint;
  return (
    <div style={{
      background: bg, borderRadius: 10,
      border: dark ? 'none' : `1px solid ${theme.heroBorder}`,
      padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 18,
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute', top: 10, left: 14,
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: tagColor,
      }}>lockup · {dark ? 'dark' : 'light'}</span>
      <TiltedMark Mark={Mark} size={56} inverse={dark} tilt={tilt} />
      <span style={{ ...ws, fontSize: 30, color: ink }}>tekrogen</span>
    </div>
  );
}

function ConceptCard({ concept, theme: themeName, heroVariant, wordmarkStyle, showLockups, showFavicon, tiltOffset = 0 }) {
  const { Mark, name, blurb, tag, id, tilt: baseTilt = 0 } = concept;
  const theme = themeFor(themeName);
  const tilt = baseTilt + tiltOffset;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: theme.card,
      padding: 28, display: 'flex', flexDirection: 'column', gap: 16,
      fontFamily: 'var(--tk-font-sans)',
      borderRadius: 0,
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: theme.accent,
          }}>concept · {tag}</div>
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 700,
            color: theme.inkPrimary, marginTop: 2,
          }}>{name}</div>
        </div>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10, color: theme.inkFaint,
          padding: '4px 8px', border: `1px solid ${theme.cardBorder}`, borderRadius: 999,
        }}>{id}{tilt ? `  ·  ${tilt}°` : ''}</div>
      </div>

      <p style={{
        fontFamily: 'var(--tk-font-sans)', fontSize: 13.5,
        lineHeight: 1.55, color: theme.inkMuted, margin: 0, maxWidth: 720,
      }}>{blurb}</p>

      {/* hero + favicon side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <HeroPanel Mark={Mark} tilt={tilt} theme={theme} variant={heroVariant} />
        {showFavicon && <FaviconRow Mark={Mark} theme={theme} tilt={tilt} inverse={false} />}
      </div>

      {/* lockups */}
      {showLockups && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Lockup Mark={Mark} dark={false} wordmarkStyle={wordmarkStyle} theme={theme} tilt={tilt} />
          <Lockup Mark={Mark} dark={true} wordmarkStyle={wordmarkStyle} theme={theme} tilt={tilt} />
        </div>
      )}
    </div>
  );
}

window.ConceptCard = ConceptCard;
window.TK_CARD_W = TK_CARD_W;
window.TK_CARD_H = TK_CARD_H;
window.TK_THEMES = THEMES;
