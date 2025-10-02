import { useEffect, useState } from "react";
import { initTheme, setTheme, getInitialTheme, type Theme } from "../../lib/theme";

export function ThemeToggle() {
  const [theme, setLocalTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    initTheme();
  }, []);

  const handleChange = (t: Theme) => {
    setTheme(t);
    setLocalTheme(t);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => handleChange(e.target.value as Theme)}
        className="px-2 py-1 rounded-md bg-white dark:bg-gray-800 border"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
