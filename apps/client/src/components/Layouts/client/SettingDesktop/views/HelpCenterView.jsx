import SettingsContentCard from "@/components/Elements/SettingsContentCard";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const HelpCenterView = () => {
  const faqs = [
    {
      q: "How do I track my order?",
      a: 'You can track your order from the "My Orders" section in your account page. We will also send you email and app notifications for every status update.',
    },
    {
      q: "What are the available payment methods?",
      a: 'We accept credit/debit cards, bank transfers, and various e-wallets. You can manage your payment methods in the "Cards / Bank Accounts" settings.',
    },
    {
      q: "How do I return a product?",
      a: 'Please visit our "Vendora Policies" section to read the full return policy. You can initiate a return request from your order detail page within 7 days of receiving the item.',
    },
  ];

  return (
    <SettingsContentCard
      title="Help Center"
      description="Find answers to your questions."
    >
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for questions..." className="pl-10" />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SettingsContentCard>
  );
};

export default HelpCenterView;
