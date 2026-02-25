import { useState } from 'react';
import { Link } from 'react-router-dom';
import { scholarshipsData } from '../../data/scholarships';
import { Search, Clock, IndianRupee, Filter } from 'lucide-react';
import './StudentPages.css';

const categories = ['All', 'Merit-Based', 'Need-Based', 'STEM', 'Diversity', 'Athletic'];

export default function ScholarshipList() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = scholarshipsData.filter(s => {
        const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'All' || s.category === category;
        return matchSearch && matchCat;
    });

    return (
        <div className="scholarship-list-page">
            <div className="page-header">
                <h1>Discover Scholarships</h1>
                <p>Browse and apply for scholarships that match your profile</p>
            </div>
            <div className="filters-bar">
                <div className="search-bar"><Search size={18} /><input placeholder="Search scholarships..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            </div>
            <div className="filter-chips" style={{ marginBottom: 24 }}>
                {categories.map(c => (
                    <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
                ))}
            </div>
            <div className="scholarships-grid">
                {filtered.map((s, i) => {
                    const days = Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                    return (
                        <Link to={`/student/scholarships/${s.id}`} key={s.id} className="scholarship-card" style={{ animationDelay: `${i * 0.08}s`, textDecoration: 'none', color: 'inherit' }}>
                            <div className="scholarship-card-header">
                                <h3>{s.title}</h3>
                                <span className={`badge ${s.status === 'Closing Soon' ? 'badge-danger' : 'badge-success'}`}>{s.status}</span>
                            </div>
                            <p className="provider">{s.provider}</p>
                            <p className="desc">{s.description}</p>
                            <div className="tags">{s.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                            <div className="scholarship-card-footer">
                                <span className="amount"><IndianRupee size={18} />₹{s.amount.toLocaleString('en-IN')}</span>
                                <span className="deadline"><Clock size={14} /> {days} days left</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {filtered.length === 0 && <div className="empty-state"><Search size={48} /><h3>No scholarships found</h3><p>Try adjusting your search or filters</p></div>}
        </div>
    );
}
