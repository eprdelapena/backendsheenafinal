import { Request, Response, NextFunction } from "express";
import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseSuccess,
  IResponseFail,
  ILoginResponse,
  EProductCategory,
  ISearchProductProperty,
} from "@/types/main_schema";

const MW_v9_searchproduct = async (
  req: Request<{}, {}, ISearchProductProperty>,
  res: Response<IResponseSuccess<ILoginResponse> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { category, title, searchtag, skip = 1 } = req.body;

  if (skip && typeof skip !== "number") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }
  if (category && typeof category !== "string") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  if (title && typeof title !== "string") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  if (searchtag && typeof searchtag !== "string") {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  let isValidCategory: boolean = true;

  if (category) {
    isValidCategory =
      category === EProductCategory.bags ||
      category === EProductCategory.clothes ||
      category === EProductCategory.jewelry ||
      category === EProductCategory.shoes ||
      category === EProductCategory.others ||
      category === EProductCategory.watches;
  }

  if (isValidCategory === false) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  next();
};

export default MW_v9_searchproduct;
