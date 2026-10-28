import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { User, Shield, RefreshCw, Smartphone, Monitor, Database, Award } from 'lucide-react';

export const MoreView = () => {
  const { 
    companyInfo,
    activeTelecaller, 
    setActiveTelecaller, 
    telecallers, 
    currentRole, 
    setCurrentRole, 
    resetDemoData,
    setViewMode,
    leads
  } = useCrm();

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', paddingBottom: '80px', textAlign: 'left', gap: '16px' }}>
      
      {/* Current User Card */}
      <div className="crm-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-light)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
          👨‍💼
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{activeTelecaller}</h3>
            <span style={{ fontSize: '0.65rem', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
              {currentRole === 'admin' ? 'Admin Mode' : 'Telecaller'}
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginTop: '4px', margin: '4px 0 0' }}>{companyInfo.name} Sales Desk</p>
        </div>
      </div>

      {/* Switch Telecaller Profile */}
      <div className="crm-card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={14} style={{ color: 'var(--accent)' }} />
          Switch Active Telecaller Profile
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {telecallers.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTelecaller(t.name)}
              style={{
                padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                background: activeTelecaller === t.name ? 'var(--accent-light)' : '#fff',
                borderColor: activeTelecaller === t.name ? 'var(--accent)' : 'var(--border)',
                boxShadow: activeTelecaller === t.name ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{t.avatar}</span>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{t.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Admin Switch */}
      <div className="crm-card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Shield size={14} style={{ color: 'var(--accent)' }} />
          Role & View Mode
        </h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentRole('telecaller')}
            style={{
              flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--border)', transition: 'all 0.15s',
              background: currentRole === 'telecaller' ? 'var(--accent)' : 'var(--bg-hover)',
              color: currentRole === 'telecaller' ? '#fff' : 'var(--text-primary)',
              borderColor: currentRole === 'telecaller' ? 'var(--accent)' : 'var(--border)'
            }}
          >
            Telecaller
          </button>
          <button
            onClick={() => { setCurrentRole('admin'); setViewMode('dual'); }}
            style={{
              flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--border)', transition: 'all 0.15s',
              background: currentRole === 'admin' ? 'var(--accent)' : 'var(--bg-hover)',
              color: currentRole === 'admin' ? '#fff' : 'var(--text-primary)',
              borderColor: currentRole === 'admin' ? 'var(--accent)' : 'var(--border)'
            }}
          >
            Admin View
          </button>
        </div>
      </div>

      {/* Dinesh Reality Agency Details */}
      <div className="crm-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: 'var(--radius-md)', background: 'var(--accent)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
            DR
          </div>
          <strong style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem' }}>{companyInfo.name}</strong>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: '6px 0' }}>{companyInfo.tagline}</p>
        <div style={{ fontSize: '0.65rem', color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block', fontWeight: 600 }}>
          RERA: {companyInfo.reraId}
        </div>
      </div>

      {/* Reset Demo Data Button */}
      <div className="crm-card" style={{ padding: '16px' }}>
        <button
          onClick={resetDemoData}
          style={{ width: '100%', padding: '10px', border: '1px dashed var(--border)', color: 'var(--text-secondary)', background: 'transparent', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.15s' }}
          className="hover:text-red-600 hover:border-red-300"
        >
          <RefreshCw size={14} />
          Reset Demo Data to Initial State
        </button>
      </div>
    </div>
  );
};
