import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  trackingId?: string;
}

export const Analytics = ({ trackingId }: AnalyticsProps) => {
  useEffect(() => {
    if (!trackingId) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: 'Veritas - Professional Verification Services',
      page_location: window.location.href,
    });

    // Track page views
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [trackingId]);

  return null;
};

// Custom event tracking functions for production analytics
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackVerificationSubmission = (verificationTypes: string[], clientKey: string) => {
  trackEvent('verification_submitted', {
    verification_types: verificationTypes.join(','),
    client_key_length: clientKey.length,
    timestamp: new Date().toISOString(),
  });
};

export const trackConnectionTest = (success: boolean, errorMessage?: string) => {
  trackEvent('mie_connection_test', {
    success,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

export const trackRequestStatus = (requestId: string, status: string) => {
  trackEvent('verification_status_change', {
    request_id: requestId,
    status,
    timestamp: new Date().toISOString(),
  });
};