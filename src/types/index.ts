export interface UserProfile {
  uid: string;
  fullName: string;
  mobile: string;
  email: string;
  avatarUrl: string;
  walletBalance: number;
  vipLevel: number;
  lastCheckInDate?: string;
  checkInStreak?: number;
  demoAccountStatus: string;
  createdAt: string;
}

export interface KeralaLotteryDraw {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  category: string;
  ticketPrice: number;
  jackpotPrize: string;
  prizeDescription: string;
  closingTimeStr: string;
  drawDate: string;
  status: 'open' | 'closing_soon' | 'completed';
  totalTickets: number;
  ticketsSold: number;
  bannerGradient: string;
  accentColor?: string;
  badgeTag: string;
  description?: string;
  rules?: string[];
  eligibility?: string;
  isOnlineOnly?: boolean;
}

export type LotteryDraw = KeralaLotteryDraw;

export interface LotteryTicket {
  id: string;
  userId: string;
  drawId: string;
  drawTitle: string;
  ticketCode: string;
  ticketNumber: string; // Alias for ticketCode
  quantity: number;
  price: number;
  unitPrice?: number;
  totalAmount: number;
  purchaseDate: string;
  drawDate: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  winningNumbers?: string[];
  isWinner?: boolean;
  prizeWon?: string;
}

export interface DemoTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'ticket_purchase' | 'checkin_reward' | 'spin_reward' | 'add_money' | 'reward_bonus';
  amount: number;
  date: string;
  reference: string;
  status: 'success' | 'pending' | 'failed';
  description: string;
  paymentMethod?: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'draw' | 'wallet' | 'reward' | 'system';
  link?: string;
}

export interface RewardOffer {
  id: string;
  title: string;
  description: string;
  bonusAmount: number;
  code: string;
  expiryDate: string;
  claimed: boolean;
  conditions: string;
  badgeText?: string;
}

export interface WinnerAnnouncement {
  id: string;
  userMasked: string;
  amount: string;
  gameName: string;
  timestamp: string;
}

export interface DrawResult {
  id: string;
  drawId: string;
  drawTitle: string;
  drawDate: string;
  winningNumbers: string[];
  firstPrize: string;
  totalWinners: number;
}

export interface SupportRequest {
  id: string;
  subject: string;
  message: string;
  date: string;
  status: 'open' | 'in_progress' | 'resolved';
  reference: string;
}
