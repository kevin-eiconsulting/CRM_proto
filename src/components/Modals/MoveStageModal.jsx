import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { ArrowRight, Check, X, Sparkles } from 'lucide-react';

export const MoveStageModal = ({ lead, onClose }) => {
  const { advanceStage, pipelineStages } = useCrm();
  const [selectedStage, setSelectedStage] = useState(lead.stage);
  const [stageNote, setStageNote] = useState('');

  const handleUpdate = () => {
    advanceStage(lead.id, selectedStage, stageNote);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="crm-card" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Move Pipeline Stage</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{lead.name} • {lead.project}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }} className="hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Pipeline options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Select Next Stage:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {pipelineStages.map(stage => {
              const isSelected = selectedStage === stage.id;
              const isCurrent = lead.stage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  style={{
                    padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s',
                    background: isSelected ? 'var(--accent-light)' : '#fff',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    color: isSelected ? 'var(--accent-dark)' : 'var(--text-primary)',
                    fontWeight: isSelected ? 700 : 500,
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                  }}
                  className="hover:bg-slate-50"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem' }}>{stage.label}</span>
                    {isCurrent && (
                      <span style={{ fontSize: '0.55rem', background: 'var(--bg-hover)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        Current
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional note */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Status Note / Milestone:</label>
          <textarea
            value={stageNote}
            onChange={(e) => setStageNote(e.target.value)}
            placeholder="e.g. Completed site visit with spouse. Client very positive about Tower B 8th floor."
            className="crm-input"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        <button
          onClick={handleUpdate}
          className="crm-btn crm-btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.85rem' }}
        >
          <Check size={16} style={{ marginRight: '6px' }} />
          Update Pipeline Status
        </button>
      </div>
    </div>
  );
};
