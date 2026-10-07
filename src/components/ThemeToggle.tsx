import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEME_KEY = "spc.theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const nextDark = saved ? saved === "dark" : true;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  const toggle = () => {
    const nextDark = !dark;
    setDark(nextDark);
    localStorage.setItem(THEME_KEY, nextDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextDark);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Activer le thème clair" : "Activer le thème sombre"}
      title={dark ? "Thème clair" : "Thème sombre"}
      className="shrink-0"
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}