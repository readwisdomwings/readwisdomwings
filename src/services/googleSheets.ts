import { Book } from '@/types/book';

const SHEET_ID = '1FurK9iQgtEyWWfweF3Za-NUJwd2eLRztsxvVV9IvvjE';
const SHEET_NAME = 'Sheet1';
const API_KEY = 'AIzaSyBgYHQNsKZr1dJBdDqpxXdUjhGBUBU8K6k'; // Public read-only key for demo

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  
  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  async fetchBooks(): Promise<Book[]> {
    try {
      // For demo purposes, we'll use the CSV export URL which doesn't require API key
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      return this.parseCSVToBooks(csvText);
    } catch (error) {
      console.error('Error fetching books from Google Sheets:', error);
      // Return fallback data
      return this.getFallbackBooks();
    }
  }

  private parseCSVToBooks(csvText: string): Book[] {
    const lines = csvText.split('\n');
    const books: Book[] = [];
    
    // Skip header row (index 0) and start from row 1
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const columns = this.parseCSVLine(line);
      if (columns.length >= 13) {
        const book: Book = {
          id: columns[0] || `book-${i}`,
          title: columns[1] || 'Unknown Title',
          author: columns[2] || 'Unknown Author',
          category: columns[3] || 'General',
          ageRange: columns[4] || 'All Ages',
          originalPrice: parseFloat(columns[5]) || 0,
          weeklyRent: parseFloat(columns[6]) || 0,
          securityDeposit: parseFloat(columns[7]) || 0,
          status: (columns[8] === 'Available' ? 'Available' : 'Unavailable') as 'Available' | 'Unavailable',
          description: columns[9] || 'No description available.',
          coverImage: this.processImageUrl(columns[10]) || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center',
          contentImage: columns[11] || undefined,
          totalRentals: parseInt(columns[12]) || 0,
          tags: this.generateTags({
            totalRentals: parseInt(columns[12]) || 0,
            status: columns[8] as 'Available' | 'Unavailable'
          })
        };
        books.push(book);
      }
    }
    
    return books.slice(0, 3); // Return only first 3 books as requested
  }

  private parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  private generateTags(book: { totalRentals: number; status: 'Available' | 'Unavailable' }): string[] {
    const tags: string[] = [];
    
    if (book.totalRentals > 10) {
      tags.push('Most Popular');
    }
    if (book.totalRentals > 5) {
      tags.push('Frequently Rented');
    }
    if (book.totalRentals === 0) {
      tags.push('New');
    }
    
    return tags;
  }

  private processImageUrl(url: string): string | null {
    if (!url || url.trim() === '') return null;
    
    // Handle Google Drive URLs - convert to direct image URLs
    const googleDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (googleDriveMatch) {
      const fileId = googleDriveMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    
    // Return the URL as-is for other image URLs
    return url.trim();
  }

  private getFallbackBooks(): Book[] {
    return [
      {
        id: 'book-1',
        title: 'The Great Adventure',
        author: 'John Smith',
        category: 'Adventure',
        ageRange: '8-12 years',
        originalPrice: 25.99,
        weeklyRent: 3.99,
        securityDeposit: 10.00,
        status: 'Available',
        description: 'An exciting adventure story that takes young readers on a thrilling journey through mysterious lands.',
        coverImage: '/placeholder-book.jpg',
        totalRentals: 15,
        tags: ['Most Popular', 'Frequently Rented']
      },
      {
        id: 'book-2',
        title: 'Science Wonders',
        author: 'Dr. Emily Chen',
        category: 'Educational',
        ageRange: '10-14 years',
        originalPrice: 22.50,
        weeklyRent: 3.50,
        securityDeposit: 8.00,
        status: 'Available',
        description: 'Discover the amazing world of science through fun experiments and fascinating facts.',
        coverImage: '/placeholder-book.jpg',
        totalRentals: 8,
        tags: ['Frequently Rented']
      },
      {
        id: 'book-3',
        title: 'Magical Tales',
        author: 'Sarah Johnson',
        category: 'Fantasy',
        ageRange: '6-10 years',
        originalPrice: 18.99,
        weeklyRent: 2.99,
        securityDeposit: 7.00,
        status: 'Unavailable',
        description: 'A collection of enchanting fairy tales that spark imagination and wonder.',
        coverImage: '/placeholder-book.jpg',
        totalRentals: 0,
        tags: ['New']
      }
    ];
  }
}