import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IParamsGetOrderUser,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";

const v9_get_orderuser = async (
  req: Request<{}, {}, IParamsGetOrderUser>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { search, begin, end, estatustype, category, skip, type } = req.body;

  const limit: number = 20;
  let currentPage = 1;

  if (skip) {
    currentPage = skip;
  }

  const offset: number = (currentPage - 1) * limit;

  let dateBegin;
  let dateEnd;
  if (begin) {
    dateBegin = new Date(begin);
  }
  if (end) {
    dateEnd = new Date(end);
  }

  console.log("type searched", type);
  const userList = await db.query.orderuser.findMany({
    where: and(
    category === "orderid" && search
      ? ilike(OrderUserTable.orderid, `%${search}%`)
      : undefined,
      category === "firstname" && search
      ? ilike(OrderUserTable.receiverfirstname, `%${search}%`)
      : undefined,
            category === "lastname" && search
      ? ilike(OrderUserTable.receiverlastname, `%${search}%`)
      : undefined,
      category === "username" && search
        ? eq(OrderUserTable.username, search as string)
        : undefined,
      estatustype
        ? eq(OrderUserTable.estatustype, estatustype as any)
        : undefined,
      type ? eq(OrderUserTable.type, type) : undefined,
      dateBegin ? gte(OrderUserTable.orderdate, dateBegin) : undefined,
      dateEnd ? lte(OrderUserTable.orderdate, dateEnd) : undefined,
    ),
    limit,
    offset,
    orderBy: desc(OrderUserTable.id),
  });
  res.status(200).json({
    message: "success",
    status: 200,
    data: userList.length ? userList : [],
  });
  return;
};

export default v9_get_orderuser;
