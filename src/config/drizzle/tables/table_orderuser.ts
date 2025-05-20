import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  serial,
  timestamp,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";

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

export const OrderUserTable = pgTable("orderusertable", {
  id: serial("id").primaryKey().notNull(),
  orderid: varchar("orderid", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).$default(() => {
    return "";
  }),
  type: varchar("type", { length: 255 }).$default(() => {
    return "on_hand_layaway";
  }),
  receiverfirstname: varchar("receiverfirstname", { length: 255 }),
  receiverlastname: varchar("receiverlastname", { length: 255 }),
  receivermobile: varchar("receivermobile", { length: 11 }),
  region: varchar("region", { length: 255 }),
  province: varchar("province", { length: 255 }),
  municity: varchar("municity", { length: 255 }),
  barangay: varchar("barangay", { length: 255 }),
  address: varchar("address", { length: 255 }),
  estatustype: EStatusEnum("estatustype").$default(() => {
    return "pending";
  }),
  originsite: EOriginSite("eoriginsite").$default(() => {
    return "chicberry";
  }),
  cuurentpayment: numeric("currentpayment", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  totalcost: numeric("totalcost", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  orderdate: timestamp("orderdate").notNull(),
});
