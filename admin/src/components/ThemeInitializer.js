import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Component to initialize theme based on user preferences in Redux state
 * This replaces the previous localStorage-based approach
 */
const ThemeInitializer = () => {
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // Set dark mode based on user preference in Redux state
    if (user?.preference?.mode === 'dark') {
      document.body.classList.add('dark');
    } else if (user?.preference?.mode === 'light') {
      document.body.classList.remove('dark');
    } else {
      // If no preference is set, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('dark', prefersDark);
    }
  }, [user?.preference?.mode]);
  
  return null; // This component doesn't render anything
};

export default ThemeInitializer;
