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
import { Badge } from "@/components/ui/badge";

const statusColorMap = {
  pending: "bg-yellow-500",
  rejected: "bg-red-500",
  approved: "bg-green-500",
};


const SellerTable = ({ sellers, handleOpenDetailModal, formatDate }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Request Date</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.length > 0 ? (
            sellers.map((req, index) => (
              <TableRow key={req._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{req.fullName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {req.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {req.phone}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      statusColorMap[req.status.toLowerCase()] || "bg-gray-500"
                    } text-white`}
                  >
                    {req.status.charAt(0).toUpperCase() +
                      req.status.slice(1).toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(req.createdAt)}
                </TableCell>
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
                        onClick={() => handleOpenDetailModal(req)}
                      >
                        View Details
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

export default SellerTable;
