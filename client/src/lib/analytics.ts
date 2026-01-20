import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (GA_MEASUREMENT_ID && import.meta.env.PROD) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('Google Analytics initialized');
  }
};

export const trackPageView = (path: string) => {
  if (import.meta.env.PROD) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

// Custom events for your blog
export const trackArticleView = (articleSlug: string, articleTitle: string) => {
  trackEvent('Article', 'View', `${articleSlug} - ${articleTitle}`);
};

export const trackNewsletterSignup = () => {
  trackEvent('Newsletter', 'Signup');
};

export const trackSocialClick = (platform: string) => {
  trackEvent('Social', 'Click', platform);
};