"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Car, 
  Navigation, 
  Compass, 
  Sun, 
  Moon, 
  CheckCircle2, 
  TreePine, 
  Plane, 
  Utensils, 
  Trophy, 
  Sparkles,
  ChevronRight,
  Mountain,
  X
} from 'lucide-react';
import Image from 'next/image';

export interface POI {
  id: string;
  name: string;
  category: 'nature' | 'transit' | 'dining' | 'golf' | 'lifestyle';
  coords: { x: number; y: number }; // Percentage position on map canvas
  driveTime: string;
  distanceMiles: string;
  elevation: string;
  description: string;
  image: string;
  highlight: string;
  isCentral?: boolean;
}

const POIS: POI[] = [
  {
    id: "rhodes-hills",
    name: "Rhodes Hills (Site)",
    category: "lifestyle",
    coords: { x: 42, y: 38 },
    driveTime: "0 min",
    distanceMiles: "0 mi",
    elevation: "3,450 FT",
    description: "The peak of luxury mountain living. A master-planned sanctuary rising high above Red Rock Canyon.",
    image: "https://picsum.photos/seed/rhodes-center/800/600",
    highlight: "Gated Masterplan Community Site with Private Helipad access.",
    isCentral: true,
  },
  {
    id: "red-rock-canyon",
    name: "Red Rock Canyon National Park",
    category: "nature",
    coords: { x: 20, y: 28 },
    driveTime: "5 mins",
    distanceMiles: "2.4 mi",
    elevation: "3,800 FT",
    description: "Stunning red sandstone peaks, 13-mile scenic drives, world-class rock climbing, and pristine hiking trails.",
    image: "https://picsum.photos/seed/red-rock/800/600",
    highlight: "Direct private trail access connect from Rhodes Hills.",
  },
  {
    id: "summit-club",
    name: "The Summit Club Golf Course",
    category: "golf",
    coords: { x: 55, y: 58 },
    driveTime: "8 mins",
    distanceMiles: "4.1 mi",
    elevation: "2,900 FT",
    description: "Tom Fazio-designed 18-hole championship golf course offering exclusive ultra-private memberships.",
    image: "https://picsum.photos/seed/summit-golf/800/600",
    highlight: "Ranked top 10 private golf sanctuaries in North America.",
  },
  {
    id: "downtown-summerlin",
    name: "Downtown Summerlin & Dining",
    category: "dining",
    coords: { x: 68, y: 32 },
    driveTime: "10 mins",
    distanceMiles: "5.8 mi",
    elevation: "2,700 FT",
    description: "Premier outdoor shopping, Michelin-starred culinary concepts, luxury boutiques, and vibrant nightlife.",
    image: "https://picsum.photos/seed/summerlin-dining/800/600",
    highlight: "Curated concierge priority reservation access for residents.",
  },
  {
    id: "las-vegas-strip",
    name: "The Las Vegas Strip & Resort Corridor",
    category: "dining",
    coords: { x: 82, y: 65 },
    driveTime: "18 mins",
    distanceMiles: "12.5 mi",
    elevation: "2,000 FT",
    description: "World-renowned entertainment, ultra-luxury resort casinos, fine dining, and cultural performances.",
    image: "https://picsum.photos/seed/vegas-strip/800/600",
    highlight: "Unobstructed night skyline views straight from Rhodes Hills hilltop.",
  },
  {
    id: "harry-reid-airport",
    name: "Private Jet Terminal & International Airport",
    category: "transit",
    coords: { x: 78, y: 82 },
    driveTime: "20 mins",
    distanceMiles: "16.2 mi",
    elevation: "2,181 FT",
    description: "Signature Aviation and Atlantic FBO Terminals for seamless private jet arrivals and VIP transport.",
    image: "https://picsum.photos/seed/private-jet/800/600",
    highlight: "24/7 Private helicopter shuttle charter available on demand.",
  },
  {
    id: "bear-best-golf",
    name: "Bear's Best Las Vegas",
    category: "golf",
    coords: { x: 35, y: 70 },
    driveTime: "7 mins",
    distanceMiles: "3.5 mi",
    elevation: "3,100 FT",
    description: "Jack Nicklaus-designed golf course featuring 18 hand-selected favorite holes from his international design portfolio.",
    image: "https://picsum.photos/seed/bears-best/800/600",
    highlight: "Special preferred tee-time privileges for Rhodes Hills owners.",
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Locations', icon: MapPin },
  { id: 'nature', label: 'Nature & Parks', icon: TreePine },
  { id: 'golf', label: 'Golf & Clubs', icon: Trophy },
  { id: 'dining', label: 'Dining & Lifestyle', icon: Utensils },
  { id: 'transit', label: 'Aviation & Transit', icon: Plane },
];

export function InteractiveLocationMap() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(POIS[0]);
  const [mapMode, setMapMode] = useState<'topo' | 'night'>('night');
  const [hoveredPoi, setHoveredPoi] = useState<POI | null>(null);

  const filteredPois = POIS.filter(poi => 
    activeCategory === 'all' || poi.category === activeCategory || poi.isCentral
  );

  const centralPoi = POIS.find(p => p.isCentral) || POIS[0];

  return (
    <section id="location" className="w-full min-h-screen bg-[#0B0D10] text-white py-20 px-4 md:px-8 font-sans overflow-hidden border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] mb-2 font-medium">
              <Compass className="w-4 h-4" /> Strategic Elevation & Proximity
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
              An Elevated Location
            </h2>
          </div>

          {/* Map Mode Switcher & Category Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-1 bg-[#141820] border border-[#1E293B] rounded-full">
              <button
                onClick={() => setMapMode('topo')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                  mapMode === 'topo' ? 'bg-gold text-black font-semibold' : 'text-quartz-light hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Topo
              </button>
              <button
                onClick={() => setMapMode('night')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                  mapMode === 'night' ? 'bg-[#0A192F] text-gold border border-gold/40 font-semibold' : 'text-quartz-light hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Night
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 custom-scrollbar scrollbar-none">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-gold text-black border-gold font-medium shadow-lg shadow-gold/10'
                    : 'bg-[#141820]/80 text-quartz-light border-[#1E293B] hover:border-gold/50 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid Layout (8 cols map canvas + 4 cols inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Canvas (8 Columns) */}
          <div className="lg:col-span-8 relative w-full h-[550px] md:h-[650px] rounded-2xl overflow-hidden bg-[#141820] border border-[#1E293B] shadow-2xl group">
            
            {/* Topographic vs Night Background Layers */}
            <div className="absolute inset-0 z-0 transition-opacity duration-1000">
              <Image
                src={
                  mapMode === 'topo'
                    ? "https://images.unsplash.com/photo-1581351123004-757df051db8e?q=80&w=2000&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2000&auto=format&fit=crop"
                }
                fill
                alt="Interactive Location Map - Las Vegas Aerial View"
                className={`object-cover transition-all duration-700 ${
                  mapMode === 'topo' ? 'opacity-85 filter contrast-110 brightness-90' : 'opacity-75 filter contrast-125 brightness-80'
                }`}
                priority
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 ${mapMode === 'night' ? 'bg-gradient-to-t from-[#0B0D10] via-transparent to-[#0B0D10]/80' : 'bg-black/20'}`} />
            </div>

            {/* Simulated Topographic SVG Lines & Vector Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E8D1A7" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Topographic Contour Ring Overlay */}
              <circle cx={`${centralPoi.coords.x}%`} cy={`${centralPoi.coords.y}%`} r="120" fill="none" stroke="#C5A059" strokeWidth="0.7" strokeDasharray="4,6" opacity="0.3" />
              <circle cx={`${centralPoi.coords.x}%`} cy={`${centralPoi.coords.y}%`} r="220" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="3,8" opacity="0.2" />

              {/* Animated Dashed Connecting Lines from Central Site to Active POIs */}
              {filteredPois.map(poi => {
                if (poi.isCentral) return null;
                const isSelected = selectedPoi?.id === poi.id;
                return (
                  <g key={`line-${poi.id}`}>
                    <line
                      x1={`${centralPoi.coords.x}%`}
                      y1={`${centralPoi.coords.y}%`}
                      x2={`${poi.coords.x}%`}
                      y2={`${poi.coords.y}%`}
                      stroke={isSelected ? "#C5A059" : "#94A3B8"}
                      strokeWidth={isSelected ? "2.5" : "1"}
                      strokeDasharray="6,6"
                      opacity={isSelected ? "0.9" : "0.35"}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>

            {/* POI Markers (Pins) */}
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {filteredPois.map(poi => {
                const isSelected = selectedPoi?.id === poi.id;
                const isHovered = hoveredPoi?.id === poi.id;

                return (
                  <div
                    key={poi.id}
                    style={{ left: `${poi.coords.x}%`, top: `${poi.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                    onClick={() => setSelectedPoi(poi)}
                    onMouseEnter={() => setHoveredPoi(poi)}
                    onMouseLeave={() => setHoveredPoi(null)}
                  >
                    {/* Central Site Unique Glowing Marker */}
                    {poi.isCentral ? (
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-12 h-12 bg-gold/30 rounded-full animate-ping pointer-events-none" />
                        <span className="absolute w-8 h-8 bg-gold/50 rounded-full blur-sm" />
                        <div className="relative w-10 h-10 bg-[#0B0D10] border-2 border-gold rounded-full flex items-center justify-center shadow-2xl text-gold hover:scale-110 transition-transform">
                          <Mountain className="w-5 h-5 fill-gold/20" />
                        </div>
                      </div>
                    ) : (
                      /* Standard POI Marker */
                      <div className="relative flex items-center justify-center">
                        {isSelected && (
                          <span className="absolute w-10 h-10 bg-gold/40 rounded-full animate-pulse" />
                        )}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border shadow-xl ${
                            isSelected
                              ? 'bg-gold text-black border-white scale-125 z-30'
                              : isHovered
                              ? 'bg-white text-black border-gold scale-110 z-20'
                              : 'bg-[#141820]/90 text-gold border-gold/50 hover:border-gold hover:scale-105'
                          }`}
                        >
                          <MapPin className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Floating Tooltip Hover Banner */}
                    <AnimatePresence>
                      {(isHovered || (isSelected && !hoveredPoi)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap bg-[#0B0D10]/95 border border-gold/40 backdrop-blur-md px-3 py-2 rounded-lg shadow-2xl pointer-events-none text-center"
                        >
                          <div className="font-display text-xs text-white font-medium">{poi.name}</div>
                          <div className="font-sans text-[10px] text-gold flex items-center justify-center gap-2 mt-0.5 uppercase tracking-widest">
                            <span>{poi.driveTime} drive</span>
                            <span>•</span>
                            <span>{poi.distanceMiles}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Legend Overlay at Map Bottom */}
            <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-4 bg-[#0B0D10]/80 backdrop-blur-md border border-[#1E293B] px-4 py-2 rounded-xl text-xs text-quartz-light">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gold inline-block" />
                <span className="text-white">Rhodes Hills Site</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border border-gold bg-[#141820] inline-block" />
                <span>Points of Interest</span>
              </div>
            </div>
          </div>

          {/* Inspector Panel / Drawer (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Selected POI Rich Detail Card */}
            <AnimatePresence mode="wait">
              {selectedPoi ? (
                <motion.div
                  key={selectedPoi.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="bg-[#141820] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                >
                  {/* Header Image with Elevation Badge */}
                  <div className="relative h-36 w-full">
                    <Image
                      src={selectedPoi.image}
                      fill
                      alt={selectedPoi.name}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-black/40" />
                    
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[9px] font-mono tracking-widest text-gold uppercase">
                      ELEV: {selectedPoi.elevation}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {selectedPoi.isCentral && (
                        <div className="bg-gold text-black font-semibold px-2.5 py-0.5 rounded-full text-[9px] tracking-widest uppercase shadow-md">
                          Primary Location
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedPoi(null)}
                        title="Close detail view"
                        aria-label="Close location detail"
                        className="p-1 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/80 hover:text-white rounded-full border border-white/20 transition-all shadow-md"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-[10px] uppercase tracking-widest text-gold font-medium mb-0.5">
                      {selectedPoi.category}
                    </div>
                    <h3 className="font-display text-xl text-white mb-3 leading-tight">
                      {selectedPoi.name}
                    </h3>

                    {/* Travel Stats Badges */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-[#0B0D10] border border-[#1E293B] p-2.5 rounded-xl flex items-center gap-2.5">
                        <div className="p-1.5 bg-gold/10 text-gold rounded-lg">
                          <Car className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-widest text-quartz-light">Drive Time</div>
                          <div className="text-xs font-semibold text-white">{selectedPoi.driveTime}</div>
                        </div>
                      </div>

                      <div className="bg-[#0B0D10] border border-[#1E293B] p-2.5 rounded-xl flex items-center gap-2.5">
                        <div className="p-1.5 bg-gold/10 text-gold rounded-lg">
                          <Navigation className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-widest text-quartz-light">Distance</div>
                          <div className="text-xs font-semibold text-white">{selectedPoi.distanceMiles}</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs text-quartz-light leading-relaxed mb-4 font-light">
                      {selectedPoi.description}
                    </p>

                    {/* Privilege / Highlight Box */}
                    <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-2 border-gold p-3 rounded-r-xl">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <div className="text-[11px] text-white/90 leading-relaxed font-light">
                          <span className="font-semibold text-gold block mb-0.5">Exclusive Advantage</span>
                          {selectedPoi.highlight}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="no-selected"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#141820] border border-[#1E293B] rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[220px]"
                >
                  <MapPin className="w-8 h-8 text-gold/60 mb-3 animate-pulse" />
                  <h4 className="font-display text-lg text-white mb-1">Select a Location</h4>
                  <p className="text-xs text-quartz-light mb-4 max-w-xs font-light leading-relaxed">
                    Click any marker on the interactive map or choose a location from the list below to view detailed specs.
                  </p>
                  <button
                    onClick={() => setSelectedPoi(centralPoi)}
                    className="px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold text-xs uppercase tracking-widest rounded-full transition-colors"
                  >
                    View Rhodes Hills Site
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable List of All POIs for quick switching */}
            <div className="bg-[#141820]/80 border border-[#1E293B] rounded-2xl p-4 max-h-[220px] overflow-y-auto custom-scrollbar flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest text-quartz-light mb-2 px-2 font-medium">
                Nearby Destinations ({filteredPois.length})
              </div>
              {filteredPois.map(poi => {
                const isSelected = selectedPoi?.id === poi.id;
                return (
                  <button
                    key={`list-${poi.id}`}
                    onClick={() => setSelectedPoi(poi)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-gold/15 border border-gold/50 text-white'
                        : 'bg-[#0B0D10]/50 hover:bg-[#0B0D10] border border-transparent hover:border-[#1E293B] text-quartz-light hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-gold' : 'bg-quartz-light/40'}`} />
                      <span className="text-xs font-sans truncate">{poi.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gold font-mono shrink-0 ml-2">
                      <span>{poi.driveTime}</span>
                      <ChevronRight className="w-3 h-3 text-quartz-light" />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
