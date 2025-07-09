import { useState } from "react";
import Sidebar from "@/components/Templates/company/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryCard from "@/components/Layouts/company/Product/Category/CategoryCard";
import AddCategoryModal from "@/components/Layouts/company/Product/Category/AddCategoryModal";
import EditCategoryModal from "@/components/Layouts/company/Product/Category/EditCategoryModal";
import ConfirmationDialog from "@/components/Layouts/company/Product/Category/ConfirmationDialog";

const categoryData = [
  {
    id: 1,
    name: "Electronics",
    description: "Gadgets, accessories, and all things tech.",
    createdAt: "2023-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Latest trends in apparel, shoes, and accessories.",
    createdAt: "2023-01-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Everything for your home, from decor to appliances.",
    createdAt: "2023-02-10",
    status: "Active",
  },
  {
    id: 4,
    name: "Beauty & Health",
    description: "Skincare, makeup, and wellness products.",
    createdAt: "2023-03-01",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Furniture",
    description: "Stylish and functional furniture for every room.",
    createdAt: "2023-03-25",
    status: "Active",
  },
  {
    id: 6,
    name: "Books",
    description: "A wide range of books from all genres.",
    createdAt: "2023-04-05",
    status: "Active",
  },
];

const CategoryManagementPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categories, setCategories] = useState(categoryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleAddNewCategory = (newCategoryData) => {
    const newCategory = {
      id:
        categories.length > 0
          ? Math.max(...categories.map((c) => c.id)) + 1
          : 1,
      ...newCategoryData,
      createdAt: new Date().toISOString().split("T")[0], // Set current date
    };
    setCategories((prev) => [newCategory, ...prev]);
    setAddModalOpen(false);
  };

  const handleSaveCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setEditModalOpen(false);
  };

  const handleOpenDeleteConfirm = (category) => {
    setSelectedCategory(category);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCategory = () => {
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setDeleteConfirmOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <Helmet title="All Product" />

      <div className="flex min-h-screen max-w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        <div
          className={`flex flex-col w-full transition-all duration-300 ${
            isCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4 ">
            <Card>
              <CardHeader>
                <CardTitle>Category Management</CardTitle>
                <CardDescription>
                  Manage your product categories, add new ones, edit existing
                  categories, and delete categories as needed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:gap-8">
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="w-full md:w-1/2">
                      <Input
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-full md:w-auto">
                      <Button
                        className="w-full md:w-auto"
                        onClick={() => setAddModalOpen(true)}
                      >
                        Add New Category
                      </Button>
                    </div>
                  </div>

                  {/* Categories Grid */}
                  {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCategories.map((category) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          onEdit={handleOpenEditModal}
                          onDelete={handleOpenDeleteConfirm}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                      <p className="text-slate-500">No categories found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Modals & Dialogs */}
          <AddCategoryModal
            isOpen={isAddModalOpen}
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddNewCategory}
          />
          <EditCategoryModal
            category={selectedCategory}
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveCategory}
          />
          <ConfirmationDialog
            open={isDeleteConfirmOpen}
            onOpenChange={setDeleteConfirmOpen}
            onConfirm={handleDeleteCategory}
            title="Are you sure?"
            description={`This will permanently delete the "${selectedCategory?.name}" category. This action cannot be undone.`}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryManagementPage;
