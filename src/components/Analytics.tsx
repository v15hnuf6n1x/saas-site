
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking ID - replace with your actual GA4 tracking ID
const GA_TRACKING_ID = 'G-XXXXXXXXXX';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `;
      document.head.appendChild(configScript);

      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default Analytics;

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters: object = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value || 1,
    });
  }
};
