import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTimeout(() => {
            const res = login(email, password);
            setLoading(false);
            if (res.success) navigate(res.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
            else setError(res.message);
        }, 800);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-shapes">
                <div className="shape shape-1"></div><div className="shape shape-2"></div><div className="shape shape-3"></div>
            </div>
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-brand">
                        <div className="auth-logo"><GraduationCap size={32} /></div>
                        <h1>ScholarHub</h1>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Access scholarships, track applications, and manage your financial aid journey.</p>
                    <div className="auth-features">
                        <div className="feature">🎓 Track scholarship deadlines</div>
                        <div className="feature">📊 Monitor application status</div>
                        <div className="feature">💰 Discover financial aid</div>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-card glass">
                        <h2>Sign In</h2>
                        <p className="auth-subtitle">Enter your credentials to continue</p>
                        {error && <div className="auth-error">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email Address</label>
                                <div className="input-with-icon">
                                    <Mail size={18} />
                                    <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input type={showPw ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
                                    <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                                {loading ? <span className="spinner"></span> : <><span>Sign In</span><ArrowRight size={18} /></>}
                            </button>
                        </form>
                        <p className="auth-footer">Don't have an account? <Link to="/register">Create one</Link></p>
                        <div className="demo-creds">
                            <p><strong>Demo Accounts:</strong></p>
                            <p>Admin: admin@scholarhub.com / admin123</p>
                            <p>Student: student@edu.com / student123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
