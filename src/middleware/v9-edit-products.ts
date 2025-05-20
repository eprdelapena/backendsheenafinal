import { RequestStatusObject } from "@/constant/constant_main";
import {
  EAccountType,
  IResponseFail,
  IResponseSuccess,
  TEditProductsParams,
  TPostProductsParams,
} from "@/types/main_schema";
import {
  isEmptyError,
  isStringDecimalError,
  numberTypeError,
  specialCharTypeError,
  stringTypeError,
} from "@/utils/main_utils";
import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_edit_products = async (
  req: Request<{}, {}, Partial<TEditProductsParams>>,
  res: Response<IResponseSuccess<Partial<any>> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const {
    productid,
    title,
    price,
    image,
    imageone,
    imagetwo,
    imagethree,
    category,
    description,
    searchtag,
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

  const requiredParameters = [productid];
  const stringDecimalParameters = [price];
  const stringParameters = [
    title,
    price,
    category,
    price,
    image,
    searchtag,
    description,
    imageone,
    imagetwo,
    imagethree,
  ];
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

  const isEmpty = isEmptyError(requiredParameters);
  const isStringDecimalNaN = isStringDecimalError(stringDecimalParameters);
  const isStringError = stringTypeError(stringParameters);
  const isNumberError = numberTypeError(numberParameters);

  if (isEmpty || isStringDecimalNaN || isStringError || isNumberError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
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
      (result as any).eaccounttype !== "admin_level_three" &&
      (result as any).eaccounttype !== "admin_level_two"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  } else {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }

  next();
};

export default MW_v9_edit_products;
