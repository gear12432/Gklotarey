import React, { useState } from 'react';
import { Sparkles, Trophy, X, RotateCw } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

interface LuckySpinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LuckySpinModal: React.FC<LuckySpinModalProps> = ({ isOpen, onClose }) => {
  const { claimLuckySpin } = useDemo();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  if (!isOpen) return null;

  const prizes = [
    { label: '₹20 Cash', amount: 20 },
    { label: '₹50 Cash', amount: 50 },
    { label: '₹100 Cash', amount: 100 },
    { label: '₹200 Cash', amount: 200 },
    { label: '₹500 Cash', amount: 500 },
    { label: '₹1000 Mega', amount: 1000 },
  ];

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const winningPrize = prizes[randomIndex];

    // Extra full turns plus landing slice offset
    const extraTurns = 1800; // 5 full 360 degree spins
    const sliceAngle = 360 / prizes.length;
    const targetAngle = extraTurns + (prizes.length - randomIndex) * sliceAngle;

    setRotationDegree(targetAngle);

    setTimeout(async () => {
      await claimLuckySpin(winningPrize.amount, winningPrize.label);
      setIsSpinning(false);
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-[#FFC928] relative overflow-hidden text-center space-y-4">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-black p-1 rounded-full bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#00452D] text-[#FFC928] font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            LUCKY SPIN WHEEL
          </div>
          <h3 className="font-heading font-black text-xl text-[#132238]">Spin & Win Jackpot</h3>
          <p className="text-xs text-[#64748B]">Spin the wheel to win guaranteed wallet bonus cash!</p>
        </div>

        {/* Wheel Container */}
        <div className="relative w-56 h-56 mx-auto my-2 flex items-center justify-center">
          
          {/* Wheel Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#00452D] drop-shadow-md" />

          {/* Rotating Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-[#FFC928] shadow-xl overflow-hidden relative transition-transform duration-[3000ms] ease-out"
            style={{ transform: `rotate(${rotationDegree}deg)` }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#00452D] via-[#FFC928] to-[#13B968] flex items-center justify-center relative">
              <div className="w-20 h-20 rounded-full bg-white font-black text-xs text-[#00452D] flex items-center justify-center shadow-inner z-10 border-2 border-[#FFC928]">
                SPIN
              </div>
            </div>
          </div>
        </div>

        {/* Action Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full bg-gradient-to-r from-[#FFC928] via-[#F59E0B] to-[#FFC928] text-[#00452D] font-black py-3.5 px-6 rounded-2xl shadow-md transition-transform active:scale-95 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSpinning ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Spinning Wheel...</span>
            </>
          ) : (
            <>
              <Trophy className="w-4 h-4 fill-current" />
              <span>SPIN NOW (FREE)</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
