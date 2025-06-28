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
import { PlusCircle } from "lucide-react";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const AddressSettingsView = () => {
  const addresses = [
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      phone: "+62 812 3456 7890",
      fullAddress: "Jl. Merdeka No. 17, Jakarta Pusat, DKI Jakarta, 10110",
      isPrimary: true,
    },
    {
      id: 2,
      label: "Office",
      name: "John Doe",
      phone: "+62 812 3456 7890",
      fullAddress:
        "Jl. Sudirman Kav. 52-53, Jakarta Selatan, DKI Jakarta, 12190",
      isPrimary: false,
    },
  ];

  return (
    <SettingsContentCard
      title="Address List"
      description="Manage your saved shipping addresses."
    >
      <div className="flex justify-end mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <Card key={addr.id} className="bg-slate-50 dark:bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                {addr.label}{" "}
                {addr.isPrimary && (
                  <span className="text-xs font-normal text-blue-500 ml-2">
                    (Primary)
                  </span>
                )}
              </CardTitle>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm text-muted-foreground">{addr.phone}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {addr.fullAddress}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SettingsContentCard>
  );
};

export default AddressSettingsView;
