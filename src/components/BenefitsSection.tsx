import { BookOpen, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: BookOpen,
    title: 'Build a daily habit',
    description: 'Access books at daily basis and adding to your daily routine which is affordable for everyone.'
  },
  {
    icon: Clock,
    title: 'Reduce screen time',
    description: 'Encourage valuable stories that can entertain our children and help them move away from screens.'
  },
  {
    icon: Users,
    title: 'Affordable for families',
    description: 'Pay a low weekly rent by renting rather than buying at a cost per book.'
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
            Studies show reading regularly builds strong foundations. A flourishing literacy culture of kids reading makes them kind and considerate in the long run.
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