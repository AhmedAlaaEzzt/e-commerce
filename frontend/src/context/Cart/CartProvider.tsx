import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const addItemToCart = async (productId: number) => {
    try {
      setError(null);
      const response = await fetch(`${BASE_URL}/carts/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        setError("Failed to add item to cart");
        throw new Error("Failed to add item to cart");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to add item to cart");
        throw new Error("Failed to add item to cart");
      }

      const cartItemsMapped: CartItem[] = cart.items.map(
        ({ product, quantity }: any) => ({
          productId: product._id,
          title: product.title,
          quantity,
          unitPrice: product.price,
          image: product.image,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
