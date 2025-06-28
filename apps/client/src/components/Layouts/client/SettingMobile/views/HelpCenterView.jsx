import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpCenterView = () => {
  const faqs = [
    {
      q: "How do I track my order?",
      a: 'You can track your order from the "My Orders" section in your account page. We will also send you email and app notifications for every status update.',
    },
    {
      q: "What are the available payment methods?",
      a: "We accept credit/debit cards, bank transfers, and various e-wallets.",
    },
    {
      q: "How do I return a product?",
      a: 'Please visit our "Vendora Policies" section to read the full return policy.',
    },
  ];

  return (
    <div className="p-4 animate-fade-in">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for questions..." className="pl-10" />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm text-left">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HelpCenterView;
