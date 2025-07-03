import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, MoreVertical, Landmark } from "lucide-react";

// Dummy Data
const initialMethods = [
  { id: 1, bank: "BCA", holder: "Asus Store Official", number: "1234567890" },
  {
    id: 2,
    bank: "Mandiri",
    holder: "Asus Store Official",
    number: "0987654321",
  },
];

const bankOptions = [
  "BCA",
  "Mandiri",
  "BNI",
  "BRI",
  "CIMB Niaga",
  "Permata Bank",
];

const PaymentMethod = () => {
  const [methods, setMethods] = useState(initialMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    bank: "",
    holder: "",
    number: "",
  });

  // Effect to populate form when editing
  useEffect(() => {
    if (editingMethod) {
      setFormData(editingMethod);
    } else {
      setFormData({ bank: "", holder: "", number: "" });
    }
  }, [editingMethod, isModalOpen]);

  const handleAddNew = () => {
    setEditingMethod(null);
    setIsModalOpen(true);
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, bank: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMethod) {
      setMethods((prev) =>
        prev.map((m) => (m.id === editingMethod.id ? { ...m, ...formData } : m))
      );
    } else {
      setMethods((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage the accounts where you receive payments.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={handleAddNew}
          className="mt-4 sm:mt-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Method
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center p-4 rounded-lg border bg-background hover:bg-muted/50"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mr-4">
              <Landmark className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{method.bank}</p>
              <p className="text-sm text-muted-foreground">
                {method.holder} - ••••{method.number.slice(-4)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(method)}>
                  Edit
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-500 focus:text-red-500"
                    >
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove the {method.bank} account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(method.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingMethod ? "Edit" : "Add"} Payment Method
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Name</Label>
                <Select
                  value={formData.bank}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Select a bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankOptions.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="holder">Account Holder</Label>
                <Input
                  id="holder"
                  value={formData.holder}
                  onChange={handleFormChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Account Number</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingMethod ? "Save Changes" : "Add Account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentMethod;
