"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Lock, 
  Unlock, 
  MessageSquare, 
  Calendar, 
  Key, 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Helicopter, 
  Car, 
  Send,
  User,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';

export function VIPConcierge() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  
  // Booking Form State
  const [transportType, setTransportType] = useState<'helicopter' | 'suv'>('helicopter');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    const handleOpenVIP = () => {
      setMenuOpen(false);
      setModalOpen(true);
    };
    window.addEventListener('open-vip-modal', handleOpenVIP);
    return () => window.removeEventListener('open-vip-modal', handleOpenVIP);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === 'RH2024' || passcode.trim().length >= 4) {
      setIsUnlocked(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid passcode. Try "RH2024" for VIP access.');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setBookingSubmitted(true);
    }
  };

  const openVIPModal = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  const handleDownloadPDF = (title: string) => {
    try {
      const file = new Blob([`RHODES HILLS CONFIDENTIAL DOCUMENT: ${title}\nGenerated for VIP Lounge Member.`], {type: 'text/plain'});
      const url = URL.createObjectURL(file);
      const element = document.createElement("a");
      element.href = url;
      element.download = `${title.toLowerCase().replace(/\s+/g, '_')}_rhodes_hills.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("PDF download error:", err);
    }
  };

  return (
    <>
      {/* 1. FLOATING CONCIERGE WIDGET */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
        
        {/* Quick Menu Popover */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mb-4 w-80 bg-[#141820]/95 backdrop-blur-xl border border-[#C5A059]/40 rounded-2xl p-5 shadow-2xl shadow-black/80 text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute" />
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  </div>
                  <span className="font-display text-base tracking-wider text-white font-medium">Agente Concierge</span>
                </div>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="text-quartz-light hover:text-white p-1 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-quartz-light mb-4 font-sans font-light leading-relaxed">
                Exclusive private assistance for investors and prospective residents.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/17025550199?text=Hello,%20I%20would%20like%20more%20exclusive%20information%20about%20Rhodes%20Hills."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-3 bg-[#0B0D10] hover:bg-[#0B0D10]/80 border border-[#1E293B] hover:border-[#C5A059]/50 rounded-xl text-xs uppercase tracking-widest text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span>WhatsApp VIP Direct</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-quartz-light group-hover:text-gold transition-colors" />
                </a>

                {/* Schedule Visit */}
                <button
                  onClick={openVIPModal}
                  className="flex items-center justify-between w-full p-3 bg-[#0B0D10] hover:bg-[#0B0D10]/80 border border-[#1E293B] hover:border-[#C5A059]/50 rounded-xl text-xs uppercase tracking-widest text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-gold/10 text-gold rounded-lg">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span>Schedule Visit</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-quartz-light group-hover:text-gold transition-colors" />
                </button>

                {/* Enter Passcode */}
                <button
                  onClick={openVIPModal}
                  className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-gold to-[#E8D1A7] hover:from-[#E8D1A7] hover:to-gold text-black font-semibold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-gold/10"
                >
                  <div className="flex items-center gap-2.5">
                    <Key className="w-4 h-4" />
                    <span>VIP Access / Enter Passcode</span>
                  </div>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Pill Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative group flex items-center gap-3 px-5 py-3.5 bg-[#141820] border border-[#C5A059]/60 hover:border-gold rounded-full text-white shadow-2xl shadow-gold/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold to-[#E8D1A7] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500 pointer-events-none" />
          
          <div className="relative flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-display text-sm uppercase tracking-widest font-medium">Agente Concierge</span>
          </div>
        </button>

      </div>

      {/* 2. MODAL VIP LOUNGE */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0D10]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <div className="relative w-full max-w-3xl bg-[#141820] border border-[#C5A059]/40 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black my-auto">
              
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-quartz-light hover:text-white rounded-full bg-[#0B0D10] border border-[#1E293B] transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* STATE 1: LOCKED (PASSCODE SCREEN) */}
              {!isUnlocked ? (
                <div className="flex flex-col items-center text-center py-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gold/10 border border-gold/40 rounded-2xl flex items-center justify-center text-gold mb-6 shadow-xl">
                    <Lock className="w-8 h-8" />
                  </div>

                  <span className="text-xs uppercase tracking-[0.25em] text-gold mb-2 font-medium">Restricted Area</span>
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-4">VIP Lounge Access</h3>
                  <p className="text-sm font-sans text-quartz-light font-light leading-relaxed mb-8">
                    Enter your exclusive investor passcode to access price sheets, architectural guidelines, and direct luxury transport booking.
                  </p>

                  <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4">
                    <div className="relative w-full">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quartz-light" />
                      <input
                        type="password"
                        placeholder="Enter passcode (e.g. RH2024)"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-[#0B0D10] border border-[#1E293B] focus:border-gold rounded-xl text-white placeholder-quartz-light text-sm tracking-wider focus:outline-none transition-colors"
                      />
                    </div>

                    {passcodeError && (
                      <p className="text-xs text-rose-400 font-sans tracking-wide">{passcodeError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 bg-gold hover:bg-[#E8D1A7] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-gold/10 flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Unlock VIP Portal</span>
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-[#1E293B] text-xs text-quartz-light flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                    <span>Tip: Use passcode <strong className="text-gold">RH2024</strong> for demonstration.</span>
                  </div>
                </div>
              ) : (

                /* STATE 2: UNLOCKED (CONFIDENTIAL PORTAL) */
                <div className="space-y-8">
                  {/* Unlocked Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1E293B] pb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-medium mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Access Granted
                      </div>
                      <h3 className="font-display text-3xl text-white">Confidential VIP Portal</h3>
                    </div>

                    <button
                      onClick={() => setIsUnlocked(false)}
                      className="px-4 py-2 bg-[#0B0D10] border border-[#1E293B] hover:border-gold/40 rounded-xl text-xs uppercase tracking-widest text-quartz-light hover:text-white transition-colors"
                    >
                      Lock Session
                    </button>
                  </div>

                  {/* Section: Confidential Documents */}
                  <div>
                    <h4 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gold" /> Confidential Documents
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Price Sheet & Build Lots", size: "2.4 MB", code: "RH-DOC-01" },
                        { title: "Architectural Guidelines", size: "8.1 MB", code: "RH-DOC-02" },
                        { title: "Helipad & Security Protocols", size: "1.5 MB", code: "RH-DOC-03" },
                      ].map((doc, idx) => (
                        <div key={idx} className="p-4 bg-[#0B0D10] border border-[#1E293B] rounded-2xl flex flex-col justify-between gap-4 hover:border-gold/40 transition-colors">
                          <div>
                            <span className="font-mono text-[10px] text-gold uppercase tracking-widest block mb-1">{doc.code}</span>
                            <h5 className="font-display text-base text-white leading-snug mb-1">{doc.title}</h5>
                            <span className="text-xs text-quartz-light">{doc.size} • PDF</span>
                          </div>

                          <button
                            onClick={() => handleDownloadPDF(doc.title)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#141820] hover:bg-gold hover:text-black text-gold border border-gold/30 rounded-xl text-xs uppercase tracking-widest transition-all font-medium"
                          >
                            <Download className="w-3.5 h-3.5" /> Download PDF
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: 1-Click Direct Concierge Booking */}
                  <div className="pt-6 border-t border-[#1E293B]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                      <div>
                        <h4 className="font-display text-xl text-white flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gold" /> 1-Click Direct Concierge Booking
                        </h4>
                        <p className="text-xs text-quartz-light font-light mt-1">
                          Book your private guided tour with exclusive transport.
                        </p>
                      </div>

                      <a
                        href="https://wa.me/17025550199?text=Hello,%20I%20have%20VIP%20access%20and%20would%20like%20to%20schedule%20a%20visit."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        <MessageSquare className="w-4 h-4" /> VIP WhatsApp Shortcut
                      </a>
                    </div>

                    {!bookingSubmitted ? (
                      <form onSubmit={handleBookingSubmit} className="space-y-5 bg-[#0B0D10] p-6 rounded-2xl border border-[#1E293B]">
                        
                        {/* Transport Selector */}
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-quartz-light mb-3">
                            Preferred Transport Mode
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setTransportType('helicopter')}
                              className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                                transportType === 'helicopter'
                                  ? 'bg-gold/15 border-gold text-white font-medium'
                                  : 'bg-[#141820] border-[#1E293B] text-quartz-light hover:text-white'
                              }`}
                            >
                              <Helicopter className="w-5 h-5 text-gold" />
                              <span className="text-xs uppercase tracking-wider">Helicopter Tour</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setTransportType('suv')}
                              className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                                transportType === 'suv'
                                  ? 'bg-gold/15 border-gold text-white font-medium'
                                  : 'bg-[#141820] border-[#1E293B] text-quartz-light hover:text-white'
                              }`}
                            >
                              <Car className="w-5 h-5 text-gold" />
                              <span className="text-xs uppercase tracking-wider">Luxury SUV Transport</span>
                            </button>
                          </div>
                        </div>

                        {/* Input Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-quartz-light mb-1.5">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-quartz-light" />
                              <input
                                required
                                type="text"
                                placeholder="Mr. / Mrs. Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-[#141820] border border-[#1E293B] focus:border-gold rounded-xl text-white text-xs placeholder-quartz-light focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-quartz-light mb-1.5">
                              Contact Phone
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-quartz-light" />
                              <input
                                required
                                type="tel"
                                placeholder="+1 (702) 555-0199"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-[#141820] border border-[#1E293B] focus:border-gold rounded-xl text-white text-xs placeholder-quartz-light focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-quartz-light mb-1.5">
                              Corporate / Personal Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-quartz-light" />
                              <input
                                required
                                type="email"
                                placeholder="youremail@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-[#141820] border border-[#1E293B] focus:border-gold rounded-xl text-white text-xs placeholder-quartz-light focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-quartz-light mb-1.5">
                              Preferred Visit Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-quartz-light" />
                              <input
                                required
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-[#141820] border border-[#1E293B] focus:border-gold rounded-xl text-white text-xs placeholder-quartz-light focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Submit CTA */}
                        <button
                          type="submit"
                          className="w-full py-4 bg-gold hover:bg-[#E8D1A7] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-gold/10 flex items-center justify-center gap-2 mt-4"
                        >
                          <Send className="w-4 h-4" />
                          <span>Request Private Booking</span>
                        </button>
                      </form>
                    ) : (
                      /* Success Confirmation View */
                      <div className="bg-[#0B0D10] border border-emerald-500/40 p-8 rounded-2xl text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h5 className="font-display text-2xl text-white mb-2">Request Successfully Received</h5>
                        <p className="text-xs text-quartz-light max-w-md mx-auto mb-6 leading-relaxed">
                          The Head of Concierge at Rhodes Hills will contact you within 2 hours to confirm details of your private itinerary.
                        </p>
                        <button
                          onClick={() => setBookingSubmitted(false)}
                          className="px-6 py-2.5 bg-[#141820] border border-[#1E293B] hover:border-gold/40 text-gold rounded-xl text-xs uppercase tracking-widest transition-colors"
                        >
                          New Request
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
