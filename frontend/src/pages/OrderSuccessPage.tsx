import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "15px 0px",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        alignItems={"center"}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 100 }} color="success" />
        <Typography variant="h4">Order Placed Successfully</Typography>
        <Typography variant="h6">
          Your order has been placed successfully. You can track your order in
          the order history.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go To Home
        </Button>
      </Box>
    </Container>
  );
};

export default OrderSuccessPage;
