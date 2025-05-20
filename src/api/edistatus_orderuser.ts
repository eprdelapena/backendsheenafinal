import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IParamsEditStatus,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { orderuser } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_editstatus_orderuser = async (
  req: Request<{}, {}, IParamsEditStatus>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let { orderid, estatustype } = req.body;
  
  const [orderUserData, orderData] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.orderid, orderid)),
    }),
    db.query.order.findMany({
      where: and(eq(OrderTable.orderid, orderid)),
    }),
  ]);

  if (orderUserData?.estatustype !== "success" && estatustype === "success") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      await db
        .update(ProductTable)
        .set({
          successorders:
            currentProductTable?.successorders! + item.orderquantity,
          pendingorders:
            currentProductTable?.pendingorders! - item.orderquantity,
        })
        .where(and(eq(ProductTable.id, item.productid)));
    }

  }

  

  if (orderUserData?.estatustype === "success" && estatustype !== "success") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      await db
        .update(ProductTable)
        .set({
          successorders:
            currentProductTable?.successorders! - item.orderquantity,
          pendingorders:
            currentProductTable?.pendingorders! + item.orderquantity,
        })
        .where(and(eq(ProductTable.id, item.productid)));
    }
  }

    if (orderUserData?.estatustype === "success" && estatustype === "ondelivery") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      await db
        .update(ProductTable)
        .set({
          successorders:
            currentProductTable?.successorders! - item.orderquantity,
        })
        .where(and(eq(ProductTable.id, item.productid)));
      }
    }
        if (orderUserData?.estatustype === "pending" && estatustype === "ondelivery") {
      for (const item of orderData) {
        const currentProductTable = await db.query.product.findFirst({
          where: and(eq(ProductTable.id, item.productid)),
        });

      await db
        .update(ProductTable)
        .set({
          pendingorders:
            currentProductTable?.pendingorders! - item.orderquantity,
        })
        .where(and(eq(ProductTable.id, item.productid)));
      }
    }

        if (orderUserData?.estatustype === "ondelivery" && estatustype === "pending") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      await db
        .update(ProductTable)
        .set({
          pendingorders:
            currentProductTable?.pendingorders! + item.orderquantity,
        })
        .where(and(eq(ProductTable.id, item.productid)));
      }
    }


        if (orderUserData?.estatustype === "ondelivery" && estatustype === "success") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      await db
        .update(ProductTable)
        .set({
          successorders:
            currentProductTable?.successorders! + item.orderquantity,
        })
        .where(and(eq(ProductTable.id, item.productid)));
      }
    }




      await db
      .update(orderuser)
      .set({ estatustype: estatustype as any })
      .where(and(eq(OrderUserTable.orderid, orderid)));

  res.status(200).json(RequestStatusObject.success);

  return;
};

export default v9_editstatus_orderuser;
