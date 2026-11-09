// Runs in <head> before first paint to apply the saved/system light-dark theme
// (no flash of the wrong theme). Kept here so astro.config.mjs can hash the exact
// same text for the Content-Security-Policy.
export const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch {}
})();`;
