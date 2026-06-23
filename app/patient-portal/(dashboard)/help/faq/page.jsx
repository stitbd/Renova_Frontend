// app/patient/help/faq/page.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, X, ChevronDown, ChevronRight } from "lucide-react";
import "./patient-faq.css";

// Animation variants
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

// FAQ Data Structure
const faqCategories = [
    { id: "general", name: "General", icon: "🩺" },
    { id: "appointments", name: "Appointments", icon: "📅" },
    { id: "video", name: "Video Consultation", icon: "🎥" },
    { id: "payments", name: "Payments & Refunds", icon: "💳" },
    { id: "prescriptions", name: "Prescriptions", icon: "💊" },
    { id: "records", name: "Medical Records", icon: "📄" },
    { id: "doctors", name: "Doctors", icon: "👨‍️" },
    { id: "privacy", name: "Privacy & Security", icon: "🔒" },
    { id: "account", name: "Account", icon: "👤" },
    { id: "technical", name: "Technical Issues", icon: "🛠" },
];

const faqData = {
    general: [
        {
            id: 1,
            question: "What is Renovalife Care?",
            answer: "Renovalife Care is a comprehensive telemedicine platform that connects patients with qualified healthcare professionals through video consultations, appointments, and digital health services.",
            helpful: { yes: 245, no: 12 },
            related: [2, 5, 8]
        },
        {
            id: 2,
            question: "How do I get started?",
            answer: "1. Create an account with your email or phone number\n2. Complete your profile with basic health information\n3. Browse available doctors or book an appointment\n4. Join your consultation at the scheduled time",
            helpful: { yes: 189, no: 8 },
            related: [1, 15, 22]
        },
    ],
    appointments: [
        {
            id: 15,
            question: "How do I book an appointment?",
            answer: "1. Navigate to the 'Appointments' section from the dashboard\n2. Click 'Book Appointment'\n3. Select your preferred doctor or specialty\n4. Choose an available date and time slot\n5. Confirm your booking and make payment if required\n6. You'll receive a confirmation email and SMS",
            helpful: { yes: 432, no: 15 },
            related: [16, 17, 18]
        },
        {
            id: 16,
            question: "Can I cancel my appointment?",
            answer: "Yes, you can cancel your appointment up to 2 hours before the scheduled time without any charges. To cancel:\n1. Go to 'My Appointments'\n2. Find the appointment you want to cancel\n3. Click 'Cancel Appointment'\n4. Confirm the cancellation\n\nCancellations made less than 2 hours before may incur a fee.",
            helpful: { yes: 378, no: 22 },
            related: [15, 17, 25]
        },
        {
            id: 17,
            question: "Can I reschedule my consultation?",
            answer: "Yes, you can reschedule your appointment:\n1. Open 'My Appointments'\n2. Select the appointment you want to reschedule\n3. Click 'Reschedule'\n4. Choose a new date and time\n5. Confirm the changes\n\nNote: Rescheduling is free if done 24 hours before the appointment.",
            helpful: { yes: 356, no: 18 },
            related: [15, 16, 18]
        },
    ],
    video: [
        {
            id: 25,
            question: "How do I join a video consultation?",
            answer: "1. Open the app 5-10 minutes before your scheduled time\n2. Go to 'My Appointments'\n3. Tap on your upcoming appointment\n4. Click 'Join Consultation' button\n5. Allow camera and microphone permissions when prompted\n6. Wait in the virtual waiting room for the doctor to join\n7. Your consultation will begin automatically",
            helpful: { yes: 521, no: 28 },
            related: [26, 27, 28, 29]
        },
        {
            id: 26,
            question: "My doctor is not joining. What should I do?",
            answer: "If your doctor hasn't joined within 10 minutes of the scheduled time:\n1. Check your internet connection\n2. Refresh the page or restart the app\n3. Wait up to 15 minutes total\n4. If the doctor still doesn't join, you'll automatically receive a full refund\n5. You can reschedule or contact support for assistance\n\nWe apologize for any inconvenience.",
            helpful: { yes: 298, no: 45 },
            related: [25, 30, 31]
        },
        {
            id: 27,
            question: "How early should I join?",
            answer: "We recommend joining 5-10 minutes before your scheduled appointment time. This allows you to:\n- Test your audio and video\n- Ensure stable internet connection\n- Complete any pre-consultation forms\n- Settle into a quiet, private space\n\nThe consultation room opens 15 minutes before the scheduled time.",
            helpful: { yes: 412, no: 11 },
            related: [25, 28]
        },
        {
            id: 28,
            question: "Can I test my camera and microphone?",
            answer: "Yes! Before your consultation:\n1. Go to Settings > Device Settings\n2. Click 'Test Camera & Microphone'\n3. You'll see a preview of your camera\n4. Speak to test your microphone\n5. Adjust settings if needed\n\nYou can also test during the waiting room before the doctor joins.",
            helpful: { yes: 367, no: 19 },
            related: [25, 27, 32]
        },
        {
            id: 29,
            question: "What internet speed is recommended?",
            answer: "For optimal video quality:\n- Minimum: 1.5 Mbps download/upload\n- Recommended: 3+ Mbps download/upload\n- For HD video: 5+ Mbps\n\nTips for better connection:\n- Use Wi-Fi instead of mobile data when possible\n- Close other apps using internet\n- Move closer to your router\n- If connection is poor, video quality will automatically adjust",
            helpful: { yes: 289, no: 23 },
            related: [25, 32, 33]
        },
        {
            id: 30,
            question: "What if my call gets disconnected?",
            answer: "If disconnected during consultation:\n1. Don't panic - this happens occasionally\n2. Rejoin immediately using the same 'Join Consultation' button\n3. The doctor will be notified and waiting\n4. Your consultation time continues from where it left off\n5. If you can't reconnect within 5 minutes, contact support\n\nYour session is automatically saved.",
            helpful: { yes: 334, no: 31 },
            related: [25, 26, 32]
        },
    ],
    payments: [
        {
            id: 40,
            question: "Which payment methods are accepted?",
            answer: "We accept multiple payment methods:\n- Credit/Debit Cards (Visa, Mastercard, Amex)\n- Mobile Banking (bKash, Nagad, Rocket)\n- Internet Banking\n- Digital Wallets\n- Cash on delivery (for select services)\n\nAll payments are processed securely with SSL encryption.",
            helpful: { yes: 445, no: 17 },
            related: [41, 42, 43]
        },
        {
            id: 41,
            question: "Is online payment secure?",
            answer: "Absolutely! We use industry-leading security measures:\n- 256-bit SSL encryption\n- PCI DSS compliant payment gateway\n- No card details stored on our servers\n- Two-factor authentication for transactions\n- Fraud detection systems\n\nYour financial information is completely safe with us.",
            helpful: { yes: 398, no: 9 },
            related: [40, 50, 51]
        },
        {
            id: 42,
            question: "When will I receive my refund?",
            answer: "Refund timeline depends on the payment method:\n- Mobile Banking: 1-3 business days\n- Credit/Debit Cards: 5-7 business days\n- Internet Banking: 3-5 business days\n\nYou'll receive an email confirmation once the refund is processed. If you don't receive it within the stated time, contact our support team.",
            helpful: { yes: 367, no: 28 },
            related: [40, 43, 16]
        },
    ],
    prescriptions: [
        {
            id: 55,
            question: "Where can I download my prescription?",
            answer: "To access your prescription:\n1. Go to 'Prescriptions' from the main menu\n2. Find the prescription you need\n3. Click on it to view details\n4. Click 'Download PDF' or 'Share'\n5. The prescription will be saved to your device\n\nPrescriptions are available immediately after the consultation ends and remain accessible indefinitely.",
            helpful: { yes: 489, no: 14 },
            related: [56, 57, 58]
        },
        {
            id: 56,
            question: "How long is my prescription available?",
            answer: "Your prescriptions are stored permanently in your account and never expire. You can:\n- Access them anytime from any device\n- Download them as PDF\n- Share them with other healthcare providers\n- Print them when needed\n\nWe maintain digital records for your complete medical history.",
            helpful: { yes: 412, no: 11 },
            related: [55, 57, 60]
        },
    ],
    records: [
        {
            id: 60,
            question: "How do I upload medical reports?",
            answer: "To upload medical reports:\n1. Go to 'Medical Records'\n2. Click 'Upload New Document'\n3. Select file type (Lab Report, Scan, X-Ray, etc.)\n4. Choose file from your device (PDF, JPG, PNG)\n5. Add date and optional notes\n6. Click 'Upload'\n\nMaximum file size: 10MB per file",
            helpful: { yes: 356, no: 22 },
            related: [61, 62, 63]
        },
    ],
    account: [
        {
            id: 70,
            question: "How do I change my password?",
            answer: "To change your password:\n1. Go to 'Profile' > 'Security'\n2. Click 'Change Password'\n3. Enter your current password\n4. Enter your new password (min 8 characters)\n5. Confirm the new password\n6. Click 'Update Password'\n\nYou'll receive a confirmation email. If you forgot your password, use 'Forgot Password' on the login page.",
            helpful: { yes: 423, no: 16 },
            related: [71, 72, 73]
        },
        {
            id: 71,
            question: "How do I update my profile?",
            answer: "To update your profile information:\n1. Go to 'Profile'\n2. Click 'Edit Profile'\n3. Update your information (name, phone, address, etc.)\n4. Upload a new profile picture if desired\n5. Click 'Save Changes'\n\nSome changes may require verification via email or SMS.",
            helpful: { yes: 378, no: 19 },
            related: [70, 72]
        },
    ],
    privacy: [
        {
            id: 80,
            question: "Is my consultation private?",
            answer: "Yes, your privacy is our top priority:\n- All consultations are confidential\n- Video calls are end-to-end encrypted\n- Only you and your doctor can access the session\n- No recordings are made without explicit consent\n- Your medical information is protected under healthcare privacy laws\n- We never share your data without your permission",
            helpful: { yes: 512, no: 8 },
            related: [81, 82, 83]
        },
    ],
    technical: [
        {
            id: 90,
            question: "The app is crashing. What should I do?",
            answer: "If the app keeps crashing:\n1. Close and restart the app\n2. Check for app updates in your app store\n3. Clear app cache (Settings > Apps > Renovalife > Clear Cache)\n4. Restart your device\n5. Uninstall and reinstall the app (your data is safe)\n6. If problem persists, contact technical support\n\nMake sure you have the latest version installed.",
            helpful: { yes: 289, no: 34 },
            related: [91, 92, 93]
        },
        {
            id: 91,
            question: "Video is frozen. How do I fix it?",
            answer: "To fix frozen video:\n1. Check your internet connection speed\n2. Close other apps using bandwidth\n3. Switch from mobile data to Wi-Fi (or vice versa)\n4. Lower video quality in settings\n5. Refresh the page or rejoin the call\n6. Ask the other person to check their connection\n\nThe app automatically adjusts quality based on connection speed.",
            helpful: { yes: 367, no: 28 },
            related: [90, 92, 29]
        },
    ],
};

