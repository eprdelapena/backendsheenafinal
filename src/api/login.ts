import { Request, Response } from "express";
import {
  ILogin,
  IResponseSuccess,
  IResponseFail,
  ILoginResponse,
} from "@/types/main_schema";
import geoip from "geoip-lite";
import { RequestStatusObject } from "@/constant/constant_main";
import { v4 } from "uuid";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { UserTable } from "@/config/drizzle/tables/table_user";
import { and, eq } from "drizzle-orm";
const v9_login = async (
  req: Request<{}, {}, ILogin>,
  res: Response<IResponseSuccess<ILoginResponse> | IResponseFail>,
): Promise<void> => {
  const newToken = v4();
  const newlastdate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });
  const { username } = req.body;
  const lastdateObj = new Date(newlastdate);
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  const userAgent = req.headers["user-agent"];
  // const platform = userAgent
  //   ? userAgent.split(") ")[0].split("(")[1]
  //   : "Unknown Platform";

  const geo = geoip.lookup(ipAddress as string);
  const location = geo ? geo.city + ", " + geo.country : "Unknown Location";

  const result = await db
    .update(users)
    .set({
      token: newToken,
      lastdate: lastdateObj,
      lastip: ipAddress as string,
      lastdevice: userAgent,
      lastlocation: location,
    })
    .where(and(eq(UserTable.username, username)))
    .returning();

  res.status(200).json({
    ...RequestStatusObject.success,
    data: {
      firstname: result[0].firstname,
      middlename: result[0].middlename,
      lastname: result[0].lastname,
      username: result[0].username,
      token: result[0].token,
      mobile: result[0].mobile,
      email: result[0].email,
      eaccounttype: result[0].eaccounttype!,
      regdate: result[0].regdate!,
      lastip: result[0].lastip!,
      lastdevice: result[0].lastdevice!,
      lastlocation: result[0].lastlocation!,
    },
  });

  return;
};

export default v9_login;
