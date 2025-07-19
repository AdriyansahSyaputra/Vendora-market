import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

// A small component to handle file input UI
const FileInput = ({
  id,
  label,
  required,
  onFileChange,
  file,
  onFileRemove,
}) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onFileChange(id, selectedFile);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemove = () => {
    onFileRemove(id);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    const input = document.getElementById(id);
    if (input) input.value = "";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {!file ? (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, or PDF (MAX. 5MB)
              </p>
            </div>
            <Input
              id={id}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.pdf"
            />
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3 truncate">
            <FileText className="h-6 w-6 text-primary" />
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium truncate">{file.name}</span>
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                View Preview
              </a>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const DocumentUploadSection = ({ formData, setFormData }) => {
  const location = formData.address?.location;
  const isIndonesia = location === "ID";

  const handleFileChange = (id, file) => {
    setFormData({
      ...formData,
      documents: { ...formData.documents, [id]: file },
    });
  };

  const handleFileRemove = (id) => {
    const newDocuments = { ...formData.documents };
    delete newDocuments[id];
    setFormData({ ...formData, documents: newDocuments });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>
          Upload the required documents for verification. Ensure the images are
          clear and not blurry.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {location ? (
          <>
            <FileInput
              id="identity"
              label={
                isIndonesia ? "Upload National ID (KTP)" : "Upload Passport"
              }
              required
              onFileChange={handleFileChange}
              onFileRemove={handleFileRemove}
              file={formData.documents?.identity}
            />
            <FileInput
              id="business"
              label={
                isIndonesia
                  ? "Upload Tax ID / Business License (Optional)"
                  : "Upload Business Registration Document (Optional)"
              }
              onFileChange={handleFileChange}
              onFileRemove={handleFileRemove}
              file={formData.documents?.business}
            />
          </>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Please select your business location country first to see the
            required documents.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
