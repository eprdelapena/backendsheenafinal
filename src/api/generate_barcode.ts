import { Parser } from "json2csv";
import { IResponseFail, IResponseSuccess, TParamsGenerateBarcode } from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { EParamsDefault } from "@/constant/constant_main";
import ExcelJS from "exceljs";

const v9_generate_barcode_csv = async (
  req: Request<{}, {}, TParamsGenerateBarcode>,
  res: Response<IResponseSuccess<any> | IResponseFail | string>
): Promise<void> => {
  const { productid, sizecategory, quantity } = req.body;

  const productInfo = await db.query.product.findFirst({
    where: and(eq(ProductTable.productid, productid)),
  });

  if (!productInfo) {
    res.status(404).json({
      status: 404,
      message: "Product not found",
    });
    return;
  }

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

  const generateOrderId = () => Math.random().toString(36).substring(2, 15);
  const size = quantityMap[sizecategory] || quantityMap.quantitydefault;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("QR Codes");

  worksheet.columns = [
    { header: "QR ID", key: "qrId", width: 25 },
    { header: "Product Title", key: "title", width: 32 },
    { header: "Size", key: "size", width: 10 },
    { header: "QR Code URL", key: "url", width: 60 },
    { header: "Mode", key: "mode", width: 15 },
  ];

  for (let i = 0; i < Math.floor(Number(quantity)); i++) {
    const itemId = generateOrderId();
    const qrUrl = `${EParamsDefault.IPAddress}:3001/v9/barcode_additem?productid=${productid}&sizecategory=${sizecategory}&itemid=${itemId}`;

    worksheet.addRow({
      qrId: itemId,
      title: productInfo.title,
      size: size,
      url: qrUrl,
      mode: "INCOMING",
    });
  }

  const rawFilename = `${productInfo.title}_${productInfo.productid}_qr.xlsx`;
  const safeFilename = rawFilename.replace(/[^a-z0-9_\-\.]/gi, '_');

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
  );

  await workbook.xlsx.write(res);
  res.end();
};

export default v9_generate_barcode_csv;
