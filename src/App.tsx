import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import { Toast } from './components/Toast';

import { SplashScreen } from './pages/SplashScreen';
import { SignupScreen } from './pages/SignupScreen';
import { LoginScreen } from './pages/LoginScreen';
import { ForgotPasswordScreen } from './pages/ForgotPasswordScreen';
import { HomeScreen } from './pages/HomeScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { EditProfileScreen } from './pages/EditProfileScreen';
import { DrawListScreen } from './pages/DrawListScreen';
import { DrawDetailsScreen } from './pages/DrawDetailsScreen';
import { TicketSelectionScreen } from './pages/TicketSelectionScreen';
import { PurchaseConfirmationScreen } from './pages/PurchaseConfirmationScreen';
import { MyTicketsScreen } from './pages/MyTicketsScreen';
import { TicketDetailsScreen } from './pages/TicketDetailsScreen';
import { WalletScreen } from './pages/WalletScreen';
import { AddMoneyScreen } from './pages/AddMoneyScreen';
import { TransactionHistoryScreen } from './pages/TransactionHistoryScreen';
import { NotificationsScreen } from './pages/NotificationsScreen';
import { RewardsScreen } from './pages/RewardsScreen';
import { SupportScreen } from './pages/SupportScreen';
import { TermsScreen } from './pages/TermsScreen';
import { PrivacyScreen } from './pages/PrivacyScreen';
import { ResponsiblePlayScreen } from './pages/ResponsiblePlayScreen';
import { NotFoundScreen } from './pages/NotFoundScreen';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error Boundary to prevent blank white screens if a runtime error occurs
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-lg max-w-md w-full space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#006B3C] text-[#FFC928] flex items-center justify-center font-black text-xl mx-auto shadow-sm">
              GV
            </div>
            <h1 className="font-heading font-black text-xl text-[#132238]">Great View Lottery</h1>
            <p className="text-xs text-[#64748B]">
              An unexpected error occurred while loading the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = window.location.pathname;
              }}
              className="w-full bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <DemoProvider>
        {/* HashRouter ensures 100% routing support on static hosts without 404 blank screens */}
        <HashRouter>
          <Toast />
          <Routes>
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/edit" element={<EditProfileScreen />} />
            <Route path="/draws" element={<DrawListScreen />} />
            <Route path="/draws/:drawId" element={<DrawDetailsScreen />} />
            <Route path="/ticket-selection/:drawId" element={<TicketSelectionScreen />} />
            <Route path="/purchase-confirmation" element={<PurchaseConfirmationScreen />} />
            <Route path="/my-tickets" element={<MyTicketsScreen />} />
            <Route path="/tickets/:ticketId" element={<TicketDetailsScreen />} />
            <Route path="/wallet" element={<WalletScreen />} />
            <Route path="/add-money" element={<AddMoneyScreen />} />
            <Route path="/transactions" element={<TransactionHistoryScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/rewards" element={<RewardsScreen />} />
            <Route path="/support" element={<SupportScreen />} />
            <Route path="/terms" element={<TermsScreen />} />
            <Route path="/privacy" element={<PrivacyScreen />} />
            <Route path="/responsible-play" element={<ResponsiblePlayScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </HashRouter>
      </DemoProvider>
    </ErrorBoundary>
  );
}
