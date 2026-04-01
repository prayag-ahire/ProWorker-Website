import { useState } from 'react';
import './DeleteAccount.css';

function DeleteAccount() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [deletionRequested, setDeletionRequested] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');

        if (!email || !password) {
            setLoginError('Please fill in all fields');
            return;
        }

        // Simulate login - In a real app, this would call an API
        if (email && password.length >= 6) {
            setIsLoggedIn(true);
            setEmail('');
            setPassword('');
        } else {
            setLoginError('Invalid email or password');
        }
    };

    const handleDeleteRequest = (e) => {
        e.preventDefault();
        setDeleteError('');

        if (!confirmDelete) {
            setDeleteError('Please confirm that you understand your account will be deleted');
            return;
        }

        // Simulate delete request - In a real app, this would call an API
        setDeletionRequested(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setDeletionRequested(false);
        setConfirmDelete(false);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="delete-account-page">
            <div className="delete-account-hero">
                <div className="container">
                    <div className="delete-account-hero-content">
                        <span className="delete-account-badge">Account Management</span>
                        <h1 className="delete-account-title">Delete Account</h1>
                        <p className="delete-account-subtitle">
                            We understand your decision. Here you can request permanent deletion of your ProWorker account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="delete-account-body">
                <div className="container">
                    <div className="delete-account-layout">
                        <div className="delete-account-content">
                            {!isLoggedIn ? (
                                <section className="delete-account-section">
                                    <div className="section-card">
                                        <h2>Sign In to Your Account</h2>
                                        <p className="section-description">
                                            Please log in with your ProWorker account credentials to proceed with account deletion.
                                        </p>

                                        <form onSubmit={handleLogin} className="login-form">
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    className="form-input"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Enter your password"
                                                    className="form-input"
                                                />
                                            </div>

                                            {loginError && (
                                                <div className="error-message">
                                                    <span className="error-icon">⚠️</span>
                                                    {loginError}
                                                </div>
                                            )}

                                            <button type="submit" className="btn btn-primary">
                                                Sign In
                                            </button>
                                        </form>

                                        <p className="form-hint">
                                            Don't have an account? <a href="/">Create one here</a>
                                        </p>
                                    </div>
                                </section>
                            ) : !deletionRequested ? (
                                <section className="delete-account-section">
                                    <div className="section-card">
                                        <div className="success-banner">
                                            <span className="success-icon">✓</span>
                                            <p>You are signed in as <strong>{email || 'User'}</strong></p>
                                        </div>

                                        <h2>Request Account Deletion</h2>
                                        <p className="section-description">
                                            Once you request account deletion, your account and all associated data will be permanently deleted after 30 days.
                                        </p>

                                        <form onSubmit={handleDeleteRequest} className="delete-form">
                                            <div className="warning-box">
                                                <h3>⚠️ Important Information</h3>
                                                <ul className="info-list">
                                                    <li><strong>30-Day Grace Period:</strong> Your account will be deleted after 30 days from the deletion request date</li>
                                                    <li><strong>Data Deletion:</strong> All personal information, messages, and transaction history will be permanently removed</li>
                                                    <li><strong>Irreversible:</strong> This action cannot be undone. You will lose access to your account immediately</li>
                                                    <li><strong>Outstanding Bookings:</strong> Any active bookings or pending transactions should be settled before deletion</li>
                                                    <li><strong>Worker Ratings:</strong> Ratings and reviews you've made will remain on the platform (anonymized)</li>
                                                </ul>
                                            </div>

                                            <div className="checkbox-group">
                                                <input
                                                    type="checkbox"
                                                    id="confirm-delete"
                                                    checked={confirmDelete}
                                                    onChange={(e) => setConfirmDelete(e.target.checked)}
                                                    className="form-checkbox"
                                                />
                                                <label htmlFor="confirm-delete" className="checkbox-label">
                                                    I understand that my account and all my data will be permanently deleted after 30 days, and this action cannot be reversed
                                                </label>
                                            </div>

                                            {deleteError && (
                                                <div className="error-message">
                                                    <span className="error-icon">⚠️</span>
                                                    {deleteError}
                                                </div>
                                            )}

                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-danger">
                                                    Request Account Deletion
                                                </button>
                                                <button type="button" onClick={handleLogout} className="btn btn-secondary">
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            ) : (
                                <section className="delete-account-section">
                                    <div className="section-card success-card">
                                        <div className="success-header">
                                            <span className="large-success-icon">✓</span>
                                            <h2>Deletion Request Submitted</h2>
                                        </div>

                                        <div className="deletion-info">
                                            <p className="main-message">
                                                Your account deletion request has been submitted successfully.
                                            </p>

                                            <div className="timeline-box">
                                                <h3>What Happens Next</h3>
                                                <div className="timeline">
                                                    <div className="timeline-item">
                                                        <div className="timeline-marker">1</div>
                                                        <div className="timeline-content">
                                                            <p><strong>Request Confirmed</strong></p>
                                                            <p className="timeline-text">Your deletion request has been logged in our system</p>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item">
                                                        <div className="timeline-marker">2</div>
                                                        <div className="timeline-content">
                                                            <p><strong>30-Day Waiting Period</strong></p>
                                                            <p className="timeline-text">Your account will be active for 30 more days. You can log in anytime to cancel this request</p>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item">
                                                        <div className="timeline-marker">3</div>
                                                        <div className="timeline-content">
                                                            <p><strong>Account Permanently Deleted</strong></p>
                                                            <p className="timeline-text">After 30 days, your account and all data will be permanently removed</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="info-box">
                                                <h4>Deletion Date</h4>
                                                <p className="deletion-date">
                                                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>

                                            <div className="contact-info">
                                                <h4>Have Questions?</h4>
                                                <p>
                                                    If you need to cancel this deletion request or have any concerns, please contact our support team
                                                    at <strong>support@proworker.com</strong> within the 30-day period.
                                                </p>
                                            </div>
                                        </div>

                                        <button onClick={handleLogout} className="btn btn-primary">
                                            Return to Home
                                        </button>
                                    </div>
                                </section>
                            )}

                            <section className="delete-account-section faq-section">
                                <h2>Frequently Asked Questions</h2>
                                <div className="faq-grid">
                                    <div className="faq-item">
                                        <h4>Can I cancel the deletion?</h4>
                                        <p>
                                            Yes, you can log in to your account anytime during the 30-day period and cancel the deletion request. Contact support if needed.
                                        </p>
                                    </div>
                                    <div className="faq-item">
                                        <h4>What data is deleted?</h4>
                                        <p>
                                            All personal information including profile, addresses, phone numbers, and transaction history will be deleted. Anonymized reviews remain.
                                        </p>
                                    </div>
                                    <div className="faq-item">
                                        <h4>Can I use the same email again?</h4>
                                        <p>
                                            After 30 days, you can register a new account with the same email address.
                                        </p>
                                    </div>
                                    <div className="faq-item">
                                        <h4>What about pending bookings?</h4>
                                        <p>
                                            Please cancel or complete all pending bookings before requesting deletion to avoid any service disruptions.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;
