import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Receipt, ShieldCheck, Zap, Download, Home } from 'lucide-react';
import { getCheckoutSession, type CheckoutSessionDetails } from '../api/billing';
import { Spinner } from '@/components/ui';

export const BillingSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  
  const [session, setSession] = useState<CheckoutSessionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      navigate('/dashboard/billing');
      return;
    }

    const fetchSession = async () => {
      try {
        const data = await getCheckoutSession(sessionId);
        setSession(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to retrieve session details');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ui-bg flex flex-col items-center justify-center p-6">
        <div className="relative">
            <div className="absolute inset-0 bg-black/5 blur-3xl rounded-full scale-150 animate-pulse" />
            <Spinner className="w-12 h-12 text-black relative z-10" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-ui-muted animate-pulse">
            Verifying Transaction...
        </p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-ui-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center text-destructive mb-6">
            <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter uppercase mb-2">Something went wrong</h1>
        <p className="text-ui-muted font-medium mb-8 max-w-xs">{error || 'We could not verify your purchase.'}</p>
        <Link 
            to="/dashboard/billing" 
            className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
        >
            Return to Billing
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ui-bg py-20 px-6 flex flex-col items-center">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-success/5 blur-[120px] rounded-full -z-10" />

      {/* Success Hero */}
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-success/10 rounded-full mb-8 relative">
            <div className="absolute inset-0 bg-success/20 blur-xl rounded-full animate-pulse" />
            <CheckCircle2 className="w-12 h-12 text-success relative z-10" />
        </div>
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-4 leading-none text-ui-text">
            Welcome to the Pro Tier
        </h1>
        <p className="text-ui-muted font-bold tracking-tight opacity-40 text-sm max-w-md mx-auto">
            Your payment was successful and your workspace limits have been updated instantly.
        </p>
      </div>

      {/* Invoice Card */}
      <div className="w-full max-w-xl bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-2xl shadow-black/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="p-10 border-b border-ui-border bg-black/[0.01]">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-ui-muted opacity-30" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted">Transaction Receipt</span>
                </div>
                <div className="px-3 py-1 bg-success/10 rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-success">Paid</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40 mb-1">Plan Subscribed</div>
                        <div className="text-2xl font-black tracking-tighter uppercase text-ui-text">{session.plan_name || 'Pro Plan'}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40 mb-1">Total Amount</div>
                        <div className="text-4xl font-black tracking-tighter text-ui-text">
                            ${(session.amount_total / 100).toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-ui-border grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40 mb-1.5">Billing Email</div>
                        <div className="text-[11px] font-bold text-ui-text">{session.customer_email}</div>
                    </div>
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40 mb-1.5">Reference ID</div>
                        <div className="text-[11px] font-bold text-ui-text font-mono truncate">{session.id.slice(0, 16)}...</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6 bg-black/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-success" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted">All limits increased</span>
            </div>
            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-ui-muted hover:text-black transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
            </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <Link 
            to="/dashboard" 
            className="group flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
        >
            <Home className="w-4 h-4" />
            Go to Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
            to="/dashboard/billing" 
            className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted hover:text-black transition-colors border-b border-ui-border pb-1"
        >
            View Subscription Details
        </Link>
      </div>
    </div>
  );
};
