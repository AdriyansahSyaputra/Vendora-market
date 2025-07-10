import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import ReputationStars from "./ReputationStars";

const StoreTable = ({
  stores,
  handleOpenDetailModal,
  handleOpenDeleteModal,
  handleOpenStatusModal,
  handleOpenMessageModal,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Reputation</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.length > 0 ? (
            stores.map((store, index) => (
              <TableRow key={store.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{store.sellerName}</TableCell>
                <TableCell>{store.storeName}</TableCell>
                <TableCell>{store.location}</TableCell>
                <TableCell><ReputationStars rating={store.reputation} /></TableCell>
                <TableCell>{store.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleOpenDetailModal(store)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenStatusModal(store)} >
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenMessageModal(store)} > 
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenDeleteModal(store)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreTable;
