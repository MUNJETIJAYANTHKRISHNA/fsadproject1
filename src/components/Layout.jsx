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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout layout-top-nav">
            <header className="topbar topbar-horizontal">
                <div className="topbar-container">
                    <div className="logo">
                        <div className="logo-icon"><GraduationCap size={24} /></div>
                        <span className="logo-text">ScholarHub</span>
                    </div>

                    <nav className="topbar-nav">
                        {navItems.map(item => (
                            <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item-top ${isActive ? 'active' : ''}`}>
                                <item.icon size={18} /><span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="topbar-right">
                        <button className="notif-btn">
                            <Bell size={20} />
                            <span className="notif-dot"></span>
                        </button>
                        <div className="topbar-user">
                            <div className="user-avatar sm">{user?.avatar}</div>
                            <span className="user-name-text">{user?.name}</span>
                        </div>
                        <button className="logout-btn-top" title="Logout" onClick={handleLogout}>
                            <LogOut size={20} />
                        </button>
                        <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar (Only visible on small screens) */}
            <aside className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
                        <div className="user-info">
                            <p className="user-name">{user?.name}</p>
                            <p className="user-role">{role === 'admin' ? 'Administrator' : 'Student'}</p>
                        </div>
                    </div>
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <LogOut size={20} /><span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="main-content main-content-horizontal">
                <div className="main-container">
                    <Outlet />
                </div>
            </main>

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
}
