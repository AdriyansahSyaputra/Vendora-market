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
import LogItem from "@/components/Layouts/company/Log-activity/LogItem";
import SearchFilter from "@/components/Layouts/company/Log-activity/SearchFilter";

const logData = [
  {
    id: 1,
    user: {
      name: "Ahmad Zulkifli",
      role: "Admin",
      avatarUrl: "https://i.pravatar.cc/150?u=admin",
    },
    action: "DELETED_USER",
    description: 'Menghapus pengguna "Bambang" karena akun tidak aktif.',
    target: "User ID: 112",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    user: {
      name: "Siti Aminah",
      role: "Manager",
      avatarUrl: "https://i.pravatar.cc/150?u=manager",
    },
    action: "APPROVED_PROMO",
    description: 'Menyetujui promosi "Mega Sale 7.7".',
    target: "Promo ID: P-77",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    user: {
      name: "Rina Hartono",
      role: "Finance",
      avatarUrl: "https://i.pravatar.cc/150?u=finance",
    },
    action: "EXPORTED_REPORT",
    description: "Mengekspor laporan penjualan bulanan (Juni 2025).",
    target: "Laporan Keuangan",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    user: {
      name: "Dedi Setiawan",
      role: "Staff",
      avatarUrl: "https://i.pravatar.cc/150?u=staff1",
    },
    action: "UPDATED_PRODUCT",
    description:
      'Memperbarui stok untuk "Premium Headphones" menjadi 150 unit.',
    target: "SKU-001-XYZ",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    user: {
      name: "Ahmad Zulkifli",
      role: "Admin",
      avatarUrl: "https://i.pravatar.cc/150?u=admin",
    },
    action: "CHANGED_SETTINGS",
    description: "Mengubah pengaturan ongkos kirim default.",
    target: "Pengaturan Sistem",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    user: {
      name: "Rina Hartono",
      role: "Finance",
      avatarUrl: "https://i.pravatar.cc/150?u=finance",
    },
    action: "PROCESSED_REFUND",
    description: "Memproses refund untuk pesanan TRX-005.",
    target: "Order ID: TRX-005",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 7,
    user: {
      name: "Siti Aminah",
      role: "Manager",
      avatarUrl: "https://i.pravatar.cc/150?u=manager",
    },
    action: "SUSPENDED_STORE",
    description: 'Menangguhkan toko "Nakal Store" karena pelanggaran.',
    target: "Store ID: S-99",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 8,
    user: {
      name: "Dedi Setiawan",
      role: "Staff",
      avatarUrl: "https://i.pravatar.cc/150?u=staff1",
    },
    action: "ADDED_VOUCHER",
    description: 'Menambahkan voucher baru "Diskon Merdeka".',
    target: "Voucher ID: V-08",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
const roles = ["Admin", "Manager", "Staff", "Finance"];

const LogActivityPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logs, setLogs] = useState(logData);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filteredLogs = useMemo(() => {
    return logs
      .filter(
        (log) =>
          log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((log) => roleFilter === "All" || log.user.role === roleFilter)
      .filter(
        (log) =>
          !dateFilter ||
          new Date(log.timestamp).toISOString().slice(0, 10) === dateFilter
      );
  }, [logs, searchQuery, roleFilter, dateFilter]);

  const formatRelativeTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) return `${diffInDays} hari yang lalu`;
    if (diffInHours > 0) return `${diffInHours} jam yang lalu`;
    if (diffInMinutes > 0) return `${diffInMinutes} menit yang lalu`;
    return "Baru saja";
  };

  return (
    <>
      <Helmet title="All Product" />

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
            <Card>
              <CardHeader>
                <CardTitle>Log Activity</CardTitle>
                <CardDescription>
                  View all activities related to your account, including logins,
                  changes, and other significant events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:gap-8">
                  <SearchFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    roles={roles}
                  />

                  <div className="space-y-4">
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <LogItem
                          key={log.id}
                          log={log}
                          formatRelativeTime={formatRelativeTime}
                        />
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        Tidak ada aktivitas yang ditemukan.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default LogActivityPage;
