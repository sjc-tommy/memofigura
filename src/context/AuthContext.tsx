import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser, TrackedOrder } from '../types';

export const INITIAL_MOCK_ORDERS: TrackedOrder[] = [
  {
    orderNumber: 'MF-88219',
    date: 'Sep 3, 2026',
    customerEmail: 'sarah.m@example.com',
    customerName: 'Sarah Miller',
    itemsSummary: 'Custom Couple Keepsake (7.9") on Solid Walnut Base',
    totalAmount: 184,
    currency: 'USD',
    status: 'proof_ready',
    statusLabel: '3D Digital Proof Ready for Approval',
    statusDescription: 'Our 3D digital sculptors have completed your piece. Please inspect the facial likeness, clothing texture, and stance before we begin physical curing.',
    proofUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    proofApproved: false,
    shippingAddress: '452 Elm Street, Seattle, WA 98101',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
  },
  {
    orderNumber: 'MF-74912',
    date: 'Aug 28, 2026',
    customerEmail: 'david.c@example.com',
    customerName: 'David Chen',
    itemsSummary: 'Custom Pet Figure (2.8") - Golden Retriever',
    totalAmount: 89,
    currency: 'USD',
    status: 'shipped',
    statusLabel: 'In Transit with DHL Express',
    statusDescription: 'Your figurine has been cured, hand-detailed, and packed in our custom gift box. Tracking number: DHL-9400109202381.',
    trackingNumber: 'DHL-9400109202381',
    carrier: 'DHL Express',
    estimatedDelivery: 'Sep 10, 2026',
    proofApproved: true,
    shippingAddress: '88 King St W, Toronto, ON M5H 1J9, Canada',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
  },
];

interface AuthContextValue {
  currentUser: CustomerUser | null;
  orders: TrackedOrder[];
  login: (email: string, name?: string) => void;
  loginDemo: () => void;
  logout: () => void;
  trackOrder: (query: string) => TrackedOrder | null;
  approveProof: (orderNumber: string) => void;
  requestRevision: (orderNumber: string, feedback: string) => void;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  orders: INITIAL_MOCK_ORDERS,
  login: () => {},
  loginDemo: () => {},
  logout: () => {},
  trackOrder: () => null,
  approveProof: () => {},
  requestRevision: () => {},
});

const AUTH_STORAGE_KEY = 'memofigura_customer_user';
const ORDERS_STORAGE_KEY = 'memofigura_customer_orders';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<TrackedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const login = (email: string, name?: string) => {
    const derivedName = name || email.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase());
    const user: CustomerUser = {
      id: `usr-${Date.now()}`,
      email: email.trim().toLowerCase(),
      name: derivedName,
      avatar: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80`,
      joinedDate: 'September 2026',
      ordersCount: 1,
    };
    setCurrentUser(user);
  };

  const loginDemo = () => {
    const demoUser: CustomerUser = {
      id: 'usr-demo-sarah',
      email: 'sarah.m@example.com',
      name: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (206) 555-0192',
      joinedDate: 'August 2026',
      ordersCount: 2,
    };
    setCurrentUser(demoUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const trackOrder = (query: string): TrackedOrder | null => {
    const clean = query.trim().toLowerCase();
    if (!clean) return null;
    return (
      orders.find(
        (o) =>
          o.orderNumber.toLowerCase() === clean ||
          o.customerEmail.toLowerCase() === clean ||
          (o.trackingNumber && o.trackingNumber.toLowerCase() === clean)
      ) || null
    );
  };

  const approveProof = (orderNumber: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderNumber === orderNumber) {
          return {
            ...o,
            status: 'production',
            statusLabel: 'Physical Handcrafting & Curing',
            statusDescription: 'Proof approved by customer! Our artisans are now high-resolution 3D curing and hand-detailing your figurine.',
            proofApproved: true,
          };
        }
        return o;
      })
    );
  };

  const requestRevision = (orderNumber: string, feedback: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderNumber === orderNumber) {
          return {
            ...o,
            status: 'sculpting',
            statusLabel: 'Artisan Adjusting 3D Sculpt',
            statusDescription: `Revision requested: "${feedback}". Our master sculptors will send an updated proof within 48 hours.`,
            proofApproved: false,
          };
        }
        return o;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        orders,
        login,
        loginDemo,
        logout,
        trackOrder,
        approveProof,
        requestRevision,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
