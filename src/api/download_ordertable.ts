import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { Parser } from "json2csv";
import { RequestStatusObject } from "@/constant/constant_main";

const v9_download_ordertable = async (
  req: Request<{}, {}, {}>,
  res: Response<any>,
): Promise<void> => {
  const orderList = await db.select().from(OrderTable);
  console.log("order list", orderList)
  if(!orderList|| (orderList as any)?.length === 0 ){
    res.status(200).json({
        status: 403,
        message: "Table is empty"
    });
    return;
  }
  const parser = new Parser();
  const csv = parser.parse(orderList);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="ordertable.csv"');
  res.status(200).send(csv);

  return;
};

export default v9_download_ordertable;
