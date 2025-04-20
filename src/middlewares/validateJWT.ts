import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface ExtendedRequest extends Request {
  user?: User;
}

const validateJWT = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send({ message: "Authorization header was not provided" });
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send({ message: "Token was not provided" });
    return;
  }

  jwt.verify(token, 'pCH%Oy4jQQlQVLm&V)Ui"x"PIlicnA', async (err, payload) => {
    if (err) {
      res.status(403).send({ message: "Invalid token" });
      return;
    }

    if (!payload) {
      res.status(403).send({ message: "Invalid payload" });
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    // Fetch user from database based on the payload
    const user = await userModel.findOne({ email: userPayload.email });

    if (!user) {
      res.status(403).send({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  });
};

export default validateJWT;
