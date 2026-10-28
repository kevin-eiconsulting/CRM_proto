import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { Calendar as CalendarIcon, Clock, Phone, MapPin } from 'lucide-react';

export const CalendarView = () => {
  const { leads, activeTelecaller, setActiveModal } = useCrm();

  const scheduledLeads = leads.filter(
    l => l.followUpTime || l.stage === 'visit_done' || l.stage === 'meeting_done'
  );

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', paddingBottom: '80px', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Today's Schedule</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Upcoming follow-ups & visits</p>
        </div>
        <div style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '4px 10px', borderRadius: 'var(--radius-lg)', fontSize: '0.75rem', fontWeight: 700 }}>
          9 Events
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scheduledLeads.slice(0, 6).map((lead, idx) => (
          <div key={lead.id} className="crm-card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, marginTop: '2px' }}>{10 + idx}:00</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{lead.name}</h4>
                <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: 'var(--green)', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  {lead.stage.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{lead.project}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <button
                  onClick={() => setActiveModal({ type: 'call', lead })}
                  style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  className="hover:underline"
                >
                  <Phone size={14} /> Call
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'detail', lead })}
                  style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  className="hover:underline"
                >
                  View Notes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
