import './ChildSafetyStandards.css';

function ChildSafetyStandards() {
    const lastUpdated = 'April 2, 2026';

    return (
        <div className="safety-page">
            <div className="safety-hero">
                <div className="container">
                    <div className="safety-hero-content">
                        <span className="safety-badge">Safety & Compliance</span>
                        <h1 className="safety-title">Child Safety Standards</h1>
                        <p className="safety-subtitle">
                            ProWorker is committed to protecting children from sexual abuse and exploitation.
                            This page outlines our safety standards and policies.
                        </p>
                        <p className="safety-meta">Last updated: {lastUpdated}</p>
                    </div>
                </div>
            </div>

            <div className="safety-body">
                <div className="container">
                    <div className="safety-layout">
                        <nav className="safety-toc">
                            <h3>Contents</h3>
                            <ol>
                                <li><a href="#commitment">Our Commitment</a></li>
                                <li><a href="#standards">Safety Standards</a></li>
                                <li><a href="#policies">Our Policies</a></li>
                                <li><a href="#verification">Verification Process</a></li>
                                <li><a href="#reporting">Reporting Abuse</a></li>
                                <li><a href="#resources">Resources</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ol>
                        </nav>

                        <div className="safety-content">

                            <section id="commitment" className="safety-section">
                                <h2>1. Our Commitment to Child Safety</h2>
                                <p>
                                    ProWorker is dedicated to providing a safe platform for all users, with zero tolerance
                                    for child sexual abuse and exploitation (CSAE). We implement comprehensive measures to
                                    prevent, detect, and respond to any potential threats to child safety.
                                </p>
                                <p>
                                    This commitment extends across all aspects of our platform, from user registration to
                                    ongoing platform monitoring and swift response to reports of abuse.
                                </p>
                            </section>

                            <section id="standards" className="safety-section">
                                <h2>2. Published Safety Standards</h2>
                                <div className="safety-standards-box">
                                    <h3>📋 ProWorker Child Safety Standards Document</h3>
                                    <p>
                                        Our comprehensive child safety standards and best practices are published and available for
                                        public review:
                                    </p>
                                    <a
                                        href="https://proworker.com/safety-standards"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="safety-standards-link"
                                    >
                                        View Full Safety Standards Document →
                                    </a>
                                    <p className="standards-description">
                                        This document details our policies on preventing child sexual abuse and exploitation,
                                        user verification, content moderation, and reporting mechanisms.
                                    </p>
                                </div>
                            </section>

                            <section id="policies" className="safety-section">
                                <h2>3. Key Safety Policies</h2>

                                <div className="policy-card">
                                    <h3>🔍 Age Verification</h3>
                                    <p>
                                        All ProWorker users must be at least 18 years old. We implement age verification checks
                                        during account creation using government-issued ID verification where applicable in your jurisdiction.
                                    </p>
                                </div>

                                <div className="policy-card">
                                    <h3>🛡️ User Screening</h3>
                                    <p>
                                        We conduct identity verification checks on all users, particularly those offering services.
                                        Background checks are performed to identify and prevent known offenders from accessing our platform.
                                    </p>
                                </div>

                                <div className="policy-card">
                                    <h3>🚨 Prohibited Content</h3>
                                    <p>
                                        ProWorker strictly prohibits:
                                    </p>
                                    <ul>
                                        <li>Any content depicting, encouraging, or facilitating child sexual abuse</li>
                                        <li>Grooming behavior or sexual solicitation of minors</li>
                                        <li>Distribution of child sexual abuse material (CSAM)</li>
                                        <li>Sexual exploitation or trafficking of minors</li>
                                        <li>Harmful or abusive communication directed at children</li>
                                    </ul>
                                </div>

                                <div className="policy-card">
                                    <h3>📱 Platform Monitoring</h3>
                                    <p>
                                        We use automated technology and manual review to monitor communications and content
                                        for indicators of child exploitation. Suspicious activity is immediately escalated
                                        to our safety team and law enforcement when appropriate.
                                    </p>
                                </div>

                                <div className="policy-card">
                                    <h3>🔐 Information Protection</h3>
                                    <p>
                                        User information is protected with industry-standard encryption and security measures.
                                        We limit access to personal information, especially contact details, to protect user privacy.
                                    </p>
                                </div>
                            </section>

                            <section id="verification" className="safety-section">
                                <h2>4. Verification & Screening Process</h2>
                                <table className="verification-table">
                                    <thead>
                                        <tr>
                                            <th>User Type</th>
                                            <th>Verification Requirement</th>
                                            <th>Frequency</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>All Users</td>
                                            <td>Email verification + Age confirmation</td>
                                            <td>At registration</td>
                                        </tr>
                                        <tr>
                                            <td>Service Providers</td>
                                            <td>Identity verification + Background check</td>
                                            <td>Annual renewal</td>
                                        </tr>
                                        <tr>
                                            <td>Flagged Accounts</td>
                                            <td>Enhanced security review</td>
                                            <td>Immediate investigation</td>
                                        </tr>
                                        <tr>
                                            <td>All Users</td>
                                            <td>Automated behavior monitoring</td>
                                            <td>Continuous</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section id="reporting" className="safety-section">
                                <h2>5. Reporting Child Abuse & Exploitation</h2>
                                <p>
                                    If you suspect child sexual abuse or exploitation on ProWorker, please report it immediately
                                    using any of the following methods:
                                </p>

                                <div className="reporting-methods">
                                    <div className="reporting-card">
                                        <h3>📧 Email Report</h3>
                                        <p><strong>safety@proworker.com</strong></p>
                                        <p>Send detailed report with screenshots and user information</p>
                                    </div>

                                    <div className="reporting-card">
                                        <h3>🚨 In-App Report</h3>
                                        <p>Use the "Report User" button on any user profile or in messages</p>
                                        <p>Our team reviews in-app reports within 24 hours</p>
                                    </div>

                                    <div className="reporting-card">
                                        <h3>🔗 To Law Enforcement</h3>
                                        <p><strong>National Center for Missing & Exploited Children (NCMEC)</strong></p>
                                        <p>Report to: <a href="https://cybertipline.org" target="_blank" rel="noopener noreferrer">CyberTipline.org</a></p>
                                    </div>

                                    <div className="reporting-card">
                                        <h3>📞 Contact Local Police</h3>
                                        <p>If you believe a child is in immediate danger, contact local law enforcement</p>
                                    </div>
                                </div>

                                <div className="reporting-commitment">
                                    <p>
                                        <strong>Our Commitment:</strong> All reports are taken seriously and investigated promptly.
                                        ProWorker cooperates fully with law enforcement agencies. Accounts involved in CSAE activities
                                        are terminated immediately and reported to appropriate authorities.
                                    </p>
                                </div>
                            </section>

                            <section id="resources" className="safety-section">
                                <h2>6. Safety Resources & Support</h2>

                                <div className="resources-grid">
                                    <div className="resource-item">
                                        <h3>For Parents & Guardians</h3>
                                        <ul>
                                            <li><a href="https://www.icmec.org/" target="_blank" rel="noopener noreferrer">International Centre for Missing & Exploited Children</a></li>
                                            <li><a href="https://www.thorn.org/" target="_blank" rel="noopener noreferrer">Thorn: Digital Defenders of Children</a></li>
                                            <li><a href="https://cybertipline.org/" target="_blank" rel="noopener noreferrer">NCMEC CyberTipline</a></li>
                                        </ul>
                                    </div>

                                    <div className="resource-item">
                                        <h3>For Survivors</h3>
                                        <ul>
                                            <li><a href="https://www.rainn.org/" target="_blank" rel="noopener noreferrer">RAINN (Rape, Abuse & Incest National Network)</a></li>
                                            <li><a href="https://www.childhelp.org/" target="_blank" rel="noopener noreferrer">Childhelp National Hotline</a></li>
                                            <li><a href="https://www.crisis.org.uk/" target="_blank" rel="noopener noreferrer">Crisis Support Services</a></li>
                                        </ul>
                                    </div>

                                    <div className="resource-item">
                                        <h3>For Reporting</h3>
                                        <ul>
                                            <li><a href="https://cybertipline.org/" target="_blank" rel="noopener noreferrer">CyberTipline</a> - Report CSAM</li>
                                            <li><a href="https://www.inhope.org/" target="_blank" rel="noopener noreferrer">IWF (Internet Watch Foundation)</a></li>
                                            <li><a href="https://www.protectchildren.org/" target="_blank" rel="noopener noreferrer">The National Center</a></li>
                                        </ul>
                                    </div>

                                    <div className="resource-item">
                                        <h3>Industry Standards</h3>
                                        <ul>
                                            <li><a href="https://www.ncmec.org/" target="_blank" rel="noopener noreferrer">NCMEC Guidelines</a></li>
                                            <li><a href="https://www.tech-uk.org/" target="_blank" rel="noopener noreferrer">Tech UK Safety Standards</a></li>
                                            <li><a href="https://internetmatters.org/" target="_blank" rel="noopener noreferrer">Internet Matters</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section id="contact" className="safety-section">
                                <h2>7. Contact Our Safety Team</h2>
                                <div className="contact-info">
                                    <div className="contact-method">
                                        <h3>Email</h3>
                                        <p><a href="mailto:safety@proworker.com">safety@proworker.com</a></p>
                                        <p className="contact-desc">For safety concerns and abuse reports</p>
                                    </div>

                                    <div className="contact-method">
                                        <h3>Response Time</h3>
                                        <p><strong>24 Hours</strong></p>
                                        <p className="contact-desc">We respond to all safety reports within 24 hours</p>
                                    </div>

                                    <div className="contact-method">
                                        <h3>Privacy</h3>
                                        <p><strong>Confidential</strong></p>
                                        <p className="contact-desc">Your report details are kept confidential and shared only with relevant authorities</p>
                                    </div>
                                </div>

                                <div className="contact-form-section">
                                    <h3>Report a Safety Concern</h3>
                                    <p>
                                        If you need to report a safety concern directly, please use this form or email us at safety@proworker.com:
                                    </p>
                                    <form className="safety-form">
                                        <div className="form-group">
                                            <label htmlFor="reportType">Type of Concern *</label>
                                            <select id="reportType" name="reportType" required>
                                                <option value="">Select a concern type</option>
                                                <option value="csae">Child Sexual Abuse or Exploitation</option>
                                                <option value="grooming">Grooming or Inappropriate Contact</option>
                                                <option value="csam">Child Sexual Abuse Material (CSAM)</option>
                                                <option value="trafficking">Human Trafficking</option>
                                                <option value="other">Other Safety Concern</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="details">Details of Concern *</label>
                                            <textarea
                                                id="details"
                                                name="details"
                                                rows="5"
                                                placeholder="Please provide as much detail as possible about the safety concern..."
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="userInfo">User Information (if known)</label>
                                            <input
                                                type="text"
                                                id="userInfo"
                                                name="userInfo"
                                                placeholder="Username, email, or user ID"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Your Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                <input type="checkbox" name="followup" />
                                                I would like ProWorker to follow up on this report
                                            </label>
                                        </div>

                                        <button type="submit" className="submit-btn">
                                            Submit Safety Report
                                        </button>
                                    </form>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChildSafetyStandards;
