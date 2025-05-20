import { Request, Response, NextFunction } from "express";
import { RequestStatusObject } from "@/constant/constant_main";
import {
  IRegister,
  IResponseSuccess,
  IResponseFail,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { eq, or } from "drizzle-orm";

const MW_v9_register = async (
  req: Request<{}, {}, IRegister>,
  res: Response<IResponseSuccess<IRegister> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { firstname, lastname, mobile, email, middlename, password, username } =
    req.body;

  const isEmpty: boolean =
    !firstname ||
    !lastname ||
    !mobile ||
    !email ||
    !password ||
    !username ||
    !middlename;

  if (isEmpty) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const isTypeError =
    typeof firstname !== "string" ||
    typeof lastname !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string" ||
    typeof mobile !== "string" ||
    typeof username !== "string" ||
    typeof middlename !== "string";

  if (isTypeError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^09\d{9}$/;
  const specialCharRegex = /[^a-zA-Z0-9]/;

  // if (!emailRegex.test(email)) {
  //   res.status(200).json(RequestStatusObject.invalidFieldEmail);
  //   return;
  // }

  // if (!mobileRegex.test(mobile)) {
  //   res.status(200).json(RequestStatusObject.invalidFieldMobile);
  //   return;
  // }

  // if (password.includes(" ") || username.includes(" ")) {
  //   res.status(200).json(RequestStatusObject.invalidFieldPassword);
  //   return;
  // }

  // const fields = [firstname, lastname, mobile, password, username, middlename];
  // if (fields.some((field) => specialCharRegex.test(field))) {
  //   res.status(200).json(RequestStatusObject.invalidFieldSpecialCharacters);
  //   return;
  // }

  const queryUser = await db.query.users.findFirst({
    where: or(eq(users.username, username), eq(users.email, email)),
  });

  if (queryUser) {
    res.status(200).json(RequestStatusObject.invalidUserExists);
    return;
  }
  next();
};

export default MW_v9_register;
