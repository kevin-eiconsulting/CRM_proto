import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { 
  ArrowRight, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Phone, 
  PhoneOff, 
  Flame, 
  AlertCircle,
  Plus
} from 'lucide-react';

export const ClaimedTab = () => {
  const { leads, activeTelecaller, currentRole, setActiveModal } = useCrm();

  // Filter claimed leads. In telecaller view, show leads assigned to active telecaller (or all if admin)
  const claimedLeads = leads.filter(
    l => l.stage === 'claimed' && (currentRole === 'admin' || l.assignedTelecaller === activeTelecaller)
  );

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '80px', textAlign: 'left', position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {claimedLeads.length} Claimed Leads
        </h2>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Assigned to: <strong style={{ color: 'var(--accent)' }}>{activeTelecaller}</strong>
        </span>
      </div>

      {/* Cards list */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {claimedLeads.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '32px', textAlign: 'center', border: '1px solid var(--border)', marginTop: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', margin: '0 0 4px' }}>No Claimed Leads</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Switch to the FRESH tab to claim new customer inquiries.
            </p>
          </div>
        ) : (
          claimedLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="crm-card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div style={{ padding: '16px 16px 12px' }}>
                {/* Meta Row: Call status + Flames */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-tertiary)', marginBottom: '6px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {lead.lastCalledAt === 'NOT CALLED' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <PhoneOff size={12} />
                        <span>NOT CALLED</span>
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                        <Phone size={12} style={{ color: 'var(--accent)' }} />
                        <span>{lead.lastCalledAt || '1 H AGO'}</span>
                      </span>
                    )}
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span>CP</span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span>TRANSFER</span>
                  </div>

                  {/* Hotness flames */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {[1, 2, 3].map((flameIndex) => (
                      <Flame
                        key={flameIndex}
                        size={14}
                        style={{
                          color: flameIndex <= (lead.hotness || 2)
                            ? lead.isIgnored ? 'var(--amber)' : '#f97316'
                            : 'var(--bg-hover)',
                          fill: flameIndex <= (lead.hotness || 2)
                            ? lead.isIgnored ? 'var(--amber)' : '#f97316'
                            : 'var(--bg-hover)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Lead Name & Details */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveModal({ type: 'detail', lead })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }} className="hover:text-indigo-600">
                        {lead.name}
                      </h3>
                      {lead.tier && (
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-light)', color: 'var(--accent)' }}>
                          {lead.tier}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                      {lead.project || 'NCC Urban IVY Towers'}
                    </p>
                  </div>

                  {/* Call Pill Button */}
                  <button
                    onClick={() => setActiveModal({ type: 'call', lead })}
                    style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent', padding: '4px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                    className="hover:bg-indigo-600 hover:text-white"
                  >
                    Call
                  </button>
                </div>

                {/* Follow up or Alert section */}
                <div style={{ marginTop: '12px', paddingTop: '4px' }}>
                  {lead.followUpTime ? (
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--green)' }}>
                      {lead.followUpTime}
                    </div>
                  ) : lead.isIgnored || lead.alertText ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--red)' }}>
                        <AlertCircle size={14} style={{ flexShrink: 0 }} />
                        <span>{lead.alertText || 'Lead claimed ~ 6 h ago'}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, paddingLeft: '18px' }}>
                        Get in touch now
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      Ready for follow-up
                    </div>
                  )}

                  {lead.enquiriesCount && lead.enquiriesCount > 1 && (
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📄</span> {lead.enquiriesCount} Enquiries made so far
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: 4 action buttons */}
              <div style={{ borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#fff' }}>
                <button
                  onClick={() => setActiveModal({ type: 'move_stage', lead })}
                  title="Move Pipeline Stage"
                  style={{ padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'schedule', lead })}
                  title="Schedule Follow-up"
                  style={{ padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <CalendarIcon size={16} />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'whatsapp', lead })}
                  title="WhatsApp"
                  style={{ padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <MessageSquare size={16} />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'call', lead })}
                  title="Direct Call"
                  style={{ padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <Phone size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button (+) */}
      <button
        onClick={() => setActiveModal({ type: 'add_lead' })}
        style={{ position: 'absolute', bottom: '80px', right: '16px', width: '48px', height: '48px', background: '#fff', color: 'var(--accent)', borderRadius: '50%', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
        title="Add New Lead"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};