// Flatten FAQs for search
const allFaqs = Object.entries(faqData).flatMap(([category, faqs]) =>
    faqs.map(faq => ({ ...faq, category }))
);

export default function PatientFAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openFaqId, setOpenFaqId] = useState(null);
    const [helpfulFeedback, setHelpfulFeedback] = useState({});
    const [showContactSupport, setShowContactSupport] = useState(false);

    // Filter FAQs based on search and category
    const filteredFaqs = useMemo(() => {
        let filtered = allFaqs;

        if (activeCategory !== "all") {
            filtered = filtered.filter(faq => faq.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                faq =>
                    faq.question.toLowerCase().includes(query) ||
                    faq.answer.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, activeCategory]);

    // Get popular questions (top 5 by helpful votes)
    const popularQuestions = useMemo(() => {
        return [...allFaqs]
            .sort((a, b) => (b.helpful.yes - b.helpful.no) - (a.helpful.yes - a.helpful.no))
            .slice(0, 5);
    }, []);

    // Get related FAQs
    const getRelatedFaqs = (faqId) => {
        const faq = allFaqs.find(f => f.id === faqId);
        if (!faq || !faq.related) return [];
        return faq.related.map(id => allFaqs.find(f => f.id === id)).filter(Boolean);
    };

    const handleHelpfulClick = (faqId, isHelpful) => {
        setHelpfulFeedback(prev => ({
            ...prev,
            [faqId]: isHelpful
        }));
    };

    const toggleFaq = (faqId) => {
        setOpenFaqId(openFaqId === faqId ? null : faqId);
    };

    return (
        <motion.div
            className="faq-page"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Header */}
            <motion.div className="faq-header" variants={item}>

                {/* Search Bar */}
                <div className="faq-search">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search your question..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="clear-search">
                            <X size={18} />
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Categories */}
            <motion.div className="faq-categories" variants={item}>
                <button
                    className={`category-chip ${activeCategory === "all" ? "active" : ""}`}
                    onClick={() => setActiveCategory("all")}
                >
                    All
                </button>
                {faqCategories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`category-chip ${activeCategory === cat.id ? "active" : ""}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <span className="category-icon">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </motion.div>

            {/* Popular Questions */}
            {!searchQuery && activeCategory === "all" && (
                <motion.div className="popular-section" variants={item}>
                    <h3 className="section-title">
                        <span className="star-icon">⭐</span>
                        Popular Questions
                    </h3>
                    <div className="popular-faqs">
                        {popularQuestions.map((faq) => (
                            <motion.button
                                key={faq.id}
                                className="popular-faq-item"
                                onClick={() => {
                                    setActiveCategory(faq.category);
                                    setTimeout(() => {
                                        setOpenFaqId(faq.id);
                                        document.getElementById(`faq-${faq.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }, 100);
                                }}
                                whileHover={{ x: 4 }}
                            >
                                <span className="faq-q">{faq.question}</span>
                                <ChevronRight size={16} />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* FAQ List */}
            <motion.div className="faq-list-section" variants={item}>
                {filteredFaqs.length === 0 ? (
                    <motion.div className="no-results" variants={item}>
                        <div className="no-results-icon">📄</div>
                        <h3>No matching FAQ found</h3>
                        <p>Try another keyword or contact support.</p>
                        <button
                            className="btn-contact-support"
                            onClick={() => setShowContactSupport(true)}
                        >
                            Contact Support
                        </button>
                    </motion.div>
                ) : (
                    <div className="faqs-container">
                        <AnimatePresence mode="popLayout">
                            {filteredFaqs.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    id={`faq-${faq.id}`}
                                    className="faq-item"
                                    variants={item}
                                    layout
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleFaq(faq.id)}
                                    >
                                        <span className="question-text">{faq.question}</span>
                                        <motion.div
                                            animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openFaqId === faq.id && (
                                            <motion.div
                                                className="faq-answer-container"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="faq-answer">
                                                    {faq.answer.split('\n').map((line, idx) => (
                                                        <p key={idx} className={line.startsWith('-') || /^\d\./.test(line) ? "answer-step" : ""}>
                                                            {line}
                                                        </p>
                                                    ))}
                                                </div>

                                                {/* Helpful Feedback */}
                                                <div className="helpful-feedback">
                                                    <span className="feedback-label">Was this answer helpful?</span>
                                                    <div className="feedback-buttons">
                                                        <button
                                                            className={`feedback-btn ${helpfulFeedback[faq.id] === true ? "active yes" : ""}`}
                                                            onClick={() => handleHelpfulClick(faq.id, true)}
                                                        >
                                                            👍 Yes ({faq.helpful.yes})
                                                        </button>
                                                        <button
                                                            className={`feedback-btn ${helpfulFeedback[faq.id] === false ? "active no" : ""}`}
                                                            onClick={() => handleHelpfulClick(faq.id, false)}
                                                        >
                                                            👎 No ({faq.helpful.no})
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Related Questions */}
                                                {getRelatedFaqs(faq.id).length > 0 && (
                                                    <div className="related-questions">
                                                        <h4>You may also like</h4>
                                                        <div className="related-list">
                                                            {getRelatedFaqs(faq.id).map((related) => (
                                                                <button
                                                                    key={related.id}
                                                                    className="related-faq"
                                                                    onClick={() => setOpenFaqId(related.id)}
                                                                >
                                                                    • {related.question}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>

            {/* Contact Support Section */}
            <motion.div className="contact-support-section" variants={item}>
                <h3>Didn't find your answer?</h3>
                <p>Need more help? Our support team is here for you.</p>
                <div className="support-options">
                    <button className="support-option">
                        <span className="support-icon">💬</span>
                        <span>Live Chat</span>
                    </button>
                    <button className="support-option">
                        <span className="support-icon">📞</span>
                        <span>Call Support</span>
                    </button>
                    <button className="support-option">
                        <span className="support-icon">📧</span>
                        <span>Email Support</span>
                    </button>
                    <button className="support-option">
                        <span className="support-icon">🎫</span>
                        <span>Submit Ticket</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}