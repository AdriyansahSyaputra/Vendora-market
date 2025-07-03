import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/Elements/StarRating";
import ReplyModal from "./ReplyModal";
import { MoreVertical, MessageSquare } from "lucide-react";

const IndividualReviewCard = ({ review }) => {
  const [sellerReply, setSellerReply] = useState(review.sellerReply || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReplySubmit = (text) => {
    setSellerReply(text);
  };

  return (
    <>
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={review.user.avatar} />
              <AvatarFallback>
                {review.user.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{review.user.name}</p>
              <StarRating rating={review.rating} starClassName="h-4 w-4" />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                {sellerReply ? "Edit Reply" : "Reply to Review"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            "{review.text}"
          </p>
          {sellerReply && (
            <div className="mt-4 ml-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                  Your Reply
                </p>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300/80">
                {sellerReply}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <ReplyModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialText={sellerReply}
        onSubmit={handleReplySubmit}
      />
    </>
  );
};

export default IndividualReviewCard;
