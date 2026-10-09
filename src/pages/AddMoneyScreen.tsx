import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Wallet, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const AddMoneyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, addMoney } = useDemo();

  const [amount, setAmount] = useState<number>(500);
  const [customAmountStr, setCustomAmountStr] = useState<string>('500');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = [100, 500, 1000, 2000, 5000];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmountStr(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmountStr(val);
    setAmount(val ? parseInt(val, 10) : 0);
  };

  const handleProceed = () => {
    if (amount <= 0) return;
    setShowConfirmModal(true);
  };

  const handleConfirmAddMoney = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const methodLabel = paymentMethod === 'upi' ? 'Simulated UPI' : paymentMethod === 'card' ? 'Simulated Debit Card' : 'Simulated NetBanking';
      addMoney(amount, methodLabel);
      setIsProcessing(false);
      setShowConfirmModal(false);
      navigate('/wallet');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Add Money" subtitle="Simulate demo wallet top-up" />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Current Balance Display */}
        <div className="bg-white rounded-3xl p-4 border border-[#D7F3E5] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#64748B] font-semibold">Current Demo Balance</p>
            <p className="font-heading font-black text-xl text-[#006B3C]">
              ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <Wallet className="w-8 h-8 text-[#13B968]" />
        </div>

        <DemoDisclaimerBanner compact />

        {/* Deposit Amount Input */}
        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-sm text-[#132238]">Enter Amount (INR)</h3>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-heading font-black text-2xl text-[#006B3C]">
              ₹
            </span>
            <input
              type="text"
              value={customAmountStr}
              onChange={handleCustomChange}
              placeholder="0"
              className="w-full bg-[#F4FAF6] font-heading font-black text-2xl pl-10 pr-4 py-3 rounded-2xl border border-[#D7F3E5] focus:border-[#006B3C] outline-hidden text-[#132238]"
            />
          </div>

          {/* Quick Presets */}
          <div>
            <p className="text-[11px] font-bold text-[#64748B] mb-2">Popular Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectPreset(val)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    amount === val
                      ? 'bg-[#006B3C] text-white shadow-xs'
                      : 'bg-[#F4FAF6] border border-[#D7F3E5] text-[#132238] hover:bg-slate-100'
                  }`}
                >
                  +₹{val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#132238]">Select Payment Mode (Demo)</h3>

          <div className="space-y-2">
            {[
              { id: 'upi', name: 'Simulated UPI App (GPay / PhonePe / Paytm)', badge: 'FASTEST' },
              { id: 'card', name: 'Simulated Debit / Credit Card', badge: 'DEMO' },
              { id: 'netbanking', name: 'Simulated NetBanking', badge: 'DEMO' }
            ].map((pm) => (
              <label
                key={pm.id}
                onClick={() => setPaymentMethod(pm.id as any)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === pm.id
                    ? 'border-[#006B3C] bg-[#E8FFF4] text-[#006B3C] font-bold'
                    : 'border-[#D7F3E5] bg-[#F4FAF6] text-[#132238]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === pm.id ? 'border-[#006B3C] bg-[#006B3C]' : 'border-[#64748B]'
                  }`}>
                    {paymentMethod === pm.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs font-semibold">{pm.name}</span>
                </div>
                <span className="text-[9px] font-extrabold bg-white px-2 py-0.5 rounded-full border border-[#D7F3E5]">
                  {pm.badge}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleProceed}
          disabled={amount <= 0}
          className="w-full bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-3.5 px-6 rounded-2xl text-xs shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>Add ₹{amount.toLocaleString('en-IN')} to Demo Wallet</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </main>

      {/* CONFIRMATION DIALOG MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#D7F3E5] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#E8FFF4] text-[#006B3C] mx-auto flex items-center justify-center mb-2">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#132238]">Confirm Demo Deposit</h3>
              <p className="text-xs text-[#64748B] mt-1">
                You are about to simulate adding <strong className="text-[#006B3C]">₹{amount.toLocaleString('en-IN')}</strong> to your Demo Wallet.
              </p>
            </div>

            <div className="bg-[#F4FAF6] p-3 rounded-2xl border border-[#D7F3E5] text-xs space-y-1">
              <div className="flex justify-between text-[#64748B]">
                <span>Method</span>
                <span className="font-bold text-[#132238] uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Fee</span>
                <span className="font-bold text-[#006B3C]">₹0.00 Free</span>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#64748B] font-medium">
              FRONTEND DEMO ONLY — NO REAL MONEY TRANSFERRED
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-white border border-[#D7F3E5] text-[#132238] font-bold py-2.5 rounded-xl text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAddMoney}
                disabled={isProcessing}
                className="flex-1 bg-[#006B3C] text-white font-bold py-2.5 rounded-xl text-xs hover:bg-[#00452D] shadow-xs"
              >
                {isProcessing ? 'Simulating...' : 'Confirm Deposit'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
