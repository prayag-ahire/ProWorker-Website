import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

function SignIn({ onNavigate }) {
  const { signIn, signUp, error, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Email and password are required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email');
      return false;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }

    if (isSignUp) {
      if (!formData.name) {
        setFormError('Name is required');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.name);
      } else {
        await signIn(formData.email, formData.password);
      }

      // Reset form and navigate
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      });

      // Navigate to home after successful auth
      onNavigate('home');
    } catch (err) {
      // Error is handled by context
    }
  };

  const displayError = formError || error;

  return (
    <div className="signin-page">
      <div className="signin-hero">
        <div className="container">
          <div className="signin-hero-content">
            <span className="signin-badge">Join ProWorker</span>
            <h1 className="signin-title">
              {isSignUp ? 'Create Your Account' : 'Sign In'}
            </h1>
            <p className="signin-subtitle">
              {isSignUp
                ? 'Get started with ProWorker and find trusted professionals'
                : 'Access your ProWorker account'}
            </p>
          </div>
        </div>
      </div>

      <div className="signin-body">
        <div className="container">
          <div className="signin-layout">
            <div className="signin-form-container">
              <div className="signin-card">
                <form onSubmit={handleSubmit} className="signin-form">
                  {isSignUp && (
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="form-input"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="form-input"
                    />
                  </div>

                  {isSignUp && (
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="form-input"
                      />
                    </div>
                  )}

                  {displayError && (
                    <div className="form-error">
                      {displayError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="signin-button"
                  >
                    {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                </form>

                <div className="signin-toggle">
                  <p>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setFormData({
                          email: '',
                          password: '',
                          confirmPassword: '',
                          name: '',
                        });
                        setFormError('');
                      }}
                      className="toggle-button"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="signin-info">
              <div className="info-card">
                <h3>Why Join ProWorker?</h3>
                <ul className="info-list">
                  <li>✓ Access to trusted professionals</li>
                  <li>✓ Secure payment processing</li>
                  <li>✓ Real-time worker tracking</li>
                  <li>✓ Professional support 24/7</li>
                  <li>✓ Verified service providers</li>
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
