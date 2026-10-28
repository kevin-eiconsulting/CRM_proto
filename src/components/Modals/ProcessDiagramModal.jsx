import React from 'react';
import { X, ArrowDown, Users, Database, Layers, CheckCircle2, Search, Smartphone } from 'lucide-react';

export const ProcessDiagramModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">
              Dinesh Reality — Lead Management Process
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagram Flow */}
        <div className="mt-4 space-y-4">
          
          {/* Top Sources */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              1. Multi-Portal Ingestion Sources
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#0f4c81] text-white p-2.5 rounded-xl font-bold">
                Magicbricks
              </div>
              <div className="bg-[#15803d] text-white p-2.5 rounded-xl font-bold">
                99acres
              </div>
              <div className="bg-[#b45309] text-white p-2.5 rounded-xl font-bold">
                Other Portals
              </div>
              <div className="bg-[#6b21a8] text-white p-2.5 rounded-xl font-bold">
                Digital Ads (Meta/Google)
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-indigo-500 font-bold text-xs items-center gap-1">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span>AUTOMATIC LEAD DATA INGESTION</span>
          </div>

          {/* Central CRM */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs text-indigo-400 font-mono">CENTRAL REPOSITORY & ROUTER</div>
            <div className="text-base font-bold mt-1">CRM Core Dashboard Engine</div>
            <div className="text-xs text-slate-400 mt-1">
              Validates inquiries, dedupes phone numbers, creates fresh lead records
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-indigo-500 font-bold text-xs items-center gap-1">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span>ASSIGNED & UNCLAIMED LEADS</span>
          </div>

          {/* Telecallers */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Authorized Telecallers Pool
            </div>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {['Pavithra', 'Manish', 'Vothna', 'Agent 1', 'Agent 2'].map(name => (
                <div key={name} className="bg-slate-100 p-2 rounded-xl border border-slate-200">
                  <div className="text-base">👤</div>
                  <div className="font-bold text-slate-800 text-[11px] truncate mt-0.5">{name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Client Principles from handwritten notes */}
          <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 space-y-2 mt-4 text-xs">
            <div className="font-bold text-indigo-900 text-sm mb-1">
              Implemented Client Requirements (from handwritten spec):
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>1. Telecaller Lead Management:</strong> Telecallers view fresh pool and claim leads with 1 click.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>2. Admin Visibility:</strong> Searching lead name reveals the assigned telecaller immediately.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>3. Pipeline Tracking:</strong> Tracks lead progression from Fresh ➔ Claimed ➔ Interested ➔ Meeting ➔ Visit ➔ Booking / Failed.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>4. Exact Layout:</strong> Matches the provided mobile layout and desktop management views seamlessly.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
