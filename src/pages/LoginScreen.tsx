import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useDemo();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    const success = await loginWithEmail(email.trim(), password);
    setIsLoading(false);

    if (success) {
      navigate('/home');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const success = await loginWithGoogle();
    setIsLoading(false);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col justify-between p-4 sm:p-6">
      
      {/* Top Header */}
      <div className="max-w-md mx-auto w-full pt-6 pb-2">
        <div className="bg-gradient-to-r from-[#C02626] via-[#991B1B] to-[#C02626] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden mb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC928] text-[#450A0A] font-black flex items-center justify-center text-sm shadow-sm">
              KL
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#FFC928] tracking-wider uppercase">Kerala Lottery Live</p>
              <h1 className="font-heading font-black text-2xl text-white leading-tight">Welcome Back</h1>
            </div>
          </div>
          <p className="text-xs text-white/90">Login with your Firebase account</p>
        </div>

        <DemoDisclaimerBanner compact />

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D7F3E5] shadow-sm space-y-4 my-4">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-[#DC2626] text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F4FAF6] text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#132238]">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-[#C02626] font-bold hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F4FAF6] text-sm pl-10 pr-10 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C02626] hover:bg-[#991B1B] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            {isLoading ? <span>Signing in...</span> : <><span>Login (Firebase)</span><ArrowRight className="w-4 h-4" /></>}
          </button>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D7F3E5]" /></div>
            <div className="relative flex justify-center text-[11px]"><span className="bg-white px-2 text-[#64748B]">or continue with</span></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <span>Google Login (Firebase)</span>
          </button>

          <div className="text-center text-xs text-[#64748B] pt-2">
            New to Kerala Lottery Live?{' '}
            <Link to="/signup" className="text-[#C02626] font-bold hover:underline">
              Create Account
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
};
