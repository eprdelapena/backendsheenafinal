import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { Parser } from "json2csv";

const v9_download_producttable = async (
  req: Request<{}, {}, {}>,
  res: Response<any>,
): Promise<void> => {
  const productList = await db.select({
    productid: ProductTable.productid,
    productname: ProductTable.title,
    sellingprice: ProductTable.price,
    buyingprice: ProductTable.cost,
    pendingorders: ProductTable.pendingorders,
    quantityxxs: ProductTable.quantityxxs,
    quantityxs: ProductTable.quantityxs,
    quantitys: ProductTable.quantitys,
    quantitym: ProductTable.quantitym,
    quantityl: ProductTable.quantityl,
    quantityxl: ProductTable.quantityxl,
    quantityxxl: ProductTable.quantityxxl,
    quantity5: ProductTable.quantity5,
    quantity55: ProductTable.quantity55,
    quantity6: ProductTable.quantity6,
    quantity65: ProductTable.quantity65,
    quantity7: ProductTable.quantity7,
    quantity75: ProductTable.quantity75,
    quantity8: ProductTable.quantity8,
    quantity85: ProductTable.quantity85,
    quantity9: ProductTable.quantity9,
    quantity95: ProductTable.quantity95,
    quantity100: ProductTable.quantity100,
    quantity105: ProductTable.quantity105,
    quantity110: ProductTable.quantity110,
    quantity115: ProductTable.quantity115,
    quantity120: ProductTable.quantity120,
    quantitydefault: ProductTable.quantitydefault,
    regdate: ProductTable.regdate,
  }).from(ProductTable);
  console.log("product list", productList)
  if(!productList || (productList as any)?.length === 0 ){
    res.status(200).json({
        status: 403,
        message: "Table is empty"
    });
    return;
  }

  const parser = new Parser();
  const csv = parser.parse(productList);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="producttable.csv"');
  res.status(200).send(csv);

  return;
};

export default v9_download_producttable;
