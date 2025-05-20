import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsViewOrderItem,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, eq, desc } from "drizzle-orm";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_view_order_item = async (
  req: Request<{}, {}, TParamsViewOrderItem>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let { orderid, skip } = req.body;

  const limit: number = 10;
  let currentPage = 1;
  if (skip) {
    currentPage = skip;
  }
  const offset: number = (currentPage - 1) * limit;
  const result = await db
    .select({
      id: OrderTable.id,
      orderid: OrderTable.orderid,
      productid: OrderTable.productid,
      username: OrderTable.username,
      price: OrderTable.price,
      title: ProductTable.title,
      category: ProductTable.category,
      orderquantity: OrderTable.orderquantity,
      orderdate: OrderTable.orderdate,
      quantityxxs: OrderTable.quantityxxs,
      quantityxs: OrderTable.quantityxs,
      quantitys: OrderTable.quantitys,
      quantitym: OrderTable.quantitym,
      quantityl: OrderTable.quantityl,
      quantityxl: OrderTable.quantityxl,
      quantityxxl: OrderTable.quantityxxl,
      quantity5: OrderTable.quantity5,
      quantity55: OrderTable.quantity55,
      quantity6: OrderTable.quantity6,
      quantity65: OrderTable.quantity65,
      quantity7: OrderTable.quantity7,
      quantity75: OrderTable.quantity75,
      quantity8: OrderTable.quantity8,
      quantity85: OrderTable.quantity85,
      quantity9: OrderTable.quantity9,
      quantity95: OrderTable.quantity95,
      quantity100: OrderTable.quantity100,
      quantity105: OrderTable.quantity105,
      quantity110: OrderTable.quantity110,
      quantity115: OrderTable.quantity115,
      quantity120: OrderTable.quantity120,
      quantitydefault: OrderTable.quantitydefault,
    })
    .from(OrderTable)
    .where(and(eq(OrderTable.orderid, orderid)))
    .innerJoin(
      ProductTable,
      and(eq(ProductTable.productid, OrderTable.productid)),
    )
    .offset(offset)
    .limit(limit)
    .orderBy(desc(OrderTable.productid));

  res.status(200).json({
    message: "success",
    status: 200,
    data: result.length > 0 ? result : [],
  });
};

export default v9_view_order_item;
