import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  path?: string;
}

/**
 * Custom hook to dynamically manage document head metadata and social tags (OpenGraph and Twitter / X)
 */
export function useSeo({ title, description, image, type = 'website', path = '' }: SeoProps) {
  useEffect(() => {
    // 1. Update standard document title
    const prevTitle = document.title;
    document.title = title;

    // Helper to find or create meta elements in the head
    const updateOrCreateMeta = (attributeName: 'name' | 'property', attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Resolve image and canonical URL
    const currentOrigin = window.location.origin;
    const currentUrl = currentOrigin + path;

    // Default share image fallback is the clean brand logo/emblem
    let resolvedImage = currentOrigin + '/1000008392-removebg-preview.png';
    if (image) {
      if (image.startsWith('http') || image.startsWith('//')) {
        resolvedImage = image;
      } else {
        // Handle absolute or relative paths gracefully
        resolvedImage = currentOrigin + (image.startsWith('/') ? '' : '/') + image;
      }
    }

    // 3. Update Standard Meta Description
    updateOrCreateMeta('name', 'description', description);

    // 4. Update OpenGraph (Facebook, Telegram, LinkedIn, Slack, Discord)
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:image', resolvedImage);
    updateOrCreateMeta('property', 'og:url', currentUrl);
    updateOrCreateMeta('property', 'og:type', type);
    updateOrCreateMeta('property', 'og:site_name', 'Aluvantis');

    // 5. Update Twitter / X Cards
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:image', resolvedImage);

    // Restoration on cleanup to prevent stale tag leaking across pages
    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, type, path]);
}
