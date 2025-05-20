import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_barcode_orderitem = async (
  req: Request<{}, {}, {}>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string; data: any }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {
  
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     res.status(200).json(RequestStatusObject.invalidAuthorization);
//     return;
//   }

//   if (authHeader) {
//     let token = authHeader.slice(7);
//     const result = await db.query.users.findFirst({
//       where: and(eq(users.token, token)),
//     });
//     if (!result) {
//       res.status(200).json(RequestStatusObject.invalidAuthorization);
//       return;
//     }

//     if (result.eaccounttype !== "admin") {
//       res.status(200).json(RequestStatusObject.invalidAuthorization);
//       return;
//     }
//   }

  const { productid, sizecategory, orderid } = req.query;
    console.log("process", req.query)

  if (typeof Number(productid) !== "number") {
    console.log("productid id field invalid")
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  if (typeof sizecategory !== "string") {
    console.log("sizecategory field invalid")
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  if (typeof orderid !== "string") {
    console.log("oderid field invalid")
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  next();
};

export default MW_v9_barcode_orderitem;
