import React from 'react';
import { useCrm } from '../../context/CrmContext';

export const HomeTab = () => {
  const { summaryCounts, setMobileTab, leads, activeTelecaller } = useCrm();

  const handleCardClick = (stageTab) => {
    setMobileTab(stageTab);
  };

  return (
    <div style={{ padding: '16px', background: 'var(--bg-page)', minHeight: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '80px', gap: '20px' }}>
      
      {/* Upcoming events for today */}
      <div>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>Upcoming events for today</h3>
        <div 
          onClick={() => setMobileTab('CLAIMED')}
          style={{ background: 'var(--emerald)', color: '#fff', padding: '14px', borderRadius: 'var(--radius-lg)', width: '130px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'transform 0.15s' }}
          className="hover:opacity-95 transform hover:scale-[1.02]"
        >
          <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>9</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', marginTop: '4px', opacity: 0.9 }}>FOLLOW UP</div>
        </div>
      </div>

      {/* Action Required */}
      <div>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>Action Required</h3>
        <div className="crm-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>1 lead is ignored.</div>
            <button 
              onClick={() => setMobileTab('CLAIMED')}
              style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.75rem', marginTop: '6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View Leads →
            </button>
          </div>
          <div style={{ width: '60px', height: '60px', background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ fontSize: '1.6rem' }}>👨‍💼</div>
            <span style={{ position: 'absolute', bottom: '2px', right: '4px', fontSize: '0.75rem' }}>📱</span>
          </div>
        </div>
      </div>

      {/* Leads Summary */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0 }}>Leads Summary</h3>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>Tap to view</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {[
            { id: 'FRESH', count: summaryCounts.fresh },
            { id: 'CLAIMED', count: summaryCounts.claimed },
            { id: 'INTERESTED', count: summaryCounts.interested },
            { id: 'MEETING DONE', count: summaryCounts.meeting_done },
            { id: 'VISIT DONE', count: summaryCounts.visit_done },
            { id: 'NEGOTIATION', count: summaryCounts.negotiation },
            { id: 'BOOKING DONE', count: summaryCounts.booking_done },
            { id: 'FAILED', count: summaryCounts.failed },
          ].map(item => (
            <div 
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="crm-stat-card"
              style={{ cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s', padding: '16px' }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', transition: 'color 0.15s' }} className="hover:text-indigo-600">
                {item.count}
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.05em', marginTop: '4px' }}>
                {item.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
