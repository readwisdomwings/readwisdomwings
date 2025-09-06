import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { FeaturedBooks } from '@/components/FeaturedBooks';
import { HowItWorks } from '@/components/HowItWorks';
import { PopularBookSeries } from '@/components/PopularBookSeries';
import { ContactSection } from '@/components/ContactSection';
import { FeaturedKidsSection } from '@/components/FeaturedKidsSection';
import { GoogleSheetsService } from '@/services/googleSheets';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Pre-load data to avoid loading state on individual components
        await GoogleSheetsService.getInstance().fetchBrandingData();
        await GoogleSheetsService.getInstance().fetchBooks();
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <FeaturedBooks title="Most Popular" sectionKey="section1" />
      <FeaturedBooks title="Interesting Comics" sectionKey="section2" />
      <FeaturedBooks title="Books for Everyone" sectionKey="section3" />
      <PopularBookSeries />
      <FeaturedKidsSection />
      <HowItWorks />
      <ContactSection />
    </Layout>
  );
};

export default Index;