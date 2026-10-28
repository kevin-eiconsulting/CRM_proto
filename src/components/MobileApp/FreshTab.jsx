import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { Sparkles, Building2 } from 'lucide-react';

export const FreshTab = () => {
  const { leads, claimLead, activeTelecaller, setActiveModal } = useCrm();

  const freshLeads = leads.filter(l => l.stage === 'fresh');

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '80px', textAlign: 'left' }}>
      {/* Header with count */}
      <div style={{ padding: '12px 16px', background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {freshLeads.length} Fresh Leads
        </h2>
        <div style={{ fontSize: '0.7rem', color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
          Ready to claim
        </div>
      </div>

      {/* Fresh Leads List */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        {freshLeads.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.5rem' }}>
              🎉
            </div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', margin: '0 0 4px' }}>All Caught Up!</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>No fresh unclaimed leads at the moment.</p>
          </div>
        ) : (
          freshLeads.map((lead) => (
            <div
              key={lead.id}
              style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}
            >
              <div 
                style={{ flex: 1, cursor: 'pointer', paddingRight: '8px' }}
                onClick={() => setActiveModal({ type: 'detail', lead })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    {lead.name}
                  </span>
                  {lead.source && (
                    <span style={{ fontSize: '0.65rem', background: 'var(--bg-hover)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      {lead.source}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{lead.project || 'NCC Urban IVY Towers'}</span>
                  {lead.unitType && <span>• {lead.unitType}</span>}
                </div>
              </div>

              {/* Claim Button */}
              <button
                onClick={() => claimLead(lead.id, activeTelecaller)}
                className="crm-btn crm-btn-primary"
                style={{ padding: '6px 16px', fontSize: '0.75rem' }}
              >
                Claim
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
