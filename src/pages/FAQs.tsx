import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: "How does the book rental system work?",
    answer: "Our rental system is simple: browse our collection, contact us via WhatsApp to request a book, pay the weekly rent plus a refundable security deposit, and pick up your books from our flat from R&S Wing."
  },
  {
    question: "How do I know if a book is suitable for my child?",
    answer: "Each book includes the recommended age group, cover and inner page images and detailed description. We also have category filters to help you find age-appropriate content. If you're unsure, feel free to contact us for personalized recommendations."
  },
  {
    question: "What is the rental period for books?",
    answer: "Books are rented on a weekly basis. You can extend the rental period by paying additional weekly rent if needed."
  },
  {
    question: "How much is the security deposit?",
    answer: "The security deposit varies by book but typically ranges from ₹50 to ₹300. This amount is fully refundable when you return the book in good condition."
  },
  {
    question: "What if I damage or lose a book?",
    answer: "If a book is damaged beyond normal wear and tear or lost, the security deposit will be used to cover the replacement cost. We'll assess each case individually."
  },
  {
    question: "Can I renew my rental?",
    answer: "Yes, you can renew your rental for additional weeks by paying the weekly rent. Contact us via WhatsApp to extend your rental period."
  },
  {
    question: "What age groups are your books suitable for?",
    answer: "Our collection covers various age groups from toddlers (0-3 years) to young teens (12+ years). Ofcourse, toddlers can not read by themselves, but parents can read stories for them. Each book listing shows the recommended age range."
  },
  {
    question: "How do I contact you for book rentals?",
    answer: "You can contact us via WhatsApp by clicking the floating WhatsApp button on our website or the 'Contact to Rent' button on any book's detail page."
  },
  {
    question: "Can I explore the books at the location (R&S Wing) in person?",
    answer: "We have many books especially for kids. Thats why we are creating an experience to explore books online. Currently exploring the books at the library location is not feasible. But if you are interested in checking what's inside, you can click on 'Details' button, on the book details modal, you can click on 'Inner Page' to view an inner page of the book. Currently its available for some books, but we will be making it available for most of the books soon."
  },
  {
    question: "Can I reserve a book that's currently unavailable?",
    answer: "Yes, you can contact us via WhatsApp to reserve unavailable books. We'll notify you when they become available."
  },
  {
    question: "What payment methods do you accept?",
    answer: "Payment details will be shared when you contact us for a rental. We do accept Googlepay, the simple online payment method."
  }
];

export default function FAQs() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleExpandAll = () => {
    const allItems = faqs.map((_, index) => `item-${index}`);
    setOpenItems(allItems);
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our library services
          </p>
        </div>
      </div>

      {/* FAQs Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Expand/Collapse Controls */}
        <div className="flex gap-4 justify-center mb-8">
          <Button 
            variant="outline" 
            onClick={handleExpandAll}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Expand All
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCollapseAll}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Collapse All
          </Button>
        </div>
        
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-card rounded-lg border p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Feel free to reach out to us directly.
          </p>
          <div className="space-y-4">
            <p className="text-foreground">
              <strong>WhatsApp:</strong> +91 7506 03 7304
            </p>
            <p className="text-foreground">
              <strong>Email:</strong> read.wisdomwings@gmail.com
            </p>
            <p className="text-foreground">
              <strong>Hours:</strong> Monday - Sunday, 10:00 AM - 8:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
