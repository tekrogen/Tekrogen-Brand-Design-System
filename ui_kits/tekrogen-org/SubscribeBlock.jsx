/* global React */
// Subscribe block — the cyan-bordered card. Fakes a successful submit
// and shows a success toast.

function SubscribeBlock() {
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | sending | sent
  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    setTimeout(() => setState('sent'), 600);
  };

  return (
    <div style={{
      background: 'var(--tk-bg-2)',
      border: '1px solid var(--tk-cyan)',
      borderRadius: 12, padding: '36px 36px 32px',
      maxWidth: 720, margin: '64px auto',
      position: 'relative',
    }}>
      <div style={{
        fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-eyebrow)',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--tk-accent)', marginBottom: 14,
      }}>Subscribe</div>
      <h3 style={{
        fontFamily: 'var(--tk-font-sans)', fontWeight: 600,
        fontSize: 'var(--tk-fs-h2)', lineHeight: 1.2, color: 'var(--tk-fg-1)',
        margin: '0 0 12px', letterSpacing: '-0.005em',
      }}>Get field notes in your inbox.</h3>
      <p style={{
        fontFamily: 'var(--tk-font-sans)', fontStyle: 'italic',
        fontSize: 'var(--tk-fs-body)', color: 'var(--tk-fg-3)', margin: '0 0 22px',
        lineHeight: 1.55,
      }}>One short note a month. No tracking, no upsells. Unsubscribe with one click.</p>

      {state !== 'sent' ? (
        <form onSubmit={submit} style={{ display: 'flex', gap: 10 }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@domain.com"
            style={{
              flex: 1, background: 'var(--tk-bg-3)',
              border: '1px solid var(--tk-border)',
              color: 'var(--tk-fg-1)', padding: '12px 16px',
              borderRadius: 8, fontFamily: 'var(--tk-font-sans)',
              fontSize: 'var(--tk-fs-body)', outline: 'none',
            }}
          />
          <button type="submit" disabled={state === 'sending'} style={{
            background: 'var(--tk-cyan)', color: 'var(--tk-ink)',
            border: 'none', padding: '12px 20px', borderRadius: 6,
            fontFamily: 'var(--tk-font-mono)', fontWeight: 600,
            fontSize: 'var(--tk-fs-eyebrow)', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: state === 'sending' ? 'wait' : 'pointer',
          }}>{state === 'sending' ? 'Subscribing…' : 'Subscribe →'}</button>
        </form>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', background: 'var(--tk-bg-3)',
          border: '1px solid rgba(126,219,165,0.4)', borderRadius: 8,
          fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-code)',
          letterSpacing: '0.06em', color: 'var(--tk-net)',
        }}>
          <span style={{ fontSize: 'var(--tk-fs-body)' }}>✓</span>
          <span>Confirmation sent to <span style={{ color: 'var(--tk-fg-1)' }}>{email}</span>. Click the link to finish.</span>
        </div>
      )}
    </div>
  );
}

window.SubscribeBlock = SubscribeBlock;
