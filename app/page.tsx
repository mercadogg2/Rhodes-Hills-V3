"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { FadeIn } from '@/components/FadeIn';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { InteractiveMasterplan } from '@/components/InteractiveMasterplan';
import { InteractiveLocationMap } from '@/components/InteractiveLocationMap';
import { VIPConcierge } from '@/components/VIPConcierge';
import curatedImg from '@/src/assets/images/curated_connections_lounge_1786038228918.jpg';
import ruggedImg from '@/src/assets/images/rugged_elegance_desert_villa_1786038393382.jpg';
import reservationBg from '@/src/assets/images/reservation_callout_bg_1786040497480.jpg';
import aerialImg from '@/src/assets/images/rhodes_hills_masterplan_aerial_1786038552822.jpg';

export default function Home() {
  const [builderImgSrc, setBuilderImgSrc] = useState<string | typeof aerialImg>("https://i.postimg.cc/mD1v0XhS/Whats-App-Image-2026-08-06-at-16-29-10.jpg");
  return (
    <main className="min-h-screen bg-obsidian text-navy">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-start justify-start overflow-hidden pt-32 md:pt-40 px-6 md:px-16 lg:px-24">
        <Image 
          src="https://i.postimg.cc/Bbs1FDGH/Whats-App-Image-2026-08-06-at-14-12-15.jpg" 
          fill 
          alt="Rhodes Hills Masterplan" 
          className="object-cover opacity-90"
          priority
          unoptimized
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />
        
        <div className="relative z-10 max-w-5xl text-left" style={{ marginLeft: '15px', paddingTop: '25px' }}>
          <FadeIn>
            <h1 
              className="font-display text-white mb-6 tracking-tight text-left"
              style={{ fontSize: '47px', lineHeight: '49.6px', paddingTop: '25px', marginLeft: '5px' }}
            >
              An Exclusive Community,<br/>
              <span className="text-gold italic">Rising Above Las Vegas.</span>
            </h1>
          </FadeIn>
          
          
          <FadeIn delay={0.4}>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('open-vip-modal'));
                }
              }}
              className="px-10 py-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 tracking-[0.2em] uppercase text-sm font-medium cursor-pointer"
            >
              Reservation
            </button>
          </FadeIn>
        </div>
      </section>

      {/* THE VISION OF RHODES HILLS */}
      <section className="py-32 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 text-black">The Vision of Rhodes Hills</h2>
          <p className="font-sans text-quartz text-xl md:text-2xl leading-relaxed mb-12 font-light">
            Every exclusive Community begins as a singular idea, held long before the land is ready to receive it. Rhodes Hills is that idea, twenty years in the shaping — a master-planned Community built in partnership with Southern Nevada&apos;s most respected names in homebuilding.
          </p>
          <a href="#" className="inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium">
            Explore Our Vision <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </FadeIn>
      </section>

      {/* RUGGED ELEGANCE */}
      <section id="experience" className="py-24 lg:py-32 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn direction="right">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 text-black font-normal">Rugged Elegance</h2>
            <p className="font-sans text-quartz text-lg leading-relaxed mb-8 font-light">
              A winding road above the Las Vegas skyline leads somewhere few will ever stand. More than twenty years in the making, Rhodes Hills is architecture in conversation with the land — timeless design, considered amenities, and a raw desert beauty that was never meant to be tamed, only honored.
            </p>
            <a href="#" className="inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </FadeIn>
        </div>
        <div className="relative h-[500px] lg:h-[700px] w-full">
          <FadeIn direction="left" className="h-full w-full relative">
            <Image 
              src={ruggedImg} 
              fill 
              alt="Rugged Elegance - Desert Villa Architecture" 
              className="object-cover rounded-sm" 
            />
          </FadeIn>
        </div>
      </section>

      {/* CURATED CONNECTIONS */}
      <section className="py-24 lg:py-32 bg-slate px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] lg:h-[700px] w-full order-2 lg:order-1">
            <FadeIn direction="right" className="h-full w-full relative">
              <Image 
                src={curatedImg} 
                fill 
                alt="Curated Connections - Exclusive Supper Club & Lounge" 
                className="object-cover rounded-sm opacity-90" 
              />
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2">
            <FadeIn direction="left">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 text-black">Curated Connections</h2>
              <p className="font-sans text-quartz text-lg leading-relaxed mb-8 font-light">
                Exclusivity here is not a gate — it&apos;s a way of life. A gourmet grocer. An exclusive supper club, alive with music as the sun sets over the valley. Wellness and gathering, woven into the everyday, for the few who call this Community home.
              </p>
              <a href="#" className="inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium">
                Discover the Experiences <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BEHIND RHODES HILLS */}
      <section id="the-builders" className="py-24 lg:py-32 bg-slate border-t border-black/5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <FadeIn direction="right">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-black">Behind Rhodes Hills</h2>
                <h3 className="font-sans text-xl md:text-2xl text-gold mb-8 font-light italic">A Legacy Building the Valley.</h3>
                <div className="relative w-full h-[300px] md:h-[420px] rounded-sm overflow-hidden mt-6 shadow-sm">
                  <Image 
                    src={builderImgSrc} 
                    fill 
                    alt="Behind Rhodes Hills - A Legacy Building the Valley" 
                    className="object-cover"
                    unoptimized
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setBuilderImgSrc(aerialImg);
                    }}
                  />
                </div>
              </FadeIn>
            </div>
            <div className="space-y-8 text-quartz text-lg leading-relaxed font-light">
              <FadeIn direction="left">
                <p>
                  For 40+ years, the team behind Rhodes Hills has been at the helm of residential development in Southern Nevada — shaping neighborhoods, communities, and skylines long before Rhodes Hills was ever a plan on paper. Thousands of homes planned, built, and sold across the region stand as a track record few can claim.
                </p>
                <p className="mt-6">
                  Rhodes Hills is the culmination of that legacy: four decades of land expertise, homebuilding experience, and an unmatched understanding of what makes a Community endure — brought to bear on 2,000 acres shaped by twenty years of vision. Discover what four decades of building the Valley makes possible.
                </p>
                <div className="pt-8">
                  <a href="#" className="inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium">
                    Meet the Team <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Stat Bar - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5 pt-16">
            <FadeIn delay={0.1}>
              <div className="text-center md:text-left">
                <div className="font-display text-6xl lg:text-7xl text-gold mb-4">
                  <AnimatedCounter end={40} suffix="+" />
                </div>
                <div className="font-sans text-quartz uppercase tracking-widest text-sm max-w-[200px] md:mx-0 mx-auto">Years Building the Valley</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center md:text-left">
                <div className="font-display text-6xl lg:text-7xl text-gold mb-4">
                  <AnimatedCounter end={11000} suffix="+" />
                </div>
                <div className="font-sans text-quartz uppercase tracking-widest text-sm max-w-[280px] md:mx-0 mx-auto">Homes Planned, Built & Sold Across 173 Communities</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center md:text-left">
                <div className="font-display text-6xl lg:text-7xl text-gold mb-4">
                  <AnimatedCounter end={45000} suffix="+" />
                </div>
                <div className="font-sans text-quartz uppercase tracking-widest text-sm max-w-[280px] md:mx-0 mx-auto">Additional Homes Delivered as Subcontractor</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MASTERPLAN */}
      <InteractiveMasterplan />

      {/* INTERACTIVE LOCATION MAP */}
      <InteractiveLocationMap />

      {/* IN THE NEWS */}
      <section id="news" className="py-24 lg:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex justify-between items-end mb-16">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-black">In The News</h2>
              <a href="#" className="hidden md:inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Exclusive: First Look at The Canyon at Ascaya",
                source: "Robb Report",
                image: "https://picsum.photos/seed/news1/600/400"
              },
              {
                title: "At 9,000 Sq Ft, The Future of Luxury Living in Las Vegas",
                source: "Wall Street Journal",
                image: "https://picsum.photos/seed/news2/600/400"
              },
              {
                title: "Rhodes Hills Announces New Ultra-Luxury Masterplan",
                source: "Architectural Digest",
                image: "https://picsum.photos/seed/news3/600/400"
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="group cursor-pointer">
                <div className="relative h-64 md:h-80 w-full mb-6 overflow-hidden">
                  <Image 
                    src={item.image}
                    fill
                    alt={item.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="text-quartz-light text-xs uppercase tracking-widest mb-3 font-sans">
                  {item.source}
                </div>
                <h3 className="font-display text-2xl text-navy group-hover:text-gold transition-colors leading-snug">
                  {item.title}
                </h3>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn className="mt-12 md:hidden">
            <a href="#" className="inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* RESERVATION CALLOUT */}
      <section className="relative py-32 md:py-48 px-4 md:px-8 flex items-center justify-center overflow-hidden">
        <Image 
          src={reservationBg} 
          fill 
          alt="Land Is Not Made - Rhodes Hills Sunset View" 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-[#0B0D10]/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <FadeIn>
            <h2 className="font-display text-5xl md:text-7xl mb-8">Land Is Not Made.<br/><span className="text-gold italic">It Is Found.</span></h2>
            <p className="font-sans text-[#fbfbfb] text-lg md:text-xl leading-relaxed mb-12 font-light max-w-3xl mx-auto">
              Two thousand acres. A limited number of build lots. One exclusive Community, rising above Las Vegas once. Rhodes Hills is now accepting reservations — an opportunity to stand at the beginning of something built to outlast the moment it was built in.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('open-vip-modal'));
                }
              }}
              className="inline-flex items-center justify-center px-10 py-5 bg-gold text-white hover:bg-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium cursor-pointer"
            >
              Reserve Your Lot <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-navy text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="font-display text-3xl md:text-4xl mb-4">Want the latest news and updates?</h3>
            <p className="font-sans text-quartz-light mb-8 text-lg font-light">Get in touch with us today.</p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('open-vip-modal'));
                }
              }}
              className="inline-flex items-center text-gold hover:text-gold-hover transition-colors uppercase tracking-[0.2em] text-sm font-medium cursor-pointer"
            >
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col md:items-end space-y-6">
            <div className="font-display text-2xl tracking-widest uppercase mb-4 text-left md:text-right">
              RH Rhodes Hills 
              <span className="block text-sm text-quartz-light tracking-[0.2em] mt-2">Las Vegas</span>
            </div>
            <nav className="flex flex-wrap gap-8 text-quartz-light text-sm uppercase tracking-[0.2em] md:justify-end">
              <a href="#the-builders" className="hover:text-white transition-colors">The Builders</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#location" className="hover:text-white transition-colors">Location</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
            <div className="text-quartz-light text-xs pt-8 tracking-wider">
              &copy; {new Date().getFullYear()} Rhodes Hills. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <VIPConcierge />
    </main>
  );
}
