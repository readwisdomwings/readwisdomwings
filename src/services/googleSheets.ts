import { Book } from '@/types/book';

const SHEET_ID = '1FurK9iQgtEyWWfweF3Za-NUJwd2eLRztsxvVV9IvvjE';
const SHEET_NAME = 'Sheet1';
const BRANDING_SHEET = 'Sheet2';
const API_KEY = 'AIzaSyBgYHQNsKZr1dJBdDqpxXdUjhGBUBU8K6k'; // Public read-only key for demo

export interface BrandingData {
  logo: string;
  bannerImage: string;
  bannerTitle: string;
  bannerSubTitle: string;
  section1Name: string;
  section1Books: string[];
  section2Name: string;
  section2Books: string[];
  section3Name: string;
  section3Books: string[];
  popularBookSeriesImages: string[];
}

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
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      return this.parseCSVToBooks(csvText);
    } catch (error) {
      console.error('Error fetching books from Google Sheets:', error);
      return this.getFallbackBooks();
    }
  }

  async fetchBrandingData(): Promise<BrandingData> {
    try {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`; // Main sheet where data is located
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      return this.parseBrandingData(csvText);
    } catch (error) {
      console.error('Error fetching branding data from Google Sheets:', error);
      return {
        logo: '/placeholder.svg',
        bannerImage: '/placeholder.svg',
        bannerTitle: 'Build reading habits. Read delightful children\'s books.',
        bannerSubTitle: 'A friendly, community-powered kids library. Small refundable deposit, low weekly rent, lots of joy.',
        section1Name: 'Most Popular',
        section1Books: [],
        section2Name: 'Interesting Comics',
        section2Books: [],
        section3Name: 'Books for Everyone',
        section3Books: [],
        popularBookSeriesImages: []
      };
    }
  }

  private parseCSVToBooks(csvText: string): Book[] {
    const lines = csvText.split('\n');
    const books: Book[] = [];
    
    console.log(`Total lines in CSV: ${lines.length}`);
    console.log(`First few lines:`, lines.slice(0, 3));
    console.log(`Last few lines:`, lines.slice(-3));
    
    // Skip header row (index 0) and start from row 1
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        console.log(`Skipping empty line at index ${i}`);
        continue;
      }
      
      const columns = this.parseCSVLine(line);
      console.log(`Line ${i}: ${columns.length} columns, Book ID: ${columns[0]}`);
      
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
          innerPageImage: this.processImageUrl(columns[11]) || undefined,
          totalRentals: parseInt(columns[12]) || 0,
          mostFavourite: columns[13] === 'TRUE' || columns[13] === 'true',
          isNew: columns[14] === 'TRUE' || columns[14] === 'true',
          frequentlyRented: columns[15] === 'TRUE' || columns[15] === 'true',
          additionalTag: columns[16] || '', // Column Q - additional tag if any
          tags: this.generateTags({
            totalRentals: parseInt(columns[12]) || 0,
            status: columns[8] as 'Available' | 'Unavailable',
            mostFavourite: columns[13] === 'TRUE' || columns[13] === 'true',
            isNew: columns[14] === 'TRUE' || columns[14] === 'true',
            frequentlyRented: columns[15] === 'TRUE' || columns[15] === 'true'
          })
        };
        books.push(book);
      } else {
        console.log(`Skipping line ${i} - insufficient columns (${columns.length}): ${line.substring(0, 100)}...`);
      }
    }
    
    console.log(`Total books parsed: ${books.length}`);
    const filteredBooks = books.filter(book => book.title && book.author);
    console.log(`Books after filtering: ${filteredBooks.length}`);
    
    return filteredBooks;
  }

  private parseBrandingData(csvText: string): BrandingData {
    const lines = csvText.split('\n');
    if (lines.length < 7) { // Need enough rows for the data
      return {
        logo: '/placeholder.svg',
        bannerImage: '/placeholder.svg',
        bannerTitle: 'Build reading habits. Read delightful children\'s books.',
        bannerSubTitle: 'A friendly, community-powered kids library. Small refundable deposit, low weekly rent, lots of joy.',
        section1Name: 'Most Popular',
        section1Books: [],
        section2Name: 'Interesting Comics',
        section2Books: [],
        section3Name: 'Books for Everyone',
        section3Books: [],
        popularBookSeriesImages: []
      };
    }
    
    // Parse each line to get the data from specific cells
    const cellData = new Map<string, string>();
    
    for (let i = 0; i < lines.length; i++) {
      const columns = this.parseCSVLine(lines[i]);
      // Map column indices to cell references based on the row
      for (let j = 0; j < columns.length; j++) {
        const cellRef = this.getCellReference(i + 1, j + 1); // 1-based indexing
        cellData.set(cellRef, columns[j]);
      }
    }
    
    return {
      logo: this.processImageUrl(cellData.get('U2') || '') || '/placeholder.svg',
      bannerImage: this.processImageUrl(cellData.get('V2') || '') || '/placeholder.svg',
      bannerTitle: cellData.get('V3') || 'Build reading habits. Read delightful children\'s books.',
      bannerSubTitle: cellData.get('V4') || 'A friendly, community-powered kids library. Small refundable deposit, low weekly rent, lots of joy.',
      section1Name: cellData.get('W1') || 'Most Popular',
      section1Books: [
        cellData.get('W2'),
        cellData.get('W3'),
        cellData.get('W4'),
        cellData.get('W5'),
        cellData.get('W6')
      ].filter(Boolean),
      section2Name: cellData.get('X2') || 'Interesting Comics',
      section2Books: [
        cellData.get('X3'),
        cellData.get('X4'),
        cellData.get('X5'),
        cellData.get('X6'),
        cellData.get('X7')
      ].filter(Boolean),
      section3Name: cellData.get('Y1') || 'Books for Everyone',
      section3Books: [
        cellData.get('Y2'),
        cellData.get('Y3'),
        cellData.get('Y4'),
        cellData.get('Y5'),
        cellData.get('Y6')
      ].filter(Boolean),
      popularBookSeriesImages: [
        cellData.get('Z2'),
        cellData.get('Z3'),
        cellData.get('Z4'),
        cellData.get('Z5'),
        cellData.get('Z6')
      ].map(url => this.processImageUrl(url || '')).filter(Boolean)
    };
  }

  private getCellReference(row: number, col: number): string {
    let colRef = '';
    while (col > 0) {
      colRef = String.fromCharCode(65 + ((col - 1) % 26)) + colRef;
      col = Math.floor((col - 1) / 26);
    }
    return colRef + row;
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

  private generateTags(book: { 
    totalRentals: number; 
    status: 'Available' | 'Unavailable';
    mostFavourite?: boolean;
    isNew?: boolean;
    frequentlyRented?: boolean;
  }): string[] {
    const tags: string[] = [];
    
    if (book.mostFavourite) {
      tags.push('Most Favourite');
    }
    if (book.isNew) {
      tags.push('New');
    }
    if (book.frequentlyRented) {
      tags.push('Frequently Rented');
    }
    if (book.totalRentals > 10 && !book.mostFavourite && !book.frequentlyRented) {
      tags.push('Most Popular');
    }
    
    return tags;
  }

  private processImageUrl(url: string): string | null {
    if (!url || url.trim() === '') return null;
    
    // Handle Google Drive URLs - convert to direct image URLs
    const googleDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (googleDriveMatch) {
      const fileId = googleDriveMatch[1];
      // Use the thumbnail URL which works better for public images
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
    }
    
    // Also handle if someone puts the direct uc URL
    const ucMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (ucMatch) {
      const fileId = ucMatch[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
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