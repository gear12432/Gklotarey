import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const PrivacyScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Privacy Policy" subtitle="Client-side data protection details" />

      <main className="max-w-2xl mx-auto w-full p-4 space-y-5 flex-1">
        <DemoDisclaimerBanner />

        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4 text-xs text-[#64748B] leading-relaxed">
          <h2 className="font-heading font-extrabold text-base text-[#132238]">1. Data Collection & Privacy</h2>
          <p>
            The Great View Lottery frontend demonstration app stores user preferences, sample name, email, and mock transactions locally in your browser session using standard Web Storage APIs.
          </p>

          <h2 className="font-heading font-extrabold text-base text-[#132238]">2. Serverless Frontend State</h2>
          <p>
            No personal information, passwords, mobile numbers, or banking credentials are transmitted to remote backend servers or sold to third parties.
          </p>

          <h2 className="font-heading font-extrabold text-base text-[#132238]">3. Local Reset</h2>
          <p>
            You can clear all stored local application data at any time by selecting "Restore Default Demo Data" from the Hamburger Drawer or Profile settings screen.
          </p>
        </div>
      </main>
    </div>
  );
};
