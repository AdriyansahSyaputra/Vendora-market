import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

// A small component to handle file input UI
const FileInput = ({ name, label, required, onFileChange, form }) => {
  const [preview, setPreview] = useState(null);
  const fileValue = form.watch(name);

  useEffect(() => {
    if (fileValue && typeof fileValue === "string") {
      setPreview(fileValue);
    } else {
      setPreview(null);
    }
  }, [fileValue]);

  const handleLocalFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await onFileChange(name, file);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(name, null);
  };

  return (
    <FormItem>
      <FormLabel>
        {label} {required && <span className="text-destructive">*</span>}
      </FormLabel>
      <FormControl>
        {!preview ? (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={name}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Klik untuk mengunggah</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, atau PDF (MAX. 5MB)
                </p>
              </div>
              <Input
                id={name}
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleLocalFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3 truncate">
              <FileText className="h-6 w-6 text-primary" />
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">
                  File terpilih
                </span>
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Lihat Pratinjau
                </a>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

const DocumentUploadSection = ({ form, onFileChange }) => {
  const location = form.watch("location");
  const isIndonesia = location === "ID";

  if (!location) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unggah Dokumen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Pilih lokasi bisnis Anda terlebih dahulu untuk melihat dokumen yang
            diperlukan.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unggah Dokumen</CardTitle>
        <CardDescription>
          Unggah dokumen yang diperlukan untuk verifikasi. Pastikan gambar jelas
          dan tidak buram.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isIndonesia ? (
          <>
            <FileInput
              name="documents.ktp"
              label="Kartu Tanda Penduduk (KTP)"
              required
              form={form}
              onFileChange={onFileChange}
            />
            <FileInput
              name="documents.npwp"
              label="NPWP"
              required
              form={form}
              onFileChange={onFileChange}
            />
          </>
        ) : (
          <>
            <FileInput
              name="documents.passport"
              label="Paspor"
              required
              form={form}
              onFileChange={onFileChange}
            />
            <FileInput
              name="documents.businessLicense"
              label="Business License"
              required
              form={form}
              onFileChange={onFileChange}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
