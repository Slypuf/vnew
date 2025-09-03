import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Info from './components/Info';
import About from './components/About';
import TheSauce, { TheSauceRef } from './components/TheSauce';
import SectionDivider from './components/SectionDivider';
import Footer from './components/Footer';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  
  // State for managing collapsible sections
  const [openSauceSection, setOpenSauceSection] = useState<string | null>(null);
  const sauceRef = useRef<TheSauceRef>(null);

  // Clean, professional navigation handler
  const handleNavigation = (sectionId: string) => {
    // Reset any open sauce section when navigating to other sections
    if (sectionId !== 'sauce') {
      setOpenSauceSection(null);
    }
    
    // Handle nested sections within TheSauce component
    if (['ai-trading-edge', 'ecosystem', 'tokenomics', 'manifesto'].includes(sectionId)) {
      // First scroll to the sauce section
      const sauceSection = document.getElementById('sauce');
      if (sauceSection) {
        // Then open the specific subsection after scrolling
        setTimeout(() => {
          setOpenSauceSection(sectionId);
        }, 200);
      }
      return;
    }
    
    // For regular sections, the Navigation component handles the scrolling
    // We just need to handle sauce-specific logic here
  };

  // Function to handle sauce section changes
  const handleSauceSectionChange = (sectionId: string | null) => {
    setOpenSauceSection(sectionId);
  };

  useEffect(() => {
    const criticalImages = [
      '/bg.gif',
      '/TITLE-VITALIK.png',
      '/wave.gif',
      '/MOONIT.gif',
      '/ewverest.gif',
      '/jump.gif',
      '/tsu.gif',
      '/whale.gif',
      '/lamb.gif',
      '/token.gif',
      '/mony.gif',
      '/busy.gif',
      '/funny.gif',
      '/hi.gif',
      '/trump.gif',
      '/throne.gif',
      '/ai.gif',
      '/bank.gif',
      '/eco.gif',
      '/dex.png',
      '/dexs.png',
      '/x.png',
      '/fall.png',
      '/1200.png',
      '/lilvitalik-ok.png',
      '/MOONLAND.png'
    ];

    setTotalImages(criticalImages.length);
    let loadedCount = 0;

    const preloadImage = (src: string): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          setLoadedImages(loadedCount);
          resolve();
        };
        img.src = src;
      });

    Promise.all(criticalImages.map(preloadImage)).finally(() => {
      setTimeout(() => {
        setShowLoader(false);
        window.dispatchEvent(new Event('app-loaded'));
      }, 400);
    });
  }, []);

  // DEBUG: Check sections when loader finishes
  useEffect(() => {
    if (!showLoader) {
      const timer = setTimeout(() => {
        // Sections are now loaded
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  // DEBUG: Check if sections are rendered after component mounts
  useEffect(() => {
    const checkSections = () => {
      // Sections are now rendered
    };
    
    // Check immediately and after a delay
    checkSections();
    const timer = setTimeout(checkSections, 1000);
    return () => clearTimeout(timer);
  }, []);

  // GLOBAL NAVIGATION FUNCTION: Make navigation available globally as fallback
  useEffect(() => {
    // @ts-ignore - Adding to window for global access
    window.lilvNavigate = (sectionId: string) => {
      console.log(`🌐 Global navigation called for: ${sectionId}`);
      handleNavigation(sectionId);
    };
    
    // @ts-ignore - Adding debug function
    window.lilvDebugSections = () => {
      console.log('🔍 Global section check...');
      const sections = ['hero', 'about', 'sauce', 'extras'];
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          console.log(`✅ Section ${id} found at:`, element.getBoundingClientRect());
        } else {
          console.log(`❌ Section ${id} NOT found`);
        }
      });
    };
    
    // @ts-ignore - Adding manual scroll function
    window.lilvScrollTo = (sectionId: string) => {
      console.log(`🎯 Manual scroll to: ${sectionId}`);
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 64;
        const rect = element.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - navHeight - 16;
        console.log(`Scrolling to position: ${targetTop}`);
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      } else {
        console.log(`Section ${sectionId} not found`);
      }
    };
    
    return () => {
      // @ts-ignore
      delete window.lilvNavigate;
      // @ts-ignore
      delete window.lilvDebugSections;
      // @ts-ignore
      delete window.lilvScrollTo;
    };
  }, []);

  return (
    <div className="text-white relative overflow-x-hidden max-w-full min-h-screen">
      {/* Loader */}
      <div
        className={`loading-overlay fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-500 ${
          showLoader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-4 z-10">
          <div className="lv-spinner" />
          <p className="text-[#67E8F9] text-responsive-sm tracking-wider">Loading</p>
          <div className="w-48 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${(loadedImages / totalImages) * 100}%` }}
            />
          </div>
          <p className="text-[#67E8F9]/70 text-xs tracking-wider">
            {Math.round((loadedImages / totalImages) * 100)}%
          </p>
        </div>
      </div>

      {!showLoader && (
        <>
          <Navigation onNavigate={handleNavigation} />

          <main className="relative space-y-0 z-10">
            <section id="hero">
              <Hero />
            </section>

            <div className="py-8">
              <SectionDivider />
            </div>

            <section id="about">
              <About />
            </section>

            <div className="py-8">
              <SectionDivider />
            </div>

            {/* THE SAUCE */}
            <section id="sauce" className="container-responsive">
              <TheSauce 
                ref={sauceRef}
                openSection={openSauceSection}
                onSectionChange={handleSauceSectionChange}
              />
            </section>

            <div className="py-8">
              <SectionDivider />
            </div>

            <section id="extras">
              <Info />
            </section>
          </main>

          {/* Global Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
