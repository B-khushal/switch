import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate, usePathname } from '../../../router/router';

interface BookingLayoutProps {
  currentStepIndex: number;
  totalSteps?: number;
  stepTitle: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextButtonText?: string;
  showFooterControls?: boolean;
}

const stepsList = [
  { path: '/meet/services', name: 'Meeting Type' },
  { path: '/meet/calendar', name: 'Date & Timezone' },
  { path: '/meet/time', name: 'Time Slot' },
  { path: '/meet/details', name: 'Client Info' },
  { path: '/meet/review', name: 'Review' },
  { path: '/meet/success', name: 'Confirmation' },
];

export default function BookingLayout({
  currentStepIndex,
  totalSteps = 5,
  stepTitle,
  children,
  onBack,
  onNext,
  nextButtonText = 'Continue',
  showFooterControls = true,
}: BookingLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-body flex flex-col justify-between selection:bg-brand selection:text-white">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img src="/image.png" alt="Switch Logo" className="h-9 w-auto mix-blend-multiply transition-transform group-hover:scale-105" />
            <span className="text-xs font-bold uppercase tracking-widest text-black/40 border-l border-black/10 pl-3">
              Meeting Scheduler
            </span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold uppercase tracking-wider text-black/60 hover:text-brand transition-colors bg-[#FAFAFA] px-4 py-2 rounded-xl border border-black/5"
          >
            Exit to Home
          </button>
        </div>
      </header>

      {/* Progress Breadcrumbs (Only for active booking steps) */}
      {currentStepIndex < 5 && (
        <div className="bg-white border-b border-black/5 py-3 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-xs font-bold text-black/50 mb-2">
              <span className="uppercase tracking-wider">Step {currentStepIndex + 1} of {totalSteps}: {stepTitle}</span>
              <span className="text-brand">{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Full-Page Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 flex flex-col justify-center">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Fixed Bottom Navigation Bar (For Steps 0-4) */}
      {showFooterControls && currentStepIndex < 5 && (
        <footer className="sticky bottom-0 z-40 bg-white/90 backdrop-blur-md border-t border-black/5 py-4 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={onBack}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                currentStepIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-[#FAFAFA] hover:bg-black/5 text-[#111111] border border-black/10'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button
              onClick={onNext}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#111111] hover:bg-brand text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-black/10 transition-colors duration-300 cursor-pointer"
            >
              <span>{nextButtonText}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
