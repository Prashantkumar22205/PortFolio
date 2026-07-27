import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAntigravity } from '../hooks/useAntigravity';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

const Contact = () => {
  const controls = useAntigravity();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xkgrddln', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <motion.div animate={controls}>
      <section id="contact" className="section">
        <div className="section-inner">
          <motion.p className="section-tag" {...fadeUp(0)}>// get in touch</motion.p>
          <motion.h2 className="section-title" {...fadeUp(0.05)}>
            Let's <span className="accent">Connect</span>
          </motion.h2>

          <div className="contact-grid">
            {/* Left */}
            <motion.div className="contact-info" {...fadeUp(0.1)}>
              <h3>Open to opportunities 👋</h3>
              <p>
                Whether you have a project in mind, an internship offer, or just want to
                talk tech — I'd love to hear from you. I'll get back to you quickly.
              </p>

              <div className="contact-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:17,height:17,flexShrink:0}}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:prashantkumar100185@gmail.com" style={{ color: 'var(--purple-lt)' }}>
                  prashantkumar100185@gmail.com
                </a>
              </div>

              <div className="contact-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:17,height:17,flexShrink:0}}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href="tel:+916378271509" style={{ color: 'var(--muted)' }}>
                  +91 6378271509
                </a>
              </div>

              <div className="contact-detail" style={{ marginBottom: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:17,height:17,flexShrink:0}}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ color: 'var(--muted)' }}>Ghaziabad, India (near Delhi)</span>
              </div>

              <div className="contact-socials" style={{ marginTop: 28 }}>
                <a href="https://github.com/Prashantkumar22205" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                  <GitHubIcon /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/prashant-kumar-868308296" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                  <LinkedInIcon /> LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.form className="contact-form" onSubmit={handleSubmit} {...fadeUp(0.15)} aria-label="Contact form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input id="contact-name" className="form-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input id="contact-email" className="form-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" className="form-textarea" name="message" placeholder="What would you like to discuss?" value={form.message} onChange={handleChange} required />
              </div>

              {status === 'success' ? (
                <div className="form-success">✅ Message sent! I'll get back to you soon.</div>
              ) : (
                <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              )}
              {status === 'error' && (
                <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: 8 }}>
                  Something went wrong. Try emailing me directly.
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
