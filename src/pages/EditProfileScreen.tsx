import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Save, AlertCircle } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';

export const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfileData } = useDemo();

  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [mobile, setMobile] = useState(userProfile?.mobile || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!mobile.trim()) errs.mobile = 'Mobile number is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await updateProfileData(fullName.trim(), mobile.trim());
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Edit Profile" subtitle="Update Firebase User Data" />

      <main className="max-w-md mx-auto w-full p-4 space-y-5 flex-1">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F4FAF6] text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
            </div>
            {errors.fullName && <p className="text-[11px] text-[#DC2626] mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#132238] mb-1">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-[#F4FAF6] text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#C02626] outline-hidden text-[#132238] font-medium"
              />
            </div>
            {errors.mobile && <p className="text-[11px] text-[#DC2626] mt-1">{errors.mobile}</p>}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 bg-white hover:bg-slate-50 border border-[#D7F3E5] text-[#132238] font-bold py-2.5 px-4 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#C02626] hover:bg-[#991B1B] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 text-[#FFC928]" />
              <span>Save in Firebase</span>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};
