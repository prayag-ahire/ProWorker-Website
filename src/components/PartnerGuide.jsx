import { useMemo, useState, useEffect } from 'react';
import './SalesPartner.css';

const QUALIFICATION_CHECKLIST = [
  {
    id: 'mobile',
    title: 'Verified Mobile Number',
    desc: 'Worker authenticates via real-time SMS OTP. No duplicate or recycled numbers.',
    tag: 'Automated'
  },
  {
    id: 'basic_info',
    title: 'Full Name & Trade Profession',
    desc: 'Correct professional trade (e.g., Plumber, Electrician, Carpenter, Painter, AC Tech).',
    tag: 'Required'
  },
  {
    id: 'photo',
    title: 'Genuine Profile Photograph',
    desc: 'Clear face photo of the worker in good lighting. No stock images or logos.',
    tag: 'Quality Check'
  },
  {
    id: 'service_desc',
    title: 'Service & Skill Description',
    desc: 'Clear summary of services provided, specializations, and years of experience.',
    tag: 'Profile Depth'
  },
  {
    id: 'location',
    title: 'Operating Territory & Area',
    desc: 'Specific neighborhood, city, and serviceable radius where the worker operates.',
    tag: 'Location'
  },
  {
    id: 'availability',
    title: 'Working Days & Time Availability',
    desc: 'Working days (e.g. Mon–Sat) and regular service hours so clients can reach them.',
    tag: 'Schedule'
  },
  {
    id: 'work_photos',
    title: 'At Least 2 Real Work Photos',
    desc: 'Photos of recent work, toolkit, or projects. Reused or internet images are rejected.',
    tag: 'Portfolio'
  },
  {
    id: 'admin_audit',
    title: 'ProWorker Admin Verification',
    desc: 'Our review team audits the details and calls the worker to verify authenticity.',
    tag: 'Audit Pass'
  },
  {
    id: 'retention',
    title: '7-Day Retention & Liveness',
    desc: 'Profile must remain active and responsive for 7 full days after passing verification.',
    tag: '7-Day Validation'
  }
];

const GUIDE_SECTIONS = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'qualification', label: 'What qualifies' },
  { id: 'anti-fraud', label: 'Anti-fraud rules' },
  { id: 'terms', label: 'Terms' },
  { id: 'faq', label: 'FAQ' }
];

const VALID_SECTION_IDS = new Set(GUIDE_SECTIONS.map((s) => s.id));

function getInitialSection() {
  if (typeof window === 'undefined') return 'how-it-works';
  const hash = window.location.hash.replace('#', '');
  return VALID_SECTION_IDS.has(hash) ? hash : 'how-it-works';
}

