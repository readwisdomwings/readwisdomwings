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
      <FeaturedBooks title="Most Popular" filterType="mostPopular" />
      <FeaturedBooks title="Interesting Comics" filterType="interestingComics" />
      <PopularBookSeries />
      <HowItWorks />
    </Layout>
  );
};

export default Index;