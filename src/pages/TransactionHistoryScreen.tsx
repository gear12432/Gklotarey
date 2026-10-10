import React, { useState } from 'react';
import { Search, History, ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';

export const TransactionHistoryScreen: React.FC = () => {
  const { transactions } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTxns = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (typeFilter === 'all') return matchesSearch;
    if (typeFilter === 'credits') return matchesSearch && ['add_money', 'reward_bonus', 'deposit', 'checkin_reward', 'spin_reward'].includes(txn.type);
    if (typeFilter === 'debits') return matchesSearch && (txn.type === 'ticket_purchase' || txn.type === 'withdrawal');

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Transaction History" subtitle="Full ledger of demo wallet activity" />

      <main className="max-w-3xl mx-auto w-full p-4 space-y-4 flex-1">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#D7F3E5] shadow-xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search by Transaction ID, Reference, or Description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F4FAF6] text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#006B3C] outline-hidden text-[#132238] font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 pt-1 border-t border-[#D7F3E5]">
            {[
              { id: 'all', label: `All (${transactions.length})` },
              { id: 'credits', label: 'Credits (+)' },
              { id: 'debits', label: 'Ticket Purchases (-)' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setTypeFilter(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  typeFilter === chip.id
                    ? 'bg-[#006B3C] text-white'
                    : 'bg-[#F4FAF6] text-[#64748B] hover:bg-slate-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        {filteredTxns.length > 0 ? (
          <div className="bg-white rounded-3xl border border-[#D7F3E5] p-4 shadow-xs space-y-2.5">
            {filteredTxns.map((txn) => {
              const isCredit = ['add_money', 'reward_bonus', 'deposit', 'checkin_reward', 'spin_reward'].includes(txn.type);
              return (
                <div
                  key={txn.id}
                  className="p-3.5 bg-[#F4FAF6] hover:bg-[#E8FFF4] transition-colors rounded-2xl border border-transparent hover:border-[#D7F3E5] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                      isCredit ? 'bg-[#E8FFF4] text-[#006B3C]' : 'bg-red-50 text-[#DC2626]'
                    }`}>
                      {isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#132238] truncate">{txn.description}</p>
                      <p className="text-[10px] text-[#64748B] mt-0.5">
                        Ref: <span className="font-mono">{txn.reference}</span> • {txn.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono font-bold shrink-0">
                    <span className={isCredit ? 'text-[#006B3C] text-sm font-black' : 'text-[#132238] text-sm font-black'}>
                      {isCredit ? '+' : '-'}₹{txn.amount}.00
                    </span>
                    <span className="block text-[9px] text-[#13B968] font-sans font-bold uppercase mt-0.5">
                      {txn.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#D7F3E5] space-y-2 my-4">
            <History className="w-10 h-10 text-[#64748B] mx-auto" />
            <h3 className="font-bold text-sm text-[#132238]">No transaction records found</h3>
            <p className="text-xs text-[#64748B]">Try clearing your search filters.</p>
          </div>
        )}

      </main>
    </div>
  );
};
