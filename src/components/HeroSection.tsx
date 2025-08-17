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
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Build reading habits.{' '}
                <span className="text-primary">Borrow delightful</span>{' '}
                children's books in your society.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Nurture young minds with carefully curated children's books. Rent weekly. 
                Build lifelong reading habits. Create unforgettable memories.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/books">Browse Collection</Link>
            </Button>
          </div>

          {/* Illustration */}
          <div className="relative">
            {branding?.bannerImage ? (
              <img
                src={branding.bannerImage}
                alt="Children reading books"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
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