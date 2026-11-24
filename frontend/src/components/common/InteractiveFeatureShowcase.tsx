import React, { useState, useEffect, useRef } from 'react';
import './InteractiveFeatureShowcase.css';

interface FeatureItem {
  id: number;
  step: string;
  code: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  specs: { label: string; val: string }[];
}

const features: FeatureItem[] = [
  {
    id: 0,
    step: '01',
    code: 'RAPID // ACCESS',
    title: 'Instant Booking',
    desc: 'Schedule appointments with verified medical specialists in under 60 seconds with live slot validation. Zero waiting queues or phone calls.',
    metric: '< 60s',
    metricLabel: 'Booking Velocity',
    specs: [
      { label: 'CALENDAR SYNC', val: 'Real-Time' },
      { label: 'SLOT CONFLICT', val: 'Zero Collision' },
      { label: 'ACCESS', val: 'Instant Cloud' },
    ],
  },
  {
    id: 1,
    step: '02',
    code: 'SOCKET // TELEMETRY',
    title: 'Real-time Updates',
    desc: 'Live bidirectional WebSocket telemetry dispatches instant status confirmations, appointment approvals, and clinical updates directly to your screen.',
    metric: '12ms',
    metricLabel: 'Socket Latency',
    specs: [
      { label: 'PROTOCOL', val: 'Socket.IO' },
      { label: 'CHANNELS', val: 'Dual Room' },
      { label: 'FALLBACK', val: 'HTTP Polling' },
    ],
  },
  {
    id: 2,
    step: '03',
    code: 'CRYPTO // VAULT',
    title: 'Secure & Private',
    desc: 'Engineered with cryptographic standard security: 12-round bcrypt password salting, role-based JWT access barriers, and HIPAA-conscious records.',
    metric: '256-Bit',
    metricLabel: 'JWT Encryption',
    specs: [
      { label: 'HASHING', val: 'Bcrypt Salt x12' },
      { label: 'RBAC', val: 'Strict Guards' },
      { label: 'STORAGE', val: 'Protected NoSQL' },
    ],
  },
  {
    id: 3,
    step: '04',
    code: 'CLINICAL // VETTING',
    title: 'Verified Doctors',
    desc: 'Every medical practitioner undergoes multi-point credential verification and administrative approval before being published to the consultation network.',
    metric: '100%',
    metricLabel: 'Manual Validation',
    specs: [
      { label: 'CREDENTIALS', val: 'MBBS / MD / MS' },
      { label: 'APPROVAL', val: 'Admin Audited' },
      { label: 'RATING SYSTEM', val: '5-Star Verified' },
    ],
  },
  {
    id: 4,
    step: '05',
    code: 'RX // PROTOCOL',
    title: 'Digital Prescriptions',
    desc: 'Receive digital clinical prescriptions and consultation directives immediately post-visit, stored safely in your personal health timeline.',
    metric: 'Instant',
    metricLabel: 'Rx Generation',
    specs: [
      { label: 'AVAILABILITY', val: 'Immediate' },
      { label: 'TIMELINE', val: 'Permanent Record' },
      { label: 'FORMAT', val: 'Encrypted Digital' },
    ],
  },
  {
    id: 5,
    step: '06',
    code: 'SPECTRUM // UI',
    title: 'Dual Spectrum UI',
    desc: 'Adaptive interface engineered for all environments: toggle seamlessly between clean daylight clinical white and the high-contrast Neuroform Crimson dark mode.',
    metric: 'Dual',
    metricLabel: 'Spectrum Engine',
    specs: [
      { label: 'DARK PALETTE', val: 'Neuroform Crimson' },
      { label: 'LIGHT PALETTE', val: 'Clinical White' },
      { label: 'CONTRAST', val: 'WCAG AAA Optimized' },
    ],
  },
];

const InteractiveFeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoopMode, setIsLoopMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalDist = containerRef.current.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setProgress(rawProgress);

      if (rawProgress >= 0.78) {
        setIsLoopMode(true);
      } else {
        setIsLoopMode(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous wheel position for 3D rolling cylinder
  const continuousIndex = (progress / 0.78) * 5.2;

  return (
    <div className="showcase-outer" ref={containerRef}>
      <div className="showcase-sticky">
        {/* Ambient HUD grid accents */}
        <div className="hud-corner hud-corner--tl">+</div>
        <div className="hud-corner hud-corner--tr">+</div>
        <div className="hud-corner hud-corner--bl">+</div>
        <div className="hud-corner hud-corner--br">+</div>
        <div className="hud-ambient-glow" />

        <div className="container showcase-content">
          {/* Header */}
          <div className="showcase-header animate-fade-in">
            <h2 className="showcase-title">
              Why Choose <span className="gradient-text">MediConnect</span>
            </h2>
            <p className="showcase-subtitle">
              Comprehensive clinical tools, real-time connectivity, and verified healthcare services.
            </p>
          </div>

          {/* DISPLAY CONTAINER: 3D Rolling or Horizontal Loop */}
          <div className="showcase-stage-wrapper">
            {!isLoopMode ? (
              /* Phase 1 & 2: Vertical 3D Rolling Feature Showcase */
              <div className="stage-3d">
                <div className="cylinder-viewport">
                  {features.map((feature, i) => {
                    const diff = i - continuousIndex;
                    // 3D rolling transforms: rotation, depth, scale, and opacity
                    const rotateX = diff * -45;
                    const translateY = diff * 150;
                    const translateZ = -Math.abs(diff) * 200;
                    const opacity = Math.max(0, 1 - Math.abs(diff) * 0.7);
                    const scale = Math.max(0.75, 1 - Math.abs(diff) * 0.12);
                    const isCurrent = Math.abs(diff) < 0.6;

                    return (
                      <div
                        key={feature.id}
                        className={`showcase-card ${isCurrent ? 'showcase-card--active' : ''}`}
                        style={{
                          transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                          opacity: opacity,
                          zIndex: Math.round(100 - Math.abs(diff) * 10),
                          pointerEvents: isCurrent ? 'auto' : 'none',
                        }}
                      >
                        <div className="card-top-bar">
                          <span className="card-badge-code">{feature.code}</span>
                          <span className="card-badge-step">{feature.step} / 06</span>
                        </div>

                        <div className="card-main-content">
                          <div className="card-icon-frame">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="card-feature-title">{feature.title}</h3>
                            <p className="card-feature-desc">{feature.desc}</p>
                          </div>
                        </div>

                        <div className="card-metrics-grid">
                          <div className="card-primary-stat">
                            <span className="stat-value">{feature.metric}</span>
                            <span className="stat-label">{feature.metricLabel}</span>
                          </div>
                          <div className="card-specs-list">
                            {feature.specs.map(spec => (
                              <div key={spec.label} className="spec-item">
                                <span className="spec-k">{spec.label}</span>
                                <span className="spec-v">{spec.val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="card-bottom-bar">
                          <span className="active-tag">SYSTEM OPERATIONAL</span>
                          <span className="scroll-hint">SCROLL TO ROLL ↓</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Phase 3: Seamless Horizontal Infinite Loop */
              <div className="stage-loop animate-fade-in">
                <div className="horizontal-marquee-wrapper">
                  <div className="horizontal-marquee-track">
                    {/* Double the array for seamless infinite looping */}
                    {[...features, ...features].map((feature, idx) => (
                      <div key={`${feature.id}-${idx}`} className="horizontal-card">
                        <div className="hcard-header">
                          <span className="hcard-code">{feature.code}</span>
                          <span className="hcard-step">#{feature.step}</span>
                        </div>
                        <div className="hcard-body">
                          <div className="hcard-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="hcard-title">{feature.title}</h4>
                            <p className="hcard-desc">{feature.desc}</p>
                          </div>
                        </div>
                        <div className="hcard-footer">
                          <span className="hcard-metric">{feature.metric}</span>
                          <span className="hcard-spec-tag">{feature.specs[0].val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFeatureShowcase;
