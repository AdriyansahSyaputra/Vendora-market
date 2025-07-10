import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MessageModal = ({ store, isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  if (!isOpen || !store) return null;
  const handleSend = () => {
    alert(`Message successfully sent to ${store.storeName}:\n\n${message}`);
    onClose();
    setMessage("");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Kirim Pesan ke {store?.storeName || "Store"}
          </DialogTitle>
          <DialogDescription>
            This message will be sent directly to the shop owner through the
            platform's internal system.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder="Tulis pesan Anda di sini..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          autoFocus
        />

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSend} disabled={!message.trim()}>
            Kirim Pesan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
