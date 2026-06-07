/* global React */
// Section head atom — eyebrow (left), h2 (left), mono meta (right),
// border-bottom hairline. Reused on every long surface.

function SectionHead({ eyebrow, title, meta, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 24, paddingBottom: 18, borderBottom: '1px solid var(--tk-ink-2)',
      marginBottom: 32, ...style,
    }}>
      <div>
        {eyebrow && (
          <div style={{
            fontFamily: 'var(--tk-font-mono)', fontWeight: 500,
            fontSize: 'var(--tk-fs-eyebrow)', letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--tk-cyan)', marginBottom: 8,
          }}>{eyebrow}</div>
        )}
        <h2 style={{
          fontFamily: 'var(--tk-font-sans)', fontWeight: 700,
          fontSize: 28, letterSpacing: '-0.015em', lineHeight: 1.1,
          margin: 0, color: 'var(--tk-fg-1)',
        }}>{title}</h2>
      </div>
      {meta && (
        <div style={{
          fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-meta)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--tk-fg-3)',
        }}>{meta}</div>
      )}
    </div>
  );
}

window.SectionHead = SectionHead;
