import React from 'react';
import { Gift, Sparkles, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const RewardsScreen: React.FC = () => {
  const { rewards, claimReward } = useDemo();

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Rewards & Offers" subtitle="Demo promotions & bonus rewards" />

      <main className="max-w-2xl mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Banner Top */}
        <div className="bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC928] text-[#00452D] flex items-center justify-center font-bold">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#FFC928] uppercase tracking-wider">PROMOTIONAL BONUS</p>
              <h2 className="font-heading font-extrabold text-xl text-white">Exclusive Demo Rewards</h2>
            </div>
          </div>
          <p className="text-xs text-[#D7F3E5]">
            Claim simulated bonus funds directly into your Demo Wallet balance.
          </p>
        </div>

        <DemoDisclaimerBanner compact />

        {/* Offers Grid */}
        <div className="space-y-4">
          {rewards.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  {offer.badgeText && (
                    <span className="bg-[#FFC928] text-[#00452D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5">
                      {offer.badgeText}
                    </span>
                  )}
                  <h3 className="font-heading font-extrabold text-base text-[#132238]">{offer.title}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-[#64748B] block font-bold uppercase">Bonus</span>
                  <span className="font-heading font-black text-xl text-[#006B3C]">
                    +₹{offer.bonusAmount}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">{offer.description}</p>

              <div className="bg-[#F4FAF6] p-3 rounded-2xl border border-[#D7F3E5] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#64748B] font-semibold block">Promo Code</span>
                  <span className="font-mono font-bold text-[#006B3C]">{offer.code}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748B] font-semibold block">Expires</span>
                  <span className="font-bold text-[#132238] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#006B3C]" />
                    {offer.expiryDate}
                  </span>
                </div>
              </div>

              <button
                onClick={() => claimReward(offer.id)}
                disabled={offer.claimed}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  offer.claimed
                    ? 'bg-slate-100 text-[#64748B] border border-slate-200 cursor-not-allowed'
                    : 'bg-[#006B3C] hover:bg-[#00452D] text-white shadow-md active:scale-98'
                }`}
              >
                {offer.claimed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#13B968]" />
                    <span>Reward Already Claimed (Demo)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#FFC928]" />
                    <span>Claim ₹{offer.bonusAmount} Demo Bonus</span>
                  </>
                )}
              </button>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
};