function PartnerGuide() {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [activeTermsSection, setActiveTermsSection] = useState('zero-fee');

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_SECTION_IDS.has(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectSection = (id) => {
    setActiveSection(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sectionTitle = useMemo(
    () => GUIDE_SECTIONS.find((s) => s.id === activeSection)?.label || 'Guide',
    [activeSection]
  );

  return (
    <div className="partner-page partner-guide-page">
      <section className="partner-guide-hero">
        <div className="container">
          <a href="/partner" className="guide-back-link">
            ← Back to Apply
          </a>
          <h1 className="partner-guide-title">Growth Partner Guide</h1>
          <p className="partner-guide-subtitle">
            Everything you need to know about earning ₹50 per qualified worker.
          </p>
        </div>
      </section>

      <div className="partner-guide-nav-wrap">
        <div className="container">
          <nav className="partner-guide-nav" aria-label="Partner guide sections">
            {GUIDE_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`guide-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => selectSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="partner-guide-content">
        <div className="container">
          <div className="guide-section-label">{sectionTitle}</div>

          {activeSection === 'how-it-works' && (
            <div className="partner-process-section guide-section-panel">
              <div className="section-head text-center">
                <span className="section-eyebrow">Program Workflow</span>
                <h2>How the Growth Partner Model Works</h2>
                <p>Clear, direct, and transparent. From first signup to weekly UPI payout.</p>
              </div>

              <div className="process-grid">
                <div className="process-card">
                  <div className="process-step-num">01</div>
                  <div className="process-icon">📝</div>
                  <h3>Join Sales Team</h3>
                  <p>
                    Fill out the partner registration form, verify your mobile number with OTP, then submit to get your unique Partner Referral Code.
                  </p>
                </div>

                <div className="process-card">
                  <div className="process-step-num">02</div>
                  <div className="process-icon">🤝</div>
                  <h3>Approach Workers</h3>
                  <p>
                    Visit local markets and meet plumbers, electricians, carpenters, AC mechanics, etc. Help them download ProWorker and create a free profile.
                  </p>
                </div>

                <div className="process-card">
                  <div className="process-step-num">03</div>
                  <div className="process-icon">🔍</div>
                  <h3>Profile Verification</h3>
                  <p>
                    Our audit team inspects each profile, verifies trade details, work photographs, and initiates the 7-day retention verification check.
                  </p>
                </div>

                <div className="process-card">
                  <div className="process-step-num">04</div>
                  <div className="process-icon">💸</div>
                  <h3>Receive ₹50 via UPI</h3>
                  <p>
                    After 7 days of verified activity, ₹50 per eligible worker is credited directly to your registered UPI ID every Monday.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'qualification' && (
            <div className="partner-qualification-section guide-section-panel">
              <div className="section-head text-center">
                <span className="section-eyebrow">Quality Benchmark</span>
                <h2>Define What Qualifies for ₹50</h2>
                <p>
                  We do not pay for empty, fake, or half-filled accounts. Our goal is to build a reliable local directory customers can trust.
                </p>
              </div>

              <div className="qualification-grid">
                {QUALIFICATION_CHECKLIST.map((item, idx) => (
                  <div key={item.id} className="qual-card">
                    <div className="qual-header">
                      <div className="qual-check-box">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="qual-badge">{item.tag}</span>
                    </div>
                    <h3 className="qual-title">{idx + 1}. {item.title}</h3>
                    <p className="qual-desc">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="product-optional-banner">
                <div className="banner-icon-col">
                  <span className="banner-icon">💡</span>
                </div>
                <div className="banner-content-col">
                  <h4>Important: Product Listings are 100% Optional!</h4>
                  <p>
                    Unlike e-commerce sellers, skilled professionals provide labor, repairs, and technical services.
                    <strong> Do not force workers to list products.</strong> Profiles qualify completely based on trade details,
                    service description, availability, and genuine work photographs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'anti-fraud' && (
            <div className="partner-antifraud-section guide-section-panel">
              <div className="antifraud-wrapper">
                <div className="antifraud-header">
                  <div className="shield-icon">🛡️</div>
                  <div>
                    <span className="antifraud-tag">Fraud Prevention Policy</span>
                    <h2>Zero Tolerance for Fake Referrals</h2>
                    <p>
                      Suppose someone creates 100 fake accounts with fake phone numbers to earn ₹5,000.
                      We lose money without acquiring real professionals. That is why our system strictly enforces these 6 rules:
                    </p>
                  </div>
                </div>

                <div className="antifraud-rules-grid">
                  <div className="rule-card">
                    <div className="rule-badge">Rule 1</div>
                    <h3>One Worker, One Commission</h3>
                    <p>Duplicate mobile numbers or recycled accounts never qualify. Each qualified worker must be uniquely verified.</p>
                  </div>

                  <div className="rule-card">
                    <div className="rule-badge">Rule 2</div>
                    <h3>Human Profile Verification</h3>
                    <p>Our audit team physically or telephonically verifies worker credentials, shop presence, and actual field activity.</p>
                  </div>

                  <div className="rule-card">
                    <div className="rule-badge">Rule 3</div>
                    <h3>Unique Attribution</h3>
                    <p>Every worker is bound directly to your referral code at registration, preventing attribution theft or cross-claims.</p>
                  </div>

                  <div className="rule-card">
                    <div className="rule-badge">Rule 4</div>
                    <h3>Seven-Day Validation Check</h3>
                    <p>Commissions are paid only after a 7-day retention period, ensuring the worker is genuinely active and reachable.</p>
                  </div>

                  <div className="rule-card">
                    <div className="rule-badge">Rule 5</div>
                    <h3>Audited Payment Records</h3>
                    <p>A transparent ledger tracks all your referrals across Approved, Pending, Rejected, and Paid statuses.</p>
                  </div>

                  <div className="rule-card">
                    <div className="rule-badge">Rule 6</div>
                    <h3>No Self-Referrals</h3>
                    <p>Partners cannot earn commissions for their own profile, simulated test devices, or close duplicate family numbers.</p>
                  </div>
                </div>

                <div className="antifraud-warning-box">
                  <strong>⚠️ Penalty Notice:</strong> Any partner caught uploading stock photos, submitting fake OTP numbers, or charging workers money will have their referral code suspended immediately, all unpaid commissions permanently cancelled, and phone number blacklisted across the ProWorker network.
                </div>
              </div>
            </div>
          )}

          {activeSection === 'terms' && (
            <div className="partner-terms-section guide-section-panel">
              <div className="section-head text-center">
                <span className="section-eyebrow">Legal & Guidelines</span>
                <h2>Terms of Engagement & Code of Conduct</h2>
                <p>Transparent rules that keep ProWorker genuine, trusted, and free for hard-working professionals.</p>
              </div>

              <div className="terms-tabs-wrapper">
                <div className="terms-tab-nav">
                  <button
                    type="button"
                    className={`terms-tab-btn ${activeTermsSection === 'zero-fee' ? 'active' : ''}`}
                    onClick={() => setActiveTermsSection('zero-fee')}
                  >
                    1. Zero-Fee Policy
                  </button>
                  <button
                    type="button"
                    className={`terms-tab-btn ${activeTermsSection === 'qualification' ? 'active' : ''}`}
                    onClick={() => setActiveTermsSection('qualification')}
                  >
                    2. What Qualifies for ₹50
                  </button>
                  <button
                    type="button"
                    className={`terms-tab-btn ${activeTermsSection === 'retention' ? 'active' : ''}`}
                    onClick={() => setActiveTermsSection('retention')}
                  >
                    3. 7-Day Retention & Ledger
                  </button>
                  <button
                    type="button"
                    className={`terms-tab-btn ${activeTermsSection === 'fraud' ? 'active' : ''}`}
                    onClick={() => setActiveTermsSection('fraud')}
                  >
                    4. Fraud & Penalties
                  </button>
                </div>

                <div className="terms-tab-content">
                  {activeTermsSection === 'zero-fee' && (
                    <div className="terms-panel">
                      <h3>Strict Prohibition: You Cannot Charge Workers Money</h3>
                      <p>
                        ProWorker was founded to help local skilled workers build a digital identity without middlemen or extortion.
                        Creating a profile on ProWorker is <strong>100% free forever</strong>.
                      </p>
                      <ul>
                        <li>Sales partners are strictly forbidden from demanding any cash, registration charges, or tips from workers.</li>
                        <li>If a partner tells a worker &quot;Pay ₹50 or ₹100 for ProWorker verification&quot;, this constitutes criminal fraud and extortion.</li>
                        <li>Any complaint from a worker regarding extortion will result in immediate termination, blacklisting, and referral to law enforcement.</li>
                      </ul>
                    </div>
                  )}

                  {activeTermsSection === 'qualification' && (
                    <div className="terms-panel">
                      <h3>Qualification Requirements for the ₹50 Referral</h3>
                      <p>
                        To maintain directory quality, commissions are only disbursed for profiles that have all mandatory details filled:
                      </p>
                      <ul>
                        <li><strong>Verified Phone:</strong> Worker must verify their own phone number with SMS OTP.</li>
                        <li><strong>Complete Profile:</strong> Worker name, professional trade, operating area, working days, and working hours.</li>
                        <li><strong>Photographs:</strong> 1 clear face profile photo + minimum 2 genuine photos of their tools, workshop, or completed work.</li>
                        <li><strong>Products Are Optional:</strong> You do NOT need to add product listings. Plumbers, carpenters, and technicians provide services, not retail goods.</li>
                      </ul>
                    </div>
                  )}

                  {activeTermsSection === 'retention' && (
                    <div className="terms-panel">
                      <h3>Seven-Day Retention & Payment Ledger</h3>
                      <p>
                        Why 7 days? A hit-and-run account that deletes the app or abandons the account immediately does not help customers or the community.
                      </p>
                      <ul>
                        <li><strong>Day 0:</strong> Worker completes profile; submitted to admin queue.</li>
                        <li><strong>Day 1–2:</strong> Admin approves profile; 7-day retention counter starts.</li>
                        <li><strong>Day 7:</strong> System verifies worker profile is in good standing and responsive.</li>
                        <li><strong>Monday:</strong> Approved commissions are aggregated and paid in bulk directly to your UPI ID.</li>
                      </ul>
                    </div>
                  )}

                  {activeTermsSection === 'fraud' && (
                    <div className="terms-panel">
                      <h3>Fraud Detection & Immediate Disqualification</h3>
                      <p>
                        Our backend continuously tracks automated fraud heuristics:
                      </p>
                      <ul>
                        <li><strong>Duplicate Phone Numbers:</strong> Re-registering existing workers earns ₹0.</li>
                        <li><strong>Device ID Clustering:</strong> Registering 20 accounts from the same smartphone in one hour triggers an automatic fraud hold.</li>
                        <li><strong>Stock Image Detection:</strong> Perceptual image hashing detects downloaded stock photos from Google/Pinterest.</li>
                        <li><strong>Self-Referrals:</strong> Partners attempting to refer their own secondary numbers will have their account banned.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'faq' && (
            <div className="partner-faq-section guide-section-panel">
              <div className="section-head text-center">
                <span className="section-eyebrow">Common Questions</span>
                <h2>Frequently Asked Questions</h2>
              </div>

              <div className="faq-grid">
                <div className="faq-card">
                  <h3>When and how will I receive my money?</h3>
                  <p>
                    All approved commissions are paid weekly every Monday via direct UPI transfer to the mobile number or custom UPI ID you registered with.
                  </p>
                </div>

                <div className="faq-card">
                  <h3>Does every worker need to list products to qualify?</h3>
                  <p>
                    No! Product listings are strictly optional. As long as the professional lists their service description, availability, and 2 work photos, they qualify.
                  </p>
                </div>

                <div className="faq-card">
                  <h3>Can I collect money from workers to create their profile?</h3>
                  <p>
                    NO. ProWorker is 100% free for workers. Charging any fee from workers is strictly prohibited and will lead to an immediate ban and forfeiture of all commissions.
                  </p>
                </div>

                <div className="faq-card">
                  <h3>What if a worker deletes the app before 7 days?</h3>
                  <p>
                    Profiles that are abandoned, deleted, or fail our retention check within 7 days do not qualify for the ₹50 commission. We only pay for genuine, retained workers.
                  </p>
                </div>

                <div className="faq-card">
                  <h3>Who can join as a ProWorker Growth Partner?</h3>
                  <p>
                    Anyone who has access to local communities, markets, or tradespeople—such as field agents, college students, hardware shop owners, or active freelancers.
                  </p>
                </div>

                <div className="faq-card">
                  <h3>How does ProWorker know I referred the worker?</h3>
                  <p>
                    Each partner receives a unique referral code. During signup, the worker enters your code, which permanently binds their profile to your partner account.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="guide-apply-cta">
            <p>Ready to join?</p>
            <a href="/partner#register-form" className="btn btn-primary">
              Apply as Growth Partner →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PartnerGuide;
