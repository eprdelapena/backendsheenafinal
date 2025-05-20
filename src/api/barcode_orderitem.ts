import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import {
  sql,
  eq,
  and
} from 'drizzle-orm'
import { LogTable } from "@/config/drizzle/tables/table_itemlogs";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { OrderTable } from "@/config/drizzle/tables/table_order";

const v9_barcode_orderitem = async (
  req: Request<{}, {}, {}>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
    
  const { productid, sizecategory, itemid, orderid } = req.query;
    
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

  const [isAddedAlready, productInfo, orderInfo] = await Promise.all([
    db.query.itemlog.findFirst({
      where: and(
        eq(LogTable.itemid, itemid as string)
      )
    }),
    db.query.product.findFirst({
      where: and(
        eq(ProductTable.productid, Number(productid))
      )
    }),
    db.query.order.findFirst({
        where: and(
          eq(OrderTable.orderid, orderid as string)
        )
    }),
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
          .footer { margin-top: 1.5rem; font-size: 0.9rem; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>⚠️ Failed to Register Item</h1>
          <p>The item ID <strong>${isAddedAlready?.itemid}</strong> is already registered in the system.</p>
          <p><span class="label">Registered On:</span> ${new Date(isAddedAlready?.logdate || "").toLocaleString()}</p>
          <p><span class="label">Size:</span> ${quantityMap[`${isAddedAlready?.size || ""}`] || "No size"}</p>
          <div class="footer">
            Please use a unique item ID to register new entries.
          </div>
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
        <title>Product ID Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; background: #fdecea; }
          .container { background: #f8d7da; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(220,53,69,0.1); }
          h1 { color: #721c24; }
          p { margin-top: 0.5rem; }
          .footer { margin-top: 1.5rem; font-size: 0.9rem; color: #721c24; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Product Not Found</h1>
          <p>The provided <strong>Product ID</strong> <code>${productid}</code> does not exist in the system.</p>
          <div class="footer">
            Please make sure the product is declared before registering an item.
          </div>
        </div>
      </body>
    </html>
  `;
  res.status(200).send(htmlError as any);
    return;
  }

  const sizeKey = sizecategory as keyof typeof productInfo;

  if(Number(productInfo[`${sizeKey}`]) as number <= 0){
    const htmlError = `
    <html>
      <head>
        <title>Insufficient Stock</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; background: #fdecea; }
          .container { background: #f8d7da; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(220,53,69,0.1); }
          h1 { color: #721c24; }
          p { margin-top: 0.5rem; }
          .footer { margin-top: 1.5rem; font-size: 0.9rem; color: #721c24; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Insufficient Stock</h1>
          <p>The requested size <strong>${quantityMap[sizeKey]}</strong> for the product <strong>${productInfo.title}</strong> is out of stock.</p>
          <div class="footer">
            Please choose a different size or restock before proceeding.
          </div>
        </div>
      </body>
    </html>
  `;
  res.status(200).send(htmlError as any);
  return
  }


  if(!orderInfo){
    const htmlError = `
    <html>
      <head>
        <title>Order Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; background: #fff3f3; }
          .container { background: #f8d7da; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(220,53,69,0.1); }
          h1 { color: #721c24; }
          p { margin-top: 0.5rem; }
          .footer { margin-top: 1.5rem; font-size: 0.9rem; color: #721c24; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Order Not Found</h1>
          <p>The specified order no longer exists or may have been deleted.</p>
          <div class="footer">
            Please verify the order ID and try again.
          </div>
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
    orderid: orderid as string,
    mode: "outgoing",
  }

  await Promise.all([
    db.update(product)
      .set({
        [sizecategory as string]: sql.raw(`"${sizecategory}" - 1`)
      })
      .where(eq(product.productid, Number(productid))),
    db.insert(LogTable).values(newItemLog)
  ])

  const htmlSuccess = `
  <html>
    <head>
      <title>Item Registered Successfully</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 2rem; background: #e6ffed; }
        .container { background: #d4edda; padding: 2rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(40,167,69,0.1); }
        h1 { color: #155724; }
        p { margin: 0.5rem 0; }
        .label { font-weight: bold; }
        .footer { margin-top: 1.5rem; font-size: 0.9rem; color: #155724; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Item Registered</h1>
        <p><span class="label">Item ID:</span> ${newItemLog.itemid}</p>
        <p><span class="label">Title:</span> ${newItemLog.title}</p>
        <p><span class="label">Size:</span>  ${quantityMap[`${newItemLog?.size || ""}`] || "No size"}</p>
        <p><span class="label">Price:</span> ₱${newItemLog.price}</p>
        <p><span class="label">Cost:</span> ₱${newItemLog.cost}</p>
        <p><span class="label">Mode:</span> ${newItemLog.mode}</p>
        <div class="footer">
          This item has been successfully recorded and deducted from the order.
        </div>
      </div>
    </body>
  </html>
`;
res.status(200).send(htmlSuccess as any);

  return;
};

export default v9_barcode_orderitem;
