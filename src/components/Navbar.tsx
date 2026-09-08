import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowRight,
  User,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';
import { analytics } from '../services/analytics';
import { useAuth } from '../context/AuthContext';
import { LanguageCurrencySelector } from './LanguageCurrencySelector';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuthModal: (tab?: 'track' | 'login') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleCreateYours = () => {
    analytics.clickCreateYours('navbar_cta');
    handleNav('/custom-3d-figurine');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#EAE4DD] transition-all">
      {/* Top Value Proposition & Western Countries Language/Currency Bar */}
      <div className="bg-[#1A1A1A] text-[#FDFCFB] text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left / Center Guarantee Message */}
          <div className="flex items-center gap-2 text-center sm:text-left tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A66] shrink-0" />
            <span className="text-[#E5E0DA]">
              <strong className="text-white font-medium">Proof Approval Guarantee:</strong> 100% Satisfaction before physical crafting begins
            </span>
            <button
              onClick={() => handleNav('/how-it-works')}
              className="hidden md:inline underline decoration-[#8C7A66] hover:decoration-white ml-1 text-[#D1C7BD] hover:text-white transition-colors cursor-pointer"
            >
              See Process
            </button>
          </div>

          {/* Right: Western Developed Countries Language & Currency Selector */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenAuthModal('track')}
              className="text-[#D1C7BD] hover:text-white transition-colors text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer hidden lg:flex"
            >
              <Truck className="w-3 h-3 text-[#8C7A66]" />
              <span>Track Order</span>
            </button>
            <span className="text-[#444] hidden lg:inline">|</span>
            <LanguageCurrencySelector variant="topbar" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark & Tagline */}
        <div className="flex items-center">
          <button
            onClick={() => handleNav('/')}
            className="text-left group cursor-pointer"
            id="nav-brand-logo"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] block leading-none uppercase">
              MemoFigura
            </span>
            <span className="text-[10px] text-[#8C7A66] tracking-widest uppercase font-sans block mt-1">
              Memories You Can Hold
            </span>
          </button>
        </div>

        {/* Center Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-4 text-[12px] font-medium tracking-wider uppercase text-[#666]">
          <button
            onClick={() => handleNav('/custom-3d-figurine')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/custom-3d-figurine' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            Customize
          </button>

          <button
            onClick={() => handleNav('/how-it-works')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/how-it-works' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            How It Works
          </button>

          <button
            onClick={() => handleNav('/gallery')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/gallery' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            Gallery
          </button>

          <button
            onClick={() => handleNav('/reviews')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/reviews' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            Reviews
          </button>

          <button
            onClick={() => handleNav('/faq')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/faq' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => handleNav('/about')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/about' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNav('/contact')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer py-1 ${
              currentRoute === '/contact' ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Utility Cluster: Account/Tracking, Cart, and Primary CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Customer Account / Sign In / Tracking Button */}
          <button
            onClick={() => onOpenAuthModal(currentUser ? 'login' : 'track')}
            id="nav-account-btn"
            className="flex items-center gap-2 p-2 text-[#1A1A1A] hover:bg-[#F3EEE9] rounded-full sm:rounded-none sm:px-3 sm:py-2 transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold"
            title={currentUser ? `Signed in as ${currentUser.name}` : 'Customer Sign In & Order Tracking'}
          >
            {currentUser ? (
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#8C7A66]"
                />
                <span className="hidden md:inline font-bold text-[#1A1A1A]">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:inline" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#1A1A1A]" />
                <span className="hidden sm:inline">Sign In</span>
              </div>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            id="nav-cart-btn"
            className="relative p-2.5 text-[#1A1A1A] hover:bg-[#F3EEE9] rounded-full transition-colors cursor-pointer"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8C7A66] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={handleCreateYours}
            id="nav-create-yours-btn"
            className="hidden sm:inline-flex items-center justify-center bg-[#1A1A1A] text-white px-5 py-3 text-[12px] font-bold uppercase tracking-widest hover:bg-[#333] transition-all shadow-sm cursor-pointer"
          >
            <span>Create</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F3EEE9] rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE4DD] bg-[#FDFCFB] px-6 py-6 space-y-6 animate-in slide-in-from-top duration-200">
          {/* Customer Account & Order Status Pill for Mobile */}
          <div className="bg-[#FAF8F5] border border-[#EAE4DD] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs">
                {currentUser ? currentUser.name[0] : <User className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-xs font-bold text-[#1A1A1A] block">
                  {currentUser ? currentUser.name : 'Customer Portal'}
                </span>
                <span className="text-[10px] text-[#777] block">
                  {currentUser ? 'Active 3D Proof in Review' : 'Track orders & review 3D proof'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal(currentUser ? 'login' : 'track');
              }}
              className="text-xs uppercase tracking-wider font-bold text-[#8C7A66] border border-[#8C7A66] px-3 py-1 hover:bg-[#8C7A66] hover:text-white transition-colors cursor-pointer"
            >
              {currentUser ? 'Dashboard' : 'Sign In'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1 text-sm font-medium uppercase tracking-wider text-[#1A1A1A]">
            <button
              onClick={() => handleNav('/custom-3d-figurine')}
              className="text-left py-3 border-b border-[#EAE4DD] flex items-center justify-between font-bold"
            >
              <span>Custom 3D Figurine</span>
              <ArrowRight className="w-4 h-4 text-[#8C7A66]" />
            </button>
            <button
              onClick={() => handleNav('/how-it-works')}
              className="text-left py-3 border-b border-[#EAE4DD]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNav('/gallery')}
              className="text-left py-3 border-b border-[#EAE4DD]"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNav('/reviews')}
              className="text-left py-3 border-b border-[#EAE4DD]"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => handleNav('/faq')}
              className="text-left py-3 border-b border-[#EAE4DD]"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNav('/about')}
              className="text-left py-3 border-b border-[#EAE4DD]"
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="text-left py-3 border-b border-[#EAE4DD]"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNav('/refer')}
              className="text-left py-3 border-b border-[#EAE4DD] text-[#8C7A66] font-semibold"
            >
              Refer &amp; Earn
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal('track');
              }}
              className="text-left py-3 border-b border-[#EAE4DD] flex items-center justify-between text-[#8C7A66] font-semibold"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Track Keepsake & 3D Proof</span>
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Country & Currency Switcher */}
          <LanguageCurrencySelector variant="mobile" />

          <div className="space-y-3 pt-2">
            <button
              onClick={handleCreateYours}
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-[12px] font-bold uppercase tracking-widest text-center shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Customizing Your Figurine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <button
                onClick={() => handleNav('/photo-privacy')}
                className="text-xs text-[#888] hover:text-[#1A1A1A] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C7A66]" />
                <span>Photo Privacy & Encryption Policy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
