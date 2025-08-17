import { useState, useEffect } from 'react';
import { GoogleSheetsService } from '@/services/googleSheets';
import type { BrandingData } from '@/services/googleSheets';

export function PopularBookSeries() {
  const [branding, setBranding] = useState<BrandingData | null>(null);

  useEffect(() => {
    const fetchBranding = async () => {
      const data = await GoogleSheetsService.getInstance().fetchBrandingData();
      setBranding(data);
    };
    fetchBranding();
  }, []);

  if (!branding?.popularBookSeries.length) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Book Series
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover exciting book series that kids love to read
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {branding.popularBookSeries.map((series, index) => (
            <div key={index} className="text-center space-y-4">
              {branding.popularBookSeriesImages[index] && (
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={branding.popularBookSeriesImages[index]}
                    alt={series}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="font-semibold text-foreground">{series}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}