import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { DemoDisclaimerBanner } from '../components/DemoDisclaimerBanner';

export const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col">
      <PageHeader title="Forgot Password" subtitle="Reset your demo account password" showHome={false} />

      <main className="max-w-md mx-auto w-full p-4 sm:p-6 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-sm space-y-4">
          
          <div className="text-center mb-2">
            <div className="w-12 h-12 rounded-full bg-[#E8FFF4] text-[#006B3C] mx-auto flex items-center justify-center mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-extrabold text-xl text-[#132238]">Password Reset</h2>
            <p className="text-xs text-[#64748B] mt-1">
              Enter your registered Gmail address below. In demo mode, a simulated password reset link will be generated.
            </p>
          </div>

          <DemoDisclaimerBanner compact />

          {isSubmitted ? (
            <div className="bg-[#E8FFF4] border border-[#D7F3E5] p-4 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#13B968] mx-auto" />
              <h3 className="font-bold text-sm text-[#006B3C]">Simulated Reset Link Issued</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                In this frontend demonstration app, your demo password reset link for <span className="font-bold text-[#132238]">{email}</span> has been simulated. You can now return to login.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-[#DC2626] text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#132238] mb-1">
                  Registered Gmail Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F4FAF6] text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#006B3C] outline-hidden text-[#132238] font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Send Reset Link (Demo)</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-[#006B3C] font-bold hover:underline inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
};
