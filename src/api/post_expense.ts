import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TParamsPostExpense,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { ExpenseTable } from "@/config/drizzle/tables/tabke_expense";

const v9_post_expense = async (
  req: Request<{}, {}, TParamsPostExpense>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { username, expense, memo } = req.body;

  const generateOrderId = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  const expensedate = new Date();
  const expenseid = generateOrderId();

  const newOrder = {
    username,
    expenseid,
    expensedate,
    expense,
    memo,
  };

  await db.insert(ExpenseTable).values(newOrder);
  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_expense;
