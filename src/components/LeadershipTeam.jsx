import React, { useState } from 'react';
import { leadershipTeam, researchCollaborators } from '../data/indzitaData';
import { Maximize2, X } from 'lucide-react';

export default function LeadershipTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInitials = (name) => {
    return name
      .replace(/^Dr\.\s+/, '')
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2);
  };

  return (
    <section className="section" id="team" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        {/* Section Lead */}
        <div className="section-lead">
          <div className="index-tag">06 // Leadership & Scientific Faculty</div>
          <h2>The Team Behind IndZita</h2>
          <p>
            A multidisciplinary coalition of translational RNA biologists, biomedical instrumentation architects, and clinical oncology trial leaders.
          </p>
        </div>

        {/* Featured Hero Team Photograph Showcase */}
        <div className="team-hero-showcase" id="team-photo-showcase">
          <div
            className="team-photo-frame"
            onClick={() => setIsModalOpen(true)}
            title="Click to view full-resolution team photograph"
          >
            <div className="team-photo-tag">
              [ CORE SCIENTIFIC & LEADERSHIP TEAM ]
            </div>

            <button
              className="team-photo-expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              aria-label="Inspect Full Resolution"
            >
              <Maximize2 size={13} />
              <span>Full Resolution</span>
            </button>

            <img
              src="/images/Team/team.png"
              alt="IndZita Biotech Leadership and Scientific Team"
              loading="lazy"
            />
          </div>

          <div className="team-photo-caption-bar">
            <div>
              <div className="team-photo-caption-title">
                INDZITA BIOTECH & BRIC - RGCB TRANSLATIONAL FACULTY
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-body)', marginTop: '3px' }}>
                Bridging academic molecular discovery, point-of-care automation engineering, and certified clinical diagnostics.
              </div>
            </div>

            <div className="team-photo-caption-meta">
              THIRUVANANTHAPURAM • KERALA, INDIA
            </div>
          </div>
        </div>

        {/* Directors Section Lead */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '14px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Governance & Executive Direction
            </div>
            <h3 style={{ fontSize: '1.45rem', marginTop: '2px' }}>Board of Directors</h3>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {leadershipTeam.length} DIRECTORS
          </span>
        </div>

        {/* Directors Roster */}
        <div className="roster-grid">
          {leadershipTeam.map((member, idx) => (
            <div key={idx} className="roster-card" id={`director-card-${idx}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="roster-monogram">
                  {getInitials(member.name)}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-hairline)', padding: '3px 8px', borderRadius: '2px', color: 'var(--text-muted)' }}>
                  {member.affiliation}
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '4px' }}>
                DIRECTOR
              </div>
              <h3 style={{ fontSize: '1.28rem', marginBottom: '4px' }}>{member.name}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-ink)', fontWeight: 600, marginBottom: '14px' }}>
                {member.specialty}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Research Collaborators Section Lead */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '14px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              External Scientific Advisory
            </div>
            <h3 style={{ fontSize: '1.45rem', marginTop: '2px' }}>Research Collaborators</h3>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            BRIC - RGCB AFFILIATED
          </span>
        </div>

        {/* Collaborators Grid */}
        <div className="collab-roster-grid">
          {researchCollaborators.map((collab, idx) => (
            <div key={idx} className="roster-card" id={`collab-card-${idx}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div className="roster-monogram" style={{ margin: 0, width: '52px', height: '52px', fontSize: '1.15rem' }}>
                  {getInitials(collab.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>{collab.name}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {collab.affiliation} // {collab.role}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-ink)', fontWeight: 600, marginBottom: '8px' }}>
                {collab.specialty}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {collab.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Resolution Team Lightbox Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop-clean"
          onClick={() => setIsModalOpen(false)}
          style={{ zIndex: 2500 }}
        >
          <div
            className="modal-window-clean"
            style={{ maxWidth: '1040px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-topbar-clean">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: 'var(--bg-subtle)', padding: '3px 8px', border: '1px solid var(--border-hairline)', borderRadius: '2px' }}>
                  FULL PHOTOGRAPHY // 2280 × 1528 PX
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>IndZita Biotech Leadership & Scientific Team</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-ink)', display: 'flex', alignItems: 'center', padding: '4px' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#09090b', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/Team/team.png"
                alt="IndZita Leadership Team"
                style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block', margin: 'auto' }}
              />
            </div>

            <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                IndZita Biotech executive leadership and translational scientific faculty at BRIC - Rajiv Gandhi Centre for Biotechnology.
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                ARCHIVE: /images/Team/team.png
              </div>
            </div>
          </div>
        </div>
      )
    }
    </section>
  );
}