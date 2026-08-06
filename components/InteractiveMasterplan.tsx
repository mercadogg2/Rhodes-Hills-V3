"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Sun, Moon, Sunset, Compass, MapPin, CheckCircle, Info, Navigation, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import masterplanImg from '@/src/assets/images/rhodes_hills_masterplan_aerial_1786038552822.jpg';

type LotStatus = 'available' | 'reserved' | 'sold';

interface Lot {
  id: string;
  lotNumber: number;
  name: string;
  status: LotStatus;
  acres: number;
  maxBuildSqft: number;
  elevationFeet: number;
  viewCorridor: string;
  solarOrientation: string;
  builder: string;
  priceEstimated: string;
  coordinates: string;
  droneImages: {
    day: string;
    sunset: string;
    night: string;
  };
}

const LOTS: Lot[] = [
  {
    id: "lot-1",
    lotNumber: 1,
    name: "The Summit Estate",
    status: "available",
    acres: 2.5,
    maxBuildSqft: 12000,
    elevationFeet: 3450,
    viewCorridor: "Unobstructed Strip & Red Rock",
    solarOrientation: "Southwest",
    builder: "Blue Heron",
    priceEstimated: "$5M - $8M",
    coordinates: "400,200 550,220 530,320 370,290",
    droneImages: {
      day: "https://picsum.photos/seed/day1/1920/1080",
      sunset: "https://picsum.photos/seed/sunset1/1920/1080",
      night: "https://picsum.photos/seed/night1/1920/1080"
    }
  },
  {
    id: "lot-2",
    lotNumber: 2,
    name: "Canyon Ridge",
    status: "reserved",
    acres: 1.8,
    maxBuildSqft: 9500,
    elevationFeet: 3200,
    viewCorridor: "Valley & Mountains",
    solarOrientation: "South",
    builder: "Christopher Homes",
    priceEstimated: "$3M - $5M",
    coordinates: "580,230 730,280 700,390 540,340",
    droneImages: {
      day: "https://picsum.photos/seed/day2/1920/1080",
      sunset: "https://picsum.photos/seed/sunset2/1920/1080",
      night: "https://picsum.photos/seed/night2/1920/1080"
    }
  },
  {
    id: "lot-3",
    lotNumber: 3,
    name: "Desert Oasis",
    status: "sold",
    acres: 3.1,
    maxBuildSqft: 15000,
    elevationFeet: 3100,
    viewCorridor: "Panoramic City",
    solarOrientation: "Southeast",
    builder: "Toll Brothers",
    priceEstimated: "$8M+",
    coordinates: "200,320 340,310 320,430 150,400",
    droneImages: {
      day: "https://picsum.photos/seed/day3/1920/1080",
      sunset: "https://picsum.photos/seed/sunset3/1920/1080",
      night: "https://picsum.photos/seed/night3/1920/1080"
    }
  },
  {
    id: "lot-4",
    lotNumber: 4,
    name: "Skyline Terrace",
    status: "available",
    acres: 2.1,
    maxBuildSqft: 10500,
    elevationFeet: 3350,
    viewCorridor: "Downtown & Mountains",
    solarOrientation: "West",
    builder: "Blue Heron",
    priceEstimated: "$4M - $6M",
    coordinates: "350,340 510,360 480,480 300,450",
    droneImages: {
      day: "https://picsum.photos/seed/day4/1920/1080",
      sunset: "https://picsum.photos/seed/sunset4/1920/1080",
      night: "https://picsum.photos/seed/night4/1920/1080"
    }
  }
];

