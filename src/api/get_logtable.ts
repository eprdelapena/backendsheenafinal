import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsGetLogTable,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, lte, eq, gte, desc} from "drizzle-orm";
import { LogTable } from "@/config/drizzle/tables/table_itemlogs";

const v9_get_log_table = async (
  req: Request<{}, {}, TParamsGetLogTable>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { begin, end, searchCategory, skip, searchText } = req.body;

  const limit: number = 50;

  let dateBegin;
  let dateEnd;
  if (begin) {
    dateBegin = new Date(begin);
  }
  if (end) {
    dateEnd = new Date(end);
  }

  let currentSkip = 1;
  if(skip){
    currentSkip = skip
  }

  const offset: number = (currentSkip - 1) * limit;

  const logData = await db.query.itemlog.findMany({
    where: and(
        (begin ? gte(LogTable.logdate, dateBegin as Date) : undefined),
        (end ? lte(LogTable.logdate, dateEnd as Date) : undefined),
        (searchCategory === "orderid" ? eq(LogTable.orderid, searchText) : undefined),
        (searchCategory === "itemid" ? eq(LogTable.itemid, searchText) : undefined),
        (searchCategory === "mode" ? eq(LogTable.mode, searchText) : undefined)
    ),
    offset,
    limit,
    orderBy: desc(LogTable.id)
  })

  res.status(200).json({
    message: "success",
    status: 200,
    data: logData,
  });
  return;
};

export default v9_get_log_table;
