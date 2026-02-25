import { useState } from 'react';
import { applicationsData } from '../../data/scholarships';
import { Search, CheckCircle, XCircle, Clock, Eye, UserCheck, FileText } from 'lucide-react';
import './AdminPages.css';

const statuses = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

export default function ReviewApplications() {
    const [apps, setApps] = useState([...applicationsData]);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);

    const filtered = apps.filter(a => {
        const matchFilter = filter === 'All' || a.status === filter;
        const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || a.scholarshipTitle.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const updateStatus = (id, status) => {
        setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
        if (selectedApp?.id === id) setSelectedApp(prev => ({ ...prev, status }));
    };

    return (
        <div className="review-applications">
            <div className="page-header"><h1>Review Applications</h1><p>Review and manage student scholarship applications</p></div>
            <div className="admin-actions">
                <div className="search-bar" style={{ flex: 1 }}><Search size={18} /><input placeholder="Search by student or scholarship..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <div className="filter-chips">{statuses.map(s => <button key={s} className={`chip ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>)}</div>
            </div>
            <div className="table-container">
                <table>
                    <thead><tr><th>Student</th><th>Scholarship</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(app => (
                            <tr key={app.id}>
                                <td><div style={{ fontWeight: 600 }}>{app.studentName}</div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{app.studentEmail}</div></td>
                                <td>{app.scholarshipTitle}</td>
                                <td>{app.appliedDate}</td>
                                <td><span className={`badge badge-${app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : app.status === 'Under Review' ? 'info' : 'warning'}`}>{app.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setSelectedApp(app)}><Eye size={14} /></button>
                                        {app.status !== 'Approved' && <button className="btn btn-success btn-sm" onClick={() => updateStatus(app.id, 'Approved')}><CheckCircle size={14} /></button>}
                                        {app.status !== 'Rejected' && <button className="btn btn-danger btn-sm" onClick={() => updateStatus(app.id, 'Rejected')}><XCircle size={14} /></button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filtered.length === 0 && <div className="empty-state" style={{ marginTop: 32 }}><FileText size={48} /><h3>No applications found</h3></div>}

            {selectedApp && (
                <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>Application Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Student</label><p style={{ fontWeight: 600 }}>{selectedApp.studentName}</p><p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedApp.studentEmail}</p></div>
                            </div>
                            <div><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Scholarship</label><p style={{ fontWeight: 600 }}>{selectedApp.scholarshipTitle}</p></div>
                            <div><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Status</label><div><span className={`badge badge-${selectedApp.status === 'Approved' ? 'success' : selectedApp.status === 'Rejected' ? 'danger' : 'warning'}`}>{selectedApp.status}</span></div></div>
                            <div><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Documents</label><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>{selectedApp.documents.map(d => <span className="tag" key={d}><FileText size={12} /> {d}</span>)}</div></div>
                            <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                                <button className="btn btn-success btn-sm" onClick={() => updateStatus(selectedApp.id, 'Approved')}><CheckCircle size={14} /> Approve</button>
                                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(selectedApp.id, 'Rejected')}><XCircle size={14} /> Reject</button>
                                <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setSelectedApp(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
