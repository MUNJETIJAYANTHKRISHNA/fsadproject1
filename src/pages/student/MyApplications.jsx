import { useState } from 'react';
import { applicationsData } from '../../data/scholarships';
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, FileText } from 'lucide-react';
import './StudentPages.css';

const statuses = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

export default function MyApplications() {
    const [filter, setFilter] = useState('All');
    const [selectedApp, setSelectedApp] = useState(null);
    const apps = applicationsData.filter(a => filter === 'All' || a.status === filter);

    const statusIcon = (s) => {
        if (s === 'Approved') return <CheckCircle size={16} style={{ color: 'var(--success)' }} />;
        if (s === 'Rejected') return <XCircle size={16} style={{ color: 'var(--danger)' }} />;
        if (s === 'Under Review') return <Eye size={16} style={{ color: 'var(--accent)' }} />;
        return <Clock size={16} style={{ color: 'var(--warning)' }} />;
    };

    return (
        <div className="applications-page">
            <div className="page-header"><h1>My Applications</h1><p>Track and monitor all your scholarship applications</p></div>
            <div className="status-tabs">
                {statuses.map(s => <button key={s} className={`chip ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>)}
            </div>
            <div className="table-container">
                <table>
                    <thead><tr><th>Scholarship</th><th>Applied Date</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {apps.map(app => (
                            <tr key={app.id}>
                                <td><div style={{ fontWeight: 600 }}>{app.scholarshipTitle}</div></td>
                                <td>{app.appliedDate}</td>
                                <td><span className={`badge badge-${app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : app.status === 'Under Review' ? 'info' : 'warning'}`}>{statusIcon(app.status)} {app.status}</span></td>
                                <td><button className="btn btn-secondary btn-sm" onClick={() => setSelectedApp(app)}><Eye size={14} /> View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {apps.length === 0 && <div className="empty-state" style={{ marginTop: 32 }}><FileText size={48} /><h3>No applications found</h3><p>No applications match the selected filter</p></div>}

            {selectedApp && (
                <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>{selectedApp.scholarshipTitle}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                            <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</label><div><span className={`badge badge-${selectedApp.status === 'Approved' ? 'success' : selectedApp.status === 'Rejected' ? 'danger' : 'warning'}`}>{selectedApp.status}</span></div></div>
                            <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Applied Date</label><p>{selectedApp.appliedDate}</p></div>
                            <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Documents</label><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>{selectedApp.documents.map(d => <span className="tag" key={d}><FileText size={12} /> {d}</span>)}</div></div>
                        </div>
                        <button className="btn btn-secondary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }} onClick={() => setSelectedApp(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
