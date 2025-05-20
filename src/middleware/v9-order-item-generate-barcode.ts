import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsOrderGenerateBarcode,
  TParamsOrderQrCodeGenerator,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_order_item_generate_barcode = async (
  req: Request<{}, {}, TParamsOrderQrCodeGenerator>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string; data: any }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {
  console.log("Generate QR Code order item");
  console.log(req.body);
 
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

  const { orderid, } = req.body;

  if (typeof orderid !== "string") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }
  
  next();
};

export default MW_v9_order_item_generate_barcode;
