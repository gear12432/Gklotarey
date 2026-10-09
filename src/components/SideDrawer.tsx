import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  Home,
  Ticket,
  Clock,
  Trophy,
  Wallet,
  PlusCircle,
  History,
  Gift,
  Bell,
  User,
  HelpCircle,
  FileText,
  ShieldCheck,
  Heart,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, logout, unreadNotificationCount } = useDemo();

  if (!isOpen) return null;

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuSections = [
    {
      title: 'Kerala Lottery & Games',
      items: [
        { label: 'Home Live', path: '/home', icon: Home },
        { label: 'Kerala Draws & Tickets', path: '/draws', icon: Ticket },
        { label: 'My Tickets', path: '/my-tickets', icon: Ticket },
        { label: 'Active Tickets', path: '/my-tickets?status=active', icon: Clock },
        { label: 'Draw Results', path: '/draws?tab=results', icon: Trophy },
      ]
    },
    {
      title: 'Wallet & Account',
      items: [
        { label: 'Wallet Balance', path: '/wallet', icon: Wallet },
        { label: 'Deposit Funds', path: '/add-money', icon: PlusCircle },
        { label: 'Transaction Ledger', path: '/transactions', icon: History },
        { label: 'Rewards & Bonus', path: '/rewards', icon: Gift },
        { label: 'Notifications', path: '/notifications', icon: Bell, badge: unreadNotificationCount > 0 ? unreadNotificationCount : null },
        { label: 'My Profile', path: '/profile', icon: User },
      ]
    },
    {
      title: 'Help & Policies',
      items: [
        { label: 'Help & Customer Care', path: '/support', icon: HelpCircle },
        { label: 'Terms & Conditions', path: '/terms', icon: FileText },
        { label: 'Privacy Policy', path: '/privacy', icon: ShieldCheck },
        { label: 'Responsible Play', path: '/responsible-play', icon: Heart },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-left duration-200">
        
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-[#C02626] via-[#991B1B] to-[#C02626] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={() => handleNav('/profile')}
            className="flex items-center gap-3.5 cursor-pointer group pt-1"
          >
            <img
              src={userProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
              alt={userProfile?.fullName || 'User'}
              className="w-13 h-13 rounded-full object-cover border-2 border-[#FFC928] shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-extrabold text-base text-white truncate">
                {userProfile?.fullName || 'Kerala Player'}
              </h3>
              <p className="text-xs text-white/80 truncate">
                {userProfile?.email || 'player@keralalottery.live'}
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] font-black text-[#450A0A] bg-[#FFC928] px-2 py-0.5 rounded-full mt-1">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                VIP {userProfile?.vipLevel || 1} PLAYER
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 no-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx}>
              <p className="px-3 text-[11px] font-bold tracking-wider text-[#64748B] uppercase mb-1">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleNav(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#E8FFF4] text-[#006B3C] border border-[#D7F3E5]'
                          : 'text-[#132238] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${active ? 'text-[#006B3C]' : 'text-[#64748B]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-[#DC2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Logout */}
          <div className="pt-2 border-t border-[#D7F3E5]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#DC2626] hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Firebase Account</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-[#D7F3E5] text-center">
          <p className="text-[10px] text-[#64748B] font-bold">KERALA LOTTERY LIVE v3.0 (Firebase Integrated)</p>
        </div>

      </div>
    </div>
  );
};
