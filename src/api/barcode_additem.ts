import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TEditProductsParams,
} from "@/types/main_schema";
import { ECategory, RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import {
  sql,
  eq,
  and
} from 'drizzle-orm'
import { LogTable } from "@/config/drizzle/tables/table_itemlogs";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { title } from "process";

const v9_barcode_additem = async (
  req: Request<{}, {}, {}>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { productid, sizecategory, itemid } = req.query;
    
  const quantityMap: Record<string, string> = {
    quantityxxs: "XXS",
    quantityxs: "XS",
    quantitys: "S",
    quantitym: "M",
    quantityl: "L",
    quantityxl: "XL",
    quantityxxl: "XXL",
    quantity5: "5.0",
    quantity55: "5.5",
    quantity6: "6.0",
    quantity65: "6.5",
    quantity7: "7.0",
    quantity75: "7.5",
    quantity8: "8.0",
    quantity85: "8.5",
    quantity9: "9.0",
    quantity95: "9.5",
    quantity100: "10.0",
    quantity105: "10.5",
    quantity110: "11.0",
    quantity115: "11.5",
    quantity120: "12.0",
    quantitydefault: "default",
  };

  const [isAddedAlready, productInfo] = await Promise.all([
    db.query.itemlog.findFirst({
      where: and(
        eq(LogTable.itemid, itemid as string)
      )
    }),
    db.query.product.findFirst({
      where: and(
        eq(ProductTable.productid, Number(productid))
      )
    })
  ])

  if(isAddedAlready){
    const htmlError = `
    <html>
      <head>
        <title>Item Already Registered</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; background: #fffbe6; }
          .container { background: #fff3cd; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(255,193,7,0.1); }
          h1 { color: #856404; }
          p { margin-top: 0.5rem; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>⚠️ Duplicate Item ID</h1>
          <p>The item ID <strong>${isAddedAlready.itemid}</strong> is already registered.</p>
          <p><span class="label">Logged Date:</span> ${new Date(isAddedAlready.logdate || "").toLocaleString()}</p>
          <p><span class="label">Size:</span> ${quantityMap[`${isAddedAlready?.size || ""}`] || "No size"}</p>
          <p>Please ensure each item has a unique ID.</p>
        </div>
      </body>
    </html>
  `;
  res.status(200).send(htmlError as any);
  return;
  }

  if(!productInfo){
    const htmlError = `
    <html>
      <head>
        <title>Product Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; background: #fff5f5; }
          .container { background: #ffe6e6; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(255,0,0,0.1); }
          h1 { color: #d32f2f; }
          p { margin-top: 1rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Product Not Found</h1>
          <p>The provided <strong>Product ID (${productid})</strong> does not exist in the database.</p>
          <p>Please make sure the product has been registered before adding an item log.</p>
        </div>
      </body>
    </html>
  `;
  res.status(200).send(htmlError as any);
  return;
  }
  
  const newItemLog = {
    productid: Number(productid || 0),
    itemid: itemid as string,
    title: productInfo?.title || "",
    category: productInfo?.category || "",
    price: productInfo?.price || "0.00",
    cost: productInfo?.cost || "0.00",
    size: sizecategory as string,
    mode: "incoming",
  }

  await Promise.all([
    db.update(product)
      .set({
        [sizecategory as string]: sql.raw(`"${sizecategory}" + 1`)
      })
      .where(eq(product.productid, Number(productid))),
    db.insert(LogTable).values(newItemLog)
  ])

  const htmlResponse = `
    <html>
      <head>
        <title>Item Registered</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; background: #f4f4f4; }
          .container { background: white; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #4CAF50; }
          p { margin: 0.5rem 0; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Item Registered Successfully</h1>
          <p><span class="label">Item ID:</span> ${newItemLog.itemid}</p>
          <p><span class="label">Product Title:</span> ${newItemLog.title}</p>
          <p><span class="label">Size:</span>  ${quantityMap[`${newItemLog?.size || ""}`] || "No size"}</p>
          <p><span class="label">Price:</span> ₱${newItemLog.price}</p>
          <p><span class="label">Cost:</span> ₱${newItemLog.cost}</p>
          <p><span class="label">Mode:</span> ${newItemLog.mode}</p>
        </div>
      </body>
    </html>
  `;

  res.status(200).send(htmlResponse as any);
  return;
};

export default v9_barcode_additem;
