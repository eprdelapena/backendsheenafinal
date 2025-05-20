import {
    IResponseFail,
    IResponseSuccess,
    TParamsGenerateBarcode,
  } from "@/types/main_schema";
  import { Request, response, Response } from "express";
  import { db } from "@/config/drizzle/connectdb";
  import BwipJs from "bwip-js";
  import { and, eq } from "drizzle-orm";
  import { ProductTable } from "@/config/drizzle/tables/table_product";
  
  const v9_generate_barcode = async (
    req: Request<{}, {}, TParamsGenerateBarcode>,
    res: Response<IResponseSuccess<any> | IResponseFail | Buffer>,
  ): Promise<void> => {
    
    const { productid, sizecategory } = req.body;
    console.log('size category', sizecategory, productid);
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
  
  
    const generateOrderId = () => {
      return Math.random().toString(36).substring(2, 15);
    };
  
    const itemLoggedId = generateOrderId();
  
    // Barcode
    // {
    //   bcid: 'code128',
    //   text: `${productid}`,
    //   scale: 3,
    //   height: 10,
    //   includetext: false,
    // },
  
    // QR Code
    // {
    //   bcid: 'qrcode', // Change to QR code
    //   text: `${productid}`, // The text or URL you want to encode
    //   scale: 3, // Adjust size as needed
    //   height: 10, // Height is less relevant for QR codes
    //   includetext: false, // You can set this to true if you want text below the QR code
    // },
  
    BwipJs.toBuffer(
      {
        bcid: "qrcode", // Change to QR code
        text: `http://192.168.254.135:3001/v9/barcode_additem?productid=${productid}&sizecategory=${sizecategory}&itemid=${itemLoggedId}`, // The text or URL you want to encode
        scale: 5, // Adjust size as needed
        height: 10, // Height is less relevant for QR codes
        width: 10,
        includetext: true, // You can set this to true if you want text below the QR code
      },
      (err, png) => {
        if (err) {
          res.status(200).json({
            status: 402,
            message: "Error generating the barcode",
          });
          return;
        }
  
        const filename = `${productInfo.title}_${productInfo.productid}.png`;
  
        res.setHeader("Content-Type", "image/png");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}"`,
        );
  
        // Send the PNG image buffer directly in the response
        res.status(200).setHeader("Content-Type", "image/png").send(png);
      },
    );
  
    return;
  };
  
  export default v9_generate_barcode;