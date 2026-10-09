import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, loginWithGoogle } = useDemo();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name.';
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      errs.mobile = 'Mobile number must be 10 digits.';
    }

    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      errs.terms = 'You must agree to the Terms & Conditions.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const fullMobile = `${countryCode} ${mobile.trim()}`;
    const success = await signUpWithEmail(fullName.trim(), fullMobile, email.trim(), password);
    setIsLoading(false);

    if (success) {
      navigate('/home');
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const success = await loginWithGoogle();
    setIsLoading(false);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col justify-between p-4 sm:p-6">
      
      {/* Top Branding Header */}
      <div className="max-w-md mx-auto w-full pt-4 pb-2">
        <div className="bg-gradient-to-r from-[#C02626] via-[#991B1B] to-[#C02626] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden mb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC928] text-[#450A0A] font-black flex items-center justify-center text-sm shadow-sm">
              KL
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#FFC928] tracking-wider uppercase">Kerala Lottery Live</p>
              <h1 className="font-heading font-black text-2xl text-white leading-tight">Create Account</h1>
            </div>
          </div>
          <p className="text-xs text-white/90">Sign up with Firebase to save your tickets & wallet balance</p>
        </div>

        <DemoDisclaimerBanner compact />

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D7F3E5] shadow-sm space-y-4 my-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">
              Full Name <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F4FAF6] text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
            </div>
            {errors.fullName && <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.fullName}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">
              Mobile Number <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#F4FAF6] border border-[#D7F3E5] rounded-xl px-2.5 py-2.5 text-xs font-bold text-[#C02626] outline-hidden"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+971">🇦🇪 +971</option>
              </select>
              <input
                type="tel"
                placeholder="10-digit number"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#F4FAF6] text-sm px-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
            </div>
            {errors.mobile && <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.mobile}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">
              Email Address <span className="text-[#DC2626]">*</span>
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
            {errors.email && <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">
              Password <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
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
            {errors.password && <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">
              Confirm Password <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#F4FAF6] text-sm pl-10 pr-10 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.confirmPassword}</p>}
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <button
              type="button"
              onClick={() => setAgreeTerms(!agreeTerms)}
              className="mt-0.5 text-[#C02626]"
            >
              {agreeTerms ? <CheckSquare className="w-4 h-4 text-[#C02626]" /> : <Square className="w-4 h-4 text-[#64748B]" />}
            </button>
            <span className="text-xs text-[#64748B]">
              I agree to the Terms and Conditions and Privacy Policy.
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C02626] hover:bg-[#991B1B] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            {isLoading ? <span>Registering User...</span> : <><span>Create Account (Firebase)</span><ArrowRight className="w-4 h-4" /></>}
          </button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D7F3E5]" /></div>
            <div className="relative flex justify-center text-[11px]"><span className="bg-white px-2 text-[#64748B]">or continue with</span></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <span>Google Sign Up (Firebase)</span>
          </button>

          <div className="text-center text-xs text-[#64748B] pt-2">
            Already registered?{' '}
            <Link to="/login" className="text-[#C02626] font-bold hover:underline">
              Login
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
};
