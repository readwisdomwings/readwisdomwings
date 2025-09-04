import { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookCard } from '@/components/BookCard';
import { BookDetailsModal } from '@/components/BookDetailsModal';
import { GoogleSheetsService } from '@/services/googleSheets';
import type { Book } from '@/types/book';

const BOOKS_PER_PAGE = 20;

export default function Books() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [featuredBookIds, setFeaturedBookIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'title-asc' | 'title-desc' | 'author-asc' | 'author-desc' | 'rent-asc' | 'rent-desc'>('featured');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, brandingData] = await Promise.all([
          GoogleSheetsService.getInstance().fetchBooks(),
          GoogleSheetsService.getInstance().fetchBrandingData()
        ]);
        
        console.log('📚 Total books loaded:', booksData.length);
        console.log('🌟 Featured book IDs from branding:', brandingData.featuredBooks);
        
        // Log existing book IDs for comparison
        const allBookIds = booksData.map(book => book.id);
        console.log('📖 Available book IDs:', allBookIds.slice(0, 10), '... (showing first 10)');
        
        // Validate featured books exist in our book collection
        const validFeaturedBooks = brandingData.featuredBooks.filter(featuredId => 
          allBookIds.includes(featuredId)
        );
        const invalidFeaturedBooks = brandingData.featuredBooks.filter(featuredId => 
          !allBookIds.includes(featuredId)
        );
        
        console.log('✅ Valid featured books:', validFeaturedBooks);
        console.log('❌ Invalid featured books (not found):', invalidFeaturedBooks);
        
        setAllBooks(booksData);
        setFeaturedBookIds(brandingData.featuredBooks);
        setFilteredBooks(booksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesAge = selectedAgeGroup === 'all' || book.ageRange === selectedAgeGroup;
      
      return matchesSearch && matchesCategory && matchesAge;
    });

    // Sort books
    if (sortOrder === 'featured') {
      console.log('🎯 Sorting by featured order...');
      console.log('Featured book IDs available:', featuredBookIds);
      
      // Sort by featured: featured books first (in order from AA2-AA22), then remaining books
      filtered.sort((a, b) => {
        const aFeaturedIndex = featuredBookIds.indexOf(a.id);
        const bFeaturedIndex = featuredBookIds.indexOf(b.id);
        
        // If both are featured, sort by their order in the featured list
        if (aFeaturedIndex !== -1 && bFeaturedIndex !== -1) {
          return aFeaturedIndex - bFeaturedIndex;
        }
        
        // If only one is featured, featured book comes first
        if (aFeaturedIndex !== -1) return -1;
        if (bFeaturedIndex !== -1) return 1;
        
        // If neither is featured, sort alphabetically by title
        return a.title.localeCompare(b.title);
      });
      
      // Log the first few books after sorting to verify featured order
      const featuredBooksInResult = filtered.filter(book => featuredBookIds.includes(book.id));
      console.log('📋 Featured books found and sorted:', featuredBooksInResult.map(b => `${b.id}: ${b.title}`));
    } else {
      filtered.sort((a, b) => {
        switch (sortOrder) {
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'author-asc':
            return a.author.localeCompare(b.author);
          case 'author-desc':
            return b.author.localeCompare(a.author);
          case 'rent-asc':
            return a.weeklyRent - b.weeklyRent;
          case 'rent-desc':
            return b.weeklyRent - a.weeklyRent;
          default:
            return a.title.localeCompare(b.title);
        }
      });
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allBooks, searchTerm, selectedCategory, selectedAgeGroup, sortOrder, featuredBookIds]);

  const handleDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Get unique categories and age groups
  const categories = [...new Set(allBooks.map(book => book.category))].filter(Boolean);
  const ageGroups = [...new Set(allBooks.map(book => book.ageRange))].filter(Boolean);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Books
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of {allBooks.length} children's books
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-lg border p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Age Group Filter */}
            <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                {ageGroups.map(age => (
                  <SelectItem key={age} value={age}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortOrder} onValueChange={(value: typeof sortOrder) => setSortOrder(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    Sort by Featured
                  </div>
                </SelectItem>
                <SelectItem value="title-asc">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    Title: A-Z
                  </div>
                </SelectItem>
                <SelectItem value="title-desc">
                  <div className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4" />
                    Title: Z-A
                  </div>
                </SelectItem>
                <SelectItem value="author-asc">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    Author: A-Z
                  </div>
                </SelectItem>
                <SelectItem value="author-desc">
                  <div className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4" />
                    Author: Z-A
                  </div>
                </SelectItem>
                <SelectItem value="rent-asc">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    Rent: Low to High
                  </div>
                </SelectItem>
                <SelectItem value="rent-desc">
                  <div className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4" />
                    Rent: High to Low
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Filters */}
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedAgeGroup('all');
                setSortOrder('featured');
              }}
            >
              Reset Filters
            </Button>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            Showing {currentBooks.length} of {filteredBooks.length} books
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : currentBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onDetailsClick={handleDetailsClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-12 px-4">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto"
                >
                  Previous
                </Button>
                
                <div className="flex flex-wrap justify-center gap-1 max-w-full overflow-x-auto">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 text-xs sm:text-sm"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-full sm:w-auto"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No books found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}