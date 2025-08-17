import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { BookCard } from '@/components/BookCard';
import { BookDetailsModal } from '@/components/BookDetailsModal';
import { GoogleSheetsService } from '@/services/googleSheets';
import { Loader2, BookOpen } from 'lucide-react';

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const sheetsService = GoogleSheetsService.getInstance();
        const booksData = await sheetsService.fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Community Library</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Discover amazing books for rent with our curated collection. 
            Perfect for young readers and book enthusiasts of all ages.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Books</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our hand-picked selection of books available for weekly rental. 
            Each book comes with a secure deposit and easy rental process.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading books from our collection...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        )}

        {!loading && books.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No books available</h3>
            <p className="text-muted-foreground">
              Please check back later for our latest collection.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Community Library</h3>
            <p className="text-muted-foreground text-sm">
              Making quality books accessible to everyone in our community.
            </p>
          </div>
        </div>
      </footer>

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
