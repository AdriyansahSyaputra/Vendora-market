import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ReplyModal = ({ isOpen, onOpenChange, initialText = "", onSubmit }) => {
  const [replyText, setReplyText] = useState(initialText);

  useEffect(() => {
    setReplyText(initialText);
  }, [initialText, isOpen]);

  const handleSubmit = () => {
    onSubmit(replyText);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialText ? "Edit Reply" : "Reply to Review"}
          </DialogTitle>
          <DialogDescription>
            {initialText
              ? "Modify your response to the customer."
              : "Write a public response to this review."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="reply-text" className="sr-only">
            Reply
          </Label>
          <Textarea
            id="reply-text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Your response..."
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {initialText ? "Save Changes" : "Post Reply"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
