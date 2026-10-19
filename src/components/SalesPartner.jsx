import { useState, useId } from 'react';
import './SalesPartner.css';

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'Gujarat',
  'Uttar Pradesh',
  'Tamil Nadu',
  'Telangana',
  'West Bengal',
  'Rajasthan',
  'Madhya Pradesh',
  'Punjab',
  'Haryana',
  'Bihar',
  'Kerala',
  'Andhra Pradesh',
  'Odisha',
  'Assam',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Goa',
  'Other State / UT'
];

const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'No prior sales experience (Fresher / Student)' },
  { value: '0-1_years', label: '0 – 1 year (Field promoter / Agent)' },
  { value: '1-3_years', label: '1 – 3 years (Direct field sales / Onboarding)' },
  { value: '3+_years', label: '3+ years (Experienced sales professional)' },
  { value: 'shop_owner', label: 'Local shopkeeper / Community representative' }
];

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

function SalesPartner({ onNavigate }) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    state: 'Maharashtra',
    city: '',
    area: '',
    preferredWorkingArea: '',
    salesExperience: 'none',
    customUpi: '',
    agreeNoFee: false,
    agreeSevenDayRetention: false,
    agreeAntiFraud: false,
    agreeGeneralTerms: false
  });

  // OTP Verification Simulation State
  const [otpStep, setOtpStep] = useState('unverified'); // 'unverified', 'otp_sent', 'verified'
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPartner, setSubmittedPartner] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Active accordion state for Terms & Conditions
  const [activeTermsSection, setActiveTermsSection] = useState('zero-fee');

  // Interactive Earnings Calculator
  const [weeklyWorkers, setWeeklyWorkers] = useState(15);
  const calculatedWeekly = weeklyWorkers * 50;
  const calculatedMonthly = calculatedWeekly * 4;

  const fullNameId = useId();
  const mobileId = useId();
  const otpInputId = useId();
  const stateId = useId();
  const cityId = useId();
  const areaId = useId();
  const preferredAreaId = useId();
  const experienceId = useId();
  const upiId = useId();

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formError) setFormError('');
  };

  const handleSendOtp = () => {
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setOtpError('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setOtpError('');
    setOtpStep('otp_sent');
    setResendCountdown(30);

    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (!enteredOtp || enteredOtp.trim().length < 4) {
      setOtpError('Enter the 4 or 6-digit OTP sent to your mobile.');
      return;
    }
    setOtpError('');
    setOtpStep('verified');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      setFormError('Please enter your full name (at least 3 characters).');
      return;
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setFormError('Please provide a valid 10-digit mobile number.');
      return;
    }

    if (otpStep !== 'verified') {
      setFormError('Please verify your mobile number with OTP before submitting.');
      return;
    }

    if (!formData.city.trim() || !formData.area.trim()) {
      setFormError('Please enter both your city and operating area.');
      return;
    }

    if (!formData.preferredWorkingArea.trim()) {
      setFormError('Please specify your preferred working area or market reach.');
      return;
    }

    // Check mandatory terms
    if (
      !formData.agreeNoFee ||
      !formData.agreeSevenDayRetention ||
      !formData.agreeAntiFraud ||
      !formData.agreeGeneralTerms
    ) {
      setFormError('You must accept all terms, especially the zero-fee rule and anti-fraud policy.');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend registration & code generation
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = `PW-${formData.city.slice(0, 3).toUpperCase() || 'IND'}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedPartner({
        ...formData,
        referralCode: randomCode,
        effectiveUpi: formData.customUpi.trim() || `${cleanMobile}@upi`
      });
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 700);
  };

  const copyReferralCode = () => {
    if (!submittedPartner?.referralCode) return;
    navigator.clipboard.writeText(submittedPartner.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="partner-page">
      {/* Hero Section */}
      <section className="partner-hero">
        <div className="container">
          <div className="partner-hero-badge">
            <span className="hero-badge-dot"></span>
            ProWorker Growth Partners Program
          </div>
          <h1 className="partner-hero-title">
            Earn <span className="highlight-text">₹50</span> for Every Genuine Skilled Worker You Onboard
          </h1>
          <p className="partner-hero-subtitle">
            Help local plumbers, electricians, carpenters, painters, and technicians create their free digital profile.
            Zero fee for workers. Direct weekly UPI payouts to your mobile.
          </p>

          <div className="partner-quick-pills">
            <div className="pill-item">
              <span className="pill-icon">💰</span>
              <span><strong>₹50</strong> / Qualified Worker</span>
            </div>
            <div className="pill-item">
              <span className="pill-icon">⚡</span>
              <span>Weekly UPI Payouts</span>
            </div>
            <div className="pill-item">
              <span className="pill-icon">🆓</span>
              <span>100% Free for Workers</span>
            </div>
            <div className="pill-item">
              <span className="pill-icon">🛡️</span>
              <span>Zero Joining Fee</span>
            </div>
          </div>

          <div style={{ marginTop: '36px' }}>
            <a href="#register-form" className="btn btn-primary btn-lg">
              Apply as Growth Partner →
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Potential Earnings Calculator */}
      <section className="partner-calculator-section">
        <div className="container">
          <div className="calc-card">
            <div className="calc-header">
              <span className="calc-tag">Earnings Calculator</span>
              <h2>How much can you earn each month?</h2>
              <p>Simple math. No ceiling on how many legitimate professionals you can onboard in your territory.</p>
            </div>

            <div className="calc-body">
              <div className="slider-control">
                <div className="slider-label-row">
                  <span>Workers onboarded per week:</span>
                  <span className="slider-value">{weeklyWorkers} workers</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="1"
                  value={weeklyWorkers}
                  onChange={(e) => setWeeklyWorkers(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-hints">
                  <span>Part-time (5-10/wk)</span>
                  <span>Active Field Agent (20-30/wk)</span>
                  <span>Full-Time Pro (40+/wk)</span>
                </div>
              </div>

              <div className="calc-results-grid">
                <div className="result-box">
                  <span className="result-period">Weekly Payout (Every Monday)</span>
                  <span className="result-amount">₹{calculatedWeekly.toLocaleString('en-IN')}</span>
                  <span className="result-sub">Direct UPI to Mobile</span>
                </div>
                <div className="result-box featured-result">
                  <span className="result-period">Estimated Monthly Earnings</span>
                  <span className="result-amount">₹{calculatedMonthly.toLocaleString('en-IN')}</span>
                  <span className="result-sub">{weeklyWorkers * 4} Genuine Workers / Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Model Works (4 Steps) */}
      <section className="partner-process-section">
        <div className="container">
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
                Fill out the simple partner registration form below, verify your mobile number with OTP, and get your unique Partner Referral Code.
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
      </section>

      {/* Define What Qualifies for ₹50 */}
      <section className="partner-qualification-section">
        <div className="container">
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
      </section>

      {/* Anti-Fraud Guardrails (Most Critical Section) */}
      <section className="partner-antifraud-section">
        <div className="container">
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
      </section>

      {/* Main Registration Form Section */}
      <section className="partner-registration-section" id="register-form">
        <div className="container">
          <div className="registration-container">
            <div className="form-intro text-center">
              <span className="form-eyebrow">Apply Now</span>
              <h2>Sales Partner Registration Form</h2>
              <p>Start onboarding skilled workers in your locality and receive direct UPI commissions.</p>
            </div>

            {submittedPartner ? (
              <div className="submission-success-card">
                <div className="success-icon-wrap">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#10B981" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 6-6" />
                  </svg>
                </div>
                <h3>Registration Application Received!</h3>
                <p className="success-partner-name">
                  Welcome to the team, <strong>{submittedPartner.fullName}</strong>.
                </p>

                <div className="referral-code-display-box">
                  <span className="code-label">Your Provisional Partner Referral Code:</span>
                  <div className="code-value-row">
                    <span className="code-text">{submittedPartner.referralCode}</span>
                    <button
                      type="button"
                      className="btn-copy-code"
                      onClick={copyReferralCode}
                    >
                      {copiedCode ? '✓ Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <span className="code-subtext">
                    Ask workers to input this code during registration, or use your custom onboarding link.
                  </span>
                </div>

                <div className="submitted-details-summary">
                  <div className="detail-row">
                    <span>Registered Mobile:</span>
                    <strong>+91 {submittedPartner.mobile} (Verified)</strong>
                  </div>
                  <div className="detail-row">
                    <span>Commission Payout UPI:</span>
                    <strong>{submittedPartner.effectiveUpi}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Operating Territory:</span>
                    <strong>{submittedPartner.area}, {submittedPartner.city}, {submittedPartner.state}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Commission Rate:</span>
                    <strong className="text-success">₹50 per qualified worker (Weekly on Monday)</strong>
                  </div>
                </div>

                <div className="next-steps-guide">
                  <h4>What happens next?</h4>
                  <ol>
                    <li>Our partner team will verify your territory details within 24 hours.</li>
                    <li>You will receive an onboarding briefing message on WhatsApp with digital pamphlets and onboarding guidelines.</li>
                    <li>Start onboarding local workers: ensure their profiles are 100% complete with 2 real work photos.</li>
                    <li>Track your verified completions and receive your UPI payout every Monday.</li>
                  </ol>
                </div>

                <div className="success-action-btns">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSubmittedPartner(null);
                      setOtpStep('unverified');
                      setFormData({
                        fullName: '',
                        mobile: '',
                        state: 'Maharashtra',
                        city: '',
                        area: '',
                        preferredWorkingArea: '',
                        salesExperience: 'none',
                        customUpi: '',
                        agreeNoFee: false,
                        agreeSevenDayRetention: false,
                        agreeAntiFraud: false,
                        agreeGeneralTerms: false
                      });
                    }}
                  >
                    Submit Another Application
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onNavigate('home')}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <form className="partner-form-card" onSubmit={handleSubmit} noValidate>
                {formError && (
                  <div className="form-alert-error" role="alert">
                    <span className="alert-icon">⚠️</span>
                    <span>{formError}</span>
                  </div>
                )}

                {/* Field 1: Full Name */}
                <div className="form-group">
                  <label htmlFor={fullNameId}>
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id={fullNameId}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Ramesh Sharma"
                    className="form-control"
                    required
                  />
                  <span className="field-hint">Identify yourself as the official registered partner.</span>
                </div>

                {/* Field 2: Mobile Number with OTP Verification */}
                <div className="form-group">
                  <label htmlFor={mobileId}>
                    Mobile Number (for OTP & UPI payout) <span className="req">*</span>
                  </label>
                  <div className="mobile-otp-row">
                    <div className="mobile-prefix-input">
                      <span className="prefix">+91</span>
                      <input
                        type="tel"
                        id={mobileId}
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className="form-control"
                        maxLength={10}
                        disabled={otpStep === 'verified'}
                        required
                      />
                    </div>

                    {otpStep === 'unverified' && (
                      <button
                        type="button"
                        className="btn-send-otp"
                        onClick={handleSendOtp}
                      >
                        Verify OTP
                      </button>
                    )}

                    {otpStep === 'verified' && (
                      <div className="badge-verified">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>

                  {otpStep === 'otp_sent' && (
                    <div className="inline-otp-box">
                      <span className="otp-prompt">Enter 4 or 6-digit OTP sent to +91 {formData.mobile}:</span>
                      <div className="otp-input-row">
                        <label htmlFor={otpInputId} className="visually-hidden">
                          Enter OTP code
                        </label>
                        <input
                          type="text"
                          id={otpInputId}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="Enter OTP (e.g. 1234)"
                          className="form-control otp-input"
                          maxLength={6}
                        />
                        <button
                          type="button"
                          className="btn-verify-otp"
                          onClick={handleVerifyOtp}
                        >
                          Confirm OTP
                        </button>
                      </div>
                      <div className="otp-sub-actions">
                        <button
                          type="button"
                          className="btn-text"
                          disabled={resendCountdown > 0}
                          onClick={handleSendOtp}
                        >
                          {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend OTP'}
                        </button>
                        <button
                          type="button"
                          className="btn-text"
                          onClick={() => setOtpStep('unverified')}
                        >
                          Change Number
                        </button>
                      </div>
                    </div>
                  )}

                  {otpError && <div className="field-error">{otpError}</div>}
                  <span className="field-hint">
                    Commissions will be sent to the UPI account linked with this number.
                  </span>
                </div>

                {/* Field 3: State, City, Area (Operating Territory) */}
                <div className="form-row-three">
                  <div className="form-group">
                    <label htmlFor={stateId}>
                      State <span className="req">*</span>
                    </label>
                    <select
                      id={stateId}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={cityId}>
                      City <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id={cityId}
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Pune, Mumbai, Jaipur"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={areaId}>
                      Operating Area / Neighborhood <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id={areaId}
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. Kothrud / Andheri"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Field 4: Preferred Working Area (Reach) */}
                <div className="form-group">
                  <label htmlFor={preferredAreaId}>
                    Preferred Working Area & Reach <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id={preferredAreaId}
                    name="preferredWorkingArea"
                    value={formData.preferredWorkingArea}
                    onChange={handleInputChange}
                    placeholder="e.g. Hardware market, Shivaji Nagar, Sector 15-22, Industrial belt"
                    className="form-control"
                    required
                  />
                  <span className="field-hint">Help us understand which local markets or societies you frequently visit.</span>
                </div>

                {/* Field 5: Previous Sales Experience (Optional) */}
                <div className="form-group">
                  <label htmlFor={experienceId}>
                    Previous Sales / Field Experience <span className="opt">(Optional)</span>
                  </label>
                  <select
                    id={experienceId}
                    name="salesExperience"
                    value={formData.salesExperience}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Detail: UPI Confirmation */}
                <div className="form-group">
                  <label htmlFor={upiId}>
                    Custom UPI ID for Payouts <span className="opt">(Optional - defaults to mobile@upi)</span>
                  </label>
                  <input
                    type="text"
                    id={upiId}
                    name="customUpi"
                    value={formData.customUpi}
                    onChange={handleInputChange}
                    placeholder={`e.g. ${formData.mobile || '9876543210'}@paytm or @oksbi`}
                    className="form-control"
                  />
                  <span className="field-hint">
                    If left blank, ₹50 payments are automatically routed to your verified mobile number via UPI.
                  </span>
                </div>

                {/* Agreement & Anti-Fraud Acceptance (Mandatory) */}
                <div className="terms-acceptance-block">
                  <h4 className="terms-block-title">Program Rules & Declarations</h4>

                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="agreeNoFee"
                      checked={formData.agreeNoFee}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkbox-label-text">
                      <strong>Strict Zero-Fee Guarantee:</strong> I understand that creating a ProWorker profile is 100% FREE for workers. I will NEVER ask, collect, or accept any money or fee from workers on behalf of ProWorker.
                    </span>
                  </label>

                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="agreeSevenDayRetention"
                      checked={formData.agreeSevenDayRetention}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkbox-label-text">
                      <strong>Verification & 7-Day Retention:</strong> I understand that ₹50 is paid only after profile verification passes the 9-point criteria and the worker remains active for 7 full days.
                    </span>
                  </label>

                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="agreeAntiFraud"
                      checked={formData.agreeAntiFraud}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkbox-label-text">
                      <strong>Anti-Fraud Policy:</strong> I understand that creating fake accounts, duplicate profiles, self-referrals, or using stock images is fraud. ProWorker will forfeit all commissions and permanently ban violators.
                    </span>
                  </label>

                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="agreeGeneralTerms"
                      checked={formData.agreeGeneralTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkbox-label-text">
                      I accept the ProWorker Growth Partner Agreement and Code of Conduct.
                    </span>
                  </label>
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit-partner"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading-spinner-text">Registering Application...</span>
                    ) : (
                      'Submit Registration & Generate Partner Code'
                    )}
                  </button>
                  <p className="privacy-note">
                    Your details are safe. We review every application within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Terms & Conditions & Anti-Fraud Details Section */}
      <section className="partner-terms-section">
        <div className="container">
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
      </section>

      {/* FAQ Section */}
      <section className="partner-faq-section">
        <div className="container">
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
      </section>

      {/* Bottom CTA */}
      <section className="partner-bottom-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2>Ready to Start Earning with ProWorker?</h2>
            <p>Join hundreds of local partners helping skilled tradespeople get discovered.</p>
            <a href="#register-form" className="btn btn-primary btn-lg">
              Register as Growth Partner Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SalesPartner;
