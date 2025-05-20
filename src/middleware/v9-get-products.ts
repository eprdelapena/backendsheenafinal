import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IProductData,
  TGetProductsParams,
  EAccountType,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";

const MW_v9_get_products = async (
  req: Request<{}, {}, Partial<TGetProductsParams>>,
  res: Response<IResponseSuccess<Partial<IProductData>> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { searchText, searchType, skip } = req.body;

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
      (result as any).eaccounttype !== "admin_viewer" &&
      (result as any).eaccounttype !== "admin_level_one" &&
      (result as any).eaccounttype !== "admin_level_two" &&
      (result as any).eaccounttype !== "admin_level_three"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  const isTypeError =
    (skip && typeof skip !== "number") ||
    (searchType && typeof searchType !== "string");

  if (isTypeError) {
    res.status(200).json(RequestStatusObject.invalidField);
  }

  next();
};

export default MW_v9_get_products;
