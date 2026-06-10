/* global React, SiteHeader, Hero, FieldNoteCard, SectionHead, Article, SubscribeBlock, Footer */

const NOTES = [
  {
    id: 4,
    kicker: 'Field note',
    date: 'May 2026',
    read: 8,
    pillar: 'studio',
    title: 'Four wings, one pursuit: how one mark carries .org, .studio, .com, and .net.',
    dek: 'Field notes on running a four-entity practice from a single mark — we build it, prove it, and publish what we learned, same pursuit across all four wings.',
    body: [
      'Five years in, the studio and the platform team share a Tuesday standup. The studio takes notes; the platform team writes them. On Thursdays the same engineers grade dissertations. None of this was planned — it accreted, one shared lunch at a time.',
      'The design system you are reading was built to compound this. One mark, four wings, four entities. The work travels across all of them without the brand having to apologize for it.',
      'What we did not anticipate was how much the type system would absorb. Poppins for the public face, JetBrains Mono for the working surfaces — both of them committed, neither of them the alternate. The handoff between the two is the system.',
      'Below: the rules, the lockup sheet, and a working asset pack you can deploy on Ghost Pro this afternoon.',
    ],
  },
  {
    id: 3,
    kicker: 'Field note',
    date: 'April 2026',
    read: 6,
    pillar: 'net',
    title: 'PostgreSQL migrations as a teaching artifact.',
    dek: 'A working migration is also a working lecture. What changes when you grade the diff as carefully as you grade the prose.',
    body: ['Lecture mode is the failure mode of most backend writing. Migrations resist it — they have to run.'],
  },
  {
    id: 2,
    kicker: 'Field note',
    date: 'March 2026',
    read: 4,
    pillar: 'org',
    title: 'Why the dragonfly tilts 18 degrees.',
    dek: 'A pinned specimen is dead. A flying specimen is research. The angle is the difference.',
    body: ['The mark rotates 18° clockwise so it reads as a flier in motion, not a pinned specimen on a card.'],
  },
  {
    id: 1,
    kicker: 'Field note',
    date: 'February 2026',
    read: 5,
    pillar: 'com',
    title: 'Hybrid plan: one mark, four publications, no agencies.',
    dek: 'How we are rolling out .studio / .com / .net as sub-publications without forking the brand. A working spec.',
    body: ['One mark, four wings. The OG cards re-render with the appropriate wing-color lead per publication.'],
  },
];

function App() {
  const [view, setView] = React.useState({ path: 'home' });

  const open = (note) => setView({ path: 'note', note });
  const onNav = (id) => {
    if (id === 'home')   setView({ path: 'home' });
    else if (id === 'notes') setView({ path: 'notes' });
    else if (id === 'subscribe') {
      setView({ path: 'home' });
      setTimeout(() => document.getElementById('subscribe-anchor')?.scrollTo?.({ behavior: 'smooth' }), 50);
    } else setView({ path: id });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SiteHeader path={view.path === 'note' ? 'notes' : view.path} onNav={onNav}/>

      {view.path === 'home' && (
        <main style={{ flex: 1 }}>
          <Hero
            eyebrow="Field notes · 04 · just published"
            title="Four wings, one pursuit: how one mark carries .org, .studio, .com, and .net."
            dek="Real solutions. Built, proven, ready to use. Four wings, one pursuit — across .org, .studio, .com, .net we build it, prove it, and publish what we learned."
            meta={['May 2026', '8 min read', 'tekrogen.org']}
          />

          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 32px 0' }}>
            <SectionHead
              eyebrow="01 · recent"
              title="Recent field notes"
              meta="4 of 12 · /notes/"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {NOTES.slice(0, 4).map(n => <FieldNoteCard key={n.id} note={n} onOpen={open}/>) }
            </div>
          </section>

          <div id="subscribe-anchor">
            <SubscribeBlock/>
          </div>
        </main>
      )}

      {view.path === 'notes' && (
        <main style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 32px 0', flex: 1 }}>
          <SectionHead
            eyebrow="all · /notes/"
            title="Field notes"
            meta={`${NOTES.length} notes · oldest below`}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
            {NOTES.map(n => <FieldNoteCard key={n.id} note={n} onOpen={open}/>) }
          </div>
          <SubscribeBlock/>
        </main>
      )}

      {view.path === 'note' && (
        <main style={{ flex: 1 }}>
          <Article note={view.note} onBack={() => setView({ path: 'notes' })}/>
        </main>
      )}

      {(view.path === 'studio' || view.path === 'about') && (
        <main style={{ maxWidth: 600, margin: '0 auto', padding: '96px 32px', flex: 1 }}>
          <div style={{
            fontFamily: 'var(--tk-font-mono)', fontSize: 'var(--tk-fs-eyebrow)',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--tk-accent)', marginBottom: 14,
          }}>{view.path === 'studio' ? 'tekrogen.studio' : 'about'}</div>
          <h1 style={{
            fontFamily: 'var(--tk-font-sans)', fontWeight: 600,
            fontSize: 'var(--tk-fs-h1)', letterSpacing: '-0.01em', lineHeight: 1.12,
            color: 'var(--tk-fg-1)', margin: '0 0 20px',
          }}>{view.path === 'studio'
            ? 'Studio — proof of concept and demos.'
            : 'A small practice that ships across four entities.'
          }</h1>
          <p style={{
            fontFamily: 'var(--tk-font-sans)', fontStyle: 'italic',
            fontSize: 'var(--tk-fs-h3)', lineHeight: 1.6, color: 'var(--tk-fg-3)',
          }}>This page is intentionally short. Tekrogen sub-publications spin up here when their content is ready — they share the mark and the type system but each leads with its own wing color.</p>
        </main>
      )}

      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
