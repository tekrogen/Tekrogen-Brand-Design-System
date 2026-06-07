// Tekrogen · Master Lockup Sheet
// Self-contained. Inline dragonfly + sectioned reference document.

const TK = {
  org:    '#446e88',
  studio: '#6491ac',
  com:    '#0db4b9',
  net:    '#7edba5',
  body:   '#385166',
  head:   '#cad6e0',
};
const TK_PRINT = {
  org:    '#3a6079',
  studio: '#5d89a5',
  com:    '#0aa3a8',
  net:    '#6dc491',
  body:   '#2e4356',
  head:   '#cad6e0',
};

// ──────────────────────────────────────────────
// The v2 dragonfly mark. Identical geometry to the
// exploration canvas; lifted here so this doc is
// self-contained and the marks can be re-tuned
// independently of the exploration file.
// ──────────────────────────────────────────────
function Dragonfly({ size = 160, mono = null, inverse = false, palette = TK, lead = null }) {
  const p = mono
    ? { org: mono, studio: mono, com: mono, net: mono, body: mono, head: mono }
    : inverse
      ? { ...palette, body: '#cad6e0', head: '#9eb1c0' }
      : palette;

  // lead = 'subtle' | 'balanced' | 'bold' | null. Used by the domain-split grid.
  // lead.which = 'org' | 'studio' | 'com' | 'net'
  const fade = (c, alpha) => {
    // hex to rgba
    const h = c.replace('#','');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const muted = '#3a4a5a';
  const desat = (which, pillar) => {
    if (!lead) return p[pillar];
    if (lead.which === pillar) return p[pillar];
    if (lead.level === 'subtle')   return p[pillar];                 // everyone full
    if (lead.level === 'balanced') return fade(p[pillar], 0.42);     // desaturate others
    if (lead.level === 'bold')     return inverse ? '#2a3a4a' : '#cfd7df'; // flatten others
    return p[pillar];
  };
  const facet = mono ? mono : (inverse ? '#1b2530' : p.body);
  const showFacets = !mono && (!lead || lead.level !== 'bold');

  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" aria-label="Tekrogen dragonfly">
      <polygon points="100,4 108,9 108,19 100,24 92,19 92,9" fill={p.head}/>
      <polygon points="95,22 105,22 108,34 92,34" fill={p.body}/>
      <polygon points="94,32 18,6 22,68 52,72 94,68" fill={desat('org','org')}/>
      {showFacets && <polygon points="94,32 18,6 40,14 82,42 94,42" fill={facet} opacity="0.45"/>}
      <polygon points="106,32 182,6 178,68 148,72 106,68" fill={desat('studio','studio')}/>
      {showFacets && <polygon points="106,32 182,6 160,14 118,42 106,42" fill={lead && lead.level==='balanced' && lead.which!=='studio' ? muted : p.org} opacity="0.45"/>}
      <polygon points="94,68 32,84 38,126 94,110" fill={desat('com','com')}/>
      {showFacets && <polygon points="94,68 32,84 52,96 94,84" fill="#0893a4" opacity="0.55"/>}
      <polygon points="106,68 168,84 162,126 106,110" fill={desat('net','net')}/>
      {showFacets && <polygon points="106,68 168,84 148,96 106,84" fill="#3dcfa3" opacity="0.55"/>}
      <polygon points="94,32 106,32 110,70 108,130 103,216 100,220 97,216 92,130 90,70" fill={p.body}/>
      {showFacets && <polygon points="98,34 102,34 104,80 101,210 100,220 99,210 96,80" fill={p.head} opacity="0.4"/>}
    </svg>
  );
}

