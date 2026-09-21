import React, { useState } from 'react';
import { Play, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { companyData } from '../data/indzitaData';

export default function Header({ onOpenSimulator, onOpenArticle, onGoHome, currentView, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '#overview', onClick: onGoHome },
    { label: 'Pipeline', href: '#pipeline', onClick: onGoHome },
    { label: 'Atlas', href: '#atlas', onClick: onGoHome },
    { label: 'Bioreactors', href: '#bioreactor', onClick: onGoHome },
    { label: 'Diagnostics', href: '#platform', onClick: onGoHome },
    { label: 'Press Desk', href: '#news', onClick: onOpenArticle },
    { label: 'Network', href: '#partners', onClick: onGoHome },
    { label: 'Leadership', href: '#team', onClick: onGoHome }
  ];

  return (
    <header className="site-header" id="site-header">
      <div className="header-container">
        {/* Brand Identity: Single-Line High-Contrast Mark */}
        <a 
          href="#overview" 
          className="nav-brand" 
          id="nav-brand-logo"
          onClick={(e) => {
            if (onGoHome) {
              onGoHome();
            }
          }}
        >
          <img 
            src={companyData.logo} 
            alt="IndZita Biotech Logo" 
            className="nav-brand-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="nav-brand-text">
            <span className="brand-name">IndZita</span>
            <span className="brand-badge">Biotech</span>
          </div>
        </a>

        {/* Center Pill-Track Navigation (Zero Text Wrapping) */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="nav-pill-track">
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  className={`nav-pill-link ${currentView === 'article' && item.href === '#news' ? 'active' : ''}`}
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions: Telemetry Chip, Theme Switcher & Virtual Lab CTA */}
        <div className="header-actions">
          {/* Live Telemetry Status Chip */}
          <div className="nav-status-chip" title="Diagnostic QC Pipeline Active">
            <span className="live-radar-dot"></span>
            <span>QC ONLINE</span>
          </div>

          <div className="nav-actions-sep"></div>

          {/* Theme Toggle Icon Button */}
          <button 
            className="nav-icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle Color Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Virtual Lab CTA */}
          <button 
            className="nav-cta-btn" 
            onClick={onOpenSimulator}
            id="btn-header-sim"
            title="Launch Virtual Diagnostic Lab Simulator"
          >
            <Play size={11} fill="currentColor" />
            <span>Virtual Lab</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            className="nav-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-hairline)' }}>
            <div className="nav-status-chip">
              <span className="live-radar-dot"></span>
              <span>SYSTEM ACTIVE // QC PASSED</span>
            </div>
            <button 
              className="nav-icon-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {navItems.map((item, idx) => (
            <a 
              key={item.href}
              href={item.href} 
              className="mobile-nav-link"
              onClick={() => {
                setMobileMenuOpen(false);
                if (item.onClick) item.onClick();
              }}
            >
              <span>0{idx + 1} // {item.label}</span>
              <ArrowUpRight size={16} style={{ color: 'var(--text-muted)' }} />
            </a>
          ))}

          <button 
            className="btn btn-primary"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSimulator();
            }}
            style={{ width: '100%', marginTop: '8px', height: '42px' }}
          >
            <Play size={13} fill="currentColor" />
            <span>Launch Virtual Lab Simulator</span>
          </button>
        </div>
      )}
    </header>
  );
}
