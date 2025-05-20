import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IRegister,
  EAccountType,
  TAdminClassification,
} from "@/types/main_schema";
import geoip from "geoip-lite";
import { RequestStatusObject } from "@/constant/constant_main";
import { v4 } from "uuid";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { makePasswordHash, randomString } from "@/utils/main_utils";

const v9_register = async (
  req: Request<{}, {}, IRegister>,
  res: Response<IResponseSuccess<IRegister> | IResponseFail>,
): Promise<void> => {
  const {
    username,
    password,
    email,
    mobile,
    firstname,
    middlename,
    lastname,
    estatustype,
  } = req.body;

  const token = v4();
  const salt = randomString(5);
  const hashedPassword = makePasswordHash(salt, password);

  const regdate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });
  const lastdate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });

  const regdateObj = new Date(regdate);
  const lastdateObj = new Date(lastdate);

  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const userAgent = req.headers["user-agent"];

  const geo = geoip.lookup(ipAddress as string);
  const location = geo ? geo.city + ", " + geo.country : "Unknown Location";

  let accounttype: TAdminClassification = EAccountType.customer;

  let isAdmin = req.headers["admin-key"];

  if (isAdmin && isAdmin === "12345" && estatustype) {
    accounttype = estatustype as TAdminClassification;
  }

  const newUser = {
    firstname,
    lastname,
    middlename,
    username,
    password: hashedPassword,
    salt,
    mobile,
    email,
    token,
    eaccounttype: accounttype,
    regdate: regdateObj,
    lastdate: lastdateObj,
    lastip: ipAddress as string,
    lastdevice: userAgent,
    lastlocation: location,
  };

  const result = await db.insert(users).values(newUser);
  res.status(200).json(RequestStatusObject.success);
};

export default v9_register;
