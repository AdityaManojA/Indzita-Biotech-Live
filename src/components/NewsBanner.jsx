import React from 'react';
import { Award, ArrowRight, Sparkles } from 'lucide-react';
import { pressArticleData } from '../data/indzitaData';

export default function NewsBanner({ onReadArticle }) {
  return (
    <div className="breaking-news-strip" id="breaking-news-banner">
      <div className="container news-banner-container">
        <div className="news-banner-content">
          <span className="news-badge-live">
            <span className="live-radar-dot" style={{ background: '#10b981' }}></span>
            <span>MILESTONE // ₹7 CR GRANT</span>
          </span>
          <p className="news-strip-text">
            <strong>No biopsy, just blood:</strong> RGCB &amp; IndZita develop blood test for early cervical cancer detection under MAHA MedTech Mission.
          </p>
        </div>

        <button 
          onClick={onReadArticle} 
          className="news-strip-cta"
          id="btn-news-strip-read"
        >
          <span>Read Press Release</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
