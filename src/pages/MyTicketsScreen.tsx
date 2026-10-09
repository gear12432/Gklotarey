import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Ticket, Search, Filter } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { TicketCard } from '../components/TicketCard';

export const MyTicketsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { tickets } = useDemo();
  const [searchParams] = useSearchParams();

  const statusParam = searchParams.get('status') || 'all';
  const [filter, setFilter] = useState(statusParam);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.drawTitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'all') return matchesSearch;
    return matchesSearch && t.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="My Tickets" subtitle="View active & past sample lottery tickets" />

      <main className="max-w-4xl mx-auto w-full p-4 space-y-4 flex-1">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#D7F3E5] shadow-xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search by Ticket ID, Code, or Draw name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F4FAF6] text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#006B3C] outline-hidden text-[#132238] font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-[#D7F3E5]">
            {[
              { id: 'all', label: `All (${tickets.length})` },
              { id: 'active', label: `Active (${tickets.filter(t => t.status === 'active').length})` },
              { id: 'completed', label: `Completed (${tickets.filter(t => t.status === 'completed').length})` },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setFilter(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  filter === chip.id
                    ? 'bg-[#006B3C] text-white'
                    : 'bg-[#F4FAF6] text-[#64748B] hover:bg-slate-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket List */}
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#D7F3E5] space-y-3 my-6">
            <div className="w-12 h-12 rounded-full bg-[#E8FFF4] text-[#006B3C] mx-auto flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-[#132238]">No tickets found</h3>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto">
              {searchTerm ? 'No tickets match your search criteria.' : 'You have not purchased any sample lottery tickets yet.'}
            </p>
            <button
              onClick={() => navigate('/draws')}
              className="bg-[#006B3C] text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-xs"
            >
              Browse Active Draws
            </button>
          </div>
        )}

      </main>
    </div>
  );
};
