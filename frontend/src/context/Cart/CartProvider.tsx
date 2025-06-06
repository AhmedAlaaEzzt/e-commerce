import { FC, PropsWithChildren, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart. please try again later");
        throw new Error("Failed to fetch cart");
      }

      const cart = await response.json();

      const cartItemsMapped: CartItem[] = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          quantity,
          unitPrice: product.price,
          image: product.image,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
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

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      setError(null);
      const response = await fetch(`${BASE_URL}/carts/items/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        setError("Failed to update item to cart");
        throw new Error("Failed to update item to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse item to cart");
        throw new Error("Failed to parse item to cart");
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

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/carts/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to remove item from cart");
        throw new Error("Failed to remove item from cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse item to cart");
        throw new Error("Failed to parse item to cart");
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

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/carts`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to clear item from cart");
        throw new Error("Failed to clear item from cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse item to cart");
        throw new Error("Failed to parse item to cart");
      }

      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
