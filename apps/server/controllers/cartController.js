import Cart from "../models/cartModel.js";
import Product from "../models/productsModel.js";

const cartPopulation = [
  {
    path: "items.productId",
    select: "name images price slug stock variations",
  },
  {
    path: "items.storeId",
    select: "name",
  },
];

export const addItemToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, storeId, name, image, quantity, variation, stock } =
    req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    const finalPrice =
      product.discountedPrice > 0 ? product.discountedPrice : product.price;

    let cart = await Cart.findOne({ userId });

    if (!storeId) {
      return res.status(400).json({ message: "StoreId is required" });
    }

    const newItem = {
      productId,
      storeId,
      name,
      image,
      price: finalPrice,
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

      const populatedCart = await cart.populate(cartPopulation);

      return res.status(200).json(populatedCart);
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

  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Kuantitas harus berupa angka positif." });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Item tidak ditemukan di keranjang." });
    }

    const itemToUpdate = cart.items.id(cartItemId);
    if (!itemToUpdate) {
      return res
        .status(404)
        .json({ message: "Item spesifik tidak ditemukan." });
    }

    if (quantity > itemToUpdate.stock) {
      return res.status(400).json({
        message: `Stok tidak mencukupi. Sisa stok: ${itemToUpdate.stock}`,
      });
    }

    itemToUpdate.quantity = quantity;
    await cart.save();

    const populatedCart = await cart.populate(cartPopulation);

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
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
    ).populate(cartPopulation);

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
