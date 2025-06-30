import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MailOpen, Mail } from "lucide-react";

const CardMessage = ({ message, handleReplyClick }) => {
  return (
    <div
      key={message.id}
      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={message.avatar} alt={message.name} />
          <AvatarFallback>{message.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{message.name}</p>
          <p className="text-sm text-muted-foreground truncate">
            {message.preview}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t">
        <div
          className={`flex items-center gap-2 text-xs font-medium ${
            message.isRead
              ? "text-muted-foreground"
              : "text-cyan-600 dark:text-cyan-400"
          }`}
        >
          {message.isRead ? (
            <MailOpen className="h-4 w-4" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          <span>{message.isRead ? "Read" : "Unread"}</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleReplyClick(message)}
        >
          Reply
        </Button>
      </div>
    </div>
  );
};

export default CardMessage;
