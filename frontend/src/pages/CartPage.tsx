import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

export const CartPage = () => {
  const { token } = useAuth();

  const { cartItems, totalAmount } = useCart();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!token) return;
  //   const fetchCart = async () => {
  //     const response = await fetch(`${BASE_URL}/carts`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       setError("Failed to fetch user cart. please try again later");
  //       throw new Error("Failed to fetch cart");
  //     }

  //     await response.json();
  //   };
  //   fetchCart();
  // }, [token]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {!cartItems.length && (
        <Typography variant="h4">No items in cart</Typography>
      )}
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div>
            <img width={32} src={item.image} alt={item.title} />
            <Typography>{item.title}</Typography>
            <Typography>{item.quantity}</Typography>
            <Typography>{item.unitPrice}</Typography>

            <Button>Remove</Button>
          </div>
        ))}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};
