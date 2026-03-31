import './PrivacyPolicy.css';

function PrivacyPolicy() {
    const lastUpdated = 'March 31, 2026';

    return (
        <div className="privacy-page">
            <div className="privacy-hero">
                <div className="container">
                    <div className="privacy-hero-content">
                        <span className="privacy-badge">Legal</span>
                        <h1 className="privacy-title">Privacy Policy</h1>
                        <p className="privacy-subtitle">
                            Your privacy matters to us. This policy explains how ProWorker collects,
                            uses, and protects your personal information.
                        </p>
                        <p className="privacy-meta">Last updated: {lastUpdated}</p>
                    </div>
                </div>
            </div>

            <div className="privacy-body">
                <div className="container">
                    <div className="privacy-layout">
                        <nav className="privacy-toc">
                            <h3>Contents</h3>
                            <ol>
                                <li><a href="#overview">Overview</a></li>
                                <li><a href="#data-collected">Data We Collect</a></li>
                                <li><a href="#how-used">How We Use Your Data</a></li>
                                <li><a href="#third-party">Third-Party Sharing</a></li>
                                <li><a href="#data-retention">Data Retention</a></li>
                                <li><a href="#user-rights">Your Rights</a></li>
                                <li><a href="#security">Data Security</a></li>
                                <li><a href="#children">Children's Privacy</a></li>
                                <li><a href="#changes">Policy Changes</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ol>
                        </nav>

                        <div className="privacy-content">

                            <section id="overview" className="privacy-section">
                                <h2>1. Overview</h2>
                                <p>
                                    ProWorker ("we", "our", or "us") operates a home services marketplace platform
                                    available as a mobile application on Google Play Store. This Privacy Policy
                                    describes how we collect, use, disclose, and safeguard your information when
                                    you use our application and related services.
                                </p>
                                <p>
                                    By using ProWorker, you agree to the collection and use of information in
                                    accordance with this policy. If you do not agree with the terms of this
                                    Privacy Policy, please do not use the application.
                                </p>
                                <div className="privacy-highlight">
                                    <strong>Scope:</strong> This policy applies to all users of the ProWorker
                                    mobile application and website, including both clients seeking home services
                                    and professional workers offering services.
                                </div>
                            </section>

                            <section id="data-collected" className="privacy-section">
                                <h2>2. Data We Collect</h2>
                                <p>
                                    We collect several types of information to provide and improve our services.
                                    The categories of personal data we collect include:
                                </p>

                                <h3>2.1 Personal Identification Information</h3>
                                <ul>
                                    <li><strong>Full name</strong> — used to identify your account and display on your profile</li>
                                    <li><strong>Email address</strong> — for account creation, login, and communication</li>
                                    <li><strong>Phone number</strong> — for account verification and service coordination</li>
                                    <li><strong>Profile photo</strong> — optional, used to personalise your public profile</li>
                                    <li><strong>Government ID / verification documents</strong> — collected from workers for background verification (stored securely, not shared publicly)</li>
                                </ul>

                                <h3>2.2 Contact and Address Information</h3>
                                <ul>
                                    <li><strong>Home or service address</strong> — required to match you with workers in your area</li>
                                    <li><strong>City and PIN code</strong> — for service availability filtering</li>
                                    <li><strong>Billing address</strong> — associated with payment transactions</li>
                                </ul>

                                <h3>2.3 Location Data</h3>
                                <ul>
                                    <li><strong>Precise GPS location</strong> — collected with your permission when the app is in use, to show nearby workers and provide accurate service routing</li>
                                    <li><strong>Approximate location</strong> — derived from network information to improve search results</li>
                                    <li>We do <strong>not</strong> collect background location data when the app is not in active use</li>
                                </ul>

                                <h3>2.4 Payment Information</h3>
                                <ul>
                                    <li><strong>Transaction records</strong> — booking amounts, timestamps, and service categories</li>
                                    <li><strong>Payment method type</strong> — e.g., UPI, card, or wallet (we do not store full card numbers; payments are processed by certified third-party gateways)</li>
                                    <li><strong>Payout details for workers</strong> — bank account or UPI ID for disbursing earnings</li>
                                </ul>

                                <h3>2.5 Usage and Device Information</h3>
                                <ul>
                                    <li>Device type, operating system, and app version</li>
                                    <li>IP address and network type</li>
                                    <li>App usage patterns, feature interactions, and session duration</li>
                                    <li>Crash reports and diagnostic logs</li>
                                </ul>

                                <h3>2.6 Communications</h3>
                                <ul>
                                    <li>Messages exchanged between clients and workers via in-app chat</li>
                                    <li>Customer support tickets and correspondence</li>
                                    <li>Ratings and reviews you submit</li>
                                </ul>
                            </section>

                            <section id="how-used" className="privacy-section">
                                <h2>3. How We Use Your Data</h2>
                                <p>We use the information we collect for the following purposes:</p>

                                <div className="privacy-use-grid">
                                    <div className="privacy-use-card">
                                        <div className="use-icon">🔐</div>
                                        <h4>Account Management</h4>
                                        <p>Create and manage your account, authenticate your identity, and provide access to platform features.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">🔧</div>
                                        <h4>Service Delivery</h4>
                                        <p>Match clients with suitable workers, schedule bookings, and facilitate service completion.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">💳</div>
                                        <h4>Payments</h4>
                                        <p>Process transactions, issue invoices, handle refunds, and disburse payments to workers.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">📍</div>
                                        <h4>Location Services</h4>
                                        <p>Show nearby available workers, provide accurate ETAs, and enable location-based search filtering.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">🛡️</div>
                                        <h4>Safety & Trust</h4>
                                        <p>Verify worker credentials, detect fraud, prevent abuse, and maintain platform integrity.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">📊</div>
                                        <h4>Improvements</h4>
                                        <p>Analyse usage patterns to improve app performance, features, and overall user experience.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">📣</div>
                                        <h4>Communications</h4>
                                        <p>Send service updates, booking confirmations, support responses, and relevant notifications.</p>
                                    </div>
                                    <div className="privacy-use-card">
                                        <div className="use-icon">⚖️</div>
                                        <h4>Legal Compliance</h4>
                                        <p>Meet our obligations under applicable laws, respond to legal requests, and resolve disputes.</p>
                                    </div>
                                </div>

                                <div className="privacy-highlight">
                                    <strong>Marketing:</strong> We may send promotional offers or feature announcements
                                    via email or push notifications. You can opt out at any time through app settings
                                    or by contacting us at <a href="mailto:contact@proworker.in">contact@proworker.in</a>.
                                </div>
                            </section>

                            <section id="third-party" className="privacy-section">
                                <h2>4. Third-Party Sharing</h2>
                                <p>
                                    We do <strong>not</strong> sell your personal data to third parties.
                                    We may share your information with trusted third parties only in the
                                    following circumstances:
                                </p>

                                <h3>4.1 Service Providers</h3>
                                <p>We work with third-party vendors who assist in operating our platform:</p>
                                <ul>
                                    <li>
                                        <strong>Razorpay</strong> — Our primary payment gateway for processing transactions.
                                        Razorpay may collect payment information including card details, UPI IDs, and net banking credentials directly from users.
                                        Razorpay is <strong>PCI-DSS Level 1 compliant</strong> — the highest level of payment security certification.
                                        ProWorker does <strong>not</strong> store raw card data on our servers; all sensitive payment data is handled exclusively by Razorpay.
                                        Please review <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay's Privacy Policy</a> for details on how they handle your payment data.
                                    </li>
                                    <li><strong>Cloud infrastructure</strong> — Servers and databases hosted on AWS, Google Cloud, or equivalent providers</li>
                                    <li><strong>Analytics</strong> — Firebase Analytics, Google Analytics for anonymised usage statistics</li>
                                    <li><strong>Push notifications</strong> — Firebase Cloud Messaging (FCM) for delivering alerts</li>
                                    <li><strong>Communication</strong> — SMS/OTP services (e.g., Twilio, MSG91) for verification</li>
                                </ul>
                                <p>All service providers are contractually obligated to handle data securely and only as directed by us.</p>

                                <h3>4.2 Between Platform Users</h3>
                                <p>
                                    When a booking is confirmed, limited profile information (name, rating, and photo)
                                    is shared between the client and the assigned worker to facilitate the service.
                                    Contact details are shared only as necessary to complete the booking.
                                </p>

                                <h3>4.3 Legal Requirements</h3>
                                <p>
                                    We may disclose your information if required to do so by law or in response to
                                    valid requests from public authorities (e.g., a court order or government agency).
                                </p>

                                <h3>4.4 Business Transfers</h3>
                                <p>
                                    In the event of a merger, acquisition, or sale of company assets, user data
                                    may be transferred. We will notify you via email or prominent in-app notice
                                    before your data becomes subject to a different privacy policy.
                                </p>

                                <h3>4.5 Advertising (Google AdMob)</h3>
                                <p>
                                    We use <strong>Google AdMob</strong> (provided by Google LLC) to display advertisements within the ProWorker app.
                                    AdMob helps us offer the app at no cost to users by showing relevant ads.
                                </p>
                                <p>To serve and personalise ads, Google AdMob may collect:</p>
                                <ul>
                                    <li><strong>Device identifiers</strong> — including the Android Advertising ID (AAID), used to deliver personalised advertisements</li>
                                    <li><strong>IP address</strong> — used to infer approximate location for ad targeting</li>
                                    <li><strong>Usage and interaction data</strong> — such as app events, session duration, and ad engagement</li>
                                    <li><strong>Cookies and similar tracking technologies</strong> — used by AdMob's SDK to track ad performance and frequency</li>
                                </ul>
                                <p>
                                    Ads served by AdMob may be personalised based on your interests and prior activity across Google's advertising network.
                                    You can <strong>opt out of personalised ads</strong> at any time by going to your device's{' '}
                                    <em>Google Settings → Ads → Opt out of Ads Personalisation</em> (Android).
                                    Opting out means you will still see ads, but they will not be tailored to your interests.
                                </p>
                                <p>For more information on how Google uses data collected via AdMob:</p>
                                <ul>
                                    <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
                                    <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data when you use our partners' sites or apps</a></li>
                                </ul>

                                <div className="privacy-highlight">
                                    <strong>No Sale of Data:</strong> ProWorker does not and will not sell,
                                    trade, or rent your personally identifiable information to third parties
                                    for marketing or any other commercial purposes.
                                </div>
                            </section>

                            <section id="data-retention" className="privacy-section">
                                <h2>5. Data Retention</h2>
                                <p>
                                    We retain your personal data only for as long as necessary to fulfill the
                                    purposes outlined in this policy, unless a longer retention period is required
                                    or permitted by law.
                                </p>

                                <div className="privacy-table-wrapper">
                                    <table className="privacy-table">
                                        <thead>
                                            <tr>
                                                <th>Data Type</th>
                                                <th>Retention Period</th>
                                                <th>Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Account information</td>
                                                <td>Duration of account + 2 years</td>
                                                <td>Account management, dispute resolution</td>
                                            </tr>
                                            <tr>
                                                <td>Transaction records</td>
                                                <td>7 years</td>
                                                <td>Financial & tax compliance (Indian law)</td>
                                            </tr>
                                            <tr>
                                                <td>Location data</td>
                                                <td>90 days</td>
                                                <td>Service optimisation and safety</td>
                                            </tr>
                                            <tr>
                                                <td>In-app messages</td>
                                                <td>1 year after booking closes</td>
                                                <td>Dispute resolution</td>
                                            </tr>
                                            <tr>
                                                <td>Support correspondence</td>
                                                <td>3 years</td>
                                                <td>Quality assurance, legal records</td>
                                            </tr>
                                            <tr>
                                                <td>Worker verification docs</td>
                                                <td>Duration of active account</td>
                                                <td>Ongoing trust & safety verification</td>
                                            </tr>
                                            <tr>
                                                <td>Anonymised analytics</td>
                                                <td>Indefinitely</td>
                                                <td>Product improvement (no personal identifiers)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p>
                                    When data is no longer required, we securely delete or anonymise it so
                                    it can no longer be associated with you.
                                </p>
                            </section>

                            <section id="user-rights" className="privacy-section">
                                <h2>6. Your Rights</h2>
                                <p>
                                    Depending on your location, you may have the following rights regarding
                                    your personal data. We honour these rights in accordance with applicable
                                    data protection laws, including India's Digital Personal Data Protection
                                    Act (DPDPA) 2023.
                                </p>

                                <div className="rights-grid">
                                    <div className="rights-item">
                                        <span className="rights-icon">👁️</span>
                                        <div>
                                            <h4>Right to Access</h4>
                                            <p>Request a copy of the personal data we hold about you.</p>
                                        </div>
                                    </div>
                                    <div className="rights-item">
                                        <span className="rights-icon">✏️</span>
                                        <div>
                                            <h4>Right to Rectification</h4>
                                            <p>Correct inaccurate or incomplete information in your profile.</p>
                                        </div>
                                    </div>
                                    <div className="rights-item">
                                        <span className="rights-icon">🗑️</span>
                                        <div>
                                            <h4>Right to Erasure</h4>
                                            <p>Request deletion of your account and associated personal data, subject to legal obligations.</p>
                                        </div>
                                    </div>
                                    <div className="rights-item">
                                        <span className="rights-icon">⏸️</span>
                                        <div>
                                            <h4>Right to Restrict Processing</h4>
                                            <p>Ask us to limit how we use your data in certain circumstances.</p>
                                        </div>
                                    </div>
                                    <div className="rights-item">
                                        <span className="rights-icon">📦</span>
                                        <div>
                                            <h4>Right to Portability</h4>
                                            <p>Receive your data in a structured, machine-readable format.</p>
                                        </div>
                                    </div>
                                    <div className="rights-item">
                                        <span className="rights-icon">🚫</span>
                                        <div>
                                            <h4>Right to Object</h4>
                                            <p>Object to processing of your data for marketing or profiling purposes.</p>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    To exercise any of these rights, please contact us at{' '}
                                    <a href="mailto:contact@proworker.in">contact@proworker.in</a>.
                                    We will respond within 30 days. We may need to verify your identity
                                    before processing your request.
                                </p>

                                <h3>Account Deletion</h3>
                                <p>
                                    You can request account deletion directly from the app under
                                    <em> Settings → Account → Delete Account</em>, or by emailing us.
                                    Upon deletion, your personal information will be removed from active
                                    systems within 30 days, subject to data we are legally required to retain.
                                </p>
                            </section>

                            <section id="security" className="privacy-section">
                                <h2>7. Data Security</h2>
                                <p>
                                    We implement appropriate technical and organisational measures to protect
                                    your personal data against unauthorised access, alteration, disclosure,
                                    or destruction. Our security practices include:
                                </p>
                                <ul>
                                    <li>All data transmitted between your device and our servers is encrypted using <strong>TLS 1.2 or higher</strong></li>
                                    <li>Sensitive data at rest (e.g., payment info, verification documents) is encrypted using <strong>AES-256</strong></li>
                                    <li>Access to personal data is restricted to authorised personnel on a <strong>need-to-know basis</strong></li>
                                    <li>Regular security audits and penetration testing</li>
                                    <li>Secure coding practices and dependency vulnerability monitoring</li>
                                    <li>Multi-factor authentication for internal systems</li>
                                </ul>
                                <p>
                                    While we strive to protect your personal information, no method of
                                    transmission over the internet or electronic storage is 100% secure.
                                    If you become aware of any security breach, please notify us immediately
                                    at <a href="mailto:contact@proworker.in">contact@proworker.in</a>.
                                </p>
                            </section>

                            <section id="children" className="privacy-section">
                                <h2>8. Children's Privacy</h2>
                                <p>
                                    ProWorker is not intended for use by individuals under the age of 18.
                                    We do not knowingly collect personal information from children. If we
                                    become aware that we have inadvertently collected data from a minor,
                                    we will take immediate steps to delete that information.
                                </p>
                                <p>
                                    If you are a parent or guardian and believe your child has provided us
                                    with personal data, please contact us at{' '}
                                    <a href="mailto:contact@proworker.in">contact@proworker.in</a>.
                                </p>
                            </section>

                            <section id="changes" className="privacy-section">
                                <h2>9. Policy Changes</h2>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes
                                    in our practices, technology, legal requirements, or other factors.
                                    When we make material changes, we will:
                                </p>
                                <ul>
                                    <li>Update the "Last updated" date at the top of this policy</li>
                                    <li>Notify you via in-app notification or email at least 14 days before changes take effect</li>
                                    <li>For significant changes, we may require you to re-accept the updated policy</li>
                                </ul>
                                <p>
                                    Your continued use of ProWorker after the effective date of any changes
                                    constitutes acceptance of the updated Privacy Policy. We encourage you to
                                    review this page periodically.
                                </p>
                            </section>

                            <section id="contact" className="privacy-section">
                                <h2>10. Contact Us</h2>
                                <p>
                                    If you have any questions, concerns, or requests regarding this Privacy
                                    Policy or our data practices, please reach out to us:
                                </p>

                                <div className="privacy-contact-card">
                                    <div className="contact-brand">
                                        <span className="logo-pro">Pro</span><span className="logo-worker-footer">Worker</span>
                                    </div>
                                    <div className="contact-details">
                                        <div className="contact-row">
                                            <span className="contact-label">Email</span>
                                            <a href="mailto:contact@proworker.in" className="contact-value">contact@proworker.in</a>
                                        </div>
                                        <div className="contact-row">
                                            <span className="contact-label">Subject</span>
                                            <span className="contact-value">Privacy Policy Inquiry</span>
                                        </div>
                                        <div className="contact-row">
                                            <span className="contact-label">Response time</span>
                                            <span className="contact-value">Within 30 business days</span>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    For urgent data protection concerns or security incidents, please
                                    mark your email with <strong>"URGENT - Data Protection"</strong> in the subject line.
                                </p>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
