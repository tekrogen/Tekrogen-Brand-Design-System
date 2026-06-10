/* global React, Dragonfly */
// Article view — single field note. Sans-only (Poppins editorial:
// headline 600 / italic 400 dek), narrow column, byline + dek.
// Per adr/0001-typography-sans-only.md.

function Article({ note, onBack }) {
  return (
    <article style={{
      maxWidth: 600, margin: '0 auto',
      padding: '56px 32px 96px',
    }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: '1px solid var(--tk-border)',
        color: 'var(--tk-fg-3)',
        fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-meta)',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '7px 12px', borderRadius: 6, cursor: 'pointer',
        marginBottom: 36,
      }}>← Back to notes</button>

      <div style={{
        fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-eyebrow)',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--tk-accent)', marginBottom: 14,
      }}>{note.kicker} · {String(note.id).padStart(2, '0')}</div>

      <h1 style={{
        fontFamily: 'var(--tk-font-sans)', fontWeight: 600,
        fontSize: 'var(--tk-fs-h1)', letterSpacing: '-0.01em', lineHeight: 1.12,
        color: 'var(--tk-fg-1)', margin: '0 0 20px', textWrap: 'pretty',
      }}>{note.title}</h1>

      <p style={{
        fontFamily: 'var(--tk-font-sans)', fontStyle: 'italic',
        fontSize: 'var(--tk-fs-h3)', lineHeight: 1.5, color: 'var(--tk-fg-3)',
        margin: '0 0 32px',
      }}>{note.dek}</p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36,
        paddingBottom: 28, borderBottom: '1px solid var(--tk-border)',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--tk-org), var(--tk-com))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 600, fontSize: 'var(--tk-fs-body)',
        }}>MD</div>
        <div>
          <div style={{ fontFamily: 'var(--tk-font-sans)', fontWeight: 600, fontSize: 'var(--tk-fs-body-sm)', color: 'var(--tk-fg-1)' }}>Martinique Dolce</div>
          <div style={{
            fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--tk-fg-3)', marginTop: 2,
          }}>Founder · {note.date} · {note.read} min read</div>
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--tk-font-sans)', fontSize: 'var(--tk-fs-body)',
        lineHeight: 1.7, color: 'var(--tk-fg-2)',
      }}>
        {note.body.map((p, i) => (
          <p key={i} style={{ margin: '0 0 22px', textWrap: 'pretty' }}>{p}</p>
        ))}
      </div>

      <div style={{
        marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--tk-border)',
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <Dragonfly size={48}/>
        <div>
          <div style={{
            fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-meta)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--tk-fg-3)',
          }}>Field notes · series</div>
          <div style={{
            fontFamily: 'var(--tk-font-sans)', fontWeight: 600,
            fontSize: 'var(--tk-fs-h3)', color: 'var(--tk-fg-1)', marginTop: 4,
          }}>One mark, four entities, four years.</div>
        </div>
      </div>
    </article>
  );
}

window.Article = Article;
