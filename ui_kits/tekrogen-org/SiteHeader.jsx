/* global React, Dragonfly */
// Site header — sticky top bar used across the publication.
// The publication uses the SANS wordmark "Tekrogen" (Poppins 600, slight letter-spacing)
// for the publication mark — the locked UPPERCASE "TEKROGEN" wordmark is reserved
// for the marketing surfaces (asset pack, lockup sheet).

function SiteHeader({ path, onNav }) {
  const links = [
    { id: 'home',   label: 'Home',        href: '/' },
    { id: 'notes',  label: 'Field notes', href: '/notes' },
    { id: 'studio', label: 'Studio',      href: '/studio' },
    { id: 'about',  label: 'About',       href: '/about' },
  ];
  const curTheme = (typeof document !== 'undefined'
    && document.documentElement.getAttribute('data-tk-theme')) || 'ink';
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'color-mix(in srgb, var(--tk-bg-1) 92%, transparent)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--tk-border)',
    }}>
      <div style={{
        maxWidth: 1180, margin: '0 auto',
        padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24,
      }}>
        <a href="/" onClick={e => { e.preventDefault(); onNav('home'); }} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          color: 'inherit', textDecoration: 'none', border: 'none',
        }}>
          <Dragonfly size={36}/>
          <span style={{
            fontFamily: 'var(--tk-font-sans)',
            fontWeight: 600, fontSize: 'var(--tk-fs-h3)', letterSpacing: '0.01em',
            color: 'var(--tk-fg-1)',
          }}>Tekrogen</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(l => (
            <a key={l.id} href={l.href}
              onClick={e => { e.preventDefault(); onNav(l.id); }}
              style={{
                fontFamily: 'var(--tk-font-sans)', fontSize: 'var(--tk-fs-body-sm)', fontWeight: 500,
                color: path === l.id ? 'var(--tk-fg-1)' : 'var(--tk-fg-3)',
                textDecoration: 'none', border: 'none',
                transition: 'color 120ms cubic-bezier(.2,.7,.2,1)',
              }}>{l.label}</a>
          ))}
          <div className="tk-theme-toggle" role="group" aria-label="Theme">
            <button type="button" data-tk-theme-set="ink" aria-pressed={curTheme === 'ink'}>Ink</button>
            <button type="button" data-tk-theme-set="paper" aria-pressed={curTheme === 'paper'}>Paper</button>
          </div>
          <a href="/subscribe" onClick={e => { e.preventDefault(); onNav('subscribe'); }} style={{
            background: 'var(--tk-cyan)', color: 'var(--tk-ink)',
            padding: '8px 16px', borderRadius: 6, border: 'none',
            fontFamily: 'var(--tk-font-sans)', fontSize: 'var(--tk-fs-body-sm)', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>Subscribe</a>
        </nav>
      </div>
    </header>
  );
}

window.SiteHeader = SiteHeader;
