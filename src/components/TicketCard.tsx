import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Calendar, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { LotteryTicket } from '../types';

interface TicketCardProps {
  ticket: LotteryTicket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (ticket.status) {
      case 'active':
        return (
          <span className="bg-[#E8FFF4] text-[#006B3C] border border-[#D7F3E5] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13B968]" />
            ACTIVE TICKET
          </span>
        );
      case 'completed':
        return ticket.isWinner ? (
          <span className="bg-[#FFC928] text-[#00452D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-current" />
            WINNER ({ticket.prizeWon})
          </span>
        ) : (
          <span className="bg-slate-100 text-[#64748B] text-[10px] font-bold px-2 py-0.5 rounded-full">
            COMPLETED
          </span>
        );
      default:
        return (
          <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {ticket.status.toUpperCase()}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D7F3E5] p-4 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Decorative side ticket notch */}
      <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-5 h-5 rounded-full bg-[#F4FAF6] border-r border-[#D7F3E5]" />
      <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 rounded-full bg-[#F4FAF6] border-l border-[#D7F3E5]" />

      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            Ticket #{ticket.id}
          </span>
          <h4 className="font-heading font-bold text-sm text-[#132238] leading-tight mt-0.5">
            {ticket.drawTitle}
          </h4>
        </div>
        {getStatusBadge()}
      </div>

      {/* Ticket Number Display Box */}
      <div className="my-3 bg-gradient-to-r from-[#00452D] to-[#006B3C] text-white p-3 rounded-xl flex items-center justify-between border border-[#13B968]/30">
        <div>
          <p className="text-[10px] text-[#D7F3E5] font-semibold uppercase">Your Ticket Number</p>
          <p className="font-mono font-extrabold text-lg text-[#FFC928] tracking-wider">
            {ticket.ticketNumber}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#D7F3E5]">Qty: {ticket.quantity}</p>
          <p className="text-xs font-bold text-white">₹{ticket.totalAmount} <span className="text-[9px] text-[#D7F3E5]">(Demo)</span></p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-dashed border-[#D7F3E5]">
        <div className="flex items-center gap-1 text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-[#006B3C]" />
          <span>Draw Date: {new Date(ticket.drawDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <button
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          className="text-[#006B3C] hover:text-[#00452D] font-bold text-xs flex items-center gap-1 p-1 hover:bg-[#E8FFF4] rounded-lg transition-colors"
        >
          <span>View Ticket</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
