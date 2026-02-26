import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { scholarshipsData, applicationsData } from '../../data/scholarships';
import { GraduationCap, Clock, CheckCircle, XCircle, TrendingUp, ArrowRight, AlertCircle, IndianRupee, Sparkles, Zap, Target, Rocket } from 'lucide-react';
import './StudentPages.css';

export default function Dashboard() {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [activeParticles, setActiveParticles] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        // Generate floating particles
        const particles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 10,
        }));
        setActiveParticles(particles);
    }, []);

    const myApps = applicationsData.filter(a => a.studentEmail === 'alice@edu.com');
    const pending = myApps.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
    const approved = myApps.filter(a => a.status === 'Approved').length;
    const upcoming = scholarshipsData.filter(s => new Date(s.deadline) > new Date()).sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 4);

    const stats = [
        { label: 'Applied', value: myApps.length, icon: GraduationCap, color: '#a78bfa', bg: 'rgba(124,58,237,0.15)', glow: 'rgba(124,58,237,0.2)' },
        { label: 'Pending', value: pending, icon: Clock, color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', glow: 'rgba(251,191,36,0.2)' },
        { label: 'Approved', value: approved, icon: CheckCircle, color: '#34d399', bg: 'rgba(52,211,153,0.15)', glow: 'rgba(52,211,153,0.2)' },
        { label: 'Total Aid', value: '₹4,00,000', icon: IndianRupee, color: '#22d3ee', bg: 'rgba(34,211,238,0.15)', glow: 'rgba(34,211,238,0.2)' },
    ];

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className={`student-dashboard ${isVisible ? 'visible' : ''}`}>
            {/* Floating Particles Background */}
            <div className="particles-container">
                {activeParticles.map(p => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Welcome Section */}
            <div className="dashboard-hero">
                <div className="hero-content">
                    <div className="hero-greeting">
                        <Sparkles size={20} className="sparkle-icon" />
                        <span>{greeting()}</span>
                    </div>
                    <h1 className="hero-title">
                        Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
                    </h1>
                    <p className="hero-subtitle">Here's your scholarship overview for today</p>
                </div>
                <div className="hero-visual">
                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>
                    <div className="hero-orb orb-3"></div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div
                        className="stat-card glass-card"
                        key={i}
                        style={{
                            animationDelay: `${i * 0.12}s`,
                            '--stat-color': s.color,
                            '--stat-glow': s.glow,
                        }}
                    >
                        <div className="stat-icon-wrap" style={{ background: s.bg }}>
                            <s.icon size={24} style={{ color: s.color }} />
                        </div>
                        <div className="stat-info">
                            <h3>{s.value}</h3>
                            <p>{s.label}</p>
                        </div>
                        <div className="stat-pulse" style={{ background: s.glow }}></div>
                    </div>
                ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Upcoming Deadlines */}
                <div className="dashboard-section glass-card">
                    <div className="section-header">
                        <div className="section-title">
                            <Clock size={18} className="section-icon" />
                            <h2>Upcoming Deadlines</h2>
                        </div>
                        <Link to="/student/scholarships" className="btn btn-secondary btn-sm">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="deadline-list">
                        {upcoming.map((s, idx) => {
                            const days = Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                            return (
                                <Link
                                    to={`/student/scholarships/${s.id}`}
                                    className="deadline-item"
                                    key={s.id}
                                    style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                                >
                                    <div className="deadline-indicator" style={{ background: days <= 30 ? 'var(--danger)' : 'var(--accent-light)' }}></div>
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

                {/* Recent Applications */}
                <div className="dashboard-section glass-card">
                    <div className="section-header">
                        <div className="section-title">
                            <Target size={18} className="section-icon" />
                            <h2>Recent Applications</h2>
                        </div>
                        <Link to="/student/applications" className="btn btn-secondary btn-sm">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="app-list">
                        {myApps.slice(0, 3).map((app, idx) => (
                            <div className="app-item" key={app.id} style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
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
                            <div className="empty-state">
                                <div className="empty-icon-wrap">
                                    <AlertCircle size={44} />
                                </div>
                                <h3>No applications yet</h3>
                                <p>Start browsing scholarships to apply!</p>
                                <Link to="/student/scholarships" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                                    <Rocket size={16} /> Browse Scholarships
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions glass-card">
                <div className="section-title">
                    <Zap size={18} className="section-icon" />
                    <h2>Quick Actions</h2>
                </div>
                <div className="actions-grid">
                    <Link to="/student/scholarships" className="action-card">
                        <div className="action-icon" style={{ background: 'rgba(124,58,237,0.15)' }}>
                            <GraduationCap size={28} style={{ color: '#a78bfa' }} />
                        </div>
                        <h4>Browse Scholarships</h4>
                        <p>Find new opportunities</p>
                        <div className="action-arrow"><ArrowRight size={16} /></div>
                    </Link>
                    <Link to="/student/applications" className="action-card">
                        <div className="action-icon" style={{ background: 'rgba(251,191,36,0.15)' }}>
                            <Clock size={28} style={{ color: '#fbbf24' }} />
                        </div>
                        <h4>Track Applications</h4>
                        <p>Monitor your progress</p>
                        <div className="action-arrow"><ArrowRight size={16} /></div>
                    </Link>
                    <Link to="/student/financial-aid" className="action-card">
                        <div className="action-icon" style={{ background: 'rgba(52,211,153,0.15)' }}>
                            <IndianRupee size={28} style={{ color: '#34d399' }} />
                        </div>
                        <h4>Financial Aid</h4>
                        <p>Explore aid options</p>
                        <div className="action-arrow"><ArrowRight size={16} /></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
