import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsEditInstallment,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_edit_installment = async (
  req: Request<{}, {}, TParamsEditInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { orderid, id, installment, description } = req.body;

  const [orderUser, installmentData, orderList] = await Promise.all([
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

  for (const item of orderList) {
    const product = await db.query.product.findFirst({
      where: and(eq(ProductTable.productid, item.productid)),
    });

    if (!product) {
      res.status(500).json(RequestStatusObject.invalidField);
      return;
    }

    const itemTotalPrice = Number(item.price);
    const itemPercentage = itemTotalPrice / Number(orderUser?.totalcost || 0);
    const oldInstallment =
      itemPercentage * Number(installmentData?.installment || 0);
    const newInstallment = itemPercentage * Number(installment);

    await db
      .update(ProductTable)
      .set({
        expected: `${Number(product.expected) + oldInstallment - newInstallment}`,
        earning: `${Number(product.earning) - oldInstallment + newInstallment}`,
      })
      .where(and(eq(ProductTable.productid, item.productid)));
  }

  if (!orderUser) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const newInstallment = {
    installment: installment ? installment : undefined,
    description: description ? description: undefined
  }

  await Promise.all([
    db
      .update(InstallmentTable)
      .set(newInstallment)
      .where(and(eq(InstallmentTable.id, id))),

  ]);

  if(installment){
    await db
      .update(OrderUserTable)
      .set({
        cuurentpayment: `${Number(orderUser.cuurentpayment) - Number(installmentData?.installment) + (installment)}`,
      })
  }

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_edit_installment;
