import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { Parser } from "json2csv";

const v9_download_orderusertable = async (
  req: Request<{}, {}, {}>,
  res: Response<any>,
): Promise<void> => {
  const orderUserList = await db.select().from(OrderUserTable);
  console.log("order user list", orderUserList);
  if(!orderUserList || (orderUserList as any)?.length === 0 ){
    res.status(200).json({
        status: 403,
        message: "Table is empty"
    });
    return;
  }
  const parser = new Parser();
  const csv = parser.parse(orderUserList);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="orderusertable.csv"');
  res.status(200).send(csv);

  return;
};

export default v9_download_orderusertable;
