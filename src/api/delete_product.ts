import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TDeleteProductParams,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_delete_product = async (
  req: Request<{}, {}, TDeleteProductParams>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { productid } = req.body;

  const isProductExist = await db.query.product.findFirst({
    where: and(eq(product.productid, productid)),
  });

  if (isProductExist?.pendingorders && isProductExist?.pendingorders > 0) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  await db
    .update(ProductTable)
    .set({
      isshow: false,
    })
    .where(and(eq(product.productid, productid)));
  // await db
  //   .delete(product)
  //   .where(and(eq(product.productid, productid)));
  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_product;
