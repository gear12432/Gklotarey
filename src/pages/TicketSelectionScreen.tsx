import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket, Plus, Minus, CheckSquare, Square, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const TicketSelectionScreen: React.FC = () => {
  const { drawId } = useParams<{ drawId: string }>();
  const navigate = useNavigate();
  const { draws, walletBalance, showToast } = useDemo();

  const draw = draws.find((d) => d.id === drawId) || draws[0];

  const [quantity, setQuantity] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Generate a lucky ticket code
  const [ticketCode, setTicketCode] = useState(() => `GVL-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleRandomize = () => {
    setTicketCode(`GVL-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleQuantityChange = (delta: number) => {
    const nextQty = Math.max(1, Math.min(20, quantity + delta));
    setQuantity(nextQty);
  };

  const totalAmount = draw.ticketPrice * quantity;

  const handleProceed = () => {
    if (!agreeTerms) {
      showToast('Please acknowledge the terms checkbox to proceed.', 'error');
      return;
    }

    if (walletBalance < totalAmount) {
      showToast(`Insufficient Demo Wallet balance (₹${walletBalance}). Please add demo funds first.`, 'error');
      navigate('/add-money');
      return;
    }

    // Pass parameters to purchase confirmation screen via navigation state
    navigate('/purchase-confirmation', {
      state: {
        drawId: draw.id,
        quantity,
        ticketCode,
        unitPrice: draw.ticketPrice,
        totalAmount
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Ticket Selection" subtitle={draw.title} />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Draw Summary Top Banner */}
        <div className="bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white p-5 rounded-3xl shadow-sm space-y-1">
          <span className="bg-[#FFC928] text-[#00452D] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
            {draw.category} DRAW
          </span>
          <h2 className="font-heading font-extrabold text-lg text-white">{draw.title}</h2>
          <p className="text-xs text-[#D7F3E5]">Jackpot: <span className="font-bold text-[#FFC928]">{draw.jackpotPrize}</span></p>
        </div>

        <DemoDisclaimerBanner compact />

        {/* Lucky Ticket Number Selector */}
        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xs text-[#132238] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#006B3C]" />
              Lucky Ticket Number
            </h3>
            <button
              onClick={handleRandomize}
              className="text-xs text-[#006B3C] font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Quick Pick
            </button>
          </div>

          <div className="bg-[#E8FFF4] p-4 rounded-2xl border border-[#D7F3E5] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#64748B] font-semibold">Generated Sample Code</p>
              <p className="font-mono font-extrabold text-xl text-[#006B3C] tracking-wider mt-0.5">
                {ticketCode}
              </p>
            </div>
            <Ticket className="w-8 h-8 text-[#13B968]" />
          </div>
        </div>

        {/* Quantity Selector Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#132238]">Ticket Quantity</h3>
              <p className="text-xs text-[#64748B]">₹{draw.ticketPrice} per demo ticket</p>
            </div>

            <div className="flex items-center gap-3 bg-[#F4FAF6] border border-[#D7F3E5] p-1.5 rounded-2xl">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-xl bg-white text-[#132238] font-bold shadow-2xs flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading font-extrabold text-base text-[#006B3C] w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-xl bg-[#006B3C] text-white font-bold shadow-2xs flex items-center justify-center hover:bg-[#00452D]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Amount Calculation Summary */}
          <div className="pt-3 border-t border-[#D7F3E5] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#64748B]">
              <span>Unit Price</span>
              <span>₹{draw.ticketPrice}.00</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Quantity</span>
              <span>{quantity} ticket(s)</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#132238] pt-1 border-t border-[#D7F3E5]">
              <span>Total Demo Amount</span>
              <span className="text-[#006B3C] font-heading font-black text-lg">
                ₹{totalAmount.toLocaleString('en-IN')}.00
              </span>
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2 bg-white p-3.5 rounded-2xl border border-[#D7F3E5] cursor-pointer select-none">
          <button
            type="button"
            onClick={() => setAgreeTerms(!agreeTerms)}
            className="mt-0.5 text-[#006B3C]"
          >
            {agreeTerms ? (
              <CheckSquare className="w-4 h-4 text-[#006B3C]" />
            ) : (
              <Square className="w-4 h-4 text-[#64748B]" />
            )}
          </button>
          <span className="text-xs text-[#64748B] leading-tight">
            I acknowledge this is a sample ticket selection using frontend demo funds.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-3 px-4 rounded-2xl text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleProceed}
            className="flex-1 bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-3.5 px-6 rounded-2xl text-xs shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Proceed to Confirmation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
    </div>
  );
};
