import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TParamsPostInstallment,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";
import { and, eq, sql } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_post_installment = async (
  req: Request<{}, {}, TParamsPostInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { orderid, amount } = req.body;
  const [isOrderExist, orderList] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.orderid, orderid)),
    }),
    db.query.order.findMany({
      where: and(eq(OrderTable.orderid, orderid)),
    }),
  ]);

  if (!isOrderExist) {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }

  for (const item of orderList) {
    const product = await db.query.product.findFirst({
      where: and(eq(ProductTable.productid, item.productid)),
    });

    if (!product) {
      res.status(500).json(RequestStatusObject.invalidField);
      return;
    }

    const itemTotalPrice = Number(item.price);
    const itemPercentage = itemTotalPrice / Number(isOrderExist.totalcost);
    const itemInstallment = itemPercentage * Number(amount);

    await db
      .update(ProductTable)
      .set({
        expected: `${Number(product.expected) - itemInstallment}`,
        earning: `${Number(product.earning) + itemInstallment}`,
      })
      .where(and(eq(ProductTable.productid, item.productid)));
  }

  const newOrder = {
    orderid,
    installment: amount,
  };

  await Promise.all([
    db.update(OrderUserTable).set({
      cuurentpayment: `${Number(isOrderExist.cuurentpayment) + Number(amount)}`,
    }).where(and(eq(OrderUserTable.orderid, orderid))),
    db.insert(InstallmentTable).values(newOrder),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_installment;
