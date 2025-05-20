import {
  pgTable,
  varchar,
  serial,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

export const InstallmentTable = pgTable("installmenttable", {
  id: serial("id").primaryKey().notNull(),
  orderid: varchar("orderid", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).$default(() => {
    return "";
  }),
  installment: numeric("installment", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  description: varchar("description", { length: 255 }).$default(() => {
    return "none";
  }),
  installmentdate: timestamp("installmentdate").defaultNow(),
});
