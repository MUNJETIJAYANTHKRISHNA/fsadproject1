import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, GraduationCap, Award, FileCheck, Shield, BookOpen, Calendar, Mail, Phone, MapPin, Hash, CreditCard, Edit, CheckCircle, Star, Download, Eye, ChevronDown, ChevronUp, Save, X, Upload, Trash2, Plus } from 'lucide-react';
import './StudentPages.css';
import './ProfilePage.css';

const semesterData = [
    {
        sem: 'Semester 1', sgpa: 8.5, credits: 24, subjects: [
            { name: 'Engineering Mathematics I', code: 'MA101', grade: 'A', credits: 4, marks: 85, total: 100 },
            { name: 'Engineering Physics', code: 'PH101', grade: 'A+', credits: 4, marks: 92, total: 100 },
            { name: 'Programming in C', code: 'CS101', grade: 'A+', credits: 4, marks: 95, total: 100 },
            { name: 'Engineering Drawing', code: 'ME101', grade: 'B+', credits: 4, marks: 78, total: 100 },
            { name: 'English Communication', code: 'HS101', grade: 'A', credits: 4, marks: 82, total: 100 },
            { name: 'Workshop Practice', code: 'ME102', grade: 'A', credits: 4, marks: 88, total: 100 },
        ]
    },
    {
        sem: 'Semester 2', sgpa: 8.8, credits: 24, subjects: [
            { name: 'Engineering Mathematics II', code: 'MA201', grade: 'A+', credits: 4, marks: 90, total: 100 },
            { name: 'Engineering Chemistry', code: 'CH201', grade: 'A', credits: 4, marks: 84, total: 100 },
            { name: 'Data Structures', code: 'CS201', grade: 'O', credits: 4, marks: 96, total: 100 },
            { name: 'Digital Electronics', code: 'EC201', grade: 'A', credits: 4, marks: 86, total: 100 },
            { name: 'Environmental Science', code: 'HS201', grade: 'A+', credits: 4, marks: 91, total: 100 },
            { name: 'Physics Lab', code: 'PH202', grade: 'A', credits: 4, marks: 85, total: 100 },
        ]
    },
    {
        sem: 'Semester 3', sgpa: 9.0, credits: 24, subjects: [
            { name: 'Discrete Mathematics', code: 'MA301', grade: 'A+', credits: 4, marks: 93, total: 100 },
            { name: 'Object Oriented Programming', code: 'CS301', grade: 'O', credits: 4, marks: 97, total: 100 },
            { name: 'Computer Organization', code: 'CS302', grade: 'A', credits: 4, marks: 87, total: 100 },
            { name: 'Database Management Systems', code: 'CS303', grade: 'A+', credits: 4, marks: 92, total: 100 },
            { name: 'Operating Systems', code: 'CS304', grade: 'A+', credits: 4, marks: 90, total: 100 },
            { name: 'Software Engineering', code: 'CS305', grade: 'A', credits: 4, marks: 88, total: 100 },
        ]
    },
    {
        sem: 'Semester 4', sgpa: 9.1, credits: 24, subjects: [
            { name: 'Probability & Statistics', code: 'MA401', grade: 'A', credits: 4, marks: 86, total: 100 },
            { name: 'Design & Analysis of Algorithms', code: 'CS401', grade: 'O', credits: 4, marks: 95, total: 100 },
            { name: 'Computer Networks', code: 'CS402', grade: 'A+', credits: 4, marks: 91, total: 100 },
            { name: 'Theory of Computation', code: 'CS403', grade: 'A+', credits: 4, marks: 93, total: 100 },
            { name: 'Web Technologies', code: 'CS404', grade: 'O', credits: 4, marks: 98, total: 100 },
            { name: 'Artificial Intelligence', code: 'CS405', grade: 'A+', credits: 4, marks: 94, total: 100 },
        ]
    },
];

