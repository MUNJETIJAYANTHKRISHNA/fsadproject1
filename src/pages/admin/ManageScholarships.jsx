import { useState } from 'react';
import { scholarshipsData } from '../../data/scholarships';
import { Plus, Edit, Trash2, Search, IndianRupee, Clock, Users } from 'lucide-react';
import './AdminPages.css';

export default function ManageScholarships() {
    const [scholarships, setScholarships] = useState([...scholarshipsData]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ title: '', provider: '', amount: '', deadline: '', category: 'Merit-Based', eligibility: '', description: '', slots: '', status: 'Open' });
    const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const filtered = scholarships.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

    const openAdd = () => { setEditItem(null); setForm({ title: '', provider: '', amount: '', deadline: '', category: 'Merit-Based', eligibility: '', description: '', slots: '', status: 'Open' }); setShowModal(true); };
    const openEdit = (s) => { setEditItem(s); setForm({ ...s, amount: String(s.amount), slots: String(s.slots) }); setShowModal(true); };
    const handleSave = () => {
        if (editItem) { setScholarships(prev => prev.map(s => s.id === editItem.id ? { ...s, ...form, amount: Number(form.amount), slots: Number(form.slots) } : s)); }
        else { setScholarships(prev => [...prev, { ...form, id: Date.now(), amount: Number(form.amount), slots: Number(form.slots), applicants: 0, requirements: ['Essay', 'Transcript'], tags: [form.category] }]); }
        setShowModal(false);
    };
    const handleDelete = (id) => setScholarships(prev => prev.filter(s => s.id !== id));

    return (
        <div className="manage-scholarships">
            <div className="page-header"><h1>Manage Scholarships</h1><p>Create, edit, and manage scholarship listings</p></div>
            <div className="admin-actions">
                <div className="search-bar" style={{ flex: 1 }}><Search size={18} /><input placeholder="Search scholarships..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Scholarship</button>
            </div>
            <div className="scholarship-admin-grid">
                {filtered.map((s, i) => (
                    <div className="admin-scholarship-card" key={s.id} style={{ animationDelay: `${i * 0.05}s` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, flex: 1 }}>{s.title}</h3>
                            <span className={`badge ${s.status === 'Open' ? 'badge-success' : 'badge-danger'}`}>{s.status}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>{s.provider}</p>
                        <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><IndianRupee size={14} />₹{s.amount.toLocaleString('en-IN')}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} />{s.deadline}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} />{s.applicants}/{s.slots}</span>
                        </div>
                        <div className="admin-card-actions">
                            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(s)}><Edit size={14} /> Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}><Trash2 size={14} /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>{editItem ? 'Edit Scholarship' : 'Add Scholarship'}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div className="input-group"><label>Title</label><input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Scholarship title" /></div>
                            <div className="input-group"><label>Provider</label><input value={form.provider} onChange={e => update('provider', e.target.value)} placeholder="Organization name" /></div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div className="input-group" style={{ flex: 1 }}><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e => update('amount', e.target.value)} /></div>
                                <div className="input-group" style={{ flex: 1 }}><label>Slots</label><input type="number" value={form.slots} onChange={e => update('slots', e.target.value)} /></div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div className="input-group" style={{ flex: 1 }}><label>Deadline</label><input type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} /></div>
                                <div className="input-group" style={{ flex: 1 }}><label>Category</label><select value={form.category} onChange={e => update('category', e.target.value)}><option>Merit-Based</option><option>Need-Based</option><option>STEM</option><option>Diversity</option><option>Athletic</option></select></div>
                            </div>
                            <div className="input-group"><label>Eligibility</label><input value={form.eligibility} onChange={e => update('eligibility', e.target.value)} placeholder="Eligibility requirements" /></div>
                            <div className="input-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Scholarship description" style={{ resize: 'vertical' }}></textarea></div>
                            <div className="input-group"><label>Status</label><select value={form.status} onChange={e => update('status', e.target.value)}><option>Open</option><option>Closing Soon</option><option>Closed</option></select></div>
                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>{editItem ? 'Save Changes' : 'Create Scholarship'}</button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
