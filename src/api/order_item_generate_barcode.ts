import {
  IResponseFail,
  IResponseSuccess,
  TParamsOrderGenerateBarcode,
  TParamsOrderQrCodeGenerator,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import BwipJs from "bwip-js";
import { and, eq } from "drizzle-orm";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  VerticalAlign,
  WidthType,
  TextRun,
  Header,
} from "docx";
import { Buffer } from "buffer";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { EParamsDefault } from "@/constant/constant_main";
import ExcelJS from "exceljs";

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

const v9_order_item_generate_barcode = async (
  req: Request<{}, {}, TParamsOrderQrCodeGenerator>,
  res: Response<IResponseSuccess<any> | IResponseFail | Buffer>,
): Promise<void> => {
  const { orderid } = req.body;

  const [allOrders, OrderUserInfo] = await Promise.all([
    db
      .select({
        id: OrderTable.id,
        title: ProductTable.title,
        orderid: OrderTable.orderid,
        productid: OrderTable.productid,
        username: OrderTable.username,
        price: OrderTable.price,
        orderquantity: OrderTable.orderquantity,
        orderdate: OrderTable.orderdate,
        quantityxxs: OrderTable.quantityxxs,
        quantityxs: OrderTable.quantityxs,
        quantitys: OrderTable.quantitys,
        quantitym: OrderTable.quantitym,
        quantityl: OrderTable.quantityl,
        quantityxl: OrderTable.quantityxl,
        quantityxxl: OrderTable.quantityxxl,
        quantity5: OrderTable.quantity5,
        quantity55: OrderTable.quantity55,
        quantity6: OrderTable.quantity6,
        quantity65: OrderTable.quantity65,
        quantity7: OrderTable.quantity7,
        quantity75: OrderTable.quantity75,
        quantity8: OrderTable.quantity8,
        quantity85: OrderTable.quantity85,
        quantity9: OrderTable.quantity9,
        quantity95: OrderTable.quantity95,
        quantity100: OrderTable.quantity100,
        quantity105: OrderTable.quantity105,
        quantity110: OrderTable.quantity110,
        quantity115: OrderTable.quantity115,
        quantity120: OrderTable.quantity120,
        quantitydefault: OrderTable.quantitydefault,
      })
      .from(OrderTable)
      .leftJoin(ProductTable, eq(OrderTable.productid, ProductTable.productid))
      .where(eq(OrderTable.orderid, orderid)),
    db.query.orderuser.findFirst({
      where: and(
        eq(OrderUserTable.orderid, orderid)
      )
    })
  ]);

  if (!allOrders.length) {
    res.status(200).json({ status: 400, message: "No orders found for this product." });
    return;
  }

  const generateItemId = () => Math.random().toString(36).substring(2, 15);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("QR Codes");

  worksheet.columns = [
    { header: "QR ID", key: "qrId", width: 25 },
    { header: "Product Title", key: "title", width: 32 },
    { header: "Size", key: "size", width: 10 },
    { header: "orderid", key: "orderid", width: 10 },
    { header: "QR Code URL", key: "url", width: 60 },
    { header: "Mode", key: "mode", width: 15 },
  ];

  for (const order of allOrders) {
    for (const [field, sizeLabel] of Object.entries(quantityMap)) {
      const qty = order[field as keyof typeof order] as number;
      if (!qty || qty <= 0) continue;

      for (let i = 0; i < qty; i++) {
        const itemId = generateItemId();
        worksheet.addRow({
          qrId: itemId,
          title: order.title,
          size: sizeLabel,
          orderid: order.orderid,
          url: `${EParamsDefault.IPAddress}:3001/v9/barcode_orderitem?productid=${order.productid}&sizecategory=${field}&itemid=${itemId}&orderid=${order.orderid}`,
          mode: "OUTGOING",
        });
      }
    }
  }

  const rawFilename = `${OrderUserInfo?.orderid}_qr.xlsx`;
  const safeFilename = rawFilename.replace(/[^a-z0-9_\-\.]/gi, '_');

  try {
    // Write the buffer to send it in the response
    const buffer = await workbook.xlsx.writeBuffer();

    // Set the appropriate headers
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
    );

    // Send the buffer
    res.send(buffer as any);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ status: 500, message: "Failed to generate Excel file." });
  }
};


export default v9_order_item_generate_barcode;
