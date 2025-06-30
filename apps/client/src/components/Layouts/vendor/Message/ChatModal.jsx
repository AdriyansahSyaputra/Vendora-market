import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatModal = ({ isOpen, onOpenChange, messageData, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageData?.history]);

  if (!messageData) return null;

  const handleSendClick = () => {
    if (newMessage.trim()) {
      onSendMessage(messageData.id, newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg p-0 flex flex-col h-[80vh] max-h-[700px]">
        <DialogHeader className="flex-row items-center space-x-4 p-4 border-b">
          <Avatar>
            <AvatarImage src={messageData.avatar} alt={messageData.name} />
            <AvatarFallback>{messageData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <DialogTitle className="font-semibold text-base">
            {messageData.name}
          </DialogTitle>
        </DialogHeader>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messageData.history.map((chat, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                chat.sender === "seller" ? "justify-end" : "justify-start"
              }`}
            >
              {chat.sender === "buyer" && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={messageData.avatar} />
                </Avatar>
              )}
              <div
                className={`rounded-lg px-3 py-2 max-w-[75%] ${
                  chat.sender === "seller"
                    ? "bg-cyan-600 text-white dark:bg-cyan-500"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{chat.text}</p>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="p-4 border-t bg-background">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSendClick}
              className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
