import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsGetPendingOrders,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, eq, sql, ne} from "drizzle-orm";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";

const v9_get_pending_orders = async (
  req: Request<{}, {}, TParamsGetPendingOrders>,
  res: Response<any | IResponseFail>,
): Promise<void> => {
  const { productid, skip, type } = req.body;

  const limit: number = 50;

  let currentSkip = 1;
  if(skip){
    currentSkip = skip
  }

  const offset: number = (currentSkip - 1) * limit;

  const totalCountResult = await db
    .select({
      count: sql<number>`COUNT(DISTINCT ${OrderTable.orderid})`.as("count"),
    })
    .from(OrderTable)
    .innerJoin(OrderUserTable, eq(OrderTable.orderid, OrderUserTable.orderid))
    .where(
      and(
        eq(OrderTable.productid, productid),
        eq(OrderUserTable.type, type),
        ne(OrderUserTable.estatustype, "success"),
      )
    );

  const totalCount = totalCountResult[0]?.count ?? 0;

  const orderList = await db
  .select({
    orderid: OrderUserTable.orderid,
    itemquantity: sql`
      SUM(${OrderTable.quantitydefault}) +
      SUM(${OrderTable.quantityxxs}) +
      SUM(${OrderTable.quantityxs}) +
      SUM(${OrderTable.quantitys}) +
      SUM(${OrderTable.quantitym}) +
      SUM(${OrderTable.quantityl}) +
      SUM(${OrderTable.quantityxl}) +
      SUM(${OrderTable.quantityxxl}) +
      SUM(${OrderTable.quantity5}) +
      SUM(${OrderTable.quantity55}) +
      SUM(${OrderTable.quantity6}) +
      SUM(${OrderTable.quantity65}) +
      SUM(${OrderTable.quantity7}) +
      SUM(${OrderTable.quantity75}) +
      SUM(${OrderTable.quantity8}) +
      SUM(${OrderTable.quantity85}) +
      SUM(${OrderTable.quantity9}) +
      SUM(${OrderTable.quantity95}) +
      SUM(${OrderTable.quantity100}) +
      SUM(${OrderTable.quantity105}) +
      SUM(${OrderTable.quantity110}) +
      SUM(${OrderTable.quantity115}) +
      SUM(${OrderTable.quantity120})
    `,
    
  })
  .from(OrderTable)
  .innerJoin(OrderUserTable, eq(OrderTable.orderid, OrderUserTable.orderid))
  .where(
    and(
      eq(OrderTable.productid, productid),
      eq(OrderUserTable.type, type),
      ne(OrderUserTable.estatustype, 'success')
    )
  )
  .groupBy(OrderTable.orderid, OrderUserTable.orderid)
  // .groupBy(OrderTable.orderid, OrderUserTable.orderid)
  // .orderBy(desc(OrderTable.id))
  .limit(limit)
  .offset(offset);

  res.status(200).json({
    message: "success",
    status: 200,
    data: orderList,
    count: totalCount
  });
  return;
};

export default v9_get_pending_orders;
