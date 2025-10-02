import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
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

  const buttonBase = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all focus:outline-none";

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleChange("system")}
        aria-pressed={theme === "system"}
        title="Use system theme"
        className={
          buttonBase +
          (theme === "system"
            ? " bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
            : " bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border")
        }
      >
        <Monitor className="h-4 w-4" />
        <span className="hidden sm:inline">System</span>
      </button>

      <button
        onClick={() => handleChange("light")}
        aria-pressed={theme === "light"}
        title="Use light theme"
        className={
          buttonBase +
          (theme === "light"
            ? " bg-yellow-400 text-white shadow-md"
            : " bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border")
        }
      >
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        onClick={() => handleChange("dark")}
        aria-pressed={theme === "dark"}
        title="Use dark theme"
        className={
          buttonBase +
          (theme === "dark"
            ? " bg-gray-800 text-white shadow-md"
            : " bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border")
        }
      >
        <Moon className="h-4 w-4" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
