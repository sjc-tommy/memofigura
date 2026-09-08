import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SitemapModal } from './components/SitemapModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { LocaleProvider } from './context/LocaleContext';
import { AuthProvider } from './context/AuthContext';
import { SiteTranslator } from './components/SiteTranslator';

import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CategoryLandingPage } from './pages/CategoryLandingPage';
import { GalleryPage } from './pages/GalleryPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { PhotoPrivacyPage } from './pages/PhotoPrivacyPage';
import { TrustInfoPages } from './pages/TrustInfoPages';
import { BlogPage } from './pages/BlogPage';
import { ReferPage } from './pages/ReferPage';

import { PageRoute, CartItem, FigurineCategory } from './types';
import { updatePageHead } from './services/seo';
import { analytics } from './services/analytics';

const CART_STORAGE_KEY = 'memofigura_cart_v1';

export default function App() {
  // Routing state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    const path = window.location.pathname as PageRoute;
    const validRoutes: PageRoute[] = [
      '/',
      '/custom-3d-figurine',
      '/custom-pet-figurine',
      '/custom-couple-figurine',
      '/custom-family-figurine',
      '/gifts',
      '/wedding-gifts',
      '/anniversary-gifts',
      '/birthday-gifts',
      '/pet-memorial',
      '/gallery',
      '/how-it-works',
      '/reviews',
      '/faq',
      '/photo-privacy',
      '/shipping',
      '/returns',
      '/about',
      '/contact',
      '/refer',
      '/blog',
    ];
    return validRoutes.includes(path) ? path : '/';
  });

  // Selected Category for Customizer (if navigated with pre-selection)
  const [selectedCategory, setSelectedCategory] = useState<FigurineCategory>('couple');

  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'track' | 'login'>('track');

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO Head & JSON-LD & GA4 page_view on route change
  useEffect(() => {
    updatePageHead(currentRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Navigate Handler
  const navigateTo = (route: PageRoute) => {
    if (route === currentRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      window.history.pushState({}, '', route);
    } catch {
      // In restricted iframe environments fallback
    }

    setCurrentRoute(route);
  };

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [item, ...prev]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleInstantCheckout = (item: CartItem) => {
    setCart((prev) => [item, ...prev]);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Category selection handler from homepage showcase
  const handleSelectCategoryFromHome = (cat: string) => {
    setSelectedCategory(cat as FigurineCategory);
    navigateTo('/custom-3d-figurine');
  };

  return (
    <LocaleProvider>
      <SiteTranslator />
      <AuthProvider>
        <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#8C7A66] selection:text-white">
          
          {/* Main Navigation with integrated Western Countries Locale Selector & Auth/Tracking */}
          <Navbar
            currentRoute={currentRoute}
            cartCount={cart.length}
            onNavigate={navigateTo}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuthModal={(tab) => {
              setAuthModalTab(tab || 'track');
              setIsAuthModalOpen(true);
            }}
          />

          {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectCategory={handleSelectCategoryFromHome}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentRoute === '/custom-3d-figurine' && (
          <ProductPage
            initialCategory={selectedCategory}
            onAddToCart={handleAddToCart}
            onInstantCheckout={handleInstantCheckout}
          />
        )}

        {(currentRoute === '/custom-pet-figurine' ||
          currentRoute === '/custom-couple-figurine' ||
          currentRoute === '/custom-family-figurine' ||
          currentRoute === '/gifts' ||
          currentRoute === '/wedding-gifts' ||
          currentRoute === '/anniversary-gifts' ||
          currentRoute === '/birthday-gifts' ||
          currentRoute === '/pet-memorial') && (
          <CategoryLandingPage
            route={currentRoute}
            onAddToCart={handleAddToCart}
            onInstantCheckout={handleInstantCheckout}
          />
        )}

        {currentRoute === '/gallery' && (
          <GalleryPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/how-it-works' && (
          <HowItWorksPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/reviews' && (
          <ReviewsPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/faq' && (
          <FaqPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/photo-privacy' && (
          <PhotoPrivacyPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/shipping' && (
          <TrustInfoPages type="shipping" onNavigate={navigateTo} />
        )}

        {currentRoute === '/returns' && (
          <TrustInfoPages type="returns" onNavigate={navigateTo} />
        )}

        {currentRoute === '/about' && (
          <TrustInfoPages type="about" onNavigate={navigateTo} />
        )}

        {currentRoute === '/contact' && (
          <TrustInfoPages type="contact" onNavigate={navigateTo} />
        )}

        {currentRoute === '/refer' && (
          <ReferPage onNavigate={navigateTo} />
        )}

        {currentRoute === '/blog' && (
          <BlogPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onOpenTrackOrder={() => {
          setAuthModalTab('track');
          setIsAuthModalOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={handleOrderComplete}
      />

      {/* Google SEO Sitemap Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Customer Account & Keepsake Tracking Modal */}
      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

        </div>
      </AuthProvider>
    </LocaleProvider>
  );
}
