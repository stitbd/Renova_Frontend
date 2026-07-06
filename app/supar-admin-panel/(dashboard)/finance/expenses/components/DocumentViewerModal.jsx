// app/super-admin/finance/expenses/components/DocumentViewerModal.jsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, FileText, Image as ImageIcon, Download } from "lucide-react";
import Modal from "./Modal";

export default function DocumentViewerModal({ open, onClose, documents = [], startIndex = 0 }) {
    const [index, setIndex] = useState(startIndex);

    useEffect(() => {
        if (open) setIndex(startIndex);
    }, [open, startIndex]);

    if (!open || documents.length === 0) return null;

    const doc = documents[index];
    const isPdf = doc?.url?.toLowerCase().endsWith(".pdf");

    const goPrev = () => setIndex((i) => (i === 0 ? documents.length - 1 : i - 1));
    const goNext = () => setIndex((i) => (i === documents.length - 1 ? 0 : i + 1));

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={doc?.name || "Document"}
            subtitle={documents.length > 1 ? `Document ${index + 1} of ${documents.length}` : "Attached document"}
            icon={isPdf ? FileText : ImageIcon}
            width={820}
            zIndex={1100}
        >
            <div className="em-doc-viewer">
                <div className="em-doc-viewer-stage">
                    {documents.length > 1 && (
                        <button type="button" className="em-doc-nav em-doc-nav-prev" onClick={goPrev} aria-label="Previous document">
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    {isPdf ? (
                        <iframe src={doc.url} className="em-doc-frame" title={doc.name} />
                    ) : (
                        <img src={doc.url} alt={doc.name} className="em-doc-image" />
                    )}

                    {documents.length > 1 && (
                        <button type="button" className="em-doc-nav em-doc-nav-next" onClick={goNext} aria-label="Next document">
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>

                <div className="em-doc-viewer-footer">
                    <span className="em-doc-viewer-name">{doc?.name}</span>
                    <div className="em-doc-viewer-actions">
                        {documents.length > 1 && (
                            <span className="em-doc-viewer-counter">{index + 1} / {documents.length}</span>
                        )}
                        <a href={doc?.url} download={doc?.name} className="em-btn em-btn-ghost">
                            <Download size={14} /> Download
                        </a>
                    </div>
                </div>

                {documents.length > 1 && (
                    <div className="em-doc-thumbs">
                        {documents.map((d, i) => (
                            <button
                                type="button"
                                key={i}
                                className={`em-doc-thumb ${i === index ? "active" : ""}`}
                                onClick={() => setIndex(i)}
                                title={d.name}
                            >
                                {d.url.toLowerCase().endsWith(".pdf") ? <FileText size={16} /> : <ImageIcon size={16} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}