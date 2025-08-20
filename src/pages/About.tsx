import { BookOpen, Users, Heart, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        {/* Mission */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            To create a thriving reading culture within our community by providing affordable access to quality children's literature.
          </p>
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
              <div className="text-3xl font-bold text-primary">136+</div>
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