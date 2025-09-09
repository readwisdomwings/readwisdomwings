import { useState, useEffect } from 'react';
import { BookOpen, Users, Heart, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleSheetsService } from '@/services/googleSheets';

const values = [
  {
    icon: BookOpen,
    title: 'Love for Reading',
    description: 'We believe reading is fundamental to a child\'s development and should be accessible to everyone.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Our library serves the local community, fostering connections through shared stories and experiences.'
  },
  {
    icon: Heart,
    title: 'Quality Content',
    description: 'We carefully curate our collection to ensure every book provides value and joy to young readers.'
  },
  {
    icon: Target,
    title: 'Affordable Access',
    description: 'Making quality children\'s literature affordable through our weekly rental model.'
  }
];

export default function About() {
  const [totalBooks, setTotalBooks] = useState(136);

  useEffect(() => {
    const fetchBooksCount = async () => {
      try {
        const books = await GoogleSheetsService.getInstance().fetchBooks();
        setTotalBooks(books.length);
      } catch (error) {
        console.error('Error fetching books count:', error);
        // Keep default value of 136 if fetch fails
      }
    };

    fetchBooksCount();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About WisdomWings
          </h1>
          <p className="text-lg text-muted-foreground">
            Nurturing young minds through the joy of reading
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* WisdomWings Story */}
        <div className="mb-16 space-y-12">
          {/* Starting with the Initial Idea */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Starting with the Initial Idea</h3>
            <p className="text-muted-foreground leading-relaxed text-left">
              We are parents from R&S Wing of Graffiti society, and just like many other parents, we've been concerned about increasing screen time—both for our kids and ourselves. Like many parents in our society, we discovered the magic of bedtime stories when our kid was younger. Those nightly reading sessions didn't just help him sleep—they sparked his curiosity about books. Does he read every single day? Honestly, no. But does his face light up when he spots an interesting story? Absolutely.
            </p>
            <p className="text-muted-foreground leading-relaxed text-left mt-4">
              We realized our son was genuinely interested in stories, so we started collecting more books for him. Friends and family joined in, gifting books for birthdays and special occasions, and soon our cupboard shelves were filled with wonderful story books. When our son suggested, "Why don't we turn this into a small library for other kids?" we knew he was onto something special. That's how WisdomWings came into existence—born from a child's generous heart and parents' desire to share the joy of reading with our community.
            </p>
          </div>

          {/* Our Collection */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Collection</h3>
            <p className="text-muted-foreground leading-relaxed text-left">
              We have many types of books in our collection—famous comics like Tinkle that spark laughter, stories rooted in our rich Indian mythology featuring Shiva and Krishna, inspiring tales of patriots like Bhagat Singh, and even books that guide us through parenthood. Some books from our collection are incredibly close to our hearts, like the Young Scientist series and Poldy series, gifted by our child's grandparents over 10 years ago. These timeless, priceless treasures aren't even available online anymore (that's why we request you to handle them with extra care!).
            </p>
          </div>

          {/* Tips for Building Reading Habits */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Tips for Building Reading Habits</h3>
            <p className="text-muted-foreground leading-relaxed text-left">
              The best reading tip we've discovered? Children mirror what they see. When we read during quiet evenings or Sunday afternoons, our son naturally picks up his own books. Start small—dedicate just 15 minutes before bed to family reading time where everyone has their own book. Let kids choose their own books (even if it's the same story for the tenth time), create a cozy reading corner with good lighting, and celebrate the small wins when they finish a chapter or discover a new favorite character. Reading habits grow slowly, like plants—with consistency, patience, and the right nurturing environment.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at WisdomWings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Collection Stats */}
        <div className="bg-card rounded-2xl border p-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{totalBooks}+</div>
              <div className="text-sm text-muted-foreground">Books in Collection</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Books Rented</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}