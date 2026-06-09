/* global React, Dragonfly */
// Editorial hero used on the home page. Composed of:
//   eyebrow (mono cyan) · title (Poppins 600, sans large) · dek (Poppins italic muted) · meta row
// Sans-only per adr/0001-typography-sans-only.md.

function Hero({ eyebrow, title, dek, meta }) {
  return (
    <section style={{
      maxWidth: 1180, margin: '0 auto',
      padding: '72px 32px 56px',
      borderBottom: '1px solid var(--tk-ink-2)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
        <div style={{ flex: 1, maxWidth: 820 }}>
          <div style={{
            fontFamily: 'var(--tk-font-mono)', fontWeight: 500,
            fontSize: 'var(--tk-fs-eyebrow)', letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--tk-cyan)', marginBottom: 18,
          }}>{eyebrow}</div>

          <h1 style={{
            fontFamily: 'var(--tk-font-sans)',
            fontWeight: 600, fontSize: 'var(--tk-fs-display)',
            letterSpacing: '-0.01em', lineHeight: 1.1,
            margin: 0, color: 'var(--tk-fg-1)', textWrap: 'pretty',
          }}>{title}</h1>

          <p style={{
            fontFamily: 'var(--tk-font-sans)',
            fontSize: 'var(--tk-fs-h3)', fontStyle: 'italic',
            lineHeight: 1.5, color: 'var(--tk-fg-3)',
            margin: '20px 0 0', maxWidth: 680,
          }}>{dek}</p>

          <div style={{
            marginTop: 28,
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-meta)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--tk-fg-3)',
          }}>
            {meta.map((m, i) => (
              <React.Fragment key={i}>
                <span>{m}</span>
                {i < meta.length - 1 && <span style={{ color: 'var(--tk-fg-5)' }}>·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ flex: 'none', marginTop: 8 }}>
          <Dragonfly size={120}/>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
