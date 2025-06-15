
import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Track LCP in analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
          });
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const eventEntry = entry as PerformanceEventTiming;
          console.log('FID:', eventEntry.processingStart - eventEntry.startTime);
          
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(eventEntry.processingStart - eventEntry.startTime),
            });
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as any; // Using any for layout-shift as it's not in standard types
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });
        console.log('CLS:', clsValue);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000),
          });
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Run performance monitoring
    if ('PerformanceObserver' in window) {
      observeWebVitals();
    }

    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        console.log('Page Load Time:', pageLoadTime);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            value: Math.round(pageLoadTime),
          });
        }
      }
    });
  }, []);

  return null;
};

export default PerformanceMonitor;
