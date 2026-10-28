import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LEADS, TELECALLERS, PORTALS, PIPELINE_STAGES, COMPANY_INFO } from '../data/initialData';
import confetti from 'canvas-confetti';

const CrmContext = createContext();

export const CrmProvider = ({ children }) => {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('asfaq_crm_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached leads', e);
      }
    }
    return INITIAL_LEADS;
  });

  const [currentRole, setCurrentRole] = useState('telecaller'); // 'telecaller' | 'admin'
  const [activeTelecaller, setActiveTelecaller] = useState('Manish'); // Matches user screenshots where Manish has 12 claimed leads
  const [viewMode, setViewMode] = useState('dual'); // 'dual' | 'mobile' | 'desktop'
  const [mobileTab, setMobileTab] = useState('HOME'); // 'HOME' | 'FRESH' | 'CLAIMED' | 'INTERESTED' | 'MEETING DONE' | 'VISIT DONE' | etc.
  const [bottomNav, setBottomNav] = useState('home'); // 'home' | 'calendar' | 'search' | 'notifications' | 'more'
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // { type: 'call' | 'whatsapp' | 'schedule' | 'detail' | 'add_lead' | 'move_stage', lead: Lead }
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('asfaq_crm_leads', JSON.stringify(leads));
  }, [leads]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Claim Lead (Core requirement: "telecallers should be able to choose leads and claim them")
  const claimLead = (leadId, telecaller = activeTelecaller) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId) {
          return {
            ...lead,
            stage: 'claimed',
            assignedTelecaller: telecaller,
            claimedAt: 'Just now',
            lastCalledAt: 'NOT CALLED',
            isIgnored: false,
            notes: [`Claimed by ${telecaller} just now`, ...(lead.notes || [])]
          };
        }
        return lead;
      })
    );

    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }

    showToast(`Lead successfully claimed by ${telecaller}!`, 'success');
  };

  // Reassign Lead (Admin requirement: admin can reassign to any telecaller)
  const reassignLead = (leadId, newTelecaller) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId) {
          return {
            ...lead,
            assignedTelecaller: newTelecaller,
            stage: lead.stage === 'fresh' && newTelecaller ? 'claimed' : lead.stage,
            notes: [`Reassigned to ${newTelecaller || 'Unassigned'} by Admin`, ...(lead.notes || [])]
          };
        }
        return lead;
      })
    );
    showToast(`Lead reassigned to ${newTelecaller || 'Unassigned'}`, 'success');
  };

  // Advance Lead Stage (Core pipeline tracking requirement)
  const advanceStage = (leadId, newStage, stageNote = '') => {
    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId) {
          const notes = stageNote 
            ? [`Stage updated to ${newStage.toUpperCase()}: ${stageNote}`, ...(lead.notes || [])]
            : [`Stage updated to ${newStage.toUpperCase()}`, ...(lead.notes || [])];
          return {
            ...lead,
            stage: newStage,
            notes
          };
        }
        return lead;
      })
    );
    showToast(`Pipeline updated: Moved to ${newStage.toUpperCase().replace('_', ' ')}`, 'info');
  };

  // Log Call
  const logCall = (leadId, outcome, duration, noteText) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId) {
          const newNotes = noteText 
            ? [`Call (${outcome}, ${duration}): ${noteText}`, ...(lead.notes || [])]
            : [`Call recorded: ${outcome} (${duration})`, ...(lead.notes || [])];
          return {
            ...lead,
            lastCalledAt: 'JUST NOW',
            isIgnored: false,
            notes: newNotes,
            callLogs: [
              { timestamp: new Date().toLocaleTimeString(), outcome, duration, notes: noteText },
              ...(lead.callLogs || [])
            ]
          };
        }
        return lead;
      })
    );
    showToast(`Call logged: ${outcome}`, 'success');
  };

  // Schedule Follow-up / Calendar event
  const scheduleFollowUp = (leadId, followUpText, isMeeting = false) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId) {
          const nextStage = isMeeting ? 'meeting_done' : lead.stage;
          return {
            ...lead,
            stage: nextStage,
            followUpTime: followUpText,
            notes: [`Follow-up scheduled: ${followUpText}`, ...(lead.notes || [])]
          };
        }
        return lead;
      })
    );
    showToast(`Follow-up scheduled: ${followUpText}`, 'success');
  };

  // Ingest New Portal Lead (Diagram requirement: Magicbricks, 99acres, Other portals, digital sources)
  const ingestNewLead = (sourceName, customData = {}) => {
    const names = [
      'Anand Shankar', 'Pooja Hegde', 'Rohan Mathur', 'Divya Krishnan', 
      'Vijay Deverakonda', 'Tanvi Parekh', 'Arvind Subramanian', 'Sneha Reddy'
    ];
    const projects = ['NCC Urban IVY Towers', 'Sobha Dream Acres', 'Prestige Falcon City'];
    const budgets = ['₹85 L - 1.1 Cr', '₹1.15 Cr - 1.4 Cr', '₹1.5 Cr - 2.0 Cr'];
    const unitTypes = ['2 BHK Luxury', '3 BHK Premium', '2.5 BHK', 'Penthouse'];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    const randomBudget = budgets[Math.floor(Math.random() * budgets.length)];
    const randomUnit = unitTypes[Math.floor(Math.random() * unitTypes.length)];
    const randomPhone = `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`;

    const newLead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: customData.name || randomName,
      phone: customData.phone || randomPhone,
      email: `${(customData.name || randomName).toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      project: customData.project || randomProject,
      budget: customData.budget || randomBudget,
      unitType: customData.unitType || randomUnit,
      source: sourceName || 'Magicbricks',
      stage: 'fresh',
      assignedTelecaller: null,
      claimedAt: null,
      lastCalledAt: null,
      followUpTime: null,
      tier: Math.random() > 0.5 ? 'PLATINUM' : 'GOLD',
      hotness: Math.floor(Math.random() * 3) + 1,
      enquiriesCount: 1,
      isIgnored: false,
      notes: [`Auto-ingested from ${sourceName} API webhook.`],
      createdTime: 'Just now'
    };

    setLeads(prev => [newLead, ...prev]);
    showToast(`⚡ New lead received from ${sourceName}: ${newLead.name}`, 'info');
  };

  // Reset demo data
  const resetDemoData = () => {
    setLeads(INITIAL_LEADS);
    localStorage.removeItem('asfaq_crm_leads');
    showToast('Reset to original demo data', 'info');
  };

  // Calculate dynamic summary numbers (Matches Screenshot 4: 8 Fresh, 11 Claimed, 8 Interested, 0 Meeting Done, 27 Visit Done, 1 Negotiation, 3 Booking Done, 176 Failed)
  const summaryCounts = {
    fresh: leads.filter(l => l.stage === 'fresh').length,
    claimed: leads.filter(l => l.stage === 'claimed' && (currentRole === 'admin' || l.assignedTelecaller === activeTelecaller)).length,
    interested: leads.filter(l => l.stage === 'interested').length,
    meeting_done: leads.filter(l => l.stage === 'meeting_done').length,
    visit_done: leads.filter(l => l.stage === 'visit_done').length,
    negotiation: leads.filter(l => l.stage === 'negotiation').length,
    booking_done: leads.filter(l => l.stage === 'booking_done').length,
    failed: leads.filter(l => l.stage === 'failed').length,
  };

  const ignoredLeadsCount = leads.filter(l => l.isIgnored && (currentRole === 'admin' || l.assignedTelecaller === activeTelecaller)).length;

  return (
    <CrmContext.Provider
      value={{
        companyInfo: COMPANY_INFO,
        leads,
        telecallers: TELECALLERS,
        portals: PORTALS,
        pipelineStages: PIPELINE_STAGES,
        currentRole,
        setCurrentRole,
        activeTelecaller,
        setActiveTelecaller,
        viewMode,
        setViewMode,
        mobileTab,
        setMobileTab,
        bottomNav,
        setBottomNav,
        activeModal,
        setActiveModal,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        claimLead,
        reassignLead,
        advanceStage,
        logCall,
        scheduleFollowUp,
        ingestNewLead,
        resetDemoData,
        summaryCounts,
        ignoredLeadsCount
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
