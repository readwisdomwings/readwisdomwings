import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCard } from './BookCard';
import { BookDetailsModal } from './BookDetailsModal';
import { GoogleSheetsService } from '@/services/googleSheets';
import type { Book } from '@/types/book';

interface FeaturedBooksProps {
  title: string;
  filterType: 'mostFavourite' | 'frequentlyRented' | 'mostPopular';
}

export function FeaturedBooks({ title, filterType }: FeaturedBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await GoogleSheetsService.getInstance().fetchBooks();
      const filteredBooks = allBooks.filter(book => {
        switch (filterType) {
          case 'mostFavourite':
            return book.mostFavourite;
          case 'frequentlyRented':
            return book.frequentlyRented;
          case 'mostPopular':
            return book.totalRentals > 10;
          default:
            return false;
        }
      });
      setBooks(filteredBooks);
    };

    fetchBooks();
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        {books.length > 1 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={books.length <= 1}
              aria-label="Previous book"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={books.length <= 1}
              aria-label="Next book"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.slice(currentIndex, currentIndex + 3).map((book) => (
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
  );
}