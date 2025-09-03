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
      <div className="bg-gradient-to-br from-fun-purple/10 via-fun-orange/5 to-fun-yellow/10 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="page-title fun-gradient-text mb-6">
            🌟 About WisdomWings
          </h1>
          <p className="text-xl text-muted-foreground">
            Nurturing young minds through the joy of reading 📖
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="text-center mb-20">
          <h2 className="section-title fun-gradient-text mb-8">🎯 Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            To create a thriving reading culture within our community by providing affordable access to quality children's literature.
          </p>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="section-title fun-gradient-text mb-6">✨ Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at WisdomWings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const cardColors = ['from-fun-purple to-fun-blue', 'from-fun-orange to-fun-yellow', 'from-fun-green to-fun-blue', 'from-fun-yellow to-fun-orange'];
              return (
                <Card key={index} className="text-center border-none playful-glow hover:scale-105 transition-all duration-300 bg-gradient-card">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${cardColors[index]} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <value.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Collection Stats */}
        <div className="bg-gradient-fun rounded-3xl p-12 text-center text-white playful-glow">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-5xl font-bold">{totalBooks}+</div>
              <div className="text-lg opacity-90">Books in Collection 📚</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold">50+</div>
              <div className="text-lg opacity-90">Active Members 👥</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold">500+</div>
              <div className="text-lg opacity-90">Books Rented 🚀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}