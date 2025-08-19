import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { FeaturedBooks } from '@/components/FeaturedBooks';
import { HowItWorks } from '@/components/HowItWorks';
import { PopularBookSeries } from '@/components/PopularBookSeries';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <FeaturedBooks title="Most Popular" sectionKey="section1" />
      <FeaturedBooks title="Interesting Comics" sectionKey="section2" />
      <FeaturedBooks title="Books for Everyone" sectionKey="section3" />
      <HowItWorks />
      <PopularBookSeries />
    </Layout>
  );
};

export default Index;