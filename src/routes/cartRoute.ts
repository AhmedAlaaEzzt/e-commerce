import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: any, res) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId: userId });

  res.status(200).json(cart);
});

export default router;
