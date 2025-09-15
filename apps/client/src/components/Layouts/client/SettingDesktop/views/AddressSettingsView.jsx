import React, { useState, useEffect } from "react";
import AddressForm from "@/components/Elements/AddressForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

// 2. Komponen Kartu Alamat
const AddressCard = ({ address, onEdit }) => {
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
    <Card className="bg-slate-50 dark:bg-slate-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          {address.label}
          {address.isDefault && (
            <span className="text-xs font-normal text-sky-500 ml-2 py-0.5 px-2 rounded-full bg-sky-100 dark:bg-sky-900/50">
              Utama
            </span>
          )}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
          Ubah
        </Button>
      </CardHeader>
      <CardContent>
        {/* Username dan nomor telepon telah dihapus dari sini */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {fullAddress}
        </p>
      </CardContent>
    </Card>
  );
};

// Asumsi SettingsContentCard adalah komponen wrapper Anda
const SettingsContentCard = ({ title, description, children }) => (
  <div className="p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-md">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mt-1">{description}</p>
    </div>
    {children}
  </div>
);

const AddressSettingsView = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
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

  const handleSubmit = async (data) => {
    if (editingAddress) {
      await axios.put(
        `/api/client/addresses/${editingAddress._id}/update`,
        data,
        { withCredentials: true }
      );

      fetchAddresses();
    } else {
      await axios.post("/api/client/addresses/new", data, {
        withCredentials: true,
      });
      fetchAddresses();
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!editingAddress) return;
    axios
      .delete(`/api/client/addresses/${editingAddress._id}/delete`, {
        withCredentials: true,
      })
      .then(() => fetchAddresses());
    setIsModalOpen(false);
  };

  return (
    <SettingsContentCard
      title="Daftar Alamat"
      description="Kelola alamat pengiriman yang tersimpan."
    >
      {" "}
      <div className="flex justify-end mb-6">
        <Button onClick={handleAddNew}>
          <PlusCircle className="w-4 h-4 mr-2" /> Tambah Alamat Baru
        </Button>{" "}
      </div>{" "}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-10">
            <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
          </div>
        )}
        {!loading && (
          <>
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <AddressCard
                  key={addr._id}
                  address={addr}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <p className="text-slate-500">
                  Anda belum memiliki alamat tersimpan.
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Ubah Alamat" : "Tambah Alamat Baru"}
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            key={editingAddress?._id || "new"}
            defaultValues={editingAddress}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>{" "}
    </SettingsContentCard>
  );
};

export default AddressSettingsView;
