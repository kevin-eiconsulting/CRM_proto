import React, { useRef, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import { HomeTab } from './HomeTab';
import { FreshTab } from './FreshTab';
import { ClaimedTab } from './ClaimedTab';
import { PipelineTab } from './PipelineTab';
import { CalendarView } from './CalendarView';
import { SearchView } from './SearchView';
import { NotificationsView } from './NotificationsView';
import { MoreView } from './MoreView';
import { 
  Home as HomeIcon, 
  Calendar as CalendarIcon, 
  Search as SearchIcon, 
  Bell as BellIcon, 
  MoreVertical,
  Wifi,
  Battery,
  Navigation,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const MobileFrame = ({ scale = 1, isFrameless = false }) => {
  const { 
    mobileTab, 
    setMobileTab, 
    bottomNav, 
    setBottomNav, 
    summaryCounts, 
    ignoredLeadsCount 
  } = useCrm();

  const tabsRef = useRef(null);
  const tabButtonRefs = useRef({});

  const TABS = [
    { id: 'HOME', label: 'HOME' },
    { id: 'FRESH', label: 'FRESH' },
    { id: 'CLAIMED', label: 'CLAIMED' },
    { id: 'INTERESTED', label: 'INTERESTED' },
    { id: 'MEETING DONE', label: 'MEETING' },
    { id: 'VISIT DONE', label: 'VISIT DONE' },
    { id: 'NEGOTIATION', label: 'NEGOTIATION' },
    { id: 'BOOKING DONE', label: 'BOOKING' },
    { id: 'FAILED', label: 'FAILED' },
  ];

  // Auto-scroll active tab into view whenever mobileTab changes
  useEffect(() => {
    if (tabButtonRefs.current[mobileTab]) {
      tabButtonRefs.current[mobileTab].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [mobileTab]);

  const handleTabClick = (tabId) => {
    setMobileTab(tabId);
    setBottomNav('home');
  };

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -120 : 120,
        behavior: 'smooth'
      });
    }
  };

  const renderContent = () => {
    if (bottomNav === 'calendar') return <CalendarView />;
    if (bottomNav === 'search') return <SearchView />;
    if (bottomNav === 'notifications') return <NotificationsView />;
    if (bottomNav === 'more') return <MoreView />;

    switch (mobileTab) {
      case 'HOME':
        return <HomeTab />;
      case 'FRESH':
        return <FreshTab />;
      case 'CLAIMED':
        return <ClaimedTab />;
      case 'INTERESTED':
        return <PipelineTab stageId="interested" stageTitle="Interested Leads" />;
      case 'MEETING DONE':
        return <PipelineTab stageId="meeting_done" stageTitle="Meeting Done" />;
      case 'VISIT DONE':
        return <PipelineTab stageId="visit_done" stageTitle="Visits Done" />;
      case 'NEGOTIATION':
        return <PipelineTab stageId="negotiation" stageTitle="Negotiation Leads" />;
      case 'BOOKING DONE':
        return <PipelineTab stageId="booking_done" stageTitle="Bookings Done" />;
      case 'FAILED':
        return <PipelineTab stageId="failed" stageTitle="Failed / Dropped Leads" />;
      default:
        return <HomeTab />;
    }
  };

  // If Frameless Web View is selected
  if (isFrameless) {
    return (
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[min(720px,calc(100vh-140px))] select-none">
        {/* Top Header */}
        <div className="bg-[#4E53E2] text-white pt-3 px-3 pb-2 z-10">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-bold tracking-tight">Real Estate CRM Mobile</span>
            <div className="flex items-center gap-1.5 text-xs text-white/90">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tabs bar */}
          <div className="relative flex items-center">
            <button 
              onClick={() => scrollTabs('left')}
              className="text-white/60 hover:text-white p-0.5 shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div 
              ref={tabsRef}
              className="flex items-center overflow-x-auto no-scrollbar gap-4 px-1 py-1 text-[11px] font-bold tracking-wider flex-1"
            >
              {TABS.map((tab) => {
                const isActive = mobileTab === tab.id && bottomNav === 'home';
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabButtonRefs.current[tab.id] = el)}
                    onClick={() => handleTabClick(tab.id)}
                    className={`relative py-1 whitespace-nowrap cursor-pointer transition-colors ${
                      isActive ? 'text-white font-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
            <button 
              onClick={() => scrollTabs('right')}
              className="text-white/60 hover:text-white p-0.5 shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto bg-[#f6f7fb] overscroll-contain">
          {renderContent()}
        </div>

        {/* Bottom Bar */}
        <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between z-10 shadow-md">
          <button onClick={() => setBottomNav('home')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${bottomNav === 'home' ? 'text-[#4E53E2]' : 'text-gray-400'}`}>
            <HomeIcon className="w-4 h-4" /><span className="text-[9px] font-semibold">Home</span>
          </button>
          <button onClick={() => setBottomNav('calendar')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${bottomNav === 'calendar' ? 'text-[#4E53E2]' : 'text-gray-400'}`}>
            <CalendarIcon className="w-4 h-4" /><span className="text-[9px] font-semibold">Calendar</span>
          </button>
          <button onClick={() => setBottomNav('search')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${bottomNav === 'search' ? 'text-[#4E53E2]' : 'text-gray-400'}`}>
            <SearchIcon className="w-4 h-4" /><span className="text-[9px] font-semibold">Search</span>
          </button>
          <button onClick={() => setBottomNav('notifications')} className={`flex flex-col items-center gap-0.5 cursor-pointer relative ${bottomNav === 'notifications' ? 'text-[#4E53E2]' : 'text-gray-400'}`}>
            <BellIcon className="w-4 h-4" /><span className="text-[9px] font-semibold">Notifications</span>
          </button>
          <button onClick={() => setBottomNav('more')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${bottomNav === 'more' ? 'text-[#4E53E2]' : 'text-gray-400'}`}>
            <MoreVertical className="w-4 h-4" /><span className="text-[9px] font-semibold">More</span>
          </button>
        </div>
      </div>
    );
  }

  // Standard Phone Bezel View
  return (
    <div 
      className="flex justify-center items-center transition-all duration-200"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center'
      }}
    >
      {/* Phone Casing: Height adapts to screen (max 720px, min 500px, fits 100vh-140px) */}
      <div className="w-[370px] sm:w-[385px] h-[min(720px,calc(100vh-140px))] min-h-[540px] bg-black rounded-[44px] p-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border-[4px] border-slate-700/80 relative flex flex-col overflow-hidden select-none">
        
        {/* Dynamic Island Header (Replicating user's screenshot turn navigation & indicators) */}
        <div className="bg-[#4E53E2] pt-2 px-3 pb-2 text-white relative z-20 shrink-0">
          {/* Top Status Indicators & Island */}
          <div className="flex items-center justify-between mb-1.5 px-2">
            <span className="text-[11px] font-semibold tracking-tight">9:41</span>
            
            {/* Dynamic Island Pill with 950m Navigation Indicator as seen in screenshots */}
            <div className="bg-black text-white px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-md border border-slate-800 text-[10px]">
              <div className="flex items-center text-purple-400 gap-0.5 text-[9px]">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></span>
                <span>⇅</span>
              </div>
              <div className="w-px h-2.5 bg-slate-700 mx-0.5"></div>
              <Navigation className="w-2.5 h-2.5 text-white transform -rotate-45" />
              <span className="font-bold text-[10px] tracking-tight">950 m</span>
            </div>

            <div className="flex items-center gap-1.5 text-white/90">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Top Pipeline Horizontal Tabs Bar with Navigation Chevrons */}
          <div className="relative flex items-center">
            <button 
              onClick={() => scrollTabs('left')}
              className="text-white/60 hover:text-white p-0.5 shrink-0 cursor-pointer"
              title="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div 
              ref={tabsRef}
              className="flex items-center overflow-x-auto no-scrollbar gap-4 px-1 pt-0.5 text-[11px] font-bold tracking-wider flex-1 scroll-smooth"
            >
              {TABS.map((tab) => {
                const isActive = mobileTab === tab.id && bottomNav === 'home';
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabButtonRefs.current[tab.id] = el)}
                    onClick={() => handleTabClick(tab.id)}
                    className={`relative py-1 whitespace-nowrap cursor-pointer transition-colors ${
                      isActive ? 'text-white font-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full shadow-xs animate-in fade-in duration-200"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => scrollTabs('right')}
              className="text-white/60 hover:text-white p-0.5 shrink-0 cursor-pointer"
              title="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto bg-[#f6f7fb] relative overscroll-contain">
          {renderContent()}
        </div>

        {/* Bottom Navigation Bar (Home, Calendar, Search, Notifications, More) */}
        <div className="bg-white border-t border-gray-200/80 px-3 py-2 flex items-center justify-between z-20 shadow-md shrink-0">
          {/* Home */}
          <button
            onClick={() => setBottomNav('home')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              bottomNav === 'home' ? 'text-[#4E53E2]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-[9px] font-semibold">Home</span>
          </button>

          {/* Calendar */}
          <button
            onClick={() => setBottomNav('calendar')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              bottomNav === 'calendar' ? 'text-[#4E53E2]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="text-[9px] font-semibold">Calendar</span>
          </button>

          {/* Search */}
          <button
            onClick={() => setBottomNav('search')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              bottomNav === 'search' ? 'text-[#4E53E2]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <SearchIcon className="w-4 h-4" />
            <span className="text-[9px] font-semibold">Search</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setBottomNav('notifications')}
            className={`flex flex-col items-center gap-0.5 relative cursor-pointer ${
              bottomNav === 'notifications' ? 'text-[#4E53E2]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative">
              <BellIcon className="w-4 h-4" />
              {ignoredLeadsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </div>
            <span className="text-[9px] font-semibold">Notifications</span>
          </button>

          {/* More */}
          <button
            onClick={() => setBottomNav('more')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              bottomNav === 'more' ? 'text-[#4E53E2]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MoreVertical className="w-4 h-4" />
            <span className="text-[9px] font-semibold">More</span>
          </button>
        </div>

        {/* iPhone Bottom Home Indicator Bar */}
        <div className="bg-white pb-1.5 flex justify-center shrink-0">
          <div className="w-28 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
