import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const slides = [
    {
      img: "https://placehold.co/1200x500/000000/FFFFFF?text=Mega+Sale+7.7",
      title: "Mega Sale 7.7",
      desc: "Diskon hingga 70% untuk semua produk elektronik!",
      cta: "Belanja Sekarang",
    },
    {
      img: "https://placehold.co/1200x500/3B82F6/FFFFFF?text=Koleksi+Fashion+Terbaru",
      title: "Koleksi Fashion Terbaru",
      desc: "Tampil gaya dengan koleksi fashion musim ini.",
      cta: "Lihat Koleksi",
    },
    {
      img: "https://placehold.co/1200x500/10B981/FFFFFF?text=Gratis+Ongkir+Se-Indonesia",
      title: "Gratis Ongkir Se-Indonesia",
      desc: "Nikmati bebas ongkos kirim tanpa minimum pembelian.",
      cta: "Cek Syarat & Ketentuan",
    },
  ];

  return (
    <Carousel
      className="w-full rounded-lg overflow-hidden"
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-56 md:h-72 lg:h-96 w-full">
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-8 md:p-16">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-md mb-6">
                  {slide.desc}
                </p>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90"
                >
                  {slide.cta} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSection;
