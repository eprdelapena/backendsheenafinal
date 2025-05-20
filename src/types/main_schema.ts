import { ESearchTypeProducts } from "@/constant/constant_main";

export interface IResponseSuccess<T> {
  status: number;
  data?: T;
  message?: string;
}

export type TCategoryProducts =
  | "bags"
  | "shoes"
  | "clothes"
  | "jewelry"
  | "watches"
  | "others";

export interface IResponseFail {
  status: number;
  message: string;
}

export type TParamsRegister = {
  firstname: string;
  middlename: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  username: string;
  estatustype: TAdminClassification;
};

export interface IResponseCode {
  status: number;
  message: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export type TDeleteProductParams = {
  productid: number;
};

export interface ILoginResponse {
  firstname: string;
  lastname: string;
  middlename: string;
  username: string;
  token: string;
  mobile: string;
  email: string;
  eaccounttype: string;
  regdate: Date;
  lastip: string;
  lastdevice: string;
  lastlocation: string;
}

export enum EAccountType {
  admin = "admin",
  customer = "customer",
}

export type TGetUsers = {
  username: string;
  eaccounttype: string;
  begin: string;
  end: string;
  skip: number;
};

export type TAdminClassification =
  | "customer"
  | "admin"
  | "admin_secretary"
  | "admin_viewer"
  | "admin_level_one"
  | "admin_level_two"
  | "admin_level_three";
export interface IRegister {
  firstname: string;
  lastname: string;
  middlename: string;
  mobile: string;
  email: string;
  estatustype: TAdminClassification;
  password: string;
  username: string;
}
export interface ITest {
  token: string;
}

export interface IOrderList {
  orderId: number[];
}
export interface IOrderProduct {
  id: number;
}

export interface ISearchProductCategory {
  category: string;
}

export interface ISearchProductProperty {
  title?: string;
  category?: string;
  skip?: number;
  searchtag?: string;
}

export enum EProductCategory {
  bags = "bags",
  shoes = "shoes",
  clothes = "clothes",
  jewelry = "jewelry",
  watches = "watches",
  others = "others",
}

export interface IProduct {
  productid: number;
  username: string;
  title: string;
  price: number;
  image: string | null;
  category: EProductCategory;
  description: string | null;
  imageOne: string | null;
  imageTwo: string | null;
  imageThree: string | null;
  // cost: string;
  incomeperunit: string;
  searchtag: string[];
  quantityxxs: number;
  quantityxs: number;
  quantitys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantity110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
}

export type TParamsViewOrderItem = {
  orderid: string;
  skip: number;
};

export type TParamsPostInstallment = {
  amount: string;
  orderid: string;
};

export type TParamsGetInstallment = {
  orderid: string;
  skip?: number;
};

export type TParamsEditAdmin = {
  estatustype: TAdminClassification;
  username: string;
};

export type TParamsOrderQrCodeGenerator = {
  orderid: string,
}


export type TParamsOrderGenerateBarcode = {
  productid: number,
  orderid: string,
  sizecategory: string,
}

export type TParamsGenerateBarcode = {
  sizecategory: string;
  productid: number;
  quantity: number;
};

export type TParamsEditInstallment = {
  installment: string;
  id: number;
  orderid: string;
  description: string;
};

export type TParamsDeleteInstallment = {
  id: number;
  orderid: string;
};

export interface IParamsEditStatus {
  orderid: string;
  estatustype: string;
}

export interface IParamsDeleteOrderUser {
  orderid: string;
}

export type TParamsDeleteLogTable = {
  itemid: string,
}

export type TParamsGetPendingOrders = {
  productid: number,
  skip: number,
  type: string,
}

export type TParamsGetLogTable = {
  begin: string,
  end: string,
  searchCategory: "itemid" | "fullname" | "mode" | "orderid",
  searchText: string,
  skip: number
}

export type TParamsGetMonthlyIncome = {
  begin: string;
  end: string;
};

export interface IParamsGetOrderUser {
  begin?: string;
  end?: string;
  search?: string;
  category?: "username" | "orderid" | "firstname" | "lastname";
  estatustype?: string;
  skip: number;
  type: string;
}

export interface IProductData extends IProduct {
  successorders: number;
  totalorders: number;
  pendingorders: number;
  // cost: string;
  totalincome: string;
  projectedgross: string;
  totalgross: string;
  projectedincome: string;
}

export interface IProductReturn {
  title: string;
  price: string;
  image: string | null;
  category: EProductCategory;
  description: string | null;
  quantityxxs: number;
  quantityxs: number;
  quantitys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantity110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
  totalquantity: number;
  imageOne: string | null;
  imageTwo: string | null;
  imageThree: string | null;
}

export interface ISingleOrder {
  productid: number;
  username: string;
}

export interface IQuantityOrder extends ISingleOrder {
  quantity: number;
  size: string;
  price: number;
}

export interface IAdminAddOrder {
  username: string;
  receivername: string;
  receivermobile: string;
  region: string;
  municity: string;
  barangay: string;
  address: string;
  totalcost: number;
  adminusername?: string;
  adminpassword?: string;
  orders: IQuantityOrder[];
}

export type TAddOrderUser = {
  adminusername: string;
  username: string;
  receiverfirstname: string;
  receiverlastname: string;
  receivermobile: string | number;
  region: string;
  municity: string;
  barangay: string;
  address: string;
  status: string;
  originsite: string;
  downpayment: string;
  totalcost: string;
};

export type TParamsPostExpense = {
  username: string;
  memo?: string;
  expense: string;
};

export type TPostOrderUserParams = {
  username: string;
  receiverfirstname: string;
  receiverlastname: string;
  receivermobile: string;
  region: string;
  province: string;
  type: string;
  municity: string;
  barangay: string;
  address: string;
  originsite: string;
  downpayment: number;
  totalcost: number;
  orderdate: Date;
  orders: {
    productId: number;
    price: string;
    // cost: string,
    quantityxxs: number;
    quantityxs: number;
    quantittys: number;
    quantitym: number;
    quantityl: number;
    quantityxl: number;
    quantityxxl: number;
    quantity5: number;
    quantity55: number;
    quantity6: number;
    quantity65: number;
    quantity7: number;
    quantity75: number;
    quantity8: number;
    quantity85: number;
    quantity9: number;
    quantity95: number;
    quantity100: number;
    quantity105: number;
    quantitty110: number;
    quantity115: number;
    quantity120: number;
    quantitydefault: number;
  }[];
};

export type TGetProductsParams = {
  searchType: ESearchTypeProducts;
  searchText: string;
  skip: number;
};

export type TEditProductsParams = {
  productid: number;
  title: string;
  price: string;
  cost: string;
  image: string;
  imageone: string;
  imagetwo: string;
  imagethree: string;
  category: string;
  description: string;
  searchtag: string[];
  quantityxxs: number;
  quantityxs: number;
  quantittys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantitty110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
};

export type TParamsGetReplenishment = {
  begin: string;
  end: string;
  skip?: number;
};

export type TParamsEditReplenishment = {
  expenseid: string;
  expense: string;
  productid: number;
  quantityxxs: number;
  quantityxs: number;
  quantittys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantity110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
};

export type TParamsDeleteReplenishment = {
  expenseid: string;
};

export type TParamsPostReplenishment = {
  expense: string;
  productid: number;
  quantityxxs: number;
  quantityxs: number;
  quantittys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantitty110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
};

export type TPostProductsParams = {
  title: string;
  price: string;
  cost: string;
  image: string;
  imageone: string;
  imagetwo: string;
  imagethree: string;
  category: string;
  description: string;
  searchtag: string[];
  quantityxxs: number;
  quantityxs: number;
  quantittys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantitty110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
};
