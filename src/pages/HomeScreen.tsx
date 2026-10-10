import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RotateCw,
  Mail,
  Headphones,
  Calendar,
  Sparkles,
  Trophy,
  Wallet,
  Clock,
  ArrowRight,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Menu,
  Zap,
  Gift
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { CheckInModal } from '../components/CheckInModal';
import { LuckySpinModal } from '../components/LuckySpinModal';
import { FloatingDepositButton } from '../components/FloatingDepositButton';
import { SideDrawer } from '../components/SideDrawer';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    userProfile,
    isAuthenticated,
    walletBalance,
    draws,
    winnersTicker,
    unreadNotificationCount,
    logout,
    claimRewardOffer,
    showToast
  } = useDemo();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isLuckySpinOpen, setIsLuckySpinOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Rotate live winner ticker smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % winnersTicker.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [winnersTicker]);

  const currentWinner = winnersTicker[tickerIndex];

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-24 select-none">
      
      {/* 1. TOP BRAND HEADER BAR */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white shadow-md border-b border-[#13B968]/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Title */}
          <Link to="/home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFC928] to-[#F59E0B] text-[#00452D] font-black flex items-center justify-center text-sm shadow-md border border-amber-200 group-hover:scale-105 transition-transform">
              GV
            </div>
            <div>
              <h1 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight leading-none">
                GREAT VIEW <span className="text-[#FFC928]">LOTTERY</span>
              </h1>
              <p className="text-[10px] text-[#D7F3E5] font-semibold tracking-wider uppercase mt-0.5">
                Play • Win • Be Lucky
              </p>
            </div>
          </Link>

          {/* Header Action Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('Refreshed live draws & wallet balance.')}
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
              aria-label="Customer Support"
            >
              <Headphones className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. USER PROFILE & WALLET SUMMARY RIBBON */}
      <div className="bg-[#00452D] text-white px-4 py-2 border-b border-[#13B968]/20 shadow-inner">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          {isAuthenticated && userProfile ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-90">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-[#FFC928]"
                />
                <span className="font-bold text-white truncate max-w-[120px] sm:max-w-[200px]">{userProfile.fullName}</span>
              </Link>
              <span className="bg-[#006B3C] text-[#FFC928] font-bold font-mono px-2 py-0.5 rounded-full border border-[#FFC928]/40">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white/80">User Account:</span>
              <Link to="/login" className="text-[#FFC928] font-extrabold hover:underline flex items-center gap-1">
                <span>Login / Register</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Link to="/wallet" className="text-[#FFC928] font-extrabold hover:underline flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5" />
              <span>Wallet</span>
            </Link>
            {isAuthenticated && (
              <button onClick={() => logout()} className="text-white/80 hover:text-white" title="Sign Out">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-4 pt-4 space-y-4 flex-1">
        
        {/* 3. HERO BANNER — GREAT VIEW LOTTERY GRAND BUMPER */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#00452D] via-[#006B3C] to-[#00452D] text-white p-5 sm:p-6 shadow-xl border-2 border-[#FFC928]">
          
          {/* Glowing Ambient Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#13B968]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Official Badge Bar */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="bg-[#FFC928] text-[#00452D] font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current text-[#00452D]" />
              OFFICIAL BUMPER DRAWS
            </span>
            <span className="text-[11px] text-[#D7F3E5] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC928]" />
              Instant Digital Payouts
            </span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mb-1">
              GREAT VIEW <span className="text-[#FFC928]">GRAND BUMPER</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#FFC928] font-bold mb-4 flex items-center gap-1.5">
              <span>🏆 Jackpot Prize: ₹ 25 Crores</span>
              <span className="text-white/50">•</span>
              <span>100% Guaranteed View Winners</span>
            </p>

            {/* Floating Lucky Balls Preview */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-white/80 font-bold mr-1">Lucky Draw Balls:</span>
              {['17', '34', '88', '92'].map((ball, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full bg-gradient-to-b from-[#FFC928] to-[#F59E0B] text-[#00452D] font-black text-xs flex items-center justify-center shadow-md border border-white transform hover:scale-110 transition-transform"
                >
                  {ball}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/draws')}
                className="bg-[#FFC928] hover:bg-yellow-400 text-[#00452D] font-black text-xs py-3 px-6 rounded-2xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
              >
                <span>Explore Bumper Draws</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/draws?tab=results')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-5 rounded-2xl border border-[#D7F3E5]/30 backdrop-blur-xs flex items-center gap-1.5 transition-all"
              >
                <Trophy className="w-4 h-4 text-[#FFC928]" />
                <span>Today's Results</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. LIVE WINNER TICKER BAR */}
        <section className="bg-white rounded-2xl p-3 px-4 border border-[#D7F3E5] shadow-xs flex items-center gap-3 text-xs overflow-hidden">
          <span className="bg-gradient-to-r from-[#FFC928] to-[#F59E0B] text-[#00452D] font-black text-[10px] px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 shadow-2xs">
            🏆 Winner:
          </span>
          <div className="flex-1 font-semibold text-[#132238] truncate transition-all duration-300">
            <span className="font-bold text-[#006B3C]">{currentWinner.userMasked}</span> Won{' '}
            <span className="font-mono font-extrabold text-[#006B3C]">{currentWinner.amount}</span> in{' '}
            <span className="text-slate-700 font-bold">{currentWinner.gameName}</span>
          </div>
        </section>

        {/* 5. QUICK ACTION GRID */}
        <section className="bg-white rounded-3xl p-4 border border-[#D7F3E5] shadow-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            
            {/* Daily Check In */}
            <button
              onClick={() => setIsCheckInOpen(true)}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#FFC928] to-[#F59E0B] text-[#00452D] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-amber-300">
                <Calendar className="w-6 h-6 text-[#00452D]" />
              </div>
              <span className="font-bold text-xs text-[#132238]">Check In</span>
            </button>

            {/* Lucky Spin */}
            <button
              onClick={() => setIsLuckySpinOpen(true)}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#006B3C] to-[#13B968] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-emerald-300">
                🎡
              </div>
              <span className="font-bold text-xs text-[#132238]">Lucky Spin</span>
            </button>

            {/* Draw Results */}
            <button
              onClick={() => navigate('/draws?tab=results')}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#00452D] to-[#006B3C] text-[#FFC928] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-emerald-400">
                <Trophy className="w-6 h-6 text-[#FFC928]" />
              </div>
              <span className="font-bold text-xs text-[#132238]">Result</span>
            </button>

            {/* Deposit Funds */}
            <button
              onClick={() => navigate('/add-money')}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#FFC928] via-[#F59E0B] to-[#FFC928] text-[#00452D] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-amber-400">
                <Wallet className="w-6 h-6 text-[#00452D]" />
              </div>
              <span className="font-bold text-xs text-[#132238]">Deposit</span>
            </button>

          </div>
        </section>

        {/* 6. VIP FREE WEEKLY TICKET PROMO BANNER */}
        <section className="bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white rounded-3xl p-5 shadow-lg border-2 border-[#FFC928] relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              VIP 1 Can Receive 1 Ticket Every Week
            </span>
            <span className="bg-[#FFC928] text-[#00452D] text-[10px] font-black px-2 py-0.5 rounded-full">
              ₹25 Crores
            </span>
          </div>

          <h3 className="font-heading font-black text-xl sm:text-2xl text-[#FFC928] tracking-tight">
            FREE GREAT VIEW TICKET
          </h3>

          <div className="flex items-center justify-between mt-3">
            <div className="text-[11px] text-white/90">
              <span>Expires after: </span>
              <span className="font-mono font-black bg-black/40 px-2.5 py-1 rounded-md text-[#FFC928] border border-white/20">
                00 : 08 : 57
              </span>
            </div>

            <button
              onClick={() => claimRewardOffer('OFFER-1')}
              className="bg-[#FFC928] hover:bg-yellow-400 text-[#00452D] font-black text-xs py-2 px-4 rounded-xl shadow-md transition-transform active:scale-95"
            >
              Claim Ticket
            </button>
          </div>
        </section>

        {/* 7. GREAT VIEW BUMPER DRAWS SECTION */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-lg text-[#132238]">
              Great View Bumper Draws
            </h3>
            <Link to="/draws" className="text-xs font-bold text-[#006B3C] hover:underline flex items-center gap-0.5">
              <span>View All Draws &gt;</span>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {draws.map((draw) => (
              <div
                key={draw.id}
                onClick={() => navigate(`/draws/${draw.id}`)}
                className="bg-white rounded-2xl border border-[#D7F3E5] shadow-xs hover:shadow-md transition-all cursor-pointer overflow-hidden p-3.5 relative flex flex-col justify-between"
              >
                <div className={`bg-gradient-to-r ${draw.bannerGradient} text-white p-3 rounded-xl mb-3 relative`}>
                  <span className="absolute top-2 right-2 bg-[#FFC928] text-[#00452D] text-[10px] font-black px-2 py-0.5 rounded-full">
                    {draw.badgeTag}
                  </span>
                  <h4 className="font-heading font-black text-base leading-tight">{draw.title}</h4>
                  <p className="font-mono font-extrabold text-lg text-[#FFC928] mt-1">{draw.jackpotPrize}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D7F3E5]">
                  <span className="text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#006B3C]" />
                    {draw.closingTimeStr}
                  </span>
                  <button className="bg-[#006B3C] hover:bg-[#00452D] text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-xs transition-colors">
                    Buy Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. MOST POPULAR MULTIPLIER GAMES */}
        <section className="space-y-3 pt-2">
          <h3 className="font-heading font-black text-lg text-[#132238]">
            Most Popular Games
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { title: '500 Fortune Garuda', tag: '500X', bg: 'from-[#B45309] to-[#F59E0B]', emoji: '🦅' },
              { title: '1000X JILI Cash', tag: '1000X', bg: 'from-[#00452D] to-[#006B3C]', emoji: '💵' },
              { title: 'XXXTREME Roulette', tag: '2000X', bg: 'from-[#006B3C] to-[#13B968]', emoji: '🎰' }
            ].map((game, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/draws')}
                className={`bg-gradient-to-b ${game.bg} text-white rounded-2xl p-3 shadow-md border border-white/20 text-center flex flex-col items-center justify-between cursor-pointer hover:scale-102 transition-transform h-36`}
              >
                <span className="bg-black/30 font-mono font-black text-[9px] px-2 py-0.5 rounded-full text-[#FFC928]">
                  {game.tag}
                </span>
                <span className="text-3xl my-1">{game.emoji}</span>
                <span className="font-heading font-black text-xs leading-tight line-clamp-2">
                  {game.title}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Floating Deposit Button */}
      <FloatingDepositButton />

      {/* Side Drawer Component */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Modals */}
      <CheckInModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
      <LuckySpinModal isOpen={isLuckySpinOpen} onClose={() => setIsLuckySpinOpen(false)} />

    </div>
  );
};
