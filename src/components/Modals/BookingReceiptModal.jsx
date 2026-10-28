import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Printer, CheckCircle, ShieldCheck, Building2, Download } from 'lucide-react';

export const BookingReceiptModal = ({ lead, onClose }) => {
  const { companyInfo } = useCrm();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="crm-card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', padding: 0, display: 'flex', flexDirection: 'column', maxHeight: '95vh', overflow: 'hidden' }}>
        
        {/* Top Actions Bar (Non-print) */}
        <div style={{ background: '#0f172a', color: '#fff', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e2e8f0' }}>
              Official Token Receipt
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{ background: 'var(--accent)', color: '#fff', padding: '6px 12px', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
            >
              <Printer size={14} /> Print / PDF
            </button>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '4px', cursor: 'pointer' }}
              className="hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Formal Receipt Document */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-page)' }}>
          
          {/* Company Letterhead */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '2px solid var(--accent)', paddingBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'var(--accent)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  DR
                </div>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', textTransform: 'uppercase', margin: 0 }}>
                  {companyInfo.name}
                </h1>
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 500, margin: '4px 0 0' }}>
                {companyInfo.tagline}
              </p>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
                RERA Reg: {companyInfo.reraId}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.6rem', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Booking Confirmed
              </span>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '4px', fontFamily: 'monospace' }}>
                Receipt #{lead.id}-BK{Math.floor(100 + Math.random() * 900)}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Customer & Unit Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#fff', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Customer Name</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', display: 'block' }}>{lead.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{lead.phone}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Authorized Telecaller</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2px', display: 'block' }}>{lead.assignedTelecaller || 'Direct'}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Dinesh Reality Sales Desk</span>
            </div>
          </div>

          {/* Property Specifications */}
          <div style={{ background: '#fff', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Property Details</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid var(--border)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Project:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{lead.project || 'NCC Urban IVY Towers'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid var(--border)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Unit Type:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{lead.unitType || '3 BHK'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid var(--border)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Agreed Consideration Value:</span>
              <strong style={{ color: 'var(--accent-dark)' }}>{lead.budget}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', paddingTop: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Lead Source Channel:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead.source} (Dinesh Reality Channel)</span>
            </div>
          </div>

          {/* Payment Acknowledgement */}
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                Token Advance Acknowledged
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#022c22', marginTop: '2px' }}>
                {lead.bookingAmount || '₹5,00,000 Token Received'}
              </div>
              <span style={{ fontSize: '0.65rem', color: '#047857' }}>Mode: RTGS / Bank Transfer • Clearance Verified</span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={24} />
            </div>
          </div>

          {/* Stamp & Signature Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                <ShieldCheck size={14} style={{ color: 'var(--green)' }} />
                Verified Dinesh Reality Document
              </div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                Bengaluru, Karnataka • connect@dineshreality.com
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '96px', height: '36px', borderBottom: '1px dashed #94a3b8', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '2px' }}>
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--accent-dark)', fontWeight: 700 }}>Dinesh Kumar</span>
              </div>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>Authorized Signatory</span>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-tertiary)' }}>Dinesh Reality Management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
