import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Wallet } from 'lucide-react';

export const FloatingDepositButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/add-money')}
      className="fixed bottom-5 right-4 z-40 bg-gradient-to-r from-[#FFC928] via-[#F59E0B] to-[#FFC928] text-[#450A0A] font-black p-3 pr-4 rounded-full shadow-2xl border-2 border-white flex items-center gap-2.5 active:scale-95 transition-transform hover:shadow-yellow-500/30 group animate-bounce duration-1000"
      aria-label="Instant Deposit"
    >
      <div className="w-10 h-10 rounded-full bg-[#450A0A] text-[#FFC928] flex items-center justify-center font-black text-lg shadow-inner group-hover:scale-105 transition-transform">
        💰
      </div>
      <div className="text-left leading-tight">
        <span className="block text-[9px] uppercase tracking-wider text-[#450A0A] font-bold">INSTANT</span>
        <span className="font-heading font-extrabold text-sm tracking-tight">Deposit</span>
      </div>
    </button>
  );
};
