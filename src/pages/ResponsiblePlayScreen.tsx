import React from 'react';
import { Shield, Heart, AlertCircle, PhoneCall } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const ResponsiblePlayScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Responsible Play" subtitle="Play safely & set healthy limits" />

      <main className="max-w-2xl mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white p-6 rounded-3xl shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-[#FFC928]">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-extrabold text-xs uppercase tracking-wider">Play Responsibly</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl text-white">Entertainment First</h2>
          <p className="text-xs text-[#D7F3E5]">
            Great View Lottery advocates for fun, safe, and balanced gaming experiences.
          </p>
        </div>

        <DemoDisclaimerBanner />

        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4 text-xs text-[#64748B] leading-relaxed">
          <h3 className="font-heading font-bold text-sm text-[#132238] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#006B3C]" />
            18+ Age & Location Eligibility
          </h3>
          <p>
            Lottery games and prize draws are strictly intended for individuals who are 18 years of age or older in jurisdictions where participation in organized draws is legally permitted.
          </p>

          <h3 className="font-heading font-bold text-sm text-[#132238] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#006B3C]" />
            Financial Awareness & Limits
          </h3>
          <p>
            Lotteries should be enjoyed solely as a form of casual recreation, never as a investment scheme or guaranteed source of income. Always set personal budgets and time limits.
          </p>

          <div className="bg-[#E8FFF4] p-4 rounded-2xl border border-[#D7F3E5] space-y-2">
            <h4 className="font-bold text-xs text-[#006B3C]">Responsible Gaming Resources</h4>
            <p className="text-[11px] text-[#64748B]">
              If you or someone you know needs support or guidance regarding gaming habits, confidential helpline resources are available:
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006B3C] pt-1">
              <PhoneCall className="w-4 h-4" />
              <span>National Helpline: 1800-222-000 (Sample Placeholder)</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
