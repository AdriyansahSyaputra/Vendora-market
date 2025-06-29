import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

// Dummy Data
const categories = [
  {
    name: "Electronics",
    description: "Gadgets, computers, and modern tech.",
    created: "2023-01-15",
    productCount: 125,
  },
  {
    name: "Accessories",
    description: "Cases, chargers, and other peripherals.",
    created: "2023-02-20",
    productCount: 88,
  },
  {
    name: "Wearables",
    description: "Smartwatches, fitness trackers, and more.",
    created: "2023-03-10",
    productCount: 42,
  },
  {
    name: "Gaming",
    description: "Consoles, games, and gaming accessories.",
    created: "2023-04-05",
    productCount: 76,
  },
  {
    name: "Audio",
    description: "Headphones, speakers, and audio equipment.",
    created: "2023-05-21",
    productCount: 64,
  },
];

export default function Categories() {
  return (
    <div>
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Product Categories
          </h2>
          <p className="text-muted-foreground">
            View and manage your product categories.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for your products.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cat-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="cat-name"
                  placeholder="e.g. Smart Home"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="cat-desc" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="cat-desc"
                  placeholder="A short description..."
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid Kategori */}
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Created: {category.created}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm font-semibold">
                {category.productCount} Products
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
