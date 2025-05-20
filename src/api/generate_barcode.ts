import {
  IResponseFail,
  IResponseSuccess,
  TParamsGenerateBarcode,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import BwipJs from "bwip-js";
import { and, eq } from "drizzle-orm";
import { ProductTable } from "@/config/drizzle/tables/table_product";
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
} from "docx";
import { Buffer } from "buffer";

const v9_generate_barcode = async (
  req: Request<{}, {}, TParamsGenerateBarcode>,
  res: Response<IResponseSuccess<any> | IResponseFail | Buffer>
): Promise<void> => {
  const { productid, sizecategory, quantity } = req.body;

  const productInfo = await db.query.product.findFirst({
    where: and(eq(ProductTable.productid, productid)),
  });

  if (!productInfo) {
    res.status(200).json({
      status: 401,
      message: "Product not found",
    });
    return;
  }

  const quantityMap: Record<
  string,
  string
> = {
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


  const generateOrderId = () => Math.random().toString(36).substring(2, 15);

  // Prepare arrays of ImageRuns and itemIds
  const images: ImageRun[] = [];
  const itemIds: string[] = [];

  for (let i = 0; i < Math.floor(Number(quantity)); i++) {
    const itemLoggedId = generateOrderId();
    itemIds.push(itemLoggedId);

    let qrBuffer: Buffer;
    try {
      qrBuffer = await BwipJs.toBuffer({
        bcid: "qrcode",
        text: `http://192.168.254.135:3001/v9/barcode_additem?productid=${productid}&sizecategory=${sizecategory}&itemid=${itemLoggedId}`,
        scale: 5,
        height: 10,
        width: 10,
        includetext: true,
        backgroundcolor: "FFFFFF",
      });
    } catch (err) {
      res.status(200).json({
        status: 402,
        message: "Error generating the barcode",
      });
      return;
    }

    const image = new ImageRun({
      data: qrBuffer,
      transformation: {
        width: 100,  // smaller size here
        height: 100,
      },
      type: "png",
    });
    images.push(image);
  }

  // Create rows for a 3-column table
  const rows: TableRow[] = [];
  for (let i = 0; i < images.length; i += 3) {
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [images[i]],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `QR ID number: ${itemIds[i]}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `${productInfo.title}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `Size: ${quantityMap[sizecategory] || quantityMap.quantitydefault}`,
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: { size: 33.33, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            verticalAlign: VerticalAlign.CENTER,
          }),
  
          new TableCell({
            children:
              i + 1 < images.length
                ? [
                    new Paragraph({
                      children: [images[i + 1]],
                      alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                      text: `QR ID number: ${itemIds[i + 1]}`,
                      alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                      text: `${productInfo.title}`,
                      alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                      text: `Size: ${quantityMap[sizecategory] || quantityMap.quantitydefault}`,
                      alignment: AlignmentType.CENTER,
                    }),
                  ]
                : [],
            width: { size: 33.33, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            verticalAlign: VerticalAlign.CENTER,
          }),
  
          new TableCell({
            children:
              i + 2 < images.length
                ? [
                    new Paragraph({
                      children: [images[i + 2]],
                      alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                      text: `QR ID number: ${itemIds[i + 2]}`,
                      alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                      text: `${productInfo.title}`,
                      alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                      text: `Size: ${quantityMap[sizecategory] || quantityMap.quantitydefault}`,
                      alignment: AlignmentType.CENTER,
                    }),
                  ]
                : [],
            width: { size: 33.33, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      })
    );
  }

  // Create the document with the table section
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Table({
            rows,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: 300,
              bottom: 300,
            },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = `${productInfo.title}_${productInfo.productid}_qr.docx`;

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.status(200).send(buffer);
};

export default v9_generate_barcode;
