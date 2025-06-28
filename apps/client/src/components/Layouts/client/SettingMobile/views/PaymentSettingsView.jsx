import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

const PaymentSettingsView = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Credit/Debit Cards Section */}
      <div>
        <h3 className="text-base font-semibold mb-2">Credit / Debit Cards</h3>
        <div className="p-8 border-2 border-dashed rounded-lg text-center dark:border-slate-700">
          <p className="text-sm text-muted-foreground">No cards added yet.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-4">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1.5">
                <Label>Card Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="card_number">Card Number</Label>
                <Input id="card_number" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="card_name">Name on Card</Label>
                <Input id="card_name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="expiry_date">Expiry Date (MM/YY)</Label>
                <Input id="expiry_date" placeholder="MM/YY" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bank Accounts Section */}
      <div>
        <h3 className="text-base font-semibold mb-2">Bank Accounts</h3>
        <div className="p-8 border-2 border-dashed rounded-lg text-center dark:border-slate-700">
          <p className="text-sm text-muted-foreground">
            No bank accounts added yet.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-4">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Bank Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1.5">
                <Label>Bank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="mandiri">Mandiri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="acc_number">Account Number</Label>
                <Input id="acc_number" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="acc_name">Account Holder Name</Label>
                <Input id="acc_name" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentSettingsView;
