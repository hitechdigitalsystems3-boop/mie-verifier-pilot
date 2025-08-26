import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Production: Page not found - redirect to home or show 404
  useEffect(() => {
    // Production: Analytics tracking for 404 errors
    if (location.pathname !== '/' && typeof window !== 'undefined') {
      // Track 404 errors for analytics (gtag will be available if Google Analytics is configured)
      const gtag = (window as any).gtag;
      if (gtag && typeof gtag === 'function') {
        gtag('event', 'page_not_found', {
          page_path: location.pathname
        });
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
