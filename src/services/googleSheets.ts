import { Book } from '@/types/book';

const SHEET_ID = '1FurK9iQgtEyWWfweF3Za-NUJwd2eLRztsxvVV9IvvjE';
const SHEET_NAME = 'Sheet1';
const BRANDING_SHEET = 'Sheet2';
const API_KEY = 'AIzaSyBgYHQNsKZr1dJBdDqpxXdUjhGBUBU8K6k'; // Public read-only key for demo

export interface FeaturedKidData {
  name: string;
  age: string;
  booksRead: string;
  bookNames: string;
  image: string;
}

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
  featuredBooks: string[];
  showFeaturedKids: boolean;
  featuredKids: FeaturedKidData[];
  showPlaceholder: boolean;
  placeholderKid: FeaturedKidData;
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
        popularBookSeriesImages: [],
        featuredBooks: [],
        showFeaturedKids: false,
        featuredKids: [],
        showPlaceholder: false,
        placeholderKid: { name: '', age: '', booksRead: '', bookNames: '', image: '' }
      };
    }
  }

  private parseCSVToBooks(csvText: string): Book[] {
    const books: Book[] = [];
    
    console.log(`Starting CSV parsing...`);
    
    // Parse CSV properly handling quoted fields and multiline content
    const rows = this.parseCSVRows(csvText);
    
    console.log(`Total rows parsed: ${rows.length}`);
    
    // Skip header row (index 0) and start from row 1
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i];
      
      if (!columns || columns.length === 0) {
        console.log(`Skipping empty row at index ${i}`);
        continue;
      }
      
      console.log(`Row ${i}: ${columns.length} columns, Book ID: ${columns[0]}`);
      
      // Check if we have minimum required columns
      if (columns.length >= 13 && columns[0] && columns[0].trim() !== '') {
        try {
          const additionalTags = this.getAdditionalTags(columns);
          
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
            }, additionalTags)
          };
          
          // Only add books with valid title and author
          if (book.title && book.title.trim() !== '' && book.author && book.author.trim() !== '') {
            books.push(book);
          } else {
            console.log(`Skipping book with missing title or author at row ${i}`);
          }
        } catch (error) {
          console.log(`Error parsing row ${i}:`, error);
        }
      } else {
        console.log(`Skipping row ${i} - insufficient columns (${columns.length}) or missing Book ID`);
      }
    }
    
    console.log(`Total books parsed: ${books.length}`);
    
    return books;
  }

  private parseCSVRows(csvText: string): string[][] {
    const rows: string[][] = [];
    const lines = csvText.split('\n');
    let currentRow: string[] = [];
    let currentField = '';
    let inQuotes = false;
    let rowIndex = 0;
    
    for (const line of lines) {
      if (rowIndex === 0) {
        // Handle header row normally
        rows.push(this.parseCSVLine(line));
        rowIndex++;
        continue;
      }
      
      // For data rows, handle multiline properly
      if (!inQuotes && line.trim() === '') {
        // Empty line - if we have a current row, finalize it
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
          currentRow = [];
          currentField = '';
        }
        rowIndex++;
        continue;
      }
      
      // Parse character by character for this line
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
            // Escaped quote
            currentField += '"';
            i++; // Skip next quote
          } else {
            // Toggle quote state
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          // Field separator
          currentRow.push(currentField);
          currentField = '';
        } else {
          currentField += char;
        }
      }
      
      if (!inQuotes) {
        // End of row
        currentRow.push(currentField);
        rows.push([...currentRow]);
        currentRow = [];
        currentField = '';
      } else {
        // Continue to next line (multiline field)
        currentField += '\n';
      }
      
      rowIndex++;
    }
    
    // Handle any remaining row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    return rows;
  }

  private getAdditionalTags(columns: string[]): string[] {
    const additionalTags: string[] = [];
    
    // Check columns M, N, O, P (indices 12, 13, 14, 15) - but we need to adjust since we're already using some of these
    // Looking at the current mapping, let's use the correct indices for additional tag columns
    
    // Column M (index 12) is already totalRentals
    // Column N (index 13) is already mostFavourite
    // Column O (index 14) is already isNew
    // Column P (index 15) is already frequentlyRented
    
    // Let's check if there are more columns for additional tags
    if (columns.length > 17) {
      // Check columns beyond Q (index 16) for additional tags
      for (let i = 17; i < Math.min(columns.length, 21); i++) {
        const tag = columns[i]?.trim();
        if (tag && tag !== '' && tag !== 'TRUE' && tag !== 'FALSE') {
          additionalTags.push(tag);
        }
      }
    }
    
    return additionalTags;
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
        popularBookSeriesImages: [],
        featuredBooks: [],
        showFeaturedKids: false,
        featuredKids: [],
        showPlaceholder: false,
        placeholderKid: { name: '', age: '', booksRead: '', bookNames: '', image: '' }
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
    
    // Extract featured books from AA2-AA22 with debugging
    const featuredBooksRaw = [
      cellData.get('AA2'),
      cellData.get('AA3'),
      cellData.get('AA4'),
      cellData.get('AA5'),
      cellData.get('AA6'),
      cellData.get('AA7'),
      cellData.get('AA8'),
      cellData.get('AA9'),
      cellData.get('AA10'),
      cellData.get('AA11'),
      cellData.get('AA12'),
      cellData.get('AA13'),
      cellData.get('AA14'),
      cellData.get('AA15'),
      cellData.get('AA16'),
      cellData.get('AA17'),
      cellData.get('AA18'),
      cellData.get('AA19'),
      cellData.get('AA20'),
      cellData.get('AA21'),
      cellData.get('AA22')
    ];
    
    console.log('🔍 Raw featured books from AA2-AA22:', featuredBooksRaw);
    
    // Filter and clean featured books
    const featuredBooks = featuredBooksRaw
      .map(id => id?.trim())
      .filter(id => id && id !== '' && id !== 'undefined')
      .slice(0, 25); // Limit to first 25 books as per requirement
    
    console.log('✅ Cleaned featured books:', featuredBooks);
    console.log(`📊 Found ${featuredBooks.length} valid featured book IDs`);
    
    // Parse featured kids data
    const showFeaturedKids = cellData.get('AB3')?.toLowerCase() === 'yes';
    const featuredKids: FeaturedKidData[] = [];
    
    // Parse up to 4 featured kids
    const kidStartRows = [4, 10, 16, 22]; // AB4, AB10, AB16, AB22
    
    for (const startRow of kidStartRows) {
      const name = cellData.get(`AB${startRow}`)?.trim();
      if (name && name !== '') {
        featuredKids.push({
          name,
          age: cellData.get(`AB${startRow + 1}`) || '',
          booksRead: cellData.get(`AB${startRow + 2}`) || '',
          bookNames: cellData.get(`AB${startRow + 3}`) || '',
          image: this.processImageUrl(cellData.get(`AB${startRow + 4}`) || '') || '/placeholder.svg'
        });
      }
    }
    
    // Parse placeholder kid data
    const showPlaceholder = cellData.get('AC3')?.toLowerCase() === 'yes';
    const placeholderKid: FeaturedKidData = {
      name: cellData.get('AC4') || '',
      age: cellData.get('AC5') || '',
      booksRead: cellData.get('AC6') || '',
      bookNames: cellData.get('AC7') || '',
      image: this.processImageUrl(cellData.get('AC8') || '') || '/placeholder.svg'
    };

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
      section2Name: cellData.get('X1') || 'Interesting Comics',
      section2Books: [
        cellData.get('X2'),
        cellData.get('X3'),
        cellData.get('X4'),
        cellData.get('X5'),
        cellData.get('X6')
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
      ].map(url => this.processImageUrl(url || '')).filter(Boolean),
      featuredBooks,
      showFeaturedKids,
      featuredKids,
      showPlaceholder,
      placeholderKid
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
  }, additionalTags: string[] = []): string[] {
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
    
    // Add any additional tags from the spreadsheet, but filter out URLs and invalid tags
    additionalTags.forEach(tag => {
      if (tag && !tags.includes(tag) && !this.isUrlOrPath(tag)) {
        tags.push(tag);
      }
    });
    
    return tags;
  }

  private isUrlOrPath(text: string): boolean {
    // Filter out URLs, drive paths, or any text that looks like a URL/path
    const urlPattern = /^https?:\/\/|drive\.google\.com|\/file\/d\/|\.com|\.org|\.net|^\/|\\|\w+:\/\//i;
    return urlPattern.test(text.trim());
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
