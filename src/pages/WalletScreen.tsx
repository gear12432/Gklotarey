import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, PlusCircle, ArrowUpRight, ArrowDownLeft, History, ShieldCheck, ChevronRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const WalletScreen: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, transactions } = useDemo();

  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Demo Wallet" subtitle="Funds & simulated balance management" />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Main Balance Card */}
        <div className="bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#FFC928] bg-black/30 px-3 py-1 rounded-full uppercase tracking-wider">
              DEMO WALLET
            </span>
            <span className="text-xs text-[#D7F3E5]">
              INR (₹)
            </span>
          </div>

          <div>
            <p className="text-xs text-[#D7F3E5]">Available Balance</p>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
              ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <button
            onClick={() => navigate('/add-money')}
            className="w-full bg-[#FFC928] hover:bg-yellow-400 text-[#00452D] font-extrabold py-3 px-4 rounded-2xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 text-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Demo Funds</span>
          </button>
        </div>

        <DemoDisclaimerBanner compact />

        {/* Recent Activity List */}
        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-sm text-[#132238] flex items-center gap-2">
              <History className="w-4 h-4 text-[#006B3C]" />
              Recent Transactions
            </h3>
            <Link to="/transactions" className="text-xs font-bold text-[#006B3C] hover:underline flex items-center gap-0.5">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-2.5 pt-1">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="p-3 bg-[#F4FAF6] rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    txn.type === 'add_money' || txn.type === 'reward_bonus'
                      ? 'bg-emerald-100 text-[#006B3C]'
                      : 'bg-red-100 text-[#DC2626]'
                  }`}>
                    {txn.type === 'add_money' || txn.type === 'reward_bonus' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#132238] leading-tight">{txn.description}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">{txn.date}</p>
                  </div>
                </div>

                <div className="text-right font-mono font-bold">
                  <span className={txn.type === 'add_money' || txn.type === 'reward_bonus' ? 'text-[#006B3C]' : 'text-[#132238]'}>
                    {txn.type === 'add_money' || txn.type === 'reward_bonus' ? '+' : '-'}₹{txn.amount}
                  </span>
                  <span className="block text-[9px] text-[#13B968] font-sans font-bold">SUCCESS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