// ──────────────────────────────────────────────
// Stacked lockup atom
// ──────────────────────────────────────────────
function Stacked({ markSize = 80, wmSize = 22, tagSize = 11, scheme = 'light', variant = 'sans', tagline = true, palette = TK, gap = 14, tilt = 18 }) {
  const wmStyle = { fontSize: `${wmSize}px`, lineHeight: 1 };
  const tagStyle = { fontSize: `${tagSize}px`, lineHeight: 1 };
  return (
    <div className={`lockup ${scheme} ${variant}`} style={{ gap: `${gap}px` }}>
      <div style={{ transform: `rotate(${tilt}deg)`, transformOrigin: 'center' }}>
        <Dragonfly size={markSize} inverse={scheme==='light'} palette={palette}/>
      </div>
      <div className="wm" style={wmStyle}>TEKROGEN</div>
      {tagline && (
        <div className="tagline" style={tagStyle}>Real solutions. Built, proven, ready to use.</div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// SECTION 01 · STACKED MASTER — production sizes
// ──────────────────────────────────────────────
function SectionMaster({ variant = 'sans' }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">01 · master</div>
          <h2>Stacked lockup at production sizes</h2>
        </div>
        <div className="right">tilt 18° · centered</div>
      </div>
      <p className="section-lead">
        The primary lockup. Mark above wordmark, centered, with optional tagline. Built for splash screens, social avatars, conference badges, member-email signatures, and the Ghost Pro publication logo slot. Stacked is the canonical orientation — horizontal lockups are derivatives.
      </p>

      <div className="grid row-2">
        <div className="board deep">
          <div className="board-head"><span className="board-tag">XL · splash · 220px mark</span><span className="board-tag">dark · with tagline</span></div>
          <div className="board-body" style={{ padding: '64px 20px' }}>
            <Stacked scheme="light" variant={variant} markSize={220} wmSize={40} tagSize={12} gap={24} tagline={true}/>
          </div>
        </div>
        <div className="board paper">
          <div className="board-head"><span className="board-tag">XL · splash · 220px mark</span><span className="board-tag">paper · with tagline</span></div>
          <div className="board-body" style={{ padding: '64px 20px' }}>
            <Stacked scheme="dark" variant={variant} markSize={220} wmSize={40} tagSize={12} gap={24} tagline={true}/>
          </div>
        </div>
      </div>

      <div className="grid row-3" style={{ marginTop: '20px' }}>
        <div className="board deep">
          <div className="board-head"><span className="board-tag">L · 128px</span><span className="board-tag">card / avatar</span></div>
          <div className="board-body"><Stacked scheme="light" variant={variant} markSize={128} wmSize={28} tagSize={10} gap={16} tagline={false}/></div>
        </div>
        <div className="board deep">
          <div className="board-head"><span className="board-tag">M · 80px</span><span className="board-tag">header / nav</span></div>
          <div className="board-body"><Stacked scheme="light" variant={variant} markSize={80} wmSize={20} tagSize={9} gap={12} tagline={false}/></div>
        </div>
        <div className="board deep">
          <div className="board-head"><span className="board-tag">S · 48px</span><span className="board-tag">compact</span></div>
          <div className="board-body"><Stacked scheme="light" variant={variant} markSize={48} wmSize={13} tagSize={8} gap={8} tagline={false}/></div>
        </div>
      </div>

      <h3 style={{ marginTop: 48, marginBottom: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tk-fg-3)', fontWeight: 500 }}>Favicon scale — Ghost Pro icon slot</h3>
      <div className="board deep" style={{ padding: '36px 20px' }}>
        <div className="size-row" style={{ justifyContent: 'center' }}>
          {[16, 24, 32, 48, 64, 128].map(s => (
            <div className="size-cell" key={s}>
              <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={s}/></div>
              <div className="label">{s}px</div>
            </div>
          ))}
        </div>
      </div>
      <div className="note">Minimum favicon size: 16px. At 16/24 the body simplifies into a single navy stroke — wing color hierarchy still reads (.com + .net dominate at small sizes).</div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SECTION 02 · CLEAR-SPACE & MIN-SIZE
// ──────────────────────────────────────────────
function SectionRules({ variant = 'sans' }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">02 · rules</div>
          <h2>Clear-space &amp; minimum size</h2>
        </div>
        <div className="right">x = mark cap-height</div>
      </div>
      <p className="section-lead">
        One rule for both axes: keep <strong style={{ color: 'var(--tk-fg-1)' }}>1× clear-space</strong> around the lockup, where <code style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--tk-accent)' }}>x</code> equals the wordmark cap-height. Don't crowd it. Don't place it on imagery without a flat backing.
      </p>

      <div className="grid row-2">
        <div className="board deep">
          <div className="board-head"><span className="board-tag">clear-space</span><span className="board-tag">1x on all sides</span></div>
          <div className="board-body" style={{ padding: '48px' }}>
            <div className="clearspace">
              <div className="cs-grid"></div>
              <div className="cs-bbox">
                <Stacked scheme="light" variant={variant} markSize={100} wmSize={24} tagSize={9} gap={14} tagline={false}/>
              </div>
              <div className="cs-callouts">
                <div className="cs-callout" style={{ top: 16, left: '50%', transform: 'translateX(-50%)' }}>↕ 1x</div>
                <div className="cs-callout" style={{ bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>↕ 1x</div>
                <div className="cs-callout" style={{ top: '50%', left: 16, transform: 'translateY(-50%)' }}>↔ 1x</div>
                <div className="cs-callout" style={{ top: '50%', right: 16, transform: 'translateY(-50%)' }}>↔ 1x</div>
              </div>
            </div>
          </div>
        </div>

        <div className="board deep">
          <div className="board-head"><span className="board-tag">minimum sizes</span><span className="board-tag">screen + print</span></div>
          <div className="board-body" style={{ flexDirection: 'column', gap: 28, padding: '36px 32px' }}>
            <dl className="spec" style={{ width: '100%' }}>
              <dt>Full lockup, screen</dt><dd>48px mark · 14px wordmark · tagline drops</dd>
              <dt>Full lockup, print</dt><dd>14mm mark height · 4pt wordmark · tagline drops below 18mm</dd>
              <dt>Icon only, screen</dt><dd>16px favicon · simplified body</dd>
              <dt>Icon only, print</dt><dd>8mm tall · use mono variant in single-ink</dd>
              <dt>Embroidery / etch</dt><dd>20mm minimum · mono only</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SECTION 03 · WORDMARK STUDY
// ──────────────────────────────────────────────
function SectionWordmark({ active = 'sans', onPick = () => {} }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">03 · dual wordmark system</div>
          <h2>Two committed wordmarks, one mark</h2>
        </div>
        <div className="right">A · public  ·  C · technical</div>
      </div>
      <p className="section-lead">
        Both A (sans) and C (mono) are <strong style={{ color: 'var(--tk-fg-1)' }}>committed</strong> as official wordmarks. They aren't alternates — they're a pair, each owning a context. Sans is the public face: marketing, member emails, conference badges, the homepage. Mono is the technical face: CLI splash, repo headers, API docs, anything where the dragonfly sits next to code. Same mark above both. The toggle at the top of this page previews either across the whole document.
      </p>

      <div className="grid row-2">
        {[
          { id: 'sans', title: 'A · Sans', role: 'public face', font: 'Poppins · uppercase · 700', stack: "'Poppins' → 'Manrope' → system-ui", uses: ['Marketing site', 'Member emails', 'Conference badges', 'Slide decks', 'Print collateral'], desc: 'Confident, modern, infrastructure-adjacent. The version most readers will see first — reads as a credible operating company.' },
          { id: 'mono', title: 'C · Mono', role: 'technical face', font: 'JetBrains Mono · lowercase · 500', stack: "'JetBrains Mono' → ui-monospace → Menlo", uses: ['CLI splash banner', 'Repo / GitHub headers', 'API documentation', 'Terminal-adjacent surfaces', 'Engineering blog'], desc: 'Reads as a working prompt. Honest about who builds the stack. Where the sans wordmark would feel out of place, this fits.' },
        ].map(o => (
          <div className="board deep" key={o.id} onClick={() => onPick(o.id)} style={{ cursor: 'pointer', outline: active === o.id ? '2px solid #1fd5da' : 'none', outlineOffset: -1, position: 'relative' }}>
            {active === o.id && <div style={{ position: 'absolute', top: 12, right: 12, background: '#1fd5da', color: '#0e1116', padding: '4px 10px', borderRadius: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', zIndex: 2 }}>✓ previewing</div>}
            <div className="board-head">
              <span className="board-tag">{o.title} — {o.role}</span>
              <span className="board-tag">{o.font}</span>
            </div>
            <div className="board-body" style={{ flexDirection: 'column', padding: '52px 20px 36px' }}>
              <Stacked scheme="light" variant={o.id} markSize={140} wmSize={30} tagSize={11} gap={20} tagline={true}/>
            </div>
            <div style={{ padding: '0 26px 26px', color: '#8a98a8', fontSize: 'var(--tk-fs-code)', lineHeight: 1.55 }}>
              <div style={{ marginBottom: 14 }}>{o.desc}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b7785', marginBottom: 6 }}>Font stack</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', color: '#cbd5e1', marginBottom: 18, letterSpacing: '0.02em' }}>{o.stack}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b7785', marginBottom: 8 }}>Used for</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {o.uses.map(u => (
                  <li key={u} style={{ paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 9, width: 6, height: 1, background: '#1fd5da' }}></span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, padding: '20px 24px', background: '#0a0d12', border: '1px solid #1f2731', borderRadius: 12 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1fd5da', marginBottom: 10 }}>Type stack · committed defaults</div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px 24px', fontSize: 'var(--tk-fs-code)', color: '#cbd5e1', lineHeight: 1.55 }}>
          <div style={{ color: '#8a98a8', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Sans</div>
          <div><strong style={{ color: '#fff' }}>Poppins</strong> (primary) → <strong style={{ color: '#fff' }}>Manrope</strong> (fallback, closest x-height + aperture match) → <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1fd5da' }}>system-ui</code> → <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1fd5da' }}>-apple-system</code> → sans-serif</div>
          <div style={{ color: '#8a98a8', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Mono</div>
          <div><strong style={{ color: '#fff' }}>JetBrains Mono</strong> (primary) → <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1fd5da' }}>ui-monospace</code> → <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1fd5da' }}>SFMono-Regular</code> → <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1fd5da' }}>Menlo</code> → monospace</div>
          <div style={{ color: '#8a98a8', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Hosting</div>
          <div>Regular (400) weights self-hosted from <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1fd5da' }}>/fonts/</code>. 500–800 served by Google Fonts as a progressive enhancement.</div>
        </div>
      </div>
      <div className="note">Use the picker at the top of the page to preview either treatment across every other section in this document. Both ship to production — the picker is just a visualization aid.</div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SECTION 04 · FOUR-DOMAIN SPLIT — 3 intensities × 4 domains
// ──────────────────────────────────────────────
function SectionDomainSplit({ variant = 'sans' }) {
  const domains = [
    { id: 'org',    color: TK.org,    name: '.org',    meaning: 'Research, academic groups, open work' },
    { id: 'studio', color: TK.studio, name: '.studio', meaning: 'Proof of concept and demos' },
    { id: 'com',    color: TK.com,    name: '.com',    meaning: 'Commercial product, paid offerings' },
    { id: 'net',    color: TK.net,    name: '.net',    meaning: 'Infrastructure, platform, developer tools' },
  ];
  const levels = ['subtle','balanced','bold'];
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">04 · domain split</div>
          <h2>One mark, four entities — three intensity levels</h2>
        </div>
        <div className="right">subtle · balanced · bold</div>
      </div>
      <p className="section-lead">
        Each entity gets its own face by leading with its wing color. <strong style={{ color: 'var(--tk-fg-1)' }}>Subtle</strong> keeps the full family colors; the entity's wing is the wordmark accent. <strong style={{ color: 'var(--tk-fg-1)' }}>Balanced</strong> desaturates the three non-lead wings so the lead reads as primary. <strong style={{ color: 'var(--tk-fg-1)' }}>Bold</strong> flattens the others to grey — strongest distinction, weakest family read.
      </p>

      <div className="domain-grid">
        <div className="hdr"></div>
        {levels.map(l => (
          <div className="hdr" key={l} style={{ textAlign: 'center' }}>{l}</div>
        ))}
        {domains.map(d => (
          <React.Fragment key={d.id}>
            <div className="row-label">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="dot" style={{ background: d.color }}></span>
                <span className="name">{d.name}</span>
              </div>
              <div className="meaning">{d.meaning}</div>
            </div>
            {levels.map(l => (
              <div className="cell" key={l}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ transform: 'rotate(18deg)' }}>
                    <Dragonfly size={70} lead={{ which: d.id, level: l }}/>
                  </div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'var(--tk-fs-code)', letterSpacing: '0.14em', color: '#e7ecf2', display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <span>TEKROGEN</span>
                    <span style={{ color: d.color, fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.04em', marginLeft: 4 }}>{d.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="note">Recommendation: ship <span style={{ color: 'var(--tk-fg-1)' }}>Balanced</span> as the default for entity-specific surfaces. It preserves the family read while letting each property feel distinct. Bold is for one-off contexts (a single entity's social avatar, a one-off swag run).</div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SECTION 05 · TUNED PALETTE
// ──────────────────────────────────────────────
function SectionPalette({ variant = 'sans' }) {
  const rows = [
    { role: 'Primary 900 / Body', token: 'body',   meaning: 'Spine, dark surfaces, primary text', screen: TK.body,   print: TK_PRINT.body },
    { role: 'Primary 500',         token: 'org',    meaning: 'Upper-left wing · .org · research',  screen: TK.org,    print: TK_PRINT.org },
    { role: 'Primary 300',         token: 'studio', meaning: 'Upper-right wing · .studio · learning', screen: TK.studio, print: TK_PRINT.studio },
    { role: 'Accent 500',          token: 'com',    meaning: 'Lower-left wing · .com · commercial', screen: TK.com,    print: TK_PRINT.com },
    { role: 'Mint',                token: 'net',    meaning: 'Lower-right wing · .net · platform',  screen: TK.net,    print: TK_PRINT.net },
  ];
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">05 · palette</div>
          <h2>Tuned for screen + print</h2>
        </div>
        <div className="right">family preserved · rebalanced</div>
      </div>
      <p className="section-lead">
        Same five hues you specified. Print column nudges saturation and lightness for CMYK-stable reproduction and small-scale legibility — <code style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--tk-accent)' }}>.com</code> drops a touch of cyan to survive coated stock, <code style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--tk-accent)' }}>.net</code> deepens slightly to read on white. Screen values are unchanged from your spec.
      </p>

      <table className="tokens">
        <thead>
          <tr><th style={{ width: '24%' }}>Role / token</th><th style={{ width: '34%' }}>Meaning</th><th>Screen</th><th>Print (tuned)</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.token}>
              <td>
                <span className="sw" style={{ background: r.screen }}></span>
                <span className="role">{r.role}</span>
              </td>
              <td className="meaning">{r.meaning}</td>
              <td><code>{r.screen.toUpperCase()}</code></td>
              <td><code>{r.print.toUpperCase()}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 40, marginBottom: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tk-fg-3)', fontWeight: 500 }}>Side-by-side: stock vs tuned, on white</h3>
      <div className="grid row-2">
        <div className="board paper">
          <div className="board-head"><span className="board-tag">stock screen values</span><span className="board-tag">on white</span></div>
          <div className="board-body" style={{ padding: '40px 20px' }}>
            <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={140} palette={TK} inverse={false}/></div>
          </div>
        </div>
        <div className="board paper">
          <div className="board-head"><span className="board-tag">tuned print values</span><span className="board-tag">on white</span></div>
          <div className="board-body" style={{ padding: '40px 20px' }}>
            <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={140} palette={TK_PRINT} inverse={false}/></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SECTION 06 · GHOST PRO APPLICATIONS
// ──────────────────────────────────────────────
function SectionGhost({ variant = 'sans' }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">06 · ghost pro</div>
          <h2>Where the lockup actually lives</h2>
        </div>
        <div className="right">publication · favicon · social</div>
      </div>
      <p className="section-lead">
        Ghost Pro takes three brand assets: <strong style={{ color: 'var(--tk-fg-1)' }}>Publication icon</strong> (square, dark background tolerant), <strong style={{ color: 'var(--tk-fg-1)' }}>Publication logo</strong> (header lockup, light + dark variants), and a <strong style={{ color: 'var(--tk-fg-1)' }}>default OG/Twitter card</strong> (1200×630, fallback when posts don't supply their own). Plus the favicon. Here's how each looks with the master lockup dropped in.
      </p>

      {/* Publication header — full-bleed */}
      <div className="ghost-publication">
        <div className="siteheader">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={44}/></div>
            <div style={{ fontFamily: 'Poppins, Manrope, sans-serif', fontWeight: 600, fontSize: 'var(--tk-fs-h3)', letterSpacing: '0.01em' }}>Tekrogen</div>
          </div>
          <nav>
            <span>Research</span><span>Field notes</span><span>Studio</span><span>About</span>
            <span style={{ background: '#1fd5da', color: '#0e1116', padding: '6px 14px', borderRadius: 6, fontSize: 'var(--tk-fs-meta)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Subscribe</span>
          </nav>
        </div>
        <div className="hero-meta">
          <span className="pill">Field note · 04</span>
          <span>May 2026</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
        <div className="hero-title">Four wings, one pursuit: how one mark carries .org, .studio, .com, and .net.</div>
        <div className="hero-dek">Field notes on running a four-entity practice from a single mark — we build it, prove it, and publish what we learned, same pursuit across all four wings.</div>
      </div>

      <div className="grid ghost-grid" style={{ marginTop: 20 }}>
        {/* Browser tab + favicon */}
        <div className="browser">
          <div className="chrome">
            <div className="dots"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>
            <div className="tab">
              <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={14}/></div>
              <span>Tekrogen — Field notes</span>
            </div>
            <div className="urlbar">tekrogen.org/notes</div>
          </div>
          <div className="body-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={36}/></div>
              <div style={{ fontFamily: 'Poppins, Manrope, sans-serif', fontWeight: 600, fontSize: 'var(--tk-fs-h3)', color: '#1f2731' }}>Tekrogen</div>
            </div>
            <div style={{ fontFamily: 'Poppins, Manrope, sans-serif', fontSize: 'var(--tk-fs-h2)', fontWeight: 700, letterSpacing: '-0.015em', color: '#1f2731', lineHeight: 1.2, marginBottom: 6 }}>Four wings, one pursuit.</div>
            <div style={{ color: '#6b7280', fontSize: 'var(--tk-fs-body-sm)', lineHeight: 1.55, fontFamily: 'Poppins, Manrope, sans-serif', fontStyle: 'italic', fontWeight: 400 }}>Field notes on running a four-entity practice from a single mark — same pursuit across all four wings.</div>
          </div>
        </div>

        {/* OG social card */}
        <div className="social-card">
          <div className="top">
            <div style={{ transform: 'rotate(18deg)' }}><Dragonfly size={42}/></div>
            <div>
              <div style={{ fontFamily: 'Poppins, Manrope, sans-serif', fontWeight: 600, fontSize: 'var(--tk-fs-h3)' }}>Tekrogen</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.16em', color: '#8a98a8', textTransform: 'uppercase' }}>Field notes</div>
            </div>
          </div>
          <div className="bot">
            <div>
              <div className="title">Real solutions. Built, proven, ready to use.</div>
              <div className="url" style={{ marginTop: 14 }}>tekrogen.org</div>
            </div>
          </div>
        </div>
      </div>
      <div className="note">Ghost asks for <span style={{ color: 'var(--tk-fg-1)' }}>logo</span> (used in header, transparent PNG), <span style={{ color: 'var(--tk-fg-1)' }}>icon</span> (square, used on member emails + favicon fallback), <span style={{ color: 'var(--tk-fg-1)' }}>cover image</span> (homepage hero), and <span style={{ color: 'var(--tk-fg-1)' }}>OG/Twitter</span> default. The master lockup feeds the first three; the OG card uses the tagline.</div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Page assembly
// ──────────────────────────────────────────────
function ThemeToggle() {
  const read = () => (window.TkTheme && window.TkTheme.get ? window.TkTheme.get() : 'ink');
  const [theme, setTheme] = React.useState(read);
  React.useEffect(() => {
    const el = document.documentElement;
    const onChange = () => setTheme(read());
    el.addEventListener('tk-theme-change', onChange);
    setTheme(read());
    return () => el.removeEventListener('tk-theme-change', onChange);
  }, []);
  return (
    <div className="tk-theme-toggle" role="group" aria-label="Theme">
      <button type="button" data-tk-theme-set="ink" aria-pressed={theme === 'ink'}>Ink</button>
      <button type="button" data-tk-theme-set="paper" aria-pressed={theme === 'paper'}>Paper</button>
    </div>
  );
}

function Page() {
  const [variant, setVariant] = React.useState('sans');
  return (
    <React.Fragment>
      {/* Sticky wordmark picker */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, marginLeft: -56, marginRight: -56, marginTop: -80, marginBottom: 24, background: 'color-mix(in srgb, var(--tk-bg-1) 92%, transparent)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--tk-border)' }}>
        <div style={{ maxWidth: 'var(--tk-shell-max)', margin: '0 auto', padding: '14px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--tk-fs-meta)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tk-fg-3)' }}>
            Dual wordmark system — preview either treatment across the doc
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <ThemeToggle/>
            <div className="tk-seg tk-seg--compact" role="group" aria-label="Wordmark variant">
            {[
              { id: 'sans', label: 'Sans', sub: 'public' },
              { id: 'mono', label: 'Mono', sub: 'technical' },
            ].map(o => (
              <button key={o.id} type="button" onClick={() => setVariant(o.id)} aria-pressed={variant === o.id}>
                <span>{o.label}</span>
                <span className="tk-seg__sub">{o.sub}</span>
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hgroup">
        <span className="eyebrow">tekrogen · brand foundations</span>
      </div>
      <h1>Master Lockup Sheet</h1>
      <p className="lead">v2 Baseline, developed. <strong style={{ color: 'var(--tk-fg-1)' }}>Both A (Sans) and C (Mono) are committed wordmarks</strong> — a dual system, each owning a context. Use the toggle above to preview either treatment across the document; section 03 explains the role assignment.</p>

      <SectionMaster variant={variant}/>
      <SectionRules variant={variant}/>
      <SectionWordmark active={variant} onPick={setVariant}/>
      <SectionDomainSplit variant={variant}/>
      <SectionPalette variant={variant}/>
      <SectionGhost variant={variant}/>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page/>);
