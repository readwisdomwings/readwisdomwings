import { useEffect } from 'react';
import { GoogleSheetsService } from '@/services/googleSheets';

export function FaviconUpdater() {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const branding = await GoogleSheetsService.getInstance().fetchBrandingData();
        if (branding?.logo && branding.logo !== '/placeholder.svg') {
          const faviconLink = document.getElementById('favicon') as HTMLLinkElement;
          if (faviconLink) {
            faviconLink.href = branding.logo;
            faviconLink.type = 'image/png';
          }
        }
      } catch (error) {
        console.error('Failed to update favicon:', error);
      }
    };

    updateFavicon();
  }, []);

  return null;
}