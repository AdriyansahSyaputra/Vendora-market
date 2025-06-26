import { Button } from "@/components/ui/button";

const AdBannerSection = () => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-blue-600 p-8 md:p-12 flex items-center h-64 my-10">
      <div className="z-10">
        <h3 className="text-white font-bold text-3xl md:text-4xl mb-2">
          Jadi Seller di Vendora
        </h3>
        <p className="text-white/80 max-w-lg mb-6">
          Buka tokomu sekarang dan jangkau jutaan pelanggan di seluruh
          Indonesia. Gratis!
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-white/90"
        >
          Buka Toko Sekarang
        </Button>
      </div>
      {/* Background texture for aesthetic */}
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-10"
        style={{
          backgroundImage:
            "url(https://www.transparenttextures.com/patterns/cubes.png)",
        }}
      ></div>
    </div>
  );
};

export default AdBannerSection;
