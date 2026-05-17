/* global React */
// Field note card — one item in the /notes/ list.
// Number badge + mono kicker + Poppins editorial title + italic dek + meta row.
// The whole card is a single link; hover lifts the border to cyan.
// Sans-only — see adr/0001-typography-sans-only.md.

function FieldNoteCard({ note, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={`/notes/${note.id}`}
      onClick={e => { e.preventDefault(); onOpen(note); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: 'var(--tk-ink-soft)',
        border: '1px solid ' + (hover ? 'rgba(31,213,218,0.4)' : 'var(--tk-ink-2)'),
        borderRadius: 12, padding: '28px 30px',
        color: 'inherit',
        transition: 'border-color 220ms cubic-bezier(.2,.7,.2,1)',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14,
      }}>
        <span style={{
          fontFamily: 'var(--tk-font-mono)', fontWeight: 700, fontSize: 22,
          color: 'var(--tk-cyan)', letterSpacing: '0.02em', lineHeight: 1,
        }}>{String(note.id).padStart(2, '0')}</span>
        <span style={{
          fontFamily: 'var(--tk-font-mono)', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--tk-fg-3)',
        }}>{note.kicker}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--tk-font-sans)', fontWeight: 600,
        fontSize: 26, letterSpacing: '-0.005em', lineHeight: 1.2,
        color: 'var(--tk-fg-1)', margin: '0 0 14px', textWrap: 'pretty',
      }}>{note.title}</h3>

      <p style={{
        fontFamily: 'var(--tk-font-sans)', fontStyle: 'italic',
        fontSize: 16, lineHeight: 1.55, color: 'var(--tk-fg-3)',
        margin: '0 0 20px', maxWidth: 640,
      }}>{note.dek}</p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'var(--tk-font-mono)', fontSize: 10.5,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--tk-fg-4)',
      }}>
        <span>{note.date}</span>
        <span style={{ color: 'var(--tk-fg-5)' }}>·</span>
        <span>{note.read} min read</span>
        <span style={{ color: 'var(--tk-fg-5)' }}>·</span>
        <span style={{ color: 'var(--tk-' + note.pillar + ')' }}>{note.pillar}</span>
      </div>
    </a>
  );
}

window.FieldNoteCard = FieldNoteCard;
