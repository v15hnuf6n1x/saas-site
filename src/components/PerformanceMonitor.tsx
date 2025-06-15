
import React, { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Check for PerformanceObserver support first
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    // Monitor Core Web Vitals with better error handling
    const observeWebVitals = () => {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((entryList) => {
          try {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            const lcpValue = Math.round(lastEntry.startTime);
            console.log('LCP:', lcpValue, 'ms');
            
            // Track LCP in analytics
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: lcpValue,
              });
            }
          } catch (error) {
            console.warn('LCP measurement error:', error);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          try {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
              const eventEntry = entry as PerformanceEventTiming;
              const fidValue = Math.round(eventEntry.processingStart - eventEntry.startTime);
              console.log('FID:', fidValue, 'ms');
              
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: 'FID',
                  value: fidValue,
                });
              }
            });
          } catch (error) {
            console.warn('FID measurement error:', error);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          try {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
              const layoutShiftEntry = entry as any;
              if (!layoutShiftEntry.hadRecentInput) {
                clsValue += layoutShiftEntry.value;
              }
            });
            const clsScore = Math.round(clsValue * 1000);
            console.log('CLS:', clsScore / 1000);
            
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'CLS',
                value: clsScore,
              });
            }
          } catch (error) {
            console.warn('CLS measurement error:', error);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    };

    // Run performance monitoring
    observeWebVitals();

    // Monitor page load performance with proper error handling
    const handleLoad = () => {
      try {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            
            if (navigation) {
              const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
              if (pageLoadTime > 0) { // Ensure positive value
                console.log('Page Load Time:', Math.round(pageLoadTime), 'ms');
                
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'page_load_time', {
                    event_category: 'Performance',
                    value: Math.round(pageLoadTime),
                  });
                }
              }
            }
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigation) {
              const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
              if (pageLoadTime > 0) {
                console.log('Page Load Time (fallback):', Math.round(pageLoadTime), 'ms');
              }
            }
          }, 0);
        }
      } catch (error) {
        console.warn('Page load measurement error:', error);
      }
    };

    window.addEventListener('load', handleLoad);

    // Cleanup function
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
