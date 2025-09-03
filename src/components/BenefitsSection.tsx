import { BookOpen, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: BookOpen,
    title: 'Build a daily habit',
    description: 'Fresh books weekly keep kids excited to read beyond screens.'
  },
  {
    icon: Clock,
    title: 'Reduce screen time',
    description: 'Encourage mindful, device-free moments with stories and pictures.'
  },
  {
    icon: Users,
    title: 'Affordable for families',
    description: 'Pay a tiny weekly rent vs. buying new each time.'
  }
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefits of Reading
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories spark curiosity, empathy and imagination. A library makes it easy and affordable to keep this habit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}