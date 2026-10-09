import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Ticket, Wallet, Gift, Info } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';

export const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDemo();

  const handleNotificationClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'draw': return <Ticket className="w-4 h-4 text-[#006B3C]" />;
      case 'wallet': return <Wallet className="w-4 h-4 text-[#13B968]" />;
      case 'reward': return <Gift className="w-4 h-4 text-[#FFC928]" />;
      default: return <Info className="w-4 h-4 text-[#64748B]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Notifications" subtitle="App updates & draw alerts" />

      <main className="max-w-2xl mx-auto w-full p-4 space-y-4 flex-1">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-3 px-4 border border-[#D7F3E5] shadow-xs">
          <span className="text-xs font-bold text-[#64748B]">
            {notifications.filter(n => !n.read).length} Unread Notification(s)
          </span>

          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-bold text-[#006B3C] hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-2.5">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-[#D7F3E5] opacity-80'
                    : 'bg-white border-[#006B3C] shadow-xs ring-1 ring-[#006B3C]/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                    notif.read ? 'bg-[#F4FAF6]' : 'bg-[#E8FFF4]'
                  }`}>
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-extrabold text-sm text-[#132238] truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-[#64748B] shrink-0 font-medium">
                        {notif.date}
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#D7F3E5] space-y-2 my-6">
            <Bell className="w-10 h-10 text-[#64748B] mx-auto" />
            <h3 className="font-bold text-sm text-[#132238]">No notifications yet</h3>
            <p className="text-xs text-[#64748B]">We will notify you here when draw results or offer bonuses arrive.</p>
          </div>
        )}

      </main>
    </div>
  );
};
