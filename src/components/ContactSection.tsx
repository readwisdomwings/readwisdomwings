import { MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+91 7506037304';
    const message = 'Hello! I would like to know more about WisdomWings library services.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-8 bg-library-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Have questions? Get in touch!
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp: +91 7506 03 7304
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:read.wisdomwings@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                read.wisdomwings@gmail.com
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}