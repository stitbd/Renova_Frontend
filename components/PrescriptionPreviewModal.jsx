// ═══════════════════════════════════════════════════════════════
// PDF PREVIEW MODAL
// File: components/PrescriptionPreviewModal.jsx
// ═══════════════════════════════════════════════════════════════
"use client";

import { useEffect, useRef } from "react";
import "./PrescriptionPreviewModal.css";

export default function PrescriptionPreviewModal({ pdfUrl, onClose, onDownload, onPrint }) {
    const overlayRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKey);
        // Prevent body scroll
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    return (
        <div className="prv-overlay" ref={overlayRef} onClick={handleOverlayClick}>
            <div className="prv-modal">
                {/* Modal Header */}
                <div className="prv-header">
                    <div className="prv-header-left">
                        <div className="prv-header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="prv-title">Prescription Preview</h3>
                            <p className="prv-subtitle">Review before downloading or printing</p>
                        </div>
                    </div>
                    <div className="prv-header-actions">
                        {onDownload && (
                            <button className="prv-btn download" onClick={onDownload}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download
                            </button>
                        )}
                        {onPrint && (
                            <button className="prv-btn print" onClick={onPrint}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 6 2 18 2 18 9" />
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                    <rect x="6" y="14" width="12" height="8" />
                                </svg>
                                Print
                            </button>
                        )}
                        <button className="prv-btn close" onClick={onClose}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Close
                        </button>
                    </div>
                </div>

                {/* PDF Iframe */}
                <div className="prv-body">
                    {pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            className="prv-iframe"
                            title="Prescription PDF Preview"
                        />
                    ) : (
                        <div className="prv-loading">
                            <div className="prv-spinner" />
                            <p>Generating prescription PDF…</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}