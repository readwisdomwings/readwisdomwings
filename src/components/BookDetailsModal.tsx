import { BookDetailsModalProps } from '@/types/book';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { useState } from 'react';

export function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!book) return null;

  const handleWhatsAppClick = () => {
    const message = `Hi! I am interested in renting "${book.title}" by ${book.author}. Can you please help me with the request?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const truncatedDescription = book.description.length > 290 
    ? book.description.substring(0, 290) + '...'
    : book.description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">Book Details</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Tabs defaultValue="cover" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cover">Cover</TabsTrigger>
                <TabsTrigger value="inner">Inner Page</TabsTrigger>
              </TabsList>
              <TabsContent value="cover" className="mt-4">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=533&fit=crop&crop=center";
                    }}
                    loading="lazy"
                  />
                </div>
              </TabsContent>
              <TabsContent value="inner" className="mt-4">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={book.innerPageImage || book.coverImage}
                    alt={`${book.title} inner page`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = book.coverImage;
                    }}
                    loading="lazy"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                {book.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-1">
                by {book.author}
              </p>
            </div>

            <div>
              <Badge 
                variant={book.status === 'Available' ? 'default' : 'destructive'}
                className={book.status === 'Available' ? 'bg-success hover:bg-success/90' : ''}
              >
                {book.status}
              </Badge>
            </div>
            
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-foreground">Category:</span>
                <p className="text-muted-foreground">{book.category}</p>
              </div>
              <div>
                <span className="font-medium text-foreground">Age Range:</span>
                <p className="text-muted-foreground">{book.ageRange}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Weekly Rent:</span>
                <span className="text-lg font-bold text-primary">₹{book.weeklyRent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground">Security Deposit:</span>
                <span className="text-sm text-muted-foreground">₹{book.securityDeposit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Original Price:</span>
                <span className="text-sm text-muted-foreground">₹{book.originalPrice}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {showFullDescription || book.description.length <= 290 
                  ? book.description 
                  : truncatedDescription
                }
                {book.description.length > 290 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-primary hover:underline ml-1"
                  >
                    {showFullDescription ? 'show less' : 'show more'}
                  </button>
                )}
              </p>
            </div>
            
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              size="lg"
            >
              Contact to rent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}