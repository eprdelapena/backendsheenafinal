import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TPostProductsParams,
} from "@/types/main_schema";
import { ECategory, RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";

const v9_post_products = async (
  req: Request<{}, {}, Partial<TPostProductsParams>>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let {
    title,
    price,
    cost,
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

  let newParameters = {
    image: image ? image : "",
    imageone: imageone ? imageone : "",
    imagetwo: imagetwo ? imagetwo : "",
    imagethree: imagethree ? imagethree : "",
    description: description ? description : "",
    quantityxxs: quantityxxs ? quantityxxs : 0,
    quantityxs: quantityxs ? quantityxs : 0,
    quantittys: quantittys ? quantittys : 0,
    quantitym: quantitym ? quantitym : 0,
    quantityl: quantityl ? quantityl : 0,
    quantityxl: quantityxl ? quantityxl : 0,
    quantityxxl: quantityxxl ? quantityxxl : 0,
    quantity5: quantity5 ? quantity5 : 0,
    quantity55: quantity55 ? quantity55 : 0,
    quantity6: quantity6 ? quantity6 : 0,
    quantity65: quantity65 ? quantity65 : 0,
    quantity7: quantity7 ? quantity7 : 0,
    quantity75: quantity75 ? quantity75 : 0,
    quantity8: quantity8 ? quantity8 : 0,
    quantity85: quantity85 ? quantity85 : 0,
    quantity9: quantity9 ? quantity9 : 0,
    quantity95: quantity95 ? quantity95 : 0,
    quantity100: quantity100 ? quantity100 : 0,
    quantity105: quantity105 ? quantity105 : 0,
    quantitty110: quantitty110 ? quantitty110 : 0,
    quantity115: quantity115 ? quantity115 : 0,
    quantity120: quantity120 ? quantity120 : 0,
    quantitydefault: quantitydefault ? quantitydefault : 0,
  };

  const regdate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });

  const regDateObj = new Date(regdate);

  if (image && image.length > 0) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageOne = `https://d341tsjrvzggde.cloudfront.net/${key}`
  }

  if (imageone && imageone.length > 0) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
  }

  if (imagetwo && imagetwo.length > 0) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
  }

  if (imagethree && imagethree.length > 0) {
    // const key = `avata/${agentCode}/${uuidv4()}.webp`
    // const buffer = Buffer.from(imageAvata, 'base64')
    // await Promise.all([this.s3
    //   .putObject({
    //     Bucket: 'web-upload-images',
    //     Key: key,
    //     Body: buffer,
    //   }),
    // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
  }

  let currentSearchTag = category;
  if (searchtag && searchtag.length > 0 && typeof searchtag[0] === "string") {
    currentSearchTag = currentSearchTag + ` ` + searchtag.join(" ");
  }

  const newProduct = {
    title: title!,
    price: price!,
    cost: cost!,
    image: newParameters.image!,
    imageone: newParameters.imageone!,
    imagetwo: newParameters.imagetwo!,
    imagethree: newParameters.imagethree!,
    category: category! as ECategory,
    description: newParameters.description!,
    searchtag: currentSearchTag!,
    quantityxxs: newParameters.quantityxxs!,
    quantityxs: newParameters.quantityxs!,
    quantitys: newParameters.quantittys!,
    quantitym: newParameters.quantitym!,
    quantityl: newParameters.quantityl!,
    quantityxl: newParameters.quantityxl!,
    quantityxxl: newParameters.quantityxxl!,
    quantity5: newParameters.quantity5!,
    quantity55: newParameters.quantity55!,
    quantity6: newParameters.quantity6!,
    quantity65: newParameters.quantity65!,
    quantity7: newParameters.quantity7!,
    quantity75: newParameters.quantity75!,
    quantity8: newParameters.quantity8!,
    quantity85: newParameters.quantity85!,
    quantity9: newParameters.quantity9!,
    quantity95: newParameters.quantity95!,
    quantity100: newParameters.quantity100!,
    quantity105: newParameters.quantity105!,
    quantity110: newParameters.quantitty110!,
    quantity115: newParameters.quantity115!,
    quantity120: newParameters.quantity120!,
    quantitydefault: newParameters.quantitydefault!,
    regdate: regDateObj,
  };
  await db.insert(product).values(newProduct);
  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_products;
