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
import SearchFilter from "@/components/Layouts/company/User/List-user/SearchFilter";
import UserTable from "@/components/Layouts/company/User/List-user/UserTable";
import PaginationTable from "@/components/Elements/Pagination";
import UserDetailsModal from "@/components/Layouts/company/User/List-user/UserDetailsModal";
import BanUserModal from "@/components/Layouts/company/User/List-user/BanUserModal";

const allUsersData = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "555-0101",
    role: "Seller",
    status: "Active",
    location: "New York, USA",
    dob: "1990-05-15",
    address: "123 Main St, New York, NY 10001",
    totalTransactions: 150,
    joinDate: "2023-01-20",
    totalSales: 50000,
    storeStatus: "Active",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    phone: "555-0102",
    role: "Buyer",
    status: "Active",
    location: "London, UK",
    dob: "1992-08-22",
    address: "456 Oak Ave, London, SW1A 0AA",
    totalTransactions: 45,
    joinDate: "2023-02-10",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    name: "Carlos Garcia",
    username: "carlosg",
    email: "carlos.garcia@example.com",
    phone: "555-0103",
    role: "Seller",
    status: "Inactive",
    location: "Madrid, Spain",
    dob: "1988-11-30",
    address: "789 Pine Ln, Madrid, 28001",
    totalTransactions: 80,
    joinDate: "2023-03-05",
    totalSales: 25000,
    storeStatus: "Inactive",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    name: "Aisha Khan",
    username: "aishak",
    email: "aisha.khan@example.com",
    phone: "555-0104",
    role: "Buyer",
    status: "Active",
    location: "Dubai, UAE",
    dob: "1995-02-18",
    address: "101 Palm Jumeirah, Dubai",
    totalTransactions: 20,
    joinDate: "2023-04-12",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/150?u=a092581f4e29026705d",
    name: "Kenji Tanaka",
    username: "kenjit",
    email: "kenji.tanaka@example.com",
    phone: "555-0105",
    role: "Seller",
    status: "Active",
    location: "Tokyo, Japan",
    dob: "1991-07-07",
    address: "202 Shibuya Crossing, Tokyo, 150-0043",
    totalTransactions: 210,
    joinDate: "2023-05-21",
    totalSales: 75000,
    storeStatus: "Active",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    name: "Fatima Al-Fassi",
    username: "fatima_af",
    email: "fatima.fassi@example.com",
    phone: "555-0106",
    role: "Buyer",
    status: "Inactive",
    location: "Rabat, Morocco",
    dob: "1998-09-01",
    address: "303 Kasbah of the Udayas, Rabat",
    totalTransactions: 5,
    joinDate: "2023-06-30",
  },
  {
    id: 7,
    name: "Michael Brown",
    username: "mikeb",
    email: "michael.b@example.com",
    phone: "555-0107",
    role: "Buyer",
    status: "Active",
    location: "Sydney, Australia",
    dob: "1993-03-10",
    address: "404 Bondi Beach, Sydney, NSW 2026",
    totalTransactions: 33,
    joinDate: "2023-07-01",
  },
  {
    id: 8,
    name: "Sophia Loren",
    username: "sophial",
    email: "sophia.l@example.com",
    phone: "555-0108",
    role: "Seller",
    status: "Active",
    location: "Rome, Italy",
    dob: "1985-12-25",
    address: "505 Via del Corso, Rome, 00186",
    totalTransactions: 300,
    joinDate: "2023-07-15",
    totalSales: 120000,
    storeStatus: "Active",
  },
  {
    id: 9,
    name: "David Chen",
    username: "davidc",
    email: "david.chen@example.com",
    phone: "555-0109",
    role: "Buyer",
    status: "Active",
    location: "Shanghai, China",
    dob: "1996-06-08",
    address: "606 The Bund, Shanghai, 200002",
    totalTransactions: 15,
    joinDate: "2023-08-02",
  },
  {
    id: 10,
    name: "Isabella Rossi",
    username: "isarossi",
    email: "isabella.r@example.com",
    phone: "555-0110",
    role: "Buyer",
    status: "Inactive",
    location: "Milan, Italy",
    dob: "1999-04-19",
    address: "707 Galleria Vittorio, Milan, 20121",
    totalTransactions: 8,
    joinDate: "2023-08-20",
  },
  {
    id: 11,
    name: "Liam Wilson",
    username: "liamw",
    email: "liam.w@example.com",
    phone: "555-0111",
    role: "Seller",
    status: "Active",
    location: "Toronto, Canada",
    dob: "1990-10-10",
    address: "808 CN Tower, Toronto, M5V 2T6",
    totalTransactions: 180,
    joinDate: "2023-09-01",
    totalSales: 65000,
    storeStatus: "Active",
  },
];

const AllUserPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [users, setUsers] = useState(allUsersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isBanModalOpen, setBanModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((user) => roleFilter === "All" || user.role === roleFilter)
      .filter((user) => statusFilter === "All" || user.status === statusFilter);
  }, [users, searchQuery, roleFilter, statusFilter]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleOpenDetailModal = (user) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  };

  const handleOpenBanModal = (user) => {
    setSelectedUser(user);
    setBanModalOpen(true);
  };

  const handleBanConfirm = (userId, reason) => {
    console.log(`Banning user ${userId} for reason: ${reason}`);
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, status: "Inactive" } : u))
    );
    setBanModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Helmet title="List User" />

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
                  <SearchFilter />
                  <UserTable
                    users={paginatedUsers}
                    handleOpenDetailModal={handleOpenDetailModal}
                    handleOpenBanModal={handleOpenBanModal}
                  />
                  <PaginationTable
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </CardContent>
              </Card>
            </div>

            <UserDetailsModal
              user={selectedUser}
              isOpen={isDetailModalOpen}
              onClose={() => setDetailModalOpen(false)}
            />
            <BanUserModal
              user={selectedUser}
              isOpen={isBanModalOpen}
              onClose={() => setBanModalOpen(false)}
              onConfirm={handleBanConfirm}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default AllUserPage;
