import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

export const NotFoundScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col">
      <PageHeader title="Page Not Found" subtitle="Great View Lottery" />

      <main className="max-w-md mx-auto w-full p-6 text-center space-y-4 my-auto">
        <div className="w-16 h-16 rounded-3xl bg-[#006B3C] text-[#FFC928] font-black text-2xl flex items-center justify-center mx-auto shadow-md">
          404
        </div>
        <h2 className="font-heading font-extrabold text-xl text-[#132238]">Screen Not Found</h2>
        <p className="text-xs text-[#64748B]">
          The page you requested could not be located. Please return to the Home dashboard.
        </p>

        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#006B3C] text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md"
        >
          <Home className="w-4 h-4 text-[#FFC928]" />
          <span>Go to Home Dashboard</span>
        </button>
      </main>
    </div>
  );
};
