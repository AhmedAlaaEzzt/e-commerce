import dotenv from "dotenv";
import cors from "cors";

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5176" }));
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("Connected to MongoDB (ecommerce)");
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);

// seed initial products
seedInitialProducts();

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
