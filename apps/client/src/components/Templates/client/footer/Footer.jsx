import {
  Truck,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Shield,
  CreditCard,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    about: {
      title: "Tentang Vendora",
      links: [
        "Tentang Kami",
        "Karir",
        "Blog",
        "Press Kit",
        "Investor Relations",
      ],
    },
    help: {
      title: "Bantuan & Panduan",
      links: [
        "Pusat Bantuan",
        "Cara Berbelanja",
        "Cara Berjualan",
        "Kebijakan Privasi",
        "Syarat & Ketentuan",
      ],
    },
    services: {
      title: "Layanan Kami",
      links: [
        "Vendora Pay",
        "Vendora Delivery",
        "Vendora Insurance",
        "Vendora Care",
        "Vendora Business",
      ],
    },
    payment: {
      title: "Metode Pembayaran",
      links: ["Transfer Bank", "Kartu Kredit", "E-Wallet", "Cicilan 0%", "COD"],
    },
  };

  return (
    <footer className="hidden md:block bg-gray-100 dark:bg-gray-950 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Vendora
              <span className="text-blue-600 dark:text-blue-500">Market</span>
            </h3>
            <p className="text-sm mb-4">
              Platform e-commerce terpercaya dengan jutaan produk berkualitas
              dari ribuan seller terpilih.
            </p>
            <div className="flex space-x-4">
              <a href="#">
                <Facebook className="w-6 h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a href="#">
                <Twitter className="w-6 h-6 hover:text-sky-500 transition-colors" />
              </a>
              <a href="#">
                <Instagram className="w-6 h-6 hover:text-pink-500 transition-colors" />
              </a>
              <a href="#">
                <Youtube className="w-6 h-6 hover:text-red-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex justify-around items-center">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Customer Service
                </p>
                <p className="text-sm">0804-1-500-500</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Email
                </p>
                <p className="text-sm">support@vendoramarket.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Alamat
                </p>
                <p className="text-sm">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                {" "}
                <Shield className="w-5 h-5 text-green-500" />{" "}
                <span className="text-sm">Keamanan Terjamin</span>{" "}
              </div>
              <div className="flex items-center space-x-2">
                {" "}
                <Truck className="w-5 h-5 text-blue-500" />{" "}
                <span className="text-sm">Pengiriman Cepat</span>{" "}
              </div>
              <div className="flex items-center space-x-2">
                {" "}
                <CreditCard className="w-5 h-5 text-purple-500" />{" "}
                <span className="text-sm">Pembayaran Aman</span>{" "}
              </div>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} Vendora Market. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
