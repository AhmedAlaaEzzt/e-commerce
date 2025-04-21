import express from "express";
import {
  addProductToCart,
  getActiveCartForUser,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  const cart = await getActiveCartForUser({ userId });

  res.status(200).json(cart);
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  const response = await addProductToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
