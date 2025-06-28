import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const PaymentSettingsView = () => {
  return (
    <SettingsContentCard
      title="Cards & Bank Accounts"
      description="Manage your saved payment methods."
    >
      <div className="space-y-8">
        {/* Credit/Debit Cards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Credit / Debit Cards</h3>
            <Button variant="outline">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Card
            </Button>
          </div>
          <div className="p-8 border-2 border-dashed rounded-lg text-center dark:border-slate-700">
            <p className="text-muted-foreground">No cards added yet.</p>
          </div>
        </div>

        {/* Bank Accounts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Bank Accounts</h3>
            <Button variant="outline">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Bank Account
            </Button>
          </div>
          <div className="p-8 border-2 border-dashed rounded-lg text-center dark:border-slate-700">
            <p className="text-muted-foreground">No bank accounts added yet.</p>
          </div>
        </div>
      </div>
    </SettingsContentCard>
  );
};

export default PaymentSettingsView;
