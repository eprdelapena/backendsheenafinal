import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";
import { Parser } from "json2csv";

const v9_download_installmenttable = async (
  req: Request<{}, {}, {}>,
  res: Response<any>,
): Promise<void> => {
  const installmentList = await db.select().from(InstallmentTable);
  console.log("installment list", installmentList)
  if(!installmentList || (installmentList as any)?.length === 0 ){
    res.status(200).json({
        status: 403,
        message: "Table is empty"
    });
    return;
  }
  const parser = new Parser();
  const csv = parser.parse(installmentList)

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="installmenttable.csv"');
  res.status(200).send(csv);

  return;
};

export default v9_download_installmenttable;
