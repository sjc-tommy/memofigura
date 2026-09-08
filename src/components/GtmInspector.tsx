import React, { useState, useEffect } from 'react';
import { Activity, X, ChevronRight, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { eventLog, subscribeToEvents, AnalyticsEvent } from '../services/analytics';

export const GtmInspector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([...eventLog]);
  const [selectedEvent, setSelectedEvent] = useState<AnalyticsEvent | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((newEvent) => {
      setEvents((prev) => [newEvent, ...prev].slice(0, 50));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#1C1917] text-white text-xs font-mono px-3.5 py-2 rounded-full shadow-lg border border-stone-700 hover:bg-stone-800 transition-all cursor-pointer group"
          title="Inspect live GA4 and GTM dataLayer events"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-[11px]">GA4 / GTM dataLayer</span>
          <span className="text-stone-400 text-[10px] bg-stone-800 px-1.5 py-0.5 rounded">
            {events.length}
          </span>
        </button>
      </div>

      {/* Slide-in Inspector Modal/Panel */}
      {isOpen && (
        <div className="fixed bottom-16 left-4 z-50 w-96 max-w-[calc(100vw-2rem)] max-h-[500px] bg-white rounded-2xl border border-[#E8E2D9] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-150">
          {/* Header */}
          <div className="p-3.5 bg-[#1C1917] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold">Live dataLayer Stream</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-white rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2 bg-stone-50 border-b border-stone-200 text-[11px] text-[#78716C]">
            Real-time feed for Google Ads & SEO event validation.
          </div>

          {/* Events Stream */}
          <div className="flex-1 overflow-y-auto p-2 divide-y divide-stone-100 font-mono text-xs">
            {events.length === 0 ? (
              <div className="p-6 text-center text-[#78716C] text-xs">
                No events recorded yet. Navigate or click CTAs to trigger.
              </div>
            ) : (
              events.map((ev, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedEvent(selectedEvent === ev ? null : ev)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                    selectedEvent === ev ? 'bg-amber-50/80 border border-amber-200' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1C1917] text-[11px]">
                      {ev.event}
                    </span>
                    <span className="text-[9px] text-[#A8A29E]">
                      {new Date(ev.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  {selectedEvent === ev && (
                    <pre className="mt-2 p-2 bg-stone-900 text-emerald-300 rounded text-[10px] overflow-x-auto leading-tight">
                      {JSON.stringify(ev.payload, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-2 bg-[#FAF8F5] border-t border-[#E8E2D9] text-[10px] text-center text-[#78716C]">
            window.dataLayer.push() active • Complies with GA4 E-commerce spec
          </div>
        </div>
      )}
    </>
  );
};
