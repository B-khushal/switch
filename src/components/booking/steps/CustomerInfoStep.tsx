import React, { useState } from 'react';
import { CustomerDetails } from '../../../types/booking';
import { User, Mail, Phone, Building2, Globe, DollarSign, Target, FileText } from 'lucide-react';

interface CustomerInfoStepProps {
  customerDetails: CustomerDetails;
  onChange: (details: CustomerDetails) => void;
}

const budgetRanges = [
  '< $5,000 / mo',
  '$5,000 - $10,000 / mo',
  '$10,000 - $25,000 / mo',
  '$25,000+ / mo',
];

const marketingGoalsList = [
  'Viral Short-Form Content',
  'YouTube Long-Form Channel Growth',
  'High-ROAS Meta/Google Ads',
  'Complete Brand Identity & Website',
  'SEO & Search Authority',
];

export default function CustomerInfoStep({ customerDetails, onChange }: CustomerInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CustomerDetails, value: any) => {
    const updated = { ...customerDetails, [field]: value };
    onChange(updated);

    // Basic inline validation
    if (field === 'fullName' && !value.trim()) {
      setErrors((prev) => ({ ...prev, fullName: 'Full name is required' }));
    } else if (field === 'email' && (!value.includes('@') || !value.includes('.'))) {
      setErrors((prev) => ({ ...prev, email: 'Valid business email required' }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = customerDetails.marketingGoals || [];
    const updated = currentGoals.includes(goal)
      ? currentGoals.filter((g) => g !== goal)
      : [...currentGoals, goal];
    handleChange('marketingGoals', updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-2">
          Your Business Details
        </h3>
        <p className="text-sm text-black/60">
          Provide your project context so our strategists arrive fully prepared for your session.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-[28px] border border-black/5 shadow-xl shadow-black/5 space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="text"
                placeholder="e.g. Alex Rivera"
                value={customerDetails.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFA] border text-sm font-medium text-[#111111] outline-none transition-colors ${
                  errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-brand'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
              Business Email *
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="email"
                placeholder="alex@company.com"
                value={customerDetails.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFA] border text-sm font-medium text-[#111111] outline-none transition-colors ${
                  errors.email ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-brand'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone & Company Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={customerDetails.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/10 focus:border-brand text-sm font-medium text-[#111111] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
              Company Name
            </label>
            <div className="relative">
              <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="text"
                placeholder="Acme Growth Inc."
                value={customerDetails.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/10 focus:border-brand text-sm font-medium text-[#111111] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Website & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
              Website / Social Link
            </label>
            <div className="relative">
              <Globe size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="url"
                placeholder="https://acme.com"
                value={customerDetails.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/10 focus:border-brand text-sm font-medium text-[#111111] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
              Estimated Monthly Budget
            </label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <select
                value={customerDetails.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/10 focus:border-brand text-sm font-medium text-[#111111] outline-none transition-colors cursor-pointer"
              >
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Marketing Goals Checkboxes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2 flex items-center gap-1.5">
            <Target size={14} className="text-brand" />
            <span>Primary Growth Goals</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {marketingGoalsList.map((goal) => {
              const isSelected = (customerDetails.marketingGoals || []).includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-brand text-white shadow-sm'
                      : 'bg-[#FAFAFA] text-black/70 hover:bg-black/5 border border-black/5'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes textarea */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2 flex items-center gap-1.5">
            <FileText size={14} className="text-brand" />
            <span>Additional Notes & Context</span>
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about your biggest bottlenecks or specific goals for this session..."
            value={customerDetails.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-black/10 focus:border-brand text-sm font-medium text-[#111111] outline-none transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}
