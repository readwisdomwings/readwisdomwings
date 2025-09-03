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
    const phoneNumber = '+91 7506037304';
    const message = 'Hello! I would like to know more about WisdomWings library services.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-fun-purple/10 via-fun-orange/5 to-fun-yellow/10 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="page-title fun-gradient-text mb-6">
            📞 Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with WisdomWings - we're here to help with all your reading needs 💫
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
                <span className="text-foreground font-medium">+91 7506 03 7304</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <Button 
                  variant="link" 
                  onClick={handleWhatsAppClick}
                  className="p-0 h-auto text-foreground font-medium"
                >
                  WhatsApp: +91 7506 03 7304
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:read.wisdomwings@gmail.com" className="text-foreground font-medium hover:text-primary">
                  read.wisdomwings@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Library Hours */}
          <Card className="border-none playful-glow bg-gradient-card">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-fun rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">🕐 Library Hours</h3>
              </div>
              <div className="space-y-3">
                {libraryHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                    <span className="font-medium text-foreground">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
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