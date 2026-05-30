// tweaks-app.jsx — Tweaks for the Tekrogen UI Kit Dashboard.
// Focus: raise legibility of the muted-label token (--tk-fg-4 = #6b7785 on Ink /
// #8a96a1 on Paper) that the user flagged as hard to read. Overrides are written
// per-theme so they're correct whether the dashboard is in Ink or Paper mode.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mutedLabels": "clearer",
  "captions": "default"
}/*EDITMODE-END*/;

// Per-theme color ramps. Each level keeps the cool-grey hue of the original
// token but lifts contrast against the surface.
const MUTED = {
  ink:   { default: "#6b7785", clearer: "#94a1b1", high: "#b4c0cd" },
  paper: { default: "#8a96a1", clearer: "#646f7a", high: "#46505a" },
};
const CAPTIONS = {
  ink:   { default: "#8a98a8", clearer: "#a7b3c1" },
  paper: { default: "#6b7280", clearer: "#4d545e" },
};

function buildCSS(t) {
  const m = MUTED, c = CAPTIONS;
  return [
    `[data-tk-theme="ink"]{--tk-fg-4:${m.ink[t.mutedLabels]};--tk-fg-3:${c.ink[t.captions]};}`,
    `[data-tk-theme="paper"]{--tk-fg-4:${m.paper[t.mutedLabels]};--tk-fg-3:${c.paper[t.captions]};}`,
  ].join("\n");
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    let el = document.getElementById("tweak-overrides");
    if (!el) {
      el = document.createElement("style");
      el.id = "tweak-overrides";
      document.head.appendChild(el);
    }
    el.textContent = buildCSS(t);
  }, [t.mutedLabels, t.captions]);

  return (
    <TweaksPanel>
      <TweakSection label="Legibility" />
      <TweakRadio
        label="Muted labels"
        value={t.mutedLabels}
        options={["default", "clearer", "high"]}
        onChange={(v) => setTweak("mutedLabels", v)}
      />
      <TweakRadio
        label="Captions"
        value={t.captions}
        options={["default", "clearer"]}
        onChange={(v) => setTweak("captions", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
