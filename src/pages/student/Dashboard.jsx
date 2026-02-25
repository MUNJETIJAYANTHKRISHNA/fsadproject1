import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { scholarshipsData, applicationsData } from '../../data/scholarships';
import { GraduationCap, Clock, CheckCircle, XCircle, TrendingUp, ArrowRight, AlertCircle, IndianRupee } from 'lucide-react';
import './StudentPages.css';

export default function Dashboard() {
    const { user } = useAuth();
    const myApps = applicationsData.filter(a => a.studentEmail === 'alice@edu.com');
    const pending = myApps.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
    const approved = myApps.filter(a => a.status === 'Approved').length;
    const upcoming = scholarshipsData.filter(s => new Date(s.deadline) > new Date()).sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 4);

    const stats = [
        { label: 'Applied', value: myApps.length, icon: GraduationCap, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
        { label: 'Pending', value: pending, icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
        { label: 'Approved', value: approved, icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
        { label: 'Total Aid', value: '₹4,00,000', icon: IndianRupee, color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
    ];

    return (
        <div className="student-dashboard">
            <div className="page-header">
                <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
                <p>Here's your scholarship overview for today</p>
            </div>
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="stat-icon" style={{ background: s.bg }}><s.icon size={24} style={{ color: s.color }} /></div>
                        <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
                    </div>
                ))}
            </div>
            <div className="dashboard-grid">
                <div className="card dashboard-section">
                    <div className="section-header">
                        <h2>Upcoming Deadlines</h2>
                        <Link to="/student/scholarships" className="btn btn-secondary btn-sm">View All <ArrowRight size={14} /></Link>
                    </div>
                    <div className="deadline-list">
                        {upcoming.map(s => {
                            const days = Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                            return (
                                <Link to={`/student/scholarships/${s.id}`} className="deadline-item" key={s.id}>
                                    <div className="deadline-info">
                                        <h4>{s.title}</h4>
                                        <p>{s.provider}</p>
                                    </div>
                                    <div className="deadline-meta">
                                        <span className={`badge ${days <= 30 ? 'badge-danger' : 'badge-info'}`}>
                                            <Clock size={12} /> {days} days left
                                        </span>
                                        <span className="amount">₹{s.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="card dashboard-section">
                    <div className="section-header">
                        <h2>Recent Applications</h2>
                        <Link to="/student/applications" className="btn btn-secondary btn-sm">View All <ArrowRight size={14} /></Link>
                    </div>
                    <div className="app-list">
                        {myApps.slice(0, 3).map(app => (
                            <div className="app-item" key={app.id}>
                                <div className="app-info">
                                    <h4>{app.scholarshipTitle}</h4>
                                    <p>Applied {app.appliedDate}</p>
                                </div>
                                <span className={`badge badge-${app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'}`}>
                                    {app.status}
                                </span>
                            </div>
                        ))}
                        {myApps.length === 0 && (
                            <div className="empty-state"><AlertCircle size={40} /><h3>No applications yet</h3><p>Start browsing scholarships to apply!</p></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="card quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/student/scholarships" className="action-card">
                        <GraduationCap size={28} style={{ color: '#6366f1' }} /><h4>Browse Scholarships</h4><p>Find new opportunities</p>
                    </Link>
                    <Link to="/student/applications" className="action-card">
                        <Clock size={28} style={{ color: '#f59e0b' }} /><h4>Track Applications</h4><p>Monitor your progress</p>
                    </Link>
                    <Link to="/student/financial-aid" className="action-card">
                        <IndianRupee size={28} style={{ color: '#10b981' }} /><h4>Financial Aid</h4><p>Explore aid options</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
