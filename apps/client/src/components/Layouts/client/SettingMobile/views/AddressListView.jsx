import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, MoreVertical } from "lucide-react";

const AddressCard = ({ address }) => (
  <div className="p-4 rounded-lg border bg-card dark:border-slate-800">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold">
          {address.label}{" "}
          {address.isPrimary && (
            <span className="text-xs font-normal text-blue-500 ml-2">
              (Primary)
            </span>
          )}
        </p>
        <p className="font-semibold mt-2">{address.name}</p>
        <p className="text-sm text-muted-foreground">{address.phone}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {address.fullAddress}
        </p>
      </div>
      {/* Di sini Anda bisa menambahkan DropdownMenu untuk Edit/Delete */}
      <MoreVertical className="w-5 h-5 text-muted-foreground" />
    </div>
    <div className="flex gap-2 mt-4">
      <Button variant="outline" size="sm" className="w-full">
        Edit
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="w-full">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
);

const AddressListView = () => {
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
    <div className="p-4 space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" /> Add New Address
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          {/* Form untuk menambah alamat */}
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {addresses.map((addr) => (
        <AddressCard key={addr.id} address={addr} />
      ))}
    </div>
  );
};

export default AddressListView;
