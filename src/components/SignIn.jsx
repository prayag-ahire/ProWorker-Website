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
                ? 'Sign in with your mobile number to manage your professional profile'
                : 'Sign in with your mobile number to find nearby skilled workers'}
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
                      <li>✓ Free professional profile and portfolio</li>
                      <li>✓ Set your own prices, hours, and leave days</li>
                      <li>✓ Get discovered by nearby customers</li>
                      <li>✓ Build trust with ratings and reviews</li>
                      <li>✓ Direct inquiries—no commission</li>
                    </>
                  ) : (
                    <>
                      <li>✓ Find nearby skilled workers by distance</li>
                      <li>✓ Compare ratings, reviews, and portfolios</li>
                      <li>✓ See pricing, skills, and availability</li>
                      <li>✓ Contact workers directly—no booking fee</li>
                      <li>✓ Completely free for customers</li>
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
