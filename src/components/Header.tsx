import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, RotateCw, Headphones, Mail } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { SideDrawer } from './SideDrawer';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, unreadNotificationCount, showToast } = useDemo();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white shadow-md border-b border-[#13B968]/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/profile')}
              className="relative shrink-0 group focus:outline-hidden"
              aria-label="View Profile"
            >
              <img
                src={userProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
                alt={userProfile?.fullName || 'User'}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#FFC928]"
              />
            </button>

            <div
              onClick={() => navigate('/profile')}
              className="cursor-pointer min-w-0"
            >
              <p className="text-xs text-white/90 font-medium leading-none">
                Hello, <span className="font-bold text-white truncate inline-block max-w-[140px] sm:max-w-[200px] align-bottom">{userProfile?.fullName?.split(' ')[0] || 'Player'}</span>
              </p>
              <p className="text-[11px] text-[#FFC928] font-black mt-0.5 tracking-tight uppercase">
                GREAT VIEW LOTTERY
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => showToast('Refreshed live draws & ticket state.')}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Refresh"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Mail className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FFC928] text-[#00452D] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/support')}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Support"
            >
              <Headphones className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
