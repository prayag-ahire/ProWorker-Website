import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useViewMode } from '../context/ViewModeContext';
import GoogleAuth from './googleAuth';
import OtpLoginForm from './OtpLoginForm';
import './SignIn.css';

function SignIn({ onNavigate }) {
  const { signInWithGoogle } = useAuth();
  const viewMode = useViewMode();
  const [googleError, setGoogleError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleError('');
      await signInWithGoogle(credentialResponse);
      onNavigate('home');
    } catch (err) {
      setGoogleError(err.message || 'Google sign-in failed');
    }
  };

  const handleGoogleError = () => {
    setGoogleError('Google sign-in failed. Please try again.');
  };

  const isWorker = viewMode === 'worker';

  return (
    <div className="signin-page">
      <div className="signin-hero">
        <div className="container">
          <div className="signin-hero-content">
            <span className="signin-badge">Join ProWorker</span>
            <h1 className="signin-title">Sign In</h1>
            <p className="signin-subtitle">
              {isWorker
                ? 'Sign in with your mobile number to manage bookings and earnings'
                : 'Sign in with your mobile number to find trusted professionals'}
            </p>
          </div>
        </div>
      </div>

      <div className="signin-body">
        <div className="container">
          <div className="signin-layout">
            <div className="signin-form-container">
              <div className="signin-card">
                <OtpLoginForm
                  defaultRole={isWorker ? 'worker' : 'client'}
                  buttonClassName="signin-button"
                  onSuccess={() => onNavigate('home')}
                />

                <div className="signin-divider" aria-hidden="true">
                  <span>or continue with</span>
                </div>

                {googleError && (
                  <div className="form-error">
                    {googleError}
                  </div>
                )}

                <GoogleAuth
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </div>
            </div>

            <div className="signin-info">
              <div className="info-card">
                <h3>{isWorker ? 'For Professionals' : 'Why Join ProWorker?'}</h3>
                <ul className="info-list">
                  {isWorker ? (
                    <>
                      <li>✓ Keep 100% of what you earn</li>
                      <li>✓ Set your own prices and schedule</li>
                      <li>✓ Build a reputation that belongs to you</li>
                      <li>✓ Get bookings from verified clients</li>
                      <li>✓ Own your professional brand</li>
                    </>
                  ) : (
                    <>
                      <li>✓ Access to trusted professionals</li>
                      <li>✓ Secure payment processing</li>
                      <li>✓ Real-time worker tracking</li>
                      <li>✓ Professional support 24/7</li>
                      <li>✓ Verified service providers</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
