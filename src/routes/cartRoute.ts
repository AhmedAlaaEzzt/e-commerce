import express from "express";
import {
  addProductToCart,
  checkout,
  clearCart,
  deleteProductInCart,
  getActiveCartForUser,
  updateProductInCart,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const cart = await getActiveCartForUser({ userId });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const response = await addProductToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const response = await updateProductInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendedRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const response = await deleteProductInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const response = await checkout({ userId, address });

    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
