import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, User, ArrowRight, BookOpen } from 'lucide-react';
import './Auth.css';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', major: '', year: 'Freshman' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            register(form);
            setLoading(false);
            navigate('/student/dashboard');
        }, 800);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-shapes"><div className="shape shape-1"></div><div className="shape shape-2"></div><div className="shape shape-3"></div></div>
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-brand"><div className="auth-logo"><GraduationCap size={32} /></div><h1>ScholarHub</h1></div>
                    <h2>Join ScholarHub</h2>
                    <p>Create your account and start discovering thousands of scholarships and financial aid opportunities.</p>
                    <div className="auth-features">
                        <div className="feature">🔍 Search 1000+ scholarships</div>
                        <div className="feature">📋 Easy application process</div>
                        <div className="feature">🔔 Deadline reminders</div>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-card glass">
                        <h2>Create Account</h2>
                        <p className="auth-subtitle">Fill in your details to get started</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group"><label>Full Name</label><div className="input-with-icon"><User size={18} /><input type="text" placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} required /></div></div>
                            <div className="input-group"><label>Email</label><div className="input-with-icon"><Mail size={18} /><input type="email" placeholder="you@edu.com" value={form.email} onChange={e => update('email', e.target.value)} required /></div></div>
                            <div className="input-group"><label>Password</label><div className="input-with-icon"><Lock size={18} /><input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => update('password', e.target.value)} required minLength={6} /></div></div>
                            <div className="form-row">
                                <div className="input-group"><label>Major</label><div className="input-with-icon"><BookOpen size={18} /><input type="text" placeholder="Computer Science" value={form.major} onChange={e => update('major', e.target.value)} /></div></div>
                                <div className="input-group"><label>Year</label><select value={form.year} onChange={e => update('year', e.target.value)}><option>Freshman</option><option>Sophomore</option><option>Junior</option><option>Senior</option><option>Graduate</option></select></div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                                {loading ? <span className="spinner"></span> : <><span>Create Account</span><ArrowRight size={18} /></>}
                            </button>
                        </form>
                        <p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
