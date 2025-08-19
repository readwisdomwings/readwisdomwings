import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookCard } from './BookCard';
import { BookDetailsModal } from './BookDetailsModal';
import { GoogleSheetsService } from '@/services/googleSheets';
import { Link } from 'react-router-dom';
import type { Book } from '@/types/book';
import type { BrandingData } from '@/services/googleSheets';

interface FeaturedBooksProps {
  title: string;
  sectionKey: 'section1' | 'section2' | 'section3';
}

export function FeaturedBooks({ title, sectionKey }: FeaturedBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
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
      
      // Get the book IDs for this section
      const sectionBooks = getSectionBooks(brandingData, sectionKey);
      
      // Filter books based on the IDs
      const filteredBooks = allBooks.filter(book => 
        sectionBooks.includes(book.id)
      );
      
      setBooks(filteredBooks);
    };

    fetchData();
  }, [sectionKey]);

  const getSectionBooks = (branding: BrandingData, key: string): string[] => {
    switch (key) {
      case 'section1':
        return branding.section1Books;
      case 'section2':
        return branding.section2Books;
      case 'section3':
        return branding.section3Books;
      default:
        return [];
    }
  };

  const getSectionName = (branding: BrandingData, key: string): string => {
    switch (key) {
      case 'section1':
        return branding.section1Name;
      case 'section2':
        return branding.section2Name;
      case 'section3':
        return branding.section3Name;
      default:
        return title;
    }
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

  const displayTitle = branding ? getSectionName(branding, sectionKey) : title;

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-foreground">{displayTitle}</h3>
          <Button variant="outline" asChild>
            <Link to="/books">Show more</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {books.slice(0, 5).map((book) => (
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