import { scholarshipsData, applicationsData, financialAidData } from '../../data/scholarships';
import { GraduationCap, Users, FileText, IndianRupee, TrendingUp, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminPages.css';

export default function AdminDashboard() {
    const totalApps = applicationsData.length;
    const approved = applicationsData.filter(a => a.status === 'Approved').length;
    const pending = applicationsData.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
    const totalAid = financialAidData.reduce((a, b) => a + b.amount, 0);

    const stats = [
        { label: 'Total Scholarships', value: scholarshipsData.length, icon: GraduationCap, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
        { label: 'Applications', value: totalApps, icon: FileText, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
        { label: 'Approved', value: approved, icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
        { label: 'Pending Review', value: pending, icon: Clock, color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
    ];

    const recentApps = applicationsData.slice(0, 5);

    return (
        <div className="admin-dashboard">
            <div className="page-header"><h1>Admin Dashboard</h1><p>Overview of scholarships, applications, and financial aid</p></div>
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="stat-icon" style={{ background: s.bg }}><s.icon size={24} style={{ color: s.color }} /></div>
                        <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
                    </div>
                ))}
            </div>
            <div className="admin-grid">
                <div className="card">
                    <div className="section-header"><h2>Recent Applications</h2><Link to="/admin/applications" className="btn btn-secondary btn-sm">View All <ArrowRight size={14} /></Link></div>
                    <div className="table-container">
                        <table>
                            <thead><tr><th>Student</th><th>Scholarship</th><th>Date</th><th>Status</th></tr></thead>
                            <tbody>
                                {recentApps.map(app => (
                                    <tr key={app.id}>
                                        <td><div style={{ fontWeight: 600 }}>{app.studentName}</div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{app.studentEmail}</div></td>
                                        <td>{app.scholarshipTitle}</td>
                                        <td>{app.appliedDate}</td>
                                        <td><span className={`badge badge-${app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'}`}>{app.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card">
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Quick Stats</h2>
                    <div className="quick-stats">
                        <div className="qs-item"><span className="qs-label">Approval Rate</span><span className="qs-value" style={{ color: 'var(--success)' }}>{Math.round((approved / totalApps) * 100)}%</span><div className="progress-bar" style={{ marginTop: 8 }}><div className="fill" style={{ width: `${(approved / totalApps) * 100}%`, background: 'var(--success)' }}></div></div></div>
                        <div className="qs-item"><span className="qs-label">Total Aid Distributed</span><span className="qs-value" style={{ color: 'var(--primary-light)' }}>₹{totalAid.toLocaleString('en-IN')}</span></div>
                        <div className="qs-item"><span className="qs-label">Active Scholarships</span><span className="qs-value">{scholarshipsData.filter(s => s.status === 'Open').length}</span></div>
                        <div className="qs-item"><span className="qs-label">Closing Soon</span><span className="qs-value" style={{ color: 'var(--danger)' }}>{scholarshipsData.filter(s => s.status === 'Closing Soon').length}</span></div>
                    </div>
                    <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <Link to="/admin/scholarships" className="btn btn-primary btn-sm"><GraduationCap size={14} /> Manage Scholarships</Link>
                        <Link to="/admin/financial-aid" className="btn btn-secondary btn-sm"><IndianRupee size={14} /> Financial Aid</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
