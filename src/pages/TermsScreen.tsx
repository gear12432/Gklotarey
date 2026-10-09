import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const TermsScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Terms & Conditions" subtitle="Sample legal & usage policy" />

      <main className="max-w-2xl mx-auto w-full p-4 space-y-5 flex-1">
        <DemoDisclaimerBanner />

        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4 text-xs text-[#64748B] leading-relaxed">
          <h2 className="font-heading font-extrabold text-base text-[#132238]">1. General Application Overview</h2>
          <p>
            Welcome to the Great View Lottery customer frontend application. This interface is developed strictly as a sample demonstration application showcasing digital ticket selection, wallet simulation, and draw UI workflows.
          </p>

          <h2 className="font-heading font-extrabold text-base text-[#132238]">2. Sample Demo Status</h2>
          <p>
            All currency values, balances, jackpot figures, ticket numbers, draw results, and user profiles displayed within this application are non-authoritative sample data maintained in local client-side state.
          </p>

          <h2 className="font-heading font-extrabold text-base text-[#132238]">3. No Real Money Transactions</h2>
          <p>
            No real monetary transfers, bank debits, credit card charges, or official government lottery ticket issuances occur through this application. Users cannot deposit real fiat money or claim actual monetary prizes.
          </p>

          <h2 className="font-heading font-extrabold text-base text-[#132238]">4. User Eligibility & Disclaimer</h2>
          <p>
            Participation in demo draws is restricted to entertainment testing and interface evaluation. This text is placeholder demonstration copy requiring legal review before commercial deployment.
          </p>
        </div>
      </main>
    </div>
  );
};
