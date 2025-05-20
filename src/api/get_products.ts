import { ESearchTypeProducts } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TCategoryProducts,
  TGetProductsParams,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { and, desc, eq, like, ilike } from "drizzle-orm";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";

const v9_get_products = async (
  req: Request<{}, {}, Partial<TGetProductsParams>>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { skip, searchText, searchType } = req.body;

  let currentSkip = 1;

  if (skip) {
    currentSkip = skip;
  }

  const limit: number = 9;
  const offset: number = (currentSkip - 1) * limit;

  const productList = await db.query.product.findMany({
    where: and(
      searchType === ESearchTypeProducts.category
        ? eq(ProductTable.category, searchText as TCategoryProducts)
        : undefined,
      searchType === ESearchTypeProducts.productid && !isNaN(Number(searchText))
        ? eq(ProductTable.productid, Number(searchText))
        : undefined,
      searchType === ESearchTypeProducts.title
        ? ilike(product.title, `%${searchText}%`)
        : undefined,
      searchType === ESearchTypeProducts.searchtag
        ? ilike(product.searchtag, `%${searchText}%`)
        : undefined,
      eq(ProductTable.isshow, true),
    ),
    limit,
    offset,
    orderBy: desc(OrderUserTable.id),
  });

  res.status(200).json({
    message: "success",
    status: 200,
    data: productList.length ? productList : [],
  });
  return;
};

export default v9_get_products;
