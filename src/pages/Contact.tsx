import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+91 98765 43210',
    description: 'Call us during library hours'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    details: '+91 98765 43210',
    description: 'Quick responses via WhatsApp'
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'info@wisdomwings.com',
    description: 'Send us your queries'
  },
  {
    icon: MapPin,
    title: 'Location',
    details: 'Community Library, Sector 12',
    description: 'Residential Society, Near Main Gate'
  }
];

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Let's Connect
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have questions about our books, rental process, or want to suggest new titles for our collection? 
                We'd love to hear from you! Reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-foreground font-medium">{info.details}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:info@wisdomwings.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Library Hours & Location */}
          <div className="space-y-8">
            {/* Library Hours */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Library Hours</h3>
                </div>
                <div className="space-y-3">
                  {libraryHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="text-foreground font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Book pickup and returns can be arranged during these hours. 
                    For urgent requests, contact us via WhatsApp.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Find Us</h3>
                <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 mx-auto text-primary" />
                    <p className="text-foreground font-medium">Community Library</p>
                    <p className="text-sm text-muted-foreground">Sector 12, Residential Society</p>
                    <p className="text-sm text-muted-foreground">Near Main Gate</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p><strong>Landmark:</strong> Next to society playground</p>
                  <p><strong>Parking:</strong> Available near the community center</p>
                  <p><strong>Access:</strong> Ground floor, wheelchair accessible</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-16 text-center bg-card rounded-lg border p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-muted-foreground mb-6">
            Looking for quick answers? Check out our FAQ section for common questions about our services.
          </p>
          <Button variant="outline" asChild>
            <a href="/faqs">View FAQs</a>
          </Button>
        </div>
      </div>
    </div>
  );
}