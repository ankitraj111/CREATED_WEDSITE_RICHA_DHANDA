"use client";

import { useEffect, useState } from 'react';

interface RazorpayPaymentProps {
  amount: number;
  description: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: any) => void;
  buttonText?: string;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayPayment({
  amount,
  description,
  onSuccess,
  onFailure,
  buttonText = "Pay Now",
  className = ""
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      alert('Payment gateway is loading. Please try again.');
      return;
    }

    setLoading(true);

    try {
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency: 'INR',
        }),
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Advocate Richa Dhanda',
        description: description,
        image: '/advocate-richa-new.jpg',
        order_id: order.id,
        handler: function (response: any) {
          // Payment success
          setLoading(false);
          if (onSuccess) {
            onSuccess(response.razorpay_payment_id);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          service: description,
        },
        theme: {
          color: '#d4af37'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setLoading(false);
        if (onFailure) {
          onFailure(response.error);
        }
      });

      rzp.open();
    } catch (error) {
      setLoading(false);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className={`
        relative inline-flex items-center justify-center gap-2 px-6 py-3 
        font-semibold text-white bg-gradient-to-r from-[#d4af37] to-[#c9a030] 
        rounded-lg hover:from-[#c9a030] hover:to-[#d4af37] 
        transition-all duration-300 hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
}