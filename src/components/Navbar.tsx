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
          <Link to="/" className="flex items-center space-x-3 no-shadow">
            {branding?.logo && branding.logo !== '/placeholder.svg' ? (
              <img 
                src={branding.logo} 
                alt="WisdomWings" 
                className="h-8 w-auto no-shadow"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : null}
            <div className="flex flex-col no-shadow">
              <span className="text-xl font-bold wisdomwings-text no-shadow">WisdomWings</span>
              <span className="text-xs text-muted-foreground no-shadow hidden sm:block">Serving young readers in our Venkatesh Graffiti Society.</span>
            </div>
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
            {/* Mobile tagline */}
            <div className="px-3 py-2 text-xs text-muted-foreground text-center border-b border-border">
              Serving young readers in our Venkatesh Graffiti Society.
            </div>
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