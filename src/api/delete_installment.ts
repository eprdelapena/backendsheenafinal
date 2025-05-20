import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsDeleteInstallment,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_delete_installment = async (
  req: Request<{}, {}, TParamsDeleteInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { orderid, id } = req.body;

  const [orderUser, installment, orderList] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.orderid, orderid)),
    }),
    db.query.installment.findFirst({
      where: and(eq(InstallmentTable.id, id)),
    }),
    db.query.order.findMany({
      where: and(eq(OrderTable.orderid, orderid)),
    }),
  ]);

  if (!orderUser || !installment) {
    res.status(200).json(RequestStatusObject.invalidField);
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
    const itemPercentage = itemTotalPrice / Number(orderUser.totalcost);
    const itemInstallment = itemPercentage * Number(installment.installment);

    await db
      .update(ProductTable)
      .set({
        expected: `${Number(product.expected) + itemInstallment}`,
        earning: `${Number(product.earning) - itemInstallment}`,
      })
      .where(and(eq(ProductTable.productid, item.productid)));
  }
  await Promise.all([
    db.delete(InstallmentTable).where(and(eq(InstallmentTable.id, id))),
    db
      .update(OrderUserTable)
      .set({
        cuurentpayment: `${Number(orderUser.cuurentpayment) - Number(installment.installment)}`,
      }),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_installment;
