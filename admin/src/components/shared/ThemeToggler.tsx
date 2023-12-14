import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="cursor-pointer">
      {theme === "dark" ? (
        <Moon onClick={toggleTheme} />
      ) : (
        <Sun onClick={toggleTheme} />
      )}
    </div>
  );
};

export default ThemeToggler;
