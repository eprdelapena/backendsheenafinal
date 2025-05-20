import { users } from "@/config/drizzle/schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { IResponseFail, TAddOrderUser } from "@/types/main_schema";
import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { db } from "@/config/drizzle/connectdb";
import { EAccountType } from "@/types/main_schema";

const MW_v9_addorderuser_admin = async (
  req: Request<{}, {}, TAddOrderUser>,
  res: Response<any | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const {
    username,
    receiverfirstname,
    receiverlastname,
    receivermobile,
    region,
    municity,
    adminusername,
    barangay,
    address,
    originsite,
    downpayment,
    totalcost,
  } = req.body;

  const isEmpty =
    !username ||
    !receiverfirstname ||
    !receiverlastname ||
    !receivermobile ||
    !region ||
    !municity ||
    !barangay ||
    !address ||
    !originsite ||
    !downpayment ||
    !totalcost ||
    !adminusername;

  if (isEmpty) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const isTypeError =
    typeof username !== "string" ||
    typeof receiverfirstname !== "string" ||
    typeof receiverlastname !== "string" ||
    typeof region !== "string" ||
    typeof municity !== "string" ||
    typeof barangay !== "string" ||
    typeof address !== "string" ||
    typeof originsite !== "string" ||
    typeof downpayment !== "string" ||
    typeof totalcost !== "string" ||
    typeof adminusername !== "string" ||
    typeof receivermobile !== "string";

  if (isTypeError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const result = await db.query.users.findFirst({
      where: and(
        eq(users.token, token),
        eq(users.username, adminusername),
        eq(users.eaccounttype, EAccountType.admin),
      ),
    });
    if (!result) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  next();
};

export default MW_v9_addorderuser_admin;
