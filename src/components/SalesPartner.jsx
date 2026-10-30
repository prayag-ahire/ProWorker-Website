import { useState, useId, useEffect } from 'react';
import { normalizeMobile } from '../services/authService';
import { partnerService } from '../services/partnerService';
import './SalesPartner.css';

const RESEND_SECONDS = 30;
const EMPTY_FORM = {
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
};

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

const INFO_LINKS = [
  {
    href: '/partner/guide#how-it-works',
    title: 'How it works',
    desc: '4 simple steps from signup to weekly UPI payout'
  },
  {
    href: '/partner/guide#qualification',
    title: 'What qualifies for ₹50',
    desc: 'Profile checklist workers must complete'
  },
  {
    href: '/partner/guide#anti-fraud',
    title: 'Anti-fraud rules',
    desc: 'Zero tolerance policy for fake referrals'
  },
  {
    href: '/partner/guide#terms',
    title: 'Terms & conduct',
    desc: 'Zero-fee rule, retention, and penalties'
  },
  {
    href: '/partner/guide#faq',
    title: 'FAQ',
    desc: 'Payouts, products, and common questions'
  }
];

function SalesPartner() {
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  const [otpStep, setOtpStep] = useState('unverified');
  const [otpId, setOtpId] = useState('');
  const [verifiedMobile, setVerifiedMobile] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [submittedPartner, setSubmittedPartner] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

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

  useEffect(() => {
    if (resendCountdown <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(
      () => setResendCountdown((value) => value - 1),
      1000
    );
    return () => window.clearTimeout(timer);
  }, [resendCountdown]);

  const resetOtpState = () => {
    setOtpStep('unverified');
    setOtpId('');
    setVerifiedMobile('');
    setEnteredOtp('');
    setOtpError('');
    setResendCountdown(0);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formError) setFormError('');

    if (name === 'mobile' && otpStep !== 'unverified') {
      resetOtpState();
    }
  };

  const buildRegisterPayload = () => {
    const cleanMobile = normalizeMobile(formData.mobile);
    return {
      fullName: formData.fullName.trim(),
      mobileNumber: cleanMobile,
      state: formData.state,
      city: formData.city.trim(),
      area: formData.area.trim(),
      preferredWorkingArea: formData.preferredWorkingArea.trim(),
      salesExperience: formData.salesExperience,
      upiId: formData.customUpi.trim() || `${cleanMobile}@upi`,
      agreementAccepted:
        formData.agreeNoFee &&
        formData.agreeSevenDayRetention &&
        formData.agreeAntiFraud &&
        formData.agreeGeneralTerms,
    };
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      return 'Please enter your full name (at least 3 characters).';
    }

    const cleanMobile = normalizeMobile(formData.mobile);
    if (cleanMobile.length !== 10) {
      return 'Please provide a valid 10-digit mobile number.';
    }

    if (otpStep !== 'verified' || verifiedMobile !== cleanMobile) {
      return 'Please verify your mobile number with OTP before submitting.';
    }

    if (!formData.city.trim() || !formData.area.trim()) {
      return 'Please enter both your city and operating area.';
    }

    if (!formData.preferredWorkingArea.trim()) {
      return 'Please specify your preferred working area or market reach.';
    }

    if (
      !formData.agreeNoFee ||
      !formData.agreeSevenDayRetention ||
      !formData.agreeAntiFraud ||
      !formData.agreeGeneralTerms
    ) {
      return 'You must accept all terms, especially the zero-fee rule and anti-fraud policy.';
    }

    return '';
  };

  const handleSendOtp = async () => {
    const cleanMobile = normalizeMobile(formData.mobile);
    if (cleanMobile.length !== 10) {
      setOtpError('Please enter a valid 10-digit mobile number first.');
      return;
    }

    setOtpError('');
    setIsSendingOtp(true);

    try {
      const otpSession = await partnerService.sendOtp(cleanMobile);
      setOtpId(otpSession.otpId);
      setEnteredOtp('');
      setOtpStep('otp_sent');
      setResendCountdown(RESEND_SECONDS);
    } catch (err) {
      setOtpError(err.message || 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpId) {
      setOtpError('OTP session expired. Please request a new code.');
      return;
    }

    if (!enteredOtp || enteredOtp.trim().length < 4) {
      setOtpError('Enter the 4 or 6-digit OTP sent to your mobile.');
      return;
    }

    setOtpError('');
    setIsVerifyingOtp(true);

    try {
      await partnerService.verifyOtp({
        otpId,
        otp: enteredOtp,
      });

      const cleanMobile = normalizeMobile(formData.mobile);
      setVerifiedMobile(cleanMobile);
      setOtpStep('verified');
      setEnteredOtp('');
      setOtpId('');
    } catch (err) {
      setOtpError(err.message || 'OTP verification failed');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || isSendingOtp) {
      return;
    }
    await handleSendOtp();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildRegisterPayload();
      const registration = await partnerService.register(payload);

      setSubmittedPartner({
        fullName: payload.fullName,
        mobile: payload.mobileNumber,
        state: payload.state,
        city: payload.city,
        area: payload.area,
        preferredWorkingArea: payload.preferredWorkingArea,
        referralCode: registration.referralCode,
        effectiveUpi: registration.upiId || payload.upiId,
      });
    } catch (err) {
      setFormError(err.message || 'Failed to register as Growth Partner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetRegistration = () => {
    setSubmittedPartner(null);
    resetOtpState();
    setFormError('');
    setFormData({ ...EMPTY_FORM });
  };

  const copyReferralCode = () => {
    if (!submittedPartner?.referralCode) return;
    navigator.clipboard.writeText(submittedPartner.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="partner-page">
      <section className="partner-hero partner-hero-compact">
        <div className="container">
          <div className="partner-hero-badge">
            <span className="hero-badge-dot"></span>
            ProWorker Growth Partners Program
          </div>
          <h1 className="partner-hero-title">
            Earn <span className="highlight-text">₹50</span> for Every Genuine Skilled Worker You Onboard
          </h1>
          <p className="partner-hero-subtitle">
            Help local tradespeople create a free digital profile. Direct weekly UPI payouts to your mobile.
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
          </div>

          <div className="partner-hero-actions">
            <a href="#register-form" className="btn btn-primary btn-lg">
              Apply as Growth Partner →
            </a>
            <a href="/partner/guide" className="btn btn-secondary btn-lg partner-hero-secondary">
              Program details
            </a>
          </div>
        </div>
      </section>

      <section className="partner-calculator-section partner-calculator-compact">
        <div className="container">
          <div className="calc-card">
            <div className="calc-header">
              <span className="calc-tag">Earnings Calculator</span>
              <h2>How much can you earn each month?</h2>
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
              </div>

              <div className="calc-results-grid">
                <div className="result-box">
                  <span className="result-period">Weekly Payout</span>
                  <span className="result-amount">₹{calculatedWeekly.toLocaleString('en-IN')}</span>
                </div>
                <div className="result-box featured-result">
                  <span className="result-period">Monthly Estimate</span>
                  <span className="result-amount">₹{calculatedMonthly.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-info-links-section">
        <div className="container">
          <div className="section-head text-center">
            <span className="section-eyebrow">Learn More</span>
            <h2>Program details</h2>
            <p>Keep this page focused on applying. Open any topic below for full details.</p>
          </div>

          <div className="partner-info-links-grid">
            {INFO_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="partner-info-link-card">
                <span className="info-link-title">{link.title}</span>
                <span className="info-link-desc">{link.desc}</span>
                <span className="info-link-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

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
                    onClick={resetRegistration}
                  >
                    Submit Another Application
                  </button>
                  <a href="/partner/guide" className="btn btn-secondary">
                    Read Program Guide
                  </a>
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
                        inputMode="numeric"
                        disabled={otpStep === 'verified'}
                        required
                      />
                    </div>

                    {otpStep === 'unverified' && (
                      <button
                        type="button"
                        className="btn-send-otp"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                      >
                        {isSendingOtp ? 'Sending...' : 'Verify OTP'}
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
                      <span className="otp-prompt">
                        Enter OTP sent to +91 {formData.mobile}:
                      </span>
                      <div className="otp-input-row">
                        <label htmlFor={otpInputId} className="visually-hidden">
                          Enter OTP code
                        </label>
                        <input
                          type="text"
                          id={otpInputId}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="Enter OTP"
                          className="form-control otp-input"
                          maxLength={6}
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          disabled={isVerifyingOtp}
                        />
                        <button
                          type="button"
                          className="btn-verify-otp"
                          onClick={handleVerifyOtp}
                          disabled={isVerifyingOtp || isSendingOtp}
                        >
                          {isVerifyingOtp ? 'Verifying...' : 'Confirm OTP'}
                        </button>
                      </div>
                      <div className="otp-sub-actions">
                        <button
                          type="button"
                          className="btn-text"
                          disabled={resendCountdown > 0 || isSendingOtp || isVerifyingOtp}
                          onClick={handleResendOtp}
                        >
                          {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend OTP'}
                        </button>
                        <button
                          type="button"
                          className="btn-text"
                          disabled={isSendingOtp || isVerifyingOtp}
                          onClick={resetOtpState}
                        >
                          Change Number
                        </button>
                      </div>
                    </div>
                  )}

                  {otpError && <div className="field-error">{otpError}</div>}
                  <span className="field-hint">
                    Verify this number with SMS OTP before submitting. Commissions go to the linked UPI account.
                  </span>
                </div>

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

                <div className="terms-acceptance-block">
                  <h4 className="terms-block-title">Program Rules & Declarations</h4>
                  <p className="terms-block-link">
                    Read full details in the{' '}
                    <a href="/partner/guide#terms">Growth Partner Guide</a>.
                  </p>

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
                      <span className="loading-spinner-text">Submitting Application...</span>
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
    </div>
  );
}

export default SalesPartner;
