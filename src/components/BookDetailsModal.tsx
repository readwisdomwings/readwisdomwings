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
import { X } from 'lucide-react';

export function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  if (!book) return null;

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
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
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
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={book.status === 'Available' ? 'default' : 'destructive'}
                  className="text-xs font-medium"
                >
                  {book.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                {book.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-1">
                by {book.author}
              </p>
              <p className="text-sm text-muted-foreground">
                Category: {book.category}
              </p>
            </div>
            
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Age Range:</span>
                <span className="font-medium">{book.ageRange}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weekly Rent:</span>
                <span className="font-semibold text-accent text-lg">₹{book.weeklyRent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Security Deposit:</span>
                <span className="font-medium">₹{book.securityDeposit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Original Price:</span>
                <span className="font-medium">₹{book.originalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>
            
            <Button 
              className="w-full bg-library-warm hover:bg-library-warm/90 text-library-warm-foreground font-medium"
              size="lg"
            >
              Contact for Rent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}