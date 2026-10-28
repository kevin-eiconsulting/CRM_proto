import React, { useState } from 'react';
import { CrmProvider, useCrm } from './context/CrmContext';
import { AdminDashboard } from './components/DesktopCRM/AdminDashboard';
import { HomeTab } from './components/MobileApp/HomeTab';
import { FreshTab } from './components/MobileApp/FreshTab';
import { ClaimedTab } from './components/MobileApp/ClaimedTab';
import { PipelineTab } from './components/MobileApp/PipelineTab';
import { CalendarView } from './components/MobileApp/CalendarView';
import { SearchView } from './components/MobileApp/SearchView';
import { NotificationsView } from './components/MobileApp/NotificationsView';
import { MoreView } from './components/MobileApp/MoreView';
import { CallModal } from './components/Modals/CallModal';
import { WhatsAppModal } from './components/Modals/WhatsAppModal';
import { ScheduleModal } from './components/Modals/ScheduleModal';
import { MoveStageModal } from './components/Modals/MoveStageModal';
import { LeadDetailModal } from './components/Modals/LeadDetailModal';
import { AddLeadModal } from './components/Modals/AddLeadModal';
import { BookingReceiptModal } from './components/Modals/BookingReceiptModal';

const MOBILE_TABS = [
  { id: 'HOME',         label: 'Home' },
  { id: 'FRESH',        label: 'Fresh Leads' },
  { id: 'CLAIMED',      label: 'My Leads' },
  { id: 'INTERESTED',   label: 'Interested' },
  { id: 'MEETING DONE', label: 'Meeting Done' },
  { id: 'VISIT DONE',   label: 'Visit Done' },
  { id: 'NEGOTIATION',  label: 'Negotiation' },
  { id: 'BOOKING DONE', label: 'Booking Done' },
  { id: 'FAILED',       label: 'Failed / NI' },
];

const PIPELINE_TABS = {
  'INTERESTED':   { stageId: 'interested',   stageTitle: 'Interested Leads' },
  'MEETING DONE': { stageId: 'meeting_done', stageTitle: 'Meeting Done' },
  'VISIT DONE':   { stageId: 'visit_done',   stageTitle: 'Visits Done' },
  'NEGOTIATION':  { stageId: 'negotiation',  stageTitle: 'Negotiation Leads' },
  'BOOKING DONE': { stageId: 'booking_done', stageTitle: 'Bookings Done' },
  'FAILED':       { stageId: 'failed',       stageTitle: 'Failed / Dropped' },
};

const BOTTOM_NAV_ITEMS = [
  { id: 'home',          label: 'Home' },
  { id: 'calendar',      label: 'Calendar' },
  { id: 'search',        label: 'Search' },
  { id: 'notifications', label: 'Notifs' },
  { id: 'more',          label: 'More' },
];

