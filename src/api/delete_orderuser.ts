import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TDeleteProductParams,
  IParamsDeleteOrderUser,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { orderuser, product, order } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_delete_orderuser = async (
  req: Request<{}, {}, IParamsDeleteOrderUser>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { orderid } = req.body;

  const [orderUserData, orderData] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.orderid, orderid)),
    }),
    db.query.order.findMany({
      where: and(eq(OrderTable.orderid, orderid)),
    }),
  ]);

  if (orderUserData?.estatustype !== "success") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      const itemTotalPrice = Number(item.price);
      const itemPercentage =
        itemTotalPrice / Number(orderUserData?.totalcost || 0);
      const itemDownpayment =
        itemPercentage * Number(orderUserData?.cuurentpayment || 0);
      const totalItemExpected = itemTotalPrice - itemDownpayment;

      await db
        .update(ProductTable)
        .set({
          expected: `${Number(currentProductTable?.expected || 0) - totalItemExpected}`,
          earning: `${Number(currentProductTable?.earning || 0) - itemDownpayment}`,
          pendingorders:
            currentProductTable?.pendingorders! - item.orderquantity,
          // quantitydefault:
          //   currentProductTable?.quantitydefault! + item.quantitydefault,
          // quantityxxs: currentProductTable?.quantityxxs! + item.quantityxxs,
          // quantityxs: currentProductTable?.quantityxs! + item.quantityxs,
          // quantitys: currentProductTable?.quantitys! + item.quantitys,
          // quantitym: currentProductTable?.quantitym! + item.quantitym,
          // quantityl: currentProductTable?.quantityl! + item.quantityl,
          // quantityxl: currentProductTable?.quantityxl! + item.quantityxl,
          // quantityxxl: currentProductTable?.quantityxxl! + item.quantityxxl,
          // quantity5: currentProductTable?.quantity5! + item.quantity5,
          // quantity55: currentProductTable?.quantity55! + item.quantity55,
          // quantity6: currentProductTable?.quantity6! + item.quantity6,
          // quantity65: currentProductTable?.quantity65! + item.quantity65,
          // quantity7: currentProductTable?.quantity7! + item.quantity7,
          // quantity75: currentProductTable?.quantity75! + item.quantity75,
          // quantity8: currentProductTable?.quantity8! + item.quantity8,
          // quantity85: currentProductTable?.quantity85! + item.quantity85,
          // quantity9: currentProductTable?.quantity9! + item.quantity9,
          // quantity95: currentProductTable?.quantity95! + item.quantity95,
          // quantity100: currentProductTable?.quantity100! + item.quantity100,
          // quantity105: currentProductTable?.quantity105! + item.quantity105,
          // quantity110: currentProductTable?.quantity110! + item.quantity110,
          // quantity115: currentProductTable?.quantity115! + item.quantity115,
          // quantity120: currentProductTable?.quantity120! + item.quantity120,
        })
        .where(and(eq(ProductTable.id, item.productid)));
    }
  }

  if (orderUserData?.estatustype === "success") {
    for (const item of orderData) {
      const currentProductTable = await db.query.product.findFirst({
        where: and(eq(ProductTable.id, item.productid)),
      });

      const itemTotalPrice = Number(item.price);
      const itemPercentage =
        itemTotalPrice / Number(orderUserData?.totalcost || 0);
      const itemDownpayment =
        itemPercentage * Number(orderUserData?.cuurentpayment || 0);
      const totalItemExpected = itemTotalPrice - itemDownpayment;

      await db
        .update(ProductTable)
        .set({
          expected: `${Number(currentProductTable?.expected || 0) - totalItemExpected}`,
          earning: `${Number(currentProductTable?.earning || 0) - itemDownpayment}`,
          successorders:
            currentProductTable?.successorders! - item.orderquantity,
          // quantitydefault:
          //   currentProductTable?.quantitydefault! + item.quantitydefault,
          // quantityxxs: currentProductTable?.quantityxxs! + item.quantityxxs,
          // quantityxs: currentProductTable?.quantityxs! + item.quantityxs,
          // quantitys: currentProductTable?.quantitys! + item.quantitys,
          // quantitym: currentProductTable?.quantitym! + item.quantitym,
          // quantityl: currentProductTable?.quantityl! + item.quantityl,
          // quantityxl: currentProductTable?.quantityxl! + item.quantityxl,
          // quantityxxl: currentProductTable?.quantityxxl! + item.quantityxxl,
          // quantity5: currentProductTable?.quantity5! + item.quantity5,
          // quantity55: currentProductTable?.quantity55! + item.quantity55,
          // quantity6: currentProductTable?.quantity6! + item.quantity6,
          // quantity65: currentProductTable?.quantity65! + item.quantity65,
          // quantity7: currentProductTable?.quantity7! + item.quantity7,
          // quantity75: currentProductTable?.quantity75! + item.quantity75,
          // quantity8: currentProductTable?.quantity8! + item.quantity8,
          // quantity85: currentProductTable?.quantity85! + item.quantity85,
          // quantity9: currentProductTable?.quantity9! + item.quantity9,
          // quantity95: currentProductTable?.quantity95! + item.quantity95,
          // quantity100: currentProductTable?.quantity100! + item.quantity100,
          // quantity105: currentProductTable?.quantity105! + item.quantity105,
          // quantity110: currentProductTable?.quantity110! + item.quantity110,
          // quantity115: currentProductTable?.quantity115! + item.quantity115,
          // quantity120: currentProductTable?.quantity120! + item.quantity120,
        })
        .where(and(eq(ProductTable.id, item.productid)));
    }
  }

  await Promise.all([
    db.delete(orderuser).where(and(eq(OrderUserTable.orderid, orderid))),
    db.delete(order).where(and(eq(OrderTable.orderid, orderid))),
    db
      .delete(InstallmentTable)
      .where(and(eq(InstallmentTable.orderid, orderid))),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_orderuser;
