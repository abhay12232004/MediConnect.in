import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'How does instant appointment booking work?',
    a: 'Simply select your preferred specialist and city, choose an available date and time slot, and confirm. Your appointment is instantly reserved and dispatched in real-time to the doctor via Socket.IO.',
  },
  {
    q: 'How are doctors verified on MediConnect?',
    a: 'Every registered medical professional must upload their MBBS/MD/MS licensing credentials and clinical qualifications. Our administrative panel manually verifies and audits each profile before approving public listing.',
  },
  {
    q: 'Are my health records and prescriptions secure?',
    a: 'Yes. MediConnect uses 256-bit JWT authorization, 12-round bcrypt password salting, and isolated patient records to ensure full confidentiality and compliance with modern medical privacy standards.',
  },
  {
    q: 'Can I cancel or reschedule my appointment?',
    a: 'Yes, patients can cancel pending or confirmed appointments anytime from the "My Appointments" portal. Doctors and assistants can also approve or adjust slots with instant live notifications.',
  },
];

const Footer: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'appointment', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const dummyAddress = 'MediConnect Health Tower, 4th Floor, DLF Cyber City, Sector 24, Gurugram, Haryana 122002, India';

  const copyAddress = () => {
    navigator.clipboard.writeText(dummyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setShowContactModal(false);
      setContactForm({ name: '', email: '', subject: 'appointment', message: '' });
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mc-footer">
      {/* Top Banner: Emergency & Live Telemetry Bar */}
      <div className="mc-footer__topbar">
        <div className="container mc-footer__topbar-content">
          <div className="topbar-status">
            <span className="status-ping" />
            <span className="status-text">SYSTEM STATUS: ALL TELEMETRY CLUSTERS OPERATIONAL</span>
            <span className="status-badge">99.98% UPTIME</span>
          </div>
          <div className="topbar-emergency">
            <span className="emergency-label">24/7 Clinical Emergency:</span>
            <a href="tel:+911140509900" className="emergency-phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 (11) 4050-9900
            </a>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Grid */}
      <div className="container mc-footer__main">
        <div className="mc-footer__grid">
          {/* Col 1: Brand & Bio-Telemetry */}
          <div className="mc-footer__col mc-footer__col--brand">
            <Link to="/" className="mc-footer__brand" onClick={scrollToTop}>
              <div className="mc-footer__logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <span className="mc-footer__brand-text">Medi<span>Connect</span></span>
            </Link>
            <p className="mc-footer__tagline">
              Next-generation real-time doctor appointment and healthcare telemetry platform. Connecting patients with verified specialists across India with zero latency.
            </p>

            <div className="mc-footer__badges">
              <span className="trust-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                HIPAA Aligned
              </span>
              <span className="trust-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                256-Bit Encrypted
              </span>
              <span className="trust-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Verified MDs
              </span>
            </div>

            {/* Newsletter Subscription */}
            <div className="mc-footer__newsletter">
              <span className="newsletter-title">Subscribe to Clinical Bulletins</span>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="name@domain.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </form>
              {subscribed && <span className="newsletter-success">✓ You have been subscribed to updates!</span>}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="mc-footer__col">
            <h4 className="mc-footer__heading">Healthcare Portals</h4>
            <ul className="mc-footer__links">
              <li><Link to="/doctors" onClick={scrollToTop}>Find Verified Doctors</Link></li>
              <li><Link to="/doctors?specialization=Cardiologist" onClick={scrollToTop}>Cardiology Specialists</Link></li>
              <li><Link to="/doctors?specialization=Neurologist" onClick={scrollToTop}>Neurology Clinic</Link></li>
              <li><Link to="/doctors?specialization=Pediatrician" onClick={scrollToTop}>Pediatric Care</Link></li>
              <li><Link to="/appointments" onClick={scrollToTop}>My Appointments</Link></li>
              <li><Link to="/doctor/dashboard" onClick={scrollToTop}>Doctor Portal</Link></li>
              <li><Link to="/assistant/dashboard" onClick={scrollToTop}>Assistant Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Interactive Help & Support */}
          <div className="mc-footer__col">
            <h4 className="mc-footer__heading">Help & FAQs</h4>
            <ul className="mc-footer__links">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setShowHelpModal(true)}>
                  Interactive FAQ Guide →
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setShowContactModal(true)}>
                  Contact Support Desk →
                </button>
              </li>
              <li><a href="#booking-guide" onClick={(e) => { e.preventDefault(); setShowHelpModal(true); }}>Slot Booking Protocol</a></li>
              <li><a href="#digital-rx" onClick={(e) => { e.preventDefault(); setShowHelpModal(true); }}>Digital Rx Access</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Clinical Telemedicine: Medical data is processed securely under Indian Telemedicine Practice Guidelines 2020.'); }}>Terms of Service</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All consultations, chats, and records are protected by role-based encryption.'); }}>Privacy Policy</a></li>
            </ul>

            {/* Quick Interactive FAQ Accordion Snippet */}
            <div className="mc-footer__mini-faqs">
              <span className="mini-faq-header">Quick Questions:</span>
              {faqs.slice(0, 2).map((item, idx) => (
                <div key={item.q} className="mini-faq-item">
                  <button
                    type="button"
                    className="mini-faq-q"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-arrow">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && <p className="mini-faq-a animate-fade-in">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Corporate Headquarters & Dummy Address */}
          <div className="mc-footer__col mc-footer__col--address">
            <h4 className="mc-footer__heading">Headquarters & Clinic</h4>
            
            <div className="address-card">
              <div className="address-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="address-details">
                <strong>MediConnect Health HQ</strong>
                <p>{dummyAddress}</p>
                <div className="address-actions">
                  <button type="button" className="btn-copy-address" onClick={copyAddress}>
                    {copied ? (
                      <span className="copied-text">✓ Copied to Clipboard!</span>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        Copy Address
                      </>
                    )}
                  </button>
                  <a
                    href="https://maps.google.com/?q=DLF+Cyber+City+Gurugram"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-map-link"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-quick-list">
              <div className="contact-item">
                <span className="contact-k">Direct Desk:</span>
                <a href="tel:+911140509900" className="contact-v">+91 (11) 4050-9900</a>
              </div>
              <div className="contact-item">
                <span className="contact-k">Support Mail:</span>
                <a href="mailto:support@mediconnect.health" className="contact-v">support@mediconnect.health</a>
              </div>
              <div className="contact-item">
                <span className="contact-k">OPD Hours:</span>
                <span className="contact-v">08:00 AM – 10:00 PM IST</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm btn-open-contact"
              onClick={() => setShowContactModal(true)}
            >
              ✉️ Send Us an Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="mc-footer__bottom">
        <div className="container mc-footer__bottom-content">
          <p className="copyright-text">
            © {new Date().getFullYear()} MediConnect Healthcare Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="bottom-links">
            <span className="bottom-tag">ISO 27001 Certified Architecture</span>
            <button type="button" className="btn-back-to-top" onClick={scrollToTop} title="Back to top">
              <span>Back to Top</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          INTERACTIVE MODAL 1: CONTACT US INQUIRY MODAL
          ========================================================= */}
      {showContactModal && (
        <div className="footer-modal-overlay animate-fade-in" onClick={() => setShowContactModal(false)}>
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal__header">
              <div>
                <h3>Connect with MediConnect Support</h3>
                <p>Have an inquiry about appointments, doctors, or technical issues?</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setShowContactModal(false)}>✕</button>
            </div>

            {contactSent ? (
              <div className="modal-success-state animate-fade-in">
                <div className="success-icon">✓</div>
                <h4>Message Dispatched Successfully!</h4>
                <p>Our clinical assistance desk will review your inquiry and reach back within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="footer-modal__form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Dr. / Mr. / Ms. Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@domain.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department / Inquiry Type</label>
                  <select
                    className="form-input"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  >
                    <option value="appointment">Appointment Booking Help</option>
                    <option value="doctor-onboard">Doctor Verification & Onboarding</option>
                    <option value="billing">Consultation Fee & Invoicing</option>
                    <option value="technical">Live Socket & Chat Technical Issue</option>
                    <option value="emergency">Emergency Clinic Dispatch</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message / Case Details</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Describe your inquiry or case details..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowContactModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Transmit Message →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          INTERACTIVE MODAL 2: EXPANDED HELP & FAQ MODAL
          ========================================================= */}
      {showHelpModal && (
        <div className="footer-modal-overlay animate-fade-in" onClick={() => setShowHelpModal(false)}>
          <div className="footer-modal footer-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal__header">
              <div>
                <h3>MediConnect Clinical Help & Knowledge Base</h3>
                <p>Answers to common patient and doctor portal questions</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setShowHelpModal(false)}>✕</button>
            </div>

            <div className="modal-faq-list">
              {faqs.map((f, i) => (
                <div key={f.q} className="modal-faq-card">
                  <div className="modal-faq-num">0{i + 1}</div>
                  <div>
                    <h4 className="modal-faq-q">{f.q}</h4>
                    <p className="modal-faq-a">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer-cta">
              <span>Still need help with an urgent appointment?</span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setShowHelpModal(false);
                  setShowContactModal(true);
                }}
              >
                Contact Support Desk →
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