const initCerts = [
    { id: 1, name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025-08-15', status: 'Verified', type: 'Professional', credentialId: 'AWS-CP-2025-8821' },
    { id: 2, name: 'Full Stack Web Development', issuer: 'Coursera (Meta)', date: '2025-06-20', status: 'Verified', type: 'Course', credentialId: 'COUR-FS-2025-3345' },
    { id: 3, name: 'Python for Data Science', issuer: 'NPTEL (IIT Madras)', date: '2025-04-10', status: 'Verified', type: 'Course', credentialId: 'NPTEL-PDS-2025-7712' },
    { id: 4, name: 'Hackathon Winner - Smart India', issuer: 'AICTE', date: '2025-09-05', status: 'Verified', type: 'Achievement', credentialId: 'SIH-2025-WINNER-112' },
    { id: 5, name: 'Google Developer Student Club Lead', issuer: 'Google', date: '2025-07-01', status: 'Verified', type: 'Leadership', credentialId: 'GDSC-LEAD-2025-445' },
];

const initDocs = [
    { id: 1, name: 'Aadhaar Card', number: 'XXXX XXXX 4521', status: 'Verified', icon: CreditCard, fileName: 'aadhaar_card.pdf' },
    { id: 2, name: 'PAN Card', number: 'XXXXX1234X', status: 'Verified', icon: CreditCard, fileName: 'pan_card.pdf' },
    { id: 3, name: '10th Marksheet', number: 'Board: CBSE | Year: 2020', status: 'Verified', icon: FileCheck, fileName: '10th_marksheet.pdf' },
    { id: 4, name: '12th Marksheet', number: 'Board: CBSE | Year: 2022', status: 'Verified', icon: FileCheck, fileName: '12th_marksheet.pdf' },
    { id: 5, name: 'Income Certificate', number: 'IC/2025/TEL/00452', status: 'Verified', icon: FileCheck, fileName: 'income_cert.pdf' },
    { id: 6, name: 'Caste Certificate', number: 'CC/2025/TEL/01123', status: 'Pending', icon: FileCheck, fileName: 'caste_cert.pdf' },
    { id: 7, name: 'Domicile Certificate', number: 'DOM/2025/TEL/00891', status: 'Verified', icon: Shield, fileName: 'domicile_cert.pdf' },
    { id: 8, name: 'Bank Passbook', number: 'SBI A/c: XXXXX4589', status: 'Verified', icon: CreditCard, fileName: 'bank_passbook.pdf' },
];

export default function StudentProfile() {
    const { user } = useAuth();
    const [openSem, setOpenSem] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [editing, setEditing] = useState(false);
    const [certificates, setCertificates] = useState(initCerts);
    const [kycDocuments, setKycDocuments] = useState(initDocs);
    const [showCertModal, setShowCertModal] = useState(false);
    const [showDocModal, setShowDocModal] = useState(false);
    const [certForm, setCertForm] = useState({ name: '', issuer: '', date: '', type: 'Course', credentialId: '' });
    const [docForm, setDocForm] = useState({ name: '', number: '', fileName: '' });
    const [profileSaved, setProfileSaved] = useState(false);

    const [profile, setProfile] = useState({
        name: user?.name || 'Alex Student',
        email: user?.email || 'alex@edu.in',
        phone: '+91 98765 43210',
        dob: '2004-03-15',
        address: 'Hyderabad, Telangana, India',
        rollNo: '21CS1A0542',
        fatherName: 'Rajesh Kumar',
        motherName: 'Sunita Devi',
        aadhaar: 'XXXX XXXX 4521',
        category: 'OBC',
        university: 'JNTU Hyderabad',
        college: 'Vasavi College of Engineering',
        branch: 'Computer Science & Engineering',
        admissionYear: '2022',
        expectedGrad: '2026',
        currentSem: '5th Semester',
        attendance: '84.6',
    });

    const cgpa = (semesterData.reduce((a, s) => a + s.sgpa, 0) / semesterData.length).toFixed(2);
    const totalCredits = semesterData.reduce((a, s) => a + s.credits, 0);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'academics', label: 'Academics', icon: BookOpen },
        { id: 'certificates', label: 'Certificates', icon: Award },
        { id: 'documents', label: 'Documents & KYC', icon: Shield },
    ];

    const gradeColor = (g) => {
        if (g === 'O') return 'var(--success)';
        if (g === 'A+') return '#6366f1';
        if (g === 'A') return '#0891b2';
        if (g === 'B+') return '#d97706';
        return 'var(--text-secondary)';
    };

    const handleSaveProfile = () => {
        setEditing(false);
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
    };

    const handleAddCert = () => {
        if (!certForm.name) return;
        setCertificates(prev => [...prev, { ...certForm, id: Date.now(), status: 'Pending' }]);
        setCertForm({ name: '', issuer: '', date: '', type: 'Course', credentialId: '' });
        setShowCertModal(false);
    };

    const handleDeleteCert = (id) => setCertificates(prev => prev.filter(c => c.id !== id));

    const handleAddDoc = () => {
        if (!docForm.name) return;
        setKycDocuments(prev => [...prev, { ...docForm, id: Date.now(), status: 'Pending', icon: FileCheck }]);
        setDocForm({ name: '', number: '', fileName: '' });
        setShowDocModal(false);
    };

    const handleDeleteDoc = (id) => setKycDocuments(prev => prev.filter(d => d.id !== id));

    const handleReuploadDoc = (id) => {
        setKycDocuments(prev => prev.map(d => d.id === id ? { ...d, status: 'Pending', fileName: d.fileName + ' (re-uploaded)' } : d));
    };

    return (
        <div className="profile-page">
            <div className="page-header"><h1>Student Profile</h1><p>Your academic records, certifications, and documents — all in one place</p></div>

            {profileSaved && (
                <div style={{ background: 'var(--success-light)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)', padding: '12px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeIn 0.3s ease' }}>
                    <CheckCircle size={16} style={{ color: 'var(--success)' }} /> <span style={{ color: 'var(--success)', fontWeight: 600 }}>Profile saved successfully!</span>
                </div>
            )}

            {/* Profile Header Card */}
            <div className="card profile-header-card">
                <div className="profile-top">
                    <div className="profile-avatar-lg">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="profile-info-main">
                        <h2>{profile.name}</h2>
                        <p className="profile-subtitle">B.Tech Computer Science & Engineering — 3rd Year</p>
                        <div className="profile-badges">
                            <span className="badge badge-primary"><GraduationCap size={12} /> JNTU Hyderabad</span>
                            <span className="badge badge-success"><CheckCircle size={12} /> KYC Verified</span>
                            <span className="badge badge-info"><Star size={12} /> CGPA: {cgpa}</span>
                        </div>
                    </div>
                    {!editing ? (
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}><Edit size={14} /> Edit Profile</button>
                    ) : (
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-primary btn-sm" onClick={handleSaveProfile}><Save size={14} /> Save</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}><X size={14} /> Cancel</button>
                        </div>
                    )}
                </div>
                <div className="profile-stats-row">
                    <div className="ps-item"><span className="ps-val">{cgpa}</span><span className="ps-label">CGPA</span></div>
                    <div className="ps-item"><span className="ps-val">{totalCredits}</span><span className="ps-label">Credits Earned</span></div>
                    <div className="ps-item"><span className="ps-val">{certificates.length}</span><span className="ps-label">Certificates</span></div>
                    <div className="ps-item"><span className="ps-val">{kycDocuments.filter(d => d.status === 'Verified').length}/{kycDocuments.length}</span><span className="ps-label">Docs Verified</span></div>
                    <div className="ps-item"><span className="ps-val">{profile.attendance}%</span><span className="ps-label">Attendance</span></div>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                {tabs.map(t => (
                    <button key={t.id} className={`profile-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                        <t.icon size={16} /><span>{t.label}</span>
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="profile-section" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <div className="profile-grid-2">
                        <div className="card">
                            <h3 className="card-title"><User size={18} /> Personal Information {editing && <span className="badge badge-warning" style={{ marginLeft: 8 }}>Editing</span>}</h3>
                            <div className="info-grid">
                                {[
                                    { label: 'Full Name', icon: User, key: 'name' },
                                    { label: 'Email', icon: Mail, key: 'email' },
                                    { label: 'Phone', icon: Phone, key: 'phone' },
                                    { label: 'Date of Birth', icon: Calendar, key: 'dob', type: 'date' },
                                    { label: 'Address', icon: MapPin, key: 'address' },
                                    { label: 'Roll Number', icon: Hash, key: 'rollNo' },
                                    { label: "Father's Name", icon: User, key: 'fatherName' },
                                    { label: "Mother's Name", icon: User, key: 'motherName' },
                                    { label: 'Aadhaar', icon: CreditCard, key: 'aadhaar' },
                                    { label: 'Category', icon: Hash, key: 'category' },
                                ].map(field => (
                                    <div className="info-item" key={field.key}>
                                        <span className="info-label"><field.icon size={14} /> {field.label}</span>
                                        {editing ? (
                                            <input
                                                className="profile-edit-input"
                                                type={field.type || 'text'}
                                                value={profile[field.key]}
                                                onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                                            />
                                        ) : (
                                            <span className="info-value">{field.key === 'dob' ? new Date(profile.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : profile[field.key]}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card">
                            <h3 className="card-title"><BookOpen size={18} /> Academic Summary {editing && <span className="badge badge-warning" style={{ marginLeft: 8 }}>Editing</span>}</h3>
                            <div className="academic-summary">
                                {[
                                    { label: 'University', key: 'university' },
                                    { label: 'College', key: 'college' },
                                    { label: 'Branch', key: 'branch' },
                                    { label: 'Admission Year', key: 'admissionYear' },
                                    { label: 'Expected Graduation', key: 'expectedGrad' },
                                    { label: 'Current Semester', key: 'currentSem' },
                                ].map(field => (
                                    <div className="as-row" key={field.key}>
                                        <span>{field.label}</span>
                                        {editing ? (
                                            <input className="profile-edit-input" style={{ maxWidth: 220, textAlign: 'right' }} value={profile[field.key]} onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))} />
                                        ) : (
                                            <strong>{profile[field.key]}</strong>
                                        )}
                                    </div>
                                ))}
                                <div className="as-row"><span>CGPA</span><strong style={{ color: 'var(--success)', fontSize: '1.1rem' }}>{cgpa}</strong></div>
                                <div className="as-row"><span>Total Credits</span><strong>{totalCredits}</strong></div>
                                <div className="as-row">
                                    <span>Attendance</span>
                                    {editing ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><input className="profile-edit-input" style={{ maxWidth: 80, textAlign: 'right' }} value={profile.attendance} onChange={e => setProfile(p => ({ ...p, attendance: e.target.value }))} /><strong>%</strong></div>
                                    ) : (
                                        <strong>{profile.attendance}%</strong>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-muted)' }}>CGPA Progress</h4>
                                <div className="cgpa-chart">
                                    {semesterData.map((s, i) => (
                                        <div className="cgpa-bar-wrap" key={i}>
                                            <div className="cgpa-bar" style={{ height: `${(s.sgpa / 10) * 100}%`, background: `linear-gradient(180deg, var(--primary), ${s.sgpa >= 9 ? 'var(--success)' : 'var(--accent)'})` }}>
                                                <span className="cgpa-val">{s.sgpa}</span>
                                            </div>
                                            <span className="cgpa-label">S{i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Academics Tab */}
            {activeTab === 'academics' && (
                <div className="profile-section" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <div className="sem-list">
                        {semesterData.map((sem, idx) => (
                            <div className="card sem-card" key={idx}>
                                <div className="sem-header" onClick={() => setOpenSem(openSem === idx ? null : idx)}>
                                    <div className="sem-title">
                                        <GraduationCap size={20} style={{ color: 'var(--primary)' }} />
                                        <div><h3>{sem.sem}</h3><p>{sem.subjects.length} Subjects • {sem.credits} Credits</p></div>
                                    </div>
                                    <div className="sem-meta">
                                        <span className="sgpa-badge">SGPA: <strong>{sem.sgpa}</strong></span>
                                        {openSem === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </div>
                                {openSem === idx && (
                                    <div className="sem-body" style={{ animation: 'fadeIn 0.3s ease' }}>
                                        <div className="table-container">
                                            <table>
                                                <thead><tr><th>Code</th><th>Subject</th><th>Marks</th><th>Grade</th><th>Credits</th></tr></thead>
                                                <tbody>
                                                    {sem.subjects.map((sub, si) => (
                                                        <tr key={si}>
                                                            <td><code style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{sub.code}</code></td>
                                                            <td style={{ fontWeight: 500 }}>{sub.name}</td>
                                                            <td>{sub.marks}/{sub.total}</td>
                                                            <td><span style={{ fontWeight: 700, color: gradeColor(sub.grade) }}>{sub.grade}</span></td>
                                                            <td>{sub.credits}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
                <div className="profile-section" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowCertModal(true)}><Plus size={16} /> Add Certificate</button>
                    </div>
                    <div className="cert-grid">
                        {certificates.map((cert, i) => (
                            <div className="card cert-card" key={cert.id} style={{ animationDelay: `${i * 0.08}s` }}>
                                <div className="cert-top">
                                    <div className="cert-icon-wrap"><Award size={24} style={{ color: 'var(--primary)' }} /></div>
                                    <span className={`badge ${cert.status === 'Verified' ? 'badge-success' : 'badge-warning'}`}><CheckCircle size={10} /> {cert.status}</span>
                                </div>
                                <h3>{cert.name}</h3>
                                <p className="cert-issuer">{cert.issuer}</p>
                                <div className="cert-meta">
                                    <span><Calendar size={13} /> {cert.date}</span>
                                    <span className="tag">{cert.type}</span>
                                </div>
                                <div className="cert-footer">
                                    <span className="cert-id"><Hash size={12} /> {cert.credentialId}</span>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button className="btn btn-secondary btn-sm"><Eye size={13} /></button>
                                        <button className="btn btn-secondary btn-sm"><Download size={13} /></button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCert(cert.id)}><Trash2 size={13} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Certificate Modal */}
                    {showCertModal && (
                        <div className="modal-overlay" onClick={() => setShowCertModal(false)}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <h2>Add Certificate</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div className="input-group"><label>Certificate Name</label><input placeholder="e.g. AWS Solutions Architect" value={certForm.name} onChange={e => setCertForm(p => ({ ...p, name: e.target.value }))} /></div>
                                    <div className="input-group"><label>Issuing Organization</label><input placeholder="e.g. Amazon Web Services" value={certForm.issuer} onChange={e => setCertForm(p => ({ ...p, issuer: e.target.value }))} /></div>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <div className="input-group" style={{ flex: 1 }}><label>Date</label><input type="date" value={certForm.date} onChange={e => setCertForm(p => ({ ...p, date: e.target.value }))} /></div>
                                        <div className="input-group" style={{ flex: 1 }}><label>Type</label>
                                            <select value={certForm.type} onChange={e => setCertForm(p => ({ ...p, type: e.target.value }))}>
                                                <option>Course</option><option>Professional</option><option>Achievement</option><option>Leadership</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input-group"><label>Credential ID</label><input placeholder="e.g. CERT-2025-1234" value={certForm.credentialId} onChange={e => setCertForm(p => ({ ...p, credentialId: e.target.value }))} /></div>
                                    <div className="file-upload" style={{ padding: 20 }}>
                                        <Upload size={24} style={{ color: 'var(--text-muted)' }} /><p>Upload certificate file (PDF, JPG)</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-primary" onClick={handleAddCert}><Plus size={16} /> Add Certificate</button>
                                        <button className="btn btn-secondary" onClick={() => setShowCertModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Documents & KYC Tab */}
            {activeTab === 'documents' && (
                <div className="profile-section" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <div className="card" style={{ marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Shield size={22} style={{ color: 'var(--success)' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>KYC Verification Status</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{kycDocuments.filter(d => d.status === 'Verified').length} of {kycDocuments.length} documents verified</p>
                            </div>
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                <button className="btn btn-primary btn-sm" onClick={() => setShowDocModal(true)}><Plus size={14} /> Add Document</button>
                                <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '6px 14px' }}><Shield size={12} /> KYC Active</span>
                            </div>
                        </div>
                        <div className="progress-bar" style={{ height: 10 }}>
                            <div className="fill" style={{ width: `${(kycDocuments.filter(d => d.status === 'Verified').length / kycDocuments.length) * 100}%`, background: 'linear-gradient(90deg, var(--success), var(--accent))' }}></div>
                        </div>
                    </div>
                    <div className="docs-grid">
                        {kycDocuments.map((doc, i) => (
                            <div className="card doc-card" key={doc.id} style={{ animationDelay: `${i * 0.06}s` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div className="doc-icon-wrap"><doc.icon size={20} /></div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.92rem', fontWeight: 600 }}>{doc.name}</h4>
                                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{doc.number}</p>
                                        {doc.fileName && <p style={{ fontSize: '0.72rem', color: 'var(--primary)', marginTop: 2 }}>📎 {doc.fileName}</p>}
                                    </div>
                                    <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                                        {doc.status === 'Verified' ? <CheckCircle size={10} /> : null} {doc.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: 6, marginTop: 12, justifyContent: 'flex-end' }}>
                                    <button className="btn btn-secondary btn-sm"><Eye size={13} /> View</button>
                                    <button className="btn btn-secondary btn-sm"><Download size={13} /> Download</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleReuploadDoc(doc.id)}><Upload size={13} /> Re-upload</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDoc(doc.id)}><Trash2 size={13} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Document Modal */}
                    {showDocModal && (
                        <div className="modal-overlay" onClick={() => setShowDocModal(false)}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <h2>Upload Document</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div className="input-group"><label>Document Name</label><input placeholder="e.g. Transfer Certificate" value={docForm.name} onChange={e => setDocForm(p => ({ ...p, name: e.target.value }))} /></div>
                                    <div className="input-group"><label>Document Number / Details</label><input placeholder="e.g. TC/2025/001" value={docForm.number} onChange={e => setDocForm(p => ({ ...p, number: e.target.value }))} /></div>
                                    <div className="file-upload">
                                        <Upload size={32} style={{ color: 'var(--text-muted)' }} />
                                        <p>Drag & drop file or click to browse</p>
                                        <p style={{ fontSize: '0.75rem' }}>PDF, JPG, PNG up to 5MB</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-primary" onClick={handleAddDoc}><Upload size={16} /> Upload Document</button>
                                        <button className="btn btn-secondary" onClick={() => setShowDocModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
