"use client";

import { useEffect, useRef } from "react";
import "./PrescriptionPreviewModal.css";

export default function PrescriptionPreviewModal({
  pdfUrl,
  onClose,
  onDownload,
  onPrint,
  title = "Prescription Preview",
  subtitle = "Review the prescription before saving, downloading, or printing.",
}) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      onClose?.();
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }

    if (!pdfUrl) return;

    const printWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");

    if (!printWindow) return;

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }

    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `prescription-${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      className="prv-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prescription-preview-title"
    >
      <div className="prv-modal" ref={modalRef} tabIndex={-1}>
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
              <h3 id="prescription-preview-title" className="prv-title">
                {title}
              </h3>
              <p className="prv-subtitle">{subtitle}</p>
            </div>
          </div>

          <div className="prv-header-actions">
            <button
              type="button"
              className="prv-btn secondary"
              onClick={handleDownload}
              disabled={!pdfUrl}
            >
              Download
            </button>

            <button
              type="button"
              className="prv-btn primary"
              onClick={handlePrint}
              disabled={!pdfUrl}
            >
              Print
            </button>

            <button
              type="button"
              className="prv-icon-close"
              onClick={onClose}
              aria-label="Close preview"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="prv-toolbar">
          <div className="prv-status">
            <span className={`prv-status-dot ${pdfUrl ? "ready" : "loading"}`} />
            {pdfUrl ? "PDF ready for review" : "Generating PDF preview..."}
          </div>

          <div className="prv-meta">
            Press <kbd>Esc</kbd> to close
          </div>
        </div>

        <div className="prv-body">
          {!pdfUrl ? (
            <div className="prv-loading">
              <div className="prv-spinner" />
              <h4>Preparing preview</h4>
              <p>Please wait while the prescription PDF is being generated.</p>
            </div>
          ) : (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="prv-iframe"
              title="Prescription PDF Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
}