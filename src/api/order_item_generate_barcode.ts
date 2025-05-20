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
  const {  orderid } = req.body;

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

  const images: ImageRun[] = [];
  const itemInfos: { id: string; size: string; orderid: string, title: string }[] = [];

  for (const order of allOrders) {
    for (const [field, sizeLabel] of Object.entries(quantityMap)) {
      const qty = order[field as keyof typeof order] as number;
      if (!qty || qty <= 0) continue;

      for (let i = 0; i < qty; i++) {
        const itemId = generateItemId();
        itemInfos.push({ id: itemId, size: sizeLabel, orderid: order.orderid, title: order.title as string });
        
        try {
          const qrBuffer = await BwipJs.toBuffer({
            bcid: "qrcode",
            text: `http://192.168.254.135:3001/v9/barcode_orderitem?productid=${order.productid}&sizecategory=${field}&itemid=${itemId}&orderid=${order.orderid}`,
            scale: 5,
            height: 10,
            width: 10,
            includetext: true,
            backgroundcolor: "FFFFFF",
            barcolor: "FF0000",
          });

          images.push(
            new ImageRun({
              data: qrBuffer,
              transformation: { width: 100, height: 100 },
              type: "png",
            }),
          );
        } catch (err) {
          res.status(200).json({ status: 402, message: "Error generating QR code" });
          return;
        }
      }
    }
  }

  if (images.length === 0) {
    res.status(200).json({ status: 400, message: "No quantities found in any order." });
    return;
  }

  const rows: TableRow[] = [];
  for (let i = 0; i < images.length; i += 3) {
    rows.push(
      new TableRow({
        children: [0, 1, 2].map((offset) => {
          const idx = i + offset;
          if (idx >= images.length) {
            return new TableCell({ children: [], width: { size: 33.33, type: WidthType.PERCENTAGE } });
          }

          const info = itemInfos[idx];
          return new TableCell({
            children: [
              new Paragraph({ children: [images[idx]], alignment: AlignmentType.CENTER }),
              // new Paragraph({ text: `QR ID: ${info.id} ✓`, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: `${info.title}`, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: `Size: ${info.size}`, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: `Order ID: ${info.orderid}`, alignment: AlignmentType.CENTER }),
               new Paragraph({ text: `OUTGOING`, alignment: AlignmentType.CENTER }),
            ],
            width: { size: 33.33, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
          });
        }),
      }),
    );
  }
  const header = new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: `Full name: ${OrderUserInfo?.receiverfirstname} ${OrderUserInfo?.receiverlastname}`,
            bold: true,
            size: 24, // font size 12pt (size is half-points)
          }),
        ],
        alignment: "center",
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Address: ${OrderUserInfo?.address}`,
            bold: true,
            size: 24, // font size 12pt (size is half-points)
          }),
        ],
        alignment: "center",
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Mobile number: ${OrderUserInfo?.receivermobile}`,
            bold: true,
            size: 24, // font size 12pt (size is half-points)
          }),
        ],
        alignment: "center",
      }),
    ],
  });
  
  const doc = new Document({
    sections: [
      {
        headers: {
          default: header,
        },
        children: [
          new Table({
            rows,
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { top: 300, bottom: 300 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = `ALLORDERS_qr.docx`;

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.status(200).send(buffer);
};

export default v9_order_item_generate_barcode;
