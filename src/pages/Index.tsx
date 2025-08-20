import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { FeaturedBooks } from '@/components/FeaturedBooks';
import { HowItWorks } from '@/components/HowItWorks';
import { PopularBookSeries } from '@/components/PopularBookSeries';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <FeaturedBooks title="Most Popular" sectionKey="section1" />
      <FeaturedBooks title="Interesting Comics" sectionKey="section2" />
      <FeaturedBooks title="Books for Everyone" sectionKey="section3" />
      <PopularBookSeries />
      <HowItWorks />
      <ContactSection />
    </Layout>
  );
};

export default Index;