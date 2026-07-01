/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import Services from './components/Services';
import Process from './components/Process';
import WorkShowcase from './components/WorkShowcase';
import ContentFlywheel from './components/ContentFlywheel';
import WorldClassEdits from './components/WorldClassEdits';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import AboutTeam from './components/AboutTeam';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-body selection:bg-brand selection:text-white relative overflow-hidden flex flex-col">
        {/* Ambient Background Effects */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand opacity-[0.08] blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-brand-accent opacity-[0.05] blur-[100px] rounded-full pointer-events-none z-0"></div>
        <div className="noise-bg z-0" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1">
            <div className="relative w-full">
              {/* Continuous Grid Pattern for Hero -> Services */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
                 {/* Parallax Grid Pattern (simulated without motion for simplicity, or we could add it back) */}
                <div className="absolute inset-0 h-full w-full">
                  <div
                    className="absolute inset-0 opacity-60 mix-blend-multiply"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'42\' height=\'42\' viewBox=\'0 0 42 42\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M.5 42V.5H42\' fill=\'none\' stroke=\'rgba(0,0,0,0.04)\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'repeat',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                    }}
                  />
                </div>
              </div>

              <Hero />
              <TrustMarquee />
              <Services />
            </div>
            <WorkShowcase />
            <Process />
            <ContentFlywheel />
            <WorldClassEdits />
            <Testimonials />
            <AboutTeam />
            <FAQ />
          </main>

          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
