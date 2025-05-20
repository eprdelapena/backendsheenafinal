import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TPostOrderUserParams,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { EAccountType } from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_post_orderuser = async (
  req: Request<{}, {}, TPostOrderUserParams>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string }>>
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
      (result as any).eaccounttype !== "admin_viewer" &&
      (result as any).eaccounttype !== "admin_level_one" &&
      (result as any).eaccounttype !== "admin_level_two" &&
      (result as any).eaccounttype !== "admin_level_three"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  const {
    username,
    receiverfirstname,
    receiverlastname,
    receivermobile,
    region,
    province,
    municity,
    barangay,
    address,
    originsite,
    downpayment,
    totalcost,
    orders,
  } = req.body;

  const isUsernameInvalid =
    !username ||
    username.length === 0 ||
    typeof username !== "string" ||
    /[^a-zA-Z0-9]/.test(username);
  const isReceiverFirstNameInvalid =
    !receiverfirstname ||
    receiverfirstname.length === 0 ||
    typeof receiverfirstname !== "string";
  const isReceiverLastNameInvalid =
    !receiverlastname ||
    receiverlastname.length === 0 ||
    typeof receiverlastname !== "string";
  const isReceiverMobileInvalid =
    !receivermobile ||
    receivermobile.length < 6 ||
    typeof receivermobile !== "string" ||
    !/^09\d{9}$/.test(receivermobile);
  const isRegionInvalid =
    !region || region.length === 0 || typeof region !== "string";
  const isMunicityInvalid =
    !municity || municity.length === 0 || typeof municity !== "string";
  const isProvinceInvalid =
    !province || province.length === 0 || typeof province !== "string";
  const isBarangayInvalid =
    !barangay || barangay.length === 0 || typeof barangay !== "string";
  const isAddressInvalid =
    !address || address.length === 0 || typeof address !== "string";
  const isOriginSite =
    !originsite || originsite.length === 0 || typeof originsite !== "string";
  const isDownpaymentInvalid = Number(downpayment).toLocaleString() === "NaN";
  const isTotalCostInvalid = Number(totalcost).toLocaleString() === "NaN";
  // const isOrdersInvalid = orders && orders?.length && orders.length === 0

  if (
    isUsernameInvalid ||
    isReceiverFirstNameInvalid ||
    isReceiverLastNameInvalid ||
    isReceiverMobileInvalid ||
    isRegionInvalid ||
    isMunicityInvalid ||
    isBarangayInvalid ||
    isProvinceInvalid ||
    isAddressInvalid ||
    isOriginSite ||
    isDownpaymentInvalid ||
    isTotalCostInvalid
    // isOrdersInvalid
  ) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  next();
};

export default MW_v9_post_orderuser;
