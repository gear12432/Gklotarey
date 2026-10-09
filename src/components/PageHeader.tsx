import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showHome?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, showHome = true }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#C02626] via-[#991B1B] to-[#C02626] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="min-w-0">
            <h1 className="font-heading font-extrabold text-base sm:text-lg text-white truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-[#FFC928] truncate font-semibold">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {showHome && (
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};
