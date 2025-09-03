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
  const cardColors = ['from-fun-purple to-fun-blue', 'from-fun-orange to-fun-yellow', 'from-fun-green to-fun-blue'];
  
  return (
    <section className="py-20 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title fun-gradient-text mb-6">
            ✨ Benefits of Reading
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stories spark curiosity, empathy and imagination. A library makes it easy and affordable to keep this habit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-none playful-glow hover:scale-105 transition-all duration-300 bg-gradient-card">
              <CardContent className="p-8">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${cardColors[index]} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <benefit.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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