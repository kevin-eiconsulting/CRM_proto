import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Send, CheckCheck, FileText, MapPin, Tag } from 'lucide-react';

export const WhatsAppModal = ({ lead, onClose }) => {
  const { showToast } = useCrm();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them',
      text: `Hi, I inquired regarding ${lead.project || 'NCC Urban IVY Towers'} on ${lead.source || 'Magicbricks'}. Can you share details?`,
      time: '10:15 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sendTemplate = (text) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast('WhatsApp message sent', 'success');
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendTemplate(inputText.trim());
    setInputText('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="crm-card" style={{ width: '100%', maxWidth: '400px', background: '#e5ddd5', padding: 0, display: 'flex', flexDirection: 'column', height: '520px', overflow: 'hidden' }}>
        
        {/* WhatsApp Top Header */}
        <div style={{ background: '#075E54', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              👤
            </div>
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{lead.name}</h3>
              <p style={{ fontSize: '0.65rem', color: '#a7f3d0', margin: '2px 0 0' }}>Online • Dinesh Reality Verified Business</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', padding: '4px', cursor: 'pointer' }} className="hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Quick Real Estate Templates */}
        <div style={{ background: 'rgba(255,255,255,0.9)', borderBottom: '1px solid var(--border)', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }} className="no-scrollbar">
          <button
            onClick={() => sendTemplate(`Greetings from Dinesh Reality! Hello ${lead.name}, here is the digital brochure and floor plans for ${lead.project || 'NCC Urban IVY Towers'}: [PDF 4.2 MB]`)}
            style={{ padding: '6px 12px', background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            <FileText size={12} style={{ color: 'var(--green)' }} /> Brochure PDF
          </button>
          <button
            onClick={() => sendTemplate(`Greetings from Dinesh Reality! Hello ${lead.name}, would you be available for a physical site tour at ${lead.project || 'NCC Urban IVY Towers'} this Saturday at 11:00 AM? Our executive will accompany you.`)}
            style={{ padding: '6px 12px', background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            <MapPin size={12} style={{ color: 'var(--green)' }} /> Site Tour Invite
          </button>
          <button
            onClick={() => sendTemplate(`Dinesh Reality Exclusive Offer: Special pricing for ${lead.unitType || '2/3 BHK'} starting at ${lead.budget || '₹95 Lakhs'} with flexible construction-linked payment plan & zero clubhouse fees.`)}
            style={{ padding: '6px 12px', background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            <Tag size={12} style={{ color: 'var(--green)' }} /> Price Sheet
          </button>
        </div>

        {/* Messages Body */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                background: m.sender === 'me' ? '#dcf8c6' : '#fff',
                padding: '10px 14px',
                borderRadius: '12px',
                borderTopRightRadius: m.sender === 'me' ? 0 : '12px',
                borderTopLeftRadius: m.sender === 'me' ? '12px' : 0,
                maxWidth: '85%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontSize: '0.8rem', color: '#111b21', margin: 0, lineHeight: 1.4 }}>{m.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'flex-end', gap: '4px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.6rem', color: '#667781' }}>{m.time}</span>
                  {m.sender === 'me' && <CheckCheck size={12} style={{ color: '#3b82f6' }} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '12px', background: '#f0f2f5', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid var(--border)' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type WhatsApp message..."
            style={{ flex: 1, padding: '10px 16px', borderRadius: '24px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.8rem' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: inputText.trim() ? '#075E54' : '#d1d7db', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'default', transition: 'background 0.2s' }}
          >
            <Send size={16} style={{ marginLeft: inputText.trim() ? '2px' : '0' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
