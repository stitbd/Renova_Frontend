// app/terms/page.jsx
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/terms.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Read our Terms of Service to understand your rights and responsibilities when using ${siteConfig.name}'s healthcare platform and services.`,
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: "Your rights and responsibilities when using our healthcare services.",
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  const lastUpdated = "May 19, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
            Welcome to <strong>{siteConfig.name}</strong>. These Terms of Service 
            ("Terms", "Agreement") constitute a legally binding agreement between 
            you ("User", "you", or "your") and {siteConfig.name} ("we", "us", or "our") 
            governing your access to and use of our website, mobile applications, 
            and healthcare services (collectively, the "Services").
          </p>
          <p className="terms-highlight">
            <strong>By accessing or using our Services, you acknowledge that you have 
            read, understood, and agree to be bound by these Terms.</strong> If you do 
            not agree, please do not use our Services.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use 
            the Services. Please read them carefully.
          </p>
        </>
      ),
    },
    {
      id: "services",
      title: "2. Description of Services",
      content: (
        <>
          <p>
            {siteConfig.name} provides a digital healthcare platform that connects 
            patients with qualified healthcare professionals in Bangladesh. Our Services include:
          </p>
          <ul className="terms-list">
            <li><strong>Teleconsultations:</strong> Virtual doctor appointments via video, audio, or chat</li>
            <li><strong>Appointment Booking:</strong> Schedule in-person visits at partner facilities</li>
            <li><strong>Health Records:</strong> Secure storage and management of medical history</li>
            <li><strong>Prescriptions & Reports:</strong> Digital access to prescriptions and diagnostic results</li>
            <li><strong>Health Content:</strong> Educational articles, wellness tips, and preventive care guidance</li>
            <li><strong>Emergency Support:</strong> Guidance for urgent health situations (not a replacement for emergency services)</li>
          </ul>
          <p className="terms-note">
            <strong>Important:</strong> Our Services are intended for informational and 
            facilitation purposes only. They do not replace professional medical advice, 
            diagnosis, or treatment. Always seek the advice of your physician or other 
            qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </>
      ),
    },
    {
      id: "eligibility",
      title: "3. Eligibility & Registration",
      content: (
        <>
          <h4>3.1 Age Requirement</h4>
          <p>
            You must be at least <strong>16 years old</strong> to use our Services. 
            If you are under 18, you represent that you have obtained consent from 
            a parent or legal guardian to use the Services and that they have agreed 
            to these Terms on your behalf.
          </p>

          <h4>3.2 Account Registration</h4>
          <p>
            To access certain features, you must create an account by providing accurate 
            and complete information, including:
          </p>
          <ul className="terms-list">
            <li>Full name and date of birth</li>
            <li>Valid email address and phone number</li>
            <li>National ID or passport number (for verification)</li>
            <li>Emergency contact information</li>
          </ul>
          <p>
            You are responsible for maintaining the confidentiality of your account 
            credentials and for all activities that occur under your account. Notify 
            us immediately at <a href="mailto:support@renovalifecare.com">support@renovalifecare.com</a> 
            of any unauthorized use.
          </p>

          <h4>3.3 User Verification</h4>
          <p>
            We may require identity verification through government-issued ID, 
            biometric authentication, or other methods to comply with Bangladesh 
            healthcare regulations and prevent fraud.
          </p>
        </>
      ),
    },
    {
      id: "user-obligations",
      title: "4. User Obligations & Conduct",
      content: (
        <>
          <p>
            When using our Services, you agree to:
          </p>
          <div className="terms-grid">
            <div className="terms-obligation-item">
              <span className="terms-obligation-icon">✅</span>
              <div>
                <h5>Provide Accurate Information</h5>
                <p>Submit truthful medical history, symptoms, and personal details.</p>
              </div>
            </div>
            <div className="terms-obligation-item">
              <span className="terms-obligation-icon">🔒</span>
              <div>
                <h5>Protect Your Account</h5>
                <p>Keep login credentials secure; do not share your account.</p>
              </div>
            </div>
            <div className="terms-obligation-item">
              <span className="terms-obligation-icon">🩺</span>
              <div>
                <h5>Use Services Appropriately</h5>
                <p>Do not misuse teleconsultations for non-medical purposes.</p>
              </div>
            </div>
            <div className="terms-obligation-item">
              <span className="terms-obligation-icon">⚖️</span>
              <div>
                <h5>Comply with Laws</h5>
                <p>Follow all applicable Bangladesh laws and healthcare regulations.</p>
              </div>
            </div>
          </div>

          <p className="terms-warning">
            <strong>Prohibited Activities:</strong> You may not:
          </p>
          <ul className="terms-list">
            <li>Impersonate another person or provide false information</li>
            <li>Use the Services for illegal activities, fraud, or harassment</li>
            <li>Attempt to bypass security measures or access others' data</li>
            <li>Scrape, copy, or redistribute content without authorization</li>
            <li>Use automated systems (bots) to interact with the platform</li>
            <li>Interfere with the proper functioning of the Services</li>
          </ul>
        </>
      ),
    },
    {
      id: "healthcare-disclaimer",
      title: "5. Healthcare Disclaimer",
      content: (
        <>
          <p className="terms-disclaimer-banner">
            ⚠️ <strong>Medical Advice Disclaimer</strong>
          </p>
          
          <h4>5.1 Not a Substitute for Emergency Care</h4>
          <p>
            Our Services are <strong>not intended for medical emergencies</strong>. 
            If you are experiencing a life-threatening condition, chest pain, 
            difficulty breathing, severe bleeding, or other emergency, immediately:
          </p>
          <ul className="terms-list">
            <li>Call emergency services: <strong>999</strong> (Bangladesh)</li>
            <li>Go to the nearest hospital emergency department</li>
            <li>Contact your primary care physician directly</li>
          </ul>

          <h4>5.2 Limitations of Teleconsultation</h4>
          <p>
            Virtual consultations have inherent limitations. Our healthcare 
            providers may:
          </p>
          <ul className="terms-list">
            <li>Recommend in-person evaluation if remote assessment is insufficient</li>
            <li>Prescribe medications only when clinically appropriate and legally permitted</li>
            <li>Refer you to specialists or facilities for further care</li>
          </ul>

          <h4>5.3 User Responsibility</h4>
          <p>
            You acknowledge that:
          </p>
          <ul className="terms-list">
            <li>Health outcomes depend on many factors beyond our control</li>
            <li>Following medical advice is your responsibility</li>
            <li>Delayed care or non-adherence may affect treatment results</li>
            <li>You should maintain regular care with a primary healthcare provider</li>
          </ul>
        </>
      ),
    },
    {
      id: "payments",
      title: "6. Payments & Billing",
      content: (
        <>
          <h4>6.1 Service Fees</h4>
          <p>
            Certain Services require payment. Fees are displayed before confirmation 
            and may include:
          </p>
          <ul className="terms-list">
            <li>Consultation fees (vary by specialist and duration)</li>
            <li>Diagnostic test packages</li>
            <li>Subscription plans for premium features</li>
            <li>Prescription delivery charges (if applicable)</li>
          </ul>

          <h4>6.2 Payment Methods</h4>
          <p>
            We accept payments via:
          </p>
          <ul className="terms-list">
            <li>Credit/Debit cards (Visa, Mastercard, Amex)</li>
            <li>Mobile financial services (bKash, Nagad, Rocket)</li>
            <li>Bank transfers (for corporate accounts)</li>
            <li>Insurance billing (where partnered)</li>
          </ul>

          <h4>6.3 Refund Policy</h4>
          <div className="terms-table-wrapper">
            <table className="terms-table">
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Refund Eligibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consultation not started (user cancels &gt;2 hrs prior)</td>
                  <td>Full refund</td>
                </tr>
                <tr>
                  <td>Consultation not started (user cancels &lt;2 hrs prior)</td>
                  <td>50% refund</td>
                </tr>
                <tr>
                  <td>Provider cancels or no-show</td>
                  <td>Full refund + credit</td>
                </tr>
                <tr>
                  <td>Technical failure preventing service delivery</td>
                  <td>Full refund</td>
                </tr>
                <tr>
                  <td>Service already rendered</td>
                  <td>No refund (except billing errors)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="terms-note">
            Refund requests must be submitted within 7 days via 
            <a href="mailto:billing@renovalifecare.com"> billing@renovalifecare.com</a>.
          </p>
        </>
      ),
    },
    {
      id: "privacy-data",
      title: "7. Privacy & Data Protection",
      content: (
        <>
          <p>
            Your privacy is fundamental to our mission. By using our Services, 
            you consent to the collection, use, and disclosure of your information 
            as described in our <a href="/privacy-policy">Privacy Policy</a>, 
            which is incorporated into these Terms by reference.
          </p>
          
          <h4>Key Principles:</h4>
          <ul className="terms-list">
            <li><strong>Health Data Sensitivity:</strong> Medical information receives 
            enhanced protection under Bangladesh law and our internal policies</li>
            <li><strong>Minimal Collection:</strong> We collect only data necessary 
            to provide and improve our Services</li>
            <li><strong>User Control:</strong> You may access, correct, or request 
            deletion of your data (subject to legal retention requirements)</li>
            <li><strong>Security First:</strong> Industry-standard encryption, 
            access controls, and regular audits protect your information</li>
          </ul>

          <p className="terms-note">
            For detailed information about our data practices, please review our 
            <a href="/privacy-policy"> full Privacy Policy</a>.
          </p>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "8. Intellectual Property",
      content: (
        <>
          <h4>8.1 Our Property</h4>
          <p>
            All content, features, and functionality of the Services—including but 
            not limited to text, graphics, logos, software, and design—are owned by 
            {siteConfig.name} or our licensors and are protected by Bangladesh and 
            international copyright, trademark, and other intellectual property laws.
          </p>

          <h4>8.2 Limited License</h4>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable 
            license to access and use the Services for personal, non-commercial 
            purposes, subject to these Terms.
          </p>

          <h4>8.3 User Content</h4>
          <p>
            If you submit content (e.g., health questions, feedback), you:
          </p>
          <ul className="terms-list">
            <li>Retain ownership of your original content</li>
            <li>Grant us a worldwide, royalty-free license to use, reproduce, and 
            display such content solely to provide and improve the Services</li>
            <li>Represent that you have the right to submit such content</li>
          </ul>
          <p>
            We do not claim ownership of your health data. Your medical records 
            remain your property, accessible to you per our Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "limitation-liability",
      title: "9. Limitation of Liability",
      content: (
        <>
          <p className="terms-highlight">
            <strong>To the maximum extent permitted by Bangladesh law:</strong>
          </p>

          <h4>9.1 Exclusion of Consequential Damages</h4>
          <p>
            In no event shall {siteConfig.name}, our directors, employees, partners, 
            or agents be liable for any indirect, incidental, special, consequential, 
            or punitive damages, including but not limited to loss of profits, data, 
            use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="terms-list">
            <li>Your access to or use of (or inability to access) the Services</li>
            <li>Any conduct or content of third parties on the platform</li>
            <li>Content obtained from the Services</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>

          <h4>9.2 Cap on Liability</h4>
          <p>
            Our total aggregate liability to you for any claim arising out of or 
            relating to these Terms or the Services shall not exceed the amount 
            you paid to us, if any, in the 12 months preceding the claim.
          </p>

          <h4>9.3 Essential Basis of Bargain</h4>
          <p>
            The limitations in this section are an essential basis of the bargain 
            between you and {siteConfig.name} and reflect the allocation of risk 
            between the parties.
          </p>
        </>
      ),
    },
    {
      id: "termination",
      title: "10. Termination & Suspension",
      content: (
        <>
          <h4>10.1 By You</h4>
          <p>
            You may stop using the Services at any time. To delete your account, 
            contact us at <a href="mailto:support@renovalifecare.com">support@renovalifecare.com</a>. 
            Note: Medical records may be retained per legal requirements even after 
            account deletion.
          </p>

          <h4>10.2 By Us</h4>
          <p>
            We may suspend or terminate your access to the Services immediately, 
            without prior notice or liability, for any reason, including if you:
          </p>
          <ul className="terms-list">
            <li>Breach any provision of these Terms</li>
            <li>Engage in fraudulent, abusive, or illegal activity</li>
            <li>Fail to maintain accurate or up-to-date account information</li>
            <li>Are subject to regulatory restrictions preventing service provision</li>
          </ul>

          <h4>10.3 Effect of Termination</h4>
          <p>
            Upon termination:
          </p>
          <ul className="terms-list">
            <li>Your right to use the Services ceases immediately</li>
            <li>Accrued rights and obligations survive (including payment obligations)</li>
            <li>Sections on Disclaimer, Limitation of Liability, Governing Law, 
            and any other provisions that by nature should survive, remain in effect</li>
          </ul>
        </>
      ),
    },
    {
      id: "modifications",
      title: "11. Changes to Terms",
      content: (
        <>
          <p>
            We reserve the right to modify these Terms at any time. When we do, 
            we will:
          </p>
          <ul className="terms-list">
            <li>Post the revised Terms on this page with an updated "Last Updated" date</li>
            <li>Notify registered users via email or in-app notification for material changes</li>
            <li>Provide a reasonable opportunity to review changes before they take effect</li>
          </ul>
          <p>
            Your continued use of the Services after changes become effective 
            constitutes acceptance of the new Terms. If you do not agree, you 
            must stop using the Services and may request account deletion.
          </p>
          <div className="terms-updated-badge">
            <span className="terms-updated-icon">📅</span>
            <span>Last Updated: <strong>{lastUpdated}</strong></span>
          </div>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "12. Governing Law & Dispute Resolution",
      content: (
        <>
          <h4>12.1 Governing Law</h4>
          <p>
            These Terms and your use of the Services shall be governed by and 
            construed in accordance with the laws of the <strong>People's Republic 
            of Bangladesh</strong>, without regard to its conflict of law principles.
          </p>

          <h4>12.2 Dispute Resolution</h4>
          <p>
            Any dispute arising from these Terms shall be resolved as follows:
          </p>
          <ol className="terms-ordered-list">
            <li><strong>Informal Resolution:</strong> Contact our support team to 
            attempt good-faith resolution.</li>
            <li><strong>Mediation:</strong> If unresolved within 30 days, parties 
            agree to non-binding mediation through the Bangladesh Medical & Dental 
            Council (BMDC) or agreed-upon mediator.</li>
            <li><strong>Arbitration:</strong> If mediation fails, disputes shall be 
            settled by binding arbitration in Dhaka, Bangladesh, under the 
            Arbitration Act, 2001. Judgment on the award may be entered in any 
            court of competent jurisdiction.</li>
          </ol>
          <p className="terms-note">
            <strong>Exception:</strong> Either party may seek injunctive or other 
            equitable relief in court to prevent actual or threatened infringement 
            of intellectual property rights or breach of confidentiality obligations.
          </p>

          <h4>12.3 Class Action Waiver</h4>
          <p>
            You agree to resolve disputes on an individual basis and waive any right 
            to participate in class, consolidated, or representative actions against 
            {siteConfig.name}.
          </p>
        </>
      ),
    },
    {
      id: "miscellaneous",
      title: "13. Miscellaneous Provisions",
      content: (
        <>
          <h4>13.1 Entire Agreement</h4>
          <p>
            These Terms, together with our Privacy Policy and any additional terms 
            posted on the Services, constitute the entire agreement between you and 
            {siteConfig.name} regarding the subject matter herein.
          </p>

          <h4>13.2 Severability</h4>
          <p>
            If any provision of these Terms is held invalid or unenforceable, the 
            remaining provisions shall remain in full force and effect, and the 
            invalid provision shall be replaced by a valid provision that most 
            closely reflects the original intent.
          </p>

          <h4>13.3 Waiver</h4>
          <p>
            Our failure to enforce any right or provision of these Terms shall not 
            be deemed a waiver of such right or provision unless expressly acknowledged 
            in writing.
          </p>

          <h4>13.4 Assignment</h4>
          <p>
            You may not assign or transfer these Terms without our prior written 
            consent. We may assign these Terms in connection with a merger, 
            acquisition, or sale of assets.
          </p>

          <h4>13.5 Force Majeure</h4>
          <p>
            We shall not be liable for delays or failures in performance resulting 
            from causes beyond our reasonable control, including acts of God, 
            government actions, war, terrorism, pandemics, or internet/telecom 
            infrastructure failures.
          </p>

          <h4>13.6 Contact Information</h4>
          <p>
            For questions about these Terms, please contact:
          </p>
          <div className="terms-contact-grid">
            <div className="terms-contact-card">
              <h5>📧 Legal Department</h5>
              <p><a href="mailto:legal@renovalifecare.com">legal@renovalifecare.com</a></p>
              <p><a href="tel:+8801234567890">+880 1234-567890</a></p>
            </div>
            <div className="terms-contact-card">
              <h5>🏢 Registered Office</h5>
              <p>
                {siteConfig.address?.street}, {siteConfig.address?.area}
                <br />
                {siteConfig.address?.city}, {siteConfig.address?.country}
              </p>
            </div>
            <div className="terms-contact-card">
              <h5>⚖️ Regulatory Reference</h5>
              <p><strong>Bangladesh Medical & Dental Council (BMDC)</strong></p>
              <p><a href="https://bmdc.org.bd" target="_blank" rel="noopener">bmdc.org.bd</a></p>
            </div>
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
            Terms of <span className="page-hero__highlight">Service</span>
          </h1>
          <p className="page-hero__subtitle">
            Understanding your rights and responsibilities when using {siteConfig.name}'s healthcare platform.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Terms of Service</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TERMS CONTENT (Two-Column Layout)
      ══════════════════════════════════════ */}
      <article className="page-section">
        <div className="page-section__container">

          {/* Main Content */}
          <div className="terms-content">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="terms-section">
                <h2 className="terms-section-title">{section.title}</h2>
                <div className="terms-section-body">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

        </div>
      </article>

      {/* ══════════════════════════════════════
          TRUST & COMPLIANCE BADGES
      ══════════════════════════════════════ */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="terms-compliance-grid">
            <div className="terms-compliance-item">
              <span className="terms-compliance-icon">⚖️</span>
              <p><strong>Bangladesh Law Compliant</strong><br />Aligned with Digital Security Act, 2018 & BMDC guidelines</p>
            </div>
            <div className="terms-compliance-item">
              <span className="terms-compliance-icon">🩺</span>
              <p><strong>Healthcare Regulated</strong><br />Services delivered by BMDC-verified medical professionals</p>
            </div>
            <div className="terms-compliance-item">
              <span className="terms-compliance-icon">🔐</span>
              <p><strong>Data Protected</strong><br />End-to-end encryption and strict access controls</p>
            </div>
            <div className="terms-compliance-item">
              <span className="terms-compliance-icon">🌐</span>
              <p><strong>Transparent Practices</strong><br />Clear terms, no hidden fees, easy cancellation</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}