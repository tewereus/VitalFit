import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Component to initialize theme based on user preferences in Redux state
 * This replaces the previous localStorage-based approach
 */
const ThemeInitializer = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const root = document.documentElement;
    if (user?.preference?.mode === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else if (user?.preference?.mode === "light") {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.toggle("dark", prefersDark);
      document.body.classList.toggle("dark", prefersDark);
    }
  }, [user?.preference?.mode]);

  return null; // This component doesn't render anything
};

export default ThemeInitializer;
