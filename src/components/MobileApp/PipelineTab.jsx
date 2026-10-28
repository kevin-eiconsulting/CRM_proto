import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { 
  ArrowRight, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Phone, 
  Flame, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  FolderOpen,
  Plus
} from 'lucide-react';

export const PipelineTab = ({ stageId, stageTitle }) => {
  const { leads, activeTelecaller, currentRole, setActiveModal, setMobileTab } = useCrm();
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'my'

  // Leads for this stage
  const allStageLeads = leads.filter(l => l.stage === stageId);
  const myStageLeads = allStageLeads.filter(l => l.assignedTelecaller === activeTelecaller);

  const displayLeads = filterMode === 'my' ? myStageLeads : allStageLeads;

  // If MEETING DONE and empty, render Screenshot 5 exact illustration empty state
  if (stageId === 'meeting_done' && allStageLeads.length === 0) {
    return (
      <div className="bg-white min-h-full flex-1 p-6 text-center flex flex-col items-center justify-center pb-20">
        {/* Custom Illustration matching Screenshot 5 */}
        <div className="relative mb-5">
          <div className="w-40 h-28 bg-indigo-50/70 rounded-full blur-xl absolute -top-4 -left-6 opacity-60"></div>
          <div className="relative w-32 h-32 bg-gradient-to-b from-indigo-50 to-blue-50/40 rounded-full flex items-center justify-center border border-indigo-100/50 shadow-inner">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 bg-[#3b4252] rounded-full relative flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fcd34d] mt-1 relative overflow-hidden">
                  <div className="w-full h-2.5 bg-[#2e3440] absolute top-0"></div>
                  <div className="w-3.5 h-1.5 bg-[#2e3440] absolute bottom-0 left-2 rounded-t-full"></div>
                </div>
              </div>
              <div className="w-14 h-10 bg-blue-500 rounded-t-xl mt-1 relative flex items-center justify-center">
                <div className="w-2 h-6 bg-white rounded-b-sm"></div>
              </div>
              <div className="flex gap-1 -mt-0.5">
                <div className="w-3.5 h-8 bg-teal-500 rounded-b-sm"></div>
                <div className="w-3.5 h-8 bg-teal-500 rounded-b-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1.5">No meetings done</h3>
        <p className="text-xs text-gray-500 leading-relaxed max-w-[280px]">
          Once you have met a lead, move them here. You can move leads here by marking face to face (F2F) events as done from calendar.
        </p>

        <button
          onClick={() => setActiveModal({ type: 'schedule', defaultMeeting: true })}
          className="mt-5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          + Schedule / Log F2F Meeting
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '80px', textAlign: 'left' }}>
      {/* Stage Header */}
      <div style={{ padding: '10px 16px', background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {displayLeads.length} {stageTitle}
          </h2>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
            {filterMode === 'my' ? `Assigned to ${activeTelecaller}` : 'All team leads in this stage'}
          </div>
        </div>

        {/* Filter Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-hover)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
          <button
            onClick={() => setFilterMode('all')}
            style={{
              padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: filterMode === 'all' ? '#fff' : 'transparent',
              color: filterMode === 'all' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: filterMode === 'all' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            All ({allStageLeads.length})
          </button>
          <button
            onClick={() => setFilterMode('my')}
            style={{
              padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: filterMode === 'my' ? '#fff' : 'transparent',
              color: filterMode === 'my' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: filterMode === 'my' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Mine ({myStageLeads.length})
          </button>
        </div>
      </div>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {displayLeads.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '24px 16px', textAlign: 'center', border: '1px solid var(--border)', marginTop: '8px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '1.2rem' }}>
              📂
            </div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.8rem', margin: '0 0 4px' }}>No leads in {stageTitle}</h4>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '240px' }}>
              {filterMode === 'my' && allStageLeads.length > 0 
                ? `You have 0 leads, but ${allStageLeads.length} exist in the team pool. Click "All" above to view them.`
                : 'Move leads to this pipeline stage using the arrow action button on claimed leads.'}
            </p>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setMobileTab('CLAIMED')}
                style={{ padding: '6px 12px', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700, borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}
              >
                View Claimed Leads →
              </button>
            </div>
          </div>
        ) : (
          displayLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="crm-card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div style={{ padding: '12px 12px 10px' }}>
                {/* Meta Row: Call status + Flames */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {lead.lastCalledAt === 'NOT CALLED' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>NOT CALLED</span>
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                        <Phone size={12} style={{ color: 'var(--accent)' }} />
                        <span>{lead.lastCalledAt || '1 D AGO'}</span>
                      </span>
                    )}
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span>CP</span>
                    {lead.assignedTelecaller && (
                      <>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>👤 {lead.assignedTelecaller}</span>
                      </>
                    )}
                  </div>

                  {/* Hotness flames */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {[1, 2, 3].map((flameIndex) => (
                      <Flame
                        key={flameIndex}
                        size={12}
                        style={{
                          color: flameIndex <= (lead.hotness || 2) ? '#f97316' : 'var(--bg-hover)',
                          fill: flameIndex <= (lead.hotness || 2) ? '#f97316' : 'var(--bg-hover)'
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }} className="hover:text-indigo-600">
                        {lead.name}
                      </h3>
                      {lead.tier && (
                        <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.05em', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-light)', color: 'var(--accent)' }}>
                          {lead.tier}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                      {lead.project || 'NCC Urban IVY Towers'}
                    </p>
                  </div>

                  {/* Call Pill Button */}
                  <button
                    onClick={() => setActiveModal({ type: 'call', lead })}
                    style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                    className="hover:bg-indigo-600 hover:text-white"
                  >
                    Call
                  </button>
                </div>

                {/* Status / Alert */}
                <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid var(--border)' }}>
                  {stageId === 'booking_done' ? (
                    <div 
                      onClick={() => setActiveModal({ type: 'receipt', lead })}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 700, color: 'var(--green)', background: '#ecfdf5', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0', cursor: 'pointer' }}
                      title="Click to view Dinesh Reality Token Receipt"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--green)' }} />
                        <span>{lead.bookingAmount || 'Booking Confirmed - Token Paid'}</span>
                      </div>
                      <span style={{ fontSize: '0.6rem', color: 'var(--green)', textDecoration: 'underline' }}>Receipt 📄</span>
                    </div>
                  ) : stageId === 'failed' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--red)', background: '#fff1f2', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>
                      <XCircle size={14} />
                      <span>Dropped: {lead.notes?.[0] || 'Unqualified'}</span>
                    </div>
                  ) : lead.alertText ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--red)' }}>
                      <AlertCircle size={12} />
                      <span>{lead.alertText} - Get in touch now</span>
                    </div>
                  ) : lead.followUpTime ? (
                    <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--green)' }}>
                      {lead.followUpTime}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
                      In progress with {lead.assignedTelecaller || 'telecaller'}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons row */}
              <div style={{ borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#fff' }}>
                <button
                  onClick={() => setActiveModal({ type: 'move_stage', lead })}
                  title="Move Pipeline Stage"
                  style={{ padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'schedule', lead })}
                  title="Schedule Follow-up"
                  style={{ padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <CalendarIcon size={14} />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'whatsapp', lead })}
                  title="WhatsApp"
                  style={{ padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <MessageSquare size={14} />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'call', lead })}
                  title="Direct Call"
                  style={{ padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
                  className="hover:bg-indigo-50/50"
                >
                  <Phone size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
