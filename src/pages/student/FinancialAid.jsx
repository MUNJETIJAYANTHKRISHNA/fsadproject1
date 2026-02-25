import { financialAidData } from '../../data/scholarships';
import { IndianRupee, Calendar, CheckCircle, Clock, ArrowRight, Banknote, Briefcase, CreditCard } from 'lucide-react';
import './StudentPages.css';

const typeIcon = (type) => {
    if (type === 'Grant') return <Banknote size={20} style={{ color: 'var(--success)' }} />;
    if (type === 'Work-Study') return <Briefcase size={20} style={{ color: 'var(--primary)' }} />;
    return <CreditCard size={20} style={{ color: 'var(--warning)' }} />;
};

export default function FinancialAid() {
    return (
        <div className="financial-aid-page">
            <div className="page-header"><h1>Financial Aid Opportunities</h1><p>Explore grants, loans, and work-study programs to fund your education</p></div>
            <div className="stats-grid" style={{ marginBottom: 32 }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}><IndianRupee size={24} style={{ color: '#10b981' }} /></div><div className="stat-info"><h3>{financialAidData.length}</h3><p>Available Programs</p></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: 'rgba(99,102,241,0.15)' }}><Banknote size={24} style={{ color: '#6366f1' }} /></div><div className="stat-info"><h3>₹{financialAidData.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}</h3><p>Total Aid Available</p></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}><Clock size={24} style={{ color: '#f59e0b' }} /></div><div className="stat-info"><h3>{financialAidData.filter(a => a.status === 'Closing Soon').length}</h3><p>Closing Soon</p></div></div>
            </div>
            <div className="aid-grid">
                {financialAidData.map((aid, i) => (
                    <div className="card aid-card" key={aid.id} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div className="aid-type">{typeIcon(aid.type)}<span className={`badge ${aid.type === 'Grant' ? 'badge-success' : aid.type === 'Loan' ? 'badge-warning' : 'badge-primary'}`}>{aid.type}</span></div>
                            <span className={`badge ${aid.status === 'Closing Soon' ? 'badge-danger' : 'badge-success'}`}>{aid.status}</span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{aid.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16, flex: 1 }}>{aid.description}</p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><CheckCircle size={14} /> {aid.eligibility}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> Deadline: {aid.deadline}</div>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--success)' }}>₹{aid.amount.toLocaleString('en-IN')}</span>
                            <button className="btn btn-primary btn-sm">Apply <ArrowRight size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
