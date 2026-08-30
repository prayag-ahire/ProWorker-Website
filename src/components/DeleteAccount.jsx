import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useViewMode } from '../context/ViewModeContext';
import OtpLoginForm from './OtpLoginForm';
import './DeleteAccount.css';

function DeleteAccount() {
    const { user, isAuthenticated, deleteAccount, logout, error } = useAuth();
    const viewMode = useViewMode();
    const [deletionRequested, setDeletionRequested] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const signedInLabel = user?.mobile || user?.email || user?.name || 'User';
    const signedInRole = user?.role === 'worker' ? 'worker' : 'client';

    const handleDeleteRequest = async (e) => {
        e.preventDefault();
        setDeleteError('');
        setIsDeleting(true);

        if (!confirmDelete) {
            setDeleteError('Please confirm that you understand your account will be deleted');
            setIsDeleting(false);
            return;
        }

        try {
            await deleteAccount();
            setDeletionRequested(true);
        } catch (err) {
            setDeleteError(err.message || 'Failed to delete account');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleLogout = () => {
        logout();
        setDeletionRequested(false);
        setConfirmDelete(false);
        setDeleteError('');
    };

    return (
        <div className="delete-account-page">
            <div className="delete-account-hero">
                <div className="container">
                    <div className="delete-account-hero-content">
                        <span className="delete-account-badge">Account Management</span>
                        <h1 className="delete-account-title">Delete Account</h1>
                        <p className="delete-account-subtitle">
                            Clients and workers can sign in with OTP and request permanent deletion of their ProWorker account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="delete-account-body">
                <div className="container">
                    <div className="delete-account-layout">
                        <div className="delete-account-content">
                            {!isAuthenticated && !deletionRequested ? (
                                <section className="delete-account-section">
                                    <div className="section-card">
                                        <h2>Sign In to Your Account</h2>
                                        <p className="section-description">
                                            Choose Client or Worker, then verify your mobile number with OTP to continue.
                                        </p>

                                        <OtpLoginForm
                                            defaultRole={viewMode}
                                            buttonClassName="btn btn-primary"
                                        />
                                    </div>
                                </section>
                            ) : !deletionRequested ? (
                                <section className="delete-account-section">
                                    <div className="section-card">
                                        <div className="success-banner">
                                            <span className="success-icon">✓</span>
                                            <p>
                                                You are signed in as <strong>{signedInLabel}</strong>
                                                {' '}({signedInRole})
                                            </p>
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

                                            {(deleteError || error) && (
                                                <div className="error-message">
                                                    <span className="error-icon">⚠️</span>
                                                    {deleteError || error}
                                                </div>
                                            )}

                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-danger" disabled={isDeleting}>
                                                    {isDeleting ? 'Processing...' : 'Request Account Deletion'}
                                                </button>
                                                <button type="button" onClick={handleLogout} className="btn btn-secondary" disabled={isDeleting}>
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
                                        <h4>Can I use the same mobile number again?</h4>
                                        <p>
                                            After 30 days, you can register a new account with the same mobile number.
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
