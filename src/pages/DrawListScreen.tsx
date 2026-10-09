import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Trophy, Sparkles } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DrawCard } from '../components/DrawCard';

export const DrawListScreen: React.FC = () => {
  const { draws, results } = useDemo();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'draws';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

  const filteredDraws = draws.filter((draw) => {
    const matchesSearch =
      draw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draw.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'open') return matchesSearch && draw.status === 'open';
    if (statusFilter === 'closing_soon') return matchesSearch && draw.status === 'closing_soon';
    if (statusFilter === 'completed') return matchesSearch && draw.status === 'completed';

    return matchesSearch;
  });

  const sortedDraws = [...filteredDraws].sort((a, b) => {
    if (sortBy === 'price') {
      return a.ticketPrice - b.ticketPrice;
    }
    return new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime();
  });

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Kerala Lottery Draws" subtitle="Active draws & official results" />

      <main className="max-w-6xl mx-auto w-full p-4 space-y-4 flex-1">
        
        <div className="flex bg-white rounded-2xl p-1.5 border border-[#D7F3E5] shadow-2xs">
          <button
            onClick={() => setSearchParams({ tab: 'draws' })}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'draws'
                ? 'bg-[#C02626] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#132238]'
            }`}
          >
            <span>Active Draws ({draws.length})</span>
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'results' })}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'results'
                ? 'bg-[#C02626] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#132238]'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#FFC928]" />
            <span>Winning Results ({results.length})</span>
          </button>
        </div>

        {activeTab === 'draws' ? (
          <>
            <div className="bg-white rounded-2xl p-4 border border-[#D7F3E5] shadow-xs space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search draws by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F4FAF6] text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#D7F3E5]">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {[
                    { id: 'all', label: 'All Draws' },
                    { id: 'open', label: 'Open' },
                    { id: 'closing_soon', label: 'Closing Soon' },
                    { id: 'completed', label: 'Completed' },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setStatusFilter(chip.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        statusFilter === chip.id
                          ? 'bg-[#C02626] text-white'
                          : 'bg-[#F4FAF6] text-[#64748B] hover:bg-slate-200'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#64748B] ml-auto">
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}
                    className="bg-[#F4FAF6] border border-[#D7F3E5] rounded-lg text-xs font-bold text-[#C02626] p-1.5 outline-hidden"
                  >
                    <option value="date">Draw Date</option>
                    <option value="price">Ticket Price</option>
                  </select>
                </div>
              </div>

            </div>

            {sortedDraws.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedDraws.map((draw) => (
                  <DrawCard key={draw.id} draw={draw} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-[#D7F3E5] space-y-3 my-4">
                <Search className="w-10 h-10 text-[#64748B] mx-auto" />
                <h3 className="font-bold text-sm text-[#132238]">No matching draws found</h3>
                <p className="text-xs text-[#64748B]">Try adjusting your search terms or filters.</p>
                <button
                  onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                  className="bg-[#C02626] text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-[#E8FFF4] p-3.5 rounded-2xl border border-[#D7F3E5] text-xs text-[#006B3C] font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#13B968] shrink-0" />
              <span>Official Kerala State Lottery Winning Numbers & Prize Breakdown.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((res) => (
                <div key={res.id} className="bg-white rounded-3xl border border-[#D7F3E5] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#D7F3E5] pb-2">
                    <div>
                      <span className="text-[10px] text-[#64748B] font-bold uppercase">{res.drawDate}</span>
                      <h3 className="font-heading font-extrabold text-base text-[#132238]">{res.drawTitle}</h3>
                    </div>
                    <span className="bg-[#FFC928] text-[#450A0A] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                      COMPLETED
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#64748B] mb-1.5">Winning Lucky Numbers:</p>
                    <div className="flex flex-wrap gap-2">
                      {res.winningNumbers.map((num, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-[#991B1B] to-[#C02626] text-[#FFC928] font-mono font-extrabold text-sm px-3 py-1.5 rounded-xl border border-[#FFC928]/30 shadow-xs">
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs border-t border-[#D7F3E5]">
                    <span className="text-[#64748B]">
                      1st Prize: <strong className="text-[#C02626] font-extrabold">{res.firstPrize}</strong>
                    </span>
                    <span className="text-[#64748B] font-medium">
                      Winners: <strong>{res.totalWinners.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
