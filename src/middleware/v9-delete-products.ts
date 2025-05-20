import { RequestStatusObject } from "@/constant/constant_main";
import {
  EAccountType,
  IResponseFail,
  IResponseSuccess,
  TDeleteProductParams,
} from "@/types/main_schema";

import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users, product } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_delete_product = async (
  req: Request<{}, {}, TDeleteProductParams>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { productid } = req.body;
  if (!productid || typeof productid !== "number") {
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

    if (
      result.eaccounttype !== "admin" &&
      (result as any).eaccounttype !== "admin_secretary" &&
      (result as any).eaccounttype !== "admin_level_three"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  const productList = await db.query.product.findFirst({
    where: and(eq(product.productid, productid)),
  });

  if (!productList) {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }
  next();
};

export default MW_v9_delete_product;
