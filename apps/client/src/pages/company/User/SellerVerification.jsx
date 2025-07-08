import { useState, useMemo } from "react";
import Sidebar from "@/components/Templates/company/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfirmationDialog from "@/components/Layouts/company/User/Seller-verification/ConfirmationDialog";
import SellerVerificationModal from "@/components/Layouts/company/User/Seller-verification/SellerVerificationModal";
import SellerTable from "@/components/Layouts/company/User/Seller-verification/SellerTable";
import { Input } from "@/components/ui/input";
import PaginationTable from "@/components/Elements/Pagination";

const sellerVerificationData = [
  {
    id: "REQ-001",
    name: "Emily White",
    email: "emily.white@example.com",
    phone: "555-0201",
    requestDate: "2024-07-15",
    storeName: "Emily's Handmade Goods",
    description: "Unique handmade crafts and jewelry.",
    storeAddress: "111 Craft St, Austin, TX",
    npwpUrl: "#",
    ktpUrl: "#",
    bankAccount: "Bank of America - **** 1234",
  },
  {
    id: "REQ-002",
    name: "Ben Carter",
    email: "ben.carter@example.com",
    phone: "555-0202",
    requestDate: "2024-07-14",
    storeName: "Ben's Vintage Finds",
    description: "Curated vintage clothing and accessories.",
    storeAddress: "222 Retro Ave, Portland, OR",
    npwpUrl: "#",
    ktpUrl: "#",
    bankAccount: "Chase - **** 5678",
  },
  {
    id: "REQ-003",
    name: "Chloe Davis",
    email: "chloe.davis@example.com",
    phone: "555-0203",
    requestDate: "2024-07-12",
    storeName: "The Gadget Hub",
    description: "Latest tech and electronic gadgets.",
    storeAddress: "333 Tech Park, San Francisco, CA",
    npwpUrl: "#",
    ktpUrl: "#",
    bankAccount: "Wells Fargo - **** 9012",
  },
  {
    id: "REQ-004",
    name: "Daniel Evans",
    email: "daniel.evans@example.com",
    phone: "555-0204",
    requestDate: "2024-06-28",
    storeName: "Gourmet Pantry",
    description: "Artisanal foods and ingredients.",
    storeAddress: "444 Foodie Blvd, Chicago, IL",
    npwpUrl: "#",
    ktpUrl: "#",
    bankAccount: "Citibank - **** 3456",
  },
  {
    id: "REQ-005",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    phone: "555-0205",
    requestDate: "2024-06-25",
    storeName: "Green Thumb Botanics",
    description: "Rare and exotic house plants.",
    storeAddress: "555 Garden Way, Miami, FL",
    npwpUrl: "#",
    ktpUrl: "#",
    bankAccount: "Bank of America - **** 7890",
  },
];

const SellerVerification = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [requests, setRequests] = useState(sellerVerificationData);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState({
    action: null,
    id: null,
  });

  const ITEMS_PER_PAGE = 10;

  const filteredRequests = useMemo(() => {
    return requests
      .filter(
        (req) =>
          req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((req) => !dateFilter || req.requestDate === dateFilter);
  }, [requests, searchQuery, dateFilter]);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);

  const handleOpenDetailModal = (request) => {
    setSelectedRequest(request);
    setDetailModalOpen(true);
  };

  const handleAction = (action, id) => {
    setConfirmAction({ action, id });
    setConfirmOpen(true);
    setDetailModalOpen(false);
  };

  const handleConfirm = () => {
    console.log(
      `${
        confirmAction.action === "accept" ? "Accepting" : "Rejecting"
      } request ${confirmAction.id}`
    );
    setRequests(requests.filter((req) => req.id !== confirmAction.id));
    setConfirmOpen(false);
    setConfirmAction({ action: null, id: null });
  };

  return (
    <>
      <Helmet title="Seller Verification" />

      <div className="flex min-h-screen max-w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        <div
          className={`flex flex-col w-full transition-all duration-300 ${
            isCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4 ">
            <div className="flex flex-col gap-4 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>
                    Manage, filter, and view all your company users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {" "}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="flex-grow"
                    />
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => {
                        setDateFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full sm:w-auto"
                    />
                  </div>
                  <SellerTable
                    sellers={paginatedRequests}
                    handleOpenDetailModal={handleOpenDetailModal}
                  />
                  <PaginationTable
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </CardContent>
              </Card>
            </div>

            <SellerVerificationModal
              request={selectedRequest}
              isOpen={isDetailModalOpen}
              onClose={() => setDetailModalOpen(false)}
              onAction={handleAction}
            />
            <ConfirmationDialog
              open={isConfirmOpen}
              onOpenChange={setConfirmOpen}
              onConfirm={handleConfirm}
              title={`Confirm ${
                confirmAction.action === "accept" ? "Acceptance" : "Rejection"
              }`}
              description={`Are you sure you want to ${confirmAction.action} this seller verification request? This action cannot be undone.`}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default SellerVerification;
