const BrandsSection = () => {
  const brands = [
    {
      name: "Brand A",
      logo: "https://placehold.co/150x60/F3F4F6/9CA3AF?text=BRAND+A",
    },
    {
      name: "Brand B",
      logo: "https://placehold.co/150x60/F3F4F6/9CA3AF?text=BRAND+B",
    },
    {
      name: "Brand C",
      logo: "https://placehold.co/150x60/F3F4F6/9CA3AF?text=BRAND+C",
    },
    {
      name: "Brand D",
      logo: "https://placehold.co/150x60/F3F4F6/9CA3AF?text=BRAND+D",
    },
    {
      name: "Brand E",
      logo: "https://placehold.co/150x60/F3F4F6/9CA3AF?text=BRAND+E",
    },
    {
      name: "Brand F",
      logo: "https://placehold.co/150x60/F3F4F6/9CA3AF?text=BRAND+F",
    },
  ];

  return (
    <div className="py-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
        {brands.map((brand) => (
          <div key={brand.name} className="flex justify-center p-2">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-8 md:h-10 object-contain transition-all filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsSection;
