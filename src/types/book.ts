export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  ageRange: string;
  originalPrice: number;
  weeklyRent: number;
  securityDeposit: number;
  status: 'Available' | 'Unavailable';
  description: string;
  coverImage: string;
  contentImage?: string;
  totalRentals: number;
  tags?: string[];
}

export interface BookCardProps {
  book: Book;
  onDetailsClick: (book: Book) => void;
}

export interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}