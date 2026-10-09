import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </DemoProvider>
  );
}
