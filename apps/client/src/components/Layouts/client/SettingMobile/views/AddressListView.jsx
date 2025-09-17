import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  PlusCircle,
  MoreVertical,
  Loader2,
  Trash2,
  SquarePen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const AddressCardMobile = ({ address, onEdit, onDelete }) => {
  const fullAddress = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    `${address.state} ${address.postalCode}`,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="p-4 rounded-lg border dark:border-slate-800">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold flex items-center">
            {address.label}
            {address.isDefault && (
              <span className="text-xs font-medium text-sky-600 dark:text-sky-400 ml-2 py-0.5 px-2 rounded-full bg-sky-100 dark:bg-sky-900/50">
                Utama
              </span>
            )}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {fullAddress}
          </p>
        </div>

        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(address)}>
              <SquarePen className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-500 focus:text-red-500">
                  <Trash2 className="w-4 h-4 mr-2" /> Hapus
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Alamat ini akan dihapus
                secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(address._id)}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};

const AddressListView = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddNew = () => {
    navigate("/settings/addresses/new");
  };

  const handleEdit = (address) => {
    navigate(`/settings/addresses/${address._id}/edit`, { state: { address } });
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/client/addresses");
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`/api/client/addresses/${addressId}/delete`);
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {" "}
      <Button variant="outline" className="w-full" onClick={handleAddNew}>
        <PlusCircle className="w-4 h-4 mr-2" /> Tambah Alamat Baru{" "}
      </Button>{" "}
      {loading && (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
        </div>
      )}
      {!loading && (
        <>
          {addresses.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400 py-10">
              Belum ada alamat tersimpan.
            </p>
          ) : (
            addresses.map((address) => (
              <AddressCardMobile
                key={address._id}
                address={address}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default AddressListView;
