import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GoogleSheetsService } from '@/services/googleSheets';
import type { BrandingData } from '@/services/googleSheets';

export function HeroSection() {
  const [branding, setBranding] = useState<BrandingData | null>(null);

  useEffect(() => {
    const fetchBranding = async () => {
      const data = await GoogleSheetsService.getInstance().fetchBrandingData();
      setBranding(data);
    };
    fetchBranding();
  }, []);

  return (
    <section className="relative -mt-16 pt-36 pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {branding?.bannerTitle || 'Build reading habits. Read delightful children\'s books.'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                {branding?.bannerSubTitle || 'A friendly, community-powered kids library. Small refundable deposit, low weekly rent, lots of joy.'}
              </p>
            </div>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/books">Explore Collection</Link>
            </Button>
          </div>

          {/* Banner Image */}
          <div className="relative">
            {branding?.bannerImage ? (
              <img
                src={branding.bannerImage}
                alt="Children reading books"
                className="w-full h-auto rounded-2xl no-shadow"
                loading="lazy"
                style={{ aspectRatio: '1600/896' }}
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📚</span>
                  </div>
                  <p className="text-muted-foreground">Beautiful children's reading illustration</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}