import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Send, MessageSquare, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { PageHeader } from '../components/PageHeader';
import { faqList } from '../data/demoData';

export const SupportScreen: React.FC = () => {
  const { supportRequests, submitSupportRequest } = useDemo();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lastRef, setLastRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const ref = submitSupportRequest(subject.trim(), message.trim());
    setLastRef(ref);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#132238] flex flex-col pb-12">
      <PageHeader title="Help & Support" subtitle="Frequently asked questions & assistance" />

      <main className="max-w-2xl mx-auto w-full p-4 space-y-6 flex-1">
        
        {/* Support Contact Info Banner */}
        <div className="bg-gradient-to-r from-[#00452D] via-[#006B3C] to-[#00452D] text-white p-6 rounded-3xl shadow-lg space-y-3">
          <h2 className="font-heading font-extrabold text-xl text-white">Need Assistance?</h2>
          <p className="text-xs text-[#D7F3E5]">
            Our Great View Lottery sample support team is ready to assist you with demo app questions.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-[#FFC928]">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> support@greatviewlottery.demo
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" /> 1800-GREAT-VIEW
            </span>
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-4">
          <h3 className="font-heading font-extrabold text-base text-[#132238] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#006B3C]" />
            Submit Support Inquiry (Demo)
          </h3>

          {lastRef && (
            <div className="bg-[#E8FFF4] border border-[#D7F3E5] p-4 rounded-2xl text-xs text-[#006B3C] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#13B968] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Inquiry Submitted Successfully!</p>
                <p className="text-[#64748B] mt-0.5">Reference Ticket: <strong className="font-mono text-[#006B3C]">{lastRef}</strong></p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#132238] mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Issue with demo draw numbers"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full bg-[#F4FAF6] text-xs px-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#006B3C] outline-hidden text-[#132238] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#132238] mb-1">Message Detail</label>
              <textarea
                rows={3}
                placeholder="Describe your question or feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-[#F4FAF6] text-xs px-4 py-2.5 rounded-xl border border-[#D7F3E5] focus:border-[#006B3C] outline-hidden text-[#132238] font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#006B3C] hover:bg-[#00452D] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#FFC928]" />
              <span>Submit Ticket Request</span>
            </button>
          </form>
        </div>

        {/* Previous Support Tickets */}
        {supportRequests.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-[#D7F3E5] shadow-xs space-y-3">
            <h3 className="font-heading font-extrabold text-xs text-[#64748B] uppercase tracking-wider">
              Your Submitted Demo Tickets
            </h3>
            <div className="space-y-2">
              {supportRequests.map((req) => (
                <div key={req.id} className="p-3.5 bg-[#F4FAF6] rounded-2xl border border-[#D7F3E5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#132238]">{req.subject}</span>
                    <span className="bg-[#E8FFF4] text-[#006B3C] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D7F3E5]">
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">{req.message}</p>
                  <p className="text-[10px] text-[#64748B]/80 pt-1 font-mono">Ref: {req.reference} • {req.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7F3E5] shadow-xs space-y-3">
          <h3 className="font-heading font-extrabold text-base text-[#132238] flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#006B3C]" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-2">
            {faqList.map((faq, idx) => (
              <div key={idx} className="border border-[#D7F3E5] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-3.5 bg-[#F4FAF6] flex items-center justify-between text-xs font-bold text-[#132238] hover:bg-[#E8FFF4] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#006B3C] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-3.5 bg-white text-xs text-[#64748B] border-t border-[#D7F3E5] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
