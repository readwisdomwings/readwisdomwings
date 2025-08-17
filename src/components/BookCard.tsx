import { BookCardProps } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function BookCard({ book, onDetailsClick }: BookCardProps) {
  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = "https://drive.google.com/file/d/196OtZuA1i1_MT5pjWqRMnKu-nxYfx6WB/view?usp=sharin";
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
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight text-card-foreground line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            by {book.author}
          </p>
        </div>
        
        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {book.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weekly Rent:</span>
            <span className="font-medium text-accent">₹{book.weeklyRent.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Deposit:</span>
            <span className="font-medium">₹{book.securityDeposit.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onDetailsClick(book)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          size="sm"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}