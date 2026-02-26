import { useState } from 'react';
import { financialAidData } from '../../data/scholarships';
import { IndianRupee, Calendar, CheckCircle, Clock, ArrowRight, Banknote, Briefcase, CreditCard, X, Upload, Send } from 'lucide-react';
import './StudentPages.css';

const typeIcon = (type) => {
    if (type === 'Grant') return <Banknote size={20} style={{ color: 'var(--success)' }} />;
    if (type === 'Work-Study') return <Briefcase size={20} style={{ color: 'var(--primary)' }} />;
    return <CreditCard size={20} style={{ color: 'var(--warning)' }} />;
};

export default function FinancialAid() {
    const [selectedAid, setSelectedAid] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleApplyClick = (aid) => {
        setSelectedAid(aid);
        setSubmitted(false);
    };

    return (
        <div className="financial-aid-page">
            <div className="page-header">
                <h1>Financial Aid Opportunities</h1>
                <p>Explore grants, loans, and work-study programs to fund your education</p>
            </div>

            <div className="stats-grid" style={{ marginBottom: 32 }}>
                <div className="stat-card glass-card">
                    <div className="stat-icon-wrap" style={{ background: 'rgba(16,185,129,0.1)' }}>
                        <IndianRupee size={24} style={{ color: 'var(--success)' }} />
                    </div>
                    <div className="stat-info">
                        <h3>{financialAidData.length}</h3>
                        <p>Available Programs</p>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-icon-wrap" style={{ background: 'rgba(124,58,237,0.1)' }}>
                        <Banknote size={24} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div className="stat-info">
                        <h3>₹{(financialAidData.reduce((a, b) => a + b.amount, 0) / 100000).toFixed(2)}L</h3>
                        <p>Total Aid Available</p>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-icon-wrap" style={{ background: 'rgba(245,158,11,0.1)' }}>
                        <Clock size={24} style={{ color: 'var(--warning)' }} />
                    </div>
                    <div className="stat-info">
                        <h3>{financialAidData.filter(a => a.status === 'Closing Soon').length}</h3>
                        <p>Closing Soon</p>
                    </div>
                </div>
            </div>

            <div className="aid-grid">
                {financialAidData.map((aid, i) => (
                    <div className="card aid-card" key={aid.id} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div className="aid-type">
                                {typeIcon(aid.type)}
                                <span className={`badge ${aid.type === 'Grant' ? 'badge-success' : aid.type === 'Loan' ? 'badge-warning' : 'badge-primary'}`}>
                                    {aid.type}
                                </span>
                            </div>
                            <span className={`badge ${aid.status === 'Closing Soon' ? 'badge-danger' : 'badge-success'}`}>
                                {aid.status}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{aid.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16, flex: 1 }}>{aid.description}</p>

                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <CheckCircle size={14} style={{ color: 'var(--primary-light)' }} /> {aid.eligibility}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Calendar size={14} style={{ color: 'var(--primary-light)' }} /> Deadline: {aid.deadline}
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', fontFamily: "'Space Grotesk', sans-serif" }}>
                                ₹{aid.amount.toLocaleString('en-IN')}
                            </span>
                            <button className="btn btn-primary btn-sm" onClick={() => handleApplyClick(aid)}>
                                Apply <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Application Modal */}
            {selectedAid && (
                <div className="modal-overlay" onClick={() => setSelectedAid(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ animation: 'fadeInUp 0.3s ease' }}>
                        {!submitted ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '-10px 0 24px' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.4rem', marginBottom: 4 }}>Apply for Aid</h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                            {selectedAid.title}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAid(null)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Enter your full legal name" />
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label>Briefly Explain Your Need</label>
                                    <textarea rows={4} placeholder="Tell us why you deserve or need this financial aid..."></textarea>
                                </div>

                                <div className="file-upload" style={{ marginBottom: 24, padding: 24, marginTop: 16 }}>
                                    <Upload size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 8px' }} />
                                    <p style={{ fontWeight: 600 }}>Upload Income Proof / Identity</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PDF or JPG up to 5MB</p>
                                </div>

                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSelectedAid(null)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={() => setSubmitted(true)}>
                                        <Send size={16} /> Submit Application
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                                    <CheckCircle size={36} style={{ color: 'var(--success)' }} />
                                </div>
                                <h3 style={{ marginBottom: 12, fontSize: '1.6rem', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>Application Submitted!</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    Your request for <strong>{selectedAid.title}</strong> has been sent securely. We'll update you via email and your dashboard.
                                </p>
                                <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedAid(null)}>
                                    Back to Financial Aid
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
