import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TPostOrderUserParams,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { and, eq } from "drizzle-orm";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_post_orderuser = async (
  req: Request<{}, {}, TPostOrderUserParams>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const {
    username,
    receiverfirstname,
    receiverlastname,
    receivermobile,
    region,
    municity,
    barangay,
    address,
    type,
    originsite,
    downpayment,
    totalcost,
    orders,
    province,
  } = req.body;

  const generateOrderId = (): string => {
    const cleanName = receiverfirstname.replace(/\s+/g, '').toLowerCase();
    const randomLetters = Array.from({ length: 4 }, () =>
      String.fromCharCode(97 + Math.floor(Math.random() * 26)) // a–z
    ).join('');
    const randomNumbers = Math.floor(100 + Math.random() * 900); // 3-digit number
    return `${cleanName}_${randomLetters}${randomNumbers}`;
  };

  const dateOfPurchase = new Date();
  const orderId = generateOrderId();

  for (const item of orders) {
    const product = await db.query.product.findFirst({
      where: and(eq(ProductTable.productid, item.productId)),
    });

    if (!product) {
      res.status(500).json(RequestStatusObject.invalidField);
      return;
    }

    const estimatedQuantityLeft = {
      quantitydefault: product.quantitydefault - (item.quantitydefault || 0),
      quantityxxs: product.quantityxxs - (item.quantityxxs || 0),
      quantityxs: product.quantityxs - (item.quantityxs || 0),
      quantittys: product.quantitys - (item.quantittys || 0),
      quantitym: product.quantitym - (item.quantitym || 0),
      quantityl: product.quantityl - (item.quantityl || 0),
      quantityxl: product.quantityxl - (item.quantityxl || 0),
      quantityxxl: product.quantityxxl - (item.quantityxxl || 0),
      quantity5: product.quantity5 - (item.quantity5 || 0),
      quantity55: product.quantity55 - (item.quantity55 || 0),
      quantity6: product.quantity6 - (item.quantity6 || 0),
      quantity65: product.quantity65 - (item.quantity65 || 0),
      quantity7: product.quantity7 - (item.quantity7 || 0),
      quantity75: product.quantity75 - (item.quantity75 || 0),
      quantity8: product.quantity8 - (item.quantity8 || 0),
      quantity85: product.quantity85 - (item.quantity85 || 0),
      quantity9: product.quantity9 - (item.quantity9 || 0),
      quantity95: product.quantity95 - (item.quantity95 || 0),
      quantity100: product.quantity100 - (item.quantity100 || 0),
      quantity105: product.quantity105 - (item.quantity105 || 0),
      quantitty110: product.quantity110 - (item.quantitty110 || 0),
      quantity115: product.quantity115 - (item.quantity115 || 0),
      quantity120: product.quantity120 - (item.quantity120 || 0),
    };

    const totalItemQuantity =
      (item.quantitydefault || 0) +
      (item.quantityxxs || 0) +
      (item.quantityxs || 0) +
      (item.quantittys || 0) +
      (item.quantitym || 0) +
      (item.quantityl || 0) +
      (item.quantityxl || 0) +
      (item.quantityxxl || 0) +
      (item.quantity5 || 0) +
      (item.quantity55 || 0) +
      (item.quantity6 || 0) +
      (item.quantity65 || 0) +
      (item.quantity7 || 0) +
      (item.quantity75 || 0) +
      (item.quantity8 || 0) +
      (item.quantity85 || 0) +
      (item.quantity9 || 0) +
      (item.quantity95 || 0) +
      (item.quantity100 || 0) +
      (item.quantity105 || 0) +
      (item.quantitty110 || 0) +
      (item.quantity115 || 0) +
      (item.quantity120 || 0);

    const itemTotalPrice = Number(item.price);
    const itemPercentage = itemTotalPrice / Number(totalcost);
    const itemDownpayment = itemPercentage * Number(downpayment);
    console.log("post order user")
    await Promise.all([
      db
        .update(ProductTable)
        .set({
          // ...estimatedQuantityLeft,
          pendingorders: product.pendingorders + totalItemQuantity,
          expected: `${Number(product.expected) + itemTotalPrice - itemDownpayment}`,
          earning: `${Number(product.earning) + itemDownpayment}`,
        })
        .where(and(eq(ProductTable.productid, item.productId))),
      db.insert(OrderTable).values({
        orderid: orderId,
        productid: item.productId,
        username,
        price: item.price,
        orderquantity: totalItemQuantity,
        orderdate: dateOfPurchase,
        quantitydefault: item.quantitydefault,
        quantityxxs: item.quantityxxs,
        quantityxs: item.quantityxs,
        quantitys: item.quantittys,
        quantitym: item.quantitym,
        quantityl: item.quantityl,
        quantityxl: item.quantityxl,
        quantityxxl: item.quantityxxl,
        quantity5: item.quantity5,
        quantity55: item.quantity55,
        quantity6: item.quantity6,
        quantity65: item.quantity65,
        quantity7: item.quantity7,
        quantity75: item.quantity75,
        quantity8: item.quantity8,
        quantity85: item.quantity85,
        quantity9: item.quantity9,
        quantity95: item.quantity95,
        quantity100: item.quantity100,
        quantity105: item.quantity105,
        quantity110: item.quantitty110,
        quantity115: item.quantity115,
        quantity120: item.quantity120,
      }),
    ]);
  }

  const newOrder = {
    username,
    orderid: orderId as string,
    receiverfirstname,
    receiverlastname,
    receivermobile,
    region,
    municity,
    barangay,
    address,
    province,
    originsite: originsite as any,
    cuurentpayment: `${Number(downpayment)}`,
    totalcost: `${Number(totalcost)}`,
    orderdate: dateOfPurchase,
    type: type ? type : undefined
  };

  const newInstallment = {
    orderid: orderId,
    username,
    installment: `${Number(downpayment)}`,
    installmentdate: dateOfPurchase,
  };

  await Promise.all([
    db.insert(OrderUserTable).values(newOrder),
    db.insert(InstallmentTable).values(newInstallment),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_orderuser;
