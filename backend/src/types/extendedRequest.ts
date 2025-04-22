import { Request } from "express";
interface User {
  email: string;
  firstName: string;
  lastName: string;
  _id: any;
}

export interface ExtendedRequest extends Request {
  user?: User;
}
