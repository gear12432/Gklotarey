import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Ticket, ArrowRight, Sparkles } from 'lucide-react';
import { LotteryDraw } from '../types';

interface DrawCardProps {
  draw: LotteryDraw;
  compact?: boolean;
}

export const DrawCard: React.FC<DrawCardProps> = ({ draw, compact = false }) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (draw.status) {
      case 'closing_soon':
        return <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">CLOSING SOON</span>;
      case 'open':
        return <span className="bg-[#13B968] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">OPEN FOR PLAY</span>;
      case 'completed':
        return <span className="bg-[#64748B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">DRAW COMPLETED</span>;
      default:
        return <span className="bg-[#006B3C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ACTIVE DRAW</span>;
    }
  };

  const percentSold = Math.min(100, Math.round((draw.ticketsSold / draw.totalTickets) * 100));

  return (
    <div className="bg-white rounded-2xl border border-[#D7F3E5] shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Top Banner Accent */}
      <div className={`bg-gradient-to-r ${draw.accentColor || 'from-[#006B3C] to-[#00452D]'} p-4 text-white relative`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          {getStatusBadge()}
          <span className="text-[10px] font-bold text-[#FFC928] bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full">
            {draw.category}
          </span>
        </div>

        <h3 className="font-heading font-bold text-base sm:text-lg leading-tight text-white mb-1">
          {draw.title}
        </h3>
        <p className="text-xs text-[#D7F3E5]">{draw.subtitle}</p>

        {/* Jackpot highlight */}
        <div className="mt-3 bg-black/25 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#FFC928] font-semibold uppercase tracking-wider">1st Prize Jackpot</p>
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-white text-gold-brand">
              {draw.jackpotPrize}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#FFC928] text-[#00452D] flex items-center justify-center font-bold shadow-sm">
            <Trophy className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {!compact && (
          <p className="text-xs text-[#64748B] line-clamp-2">
            {draw.prizeDescription}
          </p>
        )}

        {/* Tickets sold progress bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B] mb-1">
            <span className="flex items-center gap-1 text-[#132238] font-bold">
              <Ticket className="w-3.5 h-3.5 text-[#006B3C]" />
              Ticket: ₹{draw.ticketPrice} <span className="text-[10px] text-[#64748B] font-normal">(Demo)</span>
            </span>
            <span>{percentSold}% Sold</span>
          </div>
          <div className="w-full bg-[#E8FFF4] h-2 rounded-full overflow-hidden border border-[#D7F3E5]">
            <div
              className="bg-gradient-to-r from-[#13B968] to-[#006B3C] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentSold}%` }}
            />
          </div>
        </div>

        {/* Dates & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-[#D7F3E5] gap-2">
          <div className="text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1 text-[#132238]">
              <Clock className="w-3 h-3 text-[#006B3C]" />
              Draw: {new Date(draw.drawDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <button
            onClick={() => navigate(`/draws/${draw.id}`)}
            className="bg-[#006B3C] hover:bg-[#00452D] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
