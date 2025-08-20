import { Phone, Mail, Clock, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const libraryHours = [
  { day: 'Monday - Friday', hours: '10:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 9:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 7:00 PM' }
];

export default function Contact() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+919876543210';
    const message = 'Hello! I would like to know more about WisdomWings library services.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with WisdomWings - we're here to help with all your reading needs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <Button 
                  variant="link" 
                  onClick={handleWhatsAppClick}
                  className="p-0 h-auto text-foreground font-medium"
                >
                  WhatsApp: +91 98765 43210
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@wisdomwings.com" className="text-foreground font-medium hover:text-primary">
                  info@wisdomwings.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Community Library, Sector 12</p>
                  <p className="text-sm text-muted-foreground">Residential Society, Near Main Gate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Library Hours */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Library Hours</h3>
              </div>
              <div className="space-y-2">
                {libraryHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm text-foreground">{schedule.day}</span>
                    <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Link - REMOVED */}
      </div>
    </div>
  );
}