// app/privacy-policy/page.jsx
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/privacy-policy.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Read our Privacy Policy to understand how ${siteConfig.name} collects, uses, and protects your personal information. Your trust is our priority.`,
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: "Your privacy matters. Learn how we protect your data.",
    url: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 19, 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <p>
            Welcome to <strong>{siteConfig.name}</strong> ("we", "our", or "us"). 
            We are committed to protecting your privacy and ensuring you have a positive 
            experience on our website and when using our healthcare services.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you visit our website, use our services, or interact 
            with us in any way. Please read this policy carefully.
          </p>
          <p className="policy-note">
            <strong>Note:</strong> By accessing or using our services, you consent to 
            the practices described in this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <h4>2.1 Personal Information You Provide</h4>
          <p>
            When you register, book appointments, or contact us, we may collect:
          </p>
          <ul className="policy-list">
            <li><strong>Identity Data:</strong> Name, date of birth, gender, national ID</li>
            <li><strong>Contact Data:</strong> Email address, phone number, physical address</li>
            <li><strong>Health Data:</strong> Medical history, symptoms, diagnoses, treatment records</li>
            <li><strong>Account Data:</strong> Username, encrypted password, preferences</li>
            <li><strong>Payment Data:</strong> Billing address, payment method details (processed securely)</li>
          </ul>

          <h4>2.2 Information Collected Automatically</h4>
          <p>
            When you visit our website, we may automatically collect:
          </p>
          <ul className="policy-list">
            <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
            <li><strong>Location Data:</strong> General geographic location (country/city level)</li>
            <li><strong>Cookies & Tracking:</strong> See Section 7 for details</li>
          </ul>

          <h4>2.3 Information from Third Parties</h4>
          <p>
            We may receive information about you from:
          </p>
          <ul className="policy-list">
            <li>Healthcare providers you authorize to share records</li>
            <li>Insurance companies for claim processing</li>
            <li>Public health authorities (as required by law)</li>
            <li>Trusted partners for service verification</li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      content: (
        <>
          <p>We use your information for the following purposes:</p>
          <div className="policy-grid">
            <div className="policy-use-item">
              <span className="policy-use-icon">🩺</span>
              <div>
                <h5>Provide Healthcare Services</h5>
                <p>Deliver medical consultations, diagnostics, treatment, and follow-up care.</p>
              </div>
            </div>
            <div className="policy-use-item">
              <span className="policy-use-icon">🔐</span>
              <div>
                <h5>Ensure Security & Compliance</h5>
                <p>Verify identity, prevent fraud, and comply with healthcare regulations.</p>
              </div>
            </div>
            <div className="policy-use-item">
              <span className="policy-use-icon">📧</span>
              <div>
                <h5>Communicate With You</h5>
                <p>Send appointment reminders, health updates, and respond to inquiries.</p>
              </div>
            </div>
            <div className="policy-use-item">
              <span className="policy-use-icon">📊</span>
              <div>
                <h5>Improve Our Services</h5>
                <p>Analyze usage patterns to enhance user experience and medical outcomes.</p>
              </div>
            </div>
            <div className="policy-use-item">
              <span className="policy-use-icon">⚖️</span>
              <div>
                <h5>Legal Obligations</h5>
                <p>Fulfill reporting requirements to health authorities and regulatory bodies.</p>
              </div>
            </div>
            <div className="policy-use-item">
              <span className="policy-use-icon">💡</span>
              <div>
                <h5>Research & Development</h5>
                <p>Conduct anonymized research to advance medical knowledge (with consent).</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing & Disclosure",
      content: (
        <>
          <p>
            We do not sell your personal information. We may share your data only in 
            the following circumstances:
          </p>
          
          <h4>4.1 With Your Consent</h4>
          <p>
            We share information when you explicitly authorize us to do so, such as 
            referring you to a specialist or sharing records with your chosen provider.
          </p>

          <h4>4.2 Service Providers</h4>
          <p>
            We work with trusted third parties who assist us in operating our services:
          </p>
          <ul className="policy-list">
            <li>Cloud hosting and data storage providers</li>
            <li>Payment processing platforms</li>
            <li>Appointment scheduling systems</li>
            <li>Communication and notification services</li>
          </ul>
          <p className="policy-note">
            All service providers are bound by confidentiality agreements and 
            data protection standards equivalent to ours.
          </p>

          <h4>4.3 Legal Requirements</h4>
          <p>
            We may disclose information if required by law, court order, or 
            government regulation, including:
          </p>
          <ul className="policy-list">
            <li>Responding to lawful requests from public authorities</li>
            <li>Complying with Bangladesh Digital Security Act, 2018</li>
            <li>Meeting requirements of the Bangladesh Medical & Dental Council (BMDC)</li>
            <li>Protecting the rights, property, or safety of our patients, staff, or the public</li>
          </ul>

          <h4>4.4 Business Transfers</h4>
          <p>
            In the event of a merger, acquisition, or sale of assets, patient 
            information may be transferred as part of the business assets, subject 
            to continued protection under this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "data-security",
      title: "5. Data Security & Retention",
      content: (
        <>
          <h4>5.1 Security Measures</h4>
          <p>
            We implement industry-standard technical and organizational measures 
            to protect your information:
          </p>
          <ul className="policy-list">
            <li><strong>Encryption:</strong> Data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
            <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
            <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
            <li><strong>Staff Training:</strong> Mandatory privacy and security training for all employees</li>
            <li><strong>Incident Response:</strong> 24/7 monitoring and breach response protocol</li>
          </ul>

          <h4>5.2 Data Retention</h4>
          <p>
            We retain your personal information only as long as necessary:
          </p>
          <div className="policy-table-wrapper">
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Retention Period</th>
                  <th>Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Medical Records</td>
                  <td>10 years after last visit (or as required by BMDC)</td>
                  <td>Healthcare regulation</td>
                </tr>
                <tr>
                  <td>Account Information</td>
                  <td>Until account deletion + 2 years</td>
                  <td>Service provision</td>
                </tr>
                <tr>
                  <td>Communication Logs</td>
                  <td>3 years</td>
                  <td>Quality assurance</td>
                </tr>
                <tr>
                  <td>Analytics Data</td>
                  <td>24 months (anonymized)</td>
                  <td>Legitimate interest</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="policy-note">
            You may request deletion of your data at any time, subject to legal 
            retention requirements for medical records.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "6. Your Rights & Choices",
      content: (
        <>
          <p>
            Under applicable data protection laws, you have the following rights 
            regarding your personal information:
          </p>

          <div className="policy-rights-grid">
            {[
              {
                icon: "👁️",
                title: "Right to Access",
                desc: "Request a copy of the personal data we hold about you."
              },
              {
                icon: "✏️",
                title: "Right to Rectification",
                desc: "Request correction of inaccurate or incomplete information."
              },
              {
                icon: "🗑️",
                title: "Right to Erasure",
                desc: "Request deletion of your data (subject to legal obligations)."
              },
              {
                icon: "🚫",
                title: "Right to Restrict Processing",
                desc: "Limit how we use your information in certain circumstances."
              },
              {
                icon: "📤",
                title: "Right to Data Portability",
                desc: "Receive your data in a structured, machine-readable format."
              },
              {
                icon: "❌",
                title: "Right to Object",
                desc: "Object to processing based on legitimate interests or direct marketing."
              },
            ].map((right) => (
              <div key={right.title} className="policy-right-card">
                <span className="policy-right-icon">{right.icon}</span>
                <h5>{right.title}</h5>
                <p>{right.desc}</p>
              </div>
            ))}
          </div>

          <h4>How to Exercise Your Rights</h4>
          <p>
            To exercise any of these rights, please contact our Data Protection Officer:
          </p>
          <div className="policy-contact-card">
            <p><strong>Email:</strong> <a href="mailto:privacy@renovalifecare.com">privacy@renovalifecare.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+8801234567890">+880 1234-567890</a></p>
            <p>
              <strong>Address:</strong>{' '}
              {siteConfig.address.street}, {siteConfig.address.area}, {siteConfig.address.city}, {siteConfig.address.country}
            </p>
          </div>
          <p className="policy-note">
            We will respond to your request within 30 days. For verification purposes, 
            we may ask for additional information to confirm your identity.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "7. Cookies & Tracking Technologies",
      content: (
        <>
          <h4>7.1 What Are Cookies?</h4>
          <p>
            Cookies are small text files stored on your device that help websites 
            remember your preferences and improve functionality.
          </p>

          <h4>7.2 Types of Cookies We Use</h4>
          <div className="policy-table-wrapper">
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Essential</strong></td>
                  <td>Enable core functions like login, security, accessibility</td>
                  <td>Session to 1 year</td>
                  <td>Cannot be disabled</td>
                </tr>
                <tr>
                  <td><strong>Performance</strong></td>
                  <td>Analyze site usage to improve performance and UX</td>
                  <td>Up to 2 years</td>
                  <td>Browser settings</td>
                </tr>
                <tr>
                  <td><strong>Functional</strong></td>
                  <td>Remember preferences like language, location, theme</td>
                  <td>Up to 1 year</td>
                  <td>Browser settings</td>
                </tr>
                <tr>
                  <td><strong>Marketing</strong></td>
                  <td>Deliver relevant ads and measure campaign effectiveness</td>
                  <td>Up to 13 months</td>
                  <td>Opt-out via cookie banner</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4>7.3 Managing Cookies</h4>
          <p>
            You can control cookies through:
          </p>
          <ul className="policy-list">
            <li><strong>Cookie Banner:</strong> Use our consent manager on first visit</li>
            <li><strong>Browser Settings:</strong> Block or delete cookies via your browser preferences</li>
            <li><strong>Opt-Out Tools:</strong> Visit <a href="https://optout.aboutads.info" target="_blank" rel="noopener">aboutads.info</a> or <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener">youronlinechoices.com</a></li>
          </ul>
          <p className="policy-note">
            Disabling essential cookies may limit your ability to use certain features 
            of our website or services.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: (
        <>
          <p>
            Our services are not directed to individuals under the age of 16. 
            We do not knowingly collect personal information from children without 
            parental consent.
          </p>
          <p>
            If you are a parent or guardian and believe your child has provided 
            us with personal information, please contact us immediately. We will 
            take steps to delete such information from our systems.
          </p>
          <p>
            For pediatric care, we require consent from a parent or legal guardian 
            before collecting or processing any health information about a minor, 
            in accordance with Bangladesh's child protection laws.
          </p>
        </>
      ),
    },
    {
      id: "international",
      title: "9. International Data Transfers",
      content: (
        <>
          <p>
            {siteConfig.name} is based in Bangladesh. However, some of our service 
            providers may process data in other countries.
          </p>
          <p>
            When we transfer your personal information internationally, we ensure 
            appropriate safeguards are in place, such as:
          </p>
          <ul className="policy-list">
            <li>Standard Contractual Clauses approved by relevant authorities</li>
            <li>Data Processing Agreements with equivalent protection standards</li>
            <li>Encryption and access controls for cross-border transfers</li>
          </ul>
          <p>
            By using our services, you consent to the transfer of your information 
            to countries outside Bangladesh, including those that may have different 
            data protection rules.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "10. Changes to This Privacy Policy",
      content: (
        <>
          <p>
            We may update this Privacy Policy periodically to reflect changes in 
            our practices, services, or legal requirements.
          </p>
          <p>
            When we make material changes, we will:
          </p>
          <ul className="policy-list">
            <li>Post the updated policy on this page with a new "Last Updated" date</li>
            <li>Notify registered users via email or in-app notification</li>
            <li>Provide a summary of key changes for transparency</li>
          </ul>
          <p>
            Your continued use of our services after changes take effect constitutes 
            acceptance of the updated Privacy Policy. We encourage you to review this 
            page regularly.
          </p>
          <div className="policy-updated-badge">
            <span className="policy-updated-icon">📅</span>
            <span>Last Updated: <strong>{lastUpdated}</strong></span>
          </div>
        </>
      ),
    },
    {
      id: "contact",
      title: "11. Contact Us",
      content: (
        <>
          <p>
            If you have questions, concerns, or requests regarding this Privacy 
            Policy or our data practices, please contact us:
          </p>

          <div className="policy-contact-grid">
            <div className="policy-contact-card">
              <h5>📧 Data Protection Officer</h5>
              <p><a href="mailto:privacy@renovalifecare.com">privacy@renovalifecare.com</a></p>
              <p><a href="tel:+8801234567890">+880 1234-567890</a> (Mon-Fri, 9AM-5PM)</p>
            </div>
            <div className="policy-contact-card">
              <h5>🏢 Registered Office</h5>
              <p>
                {siteConfig.address.street}, {siteConfig.address.area}
                <br />
                {siteConfig.address.city}, {siteConfig.address.country}
              </p>
            </div>
            <div className="policy-contact-card">
              <h5>⚖️ Regulatory Complaints</h5>
              <p>You may also contact:</p>
              <p><strong>Bangladesh Medical & Dental Council (BMDC)</strong></p>
              <p><a href="https://bmdc.org.bd" target="_blank" rel="noopener">bmdc.org.bd</a></p>
            </div>
          </div>

          <div className="policy-cta-section">
            <p className="policy-cta-text">
              We are committed to addressing your concerns promptly and transparently.
            </p>
            <a href="/contact" className="btn btn-primary">
              Contact Support
            </a>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {/* ══════════════════════════════════════
          PAGE HERO BANNER
      ══════════════════════════════════════ */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Legal & Compliance</span>
          <h1 className="page-hero__title">
            Privacy <span className="page-hero__highlight">Policy</span>
          </h1>
          <p className="page-hero__subtitle">
            Transparent, secure, and compliant handling of your personal health information.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRIVACY POLICY CONTENT (Single Column)
      ══════════════════════════════════════ */}
      <article className="page-section">
        <div className="page-section__container">
          <div className="policy-content">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="policy-section">
                <h2 className="policy-section-title">{section.title}</h2>
                <div className="policy-section-body">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════
          TRUST BADGES
      ══════════════════════════════════════ */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="policy-trust-grid">
            <div className="policy-trust-item">
              <span className="policy-trust-icon">🔐</span>
              <p><strong>End-to-End Encryption</strong><br />Your data is protected in transit and at rest</p>
            </div>
            <div className="policy-trust-item">
              <span className="policy-trust-icon">✅</span>
              <p><strong>BMDC Compliant</strong><br />Meets Bangladesh healthcare data standards</p>
            </div>
            <div className="policy-trust-item">
              <span className="policy-trust-icon">🌍</span>
              <p><strong>GDPR-Aligned</strong><br />Built with global privacy best practices</p>
            </div>
            <div className="policy-trust-item">
              <span className="policy-trust-icon">🛡️</span>
              <p><strong>Regular Audits</strong><br />Independent security assessments annually</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}