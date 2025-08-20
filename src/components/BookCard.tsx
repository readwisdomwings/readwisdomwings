import { BookCardProps } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import bookPlaceholder from '@/assets/book-placeholder.jpg';

export function BookCard({ book, onDetailsClick }: BookCardProps) {
  return (
    <Card 
      className="group overflow-hidden bg-gradient-to-br from-card via-card to-card/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-primary/10"
      onClick={() => onDetailsClick(book)}
    >
      <div className="aspect-[3/4] relative overflow-hidden p-3">
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = bookPlaceholder;
          }}
          loading="lazy"
        />
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight text-card-foreground line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            by {book.author}
          </p>
        </div>
        
        <div className="space-y-2">
          <Badge 
            variant={book.status === 'Available' ? 'default' : 'destructive'}
            className={book.status === 'Available' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-red-500 hover:bg-red-600'}
          >
            {book.status}
          </Badge>
          
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {book.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-1 text-sm pt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">₹{book.weeklyRent}/week</span>
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
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-200"
          size="sm"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}