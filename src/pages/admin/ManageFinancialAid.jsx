import { useState } from 'react';
import { financialAidData } from '../../data/scholarships';
import { Plus, Edit, Trash2, IndianRupee, Calendar, Banknote, Briefcase, CreditCard } from 'lucide-react';
import './AdminPages.css';

export default function ManageFinancialAid() {
    const [aids, setAids] = useState([...financialAidData]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({ title: '', type: 'Grant', amount: '', deadline: '', eligibility: '', description: '', status: 'Available' });
    const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const openAdd = () => { setEditItem(null); setForm({ title: '', type: 'Grant', amount: '', deadline: '', eligibility: '', description: '', status: 'Available' }); setShowModal(true); };
    const openEdit = (a) => { setEditItem(a); setForm({ ...a, amount: String(a.amount) }); setShowModal(true); };
    const handleSave = () => {
        if (editItem) setAids(prev => prev.map(a => a.id === editItem.id ? { ...a, ...form, amount: Number(form.amount) } : a));
        else setAids(prev => [...prev, { ...form, id: Date.now(), amount: Number(form.amount) }]);
        setShowModal(false);
    };
    const handleDelete = (id) => setAids(prev => prev.filter(a => a.id !== id));

    const typeIcon = (type) => {
        if (type === 'Grant') return <Banknote size={18} style={{ color: 'var(--success)' }} />;
        if (type === 'Work-Study') return <Briefcase size={18} style={{ color: 'var(--primary)' }} />;
        return <CreditCard size={18} style={{ color: 'var(--warning)' }} />;
    };

    return (
        <div className="manage-aid">
            <div className="page-header"><h1>Manage Financial Aid</h1><p>Create and manage financial aid programs</p></div>
            <div className="admin-actions">
                <div className="stat-card" style={{ flex: 1 }}><div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}><IndianRupee size={24} style={{ color: '#10b981' }} /></div><div className="stat-info"><h3>₹{aids.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}</h3><p>Total Aid Budget</p></div></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Financial Aid</button>
            </div>
            <div className="table-container" style={{ marginTop: 24 }}>
                <table>
                    <thead><tr><th>Program</th><th>Type</th><th>Amount</th><th>Deadline</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {aids.map(aid => (
                            <tr key={aid.id}>
                                <td><div style={{ fontWeight: 600 }}>{aid.title}</div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{aid.eligibility}</div></td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{typeIcon(aid.type)}{aid.type}</span></td>
                                <td style={{ fontWeight: 700, color: 'var(--success)' }}>₹{aid.amount.toLocaleString('en-IN')}</td>
                                <td>{aid.deadline}</td>
                                <td><span className={`badge ${aid.status === 'Closing Soon' ? 'badge-danger' : 'badge-success'}`}>{aid.status}</span></td>
                                <td><div style={{ display: 'flex', gap: 6 }}><button className="btn btn-secondary btn-sm" onClick={() => openEdit(aid)}><Edit size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(aid.id)}><Trash2 size={14} /></button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>{editItem ? 'Edit Financial Aid' : 'Add Financial Aid'}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                            <div className="input-group"><label>Program Title</label><input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Program name" /></div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div className="input-group" style={{ flex: 1 }}><label>Type</label><select value={form.type} onChange={e => update('type', e.target.value)}><option>Grant</option><option>Loan</option><option>Work-Study</option></select></div>
                                <div className="input-group" style={{ flex: 1 }}><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e => update('amount', e.target.value)} /></div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div className="input-group" style={{ flex: 1 }}><label>Deadline</label><input type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} /></div>
                                <div className="input-group" style={{ flex: 1 }}><label>Status</label><select value={form.status} onChange={e => update('status', e.target.value)}><option>Available</option><option>Closing Soon</option><option>Closed</option></select></div>
                            </div>
                            <div className="input-group"><label>Eligibility</label><input value={form.eligibility} onChange={e => update('eligibility', e.target.value)} placeholder="Who can apply?" /></div>
                            <div className="input-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Program description" style={{ resize: 'vertical' }}></textarea></div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>{editItem ? 'Save Changes' : 'Create Program'}</button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
