const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Hilangkan karakter selain huruf/angka/spasi
    .replace(/\s+/g, "-") // Spasi jadi -
    .replace(/-+/g, "-");

export default slugify;
