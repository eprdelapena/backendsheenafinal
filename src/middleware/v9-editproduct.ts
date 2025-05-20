import { Request, Response, NextFunction } from "express";
import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseSuccess,
  IResponseFail,
  ILoginResponse,
  IProduct,
  EProductCategory,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";

const MW_v9_editproduct = async (
  req: Request<{}, {}, IProduct>,
  res: Response<IResponseSuccess<ILoginResponse> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const {
    productid,
    title,
    price,
    image,
    username,
    description,
    imageOne,
    imageTwo,
    imageThree,
    category,
    searchtag,
    quantityxxs,
    quantityxs,
    quantitys,
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
    quantity110,
    quantity115,
    quantity120,
    quantitydefault,
  } = req.body;

  const isEmpty: boolean = !productid || !username;

  if (isEmpty) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const isTypeError =
    typeof productid !== "number" ||
    typeof username !== "string" ||
    (title && typeof title !== "string") ||
    (price && typeof price !== "number") ||
    (category && typeof category !== "string") ||
    (description && typeof description !== "string") ||
    (image && typeof image !== "string") ||
    (imageOne && typeof imageOne !== "string") ||
    (imageTwo && typeof imageTwo !== "string") ||
    (imageThree && typeof imageThree !== "string") ||
    (searchtag && searchtag.length > 0 && typeof searchtag[0] !== "string");
  (quantityxxs && typeof quantityxxs !== "number") ||
    (quantityxs && typeof quantityxs !== "number") ||
    (quantitys && typeof quantitys !== "number") ||
    (quantitym && typeof quantitym !== "number") ||
    (quantityl && typeof quantityl !== "number") ||
    (quantityxl && typeof quantityxl !== "number") ||
    (quantityxxl && typeof quantityxxl !== "number") ||
    (quantity5 && typeof quantity5 !== "number") ||
    (quantity55 && typeof quantity55 !== "number") ||
    (quantity6 && typeof quantity6 !== "number") ||
    (quantity65 && typeof quantity65 !== "number") ||
    (quantity7 && typeof quantity7 !== "number") ||
    (quantity75 && typeof quantity75 !== "number") ||
    (quantity8 && typeof quantity8 !== "number") ||
    (quantity85 && typeof quantity85 !== "number") ||
    (quantity9 && typeof quantity9 !== "number") ||
    (quantity95 && typeof quantity95 !== "number") ||
    (quantity100 && typeof quantity100 !== "number") ||
    (quantity105 && typeof quantity105 !== "number") ||
    (quantity110 && typeof quantity110 !== "number") ||
    (quantity115 && typeof quantity115 !== "number") ||
    (quantity120 && typeof quantity120 !== "number") ||
    (quantitydefault && typeof quantitydefault !== "number");

  if (isTypeError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  if (category) {
    const isValidCategory: boolean =
      category === EProductCategory.bags ||
      category === EProductCategory.clothes ||
      category === EProductCategory.jewelry ||
      category === EProductCategory.shoes ||
      category === EProductCategory.others ||
      category === EProductCategory.watches;

    if (isValidCategory === false) {
      res.status(200).json(RequestStatusObject.invalidField);
      return;
    }
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    let token = authHeader.slice(7);
    const result = await db.query.users.findFirst({
      where: and(eq(users.token, token), eq(users.username, username)),
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

export default MW_v9_editproduct;
