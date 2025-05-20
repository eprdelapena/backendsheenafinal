import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsEditAdmin,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { UserTable } from "@/config/drizzle/tables/table_user";

const v9_edit_admin = async (
  req: Request<{}, {}, TParamsEditAdmin>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let { username, estatustype } = req.body;

  await db
    .update(UserTable)
    .set({
      eaccounttype: estatustype,
    })
    .where(and(eq(UserTable.username, username)));
  res.status(200).json(RequestStatusObject.success);

  return;
};

export default v9_edit_admin;
