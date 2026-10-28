import React, { useState, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Clock, Check, X } from 'lucide-react';

export const CallModal = ({ lead, onClose }) => {
  const { logCall } = useCrm();
  const [seconds, setSeconds] = useState(0);
  const [isCalling, setIsCalling] = useState(true);
  const [outcome, setOutcome] = useState('Interested - Follow-up required');
  const [callNote, setCallNote] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer;
    if (isCalling) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCalling]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCalling(false);
  };

  const handleSaveAndClose = () => {
    const durationStr = formatTime(seconds);
    logCall(lead.id, outcome, durationStr, callNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header / Call display */}
        <div className="bg-gradient-to-b from-[#4E53E2] to-[#393ec9] text-white p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 rounded-full bg-white/20 p-1 mx-auto mb-3 shadow-inner flex items-center justify-center text-3xl">
            👤
          </div>
          <h3 className="text-lg font-bold">{lead.name}</h3>
          <p className="text-xs text-white/80 mt-0.5">{lead.phone}</p>
          <div className="text-[11px] bg-white/15 inline-block px-3 py-0.5 rounded-full mt-2 font-medium">
            {lead.project || 'NCC Urban IVY Towers'}
          </div>

          {/* Call timer */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-mono tracking-wider font-bold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            <span>{isCalling ? formatTime(seconds) : `Call Ended • ${formatTime(seconds)}`}</span>
          </div>

          {/* Wave animation */}
          {isCalling && (
            <div className="flex items-center justify-center gap-1 h-6 mt-3">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/70 rounded-full animate-pulse"
                  style={{
                    height: `${Math.sin(i) * 12 + 16}px`,
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call Controls & Outcome Form */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isCalling ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', padding: '12px 0' }}>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  padding: '16px', borderRadius: '50%', border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                  background: isMuted ? '#fff1f2' : 'var(--bg-hover)',
                  borderColor: isMuted ? '#fecdd3' : 'var(--border)',
                  color: isMuted ? 'var(--red)' : 'var(--text-secondary)'
                }}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>

              <button 
                onClick={handleEndCall}
                style={{
                  background: 'var(--red)', color: '#fff', padding: '16px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 16px rgba(220, 38, 38, 0.25)', transition: 'transform 0.15s'
                }}
                className="hover:scale-105 active:scale-95"
              >
                <PhoneOff size={24} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Call Outcome:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    'Interested (High Intent)',
                    'Callback Requested',
                    'Site Visit Discussed',
                    'Busy / No Answer',
                    'Budget Mismatch',
                    'Wrong Number'
                  ].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setOutcome(opt)}
                      style={{
                        padding: '10px', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: outcome === opt ? 700 : 500,
                        textAlign: 'left', cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                        background: outcome === opt ? 'var(--accent-light)' : 'var(--bg-page)',
                        color: outcome === opt ? 'var(--accent)' : 'var(--text-primary)',
                        borderColor: outcome === opt ? 'var(--accent)' : 'var(--border)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Call Notes:
                </label>
                <textarea
                  value={callNote}
                  onChange={(e) => setCallNote(e.target.value)}
                  placeholder="Notes about client budget, unit preferences, next steps..."
                  className="crm-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                />
              </div>

              <button
                onClick={handleSaveAndClose}
                className="crm-btn crm-btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
              >
                <Check size={16} style={{ marginRight: '6px' }} />
                Save Call Log & Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
