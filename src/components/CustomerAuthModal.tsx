import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Package, 
  Eye, 
  User, 
  ArrowRight, 
  Mail, 
  Lock, 
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TrackedOrder } from '../types';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'track' | 'login';
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'track',
}) => {
  const { 
    currentUser, 
    orders, 
    login, 
    loginDemo, 
    logout, 
    trackOrder, 
    approveProof, 
    requestRevision 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'track' | 'login'>(defaultTab);
  
  // Tracking query state
  const [query, setQuery] = useState('MF-88219');
  const [trackedResult, setTrackedResult] = useState<TrackedOrder | null>(() => trackOrder('MF-88219'));
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Revision note state
  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchError(null);
    setActionSuccessMessage(null);
    const result = trackOrder(query);
    if (result) {
      setTrackedResult(result);
    } else {
      setSearchError('No keepsake order found for that Order # or Email. Try "MF-88219" or "MF-74912".');
    }
  };

  const handleApprove = (orderNumber: string) => {
    approveProof(orderNumber);
    setActionSuccessMessage('Proof Approved! Physical 3D curing and hand-detailing is now scheduled.');
    const updated = trackOrder(orderNumber);
    if (updated) setTrackedResult(updated);
  };

  const handleRevisionSubmit = (orderNumber: string) => {
    if (!revisionNotes.trim()) return;
    requestRevision(orderNumber, revisionNotes);
    setActionSuccessMessage('Revision request sent to our 3D sculptors. Updated proof will arrive in 48 hours.');
    setShowRevisionForm(false);
    setRevisionNotes('');
    const updated = trackOrder(orderNumber);
    if (updated) setTrackedResult(updated);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    login(emailInput);
    setActiveTab('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FDFCFB] border border-[#EAE4DD] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Navigation Tabs */}
        <div className="bg-[#FAF8F5] border-b border-[#EAE4DD] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6 text-xs uppercase tracking-widest font-semibold">
            <button
              onClick={() => {
                setActiveTab('track');
                setActionSuccessMessage(null);
              }}
              className={`py-1 cursor-pointer transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'track' 
                  ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                  : 'border-transparent text-[#777] hover:text-[#1A1A1A]'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span>Track Keepsake & 3D Proof</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('login');
                setActionSuccessMessage(null);
              }}
              className={`py-1 cursor-pointer transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'login' 
                  ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                  : 'border-transparent text-[#777] hover:text-[#1A1A1A]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span>{currentUser ? currentUser.name : 'Customer Account'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#777] hover:text-[#1A1A1A] hover:bg-[#EAE4DD]/50 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {actionSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
          )}

          {activeTab === 'track' ? (
            /* TAB 1: ORDER & 3D PROOF TRACKING */
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] tracking-tight">
                  Track Your Custom 3D Keepsake
                </h3>
                <p className="text-xs text-[#666] mt-1">
                  Enter your order number or email to view 3D sculpt proof approval and dispatch updates.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8C7A66] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. MF-88219 or your email"
                    className="w-full bg-[#FAF8F5] border border-[#EAE4DD] text-sm text-[#1A1A1A] pl-10 pr-4 py-3 focus:outline-none focus:border-[#8C7A66]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Lookup
                </button>
              </form>

              {/* Quick sample chips */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#777]">
                <span>Sample orders:</span>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('MF-88219');
                    const res = trackOrder('MF-88219');
                    setTrackedResult(res);
                  }}
                  className="px-2.5 py-1 bg-[#F3EEE9] hover:bg-[#EAE4DD] text-[#1A1A1A] font-mono cursor-pointer border border-[#EAE4DD]"
                >
                  MF-88219 (Proof Ready)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('MF-74912');
                    const res = trackOrder('MF-74912');
                    setTrackedResult(res);
                  }}
                  className="px-2.5 py-1 bg-[#F3EEE9] hover:bg-[#EAE4DD] text-[#1A1A1A] font-mono cursor-pointer border border-[#EAE4DD]"
                >
                  MF-74912 (Shipped DHL)
                </button>
              </div>

              {searchError && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3">
                  {searchError}
                </div>
              )}

              {/* Tracked Order Details Card */}
              {trackedResult && (
                <div className="border border-[#EAE4DD] bg-[#FAF8F5] p-6 space-y-6">
                  {/* Order Top Summary */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE4DD] pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C7A66] block">
                        Order #{trackedResult.orderNumber}
                      </span>
                      <h4 className="font-serif text-lg font-medium text-[#1A1A1A] mt-0.5">
                        {trackedResult.itemsSummary}
                      </h4>
                      <span className="text-xs text-[#777] block mt-0.5">
                        Ordered on {trackedResult.date} • {trackedResult.customerName}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                        ${trackedResult.totalAmount} {trackedResult.currency}
                      </span>
                      <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#1A1A1A] text-white">
                        {trackedResult.status === 'proof_ready' ? 'Proof Ready' : trackedResult.status === 'shipped' ? 'In Transit' : 'In Production'}
                      </span>
                    </div>
                  </div>

                  {/* Visual 5-Stage Stepper */}
                  <div className="py-2">
                    <div className="grid grid-cols-5 gap-1 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1">
                          ✓
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#1A1A1A]">
                          Photo Received
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1">
                          ✓
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#1A1A1A]">
                          3D Modeling
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                          trackedResult.proofApproved 
                            ? 'bg-emerald-600 text-white' 
                            : trackedResult.status === 'proof_ready' 
                            ? 'bg-[#8C7A66] text-white animate-pulse' 
                            : 'bg-[#EAE4DD] text-[#777]'
                        }`}>
                          {trackedResult.proofApproved ? '✓' : '3'}
                        </div>
                        <span className={`text-[9px] uppercase tracking-wider font-semibold ${
                          trackedResult.status === 'proof_ready' ? 'text-[#8C7A66]' : 'text-[#1A1A1A]'
                        }`}>
                          Proof Approval
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                          trackedResult.status === 'production' || trackedResult.status === 'shipped'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#EAE4DD] text-[#777]'
                        }`}>
                          {trackedResult.status === 'shipped' ? '✓' : '4'}
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#777]">
                          Curing & Base
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                          trackedResult.status === 'shipped'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#EAE4DD] text-[#777]'
                        }`}>
                          5
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#777]">
                          Dispatched
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="bg-white border border-[#EAE4DD] p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                      <Clock className="w-4 h-4 text-[#8C7A66]" />
                      <span>{trackedResult.statusLabel}</span>
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed">
                      {trackedResult.statusDescription}
                    </p>
                  </div>

                  {/* 3D Proof Approval Interactive Stage */}
                  {trackedResult.status === 'proof_ready' && (
                    <div className="bg-white border-2 border-[#8C7A66] p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#8C7A66]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                            Your 3D Digital Proof Preview
                          </span>
                        </div>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200 font-bold uppercase tracking-wider">
                          Action Required
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div className="aspect-4/3 overflow-hidden bg-stone-100 border border-[#EAE4DD] relative group">
                          <img
                            src={trackedResult.proofUrl}
                            alt="3D Digital Sculpt Proof"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                            3D Sculpt Proof
                          </span>
                        </div>

                        <div className="space-y-3">
                          <p className="text-xs text-[#555] leading-relaxed">
                            Review the facial proportions, hair styling, posture, and clothing contours. Physical handcrafting begins immediately upon your sign-off.
                          </p>

                          <div className="flex flex-col gap-2 pt-2">
                            <button
                              onClick={() => handleApprove(trackedResult.orderNumber)}
                              className="w-full bg-[#1A1A1A] text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Approve Sculpt & Begin Crafting</span>
                            </button>

                            <button
                              onClick={() => setShowRevisionForm(!showRevisionForm)}
                              className="w-full bg-white text-[#1A1A1A] border border-[#EAE4DD] py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#F3EEE9] transition-colors cursor-pointer"
                            >
                              Request Free Revision
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Revision Input Box */}
                      {showRevisionForm && (
                        <div className="mt-4 pt-4 border-t border-[#EAE4DD] space-y-3 animate-in fade-in">
                          <label className="text-xs font-semibold text-[#1A1A1A] block">
                            Tell our 3D sculptor what adjustments you would like:
                          </label>
                          <textarea
                            value={revisionNotes}
                            onChange={(e) => setRevisionNotes(e.target.value)}
                            placeholder="e.g. Please soften the jawline slightly and adjust the hair length on the left side..."
                            rows={3}
                            className="w-full bg-[#FAF8F5] border border-[#EAE4DD] p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C7A66]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setShowRevisionForm(false)}
                              className="px-4 py-2 text-xs text-[#777] hover:text-[#1A1A1A] cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleRevisionSubmit(trackedResult.orderNumber)}
                              className="px-5 py-2 bg-[#8C7A66] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#726251] cursor-pointer"
                            >
                              Submit Adjustment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shipped Tracking Details */}
                  {trackedResult.status === 'shipped' && (
                    <div className="bg-white border border-[#EAE4DD] p-4 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7A66] block">
                          Courier & Tracking
                        </span>
                        <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">
                          {trackedResult.carrier}: <span className="font-mono">{trackedResult.trackingNumber}</span>
                        </p>
                        <span className="text-xs text-[#777] block mt-0.5">
                          Estimated Delivery: {trackedResult.estimatedDelivery}
                        </span>
                      </div>

                      <a
                        href={`https://www.dhl.com/en/express/tracking.html?AWB=${trackedResult.trackingNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#333] transition-colors"
                      >
                        <span>Track on DHL</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* TAB 2: CUSTOMER ACCOUNT / SIGN IN */
            <div className="space-y-6">
              {currentUser ? (
                /* LOGGED IN CUSTOMER DASHBOARD */
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#EAE4DD] pb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#EAE4DD]"
                      />
                      <div>
                        <h4 className="font-serif text-lg font-medium text-[#1A1A1A]">
                          Welcome, {currentUser.name}
                        </h4>
                        <span className="text-xs text-[#777]">{currentUser.email}</span>
                      </div>
                    </div>

                    <button
                      onClick={logout}
                      className="text-xs uppercase tracking-wider text-[#888] hover:text-[#1A1A1A] border border-[#EAE4DD] px-3 py-1.5 hover:bg-[#F3EEE9] cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>

                  {/* Customer Orders in Progress */}
                  <div>
                    <h5 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] mb-3">
                      Your Active Custom Keepsakes ({orders.length})
                    </h5>

                    <div className="space-y-3">
                      {orders.map((o) => (
                        <div
                          key={o.orderNumber}
                          className="bg-[#FAF8F5] border border-[#EAE4DD] p-4 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={o.photoUrl}
                              alt="Photo Reference"
                              className="w-12 h-12 object-cover border border-[#EAE4DD]"
                            />
                            <div>
                              <span className="text-xs font-bold text-[#1A1A1A] block">
                                {o.orderNumber} • {o.itemsSummary}
                              </span>
                              <span className="text-[11px] text-[#8C7A66] font-medium block">
                                Status: {o.statusLabel}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab('track');
                              setQuery(o.orderNumber);
                              setTrackedResult(o);
                            }}
                            className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#8C7A66] hover:border-[#8C7A66] cursor-pointer shrink-0"
                          >
                            View 3D Proof →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Profile Meta */}
                  <div className="bg-[#FAF8F5] border border-[#EAE4DD] p-4 text-xs text-[#666] space-y-2">
                    <div className="flex justify-between">
                      <span>Customer Tier:</span>
                      <strong className="text-[#1A1A1A]">Verified Keepsake Collector</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Photo Privacy Status:</span>
                      <strong className="text-emerald-700">100% Encrypted & Private</strong>
                    </div>
                  </div>
                </div>
              ) : (
                /* SIGN IN FORM */
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] tracking-tight">
                      Customer Sign In
                    </h3>
                    <p className="text-xs text-[#666] mt-1">
                      Sign in to track your 3D digital proof, approve sculpt revisions, and review past orders.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8C7A66] absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#FAF8F5] border border-[#EAE4DD] text-sm text-[#1A1A1A] pl-10 pr-4 py-3 focus:outline-none focus:border-[#8C7A66]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#8C7A66] absolute left-3.5 top-3.5" />
                        <input
                          type="password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#FAF8F5] border border-[#EAE4DD] text-sm text-[#1A1A1A] pl-10 pr-4 py-3 focus:outline-none focus:border-[#8C7A66]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-colors cursor-pointer shadow-sm"
                    >
                      Sign In to Account
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="border-t border-[#EAE4DD] w-full" />
                    <span className="bg-[#FDFCFB] px-3 text-[11px] uppercase tracking-wider text-[#888] absolute">
                      Or Quick Demo
                    </span>
                  </div>

                  {/* 1-Click Demo Login Button */}
                  <button
                    type="button"
                    onClick={() => {
                      loginDemo();
                      setActionSuccessMessage('Signed in as demo customer (Sarah Miller). You have 1 active 3D proof awaiting review!');
                    }}
                    className="w-full bg-[#F3EEE9] hover:bg-[#EAE4DD] text-[#1A1A1A] border border-[#EAE4DD] py-3 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#8C7A66]" />
                    <span>Quick Sign In as Customer (Sarah M. - Active Order)</span>
                  </button>

                  <div className="pt-2 text-center text-[11px] text-[#777]">
                    <span>Don't have an account yet? It is automatically created when you place your first custom keepsake order.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Reassurance */}
        <div className="bg-[#FAF8F5] border-t border-[#EAE4DD] px-6 py-3 flex items-center justify-between text-[11px] text-[#777]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Customer data encrypted & strictly private
          </span>
          <span>1-to-1 Artisan Communication</span>
        </div>
      </div>
    </div>
  );
};
