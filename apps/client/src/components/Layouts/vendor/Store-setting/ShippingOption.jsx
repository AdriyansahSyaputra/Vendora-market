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
import { PlusCircle, MoreVertical, Truck } from "lucide-react";

// Dummy Data
const initialOptions = [
  { id: 1, name: "JNE Express", cost: 10.0 },
  { id: 2, name: "SiCepat", cost: 8.5 },
  { id: 3, name: "AnterAja", cost: 9.0 },
];

const courierOptions = [
  "JNE Express",
  "SiCepat",
  "AnterAja",
  "GoSend",
  "GrabExpress",
  "Ninja Xpress",
];

const ShippingOption = () => {
  const [options, setOptions] = useState(initialOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [formData, setFormData] = useState({ name: "", cost: "" });

  useEffect(() => {
    if (editingOption) {
      setFormData(editingOption);
    } else {
      setFormData({ name: "", cost: "" });
    }
  }, [editingOption, isModalOpen]);

  const handleAddNew = () => {
    setEditingOption(null);
    setIsModalOpen(true);
  };

  const handleEdit = (option) => {
    setEditingOption(option);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOption) {
      setOptions((prev) =>
        prev.map((o) => (o.id === editingOption.id ? { ...o, ...formData } : o))
      );
    } else {
      setOptions((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Shipping Options</CardTitle>
          <CardDescription>
            Manage available shipping couriers for your customers.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={handleAddNew}
          className="mt-4 sm:mt-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Courier
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center p-4 rounded-lg border bg-background hover:bg-muted/50"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/50 mr-4">
              <Truck className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{option.name}</p>
              <p className="text-sm text-muted-foreground">
                Standard Cost: ${Number(option.cost).toFixed(2)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(option)}>
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
                        This will permanently remove {option.name} from your
                        shipping options.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(option.id)}
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
                {editingOption ? "Edit" : "Add"} Shipping Courier
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Courier Name</Label>
                <Select
                  value={formData.name}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="name">
                    <SelectValue placeholder="Select a courier" />
                  </SelectTrigger>
                  <SelectContent>
                    {courierOptions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Standard Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingOption ? "Save Changes" : "Add Courier"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ShippingOption;
