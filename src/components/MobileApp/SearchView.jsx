import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Search as SearchIcon, User, Phone, Tag, Building } from 'lucide-react';

export const SearchView = () => {
  const { leads, setActiveModal } = useCrm();
  const [query, setQuery] = useState('');

  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(query.toLowerCase()) ||
    l.phone.toLowerCase().includes(query.toLowerCase()) ||
    (l.project && l.project.toLowerCase().includes(query.toLowerCase())) ||
    (l.assignedTelecaller && l.assignedTelecaller.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', paddingBottom: '80px', textAlign: 'left' }}>
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <SearchIcon size={16} style={{ color: 'var(--text-tertiary)', position: 'absolute', left: '12px', top: '12px' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by customer name, phone, telecaller..."
          className="crm-input"
          style={{ paddingLeft: '36px', height: '40px' }}
          autoFocus
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(lead => (
          <div 
            key={lead.id}
            onClick={() => setActiveModal({ type: 'detail', lead })}
            className="crm-card"
            style={{ padding: '16px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{lead.name}</h4>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-light)', color: 'var(--accent)' }}>
                {lead.stage.replace('_', ' ')}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              <Building size={14} style={{ color: 'var(--text-tertiary)' }} />
              <span>{lead.project}</span>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Assigned Telecaller:</span>
                {lead.assignedTelecaller ? (
                  <span style={{ fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 6px', borderRadius: '4px' }}>
                    👤 {lead.assignedTelecaller}
                  </span>
                ) : (
                  <span style={{ color: 'var(--amber)', background: '#fffbeb', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    Unclaimed (Fresh)
                  </span>
                )}
              </div>
              <span style={{ color: 'var(--text-tertiary)' }}>{lead.phone}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
            No matching leads found for "{query}".
          </div>
        )}
      </div>
    </div>
  );
};
