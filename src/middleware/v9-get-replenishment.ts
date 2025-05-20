import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsGetMonthlyIncome,
  TParamsGetInstallment,
  TParamsGetReplenishment,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { EAccountType } from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_get_replenishment = async (
  req: Request<{}, {}, TParamsGetReplenishment>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string; data: any }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }

  if (authHeader) {
    let token = authHeader.slice(7);
    const result = await db.query.users.findFirst({
      where: and(eq(users.token, token)),
    });
    if (!result) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    if (
      result.eaccounttype !== "admin" &&
      (result as any).eaccounttype !== "admin_secretary" &&
      (result as any).eaccounttype !== "admin_viewer"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  const { begin, end, skip } = req.body;

  if (skip && typeof skip !== "number") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  if (!begin || typeof begin !== "string" || !end || typeof end !== "string") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  next();
};

export default MW_v9_get_replenishment;
