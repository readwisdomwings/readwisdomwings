import { Search, MessageCircle, CreditCard, Package } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse Collection',
    description: 'Explore our curated collection of children\'s books across various categories and age groups.'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Enquiry',
    description: 'Send us a message through WhatsApp with your book selection and rental requirements.'
  },
  {
    icon: CreditCard,
    title: 'Pay Weekly Rent',
    description: 'Pay the affordable weekly rent along with a refundable security deposit for your chosen books.'
  },
  {
    icon: Package,
    title: 'Book Pickup',
    description: 'Collect your books from our library location and enjoy reading with your children.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting books for your kids is as easy as 1, 2, 3, 4! Simple process, happy reading.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto icon-circle-tertiary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <step.icon className="h-10 w-10 icon-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}