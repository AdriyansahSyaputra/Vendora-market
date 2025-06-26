import { ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BannerCarousel = ({ slides }) => {
  return (
    <Carousel
      className="w-full rounded-2xl overflow-hidden"
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-48 md:h-64 w-full">
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6 md:p-12">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 md:mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg text-white/90 max-w-md mb-4 md:mb-6">
                  {slide.desc}
                </p>
                <Button className="bg-white text-gray-900 hover:bg-white/90 text-xs md:text-sm h-9 md:h-11">
                  {slide.cta} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BannerCarousel;
