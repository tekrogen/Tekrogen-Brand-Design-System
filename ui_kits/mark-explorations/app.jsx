/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakSelect, TweakSlider,
   ConceptCard, TK_CONCEPTS, TK_CARD_W, TK_CARD_H, TK_THEMES */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "landing-dark",
  "heroVariant": "dark",
  "wordmarkStyle": "poppins",
  "showLockups": true,
  "showFavicon": true,
  "tiltOffset": 0
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync canvas page background to the chosen theme so the artboards float on
  // a surface that matches their card chrome.
  React.useEffect(() => {
    const t = TK_THEMES[tweaks.theme] || TK_THEMES['paper'];
    const surface = tweaks.theme === 'landing-dark' ? '#06090d'
                  : tweaks.theme === 'landing-light' ? '#eef2f5'
                  : '#efe9dd';
    document.body.style.background = surface;
  }, [tweaks.theme]);

  return (
    <React.Fragment>
      <DesignCanvas title="Tekrogen — Mark Explorations" subtitle="7 concept directions · v2 baseline + 6 alternatives">
        <DCSection id="concepts" title="Concepts">
          {TK_CONCEPTS.map(c => (
            <DCArtboard
              key={c.id}
              id={c.id}
              label={c.name}
              width={TK_CARD_W}
              height={TK_CARD_H}
            >
              <ConceptCard
                concept={c}
                theme={tweaks.theme}
                heroVariant={tweaks.heroVariant}
                wordmarkStyle={tweaks.wordmarkStyle}
                showLockups={tweaks.showLockups}
                showFavicon={tweaks.showFavicon}
                tiltOffset={tweaks.tiltOffset}
              />
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Palette"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[
              { value: 'paper',         label: 'Paper' },
              { value: 'landing-light', label: 'Light' },
              { value: 'landing-dark',  label: 'Dark' },
            ]}
          />
          <TweakRadio
            label="Hero"
            value={tweaks.heroVariant}
            onChange={v => setTweak('heroVariant', v)}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark',  label: 'Dark' },
              { value: 'mono',  label: 'Mono' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Form">
          <TweakSlider
            label="Tilt offset"
            value={tweaks.tiltOffset}
            min={-30} max={30} step={1}
            onChange={v => setTweak('tiltOffset', v)}
            suffix="°"
          />
          <TweakSelect
            label="Wordmark"
            value={tweaks.wordmarkStyle}
            onChange={v => setTweak('wordmarkStyle', v)}
            options={[
              { value: 'poppins',   label: 'TEKROGEN · Poppins (uppercase)' },
              { value: 'lowercase', label: 'tekrogen · Poppins (lowercase)' },
              { value: 'mono',      label: 'tekrogen · Monospace (code)' },
            ]}
          />
          <TweakToggle
            label="Show lockups"
            value={tweaks.showLockups}
            onChange={v => setTweak('showLockups', v)}
          />
          <TweakToggle
            label="Show favicon row"
            value={tweaks.showFavicon}
            onChange={v => setTweak('showFavicon', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
