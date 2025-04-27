import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
export const CartPage = () => {
  const [cart, setCart] = useState();
  const [error, setError] = useState("");
  const { token } = useAuth();

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

      const data = await response.json();
      setCart(data);
    };
    fetchCart();
  }, [token]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};
