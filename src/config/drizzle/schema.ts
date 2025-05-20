import { ExpenseTable } from "./tables/tabke_expense";
import { InstallmentTable } from "./tables/table_downpayment";
import { LogTable } from "./tables/table_itemlogs";
import { OrderTable } from "./tables/table_order";
import { OrderUserTable } from "./tables/table_orderuser";
import { ProductTable } from "./tables/table_product";
import { ReplenishmentTable } from "./tables/table_replenishment";
import { UserTable } from "./tables/table_user";
import { pgEnum } from "drizzle-orm/pg-core";

export const EAccountType = pgEnum("eaccounttype", [
  "customer",
  "admin",
  "admin_secretary",
  "admin_viewer",
  "admin_level_one",
  "admin_level_two",
  "admin_level_three",
]);

export const ECategoryType = pgEnum("ecategorytype", [
  "bags",
  "shoes",
  "clothes",
  "jewelry",
  "watches",
  "others",
]);

export const EStatusEnum = pgEnum("estatustype", [
  "pending",
  "ondelivery",
  "success",
]);

export const EOriginSite = pgEnum("eoriginsite", [
  "facebook",
  "shoppee",
  "chicberry",
]);

export const users = UserTable;
export const product = ProductTable;
export const orderuser = OrderUserTable;
export const order = OrderTable;
export const expense = ExpenseTable;
export const installment = InstallmentTable;
export const replenishment = ReplenishmentTable;
export const itemlog = LogTable
