import {
  KeralaLotteryDraw,
  WinnerAnnouncement,
  RewardOffer
} from '../types';

export const keralaStateDraws: KeralaLotteryDraw[] = [
  {
    id: 'DRAW-GV881',
    code: 'GV-881',
    title: 'GREAT VIEW MEGA BUMPER (GV-881)',
    category: 'Weekly Bumper',
    ticketPrice: 50,
    jackpotPrize: '₹ 25 Crores',
    prizeDescription: '1st Prize ₹25 Crores + 10 x ₹1 Crore Runner-Up Prizes',
    closingTimeStr: '12 hrs 30 mins',
    drawDate: '2026-10-10 15:00:00',
    status: 'open',
    totalTickets: 100000,
    ticketsSold: 84200,
    bannerGradient: 'from-[#00452D] via-[#006B3C] to-[#13B968]',
    badgeTag: '₹50 BUMPER'
  },
  {
    id: 'DRAW-GVE158',
    code: 'GV-158',
    title: 'GREAT VIEW DIGITAL EXPRESS (GV-158)',
    category: 'Digital Express',
    ticketPrice: 40,
    jackpotPrize: '₹ 10 Crores',
    prizeDescription: '1st Prize ₹10 Crores Exclusive Digital View Draw',
    closingTimeStr: '18 hrs 45 mins',
    drawDate: '2026-10-10 20:00:00',
    status: 'open',
    totalTickets: 80000,
    ticketsSold: 67100,
    bannerGradient: 'from-[#006B3C] via-[#00452D] to-[#FFC928]',
    badgeTag: '₹40',
    isOnlineOnly: true
  },
  {
    id: 'DRAW-GVS76',
    code: 'GV-76',
    title: 'GREAT VIEW SAMRUDHI GOLD (GV-76)',
    category: 'Weekly Gold',
    ticketPrice: 40,
    jackpotPrize: '₹ 5 Crores',
    prizeDescription: '1st Prize ₹5 Crores + 100 Guaranteed Gold Coins',
    closingTimeStr: '1 day 14 hrs',
    drawDate: '2026-10-11 15:00:00',
    status: 'open',
    totalTickets: 90000,
    ticketsSold: 58000,
    bannerGradient: 'from-[#D97706] via-[#B45309] to-[#F59E0B]',
    badgeTag: '₹40'
  },
  {
    id: 'DRAW-GVN390',
    code: 'GV-390',
    title: 'FORTUNE VIEW SPECIAL (GV-390)',
    category: 'Friday Special',
    ticketPrice: 40,
    jackpotPrize: '₹ 2 Crores',
    prizeDescription: '1st Prize ₹2 Crores + Guaranteed Secondary Payouts',
    closingTimeStr: '2 days 08 hrs',
    drawDate: '2026-10-12 15:00:00',
    status: 'open',
    totalTickets: 75000,
    ticketsSold: 41000,
    bannerGradient: 'from-[#2563EB] via-[#1D4ED8] to-[#3B82F6]',
    badgeTag: '₹40'
  },
  {
    id: 'DRAW-GVF102',
    code: 'GV-102',
    title: 'GREAT VIEW FIFTY-FIFTY (GV-102)',
    category: 'Super Bumper',
    ticketPrice: 50,
    jackpotPrize: '₹ 1 Crore',
    prizeDescription: '1st Prize ₹1 Crore Jackpot + Fast Daily Settlement',
    closingTimeStr: '3 days 10 hrs',
    drawDate: '2026-10-13 15:00:00',
    status: 'open',
    totalTickets: 120000,
    ticketsSold: 91000,
    bannerGradient: 'from-[#059669] via-[#047857] to-[#10B981]',
    badgeTag: '₹50'
  }
];

export const mostPopularGames = [
  {
    id: 'POP-1',
    title: '500 FORTUNE GARUDA',
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
    imageBg: 'from-[#00452D] via-[#006B3C] to-[#13B968]',
    icon: '🎰'
  }
];

export const liveWinnerTicker: WinnerAnnouncement[] = [
  { id: '1', userMasked: 'User 735****899', amount: '₹25,00,000', gameName: 'Great View Mega Bumper (GV-881)', timestamp: '1 min ago' },
  { id: '2', userMasked: 'User 982****410', amount: '₹5,00,000', gameName: 'Great View Digital Express (GV-158)', timestamp: '3 mins ago' },
  { id: '3', userMasked: 'User 621****112', amount: '₹50,000', gameName: 'Lucky Spin', timestamp: '5 mins ago' },
  { id: '4', userMasked: 'User 884****092', amount: '₹1,00,000', gameName: 'Fortune View Special (GV-390)', timestamp: '8 mins ago' },
  { id: '5', userMasked: 'User 551****801', amount: '₹2,500', gameName: 'Daily Check-In', timestamp: '12 mins ago' }
];

export const initialRewardOffers: RewardOffer[] = [
  {
    id: 'OFFER-1',
    title: 'Free Great View Ticket Weekly',
    description: 'VIP 1 players receive 1 Free Great View Lottery ticket every week!',
    bonusAmount: 50,
    code: 'FREEGREATVIEW',
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
    code: 'GREATVIEW500',
    expiryDate: '2026-10-31',
    claimed: false,
    conditions: 'Applies on first deposit.',
    badgeText: 'POPULAR'
  }
];

export const faqList = [
  {
    q: 'What is Great View Lottery?',
    a: 'Great View Lottery is a digital lottery customer application featuring live bumper draws, ticket selection, daily check-in rewards, and instant demo wallet credit.'
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
