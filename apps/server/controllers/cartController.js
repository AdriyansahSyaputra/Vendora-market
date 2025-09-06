import Cart from "../models/Cart.js";

export const addItemToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, name, image, price, quantity, variation, seller } =
    req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({
          productId,
          name,
          image,
          price,
          quantity,
          variation,
          seller,
        });
      }
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity, variation, name, image, price, seller }],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
