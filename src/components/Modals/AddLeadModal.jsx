import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Plus, Check } from 'lucide-react';

export const AddLeadModal = ({ onClose }) => {
  const { ingestNewLead, portals } = useCrm();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('NCC Urban IVY Towers');
  const [unitType, setUnitType] = useState('3 BHK');
  const [budget, setBudget] = useState('₹1.20 Cr');
  const [source, setSource] = useState('Magicbricks');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    ingestNewLead(source, {
      name: name.trim(),
      phone: phone || '+91 98800 55443',
      project,
      unitType,
      budget
    });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="crm-card" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add New Lead</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Manual entry or portal webhook</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }} className="hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Customer Full Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Anand Kumar"
              className="crm-input"
            />
          </div>

          <div>
            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Mobile Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98450 12345"
              className="crm-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Project:</label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="crm-input"
                style={{ paddingRight: '28px' }}
              >
                <option value="NCC Urban IVY Towers">NCC Urban IVY Towers</option>
                <option value="Sobha Dream Acres">Sobha Dream Acres</option>
                <option value="Prestige Falcon City">Prestige Falcon City</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Lead Source:</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="crm-input"
                style={{ paddingRight: '28px' }}
              >
                {portals.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Unit Preference:</label>
              <select
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="crm-input"
                style={{ paddingRight: '28px' }}
              >
                <option value="2 BHK">2 BHK</option>
                <option value="2.5 BHK">2.5 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Budget:</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="₹1.20 Cr"
                className="crm-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="crm-btn crm-btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.85rem' }}
          >
            <Plus size={16} style={{ marginRight: '4px' }} />
            Add to Fresh Leads Pool
          </button>
        </form>
      </div>
    </div>
  );
};
