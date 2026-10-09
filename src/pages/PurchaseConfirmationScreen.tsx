import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Ticket, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const PurchaseConfirmationScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { draws, walletBalance, buyTickets } = useDemo();

  const stateData = location.state || {};
  const drawId = stateData.drawId || 'DRAW-KR771';
  const quantity = stateData.quantity || 1;
  const ticketCode = stateData.ticketCode || 'KL-882109';
  const totalAmount = stateData.totalAmount || 40;

  const targetDraw = draws.find(d => d.id === drawId) || draws[0];

  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPurchase = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const result = await buyTickets(targetDraw.id, quantity, [ticketCode]);
    setIsProcessing(false);

    if (result.success && result.ticketId) {
      navigate(`/tickets/${result.ticketId}`, { replace: true });
    } else {
      navigate('/my-tickets');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Confirm Ticket Purchase" subtitle="Kerala Lottery Live Review" />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        
        <DemoDisclaimerBanner />

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#D7F3E5] pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C02626] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Ticket className="w-6 h-6 text-[#FFC928]" />
            </div>
            <div>
              <p className="text-[10px] text-[#C02626] font-extrabold uppercase tracking-wider">{targetDraw.category} DRAW</p>
              <h2 className="font-heading font-extrabold text-base text-[#132238] leading-tight">{targetDraw.title}</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Draw Date: {new Date(targetDraw.drawDate).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-dashed border-[#D7F3E5]">
              <span className="text-[#64748B]">Ticket Code</span>
              <span className="font-mono font-bold text-[#C02626]">{ticketCode}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-dashed border-[#D7F3E5]">
              <span className="text-[#64748B]">Quantity</span>
              <span className="font-bold text-[#132238]">{quantity} ticket(s)</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-dashed border-[#D7F3E5]">
              <span className="text-[#64748B]">Price</span>
              <span className="font-bold text-[#132238]">₹{targetDraw.ticketPrice}.00</span>
            </div>

            <div className="flex justify-between py-2 text-sm font-extrabold text-[#132238]">
              <span>Total Amount</span>
              <span className="text-[#C02626] font-heading font-black text-xl">₹{totalAmount}.00</span>
            </div>
          </div>

          <div className="bg-[#E8FFF4] p-3 rounded-2xl border border-[#D7F3E5] flex items-center justify-between text-xs text-[#006B3C]">
            <span>Current Wallet Balance:</span>
            <span className="font-extrabold font-mono text-sm">₹{walletBalance.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-3.5 px-4 rounded-2xl text-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleConfirmPurchase}
            disabled={isProcessing}
            className="flex-1 bg-[#C02626] hover:bg-[#991B1B] text-white font-bold py-3.5 px-6 rounded-2xl text-xs shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing ? (
              <span>Confirming Ticket...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#FFC928]" />
                <span>Confirm Purchase (Firebase)</span>
              </>
            )}
          </button>
        </div>

      </main>
    </div>
  );
};
