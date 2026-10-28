import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Calendar, Clock, MapPin, Check, X, Users } from 'lucide-react';

export const ScheduleModal = ({ lead, defaultMeeting = false, onClose }) => {
  const { scheduleFollowUp, leads } = useCrm();
  const [selectedLeadId, setSelectedLeadId] = useState(lead ? lead.id : leads[0]?.id);
  const [eventType, setEventType] = useState(defaultMeeting ? 'F2F Meeting' : 'Phone Follow-up');
  const [timePreset, setTimePreset] = useState('In ~ 2 h');
  const [date, setDate] = useState('Today, 4:30 PM');
  const [notes, setNotes] = useState('');

  const targetLead = lead || leads.find(l => l.id === selectedLeadId);

  const handleSave = () => {
    if (!targetLead) return;
    const isMeeting = eventType.includes('Meeting') || eventType.includes('F2F');
    const scheduleText = `${eventType} (${timePreset} - ${date})`;
    scheduleFollowUp(targetLead.id, scheduleText, isMeeting);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="crm-card" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {defaultMeeting ? 'Log F2F Meeting' : 'Schedule Event / Follow-up'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              {targetLead ? targetLead.name : 'Select a lead'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }} className="hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Lead Selection if not opened from a specific card */}
        {!lead && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Select Customer Lead:</label>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="crm-input"
              style={{ paddingRight: '28px' }}
            >
              {leads.map(l => (
                <option key={l.id} value={l.id}>{l.name} - {l.project} ({l.stage})</option>
              ))}
            </select>
          </div>
        )}

        {/* Event Type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Event Type:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {['Phone Follow-up', 'F2F Meeting', 'Site Visit'].map(type => (
              <button
                key={type}
                onClick={() => setEventType(type)}
                style={{
                  padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid', textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s', fontSize: '0.75rem', fontWeight: eventType === type ? 700 : 500,
                  background: eventType === type ? 'var(--accent-light)' : '#fff',
                  borderColor: eventType === type ? 'var(--accent)' : 'var(--border)',
                  color: eventType === type ? 'var(--accent-dark)' : 'var(--text-primary)',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Time Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Quick Time Preset:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {['In ~ 1 h', 'In ~ 2 h', 'In ~ 4 h', 'Tomorrow 11 AM', 'This Weekend', 'Next Week'].map(preset => (
              <button
                key={preset}
                onClick={() => setTimePreset(preset)}
                style={{
                  padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid', textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s', fontSize: '0.75rem', fontWeight: timePreset === preset ? 700 : 500,
                  background: timePreset === preset ? '#ecfdf5' : '#fff',
                  borderColor: timePreset === preset ? 'var(--green)' : 'var(--border)',
                  color: timePreset === preset ? 'var(--green)' : 'var(--text-primary)',
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Specific Date/Time input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Custom Date & Time:</label>
          <div style={{ position: 'relative' }}>
            <Clock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Tomorrow 3:00 PM"
              className="crm-input"
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>

        {/* Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Agenda / Instructions:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Show sample flat 402, discuss parking slot..."
            className="crm-input"
            style={{ minHeight: '60px', resize: 'vertical' }}
          />
        </div>

        <button
          onClick={handleSave}
          className="crm-btn crm-btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.85rem' }}
        >
          <Check size={16} style={{ marginRight: '6px' }} />
          Confirm & Update Pipeline
        </button>
      </div>
    </div>
  );
};