export function InteractiveMasterplan() {
  const [filter, setFilter] = useState<'All' | LotStatus>('All');
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [droneViewOpen, setDroneViewOpen] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');

  const filteredLots = LOTS.filter(lot => filter === 'All' || lot.status === filter);

  const getStatusColor = (status: LotStatus, isHovered: boolean, isSelected: boolean) => {
    const opacity = isSelected ? 0.6 : isHovered ? 0.4 : 0.2;
    switch (status) {
      case 'available':
        return { fill: `rgba(167, 192, 161, ${opacity})`, stroke: 'rgb(167, 192, 161)' }; // Elegant Sage Green
      case 'reserved':
        return { fill: `rgba(197, 160, 89, ${opacity})`, stroke: 'rgb(197, 160, 89)' }; // Champagne Gold
      case 'sold':
        return { fill: `rgba(75, 85, 99, ${opacity})`, stroke: 'rgb(75, 85, 99)' }; // Slate Gray
      default:
        return { fill: `rgba(255, 255, 255, ${opacity})`, stroke: 'white' };
    }
  };

  return (
    <section id="masterplan" className="relative w-full min-h-screen bg-[#0B0D10] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-b from-[#0B0D10]/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto mb-6 md:mb-0">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-2">Interactive Masterplan</h2>
          <p className="text-quartz-light text-sm tracking-widest uppercase">Select a lot to explore</p>
        </div>
        
        <div className="pointer-events-auto flex flex-wrap gap-2">
          {['All', 'available', 'reserved', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                filter === status 
                  ? 'bg-gold border-gold text-black' 
                  : 'bg-transparent border-slate/50 text-quartz-light hover:border-gold hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="flex-1 relative w-full h-full min-h-[70vh] cursor-grab active:cursor-grabbing">
        {/* Background Image */}
        <Image 
          src={masterplanImg} 
          fill 
          alt="Rhodes Hills Masterplan Aerial Site Map" 
          className="object-cover opacity-75 filter contrast-110 brightness-90"
          priority
          referrerPolicy="no-referrer"
        />
        
        {/* SVG Overlay */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 1000 800" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid slice">
            {filteredLots.map(lot => {
              const isSelected = selectedLot?.id === lot.id;
              const statusColors = getStatusColor(lot.status, false, isSelected);
              
              return (
                <motion.polygon
                  key={lot.id}
                  points={lot.coordinates}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ 
                    fill: getStatusColor(lot.status, true, isSelected).fill,
                    transition: { duration: 0.2 } 
                  }}
                  fill={statusColors.fill}
                  stroke={statusColors.stroke}
                  strokeWidth={isSelected ? 4 : 2}
                  className="cursor-pointer transition-colors duration-300"
                  onClick={() => setSelectedLot(lot)}
                />
              );
            })}
            
            {/* Lot Labels / Pins (Optional) */}
            {filteredLots.map(lot => {
              // Extremely rough center calculation for labels based on first point
              const pts = lot.coordinates.split(' ')[0].split(',');
              const cx = parseInt(pts[0]) + 30;
              const cy = parseInt(pts[1]) + 30;
              
              return (
                <g key={`label-${lot.id}`} className="pointer-events-none" transform={`translate(${cx}, ${cy})`}>
                  <circle r="12" fill="#0B0D10" stroke={getStatusColor(lot.status, false, false).stroke} strokeWidth="2" />
                  <text x="0" y="4" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold" fontFamily="sans-serif">{lot.lotNumber}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Details Panel (Sidebar / Bottom Sheet) */}
      <AnimatePresence>
        {selectedLot && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-30 w-full md:w-[350px] bg-[#141820]/95 backdrop-blur-xl border-l border-[#1E293B] flex flex-col pt-16 md:pt-6 mt-[auto] md:mt-0 max-h-[70vh] md:max-h-full h-auto md:h-full top-auto md:top-0 bottom-0 md:bottom-auto rounded-t-2xl md:rounded-none shadow-2xl"
          >
            {/* Mobile Drag Handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3 md:hidden" />
            
            <button 
              onClick={() => setSelectedLot(null)}
              className="absolute top-4 right-4 p-1.5 text-quartz-light hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 overflow-y-auto px-5 pb-5 custom-scrollbar">
              <div className="uppercase text-[10px] tracking-[0.2em] text-gold mb-1 flex items-center font-medium">
                <MapPin className="w-3 h-3 mr-1.5" /> Lot {selectedLot.lotNumber}
              </div>
              <h3 className="font-display text-2xl mb-1.5">{selectedLot.name}</h3>
              
              <div className="inline-block px-2.5 py-0.5 mb-5 rounded-full border border-white/10 text-[11px] uppercase tracking-wider bg-white/5">
                {selectedLot.status === 'available' ? '🟢 Available' : selectedLot.status === 'reserved' ? '🟡 Reserved' : '🔴 Sold'}
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-5 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-0.5">Acreage</div>
                  <div className="text-base font-light">{selectedLot.acres} Acres</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-0.5">Max Build Area</div>
                  <div className="text-base font-light">{selectedLot.maxBuildSqft.toLocaleString()} Sq Ft</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-0.5">Elevation</div>
                  <div className="text-base font-light">{selectedLot.elevationFeet.toLocaleString()} Ft</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-0.5">Solar Orientation</div>
                  <div className="text-base font-light">{selectedLot.solarOrientation}</div>
                </div>
              </div>
              
              <div className="border-t border-[#1E293B] pt-4 mb-4">
                <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-1">View Corridor</div>
                <p className="text-xs font-light text-white/90 leading-relaxed">{selectedLot.viewCorridor}</p>
              </div>
              
              <div className="border-t border-[#1E293B] pt-4 mb-5">
                <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-1">Approved Builder</div>
                <p className="text-xs font-light text-white/90">{selectedLot.builder}</p>
              </div>
              
              <button 
                onClick={() => setDroneViewOpen(true)}
                className="w-full flex items-center justify-between p-3 bg-[#0B0D10] border border-[#1E293B] hover:border-gold/50 transition-colors group rounded-sm"
              >
                <div className="flex items-center">
                  <Camera className="w-4 h-4 text-gold mr-2.5" />
                  <span className="text-xs tracking-widest uppercase font-medium">360° Drone View</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-quartz-light group-hover:text-gold transition-colors" />
              </button>
            </div>
            
            <div className="p-4 bg-[#0B0D10] border-t border-[#1E293B]">
              <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-1">Estimated Starting Price</div>
              <div className="text-xl font-light mb-3">{selectedLot.priceEstimated}</div>
              <button 
                disabled={selectedLot.status === 'sold'}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('open-vip-modal'));
                  }
                }}
                className={`w-full py-3 text-xs tracking-widest uppercase font-medium transition-colors rounded-sm ${
                  selectedLot.status === 'sold' 
                    ? 'bg-slate text-quartz cursor-not-allowed'
                    : 'bg-gold text-black hover:bg-[#E8D1A7]'
                }`}
              >
                {selectedLot.status === 'sold' ? 'Unavailable' : 'Request Reservation'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 360 Drone Viewfinder Modal */}
      <AnimatePresence>
        {droneViewOpen && selectedLot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0D10] flex flex-col"
          >
            {/* Drone Image Background */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeOfDay}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={selectedLot.droneImages[timeOfDay]} 
                    fill 
                    alt={`View from ${selectedLot.name} at ${timeOfDay}`} 
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>
            
            {/* HUD Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              
              {/* HUD Header */}
              <div className="flex justify-between items-start p-6 md:p-10">
                <div className="font-mono text-xs text-white/70 tracking-widest">
                  <div className="mb-1 text-gold flex items-center"><Navigation className="w-3 h-3 mr-2 inline" /> LIVE TELEMETRY</div>
                  <div>ALT: {selectedLot.elevationFeet} FT MSL</div>
                  <div>COORD: 36.1699° N, 115.1398° W</div>
                  <div>ZOOM: 1.0x OPTICAL</div>
                </div>
                
                <button 
                  onClick={() => setDroneViewOpen(false)}
                  className="pointer-events-auto p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* HUD Center Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[0.5px] border-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <div className="absolute top-0 w-[1px] h-4 bg-gold" />
                <div className="absolute bottom-0 w-[1px] h-4 bg-gold" />
                <div className="absolute left-0 h-[1px] w-4 bg-gold" />
                <div className="absolute right-0 h-[1px] w-4 bg-gold" />
              </div>
              
              {/* HUD Footer & Controls */}
              <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-end md:items-center">
                <div className="mb-6 md:mb-0">
                  <h3 className="font-display text-4xl text-white drop-shadow-lg">{selectedLot.name}</h3>
                  <p className="font-mono text-xs tracking-widest text-gold mt-2 uppercase">Altitude Viewfinder</p>
                </div>
                
                {/* Time of Day Controls */}
                <div className="pointer-events-auto flex p-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                  <button 
                    onClick={() => setTimeOfDay('day')}
                    className={`flex items-center px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-colors ${timeOfDay === 'day' ? 'bg-white text-black' : 'text-white hover:text-gold'}`}
                  >
                    <Sun className="w-4 h-4 mr-2" /> Day
                  </button>
                  <button 
                    onClick={() => setTimeOfDay('sunset')}
                    className={`flex items-center px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-colors ${timeOfDay === 'sunset' ? 'bg-gold text-black' : 'text-white hover:text-gold'}`}
                  >
                    <Sunset className="w-4 h-4 mr-2" /> Sunset
                  </button>
                  <button 
                    onClick={() => setTimeOfDay('night')}
                    className={`flex items-center px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-colors ${timeOfDay === 'night' ? 'bg-navy text-white' : 'text-white hover:text-gold'}`}
                  >
                    <Moon className="w-4 h-4 mr-2" /> Night
                  </button>
                </div>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html:`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #C5A059;
        }
      `}} />
    </section>
  );
}
