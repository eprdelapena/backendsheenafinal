import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IParamsGetOrderUser,
  TParamsGetInstallment,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_get_installment = async (
  req: Request<{}, {}, TParamsGetInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { orderid } = req.body;

  const paymentList = await db.query.installment.findMany({
    where: and(eq(InstallmentTable.orderid, orderid)),
    orderBy: desc(OrderUserTable.id),
  });

  res.status(200).json({
    message: "success",
    status: 200,
    data: paymentList.length ? paymentList : [],
  });
  return;
};

export default v9_get_installment;
