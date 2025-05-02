import express from "express";
import { register, login, getMyOrders } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  const { statusCode, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });

  response.status(statusCode).json(data);
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });

    response.status(statusCode).json(data);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/my-orders",
  validateJWT,
  async (request: ExtendedRequest, response) => {
    try {
      const userId = request?.user?._id;
      if (!userId) {
        response.status(400).json({ message: "User ID is required" });
        return;
      }
      const { data, statusCode } = await getMyOrders({ userId });

      response.status(statusCode).json(data);
    } catch (err) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
