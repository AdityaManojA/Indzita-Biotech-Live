import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsBanner from './components/NewsBanner';
import Hero from './components/Hero';
import MolecularPipeline from './components/MolecularPipeline';
import MolecularAtlasGrid from './components/MolecularAtlasGrid';
import BioreactorSection from './components/BioreactorSection';
import DiagnosticPlatform from './components/DiagnosticPlatform';
import VirtualLabModal from './components/VirtualLabModal';
import InstitutionalNetwork from './components/InstitutionalNetwork';
import LeadershipTeam from './components/LeadershipTeam';
import ContactTerminal from './components/ContactTerminal';
import PressReleaseArticle from './components/PressReleaseArticle';
import Footer from './components/Footer';

export default function App() {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  
  // Current view: 'home' | 'article'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#news' || window.location.hash.startsWith('#news'))) {
      return 'article';
    }
    return 'home';
  });

  // Listen to hash changes for deep linking & browser history
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#news' || window.location.hash.startsWith('#news')) {
        setCurrentView('article');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openArticle = () => {
    window.location.hash = '#news';
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = (hash = '#overview') => {
    setCurrentView('home');
    window.location.hash = hash;
  };
  
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('indzita_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('indzita_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      {/* Fixed Header with Theme Toggle & Single-Line Pill Navigation */}
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        currentView={currentView}
        onOpenArticle={openArticle}
        onGoHome={() => goHome('#overview')}
        onOpenSimulator={() => setIsSimulatorOpen(true)} 
      />

      {currentView === 'home' ? (
        <>
          {/* Breaking News Notification Strip */}
          <NewsBanner onReadArticle={openArticle} />

          {/* Main Landing Page Content Sections */}
          <main>
            <Hero onOpenSimulator={() => setIsSimulatorOpen(true)} />
            <MolecularPipeline onOpenSimulator={() => setIsSimulatorOpen(true)} />
            <MolecularAtlasGrid />
            <BioreactorSection />
            <DiagnosticPlatform />
            <InstitutionalNetwork />
            <LeadershipTeam />
            <ContactTerminal />
          </main>
        </>
      ) : (
        /* Dedicated Full Editorial Press Release Article */
        <main>
          <PressReleaseArticle 
            onBackToHome={() => goHome('#overview')}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
          />
        </main>
      )}

      {/* Global Footer */}
      <Footer onOpenArticle={openArticle} />

      {/* Virtual Diagnostic Lab Simulation Modal */}
      <VirtualLabModal 
        isOpen={isSimulatorOpen} 
        onClose={() => setIsSimulatorOpen(false)} 
      />
    </div>
  );
}
