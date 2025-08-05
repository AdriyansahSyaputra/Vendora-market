export const notificationsData = [
  {
    id: 1,
    type: "promo",
    title: "Diskon 50% Khusus Untukmu!",
    description: "Klaim voucher diskon 50% untuk semua elektronik.",
    timestamp: "5 menit lalu",
    isRead: false,
    detailContent: {
      header: "Voucher Diskon 50% Telah Tiba!",
      body: "Nikmati diskon 50% (hingga Rp50.000) untuk semua item di kategori Elektronik. Gunakan kode: VENDORA50 saat checkout.",
      cta: { text: "Lihat Produk Promo", link: "/products/promo" },
    },
  },
  {
    id: 2,
    type: "order",
    title: "Pesanan Diproses",
    description: "Pesanan #INV12345 sedang disiapkan oleh penjual.",
    timestamp: "1 jam lalu",
    isRead: false,
    detailContent: {
      header: "Status Pesanan: #INV12345",
      body: "Kabar baik! Penjual telah menerima pesanan Anda dan sedang menyiapkannya untuk pengiriman.",
      cta: { text: "Lacak Pesanan", link: "/orders/INV12345" },
    },
  },
];

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getNotificationBySlug(slug) {
  return notificationsData.find((n) => slugify(n.title) === slug);
}