/* Telecaller full-page view (no phone bezel) */
const TelecallerView = () => {
  const { mobileTab, setMobileTab, bottomNav, setBottomNav } = useCrm();

  const renderContent = () => {
    if (bottomNav === 'calendar')      return <CalendarView />;
    if (bottomNav === 'search')        return <SearchView />;
    if (bottomNav === 'notifications') return <NotificationsView />;
    if (bottomNav === 'more')          return <MoreView />;
    switch (mobileTab) {
      case 'HOME':    return <HomeTab />;
      case 'FRESH':   return <FreshTab />;
      case 'CLAIMED': return <ClaimedTab />;
      default:
        if (PIPELINE_TABS[mobileTab]) {
          const { stageId, stageTitle } = PIPELINE_TABS[mobileTab];
          return <PipelineTab stageId={stageId} stageTitle={stageTitle} />;
        }
        return <HomeTab />;
    }
  };

  return (
    <div className="telecaller-container">
      {/* Tab strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', overflowX: 'auto', flexShrink: 0 }}>
        <div style={{ display: 'flex', minWidth: 'max-content' }}>
          {MOBILE_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setMobileTab(tab.id); setBottomNav('home'); }}
              style={{
                padding: '10px 16px',
                fontSize: '0.8rem',
                fontWeight: mobileTab === tab.id && bottomNav === 'home' ? 700 : 500,
                color: mobileTab === tab.id && bottomNav === 'home' ? 'var(--accent)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${mobileTab === tab.id && bottomNav === 'home' ? 'var(--accent)' : 'transparent'}`,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-page)' }}>
        {renderContent()}
      </div>

      {/* Bottom nav */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        flexShrink: 0,
      }}>
        {BOTTOM_NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setBottomNav(item.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '8px 4px', gap: '2px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: bottomNav === item.id ? 'var(--accent)' : 'var(--text-tertiary)',
              fontSize: '0.68rem', fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>
              {item.id === 'home' ? '🏠' : item.id === 'calendar' ? '📅' : item.id === 'search' ? '🔍' : item.id === 'notifications' ? '🔔' : '⋯'}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* Nav item SVG icons */
const DashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const MobileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const ResetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const MainApp = () => {
  const {
    companyInfo,
    activeTelecaller,
    setActiveTelecaller,
    telecallers,
    activeModal,
    setActiveModal,
    toastMessage,
    resetDemoData,
  } = useCrm();

  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="crm-shell">

      {/* Mobile backdrop */}
      <div 
        className={`crm-sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside className={`crm-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="crm-sidebar-logo">
          <div className="crm-logo-icon">DR</div>
          <div>
            <div className="crm-logo-title">{companyInfo.name}</div>
            <div className="crm-logo-sub">RERA · Bengaluru</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="crm-nav">
          <div className="crm-nav-section">Views</div>
          <button
            className={`crm-nav-item${page === 'dashboard' ? ' active' : ''}`}
            onClick={() => { setPage('dashboard'); setSidebarOpen(false); }}
          >
            <DashIcon />
            Dashboard
          </button>
          <button
            className={`crm-nav-item${page === 'telecaller' ? ' active' : ''}`}
            onClick={() => { setPage('telecaller'); setSidebarOpen(false); }}
          >
            <MobileIcon />
            Telecaller View
          </button>
        </nav>

        {/* Bottom user strip */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--accent)', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>DK</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {companyInfo.admin || 'Dinesh Kumar'}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Managing Director</div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="crm-main">

        {/* Header */}
        <header className="crm-header">
          <button className="crm-hamburger" onClick={() => setSidebarOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {page === 'dashboard' ? 'Lead Management Dashboard' : 'Telecaller View'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
              {page === 'dashboard' ? 'All leads, pipeline stages, and telecaller assignments' : 'Mobile telecaller workflow'}
            </div>
          </div>

          <div className="crm-header-actions">
            {/* Telecaller selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '6px 12px', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>Telecaller:</span>
              <select
                value={activeTelecaller}
                onChange={e => setActiveTelecaller(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontWeight: 600, color: 'var(--accent)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)', cursor: 'pointer' }}
              >
                {telecallers.map(t => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <button className="crm-icon-btn" onClick={resetDemoData} title="Reset data">
              <ResetIcon />
            </button>

            {/* Avatar */}
            <div className="crm-avatar">DK</div>
          </div>
        </header>

        {/* Page */}
        {page === 'dashboard' && (
          <div className="crm-page">
            <AdminDashboard />
          </div>
        )}
        {page === 'telecaller' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: 'calc(100vh - var(--header-height))' }}>
            <TelecallerView />
          </div>
        )}
      </div>

      {/* Toast */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '12px 16px', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', fontWeight: 500 }}>
            {toastMessage.type === 'success'
              ? <span style={{ color: 'var(--green)' }}>✓</span>
              : <span style={{ color: 'var(--accent)' }}>ℹ</span>}
            {toastMessage.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {activeModal?.type === 'call' && <CallModal lead={activeModal.lead} onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'whatsapp' && <WhatsAppModal lead={activeModal.lead} onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'schedule' && <ScheduleModal lead={activeModal.lead} defaultMeeting={activeModal.defaultMeeting} onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'move_stage' && <MoveStageModal lead={activeModal.lead} onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'detail' && <LeadDetailModal lead={activeModal.lead} onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'add_lead' && <AddLeadModal onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'receipt' && <BookingReceiptModal lead={activeModal.lead} onClose={() => setActiveModal(null)} />}
    </div>
  );
};

export default function App() {
  return (
    <CrmProvider>
      <MainApp />
    </CrmProvider>
  );
}
