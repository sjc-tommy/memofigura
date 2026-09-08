/**
 * GA4 & GTM dataLayer tracking service
 * Adheres to official Google Analytics 4 Ecommerce and Custom Event Schemas.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  payload: Record<string, any>;
}

// In-memory log for the QA/Marketing event debugger inspector
export const eventLog: AnalyticsEvent[] = [];
type EventSubscriber = (event: AnalyticsEvent) => void;
const subscribers: Set<EventSubscriber> = new Set();

export const subscribeToEvents = (fn: EventSubscriber) => {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
};

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  const timestamp = new Date().toISOString();
  const eventPayload = {
    event: eventName,
    ...params,
    event_time: timestamp,
  };

  // Push to official window.dataLayer
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventPayload);
  }

  const loggedEvent: AnalyticsEvent = {
    event: eventName,
    timestamp,
    payload: params,
  };

  eventLog.unshift(loggedEvent);
  if (eventLog.length > 50) eventLog.pop();

  subscribers.forEach((fn) => fn(loggedEvent));

  // Console debug log for developers
  if ((import.meta as any).env?.DEV) {
    console.groupCollapsed(`%c[GA4/GTM]%c ${eventName}`, 'color: #B45309; font-weight: bold;', 'color: inherit;');
    console.log('Payload:', params);
    console.log('Timestamp:', timestamp);
    console.groupEnd();
  }
}

// Pre-defined typed event helpers matching user request
export const analytics = {
  pageView: (pagePath: string, pageTitle: string) => {
    trackEvent('page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: pageTitle,
    });
  },

  viewItem: (item: { id: string; name: string; category: string; price: number }) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: 1,
        },
      ],
    });
  },

  selectItem: (item: { id: string; name: string; category: string; price: number }) => {
    trackEvent('select_item', {
      item_list_name: 'Product Selection',
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
        },
      ],
    });
  },

  uploadPhotoStarted: (source: string = 'file_input') => {
    trackEvent('upload_photo_started', {
      upload_source: source,
    });
  },

  uploadPhotoSuccess: (fileDetails: { sizeBytes: number; fileType: string }) => {
    trackEvent('upload_photo_success', {
      file_size_kb: Math.round(fileDetails.sizeBytes / 1024),
      file_format: fileDetails.fileType,
      status: 'success',
    });
  },

  customizationStarted: (category: string) => {
    trackEvent('customization_started', {
      figurine_category: category,
    });
  },

  customizationCompleted: (config: { category: string; size: string; finish: string; hasEngraving: boolean; price: number }) => {
    trackEvent('customization_completed', {
      figurine_category: config.category,
      figurine_size: config.size,
      figurine_finish: config.finish,
      has_engraving: config.hasEngraving,
      calculated_value: config.price,
    });
  },

  addToCart: (item: { id: string; name: string; category: string; price: number; quantity: number }) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: item.price * item.quantity,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity,
        },
      ],
    });
  },

  beginCheckout: (value: number, itemsCount: number) => {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value,
      items_count: itemsCount,
    });
  },

  purchase: (transactionId: string, value: number, items: any[]) => {
    trackEvent('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value,
      tax: 0,
      shipping: 0,
      items,
    });
  },

  clickCreateYours: (placement: string) => {
    trackEvent('click_create_yours', { placement });
  },

  clickHowItWorks: (placement: string) => {
    trackEvent('click_how_it_works', { placement });
  },

  clickPhotoPrivacy: (placement: string) => {
    trackEvent('click_photo_privacy', { placement });
  },

  viewGallery: (categoryFilter: string) => {
    trackEvent('view_gallery', { category_filter: categoryFilter });
  },

  viewFaq: (questionId: string) => {
    trackEvent('view_faq', { question_id: questionId });
  },
};
