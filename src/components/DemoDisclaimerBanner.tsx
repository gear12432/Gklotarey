import React from 'react';
import { Info } from 'lucide-react';

interface DemoDisclaimerProps {
  compact?: boolean;
}

export const DemoDisclaimerBanner: React.FC<DemoDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-[#E8FFF4] border border-[#D7F3E5] rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] text-[#006B3C] font-semibold">
        <Info className="w-3.5 h-3.5 shrink-0 text-[#13B968]" />
        <span>FRONTEND DEMO — All tickets, funds, and draws are sample data only.</span>
      </div>
    );
  }

  return (
    <div className="bg-[#E8FFF4] border border-[#D7F3E5] rounded-2xl p-3.5 flex items-start gap-3 text-xs text-[#132238]">
      <div className="p-1.5 bg-[#13B968]/20 rounded-xl text-[#006B3C] shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div>
        <h4 className="font-bold text-[#006B3C] text-xs">FRONTEND DEMO APPLICATION</h4>
        <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
          Great View Lottery is demonstrated here with frontend client-side state only. No real money transfers or official lottery ticket issuance occur.
        </p>
      </div>
    </div>
  );
};
