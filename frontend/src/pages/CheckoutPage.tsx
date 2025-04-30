import { Box, Button, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { useCart } from "../context/Cart/CartContext";

export const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Container sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <TextField inputRef={addressRef} label="Delivery Address" />
      </Box>

      {cartItems.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: 3,
              borderColor: "#f2f2f2",
              borderRadius: 2,
              p: 2,
            }}
          >
            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: 2,
                }}
              >
                <Box>
                  <img width={50} src={item.image} alt={item.title} />
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
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
                ></Box>
              </Box>
            ))}

            <Box display={"flex"} justifyContent={"end"} alignSelf={"stretch"}>
              <Box display={"flex"} gap={2}>
                <Typography variant="h5">Total Amount:</Typography>
                <Typography variant="h5">
                  {totalAmount.toFixed(2)} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              variant="contained"
              onClick={() => console.log("Check out")}
              sx={{ width: "30%" }}
            >
              Pay Now
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};
