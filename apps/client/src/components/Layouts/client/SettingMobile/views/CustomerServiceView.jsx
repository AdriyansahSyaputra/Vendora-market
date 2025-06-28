import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Mail } from "lucide-react";

const ContactOption = ({ icon: Icon, title, description, buttonText }) => (
  <div className="p-4 rounded-lg border bg-card dark:border-slate-800 text-center space-y-3">
    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    <Button className="w-full">{buttonText}</Button>
  </div>
);

const CustomerServiceView = () => {
  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <ContactOption
        icon={MessageSquare}
        title="Live Chat"
        description="Chat with our team 24/7."
        buttonText="Start Chat"
      />
      <ContactOption
        icon={Mail}
        title="Email Support"
        description="Get a response within 24 hours."
        buttonText="Send Email"
      />
      <ContactOption
        icon={Phone}
        title="Call Center"
        description="Available from 8 AM to 10 PM."
        buttonText="Call Us"
      />
    </div>
  );
};

export default CustomerServiceView;
