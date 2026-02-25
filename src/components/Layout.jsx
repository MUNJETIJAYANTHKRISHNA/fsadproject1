import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LayoutDashboard, Search, FileText, IndianRupee, Settings, LogOut, Menu, X, Users, ClipboardList, Bell, User } from 'lucide-react';
import { useState } from 'react';
import './Layout.css';

const studentNav = [
    { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/scholarships', label: 'Scholarships', icon: Search },
    { path: '/student/applications', label: 'My Applications', icon: FileText },
    { path: '/student/financial-aid', label: 'Financial Aid', icon: IndianRupee },
    { path: '/student/profile', label: 'My Profile', icon: User },
];
const adminNav = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/scholarships', label: 'Manage Scholarships', icon: ClipboardList },
    { path: '/admin/applications', label: 'Review Applications', icon: FileText },
    { path: '/admin/financial-aid', label: 'Financial Aid', icon: IndianRupee },
];

export default function Layout({ role }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navItems = role === 'admin' ? adminNav : studentNav;
    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <div className="layout">
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon"><GraduationCap size={24} /></div>
                        <span className="logo-text">ScholarHub</span>
                    </div>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
                            <item.icon size={20} /><span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="user-card">
                        <div className="user-avatar">{user?.avatar}</div>
                        <div className="user-info"><p className="user-name">{user?.name}</p><p className="user-role">{role === 'admin' ? 'Administrator' : 'Student'}</p></div>
                    </div>
                    <button className="nav-item logout-btn" onClick={handleLogout}><LogOut size={20} /><span>Logout</span></button>
                </div>
            </aside>
            <div className="main-area">
                <header className="topbar glass">
                    <button className="menu-toggle" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
                    <div className="topbar-right">
                        <button className="notif-btn"><Bell size={20} /><span className="notif-dot"></span></button>
                        <div className="topbar-user"><div className="user-avatar sm">{user?.avatar}</div><span>{user?.name}</span></div>
                    </div>
                </header>
                <main className="main-content"><Outlet /></main>
            </div>
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
}
