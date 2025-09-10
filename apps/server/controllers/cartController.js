import Cart from "../models/cartModel.js";

export const addItemToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, storeId, name, image, price, quantity, variation, stock } =
    req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!storeId) {
      return res.status(400).json({ message: "StoreId is required" });
    }

    const newItem = {
      productId,
      storeId,
      name,
      image,
      price,
      quantity,
      variation,
      stock,
    };

    if (cart) {
      let existingItem;
      if (variation && variation.color && variation.size) {
        existingItem = cart.items.find(
          (item) =>
            item.productId.toString() === productId &&
            item.variation?.color === variation.color &&
            item.variation?.size === variation.size
        );
      } else {
        existingItem = cart.items.find((item) => {
          const isSameProduct = item.productId.toString() === productId;
          const hasNoVariation =
            !item.variation || (!item.variation.color && !item.variation.size);
          return isSameProduct && hasNoVariation;
        });
      }

      if (existingItem) {
        return res
          .status(409)
          .json({ message: "Item ini sudah ada di keranjang Anda." });
      }

      cart.items.push(newItem);
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [newItem],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "name images price slug stock variations",
      })
      .populate({
        path: "items.storeId",
        select: "name",
      });

    if (!cart) {
      return res.status(200).json({
        userId,
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// UPDATE: Mengubah kuantitas item di keranjang
export const updateCartItemQuantity = async (req, res) => {
  const userId = req.user._id;
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  // Validasi input awal
  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Kuantitas harus berupa angka positif." });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Keranjang tidak ditemukan untuk pengguna ini.",
      });
    }

    // Cari item spesifik di dalam keranjang
    const itemIndex = cart.items.findIndex(
      (item) => item && item._id && item._id.toString() === cartItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item tidak ditemukan di dalam keranjang.",
      });
    }

    const itemToUpdate = cart.items[itemIndex];

    // Validasi stok sebelum melakukan perubahan
    if (quantity > itemToUpdate.stock) {
      return res.status(400).json({
        message: `Stok tidak mencukupi. Sisa stok: ${itemToUpdate.stock}`,
      });
    }

    // Perbarui kuantitas dan simpan dokumen
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// DELETE: Menghapus item dari keranjang
export const removeCartItem = async (req, res) => {
  const userId = req.user._id;
  const { cartItemId } = req.params;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: cartItemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res
        .status(404)
        .json({ message: "Item tidak ditemukan atau keranjang kosong." });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
