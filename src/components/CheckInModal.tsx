import React from 'react';
import { Calendar, CheckCircle2, Gift, X, Sparkles } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, claimDailyCheckIn } = useDemo();

  if (!isOpen) return null;

  const todayStr = new Date().toDateString();
  const isAlreadyClaimedToday = userProfile?.lastCheckInDate === todayStr;

  const streakDays = userProfile?.checkInStreak || 0;

  const checkInRewards = [
    { day: 1, amount: 20 },
    { day: 2, amount: 30 },
    { day: 3, amount: 50 },
    { day: 4, amount: 80 },
    { day: 5, amount: 100 },
    { day: 6, amount: 150 },
    { day: 7, amount: 300, isBumper: true },
  ];

  const handleClaim = async () => {
    const success = await claimDailyCheckIn();
    if (success) {
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-[#FFC928] relative overflow-hidden space-y-4">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#C02626] to-[#991B1B] text-white p-4 rounded-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/20 p-1 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-6 h-6 text-[#FFC928]" />
            <h3 className="font-heading font-black text-lg text-white">Daily Check-In</h3>
          </div>
          <p className="text-xs text-white/90">Check in daily to earn free wallet cash rewards!</p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-4 gap-2">
          {checkInRewards.map((item) => {
            const isCompleted = streakDays >= item.day;
            return (
              <div
                key={item.day}
                className={`p-2.5 rounded-2xl border text-center relative flex flex-col items-center justify-center ${
                  item.isBumper ? 'col-span-2 bg-gradient-to-r from-[#FFC928] to-[#F59E0B] text-[#450A0A] border-amber-500 font-bold' :
                  isCompleted ? 'bg-[#E8FFF4] border-[#13B968] text-[#006B3C]' : 'bg-[#F4FAF6] border-slate-200 text-[#132238]'
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase">Day {item.day}</span>
                <span className="font-heading font-black text-sm my-0.5">₹{item.amount}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#13B968]" />
                ) : (
                  <Gift className="w-4 h-4 text-[#64748B]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Claim Action Button */}
        <button
          onClick={handleClaim}
          disabled={isAlreadyClaimedToday}
          className={`w-full py-3 px-4 rounded-2xl text-xs font-black shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 ${
            isAlreadyClaimedToday
              ? 'bg-slate-200 text-[#64748B] cursor-not-allowed'
              : 'bg-[#C02626] hover:bg-[#991B1B] text-white'
          }`}
        >
          {isAlreadyClaimedToday ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#13B968]" />
              <span>Checked-In Today (Streak: {streakDays} Days)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#FFC928]" />
              <span>Claim Today's Bonus (₹50)</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
