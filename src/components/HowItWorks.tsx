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
  const stepColors = ['from-fun-purple to-fun-blue', 'from-fun-orange to-fun-yellow', 'from-fun-green to-fun-blue', 'from-fun-yellow to-fun-orange'];
  const stepNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
  
  return (
    <section className="py-20 bg-gradient-to-br from-fun-blue/5 to-fun-green/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title fun-gradient-text mb-6">
            🎯 How it works
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Getting books for your kids is as easy as 1, 2, 3, 4! Simple process, happy reading.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-6 group">
              <div className="relative">
                <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${stepColors[index]} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 playful-glow group-hover:scale-110`}>
                  <step.icon className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 text-2xl">{stepNumbers[index]}</div>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}