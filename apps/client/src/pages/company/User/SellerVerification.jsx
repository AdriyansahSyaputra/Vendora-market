import { useState, useMemo, useEffect } from "react";
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
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const SellerVerification = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [confirmAction, setConfirmAction] = useState({
    action: null,
    id: null,
  });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    sellerVerificationData();
  }, []);

  const sellerVerificationData = async () => {
    try {
      const response = await axios.get("/api/company/seller-applications", {
        withCredentials: true,
      });
      setRequests(response.data);
      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching seller verification data:", error);
      setRequests([]);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests
      .filter((req) => {
        const fullName = req.fullName?.toLowerCase() || "";
        const email = req.email?.toLowerCase() || "";
        const phone = req.phone || "";
        const status = req.status?.toLowerCase() || "";
        const storeName = req.storeName?.toLowerCase() || "";

        const query = searchQuery.toLowerCase();

        return (
          fullName.includes(query) ||
          email.includes(query) ||
          phone.includes(query) ||
          status.includes(query) ||
          storeName.includes(query)
        );
      })
      .filter(
        (req) =>
          !dateFilter ||
          new Date(req.createdAt).toISOString().split("T")[0] === dateFilter
      );
  }, [requests, searchQuery, dateFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    setRejectionReason("");
    setConfirmOpen(true);
    setDetailModalOpen(false);
  };

  const handleConfirmAction = async () => {
    const { action, id } = confirmAction;
    const status = action === "approve" ? "approved" : "rejected";

    // Validasi alasan penolakan
    if (status === "rejected" && rejectionReason.trim() === "") {
      toast.error("Rejection reason cannot be empty.");
      return;
    }

    try {
      const payload = { status };
      if (status === "rejected") {
        payload.rejectionReason = rejectionReason;
      }

      // Kirim request ke backend
      const response = await axios.put(
        `/api/company/seller-applications/${id}/status`,
        payload,
        { withCredentials: true }
      );

      toast.success(response.data.message);

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: status } : req
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error("Action Failed", { description: errorMessage });
    } finally {
      // Reset state setelah selesai
      setConfirmOpen(false);
      setConfirmAction({ action: null, id: null });
      setRejectionReason("");
    }
  };

  return (
    <>
      <Helmet title="Seller Verification" />

      <Toaster richColors position="top-center" />

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
                  <div className="flex flex-col sm:flex-row gap-2 mb-6">
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
                    formatDate={formatDate}
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
              onConfirm={handleConfirmAction}
              title={`Confirm ${
                confirmAction.action === "accept" ? "Acceptance" : "Rejection"
              }`}
              description={`Are you sure you want to ${confirmAction.action} this seller verification request? This action cannot be undone.`}
              action={confirmAction.action}
              reason={rejectionReason}
              onReasonChange={setRejectionReason}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default SellerVerification;
