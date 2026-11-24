import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import DoctorCard from '../components/common/DoctorCard';
import TourGuide from '../components/common/TourGuide';
import InteractiveFeatureShowcase from '../components/common/InteractiveFeatureShowcase';
import { Doctor } from '../types';
import './Home.css';

const specializations = ['Cardiologist','Dermatologist','General Physician','Neurologist','Orthopedic','Pediatrician','Psychiatrist','Gynecologist'];

const Home: React.FC = () => {
  const { user } = useAuth();
  const [featuredDoctors, setFeaturedDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/doctors?limit=3').then(res => {
      setFeaturedDoctors(res.data.doctors || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <TourGuide />

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
        </div>
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow hero-animate-1">
              <span className="hero__eyebrow-dot" />
              <span>India's Trusted Healthcare Platform</span>
            </div>
            <h1 className="hero__title hero-animate-2">
              Find & Book <span className="gradient-text hero__highlight">Top Doctors</span><br/>
              Near You, Instantly
            </h1>
            <p className="hero__subtitle hero-animate-3">
              Connect with verified specialists across India. Book appointments online, get real-time updates, and manage your health journey all in one place.
            </p>
            <div className="hero__actions hero-animate-4">
              <Link to="/doctors" className="btn btn-primary btn-lg">Find a Doctor</Link>
              {!user && <Link to="/register" className="btn btn-outline btn-lg">Register Free</Link>}
            </div>
            <div className="hero__stats hero-animate-5">
              <div className="hero__stat"><span className="hero__stat-num">500+</span><span>Doctors</span></div>
              <div className="hero__stat-divider" />
              <div className="hero__stat"><span className="hero__stat-num">10k+</span><span>Patients</span></div>
              <div className="hero__stat-divider" />
              <div className="hero__stat"><span className="hero__stat-num">20+</span><span>Specialties</span></div>
            </div>
          </div>
          <div className="hero__visual animate-float">
            <div className="hero__card-float hero__card-float--1 animate-fade-in-right">
              <span>&#10003;</span><span>Appointment Confirmed</span>
            </div>
            <div className="hero__card-float hero__card-float--2 animate-fade-in-left">
              <span>!</span><span>Real-time Updates</span>
            </div>
            <div className="hero__illustration">
              <div className="hero__pulse-ring hero__pulse-ring--inner" />
              <div className="hero__pulse-ring hero__pulse-ring--outer" />
              <div className="hero__center-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="specializations section">
        <div className="container">
          <h2 className="section__title">Browse by <span className="gradient-text">Specialty</span></h2>
          <p className="section__subtitle">Find the right specialist for your health needs</p>
          <div className="spec-grid">
            {specializations.map((spec, i) => (
              <Link key={spec} to={`/doctors?specialization=${spec}`}
                className="spec-card animate-fade-in"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="spec-card__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <span className="spec-card__name">{spec}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 3D Rolling & Infinite Loop Features Showcase */}
      <InteractiveFeatureShowcase />

      {/* Featured Doctors */}
      <section className="featured-doctors section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section__title" style={{ marginBottom: '0.5rem' }}>Featured <span className="gradient-text">Doctors</span></h2>
              <p className="section__subtitle" style={{ marginBottom: 0 }}>Top-rated specialists ready to help</p>
            </div>
            <Link to="/doctors" className="btn btn-outline">View All Doctors</Link>
          </div>
          {loading ? (
            <div className="grid-3">{[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 380, borderRadius: 'var(--radius-xl)' }} />)}</div>
          ) : (
            <div className="grid-3">{featuredDoctors.map(d => <DoctorCard key={d._id} doctor={d} />)}</div>
          )}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-card animate-fade-in">
              <h2>Ready to Take Control of Your Health?</h2>
              <p>Join thousands of patients who trust MediConnect for their healthcare needs.</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <Link to="/register" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>Get Started Free</Link>
                <Link to="/doctors" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>Browse Doctors</Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
