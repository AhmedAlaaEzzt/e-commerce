import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

export const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    console.log(myOrders);
  }, [myOrders]);

  return (
    <Container fixed sx={{ padding: "15px 0px" }}>
      <Typography variant="h4">My Orders</Typography>
      {myOrders.map(({ _id, address, total, orderItems }) => (
        <Box
          key={_id}
          sx={{
            margin: "15px 0px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <Typography>Address: {address}</Typography>
          <Typography>Items: {orderItems.length}</Typography>
          <Typography>Total: {total}</Typography>
        </Box>
      ))}
    </Container>
  );
};
