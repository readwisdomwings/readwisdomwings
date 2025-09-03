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
    <section className="relative bg-gradient-to-br from-fun-purple/10 via-background to-fun-orange/10 py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="page-title fun-gradient-text">
                {branding?.bannerTitle || 'Build reading habits. Read delightful children\'s books.'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                {branding?.bannerSubTitle || 'A friendly, community-powered kids library. Small refundable deposit, low weekly rent, lots of joy.'}
              </p>
            </div>
            <Button size="lg" variant="fun" asChild className="text-lg px-8 py-4">
              <Link to="/books">🚀 Explore Collection</Link>
            </Button>
          </div>

          {/* Banner Image */}
          <div className="relative">
            {branding?.bannerImage ? (
              <div className="relative">
                <img
                  src={branding.bannerImage}
                  alt="Children reading books"
                  className="w-full h-auto rounded-3xl shadow-2xl playful-glow"
                  loading="lazy"
                  style={{ aspectRatio: '1600/896' }}
                />
                <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌟</div>
                <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">📚</div>
              </div>
            ) : (
              <div className="w-full h-96 bg-gradient-fun rounded-3xl flex items-center justify-center playful-glow relative overflow-hidden">
                <div className="text-center space-y-6 relative z-10">
                  <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center playful-bounce">
                    <span className="text-6xl">📚</span>
                  </div>
                  <p className="text-white text-lg font-medium">Beautiful children's reading illustration</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}