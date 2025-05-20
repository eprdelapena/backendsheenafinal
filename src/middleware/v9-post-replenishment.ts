import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TParamsPostReplenishment,
  TPostProductsParams,
} from "@/types/main_schema";
import {
  isEmptyError,
  isStringDecimalError,
  numberTypeError,
  stringTypeError,
} from "@/utils/main_utils";
import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_post_replenishment = async (
  req: Request<{}, {}, Partial<TParamsPostReplenishment>>,
  res: Response<IResponseSuccess<Partial<any>> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const {
    productid,
    quantityxxs,
    quantityxs,
    quantittys,
    quantitym,
    quantityl,
    quantityxl,
    quantityxxl,
    quantity5,
    quantity55,
    quantity6,
    quantity65,
    quantity7,
    quantity75,
    quantity8,
    quantity85,
    quantity9,
    quantity95,
    quantity100,
    quantity105,
    quantitty110,
    quantity115,
    quantity120,
    quantitydefault,
  } = req.body;

  const numberParameters = [
    productid,
    quantityxxs,
    quantityxs,
    quantittys,
    quantitym,
    quantityl,
    quantityxl,
    quantityxxl,
    quantity5,
    quantity55,
    quantity6,
    quantity65,
    quantity7,
    quantity75,
    quantity8,
    quantity85,
    quantity9,
    quantity95,
    quantity100,
    quantity105,
    quantitty110,
    quantity115,
    quantity120,
    quantitydefault,
  ];

  const isNumberError = numberTypeError(numberParameters);
  if (isNumberError) {
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
      (result as any).eaccounttype !== "admin_viewer" &&
      (result as any).eaccounttype !== "admin_level_one" &&
      (result as any).eaccounttype !== "admin_level_two" &&
      (result as any).eaccounttype !== "admin_level_three"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  next();
};

export default MW_v9_post_replenishment;
