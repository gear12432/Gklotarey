import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import {
  UserProfile,
  KeralaLotteryDraw,
  LotteryTicket,
  DemoTransaction,
  DemoNotification,
  RewardOffer,
  WinnerAnnouncement,
  DrawResult,
  SupportRequest
} from '../types';
import {
  keralaStateDraws,
  liveWinnerTicker,
  initialRewardOffers
} from '../data/demoData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface DemoContextType {
  firebaseUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  user: UserProfile | null; // Alias
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  walletBalance: number;
  draws: KeralaLotteryDraw[];
  tickets: LotteryTicket[];
  transactions: DemoTransaction[];
  notifications: DemoNotification[];
  rewards: RewardOffer[];
  results: DrawResult[];
  supportRequests: SupportRequest[];
  winnersTicker: WinnerAnnouncement[];
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  signUpWithEmail: (fullName: string, mobile: string, email: string, password: string) => Promise<boolean>;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfileData: (fullName: string, mobile: string) => Promise<void>;
  updateProfile: (fullName: string, mobile: string, email?: string) => Promise<void>;
  addMoney: (amount: number, method: string) => Promise<boolean>;
  buyTickets: (drawId: string, quantity: number, numbers?: string[]) => Promise<{ success: boolean; message: string; ticketId?: string }>;
  claimDailyCheckIn: () => Promise<boolean>;
  claimLuckySpin: (prizeAmount: number, prizeLabel: string) => Promise<boolean>;
  claimRewardOffer: (rewardId: string) => Promise<boolean>;
  claimReward: (rewardId: string) => Promise<boolean>;
  submitSupportRequest: (subject: string, message: string) => string;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationCount: number;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const initialResultsData: DrawResult[] = [
  {
    id: 'RES-901',
    drawId: 'DRAW-KR770',
    drawTitle: 'KARUNYA KR-770 Draw Result',
    drawDate: 'October 8, 2026',
    winningNumbers: ['KL-883912', 'KL-112093', 'KL-449102'],
    firstPrize: '₹ 100 Lakhs',
    totalWinners: 1420
  },
  {
    id: 'RES-902',
    drawId: 'DRAW-OA157',
    drawTitle: 'ONLINE-ONLY OA-157 Draw Result',
    drawDate: 'October 7, 2026',
    winningNumbers: ['KL-551029', 'KL-882019', 'KL-339102'],
    firstPrize: '₹ 120 Lakhs',
    totalWinners: 890
  }
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('gv_guest_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved guest profile', e);
    }
    return {
      uid: 'guest-view-player',
      fullName: 'Great View Player',
      mobile: '+91 98765 43210',
      email: 'player@greatviewlottery.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      walletBalance: 1500,
      vipLevel: 1,
      demoAccountStatus: 'VERIFIED PLAYER',
      createdAt: new Date().toLocaleDateString('en-IN')
    };
  });

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [tickets, setTickets] = useState<LotteryTicket[]>(() => {
    try {
      const saved = localStorage.getItem('gv_guest_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved guest tickets', e);
    }
    return [
      {
        id: 'TCK-990102',
        userId: 'guest-view-player',
        drawId: 'DRAW-KR771',
        drawTitle: 'KARUNYA KR-771 Official Kerala Draw',
        ticketCode: 'KL-882910',
        ticketNumber: 'KL-882910',
        quantity: 1,
        price: 40,
        unitPrice: 40,
        totalAmount: 40,
        purchaseDate: new Date().toLocaleString('en-IN'),
        drawDate: 'October 12, 2026',
        status: 'active'
      }
    ];
  });

  const [transactions, setTransactions] = useState<DemoTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('gv_guest_txns');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved guest transactions', e);
    }
    return [
      {
        id: 'TXN-WEL-1001',
        userId: 'guest-view-player',
        type: 'add_money',
        amount: 1500,
        date: new Date().toLocaleString('en-IN'),
        reference: 'BONUS-WELCOME',
        status: 'success',
        description: 'Welcome Bonus Credited',
        paymentMethod: 'Great View Welcome Reward'
      }
    ];
  });

  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [notifications, setNotifications] = useState<DemoNotification[]>([
    {
      id: 'NOTIF-1',
      title: 'Welcome to Great View Lottery!',
      message: 'Explore live official bumper draws, daily check-in rewards, and lucky spins.',
      date: 'Just now',
      read: false,
      type: 'system',
      link: '/home'
    }
  ]);
  const [rewards, setRewards] = useState<RewardOffer[]>(initialRewardOffers);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync guest state to localStorage whenever it changes when unauthenticated
  useEffect(() => {
    if (!firebaseUser && userProfile) {
      try {
        localStorage.setItem('gv_guest_profile', JSON.stringify(userProfile));
      } catch (e) {
        console.warn('Error saving guest profile', e);
      }
    }
  }, [userProfile, firebaseUser]);

  useEffect(() => {
    if (!firebaseUser) {
      try {
        localStorage.setItem('gv_guest_tickets', JSON.stringify(tickets));
      } catch (e) {
        console.warn('Error saving guest tickets', e);
      }
    }
  }, [tickets, firebaseUser]);

  useEffect(() => {
    if (!firebaseUser) {
      try {
        localStorage.setItem('gv_guest_txns', JSON.stringify(transactions));
      } catch (e) {
        console.warn('Error saving guest transactions', e);
      }
    }
  }, [transactions, firebaseUser]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currUser) => {
      setFirebaseUser(currUser);
      setIsLoadingAuth(true);

      if (currUser) {
        const userRef = doc(db, 'users', currUser.uid);
        const pathStr = `users/${currUser.uid}`;

        try {
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            const newProfile: UserProfile = {
              uid: currUser.uid,
              fullName: currUser.displayName || userProfile?.fullName || 'Great View Player',
              mobile: userProfile?.mobile || '+91 98765 43210',
              email: currUser.email || userProfile?.email || 'player@greatviewlottery.com',
              avatarUrl: currUser.photoURL || userProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
              walletBalance: userProfile?.walletBalance ?? 1500,
              vipLevel: userProfile?.vipLevel ?? 1,
              demoAccountStatus: 'VERIFIED PLAYER',
              createdAt: new Date().toLocaleDateString('en-IN')
            };
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          } else {
            setUserProfile(snap.data() as UserProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, pathStr);
        }

        const unsubProfile = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          }
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, pathStr);
        });

        // Use JS-side sorting on subcollections to avoid missing composite index errors
        const ticketsRef = collection(db, 'users', currUser.uid, 'tickets');
        const unsubTickets = onSnapshot(ticketsRef, (snap) => {
          const tList: LotteryTicket[] = [];
          snap.forEach(d => {
            const data = d.data() as LotteryTicket;
            tList.push({
              ...data,
              ticketNumber: data.ticketNumber || data.ticketCode,
              unitPrice: data.unitPrice || data.price
            });
          });
          // Sort client-side
          tList.sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime());
          setTickets(tList);
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, `users/${currUser.uid}/tickets`);
        });

        const txnsRef = collection(db, 'users', currUser.uid, 'transactions');
        const unsubTxns = onSnapshot(txnsRef, (snap) => {
          const txList: DemoTransaction[] = [];
          snap.forEach(d => txList.push(d.data() as DemoTransaction));
          txList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setTransactions(txList);
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, `users/${currUser.uid}/transactions`);
        });

        setIsLoadingAuth(false);

        return () => {
          unsubProfile();
          unsubTickets();
          unsubTxns();
        };

      } else {
        // Fallback to local guest profile if logged out
        setIsLoadingAuth(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const signUpWithEmail = async (fullName: string, mobile: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await updateFirebaseProfile(res.user, { displayName: fullName });
        const userRef = doc(db, 'users', res.user.uid);
        const newProfile: UserProfile = {
          uid: res.user.uid,
          fullName,
          mobile,
          email,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
          walletBalance: userProfile?.walletBalance ?? 1500,
          vipLevel: 1,
          demoAccountStatus: 'VERIFIED PLAYER',
          createdAt: new Date().toLocaleDateString('en-IN')
        };
        await setDoc(userRef, newProfile);

        // Migrate local guest tickets and transactions to new user
        for (const tck of tickets) {
          const tckRef = doc(db, 'users', res.user.uid, 'tickets', tck.id);
          await setDoc(tckRef, { ...tck, userId: res.user.uid });
        }
        for (const txn of transactions) {
          const txnRef = doc(db, 'users', res.user.uid, 'transactions', txn.id);
          await setDoc(txnRef, { ...txn, userId: res.user.uid });
        }

        showToast('🎉 Account registered successfully! Firebase user activated.');
        return true;
      }
      return false;
    } catch (error: any) {
      showToast(error?.message || 'Sign up failed.', 'error');
      return false;
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Welcome back! Firebase Login successful.');
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Login failed.', 'error');
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast('Signed in with Google successfully!');
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Google sign-in failed.', 'error');
      return false;
    }
  };

  const logout = async () => {
    if (firebaseUser) {
      await signOut(auth);
    }
    showToast('Signed out of Great View Lottery.', 'info');
  };

  const updateProfileData = async (fullName: string, mobile: string) => {
    if (firebaseUser) {
      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        await updateDoc(userRef, { fullName, mobile });
        showToast('Profile details updated in Firebase!');
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
      }
    } else if (userProfile) {
      const updated = { ...userProfile, fullName, mobile };
      setUserProfile(updated);
      showToast('Profile details updated successfully!');
    }
  };

  const addMoney = async (amount: number, method: string): Promise<boolean> => {
    if (amount <= 0) {
      showToast('Please enter a valid deposit amount.', 'error');
      return false;
    }

    const currentBalance = userProfile?.walletBalance ?? 1500;
    const newBalance = currentBalance + amount;
    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const newTxn: DemoTransaction = {
      id: txnId,
      userId: firebaseUser?.uid || userProfile?.uid || 'guest-view-player',
      type: 'add_money',
      amount,
      date: new Date().toLocaleString('en-IN'),
      reference: 'DEP-' + Math.floor(100000 + Math.random() * 900000),
      status: 'success',
      description: `Wallet Deposit via ${method}`,
      paymentMethod: method
    };

    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await updateDoc(userRef, { walletBalance: newBalance });
        const txnRef = doc(db, 'users', firebaseUser.uid, 'transactions', txnId);
        await setDoc(txnRef, newTxn);
        showToast(`₹${amount.toLocaleString('en-IN')} added to your wallet!`);
        return true;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
        return false;
      }
    } else if (userProfile) {
      setUserProfile({ ...userProfile, walletBalance: newBalance });
      setTransactions(prev => [newTxn, ...prev]);
      showToast(`₹${amount.toLocaleString('en-IN')} added to your wallet!`);
      return true;
    }

    return false;
  };

  const buyTickets = async (drawId: string, quantity: number, customNumbers?: string[]): Promise<{ success: boolean; message: string; ticketId?: string }> => {
    const targetDraw = keralaStateDraws.find(d => d.id === drawId) || keralaStateDraws[0];
    const totalCost = targetDraw.ticketPrice * quantity;
    const currentBalance = userProfile?.walletBalance ?? 1500;

    if (currentBalance < totalCost) {
      showToast(`Insufficient Wallet Balance (₹${currentBalance}). Needs ₹${totalCost}.`, 'error');
      return { success: false, message: 'Insufficient balance.' };
    }

    const newBalance = currentBalance - totalCost;
    const ticketCode = customNumbers && customNumbers.length > 0
      ? customNumbers[0]
      : `KL-${Math.floor(100000 + Math.random() * 900000)}`;

    const ticketId = 'TCK-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket: LotteryTicket = {
      id: ticketId,
      userId: firebaseUser?.uid || userProfile?.uid || 'guest-view-player',
      drawId: targetDraw.id,
      drawTitle: targetDraw.title,
      ticketCode,
      ticketNumber: ticketCode,
      quantity,
      price: targetDraw.ticketPrice,
      unitPrice: targetDraw.ticketPrice,
      totalAmount: totalCost,
      purchaseDate: new Date().toLocaleString('en-IN'),
      drawDate: targetDraw.drawDate,
      status: 'active'
    };

    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const newTxn: DemoTransaction = {
      id: txnId,
      userId: firebaseUser?.uid || userProfile?.uid || 'guest-view-player',
      type: 'ticket_purchase',
      amount: totalCost,
      date: new Date().toLocaleString('en-IN'),
      reference: 'ORD-' + ticketCode,
      status: 'success',
      description: `Purchased ${quantity} ticket(s) for ${targetDraw.title}`,
      paymentMethod: 'Wallet Balance'
    };

    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await updateDoc(userRef, { walletBalance: newBalance });
        const ticketRef = doc(db, 'users', firebaseUser.uid, 'tickets', ticketId);
        await setDoc(ticketRef, newTicket);
        const txnRef = doc(db, 'users', firebaseUser.uid, 'transactions', txnId);
        await setDoc(txnRef, newTxn);

        showToast(`🎉 Ticket #${ticketCode} confirmed for ${targetDraw.title}!`);
        return { success: true, message: 'Ticket purchased successfully!', ticketId };
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
        return { success: false, message: 'Failed to process purchase.' };
      }
    } else if (userProfile) {
      setUserProfile({ ...userProfile, walletBalance: newBalance });
      setTickets(prev => [newTicket, ...prev]);
      setTransactions(prev => [newTxn, ...prev]);
      showToast(`🎉 Ticket #${ticketCode} confirmed for ${targetDraw.title}!`);
      return { success: true, message: 'Ticket purchased successfully!', ticketId };
    }

    return { success: false, message: 'Failed to purchase ticket.' };
  };

  const claimDailyCheckIn = async (): Promise<boolean> => {
    if (!userProfile) return false;

    const todayStr = new Date().toDateString();
    if (userProfile.lastCheckInDate === todayStr) {
      showToast('You have already claimed today\'s check-in bonus!', 'info');
      return false;
    }

    const rewardAmount = 50;
    const newBalance = (userProfile.walletBalance || 0) + rewardAmount;
    const newStreak = (userProfile.checkInStreak || 0) + 1;
    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const newTxn: DemoTransaction = {
      id: txnId,
      userId: firebaseUser?.uid || userProfile.uid,
      type: 'reward_bonus',
      amount: rewardAmount,
      date: new Date().toLocaleString('en-IN'),
      reference: 'BONUS-CHECKIN',
      status: 'success',
      description: `Daily Check-In Reward (Day ${newStreak})`,
      paymentMethod: 'Reward Bonus'
    };

    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await updateDoc(userRef, {
          walletBalance: newBalance,
          lastCheckInDate: todayStr,
          checkInStreak: newStreak
        });
        const txnRef = doc(db, 'users', firebaseUser.uid, 'transactions', txnId);
        await setDoc(txnRef, newTxn);
        showToast(`🎁 Claimed ₹${rewardAmount} Daily Check-In Bonus!`);
        return true;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
        return false;
      }
    } else {
      setUserProfile({
        ...userProfile,
        walletBalance: newBalance,
        lastCheckInDate: todayStr,
        checkInStreak: newStreak
      });
      setTransactions(prev => [newTxn, ...prev]);
      showToast(`🎁 Claimed ₹${rewardAmount} Daily Check-In Bonus!`);
      return true;
    }
  };

  const claimLuckySpin = async (prizeAmount: number, prizeLabel: string): Promise<boolean> => {
    if (!userProfile) return false;

    const newBalance = (userProfile.walletBalance || 0) + prizeAmount;
    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const newTxn: DemoTransaction = {
      id: txnId,
      userId: firebaseUser?.uid || userProfile.uid,
      type: 'reward_bonus',
      amount: prizeAmount,
      date: new Date().toLocaleString('en-IN'),
      reference: 'SPIN-WIN',
      status: 'success',
      description: `Lucky Spin Reward: ${prizeLabel}`,
      paymentMethod: 'Lucky Spin'
    };

    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await updateDoc(userRef, { walletBalance: newBalance });
        const txnRef = doc(db, 'users', firebaseUser.uid, 'transactions', txnId);
        await setDoc(txnRef, newTxn);
        showToast(`🎡 Lucky Spin Won: ${prizeLabel} (₹${prizeAmount}) credited!`);
        return true;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
        return false;
      }
    } else {
      setUserProfile({ ...userProfile, walletBalance: newBalance });
      setTransactions(prev => [newTxn, ...prev]);
      showToast(`🎡 Lucky Spin Won: ${prizeLabel} (₹${prizeAmount}) credited!`);
      return true;
    }
  };

  const claimRewardOffer = async (rewardId: string): Promise<boolean> => {
    const offer = rewards.find(r => r.id === rewardId);
    if (!offer) return false;

    if (offer.claimed) {
      showToast('This offer has already been claimed.', 'info');
      return false;
    }

    const currentBalance = userProfile?.walletBalance ?? 1500;
    const newBalance = currentBalance + offer.bonusAmount;

    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      try {
        await updateDoc(userRef, { walletBalance: newBalance });
        setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, claimed: true } : r));
        showToast(`🎉 Bonus ₹${offer.bonusAmount} credited to wallet!`);
        return true;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
        return false;
      }
    } else if (userProfile) {
      setUserProfile({ ...userProfile, walletBalance: newBalance });
      setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, claimed: true } : r));
      showToast(`🎉 Bonus ₹${offer.bonusAmount} credited to wallet!`);
      return true;
    }

    return false;
  };

  const submitSupportRequest = (subject: string, message: string): string => {
    const ref = 'REF-SUP-' + Math.floor(10000 + Math.random() * 90000);
    const newReq: SupportRequest = {
      id: 'SUP-' + Math.floor(10000 + Math.random() * 90000),
      subject,
      message,
      date: new Date().toLocaleString('en-IN'),
      status: 'open',
      reference: ref
    };
    setSupportRequests(prev => [newReq, ...prev]);
    showToast(`Support query submitted! Reference: ${ref}`);
    return ref;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Enhance draws with default fallback fields
  const formattedDraws: KeralaLotteryDraw[] = keralaStateDraws.map(d => ({
    ...d,
    subtitle: d.subtitle || `${d.category} Official Kerala Draw`,
    description: d.description || `Official Kerala State Lottery ${d.title} draw featuring guaranteed top prizes and secondary rewards.`,
    accentColor: d.accentColor || d.bannerGradient,
    rules: d.rules || [
      'Each ticket contains a unique lucky code.',
      'Draw results announced live on app at 15:00 IST.',
      'Instant settlement credited to wallet.'
    ],
    eligibility: d.eligibility || 'Open to all registered players 18+'
  }));

  return (
    <DemoContext.Provider
      value={{
        firebaseUser,
        userProfile,
        user: userProfile,
        isAuthenticated: !!firebaseUser,
        isLoadingAuth,
        walletBalance: userProfile?.walletBalance ?? 1500,
        draws: formattedDraws,
        tickets,
        transactions,
        notifications,
        rewards,
        results: initialResultsData,
        supportRequests,
        winnersTicker: liveWinnerTicker,
        toast,
        showToast,
        hideToast,
        signUpWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
        updateProfileData,
        updateProfile: (name, mob) => updateProfileData(name, mob),
        addMoney,
        buyTickets,
        claimDailyCheckIn,
        claimLuckySpin,
        claimRewardOffer,
        claimReward: claimRewardOffer,
        submitSupportRequest,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationCount
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
