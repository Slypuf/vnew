import React, { useState, useRef, useEffect, useCallback } from 'react';
import Contract from './Contract';

// Section IDs that match the actual DOM structure
type SectionId = 'hero' | 'about' | 'sauce' | 'extras';

const LINKS: { id: SectionId; label: string }[] = [
  { id: 'hero',  label: 'Home' },
  { id: 'about', label: 'LilV' },
  { id: 'sauce', label: 'The Sauce' },
  { id: 'extras', label: 'Extras' },
];

interface NavigationProps {
  onNavigate?: (sectionId: SectionId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<SectionId>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force close menu function
  const forceCloseMenu = useCallback(() => {
    console.log('🔒 Force closing mobile menu');
    setIsMenuOpen(false);
  }, []);

  // Toggle menu function with debugging
  const toggleMenu = useCallback(() => {
    const newState = !isMenuOpen;
    console.log(`🔄 Toggling menu: ${isMenuOpen} -> ${newState}`);
    setIsMenuOpen(newState);
  }, [isMenuOpen]);

  // Professional navigation function - simple and reliable
  const navigateToSection = useCallback((id: SectionId) => {
    console.log(`🔍 Attempting to navigate to section: ${id}`);
    
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`❌ Section "${id}" not found in DOM`);
      // Try to log what sections do exist
      const existingSections = ['hero', 'about', 'sauce', 'extras']
        .map(sectionId => ({ id: sectionId, exists: !!document.getElementById(sectionId) }));
      console.log('Available sections:', existingSections);
      return;
    }

    console.log(`✅ Section "${id}" found, scrolling...`);

    // Close mobile menu
    forceCloseMenu();
    
    // Update active state immediately
    setActive(id);
    
    // Use scrollIntoView for reliable positioning that respects scroll-padding-top
    console.log(`🎯 Using scrollIntoView for section: ${id}`);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Call parent navigation handler if provided
    if (onNavigate) {
      onNavigate(id);
    }
  }, [onNavigate, forceCloseMenu]);

  // Close menu when clicking outside - improved with hamburger/X button exception
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the hamburger/X button itself
      const menuButton = document.querySelector('[aria-label="Close menu"], [aria-label="Open menu"]');
      if (menuButton && menuButton.contains(target)) {
        return;
      }
      
      // Don't close if clicking inside the menu
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      
      // Close menu if clicking outside
      if (menuRef.current && !menuRef.current.contains(target)) {
        forceCloseMenu();
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, forceCloseMenu]);

  // Close menu on Escape and add debug shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        forceCloseMenu();
      }
      
      // Debug shortcuts (Ctrl+Alt+1,2,3,4 for quick testing)
      if (event.ctrlKey && event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            navigateToSection('hero');
            break;
          case '2':
            event.preventDefault();
            navigateToSection('about');
            break;
          case '3':
            event.preventDefault();
            navigateToSection('sauce');
            break;
          case '4':
            event.preventDefault();
            navigateToSection('extras');
            break;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigateToSection, forceCloseMenu]);

  // Intersection Observer for active section detection
  useEffect(() => {
    const setupObserver = () => {
      const sections = LINKS
        .map((l) => document.getElementById(l.id))
        .filter(Boolean) as HTMLElement[];
      
      if (sections.length === 0) {
        setTimeout(setupObserver, 100);
        return;
      }
      
      const navHeight = navRef.current?.getBoundingClientRect().height || 64;
      
      const observer = new IntersectionObserver(
        (entries) => {
          let bestSection: SectionId | null = null;
          let bestScore = 0;
          
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const rect = entry.boundingClientRect;
              const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
              const score = visibleHeight / rect.height;
              
              if (score > bestScore) {
                bestScore = score;
                bestSection = entry.target.id as SectionId;
              }
            }
          });
          
          if (bestSection && bestSection !== active) {
            setActive(bestSection);
          }
        },
        {
          root: null,
          rootMargin: `-${navHeight + 16}px 0px -20% 0px`,
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        }
      );

      sections.forEach((s) => observer.observe(s));
      
      return () => observer.disconnect();
    };
    
    const timer = setTimeout(setupObserver, 300);
    return () => clearTimeout(timer);
  }, [active]);

  // CSS classes
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67E8F9]/50 focus:ring-offset-[#0B1020]';
  
  const linkClass = (id: SectionId) =>
    `${linkBase} ${
      active === id
        ? 'text-white ring-2 ring-[#67E8F9]/50 animate-pulse'
        : 'text-[#67E8F9] hover:text-white'
    }`;

  // Dynamic navbar classes based on scroll state
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'backdrop-blur-xl border-b-2 border-[#67E8F9]/30 shadow-2xl shadow-[#67E8F9]/20 bg-[#0B1020]/90' 
      : 'backdrop-blur-lg border-b border-[#0D213F]/50 shadow-lg bg-[#0B1020]/70'
  }`;

  return (
    <nav
      ref={navRef}
      className={navbarClasses}
      aria-label="Primary Navigation"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 9999,
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'backdrop-filter, background-color, border-color, box-shadow' // Optimize transitions
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logos + Contract */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/dexs.png"
              alt="Dexscreener"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => window.open('https://dexscreener.com', '_blank')}
            />
            <img
              src="/x.png"
              alt="X"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => window.open('https://x.com', '_blank')}
            />
            <div className="block">
              <Contract />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => navigateToSection(id)}
                className={linkClass(id)}
                aria-current={active === id ? 'page' : undefined}
                aria-label={`Navigate to ${label} section`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🔘 Mobile menu button clicked. Current state: ${isMenuOpen}`);
                toggleMenu();
              }}
              className="text-[#67E8F9] hover:text-white p-2 rounded-md transition-colors duration-200 relative z-50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden backdrop-blur-xl border-t border-[#67E8F9]/30 shadow-xl bg-[#0B1020]/95 animate-slide-down"
        >
          <div className="px-4 py-3 space-y-2">
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log(`📱 Mobile menu item clicked: ${label} (${id})`);
                  navigateToSection(id);
                }}
                className={`block w-full text-left ${linkClass(id)} text-base touch-manipulation`}
                aria-label={`Navigate to ${label} section`}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom border accent with scroll effect */}
      <div className={`w-full h-px transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-transparent via-[#67E8F9]/50 to-transparent' 
          : 'bg-[#0D213F]/50'
      }`} />
    </nav>
  );
};

export default Navigation;
