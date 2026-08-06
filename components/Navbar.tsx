"use client";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-slate py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`font-display text-xl md:text-2xl tracking-widest uppercase leading-none transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}>RH Rhodes Hills</span>
            <span className="font-sans text-[10px] md:text-xs text-gold tracking-widest uppercase mt-1">Las Vegas</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Masterplan', 'The Builders', 'Experience', 'Location', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-xs font-sans tracking-[0.2em] uppercase transition-colors ${scrolled ? 'text-navy hover:text-gold' : 'text-white hover:text-gold'}`}>
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('open-vip-modal'));
                }
              }}
              className="px-5 py-2.5 border border-gold text-gold hover:bg-gold hover:text-white text-xs uppercase tracking-[0.2em] transition-all font-medium rounded-sm"
            >
              Reservation
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button className={`md:hidden transition-colors ${scrolled ? 'text-navy' : 'text-white'}`} onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-obsidian flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-navy p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              {['The Builders', 'Experience', 'Location', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display tracking-widest uppercase text-navy hover:text-gold transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
