import express, { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IProduct,
  IOrderList,
  IAdminAddOrder,
  IOrderProduct,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import MW_v9_register from "@/middleware/v9-register";
import MW_v9_login from "@/middleware/v9-login";
import MW_v9_get_users from "@/middleware/v9-get-users";
import MW_v9_delete_product from "@/middleware/v9-delete-products";
import MW_v9_post_products from "@/middleware/v9-post-products";
import MW_v9_edit_products from "@/middleware/v9-edit-products";
import v9_login from "@/api/login";
import v9_register from "@/api/register";
import v9_get_users from "@/api/get_users";
import v9_delete_product from "@/api/delete_product";
import v9_post_products from "@/api/post_products";
import v9_edit_products from "@/api/edit_products";
import MW_v9_get_products from "@/middleware/v9-get-products";
import v9_get_products from "@/api/get_products";
import MW_v9_post_orderuser from "@/middleware/v9-post-orderuser";
import v9_post_orderuser from "@/api/post_orderuser";
import MW_v9_get_orderuser from "@/middleware/v9-get-orderuser";
import v9_get_orderuser from "@/api/get_orderuser";
import MW_v9_delete_orderuser from "@/middleware/v9-delete-orderuser";
import v9_delete_orderuser from "@/api/delete_orderuser";
import MW_v9_editstatus_orderuser from "@/middleware/v9-editstatus-orderuser";
import v9_editstatus_orderuser from "@/api/edistatus_orderuser";
import MW_v9_view_order_item from "@/middleware/v9-view-order-item";
import v9_view_order_item from "@/api/get_view_order_item";
import MW_v9_get_monthly_income from "@/middleware/v9-get-monthly-income";
import v9_get_monthly_income from "@/api/get_monthly_income";
import MW_v9_post_expense from "@/middleware/v9-post-expense";
import v9_post_expense from "@/api/post_expense";
import MW_v9_get_admin from "@/middleware/v9-get-admin";
import v9_get_admin from "@/api/get_admin";
import MW_v9_delete_user from "@/middleware/v9-delete-user";
import v9_delete_user from "@/api/delete_user";
import MW_v9_edit_admin from "@/middleware/v9-edit-admin";
import v9_edit_admin from "@/api/edit_admin";
import MW_v9_get_installment from "@/middleware/v9-get-installment";
import v9_get_installment from "@/api/get_installment";
import MW_v9_post_installment from "@/middleware/v9-post-installment";
import v9_post_installment from "@/api/post_installment";
import MW_v9_delete_installment from "@/middleware/v9-delete-installment";
import v9_delete_installment from "@/api/delete_installment";
import MW_v9_edit_installment from "@/middleware/v9-edit-installment";
import v9_edit_installment from "@/api/edit_installment";
import MW_v9_generate_barcode from "@/middleware/v9-generate-barcode";
import v9_generate_barcode from "@/api/generate_barcode";
import MW_v9_barcode_additem from "@/middleware/v9-barcode-additem";
import v9_barcode_additem from "@/api/barcode_additem";
import MW_v9_order_item_generate_barcode from "@/middleware/v9-order-item-generate-barcode";
import v9_order_item_generate_barcode from "@/api/order_item_generate_barcode";
import MW_v9_barcode_orderitem from "@/middleware/v9-barcode-orderitem";
import v9_barcode_orderitem from "@/api/barcode_orderitem";
import MW_v9_delete_logtable from "@/middleware/v9-delete-logtable";
import v9_delete_log from "@/api/delete_logtable";
import MW_v9_get_log_table from "@/middleware/v9-get-logtable";
import v9_get_log_table from "@/api/get_logtable";
import MW_v9_get_pendingorders from "@/middleware/v9-get-pendingorders";
import v9_get_pending_orders from "@/api/get_pendingorders";
import MW_v9_download_ordertable from "@/middleware/v9-download-ordertable";
import MW_v9_download_orderusertable from "@/middleware/v9-download-orderusertable";
import MW_v9_download_producttable from "@/middleware/v9-download-producttable";
import MW_v9_download_installmenttable from "@/middleware/v9-download-installmenttable";
import v9_download_ordertable from "@/api/download_ordertable";
import v9_download_orderusertable from "@/api/download_orderusertable";
import v9_download_producttable from "@/api/download_producttable";
import v9_download_installmenttable from "@/api/download_installmenttable";

const router = express.Router();

router.post(
  // done
  "/v9/login",
  MW_v9_login,
  v9_login,
);

router.post(
  // done
  "/v9/register",
  MW_v9_register,
  v9_register,
);

router.post(
  //done
  "/v9/get/users",
  MW_v9_get_users,
  v9_get_users,
);

router.post(
  //done
  "/v9/delete/products",
  MW_v9_delete_product,
  v9_delete_product,
);

router.post(
  //done
  "/v9/post/products",
  MW_v9_post_products,
  v9_post_products,
);

router.post(
  //done
  "/v9/edit/products",
  MW_v9_edit_products,
  v9_edit_products,
);

router.post(
  //done
  "/v9/get/products",
  MW_v9_get_products,
  v9_get_products,
);

router.post("/v9/post/orderuser", MW_v9_post_orderuser, v9_post_orderuser);

router.post("/v9/get/orderuser", MW_v9_get_orderuser, v9_get_orderuser);

router.post(
  "/v9/delete/orderuser",
  MW_v9_delete_orderuser,
  v9_delete_orderuser,
);

router.post(
  "/v9/edit/status_orderuser",
  MW_v9_editstatus_orderuser,
  v9_editstatus_orderuser,
);

router.post(
  "/v9/get/view_order_item",
  MW_v9_view_order_item,
  v9_view_order_item,
);

router.post(
  "/v9/get/monthly_income",
  MW_v9_get_monthly_income,
  v9_get_monthly_income,
);

router.post("/v9/post/expense", MW_v9_post_expense, v9_post_expense);

router.post("/v9/get/admin", MW_v9_get_admin, v9_get_admin);

router.post("/v9/delete/user", MW_v9_delete_user, v9_delete_user);

router.post("/v9/edit/admin", MW_v9_edit_admin, v9_edit_admin);

router.post("/v9/get/installment", MW_v9_get_installment, v9_get_installment);

router.post(
  "/v9/post/installment",
  MW_v9_post_installment,
  v9_post_installment,
);

router.post(
  "/v9/delete/installment",
  MW_v9_delete_installment,
  v9_delete_installment,
);

router.post(
  "/v9/edit/installment",
  MW_v9_edit_installment,
  v9_edit_installment,
);

router.post(
  "/v9/generate_barcode",
  MW_v9_generate_barcode,
  v9_generate_barcode,
);

router.get(
  "/v9/barcode_additem",
  MW_v9_barcode_additem,
  v9_barcode_additem
)

router.post(
  "/v9/order_item_generate_barcode",
  MW_v9_order_item_generate_barcode,
  v9_order_item_generate_barcode
)

router.get(
  "/v9/barcode_orderitem",
  MW_v9_barcode_orderitem,
  v9_barcode_orderitem
)

router.post(
  "/v9/get/log",
  MW_v9_get_log_table,
  v9_get_log_table
)

router.post(
  "/v9/delete/log",
  MW_v9_delete_logtable,
  v9_delete_log
)

router.post(
  "/v9/get/pendingorders",
  MW_v9_get_pendingorders,
  v9_get_pending_orders
)

router.get("/v9/download/ordertable", MW_v9_download_ordertable, v9_download_ordertable);

router.get("/v9/download/orderusertable", MW_v9_download_orderusertable, v9_download_orderusertable);

router.get("/v9/download/producttable", MW_v9_download_producttable, v9_download_producttable);

router.get("/v9/download/installmenttable", MW_v9_download_installmenttable, v9_download_installmenttable);
// router.post(
//   '/v9/searchproduct',
//   MW_v9_searchproduct,
//   async (
//     req: Request<{}, {}, ISearchProductProperty>,
//     res: Response<IResponseSuccess<IProductReturn[]> | IResponseFail>
//   ): Promise<void> => {
//     const { category, title, searchtag, skip = 1 } = req.body;

//     const limit: number = 9;
//     const offset: number = (skip - 1) * limit;

//     const productList = await db.query.product.findMany({
//       where: and(
//       (category
//           ? eq(product.category, category as EProductCategory)
//           : undefined),
//         (title ? like(product.title, `%${title}%`) : undefined),
//         (searchtag ? like(product.searchtag, `%${searchtag}%`) : undefined),
//       ),
//       limit,
//       offset,
//       orderBy: desc(product.id),
//     });

//     res.status(200).json({
//       ...RequestStatusObject.success,
//       data: await productList.map((x) => {
//         return {
//           title: x.title,
//           price: `${Number(x.price)}`,
//           image: x.image,
//           category: x.category as EProductCategory,
//           description: x.description,
//           quantityxxs: x.quantityxxs,
//           quantityxs: x.quantityxs,
//           quantitys: x.quantitys,
//           quantitym: x.quantitym,
//           quantityl: x.quantityl,
//           quantityxl: x.quantityxl,
//           quantityxxl: x.quantityxxl,
//           quantity5: x.quantity5,
//           quantity55: x.quantity55,
//           quantity6: x.quantity6,
//           quantity65: x.quantity65,
//           quantity7: x.quantity7,
//           quantity75: x.quantity75,
//           quantity8: x.quantity8,
//           quantity85: x.quantity85,
//           quantity9: x.quantity9,
//           quantity95: x.quantity95,
//           quantity100: x.quantity100,
//           quantity105: x.quantity105,
//           quantity110: x.quantity110,
//           quantity115: x.quantity115,
//           quantity120: x.quantity120,
//           quantitydefault: x.quantitydefault,
//           totalquantity: x.totalquantity,
//           imageOne: x.imageone,
//           imageTwo: x.imagetwo,
//           imageThree: x.imagethree,
//         };
//       }),
//     });
//     return;
//   }
// );

router.post(
  "/v9/admineditorder",
  async (
    req: Request<{}, {}, IOrderProduct>,
    res: Response<IResponseSuccess<IAdminAddOrder> | IResponseFail>,
  ): Promise<void> => {
    const { id } = req.body;
    const isEmpty = !id;

    if (isEmpty) {
      res.status(200).json(RequestStatusObject.invalidField);
      return;
    }

    res.status(200).json(RequestStatusObject.success);
    return;
  },
);

router.post(
  "/v9/admindeleteorder",
  async (
    req: Request<{}, {}, IOrderList>,
    res: Response<IResponseSuccess<IAdminAddOrder> | IResponseFail>,
  ): Promise<void> => {
    const { orderId } = req.body;
    const isEmpty = !orderId;

    if (isEmpty) {
      res.status(200).json(RequestStatusObject.invalidField);
      return;
    }

    res.status(200).json(RequestStatusObject.success);
    return;
  },
);

router.post(
  "/v9/pendingorders",
  async (
    req: Request<{}, {}>,
    res: Response<IResponseSuccess<IProduct[]> | IResponseFail>,
  ): Promise<void> => {
    res.status(200).json(RequestStatusObject.success);
    return;
  },
);

// router.post(
//   '/v9/addproduct',
//   MW_v9_addproduct,
//   async (
//     req: Request<{}, {}, IProduct>,
//     res: Response<IResponseSuccess<IProductReturn> | IResponseFail>
//   ): Promise<void> => {
//     const {
//       title,
//       price,
//       image,
//       description,
//       quantityxxs,
//       quantityxs,
//       quantitys,
//       quantitym,
//       quantityl,
//       quantityxl,
//       quantityxxl,
//       quantity5,
//       quantity55,
//       quantity6,
//       quantity65,
//       quantity7,
//       quantity75,
//       quantity8,
//       quantity85,
//       quantity9,
//       quantity95,
//       quantity100,
//       quantity105,
//       quantity110,
//       quantity115,
//       quantity120,
//       quantitydefault,
//       imageOne,
//       imageTwo,
//       imageThree,
//       category,
//       cost,
//       searchtag
//     } = req.body;

//     let newImage = null;
//     let newImageOne = null;
//     let newImageTwo = null;
//     let newImageThree = null;
//     let newDescription = null;
//     let currentSearchTag = null;
//     let current_quantityxxs = quantityxxs || 0;
//     let current_quantityxs = quantityxs || 0;
//     let current_quantitys = quantitys || 0;
//     let current_quantitym = quantitym || 0;
//     let current_quantityl = quantityl || 0;
//     let current_quantityxl = quantityxl || 0;
//     let current_quantityxxl = quantityxxl || 0;
//     let current_quantity5 = quantity5 || 0;
//     let current_quantity55 = quantity55 || 0;
//     let current_quantity6 = quantity6 || 0;
//     let current_quantity65 = quantity65 || 0;
//     let current_quantity7 = quantity7 || 0;
//     let current_quantity75 = quantity75 || 0;
//     let current_quantity8 = quantity8 || 0;
//     let current_quantity85 = quantity85 || 0;
//     let current_quantity9 = quantity9 || 0;
//     let current_quantity95 = quantity95 || 0;
//     let current_quantity100 = quantity100 || 0;
//     let current_quantity105 = quantity105 || 0;
//     let current_quantity110 = quantity110 || 0;
//     let current_quantity115 = quantity115 || 0;
//     let current_quantity120 = quantity120 || 0;
//     let current_quantitydefault = quantitydefault || 0;

//     let totalQuantity =
//     current_quantityxxs +
//     current_quantityxs +
//     current_quantitys +
//     current_quantitym +
//     current_quantityl +
//     current_quantityxl +
//     current_quantityxxl +
//     current_quantity5 +
//     current_quantity55 +
//     current_quantity6 +
//     current_quantity65 +
//     current_quantity7 +
//     current_quantity75 +
//     current_quantity8 +
//     current_quantity85 +
//     current_quantity9 +
//     current_quantity95 +
//     current_quantity100 +
//     current_quantity105 +
//     current_quantity110 +
//     current_quantity115 +
//     current_quantity120 +
//     current_quantitydefault;

//     if(searchtag && searchtag.length > 0 && typeof searchtag[0] === "string"){
//       currentSearchTag = searchtag.join(' ');
//     }

//     if (image && image.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageOne = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (imageOne && imageOne.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (imageTwo && imageTwo.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (imageThree && imageThree.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (description) {
//       newDescription = description;
//     }

//     const newProduct = {
//       title,
//       price: `${Number(price)}`,
//       cost,
//       incomeperunit
//       // title,
//       // price: `${Number(price)}`,
//       // image: newImage,
//       // category,
//       // description: newDescription,
//       // quantityxxs: current_quantityxxs,
//       // quantityxs: current_quantityxs,
//       // quantitys: current_quantitys,
//       // quantitym: current_quantitym,
//       // quantityl: current_quantityl,
//       // quantityxl: current_quantityxl,
//       // quantityxxl: current_quantityxxl,
//       // quantity5: current_quantity5,
//       // quantity55: current_quantity55,
//       // quantity6: current_quantity6,
//       // quantity65: current_quantity65,
//       // quantity7: current_quantity7,
//       // quantity75: current_quantity75,
//       // quantity8: current_quantity8,
//       // quantity85: current_quantity85,
//       // quantity9: current_quantity9,
//       // quantity95: current_quantity95,
//       // quantity100: current_quantity100,
//       // quantity105: current_quantity105,
//       // quantity110: current_quantity110,
//       // quantity115: current_quantity115,
//       // quantity120: current_quantity120,
//       // quantitydefault: current_quantitydefault,
//       // imageOne: newImageOne,
//       // imageTwo: newImageTwo,
//       // imageThree: newImageThree,
//       // cost,
//       // incomeperunit: `${Number(price) - Number(cost)}`,
//       // searchtag: currentSearchTag
//     };

//     const result = await db.insert(product).values(newProduct);
//     res.status(200).json(RequestStatusObject.success);
//     return;
//   }
// );

// router.post(
//   '/v9/editproduct',
//   MW_v9_editproduct,
//   async (
//     req: Request<{}, {}, IProduct>,
//     res: Response<IResponseSuccess<Partial<IProduct>[]> | IResponseFail>
//   ): Promise<void> => {
//     const {
//       productid,
//       title,
//       price,
//       image,
//       username,
//       description,
//       quantityxxs,
//       quantityxs,
//       quantitys,
//       quantitym,
//       quantityl,
//       quantityxl,
//       quantityxxl,
//       quantity5,
//       quantity55,
//       quantity6,
//       quantity65,
//       quantity7,
//       quantity75,
//       quantity8,
//       quantity85,
//       quantity9,
//       quantity95,
//       quantity100,
//       quantity105,
//       quantity110,
//       quantity115,
//       quantity120,
//       quantitydefault,
//       imageOne,
//       imageTwo,
//       searchtag,
//       imageThree,
//       category,
//       cost,
//     } = req.body;

//     const productList = await db.query.product.findFirst({
//       where: and(eq(product.productid, productid)),
//     });

//     if (!productList) {
//       res.status(200).json(RequestStatusObject.invalidProductNotFound);
//       return;
//     }

//     let newImage = null;
//     let newImageOne = null;
//     let newImageTwo = null;
//     let newImageThree = null;
//     let newDescription = null;

//     if (image && image.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageOne = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (imageOne && imageOne.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (imageTwo && imageTwo.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (imageThree && imageThree.length > 0) {
//       // const key = `avata/${agentCode}/${uuidv4()}.webp`
//       // const buffer = Buffer.from(imageAvata, 'base64')
//       // await Promise.all([this.s3
//       //   .putObject({
//       //     Bucket: 'web-upload-images',
//       //     Key: key,
//       //     Body: buffer,
//       //   }),
//       // const newImageTwo = `https://d341tsjrvzggde.cloudfront.net/${key}`
//     }

//     if (description) {
//       newDescription = description;
//     }

//     let changes: {
//       title?: string;
//       price?: string;
//       image?: string | null;
//       category?: EProductCategory;
//       imageOne?: string | null;
//       imageTwo?: string | null;
//       imageThree?: string | null;
//       quantity?: number;
//       cost?: string;
//       incomeperunit?: string;
//       searchtag?: string;
//       quantityxxs?: number;
//       quantityxs?: number;
//       quantitys?: number;
//       quantitym?: number;
//       quantityl?: number;
//       quantityxl?: number;
//       quantityxxl?: number;
//       quantity5?: number;
//       quantity55?: number;
//       quantity6?: number;
//       quantity65?: number;
//       quantity7?: number;
//       quantity75?: number;
//       quantity8?: number;
//       quantity85?: number;
//       quantity9?: number;
//       quantity95?: number;
//       quantity100?: number;
//       quantity105?: number;
//       quantity110?: number;
//       quantity115?: number;
//       quantity120?: number;
//       quantitydefault?: number;
//       totalquantity?: number
//     } = {};

//     if (title) {
//       changes.title = title;
//     }

//     if (price) {
//       changes.price = `${Number(price)}`;
//     }

//     if (newImage) {
//       changes.image = newImage;
//     }

//     if (category) {
//       changes.category = category as EProductCategory;
//     }

//     if (newImageOne) {
//       changes.imageOne = newImageOne;
//     }

//     if (newImageTwo) {
//       changes.imageTwo = newImageTwo;
//     }

//     if (newImageThree) {
//       changes.imageThree = newImageThree;
//     }

//     if (cost && !price) {
//       changes.cost = `${Number(cost)}`;
//       changes.incomeperunit = `${Number(productList.price) - Number(cost)}`;
//     }

//     if (!cost && price) {
//       changes.price = `${Number(price)}`;
//       changes.incomeperunit = `${Number(price) - Number(productList.cost)}`;
//     }

//     if (cost && price) {
//       changes.cost = `${Number(cost)}`;
//       changes.price = `${Number(price)}`;
//       changes.incomeperunit = `${Number(price) - Number(cost)}`;
//     }

//     if(searchtag && searchtag.length > 0 && typeof searchtag[0] === "string"){
//       let newSearchTag = searchtag.join(' ');
//       changes.searchtag = newSearchTag;
//     }

//     let currentTotal = productList.totalquantity;

//     if (quantityxxs && typeof quantityxxs === "number") {
//       changes.quantityxxs = quantityxxs;
//       if(productList.quantityxxs < quantityxxs){
//         currentTotal = currentTotal + (quantityxxs - productList.quantityxxs);
//       }
//       if(productList.quantityxxs > quantityxxs){
//         currentTotal = currentTotal + (quantityxxs - productList.quantityxxs);
//       }
//     }

//     if (quantityxs && typeof quantityxs === "number") {
//       changes.quantityxs = quantityxs;
//       if(productList.quantityxs < quantityxs){
//         currentTotal = currentTotal + (quantityxs - productList.quantityxs);
//       }
//       if(productList.quantityxs > quantityxs){
//         currentTotal = currentTotal + (quantityxs - productList.quantityxs);
//       }
//     }

//     if (quantitys && typeof quantitys === "number") {
//       changes.quantitys = quantitys;
//       if(productList.quantitys < quantitys){
//         currentTotal = currentTotal + (quantitys - productList.quantitys);
//       }
//       if(productList.quantitys > quantitys){
//         currentTotal = currentTotal + (quantitys - productList.quantitys);
//       }
//     }

//     if (quantitym && typeof quantitym === "number") {
//       changes.quantitym = quantitym;
//       if(productList.quantitym < quantitym){
//         currentTotal = currentTotal + (quantitym - productList.quantitym);
//       }
//       if(productList.quantitym > quantitym){
//         currentTotal = currentTotal + (quantitym - productList.quantitym);
//       }
//     }

//     if (quantityl && typeof quantityl === "number") {
//       changes.quantityl = quantityl;
//       if(productList.quantityl < quantityl){
//         currentTotal = currentTotal + (quantityl - productList.quantityl);
//       }
//       if(productList.quantityl > quantityl){
//         currentTotal = currentTotal + (quantityl - productList.quantityl);
//       }
//     }

//     if (quantityxl && typeof quantityxl === "number") {
//       changes.quantityxl = quantityxl;
//       if(productList.quantityxl < quantityxl){
//         currentTotal = currentTotal + (quantityxl - productList.quantityxl);
//       }
//       if(productList.quantityxl > quantityxl){
//         currentTotal = currentTotal + (quantityxl - productList.quantityxl);
//       }
//     }

//     if (quantityxxl && typeof quantityxxl === "number") {
//       changes.quantityxxl = quantityxxl;
//       if(productList.quantityxxl < quantityxxl){
//         currentTotal = currentTotal + (quantityxxl - productList.quantityxxl);
//       }
//       if(productList.quantityxxl > quantityxxl){
//         currentTotal = currentTotal + (quantityxxl - productList.quantityxxl);
//       }
//     }

//     if (quantity5 && typeof quantity5 === "number") {
//       changes.quantity5 = quantity5;
//       if(productList.quantity5 < quantity5){
//         currentTotal = currentTotal + (quantity5 - productList.quantity5);
//       }
//       if(productList.quantity5 > quantity5){
//         currentTotal = currentTotal + (quantity5 - productList.quantity5);
//       }
//     }

//     if (quantity55 && typeof quantity55 === "number") {
//       changes.quantity55 = quantity55;
//       if(productList.quantity55 < quantity55){
//         currentTotal = currentTotal + (quantity55 - productList.quantity55);
//       }
//       if(productList.quantity55 > quantity55){
//         currentTotal = currentTotal + (quantity55 - productList.quantity55);
//       }
//     }

//     if (quantity6 && typeof quantity6 === "number") {
//       changes.quantity6 = quantity6;
//       if(productList.quantity6 < quantity6){
//         currentTotal = currentTotal + (quantity6 - productList.quantity6);
//       }
//       if(productList.quantity6 > quantity6){
//         currentTotal = currentTotal + (quantity6 - productList.quantity6);
//       }
//     }

//     if (quantity65 && typeof quantity65 === "number") {
//       changes.quantity65 = quantity65;
//       if(productList.quantity65 < quantity65){
//         currentTotal = currentTotal + (quantity65 - productList.quantity65);
//       }
//       if(productList.quantity65 > quantity65){
//         currentTotal = currentTotal + (quantity65 - productList.quantity65);
//       }
//     }

//     if (quantity7 && typeof quantity7 === "number") {
//       changes.quantity7 = quantity7;
//       if(productList.quantity7 < quantity7){
//         currentTotal = currentTotal + (quantity7 - productList.quantity7);
//       }
//       if(productList.quantity7 > quantity7){
//         currentTotal = currentTotal + (quantity7 - productList.quantity7);
//       }
//     }

//     if (quantity75 && typeof quantity75 === "number") {
//       changes.quantity75 = quantity75;
//       if(productList.quantity75 < quantity75){
//         currentTotal = currentTotal + (quantity75 - productList.quantity75);
//       }
//       if(productList.quantity75 > quantity75){
//         currentTotal = currentTotal + (quantity75 - productList.quantity75);
//       }
//     }

//     if (quantity8 && typeof quantity8 === "number") {
//       changes.quantity8 = quantity8;
//       if(productList.quantity8 < quantity8){
//         currentTotal = currentTotal + (quantity8 - productList.quantity8);
//       }
//       if(productList.quantity8 > quantity8){
//         currentTotal = currentTotal + (quantity8 - productList.quantity8);
//       }
//     }

//     if (quantity85 && typeof quantity85 === "number") {
//       changes.quantity85 = quantity85;
//       if(productList.quantity85 < quantity85){
//         currentTotal = currentTotal + (quantity85 - productList.quantity85);
//       }
//       if(productList.quantity85 > quantity85){
//         currentTotal = currentTotal + (quantity85 - productList.quantity85);
//       }
//     }

//     if (quantity9 && typeof quantity9 === "number") {
//       changes.quantity9 = quantity9;
//       if(productList.quantity9 < quantity9){
//         currentTotal = currentTotal + (quantity9 - productList.quantity9);
//       }
//       if(productList.quantity9 > quantity9){
//         currentTotal = currentTotal + (quantity9 - productList.quantity9);
//       }
//     }

//     if (quantity95 && typeof quantity95 === "number") {
//       changes.quantity95 = quantity95;
//       if(productList.quantity95 < quantity95){
//         currentTotal = currentTotal + (quantity95 - productList.quantity95);
//       }
//       if(productList.quantity95 > quantity95){
//         currentTotal = currentTotal + (quantity95 - productList.quantity95);
//       }
//     }

//     if (quantity100 && typeof quantity100 === "number") {
//       changes.quantity100 = quantity100;
//       if(productList.quantity100 < quantity100){
//         currentTotal = currentTotal + (quantity100 - productList.quantity100);
//       }
//       if(productList.quantity100 > quantity100){
//         currentTotal = currentTotal + (quantity100 - productList.quantity100);
//       }
//     }

//     if (quantity105 && typeof quantity105 === "number") {
//       changes.quantity105 = quantity105;
//       if(productList.quantity105 < quantity105){
//         currentTotal = currentTotal + (quantity105 - productList.quantity105);
//       }
//       if(productList.quantity105 > quantity105){
//         currentTotal = currentTotal + (quantity105 - productList.quantity105);
//       }
//     }

//     if (quantity110 && typeof quantity110 === "number") {
//       changes.quantity110 = quantity110;
//       if(productList.quantity110 < quantity110){
//         currentTotal = currentTotal + (quantity110 - productList.quantity110);
//       }
//       if(productList.quantity110 > quantity110){
//         currentTotal = currentTotal + (quantity110 - productList.quantity110);
//       }
//     }

//     if (quantity115 && typeof quantity115 === "number") {
//       changes.quantity115 = quantity115;
//       if(productList.quantity115 < quantity115){
//         currentTotal = currentTotal + (quantity115 - productList.quantity115);
//       }
//       if(productList.quantity115 > quantity115){
//         currentTotal = currentTotal + (quantity115 - productList.quantity115);
//       }
//     }

//     if (quantity120 && typeof quantity120 === "number") {
//       changes.quantity120 = quantity120;
//       if(productList.quantity120 < quantity120){
//         currentTotal = currentTotal + (quantity120 - productList.quantity120);
//       }
//       if(productList.quantity120 > quantity120){
//         currentTotal = currentTotal + (quantity120 - productList.quantity120);
//       }
//     }

//     if (quantitydefault && typeof quantitydefault === "number") {
//       changes.quantitydefault = quantitydefault;
//       if(productList.quantitydefault < quantitydefault){
//         currentTotal = currentTotal + (quantitydefault - productList.quantitydefault);
//       }
//       if(productList.quantitydefault > quantitydefault){
//         currentTotal = currentTotal + (quantitydefault - productList.quantitydefault);
//       }
//     }

//     changes.totalquantity = currentTotal;

//     const result = await db.update(product).set(changes).where(
//       and(
//         eq(product.productid, productid)
//       )
//     ).returning();

//     res.status(200).json({
//       ...RequestStatusObject.success,
//     });
//     return;
//   }
// );

export default router;
