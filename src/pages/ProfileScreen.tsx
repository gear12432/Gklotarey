import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Mail, Calendar, ShieldCheck, Edit3, Camera, LogOut, ChevronRight, Shield, Award } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, firebaseUser, logout, showToast } = useDemo();

  const handleAvatarChangeDemo = () => {
    showToast('Profile photo update simulated.', 'info');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="My Account Profile" subtitle="Firebase User & Settings" />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs text-center relative overflow-hidden">
          <div className="relative inline-block mb-3">
            <img
              src={userProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
              alt={userProfile?.fullName || 'User Avatar'}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#C02626] shadow-md mx-auto"
            />
            <button
              onClick={handleAvatarChangeDemo}
              className="absolute bottom-0 right-0 bg-[#FFC928] text-[#450A0A] p-2 rounded-full shadow-md hover:bg-yellow-400"
              aria-label="Change Profile Picture"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h2 className="font-heading font-extrabold text-xl text-[#132238]">
            {userProfile?.fullName || 'Kerala Lottery Player'}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">{userProfile?.email || firebaseUser?.email}</p>

          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#450A0A] bg-[#FFC928] px-3.5 py-1 rounded-full mt-3">
            <Award className="w-4 h-4" />
            <span>VIP LEVEL {userProfile?.vipLevel || 1} PLAYER</span>
          </div>
        </div>

        <DemoDisclaimerBanner compact />

        {/* Account Details List */}
        <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            Firebase Account Details
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#F4FAF6] rounded-2xl">
              <div className="flex items-center gap-3 text-[#64748B]">
                <User className="w-4 h-4 text-[#C02626]" />
                <span>Full Name</span>
              </div>
              <span className="font-bold text-[#132238]">{userProfile?.fullName || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F4FAF6] rounded-2xl">
              <div className="flex items-center gap-3 text-[#64748B]">
                <Phone className="w-4 h-4 text-[#C02626]" />
                <span>Mobile Number</span>
              </div>
              <span className="font-bold text-[#132238]">{userProfile?.mobile || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F4FAF6] rounded-2xl">
              <div className="flex items-center gap-3 text-[#64748B]">
                <Mail className="w-4 h-4 text-[#C02626]" />
                <span>Email Address</span>
              </div>
              <span className="font-bold text-[#132238]">{userProfile?.email || firebaseUser?.email}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F4FAF6] rounded-2xl">
              <div className="flex items-center gap-3 text-[#64748B]">
                <Calendar className="w-4 h-4 text-[#C02626]" />
                <span>Firebase User UID</span>
              </div>
              <span className="font-mono text-[10px] text-[#64748B] font-bold truncate max-w-[140px]">{firebaseUser?.uid || 'Guest'}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile/edit')}
            className="w-full bg-[#C02626] hover:bg-[#991B1B] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <Edit3 className="w-4 h-4 text-[#FFC928]" />
            <span>Edit Profile Details</span>
          </button>
        </div>

        {/* Links */}
        <div className="bg-white rounded-3xl p-4 border border-[#D7F3E5] shadow-xs space-y-1">
          <Link to="/terms" className="w-full flex items-center justify-between p-3 text-xs font-medium text-[#132238] hover:bg-slate-50 rounded-xl">
            <span>Terms and Conditions</span>
            <ChevronRight className="w-4 h-4 text-[#64748B]" />
          </Link>
          <Link to="/privacy" className="w-full flex items-center justify-between p-3 text-xs font-medium text-[#132238] hover:bg-slate-50 rounded-xl">
            <span>Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-[#64748B]" />
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Firebase Account</span>
        </button>

      </main>
    </div>
  );
};
