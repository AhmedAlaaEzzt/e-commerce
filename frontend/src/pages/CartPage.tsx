import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateItemInCart(productId, quantity);
  };

  const handelRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={clearCart}>Clear Cart</Button>
      </Box>
      {!cartItems.length && (
        <Typography variant="h4">No items in cart</Typography>
      )}

      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "start",
          }}
        >
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              sx={{
                display: "flex",
                alignItems: "start",
                gap: 2,
                border: 3,
                borderColor: "#f2f2f2",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box>
                <img width={150} src={item.image} alt={item.title} />
              </Box>
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice} EGP
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity + 1)
                    }
                    sx={{ width: "100%" }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity - 1)
                    }
                    sx={{ width: "100%" }}
                  >
                    -
                  </Button>
                </ButtonGroup>
                <Button
                  onClick={() => handelRemoveItem(item.productId)}
                  variant="outlined"
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignSelf={"stretch"}
          >
            <Box display={"flex"} gap={2}>
              <Typography variant="h5">Total Amount:</Typography>
              <Typography variant="h5">{totalAmount.toFixed(2)} EGP</Typography>
            </Box>

            <Button variant="contained" onClick={handleCheckout}>
              Go To Check out
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};
