import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Search,
  Plus,
  Phone,
  MessageSquare,
  AlertTriangle,
  Users,
  ChevronRight,
  FileText
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    companyInfo,
    leads,
    telecallers,
    portals,
    pipelineStages,
    claimLead,
    reassignLead,
    advanceStage,
    setActiveModal,
    ingestNewLead
  } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTelecallerFilter, setSelectedTelecallerFilter] = useState('ALL');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [selectedPortalFilter, setSelectedPortalFilter] = useState('ALL');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.project && lead.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.assignedTelecaller && lead.assignedTelecaller.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.source && lead.source.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTelecaller =
      selectedTelecallerFilter === 'ALL' ||
      (selectedTelecallerFilter === 'UNASSIGNED' ? !lead.assignedTelecaller : lead.assignedTelecaller === selectedTelecallerFilter);
    const matchesStage = selectedStageFilter === 'ALL' || lead.stage === selectedStageFilter;
    const matchesPortal = selectedPortalFilter === 'ALL' || lead.source === selectedPortalFilter;
    return matchesSearch && matchesTelecaller && matchesStage && matchesPortal;
  });

  const stageBadgeStyle = (stage) => {
    const map = {
      fresh:        { background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' },
      claimed:      { background: '#eef4ff', color: '#4338ca', border: '1px solid #c7d2fe' },
      interested:   { background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' },
      meeting_done: { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' },
      visit_done:   { background: '#ecfdf5', color: '#065f46', border: '1px solid #6ee7b7' },
      negotiation:  { background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' },
      booking_done: { background: '#dcfce7', color: '#166534', border: '1px solid #86efac' },
      failed:       { background: '#fff1f2', color: '#9f1239', border: '1px solid #fecdd3' },
    };
    return map[stage] || { background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' };
  };

  // Count leads by stage for the stat row
  const freshCount = leads.filter(l => l.stage === 'fresh').length;
  const claimedCount = leads.filter(l => l.stage === 'claimed').length;
  const pipelineCount = leads.filter(l => !['fresh','claimed','failed'].includes(l.stage)).length;
  const bookedCount = leads.filter(l => l.stage === 'booking_done').length;

  return (
    <>
      {/* ── Stat row ── */}
      <div className="crm-stats-row">
        {[
          { label: 'Total Leads', value: leads.length, sub: 'all portals' },
          { label: 'Fresh / Unassigned', value: freshCount, sub: 'awaiting claim' },
          { label: 'Claimed', value: claimedCount, sub: 'telecaller active' },
          { label: 'In Pipeline', value: pipelineCount, sub: 'interested → negotiation' },
          { label: 'Booking Done', value: bookedCount, sub: 'converted' },
        ].map(stat => (
          <div key={stat.label} className="crm-stat-card">
            <div className="crm-stat-value">{stat.value}</div>
            <div className="crm-stat-label">{stat.label}</div>
            <div className="crm-stat-sub">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Page header card (portals + add lead) ── */}
      <div className="crm-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{companyInfo.name}</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Multi-portal lead ingestion · Telecaller assignment · Sales pipeline
            </p>
          </div>
          <button
            className="crm-btn crm-btn-primary"
            onClick={() => setActiveModal({ type: 'add_lead' })}
          >
            <Plus size={14} /> Add Lead
          </button>
        </div>

        {/* Portal source chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          {portals.map(portal => {
            const count = leads.filter(l => l.source === portal.name).length;
            return (
              <div key={portal.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', padding: '10px 12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.1rem' }}>{portal.logo}</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{portal.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{count} leads</div>
                  </div>
                </div>
                <button
                  className="crm-btn"
                  style={{ padding: '3px 10px', fontSize: '0.7rem', color: 'var(--accent)' }}
                  onClick={() => ingestNewLead(portal.name)}
                  title={`Ingest lead from ${portal.name}`}
                >
                  + Ingest
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Telecaller filter cards ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={15} style={{ color: 'var(--accent)' }} /> Telecaller Team
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Click to filter leads</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
          {/* All */}
          <div
            onClick={() => setSelectedTelecallerFilter('ALL')}
            className="crm-stat-card"
            style={{
              cursor: 'pointer', textAlign: 'center', padding: '12px',
              background: selectedTelecallerFilter === 'ALL' ? 'var(--accent)' : 'var(--bg-card)',
              color: selectedTelecallerFilter === 'ALL' ? '#fff' : 'var(--text-primary)',
              borderColor: selectedTelecallerFilter === 'ALL' ? 'var(--accent)' : 'var(--border)',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>👥</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>All Leads</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.75 }}>{leads.length} total</div>
          </div>
          {telecallers.map(t => {
            const count = leads.filter(l => l.assignedTelecaller === t.name).length;
            const isActive = selectedTelecallerFilter === t.name;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTelecallerFilter(isActive ? 'ALL' : t.name)}
                className="crm-stat-card"
                style={{
                  cursor: 'pointer', textAlign: 'center', padding: '12px',
                  background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                  color: isActive ? '#fff' : 'var(--text-primary)',
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{t.avatar}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.75 }}>{count} handling</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Search & Filters ── */}
      <div className="crm-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="crm-header-search" style={{ flex: 1, minWidth: 200, width: 'auto' }}>
            <Search size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, phone, project, portal, telecaller..."
            />
          </div>
          <select
            value={selectedStageFilter}
            onChange={e => setSelectedStageFilter(e.target.value)}
            className="crm-input"
            style={{ width: 'auto', minWidth: 130 }}
          >
            <option value="ALL">All Stages</option>
            {pipelineStages.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <select
            value={selectedPortalFilter}
            onChange={e => setSelectedPortalFilter(e.target.value)}
            className="crm-input"
            style={{ width: 'auto', minWidth: 140 }}
          >
            <option value="ALL">All Portals</option>
            {portals.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Admin view:</strong> shows telecaller assignment for every lead.
          </span>
          <span style={{ fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 10px', borderRadius: 'var(--radius-full)' }}>
            {filteredLeads.length} leads
          </span>
        </div>
      </div>

      {/* ── Leads Table ── */}
      <div className="crm-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="crm-table">
            <thead>
              <tr>
                <th>Lead Customer</th>
                <th>Project &amp; Budget</th>
                <th>Portal Source</th>
                <th>Stage</th>
                <th style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>Assigned Telecaller</th>
                <th>Last Activity</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-tertiary)' }}>
                    No leads match your filters.
                  </td>
                </tr>
              ) : filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                      onClick={() => setActiveModal({ type: 'detail', lead })}>
                      {lead.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{lead.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{lead.project}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{lead.unitType} · {lead.budget}</div>
                  </td>
                  <td>
                    <span className="crm-badge" style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}>
                      {lead.source}
                    </span>
                  </td>
                  <td>
                    <select
                      value={lead.stage}
                      onChange={e => advanceStage(lead.id, e.target.value)}
                      className="crm-badge"
                      style={{ ...stageBadgeStyle(lead.stage), cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.7rem', padding: '4px 10px', border: stageBadgeStyle(lead.stage).border }}
                    >
                      {pipelineStages.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ background: 'var(--accent-light)' }}>
                    <select
                      value={lead.assignedTelecaller || ''}
                      onChange={e => reassignLead(lead.id, e.target.value || null)}
                      style={{
                        background: lead.assignedTelecaller ? '#fff' : '#fffbeb',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '4px 8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: lead.assignedTelecaller ? 'var(--accent)' : 'var(--amber)',
                        fontFamily: 'var(--font-sans)',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="">(Unassigned)</option>
                      {telecallers.map(t => (
                        <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {lead.isIgnored ? (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertTriangle size={12} /> Ignored (&gt;6h)
                      </span>
                    ) : lead.followUpTime ? (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--green)' }}>{lead.followUpTime}</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{lead.lastCalledAt || 'Fresh Lead'}</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                      <button className="crm-icon-btn" style={{ width: 28, height: 28 }} onClick={() => setActiveModal({ type: 'call', lead })} title="Call">
                        <Phone size={13} />
                      </button>
                      <button className="crm-icon-btn" style={{ width: 28, height: 28 }} onClick={() => setActiveModal({ type: 'whatsapp', lead })} title="WhatsApp">
                        <MessageSquare size={13} />
                      </button>
                      {lead.stage === 'booking_done' && (
                        <button className="crm-icon-btn" style={{ width: 28, height: 28, color: 'var(--green)' }} onClick={() => setActiveModal({ type: 'receipt', lead })} title="Token Receipt">
                          <FileText size={13} />
                        </button>
                      )}
                      <button className="crm-icon-btn" style={{ width: 28, height: 28 }} onClick={() => setActiveModal({ type: 'detail', lead })} title="View Details">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
