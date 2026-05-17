/* global React, Dragonfly */
// Site footer — four entity pillars + dragonfly mark + tagline.

function Footer() {
  const pillars = [
    { id: 'org',    name: 'tekrogen.org',    label: 'Research, academic groups, open work',          color: 'var(--tk-org)' },
    { id: 'studio', name: 'tekrogen.studio', label: 'Proof of concept and demos',                        color: 'var(--tk-studio)' },
    { id: 'com',    name: 'tekrogen.com',    label: 'Commercial product, paid offerings',             color: 'var(--tk-com)' },
    { id: 'net',    name: 'tekrogen.net',    label: 'Infrastructure, platform, developer tools',      color: 'var(--tk-net)' },
  ];
  return (
    <footer style={{
      marginTop: 80, paddingTop: 56,
      borderTop: '1px solid var(--tk-ink-2)',
      background: '#0a0d12',
    }}>
      <div style={{
        maxWidth: 1180, margin: '0 auto',
        padding: '0 32px 56px',
        display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56,
      }}>
        <div>
          <Dragonfly size={56}/>
          <div style={{
            fontFamily: 'var(--tk-font-sans)', fontWeight: 700,
            fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--tk-fg-1)', marginTop: 18,
          }}>TEKROGEN</div>
          <p style={{
            fontFamily: 'var(--tk-font-sans)', fontStyle: 'italic',
            fontSize: 14, color: 'var(--tk-fg-3)', margin: '12px 0 0',
            maxWidth: 280, lineHeight: 1.55,
          }}>Real solutions. Built, proven, ready to use.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {pillars.map(p => (
            <a key={p.id} href={`https://${p.name}`}
              style={{
                display: 'block', padding: '18px 20px',
                background: 'var(--tk-ink-soft)',
                border: '1px solid var(--tk-ink-2)',
                borderLeft: `2px solid ${p.color}`,
                borderRadius: 8, textDecoration: 'none',
              }}>
              <div style={{
                fontFamily: 'var(--tk-font-mono)', fontSize: 12,
                color: p.color, letterSpacing: '0.04em', marginBottom: 4,
              }}>{p.name}</div>
              <div style={{
                fontFamily: 'var(--tk-font-sans)', fontSize: 13,
                color: 'var(--tk-fg-3)', lineHeight: 1.5,
              }}>{p.label}</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--tk-ink-2)',
        padding: '20px 32px',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--tk-font-mono)', fontSize: 10.5,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--tk-fg-4)',
        }}>
          <span>© 2026 Tekrogen · Martinique Dolce</span>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="/colophon" style={{ color: 'var(--tk-fg-4)', textDecoration: 'none', border: 'none' }}>Colophon</a>
            <a href="/rss" style={{ color: 'var(--tk-fg-4)', textDecoration: 'none', border: 'none' }}>RSS</a>
            <a href="/contact" style={{ color: 'var(--tk-fg-4)', textDecoration: 'none', border: 'none' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
