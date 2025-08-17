import { BookCardProps } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function BookCard({ book, onDetailsClick }: BookCardProps) {
  return (
    <Card 
      className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onDetailsClick(book)}
    >
      <div className="aspect-[3/4] relative overflow-hidden p-3">
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center";
          }}
          loading="lazy"
        />
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight text-card-foreground line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm">
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
          <div className="flex flex-wrap gap-1">
            {book.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">₹{book.weeklyRent}/week</span>
            <span className="text-muted-foreground text-xs">+ ₹{book.securityDeposit} deposit</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick(book);
          }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          size="sm"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}