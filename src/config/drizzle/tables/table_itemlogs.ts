import {
    pgTable,
    varchar,
    integer,
    serial,
    timestamp,
    numeric,
  } from "drizzle-orm/pg-core";
  
  export const LogTable = pgTable("logtable", {
    id: serial("id").primaryKey().notNull(),
    productid: integer("productid").notNull(),
    itemid: varchar("itemid", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    price: numeric("price", {
      precision: 10,
      scale: 2,
    }).notNull().default("0.00"),
    cost: numeric("cost", { precision: 10, scale: 2 }).notNull().default("0.00"),
    size: varchar("size", { length: 255 }).notNull(),
    mode: varchar("mode", { length: 255 }).notNull(),
    orderid: varchar("orderid", { length: 255 }),
    logdate: timestamp("logdate").defaultNow(),
  });
  