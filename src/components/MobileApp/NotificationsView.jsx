import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { Bell, AlertTriangle, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const NotificationsView = () => {
  const { setMobileTab, setBottomNav } = useCrm();

  const notifications = [
    {
      id: 1,
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      title: 'Action Required: 1 Lead Ignored',
      desc: 'Hidee was claimed 6 hours ago with no call placed. Telecaller response time is lagging.',
      time: '15m ago',
      action: () => { setMobileTab('CLAIMED'); setBottomNav('home'); }
    },
    {
      id: 2,
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      title: 'New Lead Ingestion from Magicbricks',
      desc: 'Md Mokim submitted an inquiry for 2 BHK Luxury in NCC Urban IVY Towers.',
      time: '35m ago',
      action: () => { setMobileTab('FRESH'); setBottomNav('home'); }
    },
    {
      id: 3,
      icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
      title: 'Site Visit Completed',
      desc: 'Durga completed physical site visit with family.',
      time: '18h ago',
      action: () => { setMobileTab('VISIT DONE'); setBottomNav('home'); }
    }
  ];

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', paddingBottom: '80px', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Notifications</h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map(n => (
          <div 
            key={n.id}
            onClick={n.action}
            className="crm-card"
            style={{ padding: '16px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ padding: '8px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                {n.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{n.title}</h4>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{n.time}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5, margin: '4px 0 0' }}>{n.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
