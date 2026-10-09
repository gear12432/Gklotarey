import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useDemo();

  useEffect(() => {
    // Session check redirect after brief display
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  const handleManualProceed = () => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00452D] via-[#006B3C] to-[#00452D] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden select-none">
      
      {/* Gold decorative background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#FFC928]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#13B968]/20 blur-3xl pointer-events-none" />

      {/* Top Brand Tag */}
      <div className="pt-8 flex items-center gap-2 text-xs font-bold text-[#FFC928] uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current" />
        Official Customer App
      </div>

      {/* Main Hero Content */}
      <div className="text-center max-w-sm mx-auto flex flex-col items-center my-auto">
        
        {/* Polished Lottery Ticket & Ball Emblem Illustration */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#13B968] to-[#FFC928] p-1 shadow-2xl animate-pulse">
            <div className="w-full h-full bg-[#00452D] rounded-[22px] flex items-center justify-center relative overflow-hidden">
              {/* Gold Lottery Balls Visual */}
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#FFC928] text-[#00452D] font-extrabold flex items-center justify-center text-sm shadow-md border-2 border-white">
                77
              </div>
              <div className="absolute -bottom-1 -left-1 w-9 h-9 rounded-full bg-[#13B968] text-white font-extrabold flex items-center justify-center text-xs shadow-md border-2 border-white">
                09
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFC928] to-[#13B968] text-[#00452D] font-black flex items-center justify-center text-xl shadow-inner">
                GVL
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none mb-3">
          GREAT VIEW <span className="text-[#FFC928]">LOTTERY</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-semibold text-[#D7F3E5] tracking-wider uppercase mb-6 flex items-center gap-2">
          <span>Play</span>
          <span className="text-[#FFC928]">●</span>
          <span>Win</span>
          <span className="text-[#FFC928]">●</span>
          <span>Be Lucky</span>
        </p>

        <p className="text-xs text-[#D7F3E5]/80 max-w-xs leading-relaxed mb-8">
          Welcome to Great View Lottery customer experience. Explore live sample draws, tickets, and rewards.
        </p>

        {/* Manual Continue Button */}
        <button
          onClick={handleManualProceed}
          className="w-full bg-[#FFC928] hover:bg-yellow-400 text-[#00452D] font-bold py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-sm"
        >
          <span>Enter Application</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Disclaimer */}
      <div className="pb-4 text-center max-w-xs">
        <p className="text-[10px] text-[#D7F3E5]/70 flex items-center justify-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FFC928]" />
          Frontend Demo Application • No Real Money
        </p>
      </div>

    </div>
  );
};
