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
import { X, MessageCircle, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

export function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [coverZoom, setCoverZoom] = useState(1);
  const [innerPageZoom, setInnerPageZoom] = useState(1);
  
  if (!book) return null;

  const handleWhatsAppClick = () => {
    const phoneNumber = '+91 7506037304';
    const message = `Hi! I am interested in renting "${book.title}" by ${book.author} (Book ID: ${book.id}). Can you please help me with the request?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleZoomIn = (type: 'cover' | 'innerPage') => {
    if (type === 'cover') {
      setCoverZoom(prev => Math.min(prev + 0.5, 3));
    } else {
      setInnerPageZoom(prev => Math.min(prev + 0.5, 3));
    }
  };

  const handleZoomOut = (type: 'cover' | 'innerPage') => {
    if (type === 'cover') {
      setCoverZoom(prev => Math.max(prev - 0.5, 0.5));
    } else {
      setInnerPageZoom(prev => Math.max(prev - 0.5, 0.5));
    }
  };

  const resetZoom = (type: 'cover' | 'innerPage') => {
    if (type === 'cover') {
      setCoverZoom(1);
    } else {
      setInnerPageZoom(1);
    }
  };

  const truncatedDescription = book.description.length > 290 
    ? book.description.substring(0, 290) + '...'
    : book.description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">Book Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Tabs defaultValue="cover" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cover">Cover</TabsTrigger>
                <TabsTrigger value="inner">Inner Page</TabsTrigger>
              </TabsList>
              <TabsContent value="cover" className="mt-4">
                <div className="space-y-2">
                  <div className="flex justify-center gap-2 mb-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleZoomOut('cover')}
                      disabled={coverZoom <= 0.5}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetZoom('cover')}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleZoomIn('cover')}
                      disabled={coverZoom >= 3}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="aspect-[3/4] overflow-auto rounded-lg bg-muted border">
                    <img
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={{ transform: `scale(${coverZoom})` }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=533&fit=crop&crop=center";
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="inner" className="mt-4">
                <div className="space-y-2">
                  <div className="flex justify-center gap-2 mb-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleZoomOut('innerPage')}
                      disabled={innerPageZoom <= 0.5}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetZoom('innerPage')}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleZoomIn('innerPage')}
                      disabled={innerPageZoom >= 3}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="aspect-[3/4] overflow-auto rounded-lg bg-muted border">
                    <img
                      src={book.innerPageImage || book.coverImage}
                      alt={`${book.title} inner page`}
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={{ transform: `scale(${innerPageZoom})` }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = book.coverImage;
                      }}
                      loading="lazy"
                    />
                  </div>
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
              <p className="text-xs text-muted-foreground/70 mb-3">ID: {book.id}</p>
            </div>

            <div className="space-y-2">
              <Badge 
                variant={book.status === 'Available' ? 'default' : 'destructive'}
                className={book.status === 'Available' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-red-500 hover:bg-red-600'}
              >
                {book.status}
              </Badge>
              
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
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
            
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Weekly Rent:</span>
                <span className="text-lg font-bold text-primary">₹{book.weeklyRent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground text-sm">Security Deposit:</span>
                <span className="text-sm text-muted-foreground">₹{book.securityDeposit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground text-sm">Original Price:</span>
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
                    className="text-primary hover:underline ml-1 font-medium"
                  >
                    {showFullDescription ? 'show less' : 'show more'}
                  </button>
                )}
              </p>
            </div>
            
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
              size="lg"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact to rent
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}