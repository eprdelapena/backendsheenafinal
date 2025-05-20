import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsGetMonthlyIncome,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, gte, lte, sql } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { ExpenseTable } from "@/config/drizzle/tables/tabke_expense";

const v9_get_monthly_income = async (
  req: Request<{}, {}, TParamsGetMonthlyIncome>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { begin, end } = req.body;

  const limit: number = 35;

  let dateBegin;
  let dateEnd;
  if (begin) {
    dateBegin = new Date(begin);
  }
  if (end) {
    dateEnd = new Date(end);
  }

  const [successincome, projectedincome, expenses] = await Promise.all([
    db
      .select({
        day: sql<string>`TO_CHAR(${OrderUserTable.orderdate}, 'YYYY-MM-DD')`,
        totalincome: sql<string>`SUM(${OrderUserTable.cuurentpayment})`,
      })
      .from(OrderUserTable)
      .groupBy(sql`TO_CHAR(${OrderUserTable.orderdate}, 'YYYY-MM-DD')`)
      .where(
        and(
          gte(OrderUserTable.orderdate, dateBegin as Date),
          lte(OrderUserTable.orderdate, dateEnd as Date),
        ),
      )
      .limit(limit),
    db
      .select({
        day: sql<string>`TO_CHAR(${OrderUserTable.orderdate}, 'YYYY-MM-DD')`,
        totalincome: sql<string>`SUM(${OrderUserTable.totalcost} - ${OrderUserTable.cuurentpayment})`,
      })
      .from(OrderUserTable)
      .groupBy(sql`TO_CHAR(${OrderUserTable.orderdate}, 'YYYY-MM-DD')`)
      .where(
        and(
          gte(OrderUserTable.orderdate, dateBegin as Date),
          lte(OrderUserTable.orderdate, dateEnd as Date),
        ),
      )
      .limit(limit),
    db
      .select({
        day: sql<string>`TO_CHAR(${ExpenseTable.expensedate}, 'YYYY-MM-DD')`,
        memo: sql<string>`STRING_AGG(${ExpenseTable.memo}, ', ')`,
        expense: sql<string>`SUM(${ExpenseTable.expense})`,
      })
      .from(ExpenseTable)
      .groupBy(sql`TO_CHAR(${ExpenseTable.expensedate}, 'YYYY-MM-DD')`)
      .where(
        and(
          gte(ExpenseTable.expensedate, dateBegin as Date),
          lte(ExpenseTable.expensedate, dateEnd as Date),
        ),
      ),
  ]);

  // Generate all dates in the range
  const allDates: string[] = [];
  let currentDate = new Date(dateBegin as Date);
  while (currentDate <= (dateEnd as Date)) {
    allDates.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const merged: Record<
    string,
    {
      day: string;
      successincome: number;
      projectedincome: number;
      memo: string | null;
      expense: number;
    }
  > = {};

  // Initialize merged with all dates
  for (const day of allDates) {
    merged[day] = {
      day,
      successincome: 0,
      projectedincome: 0,
      memo: null,
      expense: 0,
    };
  }

  // Merge successincome data
  for (const row of successincome) {
    if (merged[row.day]) {
      merged[row.day].successincome = Number(row.totalincome);
    }
  }

  // Merge projectedincome data
  for (const row of projectedincome) {
    if (merged[row.day]) {
      merged[row.day].projectedincome = Number(row.totalincome);
    }
  }

  // Merge expenses data
  for (const row of expenses) {
    if (merged[row.day]) {
      merged[row.day].memo = row.memo;
      merged[row.day].expense = Number(row.expense ?? 0);
    }
  }

  const combined = Object.values(merged);

  res.status(200).json({
    message: "success",
    status: 200,
    data: combined,
  });
  return;
};

export default v9_get_monthly_income;
