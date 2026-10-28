import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { 
  X, 
  Phone, 
  Mail, 
  Building2, 
  Tag, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Flame,
  CheckCircle,
  FileText
} from 'lucide-react';

export const LeadDetailModal = ({ lead, onClose }) => {
  const { setActiveModal, reassignLead, telecallers } = useCrm();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="crm-card" style={{ width: '100%', maxWidth: '480px', background: 'var(--bg-card)', padding: 0, display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <div style={{ padding: '24px', background: 'linear-gradient(to right, #0f172a, #1e1b4b)', color: '#fff', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '4px' }}
            className="hover:text-white"
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: 'rgba(255,255,255,0.8)' }}>
              {lead.id}
            </span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', padding: '2px 8px', borderRadius: '4px', background: 'var(--accent)', color: '#fff' }}>
              {lead.stage.replace('_', ' ')}
            </span>
            {lead.tier && (
              <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#fbbf24', color: '#0f172a', padding: '2px 8px', borderRadius: '4px' }}>
                {lead.tier}
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px' }}>{lead.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} style={{ color: '#a5b4fc' }} /> {lead.phone}</span>
            {lead.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} style={{ color: '#a5b4fc' }} /> {lead.email}</span>}
          </div>
        </div>

        {/* Lead Content Info */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Project & Inquiry Specs */}
          <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Target Project:</span>
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{lead.project}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Unit Preference:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead.unitType || 'Not specified'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Budget Range:</span>
              <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>{lead.budget}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Portal Lead Source:</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', background: '#fff', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                {lead.source}
              </span>
            </div>
          </div>

          {/* Assigned Telecaller (Requirement #2) */}
          <div style={{ background: 'var(--accent-light)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>Assigned Telecaller (Responsible Agent):</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                👤 {lead.assignedTelecaller || 'Unassigned (In Fresh Pool)'}
              </span>
            </div>
            
            <select
              value={lead.assignedTelecaller || ''}
              onChange={(e) => reassignLead(lead.id, e.target.value || null)}
              className="crm-input"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', borderColor: 'rgba(37,99,235,0.3)', cursor: 'pointer' }}
            >
              <option value="">(Unassigned)</option>
              {telecallers.map(t => (
                <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
              ))}
            </select>
          </div>

          {/* Notes & Activity Log */}
          <div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <FileText size={16} style={{ color: 'var(--accent)' }} />
              Activity Log & Telecaller Notes
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-page)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    {note}
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '0.8rem' }}>No notes logged yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Quick Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
          {lead.stage === 'booking_done' && (
            <button
              onClick={() => { onClose(); setActiveModal({ type: 'receipt', lead }); }}
              className="crm-btn"
              style={{ background: 'var(--green)', color: '#fff', borderColor: 'var(--green)', padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FileText size={14} /> Token Receipt
            </button>
          )}
          <button
            onClick={() => { onClose(); setActiveModal({ type: 'whatsapp', lead }); }}
            className="crm-btn"
            style={{ background: '#10b981', color: '#fff', borderColor: '#10b981', padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            WhatsApp
          </button>
          <button
            onClick={() => { onClose(); setActiveModal({ type: 'call', lead }); }}
            className="crm-btn crm-btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Phone size={14} /> Call Now
          </button>
          <button
            onClick={() => { onClose(); setActiveModal({ type: 'move_stage', lead }); }}
            className="crm-btn"
            style={{ background: '#1e293b', color: '#fff', borderColor: '#1e293b', padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowRight size={14} /> Advance Stage
          </button>
        </div>
      </div>
    </div>
  );
};
