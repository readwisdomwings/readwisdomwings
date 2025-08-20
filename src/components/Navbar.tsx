import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoogleSheetsService } from '@/services/googleSheets';
import type { BrandingData } from '@/services/googleSheets';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Books', href: '/books' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [branding, setBranding] = useState<BrandingData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchBranding = async () => {
      const data = await GoogleSheetsService.getInstance().fetchBrandingData();
      setBranding(data);
    };
    fetchBranding();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {branding?.logo ? (
              <img 
                src={branding.logo} 
                alt="WisdomWings" 
                className="h-8 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
            )}
            <span className="text-xl font-bold text-primary" style={{ textShadow: 'none' }}>WisdomWings</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground'
                }`}
                style={{ textShadow: 'none' }}
              >
                {item.name}
              </Link>
            ))}
            <Button size="sm" asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 pt-2">
              <Button size="sm" className="w-full" asChild>
                <Link to="/books" onClick={() => setIsOpen(false)}>Browse Books</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}