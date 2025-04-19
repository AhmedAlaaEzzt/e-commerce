import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3001;

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB (ecommerce)");
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
