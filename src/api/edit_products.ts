import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TEditProductsParams,
} from "@/types/main_schema";
import { ECategory, RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";

const v9_edit_products = async (
  req: Request<{}, {}, Partial<TEditProductsParams>>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let {
    productid,
    title,
    cost,
    price,
    category,
    image,
    imageone,
    imagetwo,
    imagethree,
    description,
    searchtag,
    quantityxxs,
    quantityxs,
    quantittys,
    quantitym,
    quantityl,
    quantityxl,
    quantityxxl,
    quantity5,
    quantity55,
    quantity6,
    quantity65,
    quantity7,
    quantity75,
    quantity8,
    quantity85,
    quantity9,
    quantity95,
    quantity100,
    quantity105,
    quantitty110,
    quantity115,
    quantity120,
    quantitydefault,
  } = req.body;

  const updatedFields: any = {};

  if (title) updatedFields.title = title;
  if (price) updatedFields.price = price;
  if (category) updatedFields.category = category;
  if (description) updatedFields.description = description;
  if (searchtag) updatedFields.searchtag = searchtag;
  if (cost) updatedFields.cost = cost;

  if (image) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
    updatedFields.image = image;
  }

  if (imageone) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
    updatedFields.imageone = imageone;
  }

  if (imagetwo) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
    updatedFields.imagetwo = imagetwo;
  }

  if (imagethree) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
    updatedFields.imagethree = imagethree;
  }

  if (quantityxxs !== undefined) updatedFields.quantityxxs = quantityxxs;
  if (quantityxs !== undefined) updatedFields.quantityxs = quantityxs;
  if (quantittys !== undefined) updatedFields.quantitys = quantittys;
  if (quantitym !== undefined) updatedFields.quantitym = quantitym;
  if (quantityl !== undefined) updatedFields.quantityl = quantityl;
  if (quantityxl !== undefined) updatedFields.quantityxl = quantityxl;
  if (quantityxxl !== undefined) updatedFields.quantityxxl = quantityxxl;
  if (quantity5 !== undefined) updatedFields.quantity5 = quantity5;
  if (quantity55 !== undefined) updatedFields.quantity55 = quantity55;
  if (quantity6 !== undefined) updatedFields.quantity6 = quantity6;
  if (quantity65 !== undefined) updatedFields.quantity65 = quantity65;
  if (quantity7 !== undefined) updatedFields.quantity7 = quantity7;
  if (quantity75 !== undefined) updatedFields.quantity75 = quantity75;
  if (quantity8 !== undefined) updatedFields.quantity8 = quantity8;
  if (quantity85 !== undefined) updatedFields.quantity85 = quantity85;
  if (quantity9 !== undefined) updatedFields.quantity9 = quantity9;
  if (quantity95 !== undefined) updatedFields.quantity95 = quantity95;
  if (quantity100 !== undefined) updatedFields.quantity100 = quantity100;
  if (quantity105 !== undefined) updatedFields.quantity105 = quantity105;
  if (quantitty110 !== undefined) updatedFields.quantity110 = quantitty110;
  if (quantity115 !== undefined) updatedFields.quantity115 = quantity115;
  if (quantity120 !== undefined) updatedFields.quantity120 = quantity120;
  if (quantitydefault !== undefined)
    updatedFields.quantitydefault = quantitydefault;

  const result = await db
    .update(product)
    .set(updatedFields)
    .where(and(eq(product.productid, productid!)));
  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_edit_products;
