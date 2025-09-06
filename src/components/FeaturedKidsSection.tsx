import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleSheetsService, type FeaturedKidData } from '@/services/googleSheets';
import { Link } from 'react-router-dom';

interface FeaturedKidsSectionProps {}

export function FeaturedKidsSection({}: FeaturedKidsSectionProps) {
  const [branding, setBranding] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchBranding = async () => {
      const data = await GoogleSheetsService.getInstance().fetchBrandingData();
      setBranding(data);
    };
    fetchBranding();

    // Check mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!branding?.showFeaturedKids) {
    return null;
  }

  // Prepare featured kids data - filter out empty entries
  const validFeaturedKids = branding.featuredKids?.filter((kid: FeaturedKidData) => 
    kid.name && kid.name.trim() !== ''
  ) || [];

  // Add placeholder if it should be shown and has data
  const allItems = [
    ...validFeaturedKids,
    ...(branding.showPlaceholder && branding.placeholderKid?.name ? [{ ...branding.placeholderKid, isPlaceholder: true }] : [])
  ];

  if (allItems.length === 0) {
    return null;
  }

  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const showNavigation = allItems.length > itemsPerPage;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    return allItems.slice(startIndex, startIndex + itemsPerPage);
  };

  const FeaturedKidCard = ({ kid, isPlaceholder = false }: { kid: FeaturedKidData & { isPlaceholder?: boolean }, isPlaceholder?: boolean }) => (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        {/* Kid's Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
          {kid.image && kid.image !== '/placeholder.svg' ? (
            <img 
              src={kid.image} 
              alt={kid.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {kid.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>

        {/* Kid's Name */}
        <h3 className={`text-lg font-semibold ${isPlaceholder ? 'text-muted-foreground' : 'text-foreground'}`}>
          {kid.name}
        </h3>

        {/* Age */}
        <p className="text-sm text-muted-foreground">
          {kid.age}
        </p>

        {/* Books Read or Explore Button */}
        {isPlaceholder ? (
          <Button asChild className="mt-4">
            <Link to="/books">Explore Books</Link>
          </Button>
        ) : (
          <>
            <p className={`text-sm font-medium ${isPlaceholder ? 'text-muted-foreground' : 'text-primary'}`}>
              Completed reading books from WisdomWings: {kid.booksRead}
            </p>
            
            {/* Book Names */}
            {kid.bookNames && (
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Recent reads:</p>
                <p className="line-clamp-3">
                  {kid.bookNames}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured kids of the season
          </h2>
          <p className="text-lg text-muted-foreground">
            Celebrating our young readers and their reading journey
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {showNavigation && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur"
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Cards Grid */}
          <div className={`grid gap-6 ${!isMobile ? 'md:grid-cols-2' : 'grid-cols-1'} transition-all duration-300`}>
            {getCurrentItems().map((kid, index) => (
              <FeaturedKidCard 
                key={`${kid.name}-${index}`} 
                kid={kid} 
                isPlaceholder={kid.isPlaceholder}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          {showNavigation && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}