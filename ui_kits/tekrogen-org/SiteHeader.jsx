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
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(14,17,22,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--tk-ink-2)',
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
            fontWeight: 600, fontSize: 22, letterSpacing: '0.01em',
            color: 'var(--tk-fg-1)',
          }}>Tekrogen</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(l => (
            <a key={l.id} href={l.href}
              onClick={e => { e.preventDefault(); onNav(l.id); }}
              style={{
                fontFamily: 'var(--tk-font-sans)', fontSize: 14, fontWeight: 500,
                color: path === l.id ? 'var(--tk-fg-1)' : 'var(--tk-fg-3)',
                textDecoration: 'none', border: 'none',
                transition: 'color 120ms cubic-bezier(.2,.7,.2,1)',
              }}>{l.label}</a>
          ))}
          <a href="/subscribe" onClick={e => { e.preventDefault(); onNav('subscribe'); }} style={{
            background: 'var(--tk-cyan)', color: '#0e1116',
            padding: '8px 16px', borderRadius: 6, border: 'none',
            fontFamily: 'var(--tk-font-sans)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>Subscribe</a>
        </nav>
      </div>
    </header>
  );
}

window.SiteHeader = SiteHeader;
