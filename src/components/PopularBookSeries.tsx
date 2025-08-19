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

  if (!branding?.popularBookSeriesImages.length) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Book Series
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {branding.popularBookSeriesImages.map((image, index) => (
            <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={image}
                alt={`Popular book series ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}