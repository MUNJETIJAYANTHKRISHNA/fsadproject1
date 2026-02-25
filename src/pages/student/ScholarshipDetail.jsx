import { useParams, Link } from 'react-router-dom';
import { scholarshipsData } from '../../data/scholarships';
import { Clock, IndianRupee, Users, CheckCircle, ArrowLeft, FileText, Calendar } from 'lucide-react';
import './StudentPages.css';

export default function ScholarshipDetail() {
    const { id } = useParams();
    const scholarship = scholarshipsData.find(s => s.id === parseInt(id));
    if (!scholarship) return <div className="empty-state"><h3>Scholarship not found</h3></div>;

    const days = Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    const fill = Math.min((scholarship.applicants / scholarship.slots) * 100, 100);

    return (
        <div className="detail-page">
            <Link to="/student/scholarships" className="btn btn-secondary btn-sm" style={{ marginBottom: 24 }}><ArrowLeft size={16} /> Back to Scholarships</Link>
            <div className="detail-header">
                <div>
                    <h1>{scholarship.title}</h1>
                    <p className="provider">{scholarship.provider}</p>
                    <div className="tags" style={{ marginTop: 12 }}>{scholarship.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div className="detail-amount">₹{scholarship.amount.toLocaleString('en-IN')}</div>
                    <span className={`badge ${scholarship.status === 'Closing Soon' ? 'badge-danger' : 'badge-success'}`} style={{ marginTop: 8 }}>{scholarship.status}</span>
                </div>
            </div>
            <div className="detail-grid">
                <div>
                    <div className="card">
                        <h2 style={{ marginBottom: 16, fontSize: '1.1rem' }}>About This Scholarship</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{scholarship.description}</p>
                        <div className="detail-meta">
                            <div className="meta-item"><label>Deadline</label><span><Calendar size={14} style={{ marginRight: 6 }} />{scholarship.deadline}</span></div>
                            <div className="meta-item"><label>Category</label><span>{scholarship.category}</span></div>
                            <div className="meta-item"><label>Applicants</label><span>{scholarship.applicants}</span></div>
                            <div className="meta-item"><label>Available Slots</label><span>{scholarship.slots}</span></div>
                        </div>
                        <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: '1rem' }}>Eligibility</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{scholarship.eligibility}</p>
                        <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: '1rem' }}>Required Documents</h3>
                        <ul className="requirements-list">
                            {scholarship.requirements.map(r => <li key={r}><CheckCircle size={16} style={{ color: 'var(--success)' }} />{r}</li>)}
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="card sidebar-card">
                        <div className="progress-section">
                            <div className="progress-label"><span>Competition</span><span>{scholarship.applicants}/{scholarship.slots}</span></div>
                            <div className="progress-bar"><div className="fill" style={{ width: `${fill}%`, background: fill > 80 ? 'var(--danger)' : 'var(--primary)' }}></div></div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>{scholarship.applicants} applicants for {scholarship.slots} slots</p>
                        </div>
                        <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><Clock size={16} style={{ color: days <= 30 ? 'var(--danger)' : 'var(--accent)' }} /><span style={{ fontWeight: 600 }}>{days} days remaining</span></div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Deadline: {scholarship.deadline}</p>
                        </div>
                        <Link to={`/student/scholarships/${id}/apply`} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                            <FileText size={18} /> Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
