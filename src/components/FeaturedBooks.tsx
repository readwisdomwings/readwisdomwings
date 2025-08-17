import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCard } from './BookCard';
import { BookDetailsModal } from './BookDetailsModal';
import { GoogleSheetsService } from '@/services/googleSheets';
import { Link } from 'react-router-dom';
import type { Book } from '@/types/book';
import type { BrandingData } from '@/services/googleSheets';

interface FeaturedBooksProps {
  title: string;
  filterType: 'mostFavourite' | 'frequentlyRented' | 'mostPopular' | 'interestingComics';
}

export function FeaturedBooks({ title, filterType }: FeaturedBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branding, setBranding] = useState<BrandingData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sheetsService = GoogleSheetsService.getInstance();
      const [allBooks, brandingData] = await Promise.all([
        sheetsService.fetchBooks(),
        sheetsService.fetchBrandingData()
      ]);
      
      setBranding(brandingData);
      
      let filteredBooks: Book[] = [];
      
      switch (filterType) {
        case 'mostFavourite':
          filteredBooks = allBooks.filter(book => book.mostFavourite);
          break;
        case 'frequentlyRented':
          filteredBooks = allBooks.filter(book => book.frequentlyRented);
          break;
        case 'mostPopular':
          if (brandingData.mostPopularBooks.length > 0) {
            filteredBooks = allBooks.filter(book => 
              brandingData.mostPopularBooks.includes(book.id)
            );
          } else {
            filteredBooks = allBooks.filter(book => book.totalRentals > 10);
          }
          break;
        case 'interestingComics':
          if (brandingData.interestingComics.length > 0) {
            filteredBooks = allBooks.filter(book => 
              brandingData.interestingComics.includes(book.id)
            );
          } else {
            filteredBooks = allBooks.filter(book => 
              book.category.toLowerCase().includes('comic') || 
              book.category.toLowerCase().includes('graphic')
            );
          }
          break;
        default:
          filteredBooks = [];
      }
      
      setBooks(filteredBooks);
    };

    fetchData();
  }, [filterType]);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, books.length - 1)));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < books.length - 1 ? prev + 1 : 0));
  };

  const handleDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  if (books.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-foreground">{title}</h3>
          <div className="flex items-center space-x-4">
            {books.length > 5 && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  aria-label="Previous book"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentIndex >= books.length - 5}
                  aria-label="Next book"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button variant="outline" asChild>
              <Link to="/books">View More</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {books.slice(currentIndex, currentIndex + 5).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        </div>

        <BookDetailsModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}