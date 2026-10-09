import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket, Calendar, Share2, Printer, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';

export const TicketDetailsScreen: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { tickets, showToast } = useDemo();

  const ticket = tickets.find((t) => t.id === ticketId) || tickets[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Great View Lottery Ticket #${ticket.ticketNumber}`,
        text: `Check out my Great View Lottery sample ticket #${ticket.ticketNumber} for ${ticket.drawTitle}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Demo ticket link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Ticket Details" subtitle={`Ticket ID: ${ticket.id}`} />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* POLISHED LOTTERY TICKET CANVAS */}
        <div className="printable-ticket bg-gradient-to-b from-[#00452D] via-[#006B3C] to-[#00452D] text-white rounded-3xl p-6 shadow-xl border-2 border-[#FFC928] relative overflow-hidden space-y-5">
          
          {/* Top Gold Header */}
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFC928] text-[#00452D] font-extrabold flex items-center justify-center text-xs shadow-xs">
                GVL
              </div>
              <div>
                <p className="font-heading font-black text-sm text-[#FFC928] uppercase tracking-wider">GREAT VIEW LOTTERY</p>
                <p className="text-[10px] text-[#D7F3E5]">OFFICIAL SAMPLE TICKET</p>
              </div>
            </div>

            <span className="bg-[#FFC928] text-[#00452D] text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              DEMO TICKET
            </span>
          </div>

          {/* Draw Title */}
          <div>
            <span className="text-[10px] text-[#FFC928] font-bold uppercase tracking-widest">Draw Event</span>
            <h2 className="font-heading font-extrabold text-xl text-white mt-0.5">{ticket.drawTitle}</h2>
          </div>

          {/* Ticket Number Display Box */}
          <div className="bg-black/30 backdrop-blur-xs p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <p className="text-[10px] text-[#D7F3E5] uppercase font-bold tracking-widest">Your Lucky Number</p>
            <p className="font-mono font-black text-2xl sm:text-3xl text-[#FFC928] tracking-widest">
              {ticket.ticketNumber}
            </p>
            <p className="text-[10px] text-[#D7F3E5] pt-1">Quantity: {ticket.quantity} Ticket(s)</p>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-2xl text-xs border border-white/10">
            <div>
              <p className="text-[10px] text-[#D7F3E5]">Ticket Reference</p>
              <p className="font-bold text-white font-mono mt-0.5">{ticket.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#D7F3E5]">Demo Price Paid</p>
              <p className="font-bold text-[#FFC928] mt-0.5">₹{ticket.totalAmount}.00</p>
            </div>
            <div>
              <p className="text-[10px] text-[#D7F3E5]">Purchase Date</p>
              <p className="font-bold text-white mt-0.5">{ticket.purchaseDate.split(' ')[0]}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#D7F3E5]">Draw Scheduled Date</p>
              <p className="font-bold text-white mt-0.5">{ticket.drawDate.split(' ')[0]}</p>
            </div>
          </div>

          {/* Stamp / Disclaimer Banner */}
          <div className="bg-[#FFC928] text-[#00452D] p-2.5 rounded-xl text-center text-[11px] font-extrabold tracking-wide uppercase">
            FRONTEND DEMO TICKET — NO REAL CASH VALUE
          </div>

        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-3 px-4 rounded-2xl text-xs shadow-2xs flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4 text-[#006B3C]" />
            <span>Share Ticket</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-3 px-4 rounded-2xl text-xs shadow-2xs flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-[#006B3C]" />
            <span>Print Ticket</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/my-tickets')}
          className="w-full bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-3 px-4 rounded-2xl text-xs shadow-xs flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to My Tickets</span>
        </button>

      </main>
    </div>
  );
};
