import { Request, Response, NextFunction } from "express";
import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseSuccess,
  IResponseFail,
  ILogin,
  ILoginResponse,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { makePasswordHash } from "@/utils/main_utils";

const MW_v9_login = async (
  req: Request<{}, {}, ILogin>,
  res: Response<IResponseSuccess<ILoginResponse> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { username, password } = req.body;
  const isEmpty: boolean = !username || !password;

  if (isEmpty) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const isTypeError =
    typeof password !== "string" || typeof username !== "string";

  if (isTypeError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const specialCharRegex = /[^a-zA-Z0-9]/;

  if (password.includes(" ") || username.includes(" ")) {
    res.status(200).json(RequestStatusObject.invalidFieldPassword);
    return;
  }

  const fields = [username, password];
  if (fields.some((field) => specialCharRegex.test(field))) {
    res.status(200).json(RequestStatusObject.invalidFieldSpecialCharacters);
    return;
  }

  const queryUser = await db.query.users.findFirst({
    where: and(eq(users.username, username)),
  });

  if (!queryUser) {
    res.status(200).json(RequestStatusObject.invalidUserNotFound);
    return;
  }

  if (queryUser && queryUser.password) {
    const salt = queryUser.salt;
    const hashedPassword = makePasswordHash(salt, password);

    if (hashedPassword !== queryUser.password) {
      res.status(200).json(RequestStatusObject.invalidUserNotFound);
      return;
    }
  }

  next();
};

export default MW_v9_login;
