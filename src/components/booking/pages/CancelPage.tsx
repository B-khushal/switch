import React, { useState } from 'react';
import BookingLayout from './BookingLayout';
import { useNavigate } from '../../../router/router';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function CancelPage() {
  const navigate = useNavigate();
  const [cancelled, setCancelled] = useState(false);
  const [reason, setReason] = useState('');

  const handleConfirmCancel = () => {
    setCancelled(true);
  };

  return (
    <BookingLayout currentStepIndex={1} stepTitle="Cancel Session" showFooterControls={false}>
      <div className="max-w-md mx-auto bg-white p-8 rounded-[28px] border border-black/5 shadow-xl space-y-6 text-center">
        {!cancelled ? (
          <>
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#111111]">Cancel Booking</h3>
              <p className="text-xs text-black/60 mt-1">
                Are you sure you want to cancel your upcoming session?
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-black/70 text-left mb-1.5 uppercase tracking-wider">
                Reason for cancellation (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Let us know why you are cancelling..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 text-xs font-medium outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="w-1/2 py-3 rounded-xl bg-[#FAFAFA] text-black/70 font-bold text-xs border border-black/10"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="w-1/2 py-3 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md"
              >
                Confirm Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#111111]">Booking Cancelled</h3>
            <p className="text-xs text-black/60">
              Your meeting reservation has been cancelled. A confirmation email has been dispatched.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#111111] text-white font-bold text-xs uppercase tracking-wider"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </BookingLayout>
  );
}
