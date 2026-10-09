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
  ChevronRight,
  Ticket,
  User,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { CheckInModal } from '../components/CheckInModal';
import { LuckySpinModal } from '../components/LuckySpinModal';
import { FloatingDepositButton } from '../components/FloatingDepositButton';

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
  const [tickerIndex, setTickerIndex] = useState(0);

  // Rotate winner ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % winnersTicker.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [winnersTicker]);

  const currentWinner = winnersTicker[tickerIndex];

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-20 select-none">
      
      {/* 1. TOP HEADER BAR matching 'Kerala Lottery Live' screenshot */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#C02626] via-[#991B1B] to-[#C02626] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          
          {/* Brand Title */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFC928] text-[#450A0A] font-black flex items-center justify-center text-xs shadow-xs">
              KL
            </div>
            <h1 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
              Kerala Lottery Live
            </h1>
          </Link>

          {/* Right Icons: Refresh, Mail, Customer Service */}
          <div className="flex items-center gap-1">
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
                <span className="absolute top-1 right-1 bg-[#FFC928] text-[#450A0A] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#C02626]">
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
          </div>

        </div>
      </header>

      {/* User Login/Profile Summary Ribbon */}
      <div className="bg-[#450A0A] text-white px-4 py-2 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          {isAuthenticated && userProfile ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-90">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-[#FFC928]"
                />
                <span className="font-bold text-white truncate max-w-[120px]">{userProfile.fullName}</span>
              </Link>
              <span className="text-[#FFC928] font-bold font-mono">₹{walletBalance.toLocaleString('en-IN')}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white/80">Firebase User Auth:</span>
              <Link to="/login" className="text-[#FFC928] font-extrabold hover:underline">
                Login / Register
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Link to="/wallet" className="text-[#FFC928] font-extrabold hover:underline">
              Wallet
            </Link>
            {isAuthenticated && (
              <button onClick={() => logout()} className="text-white/80 hover:text-white">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-4 pt-3 space-y-4 flex-1">
        
        {/* 2. OFFICIAL KERALA STATE LOTTERIES BANNER */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#991B1B] via-[#C02626] to-[#7F1D1D] text-white p-5 shadow-lg border border-[#FFC928]/40">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-[#FFC928] text-[#450A0A] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              GOVERNMENT OF KERALA
            </span>
            <span className="text-[10px] text-white/90 font-bold">
              Official Online Partner
            </span>
          </div>

          <h2 className="font-heading font-black text-xl sm:text-2xl text-white mb-1">
            Directorate of Kerala State Lotteries
          </h2>
          <p className="text-xs text-[#FFC928] font-semibold mb-4">
            Guaranteed Weekly Bumpers • Instant Digital Settlement
          </p>

          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/draws')}
              className="bg-[#FFC928] hover:bg-yellow-400 text-[#450A0A] font-black text-xs py-2.5 px-5 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Explore Kerala Draws</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 text-xl">
              <span>🎟️</span>
              <span>🐘</span>
              <span>✨</span>
            </div>
          </div>
        </section>

        {/* 3. LIVE WINNER TICKER BAR */}
        <section className="bg-white rounded-2xl p-2.5 px-3.5 border border-[#D7F3E5] shadow-xs flex items-center gap-3 text-xs overflow-hidden">
          <span className="bg-gradient-to-r from-[#FFC928] to-[#F59E0B] text-[#450A0A] font-black text-[10px] px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
            🏆 Winner:
          </span>
          <div className="flex-1 font-semibold text-[#132238] truncate transition-all duration-300">
            <span className="font-bold text-[#C02626]">{currentWinner.userMasked}</span> Won{' '}
            <span className="font-mono font-extrabold text-[#006B3C]">{currentWinner.amount}</span> in{' '}
            <span className="text-slate-600 font-bold">{currentWinner.gameName}</span>
          </div>
        </section>

        {/* 4. QUICK ACTION GRID (4 Round Badges as in Screenshot) */}
        <section className="bg-white rounded-3xl p-4 border border-[#D7F3E5] shadow-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            
            {/* Check In */}
            <button
              onClick={() => setIsCheckInOpen(true)}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#FFC928] to-[#F59E0B] text-[#450A0A] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-amber-300">
                <Calendar className="w-6 h-6 text-[#450A0A]" />
              </div>
              <span className="font-bold text-xs text-[#132238]">Check In</span>
            </button>

            {/* Lucky Spin */}
            <button
              onClick={() => setIsLuckySpinOpen(true)}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#C02626] to-[#EF4444] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-red-300">
                🎡
              </div>
              <span className="font-bold text-xs text-[#132238]">Lucky Spin</span>
            </button>

            {/* Result */}
            <button
              onClick={() => navigate('/draws?tab=results')}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#13B968] to-[#006B3C] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-emerald-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xs text-[#132238]">Result</span>
            </button>

            {/* Deposit */}
            <button
              onClick={() => navigate('/add-money')}
              className="flex flex-col items-center gap-1.5 group focus:outline-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-blue-300">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xs text-[#132238]">Deposit</span>
            </button>

          </div>
        </section>

        {/* 5. VIP FREE KERALA TICKETS PROMO BANNER */}
        <section className="bg-gradient-to-r from-[#C02626] via-[#DC2626] to-[#991B1B] text-white rounded-3xl p-5 shadow-lg border-2 border-[#FFC928] relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              VIP 1 Can Receive 1 Ticket Every Week
            </span>
            <span className="bg-[#FFC928] text-[#450A0A] text-[10px] font-black px-2 py-0.5 rounded-full">
              12 Crores
            </span>
          </div>

          <h3 className="font-heading font-black text-xl sm:text-2xl text-[#FFC928] tracking-tight">
            FREE KERALA TICKETS
          </h3>

          <div className="flex items-center justify-between mt-3">
            <div className="text-[11px] text-white/90">
              <span>Expires after: </span>
              <span className="font-mono font-black bg-black/40 px-2 py-1 rounded-md text-[#FFC928] border border-white/20">
                00 : 08 : 57
              </span>
            </div>

            <button
              onClick={() => claimRewardOffer('OFFER-1')}
              className="bg-[#FFC928] hover:bg-yellow-400 text-[#450A0A] font-black text-xs py-2 px-4 rounded-xl shadow-md transition-transform active:scale-95"
            >
              Claim Ticket
            </button>
          </div>
        </section>

        {/* 6. KERALA LOTTERIES SECTION */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-lg text-[#132238]">
              Kerala Lotteries
            </h3>
            <Link to="/draws" className="text-xs font-bold text-[#006B3C] hover:underline flex items-center gap-0.5">
              About Kerala &gt;
            </Link>
          </div>

          {/* Horizontal Scroll / Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {draws.map((draw) => (
              <div
                key={draw.id}
                onClick={() => navigate(`/draws/${draw.id}`)}
                className="bg-white rounded-2xl border border-[#D7F3E5] shadow-xs hover:shadow-md transition-all cursor-pointer overflow-hidden p-3.5 relative flex flex-col justify-between"
              >
                <div className={`bg-gradient-to-r ${draw.bannerGradient} text-white p-3 rounded-xl mb-3 relative`}>
                  <span className="absolute top-2 right-2 bg-[#FFC928] text-[#450A0A] text-[10px] font-black px-2 py-0.5 rounded-full">
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
                  <button className="bg-[#006B3C] text-white font-bold text-[11px] px-3 py-1 rounded-lg">
                    Buy Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. MOST POPULAR SECTION */}
        <section className="space-y-3 pt-2">
          <h3 className="font-heading font-black text-lg text-[#132238]">
            Most Popular
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { title: '500 Fortune Garuda', tag: '500X', bg: 'from-[#B45309] to-[#F59E0B]', emoji: '🦅' },
              { title: '1000X JILI Cash', tag: '1000X', bg: 'from-[#047857] to-[#10B981]', emoji: '💵' },
              { title: 'XXXTREME Roulette', tag: '2000X', bg: 'from-[#7F1D1D] to-[#EF4444]', emoji: '🎰' }
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

      {/* Floating Deposit Treasure Chest Button */}
      <FloatingDepositButton />

      {/* Modals */}
      <CheckInModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
      <LuckySpinModal isOpen={isLuckySpinOpen} onClose={() => setIsLuckySpinOpen(false)} />

    </div>
  );
};
