import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { scholarshipsData } from '../../data/scholarships';
import { ArrowLeft, Upload, Send, CheckCircle } from 'lucide-react';
import './StudentPages.css';

export default function ApplyScholarship() {
    const { id } = useParams();
    const navigate = useNavigate();
    const scholarship = scholarshipsData.find(s => s.id === parseInt(id));
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ cgpa: '', essay: '', phone: '', address: '' });
    const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

    if (!scholarship) return <div className="empty-state"><h3>Scholarship not found</h3></div>;

    if (submitted) return (
        <div className="apply-page" style={{ textAlign: 'center', paddingTop: 80 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle size={40} style={{ color: 'var(--success)' }} />
            </div>
            <h1 style={{ marginBottom: 8 }}>Application Submitted!</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Your application for <strong>{scholarship.title}</strong> has been submitted successfully.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <Link to="/student/applications" className="btn btn-primary">View Applications</Link>
                <Link to="/student/scholarships" className="btn btn-secondary">Browse More</Link>
            </div>
        </div>
    );

    return (
        <div className="apply-page">
            <Link to={`/student/scholarships/${id}`} className="btn btn-secondary btn-sm" style={{ marginBottom: 24 }}><ArrowLeft size={16} /> Back</Link>
            <div className="page-header"><h1>Apply: {scholarship.title}</h1><p>Complete the form below to submit your application</p></div>
            <div className="apply-form">
                <div className="card">
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <div className="input-group"><label>CGPA / Percentage</label><input type="number" step="0.1" max="10" placeholder="8.5" value={form.cgpa} onChange={e => update('cgpa', e.target.value)} required /></div>
                        <div className="input-group"><label>Phone</label><input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
                    </div>
                    <div className="input-group" style={{ marginTop: 16 }}><label>Address</label><input type="text" placeholder="Your current address" value={form.address} onChange={e => update('address', e.target.value)} /></div>
                </div>
                <div className="card">
                    <h3>Personal Statement / Essay</h3>
                    <div className="input-group"><label>Why do you deserve this scholarship?</label><textarea rows={6} placeholder="Write your essay here..." value={form.essay} onChange={e => update('essay', e.target.value)} style={{ resize: 'vertical' }}></textarea></div>
                </div>
                <div className="card">
                    <h3>Required Documents</h3>
                    <div className="file-upload"><Upload size={32} style={{ color: 'var(--text-muted)' }} /><p>Drag & drop files or click to browse</p><p style={{ fontSize: '0.75rem' }}>PDF, DOC up to 10MB each</p></div>
                    <div style={{ marginTop: 12 }}>
                        {scholarship.requirements.map(r => <div key={r} style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>• {r}</div>)}
                    </div>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => setSubmitted(true)} style={{ width: '100%', justifyContent: 'center' }}><Send size={18} /> Submit Application</button>
            </div>
        </div>
    );
}
