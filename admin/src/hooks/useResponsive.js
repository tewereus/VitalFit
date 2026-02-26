import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design utilities
 * @returns {Object} Object containing responsive state and utilities
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isLargeDesktop, setIsLargeDesktop] = useState(
    window.innerWidth >= 1280
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
      setIsLargeDesktop(width >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Utility functions
    isSmallScreen: isMobile || isTablet,
    isLargeScreen: isDesktop || isLargeDesktop,
  };
};

/**
 * Breakpoint constants
 */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1536,
};

/**
 * Check if current screen size matches a breakpoint
 * @param {string} breakpoint - The breakpoint to check ('mobile', 'tablet', 'desktop', 'largeDesktop')
 * @returns {boolean}
 */
export const isBreakpoint = (breakpoint) => {
  const width = window.innerWidth;

  switch (breakpoint) {
    case "mobile":
      return width < BREAKPOINTS.mobile;
    case "tablet":
      return width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
    case "desktop":
      return width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
    case "largeDesktop":
      return width >= BREAKPOINTS.desktop;
    default:
      return false;
  }
};
