import { db } from "@/config/drizzle/connectdb";
import {
  IResponseFail,
  IResponseSuccess,
  TGetUsers,
} from "@/types/main_schema";
import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { EAccountType } from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";

const MW_v9_get_users = async (
  req: Request<{}, {}, TGetUsers>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
  next: NextFunction,
) => {
  const { skip, begin, end, eaccounttype, username } = req.body;
  let typeError: boolean = false;
  const stringTypes = [begin, end, eaccounttype, username];
  const numberTypes = [skip];

  for (let i = 0; i < stringTypes.length; i++) {
    if (stringTypes[i] && typeof stringTypes[i] !== "string") {
      typeError = true;
    }
  }

  for (let i = 0; i < numberTypes.length; i++) {
    if (numberTypes[i] && typeof numberTypes[i] !== "number") {
      typeError = true;
    }
  }

  if (typeError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }

  if (authHeader) {
    let token = authHeader.slice(7);
    const result = await db.query.users.findFirst({
      where: and(eq(users.token, token)),
    });
    if (!result) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    if (result.eaccounttype !== "admin") {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  next();
};

export default MW_v9_get_users;
