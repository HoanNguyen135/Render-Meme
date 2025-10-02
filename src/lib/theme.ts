export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const setDark = (isDark: boolean) => {
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  };

  if (theme === "system") {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  } else {
    setDark(theme === "dark");
  }
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    // ignore storage errors
  }
  applyTheme(theme);
}

export function getStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t) return null;
    if (t === "light" || t === "dark" || t === "system") return t as Theme;
  } catch (e) {
    // ignore
  }
  return null;
}

let mediaListener: ((e: MediaQueryListEvent) => void) | null = null;

export function initTheme() {
  const stored = getStoredTheme() ?? "system";
  applyTheme(stored);

  // If system preference is selected, listen for changes and update.
  const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (mql) {
    // remove previous listener if present
    if (mediaListener) mql.removeEventListener("change", mediaListener);
    mediaListener = () => {
      const cur = getStoredTheme() ?? "system";
      if (cur === "system") applyTheme("system");
    };
    try {
      mql.addEventListener("change", mediaListener);
    } catch (e) {
      // fallback for older browsers
      try {
        // @ts-ignore
        mql.addListener(mediaListener);
      } catch {}
    }
  }
}

export function getInitialTheme(): Theme {
  return getStoredTheme() ?? "system";
}
