import { Request, Response } from "express";
import { IResponseSuccess, IResponseFail, TParamsDeleteLogTable } from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq, sql } from "drizzle-orm";
import { UserTable } from "@/config/drizzle/tables/table_user";
import { LogTable } from "@/config/drizzle/tables/table_itemlogs";
import { itemlog, product } from "@/config/drizzle/schema";

const v9_delete_log = async (
  req: Request<{}, {}, TParamsDeleteLogTable>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { itemid } = req.body;

  const isItemExist = await db.query.itemlog.findFirst({
    where: and(eq(LogTable.itemid, itemid)),
  });

  if (!isItemExist) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  
  if(isItemExist.mode === "incoming"){
    await Promise.all([
        db.update(product)
        .set({
          [isItemExist.size as string]: sql.raw(`"${isItemExist.size}" - 1`)
        })
        .where(eq(product.productid, Number(isItemExist.productid))),
        db.delete(LogTable).where(and(eq(LogTable.itemid, itemid)))
    ])
  }

  if(isItemExist.mode === "outgoing"){
    await Promise.all([
        db.update(product)
        .set({
          [isItemExist.size as string]: sql.raw(`"${isItemExist.size}" + 1`)
        })
        .where(eq(product.productid, Number(isItemExist.productid))),
        db.delete(LogTable).where(and(eq(LogTable.itemid, itemid)))
    ])
  }

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_log;
