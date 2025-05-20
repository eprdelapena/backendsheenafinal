import { Request, Response } from "express";
import { IResponseSuccess, IResponseFail } from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { UserTable } from "@/config/drizzle/tables/table_user";

const v9_delete_user = async (
  req: Request<{}, {}, { username: string }>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { username } = req.body;

  const isUserExist = await db.query.users.findFirst({
    where: and(eq(UserTable.username, username)),
  });

  if (!isUserExist) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  await db.delete(UserTable).where(and(eq(UserTable.username, username)));

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_user;
