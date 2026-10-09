import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Clock, Ticket, CheckCircle2, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const DrawDetailsScreen: React.FC = () => {
  const { drawId } = useParams<{ drawId: string }>();
  const navigate = useNavigate();
  const { draws } = useDemo();

  const draw = draws.find((d) => d.id === drawId) || draws[0];

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title={draw.title} subtitle="Draw specifications & rules" />

      <main className="max-w-3xl mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Main Draw Hero Card */}
        <div className={`bg-gradient-to-r ${draw.bannerGradient || 'from-[#C02626] via-[#991B1B] to-[#C02626]'} text-white rounded-3xl p-6 shadow-lg relative overflow-hidden`}>
          <div className="flex items-center justify-between mb-3">
            <span className="bg-[#FFC928] text-[#450A0A] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              {draw.category} DRAW
            </span>
            <span className="text-xs font-semibold text-[#D7F3E5]">
              ID: {draw.id}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1">
            {draw.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#D7F3E5] mb-5">{draw.subtitle}</p>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#FFC928] font-bold uppercase tracking-wider">1st Prize Grand Jackpot</p>
              <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FFC928]">
                {draw.jackpotPrize}
              </p>
              <p className="text-[11px] text-[#D7F3E5] mt-0.5">{draw.prizeDescription}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFC928] text-[#450A0A] flex items-center justify-center font-bold shadow-md shrink-0">
              <Trophy className="w-7 h-7 fill-current" />
            </div>
          </div>
        </div>

        <DemoDisclaimerBanner />

        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#F4FAF6] rounded-2xl">
            <p className="text-[11px] text-[#64748B] font-medium">Ticket Price</p>
            <p className="font-heading font-extrabold text-xl text-[#006B3C] mt-0.5">
              ₹{draw.ticketPrice}
            </p>
          </div>

          <div className="p-3 bg-[#F4FAF6] rounded-2xl">
            <p className="text-[11px] text-[#64748B] font-medium">Draw Scheduled Time</p>
            <p className="font-bold text-xs text-[#132238] mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#006B3C]" />
              {new Date(draw.drawDate).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4">
          <div>
            <h3 className="font-heading font-bold text-sm text-[#132238] mb-1">Draw Overview</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">{draw.description}</p>
          </div>

          <div className="pt-3 border-t border-[#D7F3E5]">
            <h3 className="font-heading font-bold text-sm text-[#132238] mb-2">Rules & Guidelines</h3>
            <ul className="space-y-2">
              {(draw.rules || []).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#13B968] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-[#D7F3E5]">
            <h3 className="font-heading font-bold text-sm text-[#132238] mb-1">Eligibility</h3>
            <p className="text-xs text-[#64748B] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#006B3C]" />
              {draw.eligibility}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => navigate('/draws')}
            className="bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-3 px-4 rounded-2xl text-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Draws</span>
          </button>

          <button
            onClick={() => navigate(`/ticket-selection/${draw.id}`)}
            className="flex-1 bg-[#C02626] hover:bg-[#991B1B] text-white font-bold py-3.5 px-6 rounded-2xl text-xs shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4 text-[#FFC928]" />
            <span>Buy Ticket (₹{draw.ticketPrice})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
    </div>
  );
};
