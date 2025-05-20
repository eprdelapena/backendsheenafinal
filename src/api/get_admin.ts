import { Request, Response } from "express";
import { IResponseSuccess, IResponseFail } from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { and, desc, eq, gte, lte, not } from "drizzle-orm";
import { UserTable } from "@/config/drizzle/tables/table_user";

const v9_get_admin = async (
  req: Request<{}, {}, { skip: number }>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { skip } = req.body;

  const limit: number = 20;
  let currentPage = 1;

  if (skip) {
    currentPage = skip;
  }

  const offset: number = (currentPage - 1) * limit;

  const adminList = await db.query.users.findMany({
    where: and(not(eq(UserTable.eaccounttype, "customer"))),
    limit,
    offset,
    orderBy: desc(users.lastdate),
  });
  res.status(200).json({
    message: "success",
    status: 200,
    data: adminList.length ? adminList : [],
  });
  return;
};

export default v9_get_admin;
