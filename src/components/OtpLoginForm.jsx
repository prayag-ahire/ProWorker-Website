import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { normalizeMobile } from '../services/authService';
import './OtpLoginForm.css';

const RESEND_SECONDS = 30;

function OtpLoginForm({
  defaultRole = 'client',
  onSuccess,
  buttonClassName = 'btn btn-primary',
  allowRoleSwitch = true,
}) {
  const { sendOtp, verifyOtp, isLoading } = useAuth();
  const [role, setRole] = useState(defaultRole === 'worker' ? 'worker' : 'client');
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpId, setOtpId] = useState('');
  const [formError, setFormError] = useState('');
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    setRole(defaultRole === 'worker' ? 'worker' : 'client');
  }, [defaultRole]);

  useEffect(() => {
    if (resendIn <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendIn]);

  const resetOtpState = () => {
    setStep('mobile');
    setOtp('');
    setOtpId('');
    setFormError('');
  };

  const handleRoleChange = (nextRole) => {
    if (nextRole === role) {
      return;
    }

    setRole(nextRole);
    resetOtpState();
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setFormError('');

    const normalizedMobile = normalizeMobile(mobile);
    if (normalizedMobile.length !== 10) {
      setFormError('Enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await sendOtp(normalizedMobile, role);
      setMobile(normalizedMobile);
      setOtpId(response.OTPID);
      setOtp('');
      setStep('otp');
      setResendIn(RESEND_SECONDS);
    } catch (err) {
      setFormError(err.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!otp.trim()) {
      setFormError('Enter the OTP sent to your mobile number');
      return;
    }

    try {
      await verifyOtp(otpId, otp, role, mobile);
      onSuccess?.({ role, mobile });
    } catch (err) {
      setFormError(err.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || isLoading) {
      return;
    }

    setFormError('');

    try {
      const response = await sendOtp(mobile, role);
      setOtpId(response.OTPID);
      setOtp('');
      setResendIn(RESEND_SECONDS);
    } catch (err) {
      setFormError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="otp-login-form">
      {allowRoleSwitch && (
        <div className="otp-role-toggle" role="tablist" aria-label="Account type">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'client'}
            className={`otp-role-option ${role === 'client' ? 'active' : ''}`}
            onClick={() => handleRoleChange('client')}
          >
            Client
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'worker'}
            className={`otp-role-option ${role === 'worker' ? 'active' : ''}`}
            onClick={() => handleRoleChange('worker')}
          >
            Worker
          </button>
        </div>
      )}

      {step === 'mobile' ? (
        <form onSubmit={handleSendOtp} className="otp-form">
          <div className="form-group">
            <label htmlFor="otp-mobile">Mobile Number</label>
            <input
              type="tel"
              id="otp-mobile"
              name="mobile"
              inputMode="numeric"
              autoComplete="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Enter 10-digit mobile number"
              className="form-input"
              maxLength={13}
            />
          </div>

          {formError && <div className="otp-form-error">{formError}</div>}

          <button type="submit" className={buttonClassName} disabled={isLoading}>
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="otp-form">
          <p className="otp-sent-hint">
            Enter the OTP sent to <strong>{mobile}</strong> for your {role} account.
          </p>

          <div className="form-group">
            <label htmlFor="otp-code">OTP</label>
            <input
              type="text"
              id="otp-code"
              name="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter OTP"
              className="form-input otp-code-input"
            />
          </div>

          {formError && <div className="otp-form-error">{formError}</div>}

          <button type="submit" className={buttonClassName} disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="otp-secondary-actions">
            <button
              type="button"
              className="otp-text-button"
              onClick={handleResend}
              disabled={isLoading || resendIn > 0}
            >
              {resendIn > 0 ? `Resend OTP in ${resendIn}s` : 'Resend OTP'}
            </button>
            <button
              type="button"
              className="otp-text-button"
              onClick={resetOtpState}
              disabled={isLoading}
            >
              Change number
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default OtpLoginForm;
