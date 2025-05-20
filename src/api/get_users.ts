import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  EAccountType,
  TGetUsers,
} from "@/types/main_schema";
import { convertToISOFormat } from "@/utils/main_utils";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { and, desc, eq, gte, lte } from "drizzle-orm";

const v9_get_users = async (
  req: Request<{}, {}, Partial<TGetUsers>>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { username, eaccounttype, begin, end, skip } = req.body;

  const limit: number = 20;
  let currentPage = 1;

  if (skip) {
    currentPage = skip;
  }

  const offset: number = (currentPage - 1) * limit;

  let dateBegin;
  let dateEnd;
  if (begin) {
    dateBegin = new Date(convertToISOFormat(begin));
  }
  if (end) {
    dateEnd = new Date(convertToISOFormat(end));
  }

  const userList = await db.query.users.findMany({
    where: and(
      username ? eq(users.username, username) : undefined,
      eaccounttype
        ? eq(users.eaccounttype, eaccounttype as EAccountType)
        : undefined,
      dateBegin ? gte(users.lastdate, dateBegin) : undefined,
      dateEnd ? lte(users.lastdate, dateEnd) : undefined,
    ),
    limit,
    offset,
    orderBy: desc(users.lastdate),
  });
  res.status(200).json({
    message: "success",
    status: 200,
    data: userList.length ? userList : undefined,
  });
  return;
};

export default v9_get_users;
