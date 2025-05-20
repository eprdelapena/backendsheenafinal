import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TParamsDeleteReplenishment,
} from "@/types/main_schema";

import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users, replenishment } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_delete_replenishment = async (
  req: Request<{}, {}, TParamsDeleteReplenishment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { expenseid } = req.body;
  if (!expenseid || typeof expenseid !== "string") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

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
      (result as any).eaccounttype !== "admin_level_three"
    ) {
      res.status(200).json(RequestStatusObject.invalidField);
      return;
    }
  }

  const replenishmentData = await db.query.replenishment.findFirst({
    where: and(eq(replenishment.expenseid, expenseid)),
  });

  if (!replenishmentData) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }
  next();
};

export default MW_v9_delete_replenishment;
