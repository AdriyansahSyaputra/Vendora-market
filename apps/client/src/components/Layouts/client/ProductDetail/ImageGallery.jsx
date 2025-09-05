import { useState, useRef } from "react";

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragRef = useRef({ startX: 0, isDragging: false, scrollLeft: 0 });

  const handleMouseDown = (e) => {
    dragRef.current = {
      ...dragRef.current,
      isDragging: true,
      startX: e.pageX - e.currentTarget.offsetLeft,
      scrollLeft: e.currentTarget.scrollLeft,
    };
  };
  const handleMouseMove = (e) => {
    if (!dragRef.current.isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - dragRef.current.startX) * 2;
    e.currentTarget.scrollLeft = dragRef.current.scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => {
    dragRef.current.isDragging = false;
  };
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    const mainImage = document.getElementById("main-image-container");
    if (mainImage) {
      const targetScroll = mainImage.children[index].offsetLeft;
      mainImage.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };
  const onScroll = (e) => {
    const newIndex = Math.round(e.target.scrollLeft / e.target.offsetWidth);
    if (newIndex !== currentIndex) setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <div
        id="main-image-container"
        className="relative aspect-square w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide flex"
        onScroll={onScroll}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 snap-center">
            <img
              src={img}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div
        className="mt-2 flex space-x-2 overflow-x-auto scrollbar-hide p-1 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {images.slice(0, 5).map((img, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-1/5 aspect-square flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
              currentIndex === index
                ? "border-slate-900 dark:border-slate-300 scale-105"
                : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
