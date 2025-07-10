import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

const BannerCard = ({ banner, onEdit, onDelete }) => {
  return (
    <Card className="flex flex-col relative">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white"
            >
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit(banner)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => onDelete(banner)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg">{banner.title}</h3>
        <p className="text-sm text-muted-foreground">
          Location: {banner.location}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Duration: {banner.startDate} to {banner.endDate}
        </p>
      </CardContent>
    </Card>
  );
};

export default BannerCard;
