/* ============================================================================
 * tk-theme.js — Tekrogen shared Ink/Paper theme toggle
 * ----------------------------------------------------------------------------
 * Framework-agnostic, no-build. Drop into any page that loads colors_and_type.css.
 *
 * USAGE
 *   <link rel="stylesheet" href="…/_shared/tk-theme.css">
 *   <div class="tk-theme-toggle" role="group" aria-label="Theme">
 *     <button type="button" data-tk-theme-set="ink"   aria-pressed="true">Ink</button>
 *     <button type="button" data-tk-theme-set="paper" aria-pressed="false">Paper</button>
 *   </div>
 *   <script src="…/_shared/tk-theme.js" defer></script>
 *
 * Applies the theme to <html data-tk-theme="…">, which drives the
 * colors_and_type.css :root (ink) / .tk-paper (paper) bindings. The choice
 * persists in localStorage('tk-theme'). Default is Ink (brand-primary);
 * prefers-color-scheme is intentionally NOT auto-followed.
 *
 * API:   window.TkTheme = { get(), set('ink'|'paper'), toggle() }
 * Event: <html> dispatches 'tk-theme-change' with { detail: { theme } }.
 * A11y:  container role="group"; buttons carry aria-pressed (NOT a tablist).
 * ==========================================================================*/
(function () {
  'use strict';

  var STORAGE_KEY = 'tk-theme';
  var THEMES = ['ink', 'paper'];
  var root = document.documentElement;

  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeStored(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode: no-op */ }
  }
  function currentTheme() {
    return root.getAttribute('data-tk-theme') || 'ink';
  }
  function syncButtons(theme) {
    var btns = document.querySelectorAll('.tk-theme-toggle [data-tk-theme-set]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute(
        'aria-pressed',
        btns[i].getAttribute('data-tk-theme-set') === theme ? 'true' : 'false'
      );
    }
  }
  function applyTheme(theme) {
    if (THEMES.indexOf(theme) === -1) { theme = 'ink'; }
    root.setAttribute('data-tk-theme', theme);
    syncButtons(theme);
    try {
      root.dispatchEvent(new CustomEvent('tk-theme-change', { detail: { theme: theme } }));
    } catch (e) { /* legacy browsers without CustomEvent ctor */ }
    return theme;
  }

  function setTheme(theme) {
    var applied = applyTheme(theme);
    writeStored(applied);
    return applied;
  }
  function toggleTheme() {
    return setTheme(currentTheme() === 'ink' ? 'paper' : 'ink');
  }

  // Public API ---------------------------------------------------------------
  window.TkTheme = { get: currentTheme, set: setTheme, toggle: toggleTheme };

  function init() {
    // Initial theme: a stored choice wins; otherwise honor whatever the page's
    // <html data-tk-theme> already declares; otherwise Ink. (No write on load.)
    var stored = readStored();
    applyTheme(stored && THEMES.indexOf(stored) !== -1 ? stored : currentTheme());

    // Delegated clicks — supports any number of toggles, present now or injected later.
    document.addEventListener('click', function (ev) {
      var btn = ev.target && ev.target.closest
        ? ev.target.closest('.tk-theme-toggle [data-tk-theme-set]')
        : null;
      if (!btn) { return; }
      ev.preventDefault();
      setTheme(btn.getAttribute('data-tk-theme-set'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
