import {
  KeralaLotteryDraw,
  WinnerAnnouncement,
  RewardOffer
} from '../types';

export const keralaStateDraws: KeralaLotteryDraw[] = [
  {
    id: 'DRAW-KR771',
    code: 'KR-771',
    title: 'KARUNYA KR-771',
    category: 'Weekly Bumper',
    ticketPrice: 40,
    jackpotPrize: '₹ 100 Lakhs',
    prizeDescription: '1st Prize ₹1 Crore + 10 x ₹10 Lakhs Runner Ups',
    closingTimeStr: '15 hrs 54 mins',
    drawDate: '2026-10-10 15:00:00',
    status: 'open',
    totalTickets: 100000,
    ticketsSold: 78200,
    bannerGradient: 'from-[#006B3C] via-[#00452D] to-[#13B968]',
    badgeTag: '₹40'
  },
  {
    id: 'DRAW-OA158',
    code: 'OA-158',
    title: 'ONLINE-ONLY OA-158',
    category: 'Digital Express',
    ticketPrice: 40,
    jackpotPrize: '₹ 120 Lakhs',
    prizeDescription: '1st Prize ₹1.2 Crore Exclusive Online Draw',
    closingTimeStr: '21 hrs 54 mins',
    drawDate: '2026-10-10 20:00:00',
    status: 'open',
    totalTickets: 80000,
    ticketsSold: 64100,
    bannerGradient: 'from-[#C02626] via-[#991B1B] to-[#DC2626]',
    badgeTag: '₹40',
    isOnlineOnly: true
  },
  {
    id: 'DRAW-SM76',
    code: 'SM-76',
    title: 'Samrudhi SM-76',
    category: 'Weekly Gold',
    ticketPrice: 40,
    jackpotPrize: '₹ 100 Lakhs',
    prizeDescription: '1st Prize ₹1 Crore + 50 Gold Vouchers',
    closingTimeStr: '1 days 15 hrs',
    drawDate: '2026-10-11 15:00:00',
    status: 'open',
    totalTickets: 90000,
    ticketsSold: 52000,
    bannerGradient: 'from-[#D97706] via-[#B45309] to-[#F59E0B]',
    badgeTag: '₹40'
  },
  {
    id: 'DRAW-NR390',
    code: 'NR-390',
    title: 'NIRMAL NR-390',
    category: 'Friday Special',
    ticketPrice: 40,
    jackpotPrize: '₹ 70 Lakhs',
    prizeDescription: '1st Prize ₹70 Lakhs + Guaranteed Secondary Payouts',
    closingTimeStr: '2 days 10 hrs',
    drawDate: '2026-10-12 15:00:00',
    status: 'open',
    totalTickets: 75000,
    ticketsSold: 39000,
    bannerGradient: 'from-[#2563EB] via-[#1D4ED8] to-[#3B82F6]',
    badgeTag: '₹40'
  },
  {
    id: 'DRAW-FF102',
    code: 'FF-102',
    title: 'FIFTY-FIFTY FF-102',
    category: 'Super Bumper',
    ticketPrice: 50,
    jackpotPrize: '₹ 1 Crore',
    prizeDescription: '1st Prize ₹1 Crore Jackpot + Fast Daily Settlement',
    closingTimeStr: '3 days 12 hrs',
    drawDate: '2026-10-13 15:00:00',
    status: 'open',
    totalTickets: 120000,
    ticketsSold: 88000,
    bannerGradient: 'from-[#059669] via-[#047857] to-[#10B981]',
    badgeTag: '₹50'
  }
];

export const mostPopularGames = [
  {
    id: 'POP-1',
    title: '500 FORTUNE GARUD',
    subtitle: 'Golden Garuda Divine Jackpot',
    multiply: '500X',
    tag: 'HOT PLAY',
    imageBg: 'from-[#B45309] via-[#78350F] to-[#F59E0B]',
    icon: '🦅'
  },
  {
    id: 'POP-2',
    title: '1000X JILI CASH',
    subtitle: 'Green Cash Stack Multiplier',
    multiply: '1000X',
    tag: 'SUPER MULTIPLIER',
    imageBg: 'from-[#047857] via-[#064E3B] to-[#10B981]',
    icon: '💵'
  },
  {
    id: 'POP-3',
    title: 'XXXTREME LIGHTNING ROULETTE',
    subtitle: 'Live First Person Roulette Wheel',
    multiply: '2000X',
    tag: 'LIVE CASINO',
    imageBg: 'from-[#7F1D1D] via-[#450A0A] to-[#EF4444]',
    icon: '🎰'
  }
];

export const liveWinnerTicker: WinnerAnnouncement[] = [
  { id: '1', userMasked: 'User 735****899', amount: '₹1,100', gameName: 'Matka', timestamp: '1 min ago' },
  { id: '2', userMasked: 'User 982****410', amount: '₹10,000', gameName: 'Karunya KR-771', timestamp: '3 mins ago' },
  { id: '3', userMasked: 'User 621****112', amount: '₹5,000', gameName: 'Lucky Spin', timestamp: '5 mins ago' },
  { id: '4', userMasked: 'User 884****092', amount: '₹1,20,000', gameName: 'Online-Only OA-158', timestamp: '8 mins ago' },
  { id: '5', userMasked: 'User 551****801', amount: '₹2,500', gameName: 'Daily Check-In', timestamp: '12 mins ago' }
];

export const initialRewardOffers: RewardOffer[] = [
  {
    id: 'OFFER-1',
    title: 'Free Kerala Ticket Weekly',
    description: 'VIP 1 players receive 1 Free Kerala State Lottery ticket every week!',
    bonusAmount: 40,
    code: 'FREEKERALA',
    expiryDate: 'Expires in 00:08:57',
    claimed: false,
    conditions: 'Claimable once per week for active demo users.',
    badgeText: 'VIP 1 SPECIAL'
  },
  {
    id: 'OFFER-2',
    title: 'Welcome First Deposit Bonus',
    description: 'Get ₹500 Instant Extra Wallet Credit when adding ₹100 or more!',
    bonusAmount: 500,
    code: 'KERALAWELCOME',
    expiryDate: '2026-10-31',
    claimed: false,
    conditions: 'Applies on first deposit.',
    badgeText: 'POPULAR'
  }
];

export const faqList = [
  {
    q: 'What is Kerala Lottery Live?',
    a: 'Kerala Lottery Live is a digital platform designed for Kerala State Lotteries online draw details, daily check-in rewards, and ticket management.'
  },
  {
    q: 'How does Firebase Authentication work?',
    a: 'Your account is securely saved in Firebase Authentication and Firestore database, keeping your tickets and wallet balance synced across sessions.'
  },
  {
    q: 'How do I claim Daily Check-In & Lucky Spin rewards?',
    a: 'Click on Check-In or Lucky Spin on the Home screen to claim free wallet cash bonus rewards directly credited to your Firebase wallet.'
  },
  {
    q: 'How do I check my purchased tickets?',
    a: 'Click on My Tickets from the menu to view all active, completed, and winning tickets linked to your Firebase user account.'
  }
];
